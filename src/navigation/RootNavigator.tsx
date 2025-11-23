import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ROUTES from '../constants/routes';
import { RootStackParamList } from './types';
import BottomNavigator from './BottomNavigator';
import StartNavigator from './StartNavigator';
import ChatScreen from '../screens/main/chat/ChatScreen';
import DetailScreen from '../screens/main/detail/DetailScreen';
import SettingScreen from '../screens/main/profile/SettingScreen';
import AlarmScreen from '../screens/main/alarm/AlarmScreen';
import InterestScreen from '../screens/start/write_profile/InterestScreen'
import Myprofile from '../screens/main/detail/MyDetailScreen'

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name={ROUTES.STARTNAV}
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
        }} />
      <Stack.Screen
        name={ROUTES.DETAIL}
        component={DetailScreen}
        options={{
          headerShadowVisible: false,
          headerShown: false,
        }} />
      <Stack.Screen
        name={ROUTES.ALARM}
        component={AlarmScreen}
        options={{
          headerShadowVisible: false,
          headerShown: false,
        }} />
        <Stack.Screen
        name={ROUTES.SETTINGS}
        component={SettingScreen}
        options={{
          headerShadowVisible: false,
          headerShown: false,
        }} />
        <Stack.Screen
        name={ROUTES.PROFILE_EDIT}
        component={InterestScreen}
        options={{
          headerShadowVisible: false,
          headerShown: false,
        }} />
        <Stack.Screen
        name={ROUTES.PROFILE_PREVIEW}
        component={ProfilePreview}
        options={{
          headerShadowVisible: false,
          headerShown: false,
        }} />
    </Stack.Navigator>
  );
}

export default RootNavigator;
