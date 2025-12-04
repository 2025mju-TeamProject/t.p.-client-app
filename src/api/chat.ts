import axios, { AxiosError, AxiosResponse } from 'axios';
import apiClient from './apiClient';
import header from '@components/common/Header';

export interface ChatResponse {
  message_id: number;
  sender: number;
  content: string;
  image: string;
  timestamp: string;
}

export async function sendMessage(
  message: string,
  oppoId: string,
  auth: string,
): Promise<void> {
  const response = await apiClient.post(`/chat/api/message/${oppoId}/`, {
    message: message,
    headers: {
      Authorization: `Bearer ${auth}`,
    },
  });
}

export async function getMessage(oppoId: number, auth: string): Promise<Array<ChatResponse>> {
  const response = await apiClient.get(`/chat/api/messages/${oppoId}/`, {
    headers: {
      Authorization: `Bearer ${auth}`,
    }
  })

  return response.data;
}
