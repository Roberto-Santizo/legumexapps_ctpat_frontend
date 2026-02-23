// Max pixels on the longest side for images embedded in the PDF.
const PDF_IMAGE_MAX_PX = 1200;

// Max simultaneous image fetches.
const CONCURRENCY = 4;

// Milliseconds before a single fetch is considered failed.
const FETCH_TIMEOUT_MS = 20_000;

// How many times to retry a failed fetch before giving up.
const MAX_RETRIES = 2;

/**
 * Fetches an image URL with a timeout. Throws if the request exceeds
 * FETCH_TIMEOUT_MS or the server returns a non-OK status.
 */
async function fetchWithTimeout(url: string): Promise<Blob> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    return await response.blob();
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Converts a Blob to a JPEG base64 data URL, downscaling if needed.
 * Uses FileReader → Image + canvas — works with JPEG, PNG, HEIC, WebP, etc.
 */
async function blobToJpegBase64(blob: Blob, sourceUrl: string): Promise<string | null> {
  // Step 1: Blob → data URL (browser-native, supports any decodable format).
  const dataUrl = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error("FileReader failed"));
    reader.readAsDataURL(blob);
  });

  // Step 2: Decode + optionally downscale via canvas.
  // Loading from data: URL has no CORS restrictions.
  return new Promise<string | null>((resolve) => {
    const img = new Image();

    img.onload = () => {
      let { naturalWidth: w, naturalHeight: h } = img;
      if (w > PDF_IMAGE_MAX_PX || h > PDF_IMAGE_MAX_PX) {
        const scale = Math.min(PDF_IMAGE_MAX_PX / w, PDF_IMAGE_MAX_PX / h);
        w = Math.round(w * scale);
        h = Math.round(h * scale);
      }

      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        resolve(null);
        return;
      }
      ctx.drawImage(img, 0, 0, w, h);
      resolve(canvas.toDataURL("image/jpeg", 0.85));
    };

    img.onerror = () => {
      console.warn(`[fetchImageAsBase64] Canvas decode failed for: ${sourceUrl}`);
      resolve(null);
    };

    img.src = dataUrl;
  });
}

/**
 * Fetches an image URL and returns it as a JPEG base64 data URL.
 * Retries up to MAX_RETRIES times on network/timeout errors.
 * Returns null only when all attempts are exhausted.
 */
export async function fetchImageAsBase64(url: string): Promise<string | null> {
  let lastError: unknown;

  for (let attempt = 1; attempt <= MAX_RETRIES + 1; attempt++) {
    try {
      const blob = await fetchWithTimeout(url);
      return await blobToJpegBase64(blob, url);
    } catch (err) {
      lastError = err;
      if (attempt <= MAX_RETRIES) {
        console.warn(
          `[fetchImageAsBase64] Attempt ${attempt} failed for: ${url} — retrying…`,
          err
        );
        // Small back-off between retries
        await new Promise((r) => setTimeout(r, 500 * attempt));
      }
    }
  }

  console.error(
    `[fetchImageAsBase64] All ${MAX_RETRIES + 1} attempts failed for: ${url}`,
    lastError
  );
  return null;
}

/**
 * Pre-loads multiple image paths as base64 JPEG data URLs.
 * Runs at most CONCURRENCY fetches at a time with automatic retries,
 * so all images are loaded even with occasional network hiccups.
 * Returns a Record<path, base64DataUrl>.
 */
export async function preloadImagesAsBase64(
  paths: (string | null | undefined)[],
  baseUrl: string
): Promise<Record<string, string>> {
  const uniquePaths = [...new Set(paths.filter(Boolean))] as string[];
  const cache: Record<string, string> = {};

  // Shared index — safe because JS is single-threaded (idx++ is synchronous).
  let idx = 0;

  async function worker() {
    while (idx < uniquePaths.length) {
      const path = uniquePaths[idx++];
      const b64 = await fetchImageAsBase64(`${baseUrl}/${path}`);
      if (b64) cache[path] = b64;
    }
  }

  await Promise.all(
    Array.from({ length: Math.min(CONCURRENCY, uniquePaths.length) }, worker)
  );

  console.log(
    `[preloadImagesAsBase64] ${Object.keys(cache).length} / ${uniquePaths.length} images loaded successfully`
  );

  return cache;
}
