import apiClient from './apiClient';
import axios, { AxiosError, AxiosResponse } from 'axios';

export interface ProfileResponse {
  user_id: number;
  nickname: string;
  age: number;
  mbti: string;
  job: string;
  gender: string;
  location: string;
  total_score: number;
  score: scores;
  info: info;
  profile_image: string;
}

type scores = {
  saju: number;
  interest: number;
  distance: number;
};

type info = {
  distance_km: string;
  comman_hobbies: string[];
};

// 프로필 유무
export async function HasProfileApi(auth: string): Promise<boolean> {
  const response = await apiClient.get('/api/users/status/', {
    headers: {
      Authorization: `Bearer ${auth}`,
    },
  });

  return response.data.has_profile;
}

export async function getRecommandProfileApi(
  auth: string,
): Promise<Array<ProfileResponse>> {
  const response = await apiClient.get('/api/match/recommend/', {
    headers: {
      Authorization: `Bearer ${auth}`,
    },
  });

  return response.data;
}

export async function getMatchingReportApi(
  targetUserId: number,
  auth: string,
): Promise<string> {
  const response = await apiClient.post(
    `/api/users/match-summary/${targetUserId}/`, {},
    {
      headers: {
        Authorization: `Bearer ${auth}`,
      },
    },
  );
  return response.data.summary;
}
