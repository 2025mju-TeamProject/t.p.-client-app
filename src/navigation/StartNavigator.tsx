import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/start/LoginScreen';
import ROUTES from '../constants/routes';
import { RootStackParamList } from './types';
import StartScreen from '../screens/start/StartScreen';
import SigninScreen from '../screens/start/SigninScreen';
import WriteProfileScreen from '../screens/start/WriteProfileScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

function StartNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={ROUTES.START}
        component={StartScreen}
        options={{
          headerShadowVisible: false,
          headerShown: false
        }} />

      <Stack.Screen
        name={ROUTES.LOGIN}
        component={LoginScreen}
        options={{
          headerShadowVisible: false,
          headerShown: false,
          title: '',

        }} />
      <Stack.Screen
        name={ROUTES.SIGNIN}
        component={SigninScreen}
        options={{
          headerShadowVisible: false,
          headerShown: false,
          title: '',
        }} />
    </Stack.Navigator>
  )
}

export default StartNavigator;