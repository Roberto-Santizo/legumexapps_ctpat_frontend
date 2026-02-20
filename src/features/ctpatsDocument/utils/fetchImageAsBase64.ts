/**
 * Fetches an image URL and returns it as a JPEG base64 data URL.
 * Uses canvas conversion to avoid react-pdf's PNG parser (pngjs) issues.
 * Returns null if the fetch or conversion fails.
 */
export async function fetchImageAsBase64(url: string): Promise<string | null> {
  try {
    const response = await fetch(url);
    if (!response.ok) return null;
    const blob = await response.blob();

    // Use the browser's native decoder via createImageBitmap, then
    // export as JPEG — react-pdf handles JPEG reliably, unlike some PNGs.
    const bitmap = await createImageBitmap(blob);
    const canvas = document.createElement("canvas");
    canvas.width = bitmap.width;
    canvas.height = bitmap.height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;
    ctx.drawImage(bitmap, 0, 0);
    return canvas.toDataURL("image/jpeg", 0.92);
  } catch {
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
