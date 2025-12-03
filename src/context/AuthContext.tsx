import React, { createContext, useContext, useEffect, useState } from 'react';
import { getAccessToken, saveTokens, clearTokens, getRefreshToken } from '../utils/localTokens';

type AuthContextType = {
  accessToken: string | null;
  login: (access: string) => void;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    // 앱 시작 시 AsyncStorage에서 access token 가져오기
    const bootstrap = async () => {
      const storedAccess = await getAccessToken();
      if (storedAccess) {
        setAccessToken(storedAccess);
      }
    };
    bootstrap();
  }, []);

  const login = (access: string) => {
    setAccessToken(access);
  };

  const logout = async () => {
    setAccessToken(null);
    await clearTokens();
    // 여기서 네비게이션 reset은 StartScreen 또는 상위에서 처리
  };

  return (
    <AuthContext.Provider value={{ accessToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
