import AsyncStorage from '@react-native-async-storage/async-storage';

const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';

export interface AuthTokens {
  access: string;
  refresh: string;
}

export async function saveTokens(tokens: AuthTokens) {
  await AsyncStorage.setItem(ACCESS_TOKEN_KEY, tokens.access);
  await AsyncStorage.setItem(REFRESH_TOKEN_KEY, tokens.refresh);
}

export async function clearTokens() {
  await AsyncStorage.removeItem(ACCESS_TOKEN_KEY);
  await AsyncStorage.removeItem(REFRESH_TOKEN_KEY);
}

export async function getAccessToken() {
  return AsyncStorage.getItem(ACCESS_TOKEN_KEY);
}

export async function getRefreshToken() {
  return AsyncStorage.getItem(REFRESH_TOKEN_KEY);
}
