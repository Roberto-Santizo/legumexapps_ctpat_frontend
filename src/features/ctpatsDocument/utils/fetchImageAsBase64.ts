// Max pixels on the longest side for images embedded in the PDF.
// High-res photos (e.g. 4000×3000) produce 3-5 MB base64 strings that
// react-pdf fails to render silently. Capping at 1200px keeps print
// quality while staying well within react-pdf's rendering limits.
const PDF_IMAGE_MAX_PX = 1200;

/**
 * Fetches an image URL and returns it as a JPEG base64 data URL.
 * Downscales the image if it exceeds PDF_IMAGE_MAX_PX on any side.
 * Uses canvas conversion to avoid react-pdf's PNG parser (pngjs) issues.
 * Returns null if the fetch or conversion fails.
 */
export async function fetchImageAsBase64(url: string): Promise<string | null> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.warn(`[fetchImageAsBase64] HTTP ${response.status} for: ${url}`);
      return null;
    }
    const blob = await response.blob();

    // Use the browser's native decoder via createImageBitmap, then
    // export as JPEG — react-pdf handles JPEG reliably, unlike some PNGs.
    const bitmap = await createImageBitmap(blob);

    // Downscale large images to avoid react-pdf memory/layout issues
    let { width, height } = bitmap;
    if (width > PDF_IMAGE_MAX_PX || height > PDF_IMAGE_MAX_PX) {
      const scale = Math.min(PDF_IMAGE_MAX_PX / width, PDF_IMAGE_MAX_PX / height);
      width = Math.round(width * scale);
      height = Math.round(height * scale);
    }

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;
    ctx.drawImage(bitmap, 0, 0, width, height);
    return canvas.toDataURL("image/jpeg", 0.85);
  } catch (err) {
    console.error(`[fetchImageAsBase64] Error loading: ${url}`, err);
    return null;
  }
}

/**
 * Pre-loads multiple image paths as base64 JPEG data URLs in parallel.
 * Returns a Record<path, base64DataUrl>.
 */
export async function preloadImagesAsBase64(
  paths: (string | null | undefined)[],
  baseUrl: string
): Promise<Record<string, string>> {
  const uniquePaths = [...new Set(paths.filter(Boolean))] as string[];

  const results = await Promise.allSettled(
    uniquePaths.map(async (path) => {
      const b64 = await fetchImageAsBase64(`${baseUrl}/${path}`);
      return { path, b64 };
    })
  );

  const cache: Record<string, string> = {};
  for (const result of results) {
    if (result.status === "fulfilled" && result.value.b64) {
      cache[result.value.path] = result.value.b64;
    }
  }
  return cache;
}
