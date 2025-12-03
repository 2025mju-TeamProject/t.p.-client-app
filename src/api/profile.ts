import apiClient from './apiClient';
import axios, { AxiosError, AxiosResponse } from 'axios';

// 프로필 유무
export async function HasProfileApi(auth: string): Promise<boolean> {
  const response = await apiClient.get('/api/users/status/', {
    headers: {
      Authorization: `Bearer ${auth}`,
    },
  });

  return response.data.has_profile;
}

