import ROUTES from '../../constants/routes';
import React, { useEffect } from 'react';
import { View } from 'react-native';
import {
  getAccessToken,
  clearTokens,
  getRefreshToken, saveTokens,
} from '../../utils/localTokens';
import { HasProfileApi } from '../../api/profile';
import { VerifyTokenApi, RefreshTokenApi } from '../../api/token';
import { useAuth } from '../../context/AuthContext';

function StartScreen({ navigation }: any) {
  const { login } = useAuth();
  async function handleNavigate() {
    // 1) refresh 토큰 없으면 → 로그인 화면
    const refreshToken = await getRefreshToken();
    if (!refreshToken) {
      navigation.reset({
        index: 0,
        routes: [{ name: ROUTES.LOGIN }],
      });
      return;
    }

    try {
      // 2) refresh 토큰으로 access 재발급
      const newAccessToken = await RefreshTokenApi(refreshToken);

      // 3) 새 access 토큰으로 프로필 존재 여부 체크
      const hasProfile = await HasProfileApi(newAccessToken);

      // 4) 토큰 저장 (재발급 성공했을 때만)
      await saveTokens({ access: newAccessToken, refresh: refreshToken });

      if (hasProfile) {
        // 프로필 있음 → 로그인 상태로 메인 화면
        login(newAccessToken);

        navigation.reset({
          index: 0,
          routes: [{ name: ROUTES.BOTTOM }],
        });
      } else {
        // 프로필 없음 → 프로필 작성 화면
        navigation.reset({
          index: 0,
          routes: [{ name: ROUTES.WRITEPROFFILE }],
        });
      }
    } catch (error) {
      console.error('자동 로그인/토큰 재발급 플로우 에러', error);
      // 토큰 제거
      await clearTokens?.();

      navigation.reset({
        index: 0,
        routes: [{ name: ROUTES.LOGIN }],
      });
    }
  }

  async function deleteTokens() {
    await clearTokens();
  }

  useEffect(() => {
    //deleteTokens(); // 디버깅용
    handleNavigate();
  }, []);

  return <View />;
}

export default StartScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     flexDirection: 'column',
//     alignItems: 'center',
//   },
// });
