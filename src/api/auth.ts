import apiClient from './apiClient';
import axios, { AxiosError } from 'axios';

// 서버에서 내려주는 로그인 응답 타입
export interface LoginResponse {
  access: string;
  refresh: string;
}

// 회원가입 요청 타입
export interface RegisterRequest {
  username: string;
  password: string;
  password_verify: string;
  phone_number: string;
}

// 회원가입 API
export async function registerApi(data: RegisterRequest): Promise<any> {
  await apiClient.post('/api/users/register/', data);
}

// 로그인 API
export async function loginApi(username: string, password: string): Promise<LoginResponse> {
  const response = await apiClient.post<LoginResponse>('/api/login/', {
    username,
    password,
  });

  return response.data;
}

// 공통적으로 쓸 에러 타입/체커 (선택사항)
export type ApiError = AxiosError<any>;

export function isApiError(error: unknown): error is ApiError {
  return axios.isAxiosError(error);
}
