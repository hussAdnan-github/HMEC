'use server';

import { serverFetch, formatApiErrorMessage } from '@/lib/server-api';
import type { ApiContent } from '@/types/api';
import { revalidatePath } from 'next/cache';

/**
 * Server Action: Fetch the main content from the server.
 * Endpoint: GET /content/content/
 */
export async function getContentServerAction(): Promise<ApiContent | null> {
  try {
    const res = await serverFetch<any>('/content/content/', {
      next: { revalidate: 0 },
    });

    if (res.success && res.data) {
      // The API response structure: { success: true, message: "...", data: { results: [...] } }
      const data = res.data;
      let resultsArray: any[] = [];

      if (data.data?.results && Array.isArray(data.data.results)) {
        resultsArray = data.data.results;
      } else if (Array.isArray(data.data)) {
        resultsArray = data.data;
      } else if (data.results && Array.isArray(data.results)) {
        resultsArray = data.results;
      } else if (Array.isArray(data)) {
        resultsArray = data;
      }

      if (resultsArray.length > 0) {
        return resultsArray[0] as ApiContent; // Return the first (and only) content record
      }
    }

    return null;
  } catch (error) {
    console.error('Error in getContentServerAction:', error);
    return null;
  }
}

/**
 * Server Action: Create the main content.
 * Endpoint: POST /content/content/
 */
export async function createContentServerAction(
  data: Omit<ApiContent, 'id' | 'create_at' | 'update_at'>
): Promise<{ success: boolean; data?: ApiContent; error?: string }> {
  try {
    const res = await serverFetch<any>('/content/content/', {
      method: 'POST',
      body: JSON.stringify(data),
    });

    if (res.success && res.data) {
      revalidatePath('/');
      revalidatePath('/[locale]', 'layout');
      revalidatePath('/dashboard/site-cms/main-content');
      
      const responseData = res.data.data || res.data;
      return { success: true, data: responseData };
    }

    return {
      success: false,
      error: res.error || (res.data ? formatApiErrorMessage(res.data) : 'فشل حفظ المحتوى'),
    };
  } catch (error: any) {
    console.error('Error in createContentServerAction:', error);
    return { success: false, error: error.message || 'حدث خطأ أثناء حفظ المحتوى' };
  }
}

/**
 * Server Action: Update the existing main content.
 * Endpoint: PUT/PATCH /content/content/${id}/
 */
export async function updateContentServerAction(
  id: number,
  data: Partial<Omit<ApiContent, 'id' | 'create_at' | 'update_at'>>
): Promise<{ success: boolean; data?: ApiContent; error?: string }> {
  try {
    const res = await serverFetch<any>(`/content/content/${id}/`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });

    if (res.success && res.data) {
      revalidatePath('/');
      revalidatePath('/[locale]', 'layout');
      revalidatePath('/dashboard/site-cms/main-content');
      
      const responseData = res.data.data || res.data;
      return { success: true, data: responseData };
    }

    return {
      success: false,
      error: res.error || (res.data ? formatApiErrorMessage(res.data) : 'فشل تعديل المحتوى'),
    };
  } catch (error: any) {
    console.error(`Error in updateContentServerAction for id ${id}:`, error);
    return { success: false, error: error.message || 'حدث خطأ أثناء تعديل المحتوى' };
  }
}
