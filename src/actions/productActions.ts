'use server';

import { serverFetch } from '@/lib/server-api';
import type { ApiProductsResponse, ApiSingleProductResponse, ApiProduct } from '@/types/api';

/**
 * Server Action: Fetch all products with pagination / search.
 * Uses global serverFetch helper and API base URL from ENV.
 * Endpoint: /products/product/
 */
export async function getProductsServerAction(params?: {
  page?: number;
  search?: string;
}): Promise<ApiProductsResponse | null> {
  try {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.set('page', params.page.toString());
    if (params?.search) searchParams.set('search', params.search);

    const queryString = searchParams.toString();
    const endpoint = `/products/product/${queryString ? `?${queryString}` : ''}`;

    const res = await serverFetch<ApiProductsResponse>(endpoint, {
      next: { revalidate: 60 },
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

/**
 * Server Action: Fetch a single product by ID.
 * Uses global serverFetch helper and API base URL from ENV.
 * Endpoint: /products/product/${id}/
 */
export async function getProductByIdServerAction(
  id: string | number
): Promise<ApiProduct | null> {
  try {
    const endpoint = `/products/product/${id}/`;

    const res = await serverFetch<ApiSingleProductResponse>(endpoint, {
      next: { revalidate: 60 },
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
