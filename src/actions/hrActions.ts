'use server';

import { serverFetch, formatApiErrorMessage } from '@/lib/server-api';
import type { 
  ApiJobTitlesResponse,
  ApiSingleJobTitleResponse,
  ApiJobTitle
} from '@/types/api';
import { revalidatePath } from 'next/cache';

// ==========================================
// JOB TITLES ACTIONS
// ==========================================

export async function getJobTitlesServerAction(params?: {
  page?: number;
  search?: string;
}): Promise<ApiJobTitlesResponse | null> {
  try {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.set('page', params.page.toString());
    if (params?.search) searchParams.set('search', params.search);

    const queryString = searchParams.toString();
    const endpoint = `/hr/jobtitle/${queryString ? `?${queryString}` : ''}`;

    const res = await serverFetch<ApiJobTitlesResponse>(endpoint, {
      next: { revalidate: 0 }, 
    });

    if (res.success && res.data) {
      return res.data;
    }

    return null;
  } catch (error) {
    console.error('Error in getJobTitlesServerAction:', error);
    return null;
  }
}

export async function createJobTitleServerAction(data: {
  name: string;
  tesk: string;
}): Promise<{ success: boolean; data?: ApiJobTitle; error?: string }> {
  try {
    const res = await serverFetch<ApiSingleJobTitleResponse>('/hr/jobtitle/', {
      method: 'POST',
      body: JSON.stringify(data),
    });

    if (res.success && res.data) {
      // In the response example, sometimes DRF returns `{ success: true, data: { ...object } }`
      // But if it just returns the object itself, serverFetch assigns it to res.data
      const jobData = (res.data as { data?: unknown }).data || res.data;
      revalidatePath('/dashboard/hr/job-titles');
      return { success: true, data: jobData as ApiJobTitle };
    }

    return { 
      success: false, 
      error: res.error || (res.data ? formatApiErrorMessage(res.data) : 'فشل إضافة المسمى الوظيفي') 
    };
  } catch (error) {
    console.error('Error in createJobTitleServerAction:', error);
    return { success: false, error: (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? error.message : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) || 'حدث خطأ أثناء الإضافة' };
  }
}

export async function updateJobTitleServerAction(
  id: string | number,
  data: {
    name: string;
    tesk: string;
  }
): Promise<{ success: boolean; data?: ApiJobTitle; error?: string }> {
  try {
    const res = await serverFetch<ApiSingleJobTitleResponse>(`/hr/jobtitle/${id}/`, {
      method: 'PATCH', // or PUT depending on backend, PATCH is safer for partial, PUT for full
      body: JSON.stringify(data),
    });

    if (res.success && res.data) {
      const jobData = (res.data as { data?: unknown }).data || res.data;
      revalidatePath('/dashboard/hr/job-titles');
      return { success: true, data: jobData as ApiJobTitle };
    }

    return { 
      success: false, 
      error: res.error || (res.data ? formatApiErrorMessage(res.data) : 'فشل تعديل المسمى الوظيفي') 
    };
  } catch (error) {
    console.error(`Error in updateJobTitleServerAction for id ${id}:`, error);
    return { success: false, error: (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? error.message : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) || 'حدث خطأ أثناء التعديل' };
  }
}

export async function deleteJobTitleServerAction(
  id: string | number
): Promise<{ success: boolean; error?: string }> {
  try {
    const res = await serverFetch<any>(`/hr/jobtitle/${id}/`, {
      method: 'DELETE',
    });

    if (res.success) {
      revalidatePath('/dashboard/hr/job-titles');
      return { success: true };
    }

    return { success: false, error: res.error || 'فشل حذف المسمى الوظيفي' };
  } catch (error) {
    console.error(`Error in deleteJobTitleServerAction for id ${id}:`, error);
    return { success: false, error: (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? error.message : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) || 'حدث خطأ أثناء الحذف' };
  }
}

// ==========================================
// EDUCATIONAL LEVELS ACTIONS
// ==========================================

import type { 
  ApiEducationalLevelsResponse,
  ApiSingleEducationalLevelResponse,
  ApiEducationalLevel
} from '@/types/api';

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
    return { success: false, error: (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? error.message : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) || 'حدث خطأ أثناء الإضافة' };
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
    return { success: false, error: (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? error.message : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) || 'حدث خطأ أثناء التعديل' };
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
    return { success: false, error: (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? error.message : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) || 'حدث خطأ أثناء الحذف' };
  }
}

// ==========================================
// COMPANIES ACTIONS
// ==========================================

import type { 
  ApiCompaniesResponse,
  ApiSingleCompanyResponse,
  ApiCompany
} from '@/types/api';

export async function getCompaniesServerAction(params?: {
  page?: number;
  search?: string;
}): Promise<ApiCompaniesResponse | null> {
  try {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.set('page', params.page.toString());
    if (params?.search) searchParams.set('search', params.search);

    const queryString = searchParams.toString();
    const endpoint = `/hr/company/${queryString ? `?${queryString}` : ''}`;

    const res = await serverFetch<ApiCompaniesResponse>(endpoint, {
      next: { revalidate: 0 }, 
    });

    if (res.success && res.data) {
      return res.data;
    }

    return null;
  } catch (error) {
    console.error('Error in getCompaniesServerAction:', error);
    return null;
  }
}

export async function createCompanyServerAction(
  formData: FormData
): Promise<{ success: boolean; data?: ApiCompany; error?: string }> {
  try {
    const res = await serverFetch<ApiSingleCompanyResponse>('/hr/company/', {
      method: 'POST',
      body: formData,
    });

    if (res.success && res.data) {
      const companyData = (res.data as { data?: unknown }).data || res.data;
      revalidatePath('/dashboard/hr/companies');
      return { success: true, data: companyData as ApiCompany };
    }

    return { 
      success: false, 
      error: res.error || (res.data ? formatApiErrorMessage(res.data) : 'فشل إضافة الشركة') 
    };
  } catch (error) {
    console.error('Error in createCompanyServerAction:', error);
    return { success: false, error: (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? error.message : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) || 'حدث خطأ أثناء الإضافة' };
  }
}

export async function updateCompanyServerAction(
  id: string | number,
  formData: FormData
): Promise<{ success: boolean; data?: ApiCompany; error?: string }> {
  try {
    const res = await serverFetch<ApiSingleCompanyResponse>(`/hr/company/${id}/`, {
      method: 'PATCH',
      body: formData,
    });

    if (res.success && res.data) {
      const companyData = (res.data as { data?: unknown }).data || res.data;
      revalidatePath('/dashboard/hr/companies');
      return { success: true, data: companyData as ApiCompany };
    }

    return { 
      success: false, 
      error: res.error || (res.data ? formatApiErrorMessage(res.data) : 'فشل تعديل الشركة') 
    };
  } catch (error) {
    console.error(`Error in updateCompanyServerAction for id ${id}:`, error);
    return { success: false, error: (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? error.message : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) || 'حدث خطأ أثناء التعديل' };
  }
}

export async function deleteCompanyServerAction(
  id: string | number
): Promise<{ success: boolean; error?: string }> {
  try {
    const res = await serverFetch<any>(`/hr/company/${id}/`, {
      method: 'DELETE',
    });

    if (res.success) {
      revalidatePath('/dashboard/hr/companies');
      return { success: true };
    }

    return { success: false, error: res.error || 'فشل حذف الشركة' };
  } catch (error) {
    console.error(`Error in deleteCompanyServerAction for id ${id}:`, error);
    return { success: false, error: (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? error.message : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) || 'حدث خطأ أثناء الحذف' };
  }
}


// ==========================================
// DEVICE FINGERPRINT ACTIONS
// ==========================================

import type { 
  ApiDeviceFingerprintsResponse,
  ApiSingleDeviceFingerprintResponse,
  ApiDeviceFingerprint
} from '@/types/api';

export async function getDeviceFingerprintsServerAction(params?: {
  page?: number;
  search?: string;
}): Promise<ApiDeviceFingerprintsResponse | null> {
  try {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.set('page', params.page.toString());
    if (params?.search) searchParams.set('search', params.search);

    const queryString = searchParams.toString();
    const endpoint = `/hr/devicefingerprint/${queryString ? `?${queryString}` : ''}`;

    const res = await serverFetch<ApiDeviceFingerprintsResponse>(endpoint, {
      next: { revalidate: 0 }, 
    });

    if (res.success && res.data) {
      return res.data;
    }

    return null;
  } catch (error) {
    console.error('Error in getDeviceFingerprintsServerAction:', error);
    return null;
  }
}

export async function createDeviceFingerprintServerAction(data: {
  name: string;
  sn: string;
  location: string;
  ip_address: string;
  port: number | null;
  password: string;
}): Promise<{ success: boolean; data?: ApiDeviceFingerprint; error?: string }> {
  try {
    const res = await serverFetch<ApiSingleDeviceFingerprintResponse>('/hr/devicefingerprint/', {
      method: 'POST',
      body: JSON.stringify(data),
    });

    if (res.success && res.data) {
      const deviceData = (res.data as { data?: unknown }).data || res.data;
      revalidatePath('/dashboard/hr/device-fingerprints');
      return { success: true, data: deviceData as ApiDeviceFingerprint };
    }

    return { 
      success: false, 
      error: res.error || (res.data ? formatApiErrorMessage(res.data) : 'فشل إضافة جهاز البصمة') 
    };
  } catch (error) {
    console.error('Error in createDeviceFingerprintServerAction:', error);
    return { success: false, error: (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? error.message : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) || 'حدث خطأ أثناء الإضافة' };
  }
}

export async function updateDeviceFingerprintServerAction(
  id: string | number,
  data: {
    name: string;
    sn: string;
    location: string;
    ip_address: string;
    port: number | null;
    password: string;
  }
): Promise<{ success: boolean; data?: ApiDeviceFingerprint; error?: string }> {
  try {
    const res = await serverFetch<ApiSingleDeviceFingerprintResponse>(`/hr/devicefingerprint/${id}/`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });

    if (res.success && res.data) {
      const deviceData = (res.data as { data?: unknown }).data || res.data;
      revalidatePath('/dashboard/hr/device-fingerprints');
      return { success: true, data: deviceData as ApiDeviceFingerprint };
    }

    return { 
      success: false, 
      error: res.error || (res.data ? formatApiErrorMessage(res.data) : 'فشل تعديل جهاز البصمة') 
    };
  } catch (error) {
    console.error(`Error in updateDeviceFingerprintServerAction for id ${id}:`, error);
    return { success: false, error: (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? error.message : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) || 'حدث خطأ أثناء التعديل' };
  }
}

export async function deleteDeviceFingerprintServerAction(
  id: string | number
): Promise<{ success: boolean; error?: string }> {
  try {
    const res = await serverFetch<any>(`/hr/devicefingerprint/${id}/`, {
      method: 'DELETE',
    });

    if (res.success) {
      revalidatePath('/dashboard/hr/device-fingerprints');
      return { success: true };
    }

    return { success: false, error: res.error || 'فشل حذف بصمة الجهاز' };
  } catch (error) {
    console.error(`Error in deleteDeviceFingerprintServerAction for id ${id}:`, error);
    return { success: false, error: (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? error.message : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) || 'حدث خطأ أثناء الحذف' };
  }
}

// ==========================================
// DATA RECEPTION ACTIONS
// ==========================================

import type { 
  ApiDataReceptionsResponse,
  ApiSingleDataReceptionResponse,
  ApiDataReception
} from '@/types/api';

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
    return { success: false, error: (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? error.message : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) || 'حدث خطأ أثناء الإضافة' };
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
    return { success: false, error: (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? error.message : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) || 'حدث خطأ أثناء التعديل' };
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
    return { success: false, error: (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? error.message : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) || 'حدث خطأ أثناء الحذف' };
  }
}

// ==========================================
// EMPLOYEE ACTIONS
// ==========================================

import type { 
  ApiEmployeesResponse,
  ApiSingleEmployeeResponse,
  ApiEmployee
} from '@/types/api';

export async function getEmployeesServerAction(params?: {
  page?: number;
  search?: string;
}): Promise<ApiEmployeesResponse | null> {
  try {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.set('page', params.page.toString());
    if (params?.search) searchParams.set('search', params.search);

    const queryString = searchParams.toString();
    const endpoint = `/hr/employee/${queryString ? `?${queryString}` : ''}`;

    const res = await serverFetch<ApiEmployeesResponse>(endpoint, {
      next: { revalidate: 0 }, 
    });

    if (res.success && res.data) {
      return res.data;
    }

    return null;
  } catch (error) {
    console.error('Error in getEmployeesServerAction:', error);
    return null;
  }
}

export async function createEmployeeServerAction(data: {
  name: string;
  birth_date: string | null;
  basic_salary: number | null;
  secondary_salary: number | null;
  currency_basic: string | number | null;
  currency_secondary: string | number | null;
  job_title: number | null;
  educational_level: number | null;
  company: number | null;
  type_of_employee: string | number | null;
  marital_status: string | number | null;
}): Promise<{ success: boolean; data?: ApiEmployee; error?: string }> {
  try {
    const res = await serverFetch<ApiSingleEmployeeResponse>('/hr/employee/', {
      method: 'POST',
      body: JSON.stringify(data),
    });

    if (res.success && res.data) {
      const respData = (res.data as { data?: unknown }).data || res.data;
      revalidatePath('/dashboard/hr/employees');
      return { success: true, data: respData as ApiEmployee };
    }

    return { 
      success: false, 
      error: res.error || (res.data ? formatApiErrorMessage(res.data) : 'فشل الإضافة') 
    };
  } catch (error) {
    console.error('Error in createEmployeeServerAction:', error);
    return { success: false, error: (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? error.message : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) || 'حدث خطأ أثناء الإضافة' };
  }
}

export async function updateEmployeeServerAction(
  id: string | number,
  data: {
    name?: string;
    birth_date?: string | null;
    basic_salary?: number | null;
    secondary_salary?: number | null;
    currency_basic?: string | number | null;
    currency_secondary?: string | number | null;
    job_title?: number | null;
    educational_level?: number | null;
    company?: number | null;
    type_of_employee?: string | number | null;
    marital_status?: string | number | null;
  }
): Promise<{ success: boolean; data?: ApiEmployee; error?: string }> {
  try {
    const res = await serverFetch<ApiSingleEmployeeResponse>(`/hr/employee/${id}/`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });

    if (res.success && res.data) {
      const respData = (res.data as { data?: unknown }).data || res.data;
      revalidatePath('/dashboard/hr/employees');
      return { success: true, data: respData as ApiEmployee };
    }

    return { 
      success: false, 
      error: res.error || (res.data ? formatApiErrorMessage(res.data) : 'فشل التعديل') 
    };
  } catch (error) {
    console.error(`Error in updateEmployeeServerAction for id ${id}:`, error);
    return { success: false, error: (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? error.message : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) || 'حدث خطأ أثناء التعديل' };
  }
}

export async function deleteEmployeeServerAction(
  id: string | number
): Promise<{ success: boolean; error?: string }> {
  try {
    const res = await serverFetch<any>(`/hr/employee/${id}/`, {
      method: 'DELETE',
    });

    if (res.success) {
      revalidatePath('/dashboard/hr/employees');
      return { success: true };
    }

    return { success: false, error: res.error || 'فشل الحذف' };
  } catch (error) {
    console.error(`Error in deleteEmployeeServerAction for id ${id}:`, error);
    return { success: false, error: (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? error.message : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) || 'حدث خطأ أثناء الحذف' };
  }
}

// ==========================================
// EMPLOYEE FINGERPRINT ACTIONS
// ==========================================

import type { 
  ApiEmployeeFingerprintsResponse,
  ApiSingleEmployeeFingerprintResponse,
  ApiEmployeeFingerprint
} from '@/types/api';

export async function getEmployeeFingerprintsServerAction(params?: {
  page?: number;
  search?: string;
}): Promise<ApiEmployeeFingerprintsResponse | null> {
  try {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.set('page', params.page.toString());
    if (params?.search) searchParams.set('search', params.search);

    const queryString = searchParams.toString();
    const endpoint = `/hr/employeefingerprint/${queryString ? `?${queryString}` : ''}`;

    const res = await serverFetch<ApiEmployeeFingerprintsResponse>(endpoint, {
      next: { revalidate: 0 }, 
    });

    if (res.success && res.data) {
      return res.data;
    }

    return null;
  } catch (error) {
    console.error('Error in getEmployeeFingerprintsServerAction:', error);
    return null;
  }
}

export async function createEmployeeFingerprintServerAction(data: {
  finger_print_id: string;
  finger_print_data: string;
  employee: number | null;
  device_finger_print: number | null;
}): Promise<{ success: boolean; data?: ApiEmployeeFingerprint; error?: string }> {
  try {
    const res = await serverFetch<ApiSingleEmployeeFingerprintResponse>('/hr/employeefingerprint/', {
      method: 'POST',
      body: JSON.stringify(data),
    });

    if (res.success && res.data) {
      const respData = (res.data as { data?: unknown }).data || res.data;
      revalidatePath('/dashboard/hr/employee-fingerprints');
      return { success: true, data: respData as ApiEmployeeFingerprint };
    }

    return { 
      success: false, 
      error: res.error || (res.data ? formatApiErrorMessage(res.data) : 'فشل الإضافة') 
    };
  } catch (error) {
    console.error('Error in createEmployeeFingerprintServerAction:', error);
    return { success: false, error: (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? error.message : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) || 'حدث خطأ أثناء الإضافة' };
  }
}

export async function updateEmployeeFingerprintServerAction(
  id: string | number,
  data: {
    finger_print_id?: string;
    finger_print_data?: string;
    employee?: number | null;
    device_finger_print?: number | null;
  }
): Promise<{ success: boolean; data?: ApiEmployeeFingerprint; error?: string }> {
  try {
    const res = await serverFetch<ApiSingleEmployeeFingerprintResponse>(`/hr/employeefingerprint/${id}/`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });

    if (res.success && res.data) {
      const respData = (res.data as { data?: unknown }).data || res.data;
      revalidatePath('/dashboard/hr/employee-fingerprints');
      return { success: true, data: respData as ApiEmployeeFingerprint };
    }

    return { 
      success: false, 
      error: res.error || (res.data ? formatApiErrorMessage(res.data) : 'فشل التعديل') 
    };
  } catch (error) {
    console.error(`Error in updateEmployeeFingerprintServerAction for id ${id}:`, error);
    return { success: false, error: (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? error.message : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) || 'حدث خطأ أثناء التعديل' };
  }
}

export async function deleteEmployeeFingerprintServerAction(
  id: string | number
): Promise<{ success: boolean; error?: string }> {
  try {
    const res = await serverFetch<any>(`/hr/employeefingerprint/${id}/`, {
      method: 'DELETE',
    });

    if (res.success) {
      revalidatePath('/dashboard/hr/employee-fingerprints');
      return { success: true };
    }

    return { success: false, error: res.error || 'فشل الحذف' };
  } catch (error) {
    console.error(`Error in deleteEmployeeFingerprintServerAction for id ${id}:`, error);
    return { success: false, error: (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? error.message : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) || 'حدث خطأ أثناء الحذف' };
  }
}

// ==========================================
// SHIFT ACTIONS
// ==========================================

import type { 
  ApiShiftsResponse,
  ApiSingleShiftResponse,
  ApiShift
} from '@/types/api';

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
    return { success: false, error: (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? error.message : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) || 'حدث خطأ أثناء الإضافة' };
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
    return { success: false, error: (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? error.message : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) || 'حدث خطأ أثناء التعديل' };
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
    return { success: false, error: (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? error.message : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) || 'حدث خطأ أثناء الحذف' };
  }
}

// ==========================================
// ATTENDANCE ACTIONS
// ==========================================

import type { 
  ApiAttendancesResponse,
  ApiSingleAttendanceResponse,
  ApiAttendance
} from '@/types/api';

export async function getAttendancesServerAction(params?: {
  page?: number;
  search?: string;
}): Promise<ApiAttendancesResponse | null> {
  try {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.set('page', params.page.toString());
    if (params?.search) searchParams.set('search', params.search);

    const queryString = searchParams.toString();
    const endpoint = `/hr/attendance/${queryString ? `?${queryString}` : ''}`;

    const res = await serverFetch<ApiAttendancesResponse>(endpoint, {
      next: { revalidate: 0 }, 
    });

    if (res.success && res.data) {
      return res.data;
    }

    return null;
  } catch (error) {
    console.error('Error in getAttendancesServerAction:', error);
    return null;
  }
}

export async function createAttendanceServerAction(data: {
  date: string | null;
  time_in: string | null;
  time_out: string | null;
  is_present: boolean;
  is_present1: number | null;
  note: string;
  employee: number | null;
  shift: number | null;
}): Promise<{ success: boolean; data?: ApiAttendance; error?: string }> {
  try {
    const res = await serverFetch<ApiSingleAttendanceResponse>('/hr/attendance/', {
      method: 'POST',
      body: JSON.stringify(data),
    });

    if (res.success && res.data) {
      const respData = (res.data as { data?: unknown }).data || res.data;
      revalidatePath('/dashboard/hr/attendance');
      return { success: true, data: respData as ApiAttendance };
    }

    return { 
      success: false, 
      error: res.error || (res.data ? formatApiErrorMessage(res.data) : 'فشل الإضافة') 
    };
  } catch (error) {
    console.error('Error in createAttendanceServerAction:', error);
    return { success: false, error: (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? error.message : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) || 'حدث خطأ أثناء الإضافة' };
  }
}

export async function updateAttendanceServerAction(
  id: string | number,
  data: {
    date?: string | null;
    time_in?: string | null;
    time_out?: string | null;
    is_present?: boolean;
    is_present1?: number | null;
    note?: string;
    employee?: number | null;
    shift?: number | null;
  }
): Promise<{ success: boolean; data?: ApiAttendance; error?: string }> {
  try {
    const res = await serverFetch<ApiSingleAttendanceResponse>(`/hr/attendance/${id}/`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });

    if (res.success && res.data) {
      const respData = (res.data as { data?: unknown }).data || res.data;
      revalidatePath('/dashboard/hr/attendance');
      return { success: true, data: respData as ApiAttendance };
    }

    return { 
      success: false, 
      error: res.error || (res.data ? formatApiErrorMessage(res.data) : 'فشل التعديل') 
    };
  } catch (error) {
    console.error(`Error in updateAttendanceServerAction for id ${id}:`, error);
    return { success: false, error: (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? error.message : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) || 'حدث خطأ أثناء التعديل' };
  }
}

export async function deleteAttendanceServerAction(
  id: string | number
): Promise<{ success: boolean; error?: string }> {
  try {
    const res = await serverFetch<any>(`/hr/attendance/${id}/`, {
      method: 'DELETE',
    });

    if (res.success) {
      revalidatePath('/dashboard/hr/attendance');
      return { success: true };
    }

    return { success: false, error: res.error || 'فشل الحذف' };
  } catch (error) {
    console.error(`Error in deleteAttendanceServerAction for id ${id}:`, error);
    return { success: false, error: (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? error.message : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) || 'حدث خطأ أثناء الحذف' };
  }
}

// ==========================================
// LAW FINGERPRINTER ACTIONS
// ==========================================

import type { 
  ApiLawFingerprintersResponse,
  ApiSingleLawFingerprinterResponse,
  ApiLawFingerprinter
} from '@/types/api';

export async function getLawFingerprintersServerAction(params?: {
  page?: number;
  search?: string;
}): Promise<ApiLawFingerprintersResponse | null> {
  try {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.set('page', params.page.toString());
    if (params?.search) searchParams.set('search', params.search);

    const queryString = searchParams.toString();
    const endpoint = `/hr/lawfingerprinter/${queryString ? `?${queryString}` : ''}`;

    const res = await serverFetch<ApiLawFingerprintersResponse>(endpoint, {
      next: { revalidate: 0 }, 
    });

    if (res.success && res.data) {
      return res.data;
    }

    return null;
  } catch (error) {
    console.error('Error in getLawFingerprintersServerAction:', error);
    return null;
  }
}

export async function createLawFingerprinterServerAction(data: {
  name: string;
  time_from_which_fingerprint_entry_is_received: string | null;
  entry_grace_period: string | null;
  consider_absent_if_late_by: string | null;
  early_departure_allowance: string | null;
  last_time_to_accept_finger_print: string | null;
  time_from_which_fingerprint_out_is_received: string | null;
  deduct_for_missing_check_in: boolean;
  deduct_for_missing_check_out: boolean;
  shift: number | null;
}): Promise<{ success: boolean; data?: ApiLawFingerprinter; error?: string }> {
  try {
    const res = await serverFetch<ApiSingleLawFingerprinterResponse>('/hr/lawfingerprinter/', {
      method: 'POST',
      body: JSON.stringify(data),
    });

    if (res.success && res.data) {
      const respData = (res.data as { data?: unknown }).data || res.data;
      revalidatePath('/dashboard/hr/legal-specialists');
      return { success: true, data: respData as ApiLawFingerprinter };
    }

    return { 
      success: false, 
      error: res.error || (res.data ? formatApiErrorMessage(res.data) : 'فشل الإضافة') 
    };
  } catch (error) {
    console.error('Error in createLawFingerprinterServerAction:', error);
    return { success: false, error: (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? error.message : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) || 'حدث خطأ أثناء الإضافة' };
  }
}

export async function updateLawFingerprinterServerAction(
  id: string | number,
  data: {
    name?: string;
    time_from_which_fingerprint_entry_is_received?: string | null;
    entry_grace_period?: string | null;
    consider_absent_if_late_by?: string | null;
    early_departure_allowance?: string | null;
    last_time_to_accept_finger_print?: string | null;
    time_from_which_fingerprint_out_is_received?: string | null;
    deduct_for_missing_check_in?: boolean;
    deduct_for_missing_check_out?: boolean;
    shift?: number | null;
  }
): Promise<{ success: boolean; data?: ApiLawFingerprinter; error?: string }> {
  try {
    const res = await serverFetch<ApiSingleLawFingerprinterResponse>(`/hr/lawfingerprinter/${id}/`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });

    if (res.success && res.data) {
      const respData = (res.data as { data?: unknown }).data || res.data;
      revalidatePath('/dashboard/hr/legal-specialists');
      return { success: true, data: respData as ApiLawFingerprinter };
    }

    return { 
      success: false, 
      error: res.error || (res.data ? formatApiErrorMessage(res.data) : 'فشل التعديل') 
    };
  } catch (error) {
    console.error(`Error in updateLawFingerprinterServerAction for id ${id}:`, error);
    return { success: false, error: (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? error.message : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) || 'حدث خطأ أثناء التعديل' };
  }
}

export async function deleteLawFingerprinterServerAction(
  id: string | number
): Promise<{ success: boolean; error?: string }> {
  try {
    const res = await serverFetch<any>(`/hr/lawfingerprinter/${id}/`, {
      method: 'DELETE',
    });

    if (res.success) {
      revalidatePath('/dashboard/hr/legal-specialists');
      return { success: true };
    }

    return { success: false, error: res.error || 'فشل الحذف' };
  } catch (error) {
    console.error(`Error in deleteLawFingerprinterServerAction for id ${id}:`, error);
    return { success: false, error: (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? (error instanceof Error ? error.message : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) : undefined) || 'حدث خطأ أثناء الحذف' };
  }
}
