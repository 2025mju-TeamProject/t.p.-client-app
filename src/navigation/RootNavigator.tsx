import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ROUTES from '../constants/routes';
import { RootStackParamList } from './types';
import BottomNavigator from './BottomNavigator';
import StartNavigator from './StartNavigator';

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
    </Stack.Navigator>
  );
}

export default RootNavigator;