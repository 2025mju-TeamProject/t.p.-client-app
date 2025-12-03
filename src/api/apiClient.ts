import axios from 'axios';

export const apiClient = axios.create({
  baseURL: 'http://3.35.223.187:8000',
  timeout: 10000,
});

export default apiClient;