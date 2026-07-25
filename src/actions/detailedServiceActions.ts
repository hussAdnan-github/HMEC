'use server';

import { serverFetch } from '@/lib/server-api';
import type { ApiService } from '@/types/api';
import { revalidatePath } from 'next/cache';

export async function getDetailedServicesServerAction(): Promise<ApiService[] | null> {
  try {
    const res = await serverFetch<any>('/content/service/', {
      next: { revalidate: 3600 },
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
    console.error('Error in getDetailedServicesServerAction:', error);
    return null;
  }
}

export async function createDetailedServiceServerAction(data: { name_ar: string; name_en: string; agent: number }) {
  try {
    const res = await serverFetch<any>('/content/service/', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (res.success && res.data) {
      revalidatePath('/dashboard/site-cms');
      revalidatePath('/[locale]', 'layout');
      const responseData = res.data.data || res.data;
      return { success: true, data: responseData };
    }

    return { success: false, message: res.error || 'فشل إضافة الخدمة', error: res.error || 'فشل إضافة الخدمة', data: null };
  } catch (error) {
    console.error('Error in createDetailedServiceServerAction:', error);
    return { success: false, message: 'فشل إضافة الخدمة', error: 'فشل إضافة الخدمة', data: null };
  }
}

export async function updateDetailedServiceServerAction(id: number, data: { name_ar: string; name_en: string; agent: number }) {
  try {
    const res = await serverFetch<any>(`/content/service/${id}/`, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (res.success && res.data) {
      revalidatePath('/dashboard/site-cms');
      revalidatePath('/[locale]', 'layout');
      const responseData = res.data.data || res.data;
      return { success: true, data: responseData };
    }

    return { success: false, message: res.error || 'فشل تحديث الخدمة', error: res.error || 'فشل تحديث الخدمة', data: null };
  } catch (error) {
    console.error('Error in updateDetailedServiceServerAction:', error);
    return { success: false, message: 'فشل تحديث الخدمة', error: 'فشل تحديث الخدمة', data: null };
  }
}

export async function deleteDetailedServiceServerAction(id: number) {
  try {
    const res = await serverFetch<any>(`/content/service/${id}/`, {
      method: 'DELETE',
    });

    if (res.success) {
      revalidatePath('/dashboard/site-cms');
      revalidatePath('/[locale]', 'layout');
      return { success: true, data: null };
    }

    return { success: false, message: res.error || 'فشل حذف الخدمة', error: res.error || 'فشل حذف الخدمة', data: null };
  } catch (error) {
    console.error('Error in deleteDetailedServiceServerAction:', error);
    return { success: false, message: 'فشل حذف الخدمة', error: 'فشل حذف الخدمة', data: null };
  }
}
