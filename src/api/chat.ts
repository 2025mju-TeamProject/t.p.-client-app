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

export interface ChatRoomResponse {
  room_id: number;
  other_user_id: number;
  other_nickname: string;
  other_image: string;
  last_message: string;
  timestamp: string;
}

export async function sendMessage(
  message: string,
  oppoId: string,
  auth: string,
): Promise<void> {
  const response = await apiClient.post(
    `/chat/api/send-messages/${oppoId}/`,
    { message: message },
    {
      headers: {
        Authorization: `Bearer ${auth}`,
      },
    },
  );

  //return response.data.message;
}

export async function getMessage(
  oppoId: number,
  auth: string,
): Promise<Array<ChatResponse>> {
  const response = await apiClient.get(
    `/chat/api/history-messages/${oppoId}/`,
    {
      headers: {
        Authorization: `Bearer ${auth}`,
      },
    },
  );

  return response.data;
}

export async function getAssistant(
  oppoId: number,
  auth: string,
): Promise<Array<string>> {
  const response = await apiClient.post(
    `/chat/api/suggestions/${oppoId}/`,
    {},
    {
      headers: {
        Authorization: `Bearer ${auth}`,
      },
    },
  );

  return response.data.suggestions;
}

export async function getChatRooms(
  auth: string,
): Promise<Array<ChatRoomResponse>> {
  const response = await apiClient.get(`/chat/api/rooms/`, {
    headers: {
      Authorization: `Bearer ${auth}`,
    },
  });

  return response.data;
}
