'use server';

import { serverFetch } from '@/lib/server-api';
import type { ApiProjectsResponse, ApiSingleProjectResponse, ApiProject } from '@/types/api';

/**
 * Server Action: Fetch all projects with pagination / search.
 * Uses global serverFetch helper and API base URL from ENV.
 * Endpoint: /gallery/project/
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
      next: { revalidate: 60 },
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
 * Uses global serverFetch helper and API base URL from ENV.
 * Endpoint: /gallery/project/${id}/
 */
export async function getProjectByIdServerAction(
  id: string | number
): Promise<ApiProject | null> {
  try {
    const endpoint = `/gallery/project/${id}/`;

    const res = await serverFetch<ApiSingleProjectResponse>(endpoint, {
      next: { revalidate: 60 },
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
