'use server';

import { serverFetch, formatApiErrorMessage } from '@/lib/server-api';
import { revalidatePath } from 'next/cache';

export interface ApiContactMessage {
  id?: number;
  name_ar: string;
  name_en: string;
  phone: string;
  subject: string;
  email: string;
  message: string;
  create_at?: string;
}

export async function submitContactUsAction(
  data: Omit<ApiContactMessage, 'id' | 'create_at'>
): Promise<{ success: boolean; data?: ApiContactMessage; error?: string }> {
  try {
    const res = await serverFetch<any>('/content/contactus/', {
      method: 'POST',
      body: JSON.stringify(data),
    });

    if (res.success && res.data) {
      return { success: true, data: res.data.data || res.data };
    }

    return {
      success: false,
      error: res.error || (res.data ? formatApiErrorMessage(res.data) : 'فشل إرسال الرسالة'),
    };
  } catch (error) {
    console.error('Error in submitContactUsAction:', error);
    return { success: false, error: (error instanceof Error ? error.message : undefined) || 'حدث خطأ أثناء إرسال الرسالة' };
  }
}

export async function getContactMessagesAction(): Promise<ApiContactMessage[] | null> {
  try {
    const res = await serverFetch<any>('/content/contactus/', {
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
    console.error('Error in getContactMessagesAction:', error);
    return null;
  }
}
