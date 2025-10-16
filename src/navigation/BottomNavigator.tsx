import React from 'react';
import HomeScreen from '../screens/main/HomeScreen';
import ROUTES from '../constants/routes';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SearchScreen from '../screens/main/SearchScreen';

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
      <Tab.Screen
        name={ROUTES.SEARCH}
        component={SearchScreen}
        options={{
          title: '검색',
          tabBarIcon: ({color, size}) => (
            <Icon name="search" color={color} size={size} />
          ),
        }}/>
    </Tab.Navigator>
  )
}

export default RootNavigator;