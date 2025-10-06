import apiClient from './apiClient';
export const loginService = async (username: string, password: string) => {
  const res = await apiClient.post('/login', {username, password});
  return res.data;
};