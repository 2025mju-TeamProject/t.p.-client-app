import React from 'react';
import HomeScreen from '../screens/main/home/HomeScreen';
import ROUTES from '../constants/routes';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

function RootNavigator(){
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator>
      <Tab.Screen
        name={ROUTES.HOME}
        component={HomeScreen}
        options={{
          title: '홈',
          tabBarIcon: ({color, size}) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}/>
    </Tab.Navigator>
  )
}

export default RootNavigator;