'use server';

import { serverFetch, formatApiErrorMessage } from '@/lib/server-api';
import type { ApiAgent, ApiAgentsResponse } from '@/types/api';
import { revalidatePath } from 'next/cache';

export async function getAgentsServerAction(): Promise<ApiAgent[] | null> {
  try {
    const res = await serverFetch<ApiAgentsResponse>('/content/ouragent/', {
      next: { revalidate: 0 },
    }); 

    if (res.success && res.data?.data?.results) {
      return res.data.data.results;
    }

    return null;
  } catch (error) {
    console.error('Error in getAgentsServerAction:', error);
    return null;
  }
}

export async function createAgentServerAction(
  formData: FormData
): Promise<{ success: boolean; data?: ApiAgent; error?: string }> {
  try {
    const res = await serverFetch<{ success: boolean; message: string; data: ApiAgent }>('/content/ouragent/', {
      method: 'POST',
      body: formData,
    });

    if (res.success && res.data) {
      revalidatePath('/');
      revalidatePath('/[locale]', 'layout');
      revalidatePath('/dashboard/site-cms/agencies');

      const responseData = res.data.data;
      return { success: true, data: responseData };
    }

    return {
      success: false,
      error: res.error || (res.data ? formatApiErrorMessage(res.data) : 'فشل إضافة الوكيل'),
    };
  } catch (error) {
    console.error('Error in createAgentServerAction:', error);
    return { success: false, error: (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? error.message : undefined) : undefined) : undefined) || 'حدث خطأ أثناء إضافة الوكيل' };
  }
}

export async function updateAgentServerAction(
  id: number,
  formData: FormData
): Promise<{ success: boolean; data?: ApiAgent; error?: string }> {
  try {
    const res = await serverFetch<{ success: boolean; message: string; data: ApiAgent }>(`/content/ouragent/${id}/`, {
      method: 'PATCH',  
      body: formData,
    });

    if (res.success && res.data) {
      revalidatePath('/');
      revalidatePath('/[locale]', 'layout');
      revalidatePath('/dashboard/site-cms/agencies');

      const responseData = res.data.data;
      return { success: true, data: responseData };
    }

    return {
      success: false,
      error: res.error || (res.data ? formatApiErrorMessage(res.data) : 'فشل تعديل الوكيل'),
    };
  } catch (error) {
    console.error(`Error in updateAgentServerAction for id ${id}:`, error);
    return { success: false, error: (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? error.message : undefined) : undefined) : undefined) || 'حدث خطأ أثناء تعديل الوكيل' };
  }
}

export async function deleteAgentServerAction(
  id: number
): Promise<{ success: boolean; error?: string }> {
  try {
    const res = await serverFetch<{ success: boolean; message: string }>(`/content/ouragent/${id}/`, {
      method: 'DELETE',
    });

    if (res.success) {
      revalidatePath('/');
      revalidatePath('/[locale]', 'layout');
      revalidatePath('/dashboard/site-cms/agencies');
      return { success: true };
    }

    return {
      success: false,
      error: res.error || 'فشل حذف الوكيل',
    };
  } catch (error) {
    console.error(`Error in deleteAgentServerAction for id ${id}:`, error);
    return { success: false, error: (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? error.message : undefined) : undefined) : undefined) || 'حدث خطأ أثناء حذف الوكيل' };
  }
}
