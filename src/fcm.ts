// src/fcm.ts
import messaging from '@react-native-firebase/messaging';
import { Platform, Alert } from 'react-native';

// 알림 권한 요청 (iOS + Android 13+)
export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Notification permission enabled:', authStatus);
  } else {
    console.log('Notification permission denied');
  }
}

// FCM 토큰 가져오기
export async function getFcmToken() {
  const token = await messaging().getToken();
  console.log('FCM Token:', token);
  // TODO: 서버에 토큰 보내서 저장
  return token;
}

// 포그라운드 메시지 리스너
export function registerForegroundMessageListener() {
  const unsubscribe = messaging().onMessage(async remoteMessage => {
    console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
    Alert.alert('새 알림', remoteMessage.notification?.title ?? '알림');
  });

  return unsubscribe;
}

// 백그라운드/종료 상태에서 알림 클릭 핸들링 (App.tsx에서 사용)
export function registerNotificationOpenedListeners() {
  // 앱이 백그라운드일 때 알림 클릭
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log('Notification caused app to open from background state:', remoteMessage);
    // 특정 화면으로 네비게이션 등
  });

  // 앱이 완전히 종료된 상태에서 알림 클릭 → 처음 시작될 때
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log('Notification caused app to open from quit state:', remoteMessage);
      }
    });
}
