'use server';

import { serverFetch, formatApiErrorMessage } from '@/lib/server-api';
import type { ApiAgent } from '@/types/api';
import { revalidatePath } from 'next/cache';

/**
 * Server Action: Fetch all agents from the server.
 * Endpoint: GET /content/ouragent/
 */
export async function getAgentsServerAction(): Promise<ApiAgent[] | null> {
  try {
    const res = await serverFetch<any>('/content/ouragent/', {
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
    console.error('Error in getAgentsServerAction:', error);
    return null;
  }
}

/**
 * Server Action: Create a new agent.
 * Endpoint: POST /content/ouragent/
 * Uses FormData to support image uploads.
 */
export async function createAgentServerAction(
  formData: FormData
): Promise<{ success: boolean; data?: ApiAgent; error?: string }> {
  try {
    const res = await serverFetch<any>('/content/ouragent/', {
      method: 'POST',
      body: formData,
    });

    if (res.success && res.data) {
      revalidatePath('/');
      revalidatePath('/[locale]', 'layout');
      revalidatePath('/dashboard/site-cms/agencies');
      
      const responseData = res.data.data || res.data;
      return { success: true, data: responseData };
    }

    return {
      success: false,
      error: res.error || (res.data ? formatApiErrorMessage(res.data) : 'فشل إضافة الوكيل'),
    };
  } catch (error: any) {
    console.error('Error in createAgentServerAction:', error);
    return { success: false, error: error.message || 'حدث خطأ أثناء إضافة الوكيل' };
  }
}

/**
 * Server Action: Update an existing agent.
 * Endpoint: PUT/PATCH /content/ouragent/${id}/
 * Uses FormData to support image uploads.
 */
export async function updateAgentServerAction(
  id: number,
  formData: FormData
): Promise<{ success: boolean; data?: ApiAgent; error?: string }> {
  try {
    const res = await serverFetch<any>(`/content/ouragent/${id}/`, {
      method: 'PATCH', // Usually Django APIs use PATCH for partial updates
      body: formData,
    });

    if (res.success && res.data) {
      revalidatePath('/');
      revalidatePath('/[locale]', 'layout');
      revalidatePath('/dashboard/site-cms/agencies');
      
      const responseData = res.data.data || res.data;
      return { success: true, data: responseData };
    }

    return {
      success: false,
      error: res.error || (res.data ? formatApiErrorMessage(res.data) : 'فشل تعديل الوكيل'),
    };
  } catch (error: any) {
    console.error(`Error in updateAgentServerAction for id ${id}:`, error);
    return { success: false, error: error.message || 'حدث خطأ أثناء تعديل الوكيل' };
  }
}

/**
 * Server Action: Delete an agent.
 * Endpoint: DELETE /content/ouragent/${id}/
 */
export async function deleteAgentServerAction(
  id: number
): Promise<{ success: boolean; error?: string }> {
  try {
    const res = await serverFetch<any>(`/content/ouragent/${id}/`, {
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
  } catch (error: any) {
    console.error(`Error in deleteAgentServerAction for id ${id}:`, error);
    return { success: false, error: error.message || 'حدث خطأ أثناء حذف الوكيل' };
  }
}
