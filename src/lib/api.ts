import { ApiResponse } from '@/types/api';

const API_BASE_URL = 'https://hmec.pythonanywhere.com';

export async function getSiteData(): Promise<ApiResponse | null> {
  try {
    const res = await fetch(API_BASE_URL, {
      // Use Incremental Static Regeneration to validate data every hour (3600 seconds)
      // or you can use next: { revalidate: 60 } for 1 minute
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      console.error('Failed to fetch data', res.statusText);
      return null;
    }

    const data: ApiResponse = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching site data:', error);
    return null;
  }
}
