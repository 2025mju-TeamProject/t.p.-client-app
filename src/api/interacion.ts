import apiClient from './apiClient';
import { ChatRoomResponse } from './chat';

export interface LikeListResponse {
  id: number;
  created_at: string;
  target_profile: {
    user_id: number;
    nickname: string;
    image: string;
    age: number;
    location_city: string;
    location_district: string;
    mbti: string;
  }
}

export async function sendHeartApi(oppoId: number, auth: string): Promise<string> {
  const response = await apiClient.post(`/api/interaction/like/${oppoId}/`, {}, {
    headers: {
      Authorization: `Bearer ${auth}`,
    }
  })

  return response.data.message;
}

export async function getHeartList(auth: string, isMine: boolean): Promise<LikeListResponse[]> {
  const type = isMine ? 'sent' : 'received';
  const response = await apiClient.get(`/api/interaction/likes/?type=${type}`, {
    headers: {
      'Authorization': `Bearer ${auth}`,
    }
  })

  return response.data;
}

export async function blockUserApi(oppoId: number, auth: string): Promise<string> {
  const response = await apiClient.post(`/chat/api/block/${oppoId}/`, {}, {
    headers: {
      Authorization: `Bearer ${auth}`,
    }
  })

  return response.data.message;
}

export async function unBlockUserApi(oppoId: number, auth: string): Promise<string> {
  const response = await apiClient.delete(`/chat/api/block/${oppoId}/`, {
    headers: {
      Authorization: `Bearer ${auth}`,
    }
  })

  return response.data.message;
}

export async function reportUserApi(oppoId: number, auth: string): Promise<string> {
  const response = await apiClient.post(`/api/users/report/${oppoId}/`, {}, {
    headers: {
      Authorization: `Bearer ${auth}`,
    }
  })

  return response.data.message;
}