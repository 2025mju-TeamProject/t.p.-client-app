import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/start/LoginScreen';
import ROUTES from '../constants/routes';
import { RootStackParamList } from './types';
import BottomNavigator from './BottomNavigator';
import StartScreen from '../screens/start/StartScreen';
import SigninScreen from '../screens/start/SigninScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
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
          title: '',

        }} />
      <Stack.Screen
        name={ROUTES.SIGNIN}
        component={SigninScreen}
        options={{
          headerShadowVisible: false,
          title: '',
        }} />

      <Stack.Screen
        name={ROUTES.BOTTOM}
        component={BottomNavigator}
        options={{
          headerShadowVisible: false,
          headerShown: false,
        }} />
    </Stack.Navigator>
  );
}

export default RootNavigator;