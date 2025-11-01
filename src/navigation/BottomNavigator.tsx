import React from 'react';
import HomeScreen from '../screens/main/HomeScreen';
import ROUTES from '../constants/routes';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import ChatListScreen from '../screens/main/chat/ChatListScreen';
import SettingScreen from '../screens/main/setting/SettingScreen';
import LikeScreen from '../screens/main/like/LikeScreen';

function RootNavigator() {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        // 현재 route.name 에 따라 탭 아이콘 분기
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string = "";

          if (route.name === 'Home') {
            iconName = focused ? 'home-sharp' : 'home-outline';
          } else if (route.name === 'Like') {
            iconName = focused ? 'heart-sharp' : 'heart-outline';
          } else if (route.name === 'ChatList') {
            iconName = focused ? 'chatbubble-sharp' : 'chatbubble-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'settings-sharp' : 'settings-outline';
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'black', // 활성 상태 색
        tabBarInactiveTintColor: 'black', // 비활성 색
      })}
    >
      <Tab.Screen
        name={ROUTES.HOME}
        component={HomeScreen}
        options={{
          headerShown: false,
          title: '홈',
        }}
      />
      <Tab.Screen
        name={ROUTES.LIKE}
        component={LikeScreen}
        options={{
          headerShown: false,
          title: '관심',
        }}
      />
      <Tab.Screen
        name={ROUTES.CHATLIST}
        component={ChatListScreen}
        options={{
          headerShown: false,
          title: '채팅',
        }}
      />
      <Tab.Screen
        name={ROUTES.SETTINGS}
        component={SettingScreen}
        options={{
          headerShown: false,
          title: '설정',
        }}
      />
    </Tab.Navigator>
  );
}

export default RootNavigator;
