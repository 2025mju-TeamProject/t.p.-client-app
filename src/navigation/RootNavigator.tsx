import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ROUTES from '../constants/routes';
import { RootStackParamList } from './types';
import BottomNavigator from './BottomNavigator';
import StartNavigator from './StartNavigator';
import ChatScreen from '../screens/main/chat/ChatScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name={ROUTES.START}
        component={StartNavigator} />
      <Stack.Screen
        name={ROUTES.BOTTOM}
        component={BottomNavigator}
        options={{
          headerShadowVisible: false,
          headerShown: false,
        }} />
      <Stack.Screen
        name={ROUTES.CHAT}
        component={ChatScreen}
        options={{
          headerShadowVisible: false,
          headerShown: false,
          title: '채팅방 이름',
        }} />
    </Stack.Navigator>
  );
}

export default RootNavigator;