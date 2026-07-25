'use server';

import { serverFetch, formatApiErrorMessage } from '@/lib/server-api';
import type { ApiContent } from '@/types/api';
import { revalidatePath } from 'next/cache';

export async function getContentServerAction(): Promise<ApiContent | null> {
  try {
    const res = await serverFetch<any>('/content/content/', {
      next: { revalidate: 0 },
    });

    if (res.success && res.data) {

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
        return resultsArray[0] as ApiContent; 
      }
    }

    return null;
  } catch (error) {
    console.error('Error in getContentServerAction:', error);
    return null;
  }
}

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
