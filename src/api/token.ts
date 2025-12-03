import apiClient from './apiClient';
import axios, { AxiosError, AxiosResponse } from 'axios';

// 토큰 유효성 검사
export async function VerifyTokenApi(auth: string): Promise<boolean> {
  const response = await apiClient.post('/api/users/token/verify/', {
    token: auth,
  });
  if (response.status === 200) { return true }
  else if(response.status === 401) { return false }

  return response.data.response;
}


// 토큰 재발급
export async function RefreshTokenApi(refresh: string): Promise<string> {
  const response = await apiClient.post('/api/login/refresh/', {
    refresh: refresh,
  });

  return response.data.access;
}