'use server';

import { serverFetch, formatApiErrorMessage } from '@/lib/server-api';
import type { ApiBranch, ApiPaginatedData } from '@/types/api';
import { revalidatePath } from 'next/cache';

export async function getBranchesServerAction(): Promise<ApiBranch[] | null> {
  try {
    const res = await serverFetch<{ success: boolean; message: string; data: ApiPaginatedData<ApiBranch> }>('/content/branch/', {
      next: { revalidate: 0 },
    });

    if (res.success && res.data?.data?.results) {
      return res.data.data.results;
    }

    return null;
  } catch (error) {
    console.error('Error in getBranchesServerAction:', error);
    return null;
  }
}

export async function createBranchServerAction(
  formData: FormData
): Promise<{ success: boolean; data?: ApiBranch; error?: string }> {
  try {
    const res = await serverFetch<{ success: boolean; message: string; data: ApiBranch }>('/content/branch/', {
      method: 'POST',
      body: formData,
    });

    if (res.success && res.data) {
      revalidatePath('/');
      revalidatePath('/[locale]', 'layout');
      revalidatePath('/dashboard/site-cms/branches');

      const responseData = res.data.data;
      return { success: true, data: responseData };
    }

    return {
      success: false,
      error: res.error || (res.data ? formatApiErrorMessage(res.data) : 'فشل إضافة الفرع'),
    };
  } catch (error) {
    console.error('Error in createBranchServerAction:', error);
    return { success: false, error: (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? error.message : undefined) : undefined) : undefined) || 'حدث خطأ أثناء إضافة الفرع' };
  }
}

export async function updateBranchServerAction(
  id: number,
  formData: FormData
): Promise<{ success: boolean; data?: ApiBranch; error?: string }> {
  try {
    const res = await serverFetch<{ success: boolean; message: string; data: ApiBranch }>(`/content/branch/${id}/`, {
      method: 'PATCH',
      body: formData,
    });

    if (res.success && res.data) {
      revalidatePath('/');
      revalidatePath('/[locale]', 'layout');
      revalidatePath('/dashboard/site-cms/branches');

      const responseData = res.data.data;
      return { success: true, data: responseData };
    } 

    return {
      success: false,
      error: res.error || (res.data ? formatApiErrorMessage(res.data) : 'فشل تعديل الفرع'),
    };
  } catch (error) {
    console.error(`Error in updateBranchServerAction for id ${id}:`, error);
    return { success: false, error: (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? error.message : undefined) : undefined) : undefined) || 'حدث خطأ أثناء تعديل الفرع' };
  }
}

export async function deleteBranchServerAction(
  id: number
): Promise<{ success: boolean; error?: string }> {
  try {
    const res = await serverFetch<{ success: boolean; message: string }>(`/content/branch/${id}/`, {
      method: 'DELETE',
    });

    if (res.success) {
      revalidatePath('/');
      revalidatePath('/[locale]', 'layout');
      revalidatePath('/dashboard/site-cms/branches');
      return { success: true };
    }

    return {
      success: false,
      error: res.error || 'فشل حذف الفرع',
    };
  } catch (error) {
    console.error(`Error in deleteBranchServerAction for id ${id}:`, error);
    return { success: false, error: (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? error.message : undefined) : undefined) : undefined) || 'حدث خطأ أثناء حذف الفرع' };
  }
}
