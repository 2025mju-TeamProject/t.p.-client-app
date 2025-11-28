import notifee, { EventType } from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import { AppRegistry } from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';

// 🔥 Notifee 백그라운드 이벤트 핸들러 등록
notifee.onBackgroundEvent(async ({ type, detail }) => {
  const { notification, pressAction } = detail;

  if (type === EventType.ACTION_PRESS) {
    console.log('[notifee] ACTION_PRESS', pressAction?.id);
    // 예: 특정 액션 누르면 알림 닫기
    await notifee.cancelNotification(notification.id);
  }

  if (type === EventType.DISMISSED) {
    console.log('[notifee] DISMISSED', notification.id);
  }
});

// 🔥 FCM 백그라운드 메시지 핸들러
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Background message:', remoteMessage);

  await notifee.displayNotification({
    title: remoteMessage.data?.title ?? '백그라운드 알림',
    body: remoteMessage.data?.body ?? '데이터 메시지 도착!',
    android: {
      channelId: 'default',
    },
  });
});

AppRegistry.registerComponent(appName, () => App);