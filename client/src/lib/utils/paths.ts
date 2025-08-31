/**
 * Utility function to get properly prefixed asset paths
 * Works in both development and GitHub Pages deployment
 */
export function getAssetPath(path: string): string {
  // Remove leading slash if present to avoid double slashes
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${import.meta.env.BASE_URL}${cleanPath}`;
}