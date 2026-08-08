'use server';

import { serverFetch, formatApiErrorMessage } from '@/lib/server-api';
import type { 
  ApiEducationalLevelsResponse,
  ApiSingleEducationalLevelResponse,
  ApiEducationalLevel
} from '@/types/api';
import { revalidatePath } from 'next/cache';

export async function getEducationalLevelsServerAction(params?: {
  page?: number;
  search?: string;
}): Promise<ApiEducationalLevelsResponse | null> {
  try {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.set('page', params.page.toString());
    if (params?.search) searchParams.set('search', params.search);

    const queryString = searchParams.toString();
    const endpoint = `/hr/educationallevel/${queryString ? `?${queryString}` : ''}`;

    const res = await serverFetch<ApiEducationalLevelsResponse>(endpoint, {
      next: { revalidate: 0 }, 
    });

    if (res.success && res.data) {
      return res.data;
    }

    return null;
  } catch (error) {
    console.error('Error in getEducationalLevelsServerAction:', error);
    return null;
  }
}

export async function createEducationalLevelServerAction(data: {
  name: string;
}): Promise<{ success: boolean; data?: ApiEducationalLevel; error?: string }> {
  try {
    const res = await serverFetch<ApiSingleEducationalLevelResponse>('/hr/educationallevel/', {
      method: 'POST',
      body: JSON.stringify(data),
    });

    if (res.success && res.data) {
      const levelData = (res.data as { data?: unknown }).data || res.data;
      revalidatePath('/dashboard/hr/education-levels');
      return { success: true, data: levelData as ApiEducationalLevel };
    }

    return { 
      success: false, 
      error: res.error || (res.data ? formatApiErrorMessage(res.data) : 'فشل إضافة المستوى التعليمي') 
    };
  } catch (error) {
    console.error('Error in createEducationalLevelServerAction:', error);
    return { success: false, error: error instanceof Error ? error.message : 'حدث خطأ أثناء الإضافة' };
  }
}

export async function updateEducationalLevelServerAction(
  id: string | number,
  data: { name: string; }
): Promise<{ success: boolean; data?: ApiEducationalLevel; error?: string }> {
  try {
    const res = await serverFetch<ApiSingleEducationalLevelResponse>(`/hr/educationallevel/${id}/`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });

    if (res.success && res.data) {
      const levelData = (res.data as { data?: unknown }).data || res.data;
      revalidatePath('/dashboard/hr/education-levels');
      return { success: true, data: levelData as ApiEducationalLevel };
    }

    return { 
      success: false, 
      error: res.error || (res.data ? formatApiErrorMessage(res.data) : 'فشل تعديل المستوى التعليمي') 
    };
  } catch (error) {
    console.error(`Error in updateEducationalLevelServerAction for id ${id}:`, error);
    return { success: false, error: error instanceof Error ? error.message : 'حدث خطأ أثناء التعديل' };
  }
}

export async function deleteEducationalLevelServerAction(
  id: string | number
): Promise<{ success: boolean; error?: string }> {
  try {
    const res = await serverFetch<any>(`/hr/educationallevel/${id}/`, {
      method: 'DELETE',
    });

    if (res.success) {
      revalidatePath('/dashboard/hr/education-levels');
      return { success: true };
    }

    return { success: false, error: res.error || 'فشل حذف المستوى التعليمي' };
  } catch (error) {
    console.error(`Error in deleteEducationalLevelServerAction for id ${id}:`, error);
    return { success: false, error: error instanceof Error ? error.message : 'حدث خطأ أثناء الحذف' };
  }
}
