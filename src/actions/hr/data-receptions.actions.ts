'use server';

import { serverFetch, formatApiErrorMessage } from '@/lib/server-api';
import type { 
  ApiDataReceptionsResponse,
  ApiSingleDataReceptionResponse,
  ApiDataReception
} from '@/types/api';
import { revalidatePath } from 'next/cache';

export async function getDataReceptionsServerAction(params?: {
  page?: number;
  search?: string;
}): Promise<ApiDataReceptionsResponse | null> {
  try {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.set('page', params.page.toString());
    if (params?.search) searchParams.set('search', params.search);

    const queryString = searchParams.toString();
    const endpoint = `/hr/dataresptions/${queryString ? `?${queryString}` : ''}`;

    const res = await serverFetch<ApiDataReceptionsResponse>(endpoint, {
      next: { revalidate: 0 }, 
    });

    if (res.success && res.data) {
      return res.data;
    }

    return null;
  } catch (error) {
    console.error('Error in getDataReceptionsServerAction:', error);
    return null;
  }
}

export async function createDataReceptionServerAction(data: {
  user_id: number | null;
  timestamp: string | null;
  status: string;
  finger_print_data: string;
  device_finger_print: number | null;
}): Promise<{ success: boolean; data?: ApiDataReception; error?: string }> {
  try {
    const res = await serverFetch<ApiSingleDataReceptionResponse>('/hr/dataresptions/', {
      method: 'POST',
      body: JSON.stringify(data),
    });

    if (res.success && res.data) {
      const respData = (res.data as { data?: unknown }).data || res.data;
      revalidatePath('/dashboard/hr/data-descriptions');
      return { success: true, data: respData as ApiDataReception };
    }

    return { 
      success: false, 
      error: res.error || (res.data ? formatApiErrorMessage(res.data) : 'فشل الإضافة') 
    };
  } catch (error) {
    console.error('Error in createDataReceptionServerAction:', error);
    return { success: false, error: error instanceof Error ? error.message : 'حدث خطأ أثناء الإضافة' };
  }
}

export async function updateDataReceptionServerAction(
  id: string | number,
  data: {
    user_id: number | null;
    timestamp: string | null;
    status: string;
    finger_print_data: string;
    device_finger_print: number | null;
  }
): Promise<{ success: boolean; data?: ApiDataReception; error?: string }> {
  try {
    const res = await serverFetch<ApiSingleDataReceptionResponse>(`/hr/dataresptions/${id}/`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });

    if (res.success && res.data) {
      const respData = (res.data as { data?: unknown }).data || res.data;
      revalidatePath('/dashboard/hr/data-descriptions');
      return { success: true, data: respData as ApiDataReception };
    }

    return { 
      success: false, 
      error: res.error || (res.data ? formatApiErrorMessage(res.data) : 'فشل التعديل') 
    };
  } catch (error) {
    console.error(`Error in updateDataReceptionServerAction for id ${id}:`, error);
    return { success: false, error: error instanceof Error ? error.message : 'حدث خطأ أثناء التعديل' };
  }
}

export async function deleteDataReceptionServerAction(
  id: string | number
): Promise<{ success: boolean; error?: string }> {
  try {
    const res = await serverFetch<any>(`/hr/dataresptions/${id}/`, {
      method: 'DELETE',
    });

    if (res.success) {
      revalidatePath('/dashboard/hr/data-descriptions');
      return { success: true };
    }

    return { success: false, error: res.error || 'فشل الحذف' };
  } catch (error) {
    console.error(`Error in deleteDataReceptionServerAction for id ${id}:`, error);
    return { success: false, error: error instanceof Error ? error.message : 'حدث خطأ أثناء الحذف' };
  }
}
