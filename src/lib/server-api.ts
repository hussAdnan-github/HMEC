import { cookies } from 'next/headers';

/**
 * Returns the Base API URL configured in Environment Variables.
 */
export function getApiBaseUrl(): string {
  return (
    process.env.API_BASE_URL ||
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    'https://hmec.pythonanywhere.com'
  );
}

/**
 * Retrieves the Auth token from cookies or headers.
 * Checks for 'auth_token', 'access_token', or 'token'.
 */
export async function getAuthToken(): Promise<string | null> {
  try {
    const cookieStore = await cookies();
    const token =
      cookieStore.get('auth_token')?.value ||
      cookieStore.get('access_token')?.value ||
      cookieStore.get('token')?.value;

    return token || null;
  } catch (e) {
    return null;
  }
}

/**
 * Verifies if a valid token exists in the request cookies.
 * Can be extended to validate JWT expiration or user role.
 */
export async function isUserAuthenticated(): Promise<boolean> {
  const token = await getAuthToken();
  return !!token;
}

/**
 * Constructs standard HTTP headers for server requests,
 * automatically injecting Authorization Bearer token if present.
 */
export async function getAuthHeaders(extraHeaders?: HeadersInit): Promise<HeadersInit> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };

  const token = await getAuthToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  if (extraHeaders) {
    if (extraHeaders instanceof Headers) {
      extraHeaders.forEach((value, key) => {
        headers[key] = value;
      });
    } else if (Array.isArray(extraHeaders)) {
      extraHeaders.forEach(([key, value]) => {
        headers[key] = value;
      });
    } else {
      Object.assign(headers, extraHeaders);
    }
  }

  return headers;
}

/**
 * Global Server Fetch Wrapper for Server Actions & Server Components.
 * Prepends Base API URL, injects Auth Headers, handles errors and returns typed responses.
 */
export async function serverFetch<T>(
  endpoint: string,
  options?: RequestInit & { requiresAuth?: boolean }
): Promise<{ success: boolean; data?: T; error?: string; status?: number }> {
  try {
    const baseUrl = getApiBaseUrl();
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    const fullUrl = endpoint.startsWith('http') ? endpoint : `${baseUrl}${cleanEndpoint}`;

    if (options?.requiresAuth) {
      const isAuth = await isUserAuthenticated();
      if (!isAuth) {
        return { success: false, error: 'Unauthorized: User is not logged in', status: 401 };
      }
    }

    const authHeaders = await getAuthHeaders(options?.headers);

    const response = await fetch(fullUrl, {
      ...options,
      headers: authHeaders,
    });

    if (!response.ok) {
      return {
        success: false,
        error: `API Error: ${response.status} ${response.statusText}`,
        status: response.status,
      };
    }

    const data: T = await response.json();
    return { success: true, data, status: response.status };
  } catch (error: any) {
    console.error(`serverFetch error for endpoint [${endpoint}]:`, error);
    return {
      success: false,
      error: error?.message || 'Network error occurred during server fetch',
    };
  }
}
