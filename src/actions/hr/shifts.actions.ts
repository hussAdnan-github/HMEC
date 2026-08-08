'use server';

import { serverFetch, formatApiErrorMessage } from '@/lib/server-api';
import type { 
  ApiShiftsResponse,
  ApiSingleShiftResponse,
  ApiShift
} from '@/types/api';
import { revalidatePath } from 'next/cache';

export async function getShiftsServerAction(params?: {
  page?: number;
  search?: string;
}): Promise<ApiShiftsResponse | null> {
  try {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.set('page', params.page.toString());
    if (params?.search) searchParams.set('search', params.search);

    const queryString = searchParams.toString();
    const endpoint = `/hr/shift/${queryString ? `?${queryString}` : ''}`;

    const res = await serverFetch<ApiShiftsResponse>(endpoint, {
      next: { revalidate: 0 }, 
    });

    if (res.success && res.data) {
      return res.data;
    }

    return null;
  } catch (error) {
    console.error('Error in getShiftsServerAction:', error);
    return null;
  }
}

export async function createShiftServerAction(data: {
  name: string;
  start_time: string | null;
  end_time: string | null;
  days: number[];
  employees: number[];
}): Promise<{ success: boolean; data?: ApiShift; error?: string }> {
  try {
    const res = await serverFetch<ApiSingleShiftResponse>('/hr/shift/', {
      method: 'POST',
      body: JSON.stringify(data),
    });

    if (res.success && res.data) {
      const respData = (res.data as { data?: unknown }).data || res.data;
      revalidatePath('/dashboard/hr/shifts');
      return { success: true, data: respData as ApiShift };
    }

    return { 
      success: false, 
      error: res.error || (res.data ? formatApiErrorMessage(res.data) : 'فشل الإضافة') 
    };
  } catch (error) {
    console.error('Error in createShiftServerAction:', error);
    return { success: false, error: error instanceof Error ? error.message : 'حدث خطأ أثناء الإضافة' };
  }
}

export async function updateShiftServerAction(
  id: string | number,
  data: {
    name?: string;
    start_time?: string | null;
    end_time?: string | null;
    days?: number[];
    employees?: number[];
  }
): Promise<{ success: boolean; data?: ApiShift; error?: string }> {
  try {
    const res = await serverFetch<ApiSingleShiftResponse>(`/hr/shift/${id}/`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });

    if (res.success && res.data) {
      const respData = (res.data as { data?: unknown }).data || res.data;
      revalidatePath('/dashboard/hr/shifts');
      return { success: true, data: respData as ApiShift };
    }

    return { 
      success: false, 
      error: res.error || (res.data ? formatApiErrorMessage(res.data) : 'فشل التعديل') 
    };
  } catch (error) {
    console.error(`Error in updateShiftServerAction for id ${id}:`, error);
    return { success: false, error: error instanceof Error ? error.message : 'حدث خطأ أثناء التعديل' };
  }
}

export async function deleteShiftServerAction(
  id: string | number
): Promise<{ success: boolean; error?: string }> {
  try {
    const res = await serverFetch<any>(`/hr/shift/${id}/`, {
      method: 'DELETE',
    });

    if (res.success) {
      revalidatePath('/dashboard/hr/shifts');
      return { success: true };
    }

    return { success: false, error: res.error || 'فشل الحذف' };
  } catch (error) {
    console.error(`Error in deleteShiftServerAction for id ${id}:`, error);
    return { success: false, error: error instanceof Error ? error.message : 'حدث خطأ أثناء الحذف' };
  }
}
