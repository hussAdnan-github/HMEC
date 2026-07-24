'use server';

import { serverFetch, formatApiErrorMessage } from '@/lib/server-api';
import type { 
  ApiProjectsResponse, 
  ApiSingleProjectResponse, 
  ApiProject,
  ApiProjectImage
} from '@/types/api';
import { revalidatePath } from 'next/cache';

/**
 * Server Action: Fetch all projects with pagination / search.
 * Endpoint: GET /gallery/project/
 */
export async function getProjectsServerAction(params?: {
  page?: number;
  search?: string;
}): Promise<ApiProjectsResponse | null> {
  try {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.set('page', params.page.toString());
    if (params?.search) searchParams.set('search', params.search);

    const queryString = searchParams.toString();
    const endpoint = `/gallery/project/${queryString ? `?${queryString}` : ''}`;

    const res = await serverFetch<ApiProjectsResponse>(endpoint, {
      next: { revalidate: 0 },
    });

    if (res.success && res.data) {
      return res.data;
    }

    return null;
  } catch (error) {
    console.error('Error in getProjectsServerAction:', error);
    return null;
  }
}

/**
 * Server Action: Fetch a single project by ID.
 * Endpoint: GET /gallery/project/${id}/
 */
export async function getProjectByIdServerAction(
  id: string | number
): Promise<ApiProject | null> {
  try {
    const endpoint = `/gallery/project/${id}/`;

    const res = await serverFetch<ApiSingleProjectResponse>(endpoint, {
      next: { revalidate: 0 },
    });

    if (res.success && res.data?.data) {
      return res.data.data;
    }

    return null;
  } catch (error) {
    console.error(`Error in getProjectByIdServerAction for id ${id}:`, error);
    return null;
  }
}

/**
 * Server Action: Create a new project.
 * Endpoint: POST /gallery/project/
 */
export async function createProjectServerAction(
  formData: FormData
): Promise<{ success: boolean; data?: ApiProject; error?: string }> {
  try {
    const res = await serverFetch<ApiSingleProjectResponse>('/gallery/project/', {
      method: 'POST',
      body: formData,
    });

    if (res.success && res.data?.data) {
      revalidatePath('/projects');
      revalidatePath('/[locale]/projects', 'page');
      return { success: true, data: res.data.data };
    }

    return { 
      success: false, 
      error: res.error || (res.data ? formatApiErrorMessage(res.data) : 'فشل إضافة المشروع') 
    };
  } catch (error: any) {
    console.error('Error in createProjectServerAction:', error);
    return { success: false, error: error.message || 'حدث خطأ أثناء إضافة المشروع' };
  }
}

/**
 * Server Action: Update an existing project.
 * Endpoint: PATCH /gallery/project/${id}/
 */
export async function updateProjectServerAction(
  id: string | number,
  formData: FormData
): Promise<{ success: boolean; data?: ApiProject; error?: string }> {
  try {
    const res = await serverFetch<ApiSingleProjectResponse>(`/gallery/project/${id}/`, {
      method: 'PATCH',
      body: formData,
    });

    if (res.success && res.data?.data) {
      revalidatePath('/projects');
      revalidatePath(`/projects/${id}`);
      revalidatePath('/[locale]/projects', 'page');
      return { success: true, data: res.data.data };
    }

    return { 
      success: false, 
      error: res.error || (res.data ? formatApiErrorMessage(res.data) : 'فشل تعديل بيانات المشروع') 
    };
  } catch (error: any) {
    console.error(`Error in updateProjectServerAction for id ${id}:`, error);
    return { success: false, error: error.message || 'حدث خطأ أثناء تعديل بيانات المشروع' };
  }
}

/**
 * Server Action: Delete a project.
 * Endpoint: DELETE /gallery/project/${id}/
 */
export async function deleteProjectServerAction(
  id: string | number
): Promise<{ success: boolean; error?: string }> {
  try {
    const res = await serverFetch<any>(`/gallery/project/${id}/`, {
      method: 'DELETE',
    });

    if (res.success) {
      revalidatePath('/projects');
      revalidatePath('/[locale]/projects', 'page');
      return { success: true };
    }

    return { success: false, error: res.error || 'فشل حذف المشروع' };
  } catch (error: any) {
    console.error(`Error in deleteProjectServerAction for id ${id}:`, error);
    return { success: false, error: error.message || 'حدث خطأ أثناء حذف المشروع' };
  }
}

/**
 * Server Action: Add a secondary/gallery image to a project.
 * Endpoint: POST /gallery/projectimage/
 */
export async function addProjectImageServerAction(
  projectId: string | number,
  imageFile: File
): Promise<{ success: boolean; data?: ApiProjectImage; error?: string }> {
  try {
    const formData = new FormData();
    formData.append('project', String(projectId));
    formData.append('image', imageFile);

    const res = await serverFetch<ApiProjectImage>('/gallery/projectimage/', {
      method: 'POST',
      body: formData,
    });

    if (res.success && res.data) {
      revalidatePath('/projects');
      revalidatePath('/[locale]/projects', 'page');
      return { success: true, data: res.data };
    }

    return { success: false, error: res.error || 'فشل رفع صورة المشروع الفرعية' };
  } catch (error: any) {
    console.error('Error in addProjectImageServerAction:', error);
    return { success: false, error: error.message || 'حدث خطأ أثناء رفع الصورة' };
  }
}

/**
 * Server Action: Delete a secondary/gallery image from a project.
 * Endpoint: DELETE /gallery/projectimage/${imageId}/
 */
export async function deleteProjectImageServerAction(
  imageId: string | number
): Promise<{ success: boolean; error?: string }> {
  try {
    const res = await serverFetch<any>(`/gallery/projectimage/${imageId}/`, {
      method: 'DELETE',
    });

    if (res.success) {
      revalidatePath('/projects');
      revalidatePath('/[locale]/projects', 'page');
      return { success: true };
    }

    return { success: false, error: res.error || 'فشل حذف صورة المشروع الفرعية' };
  } catch (error: any) {
    console.error(`Error in deleteProjectImageServerAction for image ${imageId}:`, error);
    return { success: false, error: error.message || 'حدث خطأ أثناء حذف الصورة' };
  }
}
