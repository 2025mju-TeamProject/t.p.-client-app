import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './navigation/RootNavigator';
import { AuthProvider } from './context/AuthContext';
import { StatusBar } from 'react-native';
import { requestUserPermission, getFcmToken, registerForegroundMessageListener, registerNotificationOpenedListeners } from './services/fcm';

function App() {
  useEffect(() => {
    // 1) 알림 권한 요청
    requestUserPermission();

    // 2) FCM 토큰 가져오기
    getFcmToken();

    // 3) 메시지 리스너 등록
    const unsubscribeForeground = registerForegroundMessageListener();
    registerNotificationOpenedListeners();

    return () => {
      unsubscribeForeground();
    };
  }, []);

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <AuthProvider>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </AuthProvider>
    </>
  );
}

export default App;
