'use server';

import { serverFetch, formatApiErrorMessage } from '@/lib/server-api';
import type { ApiGoal } from '@/types/api';
import { revalidatePath } from 'next/cache';

/**
 * Server Action: Fetch all goals from the server.
 * Endpoint: GET /content/gool/
 */
export async function getGoalsServerAction(): Promise<ApiGoal[] | null> {
  try {
    const res = await serverFetch<any>('/content/gool/', {
      next: { revalidate: 0 },
    });

    if (res.success && res.data) {
      // The API response structure: { success: true, message: "...", data: { results: [...] } }
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
    console.error('Error in getGoalsServerAction:', error);
    return null;
  }
}

/**
 * Server Action: Create a new goal.
 * Endpoint: POST /content/gool/
 */
export async function createGoalServerAction(data: {
  name_ar: string;
  name_en: string;
}): Promise<{ success: boolean; data?: ApiGoal; error?: string }> {
  try {
    const res = await serverFetch<any>('/content/gool/', {
      method: 'POST',
      body: JSON.stringify(data),
    });

    if (res.success && res.data) {
      revalidatePath('/');
      revalidatePath('/[locale]', 'layout');
      revalidatePath('/dashboard/site-cms/goals');
      
      const responseData = res.data.data || res.data;
      return { success: true, data: responseData };
    }

    return {
      success: false,
      error: res.error || (res.data ? formatApiErrorMessage(res.data) : 'فشل إضافة الهدف'),
    };
  } catch (error: any) {
    console.error('Error in createGoalServerAction:', error);
    return { success: false, error: error.message || 'حدث خطأ أثناء إضافة الهدف' };
  }
}

/**
 * Server Action: Update an existing goal.
 * Endpoint: PUT/PATCH /content/gool/${id}/
 */
export async function updateGoalServerAction(
  id: number,
  data: {
    name_ar: string;
    name_en: string;
  }
): Promise<{ success: boolean; data?: ApiGoal; error?: string }> {
  try {
    const res = await serverFetch<any>(`/content/gool/${id}/`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });

    if (res.success && res.data) {
      revalidatePath('/');
      revalidatePath('/[locale]', 'layout');
      revalidatePath('/dashboard/site-cms/goals');
      
      const responseData = res.data.data || res.data;
      return { success: true, data: responseData };
    }

    return {
      success: false,
      error: res.error || (res.data ? formatApiErrorMessage(res.data) : 'فشل تعديل الهدف'),
    };
  } catch (error: any) {
    console.error(`Error in updateGoalServerAction for id ${id}:`, error);
    return { success: false, error: error.message || 'حدث خطأ أثناء تعديل الهدف' };
  }
}

/**
 * Server Action: Delete a goal.
 * Endpoint: DELETE /content/gool/${id}/
 */
export async function deleteGoalServerAction(
  id: number
): Promise<{ success: boolean; error?: string }> {
  try {
    const res = await serverFetch<any>(`/content/gool/${id}/`, {
      method: 'DELETE',
    });

    if (res.success) {
      revalidatePath('/');
      revalidatePath('/[locale]', 'layout');
      revalidatePath('/dashboard/site-cms/goals');
      return { success: true };
    }

    return {
      success: false,
      error: res.error || 'فشل حذف الهدف',
    };
  } catch (error: any) {
    console.error(`Error in deleteGoalServerAction for id ${id}:`, error);
    return { success: false, error: error.message || 'حدث خطأ أثناء حذف الهدف' };
  }
}
