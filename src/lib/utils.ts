export const API_BASE_URL = 'https://hmec.pythonanywhere.com';

/**
 * Ensures that an image URL is an absolute URL pointing to the backend
 * if it is a relative path returned by the API.
 */
export function getImageUrl(path: string | undefined | null): string {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  return `${API_BASE_URL}${path}`;
}
