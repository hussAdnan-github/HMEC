'use server';

import { serverFetch, formatApiErrorMessage } from '@/lib/server-api';
import type { 
  ApiProductsResponse, 
  ApiSingleProductResponse, 
  ApiProduct,
  ApiProductImage,
  ApiProductUnit,
  ApiAgentsResponse,
  ApiAgent
} from '@/types/api';
import { revalidatePath } from 'next/cache';

/**
 * Server Action: Fetch all products with pagination / search.
 * Uses global serverFetch helper and API base URL from ENV.
 * Endpoint: /products/product/
 */
export async function getProductsServerAction(params?: {
  page?: number;
  search?: string;
  agent?: number | string;
}): Promise<ApiProductsResponse | null> {
  try {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.set('page', params.page.toString());
    if (params?.search) searchParams.set('search', params.search);
    if (params?.agent) searchParams.set('agent', params.agent.toString());

    const queryString = searchParams.toString();
    const endpoint = `/products/product/${queryString ? `?${queryString}` : ''}`;

    const res = await serverFetch<ApiProductsResponse>(endpoint, {
      next: { revalidate: 0 }, // Do not cache inside the dashboard to get fresh data
    });

    if (res.success && res.data) {
      return res.data;
    }

    return null;
  } catch (error) {
    console.error('Error in getProductsServerAction:', error);
    return null;
  }
}

 
export async function getProductByIdServerAction(
  id: string | number
): Promise<ApiProduct | null> {
  try {
    const endpoint = `/products/product/${id}/`;

    const res = await serverFetch<ApiSingleProductResponse>(endpoint, {
      next: { revalidate: 0 },
    });

    if (res.success && res.data?.data) {
      return res.data.data;
    }

    return null;
  } catch (error) {
    console.error(`Error in getProductByIdServerAction for id ${id}:`, error);
    return null;
  }
}

 
export async function createProductServerAction(
  formData: FormData
): Promise<{ success: boolean; data?: ApiProduct; error?: string }> {
  try {
    const res = await serverFetch<ApiSingleProductResponse>('/products/product/', {
      method: 'POST',
      body: formData,
    });

    if (res.success && res.data?.data) {
      revalidatePath('/products');
      revalidatePath('/[locale]/products', 'page');
      return { success: true, data: res.data.data };
    }

    return { 
      success: false, 
      error: res.error || (res.data ? formatApiErrorMessage(res.data) : 'فشل إضافة المنتج') 
    };
  } catch (error: any) {
    console.error('Error in createProductServerAction:', error);
    return { success: false, error: error.message || 'حدث خطأ أثناء إضافة المنتج' };
  }
}

 
export async function updateProductServerAction(
  id: string | number,
  formData: FormData
): Promise<{ success: boolean; data?: ApiProduct; error?: string }> {
  try {
    const res = await serverFetch<ApiSingleProductResponse>(`/products/product/${id}/`, {
      method: 'PATCH',
      body: formData,
    });

    if (res.success && res.data?.data) {
      revalidatePath('/products');
      revalidatePath(`/products/${id}`);
      revalidatePath('/[locale]/products', 'page');
      return { success: true, data: res.data.data };
    }

    return { 
      success: false, 
      error: res.error || (res.data ? formatApiErrorMessage(res.data) : 'فشل تعديل المنتج') 
    };
  } catch (error: any) {
    console.error(`Error in updateProductServerAction for id ${id}:`, error);
    return { success: false, error: error.message || 'An error occurred' };
  }
}

 
export async function deleteProductServerAction(
  id: string | number
): Promise<{ success: boolean; error?: string }> {
  try {
    const res = await serverFetch<any>(`/products/product/${id}/`, {
      method: 'DELETE',
    });

    if (res.success) {
      revalidatePath('/products');
      revalidatePath('/[locale]/products', 'page');
      return { success: true };
    }

    return { success: false, error: res.error || 'Failed to delete product' };
  } catch (error: any) {
    console.error(`Error in deleteProductServerAction for id ${id}:`, error);
    return { success: false, error: error.message || 'An error occurred' };
  }
}

/**
 * Server Action: Add a secondary/gallery image to a product.
 * Endpoint: POST /products/productimage/
 */
export async function addProductImageServerAction(
  productId: string | number,
  imageFile: File
): Promise<{ success: boolean; data?: ApiProductImage; error?: string }> {
  try {
    const formData = new FormData();
    formData.append('product', String(productId));
    formData.append('image', imageFile);

    const res = await serverFetch<ApiProductImage>('/products/productimage/', {
      method: 'POST',
      body: formData,
    });

    if (res.success && res.data) {
      revalidatePath('/products');
      revalidatePath('/[locale]/products', 'page');
      return { success: true, data: res.data };
    }

    return { success: false, error: res.error || 'فشل رفع صورة المنتج الفرعية' };
  } catch (error: any) {
    console.error('Error in addProductImageServerAction:', error);
    return { success: false, error: error.message || 'حدث خطأ أثناء رفع الصورة' };
  }
}

/**
 * Server Action: Delete a secondary/gallery image from a product.
 * Endpoint: DELETE /products/productimage/${imageId}/
 */
export async function deleteProductImageServerAction(
  imageId: string | number
): Promise<{ success: boolean; error?: string }> {
  try {
    const res = await serverFetch<any>(`/products/productimage/${imageId}/`, {
      method: 'DELETE',
    });

    if (res.success) {
      revalidatePath('/products');
      revalidatePath('/[locale]/products', 'page');
      return { success: true };
    }

    return { success: false, error: res.error || 'فشل حذف صورة المنتج الفرعية' };
  } catch (error: any) {
    console.error(`Error in deleteProductImageServerAction for image ${imageId}:`, error);
    return { success: false, error: error.message || 'حدث خطأ أثناء حذف الصورة' };
  }
}

/**
 * Server Action: Create a new product unit.
 * Endpoint: POST /products/unit/
 */
export async function createProductUnitServerAction(unitData: {
  name_unit_ar: string;
  name_unit_en?: string;
  price: string | number;
  is_active?: boolean;
  product: number | string;
}): Promise<{ success: boolean; data?: ApiProductUnit; error?: string }> {
  try {
    const res = await serverFetch<ApiProductUnit>('/products/unit/', {
      method: 'POST',
      body: JSON.stringify({
        name_unit_ar: unitData.name_unit_ar,
        name_unit_en: unitData.name_unit_en || unitData.name_unit_ar,
        price: String(unitData.price),
        is_active: unitData.is_active ?? true,
        product: Number(unitData.product),
      }),
    });

    if (res.success && res.data) {
      revalidatePath('/products');
      revalidatePath('/[locale]/products', 'page');
      return { success: true, data: res.data };
    }

    return { success: false, error: res.error || 'فشل إضافة وحدة المنتج' };
  } catch (error: any) {
    console.error('Error in createProductUnitServerAction:', error);
    return { success: false, error: error.message || 'حدث خطأ أثناء إضافة الوحدة' };
  }
}

/**
 * Server Action: Update a product unit.
 * Endpoint: PATCH /products/unit/${unitId}/
 */
export async function updateProductUnitServerAction(
  unitId: number | string,
  unitData: Partial<{
    name_unit_ar: string;
    name_unit_en: string;
    price: string | number;
    is_active: boolean;
    product: number | string;
  }>
): Promise<{ success: boolean; data?: ApiProductUnit; error?: string }> {
  try {
    const res = await serverFetch<ApiProductUnit>(`/products/unit/${unitId}/`, {
      method: 'PATCH',
      body: JSON.stringify(unitData),
    });

    if (res.success && res.data) {
      revalidatePath('/products');
      revalidatePath('/[locale]/products', 'page');
      return { success: true, data: res.data };
    }

    return { success: false, error: res.error || 'فشل تعديل وحدة المنتج' };
  } catch (error: any) {
    console.error(`Error in updateProductUnitServerAction for unit ${unitId}:`, error);
    return { success: false, error: error.message || 'حدث خطأ أثناء تعديل الوحدة' };
  }
}

/**
 * Server Action: Delete a product unit.
 * Endpoint: DELETE /products/unit/${unitId}/
 */
export async function deleteProductUnitServerAction(
  unitId: number | string
): Promise<{ success: boolean; error?: string }> {
  try {
    const res = await serverFetch<any>(`/products/unit/${unitId}/`, {
      method: 'DELETE',
    });

    if (res.success) {
      revalidatePath('/products');
      revalidatePath('/[locale]/products', 'page');
      return { success: true };
    }

    return { success: false, error: res.error || 'فشل حذف وحدة المنتج' };
  } catch (error: any) {
    console.error(`Error in deleteProductUnitServerAction for unit ${unitId}:`, error);
    return { success: false, error: error.message || 'حدث خطأ أثناء حذف الوحدة' };
  }
}

/**
 * Server Action: Fetch all agents (ouragent).
 * Endpoint: GET /content/ouragent/
 */
export async function getAgentsServerAction(): Promise<ApiAgentsResponse | null> {
  try {
    const res = await serverFetch<ApiAgentsResponse>('/content/ouragent/', {
      next: { revalidate: 3600 },
    });

    if (res.success && res.data) {
      return res.data;
    }

    return null;
  } catch (error) {
    console.error('Error in getAgentsServerAction:', error);
    return null;
  }
}
