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

 
export function formatApiErrorMessage(errJson: any): string {
  if (!errJson) return 'حدث خطأ في السيرفر';
  if (typeof errJson === 'string') return errJson;

  let mainMessage = '';
  if (errJson.message && typeof errJson.message === 'string') {
    mainMessage = errJson.message;
  } else if (errJson.detail && typeof errJson.detail === 'string') {
    mainMessage = errJson.detail;
  } else if (errJson.error && typeof errJson.error === 'string') {
    mainMessage = errJson.error;
  }

  let fieldErrorsFormatted = '';
  const rawErrors = errJson.errors || (errJson.error && typeof errJson.error === 'object' ? errJson.error : null);

  const extractValues = (errorsObj: Record<string, any>): string => {
    const errorValues: string[] = [];
    for (const [key, val] of Object.entries(errorsObj)) {
      if (key === 'success' || key === 'status') continue;
      let valStr = '';
      if (Array.isArray(val)) {
        valStr = val.map((v) => (typeof v === 'object' ? JSON.stringify(v) : String(v))).join(', ');
      } else if (typeof val === 'object' && val !== null) {
        valStr = JSON.stringify(val);
      } else {
        valStr = String(val);
      }
      valStr = valStr.trim();
      if (valStr && !errorValues.includes(valStr)) {
        errorValues.push(valStr);
      }
    }
    return errorValues.join(' | ');
  };

  if (rawErrors) {
    if (typeof rawErrors === 'string') {
      fieldErrorsFormatted = rawErrors;
    } else if (typeof rawErrors === 'object' && rawErrors !== null) {
      fieldErrorsFormatted = extractValues(rawErrors);
    }
  }

  if (mainMessage && fieldErrorsFormatted) {
    return `${mainMessage}\n${fieldErrorsFormatted}`;
  }
  if (mainMessage) return mainMessage;
  if (fieldErrorsFormatted) return fieldErrorsFormatted;

  // Fallback for direct field dictionary responses without message/errors wrapper: e.g. { "image": "..." }
  if (typeof errJson === 'object' && errJson !== null) {
    const fallbackVals = extractValues(errJson);
    if (fallbackVals) return fallbackVals;
  }

  return 'حدث خطأ غير معروف في السيرفر';
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

    // If the body is FormData, do not set Content-Type header so the browser/runtime
    // can set it automatically with the correct multipart boundary
    const isFormData =
      options?.body instanceof FormData ||
      (options?.body &&
        typeof options.body === 'object' &&
        typeof (options.body as any).append === 'function' &&
        typeof (options.body as any).get === 'function');

    if (isFormData) {
      if (authHeaders instanceof Headers) {
        authHeaders.delete('Content-Type');
        authHeaders.delete('content-type');
      } else if (typeof authHeaders === 'object' && authHeaders !== null) {
        delete (authHeaders as Record<string, string>)['Content-Type'];
        delete (authHeaders as Record<string, string>)['content-type'];
      }
    }

    const response = await fetch(fullUrl, {
      ...options,
      headers: authHeaders,
    });

    if (!response.ok) {
      let serverErrorMessage = `خطأ في السيرفر (${response.status}): ${response.statusText}`;
      try {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const errJson = await response.json();
          if (errJson) {
            serverErrorMessage = formatApiErrorMessage(errJson);
          }
        } else {
          const errText = await response.text();
          if (errText && errText.length < 300) {
            serverErrorMessage = errText;
          }
        }
      } catch (e) {
        // Fallback to generic message if parsing fails
      }

      return {
        success: false,
        error: serverErrorMessage,
        status: response.status,
      };
    }

    if (response.status === 204 || response.status === 205) {
      return { success: true, status: response.status };
    }

    const text = await response.text();
    const data: T = text ? JSON.parse(text) : ({} as T);

    if (data && typeof data === 'object' && (data as any).success === false) {
      const serverErrorMessage = formatApiErrorMessage(data);
      return {
        success: false,
        error: serverErrorMessage,
        data,
        status: response.status,
      };
    }

    return { success: true, data, status: response.status };
  } catch (error: any) {
    console.error(`serverFetch error for endpoint [${endpoint}]:`, error);
    return {
      success: false,
      error: error?.message || 'حدث خطأ في الاتصال بالسيرفر',
    };
  }
}

