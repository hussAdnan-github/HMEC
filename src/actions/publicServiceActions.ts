'use server';

import { serverFetch, formatApiErrorMessage } from '@/lib/server-api';
import type { ApiPublicService } from '@/types/api';
import { revalidatePath } from 'next/cache';

/**
 * Server Action: Fetch all public services from the server.
 * Endpoint: GET /content/pullicservice/
 */
export async function getPublicServicesServerAction(): Promise<ApiPublicService[] | null> {
  try {
    const res = await serverFetch<any>('/content/pullicservice/', {
      next: { revalidate: 0 },
    });

    if (res.success && res.data) {
      const data = res.data;
      if (data.data?.results && Array.isArray(data.data.results)) {
        return data.data.results;
      } else if (Array.isArray(data.data)) {
        return data.data;
      } else if (data.results && Array.isArray(data.results)) {
        return data.results;
      } else if (Array.isArray(data)) {
        return data;
      }
    }

    return null;
  } catch (error) {
    console.error('Error in getPublicServicesServerAction:', error);
    return null;
  }
}

/**
 * Server Action: Create a new public service.
 * Endpoint: POST /content/pullicservice/
 */
export async function createPublicServiceServerAction(data: {
  name_ar: string;
  name_en: string;
}): Promise<{ success: boolean; data?: ApiPublicService; error?: string }> {
  try {
    const res = await serverFetch<any>('/content/pullicservice/', {
      method: 'POST',
      body: JSON.stringify(data),
    });

    if (res.success && res.data) {
      revalidatePath('/');
      revalidatePath('/[locale]', 'layout');
      revalidatePath('/dashboard/site-cms/public-services');
      
      const responseData = res.data.data || res.data;
      return { success: true, data: responseData };
    }

    return {
      success: false,
      error: res.error || (res.data ? formatApiErrorMessage(res.data) : 'فشل إضافة الخدمة العامة'),
    };
  } catch (error: any) {
    console.error('Error in createPublicServiceServerAction:', error);
    return { success: false, error: error.message || 'حدث خطأ أثناء إضافة الخدمة العامة' };
  }
}

/**
 * Server Action: Update an existing public service.
 * Endpoint: PUT/PATCH /content/pullicservice/${id}/
 */
export async function updatePublicServiceServerAction(
  id: number,
  data: {
    name_ar: string;
    name_en: string;
  }
): Promise<{ success: boolean; data?: ApiPublicService; error?: string }> {
  try {
    const res = await serverFetch<any>(`/content/pullicservice/${id}/`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });

    if (res.success && res.data) {
      revalidatePath('/');
      revalidatePath('/[locale]', 'layout');
      revalidatePath('/dashboard/site-cms/public-services');
      
      const responseData = res.data.data || res.data;
      return { success: true, data: responseData };
    }

    return {
      success: false,
      error: res.error || (res.data ? formatApiErrorMessage(res.data) : 'فشل تعديل الخدمة العامة'),
    };
  } catch (error: any) {
    console.error(`Error in updatePublicServiceServerAction for id ${id}:`, error);
    return { success: false, error: error.message || 'حدث خطأ أثناء تعديل الخدمة العامة' };
  }
}

/**
 * Server Action: Delete a public service.
 * Endpoint: DELETE /content/pullicservice/${id}/
 */
export async function deletePublicServiceServerAction(
  id: number
): Promise<{ success: boolean; error?: string }> {
  try {
    const res = await serverFetch<any>(`/content/pullicservice/${id}/`, {
      method: 'DELETE',
    });

    if (res.success) {
      revalidatePath('/');
      revalidatePath('/[locale]', 'layout');
      revalidatePath('/dashboard/site-cms/public-services');
      return { success: true };
    }

    return {
      success: false,
      error: res.error || 'فشل حذف الخدمة العامة',
    };
  } catch (error: any) {
    console.error(`Error in deletePublicServiceServerAction for id ${id}:`, error);
    return { success: false, error: error.message || 'حدث خطأ أثناء حذف الخدمة العامة' };
  }
}
