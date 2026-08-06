'use server';

import { serverFetch, formatApiErrorMessage } from '@/lib/server-api';
import type { ApiPublicService } from '@/types/api';
import { revalidatePath } from 'next/cache';

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
  } catch (error) {
    console.error('Error in createPublicServiceServerAction:', error);
    return { success: false, error: (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? error.message : undefined) : undefined) : undefined) || 'حدث خطأ أثناء إضافة الخدمة العامة' };
  }
}

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
  } catch (error) {
    console.error(`Error in updatePublicServiceServerAction for id ${id}:`, error);
    return { success: false, error: (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? error.message : undefined) : undefined) : undefined) || 'حدث خطأ أثناء تعديل الخدمة العامة' };
  }
}

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
  } catch (error) {
    console.error(`Error in deletePublicServiceServerAction for id ${id}:`, error);
    return { success: false, error: (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? error.message : undefined) : undefined) : undefined) || 'حدث خطأ أثناء حذف الخدمة العامة' };
  }
}
