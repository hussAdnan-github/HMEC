'use server';

import { serverFetch, formatApiErrorMessage } from '@/lib/server-api';
import type { ApiCustomerReview, ApiPaginatedData } from '@/types/api';
import { revalidatePath } from 'next/cache';

export async function getTestimonialsServerAction(): Promise<ApiCustomerReview[] | null> {
  try {
    const res = await serverFetch<{ success: boolean; message: string; data: ApiPaginatedData<ApiCustomerReview> }>('/content/customerreview/', {
      next: { revalidate: 0 },
    });

    if (res.success && res.data?.data?.results) {
      return res.data.data.results;
    }

    return null;
  } catch (error) {
    console.error('Error in getTestimonialsServerAction:', error);
    return null;
  }
}

export async function createTestimonialServerAction(
  formData: FormData
): Promise<{ success: boolean; data?: ApiCustomerReview; error?: string }> {
  try {
    const res = await serverFetch<{ success: boolean; message: string; data: ApiCustomerReview }>('/content/customerreview/', {
      method: 'POST',
      body: formData,
    });

    if (res.success && res.data) {
      revalidatePath('/');
      revalidatePath('/[locale]', 'layout');
      revalidatePath('/dashboard/site-cms/testimonials');

      const responseData = res.data.data;
      return { success: true, data: responseData };
    }

    return {
      success: false,
      error: res.error || (res.data ? formatApiErrorMessage(res.data) : 'فشل إضافة التقييم'),
    };
  } catch (error) {
    console.error('Error in createTestimonialServerAction:', error);
    return { success: false, error: (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? error.message : undefined) : undefined) : undefined) || 'حدث خطأ أثناء إضافة التقييم' };
  }
}

export async function updateTestimonialServerAction(
  id: number,
  formData: FormData
): Promise<{ success: boolean; data?: ApiCustomerReview; error?: string }> {
  try {
    const res = await serverFetch<{ success: boolean; message: string; data: ApiCustomerReview }>(`/content/customerreview/${id}/`, {
      method: 'PATCH',
      body: formData,
    });

    if (res.success && res.data) {
      revalidatePath('/');
      revalidatePath('/[locale]', 'layout');
      revalidatePath('/dashboard/site-cms/testimonials');

      const responseData = res.data.data;
      return { success: true, data: responseData };
    }

    return {
      success: false,
      error: res.error || (res.data ? formatApiErrorMessage(res.data) : 'فشل تعديل التقييم'),
    };
  } catch (error) {
    console.error(`Error in updateTestimonialServerAction for id ${id}:`, error);
    return { success: false, error: (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? error.message : undefined) : undefined) : undefined) || 'حدث خطأ أثناء تعديل التقييم' };
  }
}

export async function deleteTestimonialServerAction(
  id: number
): Promise<{ success: boolean; error?: string }> {
  try {
    const res = await serverFetch<{ success: boolean; message: string }>(`/content/customerreview/${id}/`, {
      method: 'DELETE',
    });

    if (res.success) {
      revalidatePath('/');
      revalidatePath('/[locale]', 'layout');
      revalidatePath('/dashboard/site-cms/testimonials');
      return { success: true };
    }

    return {
      success: false,
      error: res.error || 'فشل حذف التقييم',
    };
  } catch (error) {
    console.error(`Error in deleteTestimonialServerAction for id ${id}:`, error);
    return { success: false, error: (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? error.message : undefined) : undefined) : undefined) || 'حدث خطأ أثناء حذف التقييم' };
  }
}
