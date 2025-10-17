import React from 'react';
import HomeScreen from '../screens/main/HomeScreen';
import ROUTES from '../constants/routes';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import SearchScreen from '../screens/main/SearchScreen';
import ChatListScreen from '../screens/main/chat/ChatListScreen';

function RootNavigator(){
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator>
      <Tab.Screen
        name={ROUTES.HOME}
        component={HomeScreen}
        options={{
          title: '',
          tabBarIcon: ({color, size}) => (
            <Icon name="home-sharp" color={color} size={size} />
          ),
        }}/>
      <Tab.Screen
        name={ROUTES.SEARCH}
        component={SearchScreen}
        options={{
          title: '',
          tabBarIcon: ({color, size}) => (
            <Icon name="search" color={color} size={size} />
          ),
        }}/>
      <Tab.Screen
        name={ROUTES.CHATLIST}
        component={ChatListScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <Icon name="chatbubble-sharp" color={color} size={size} />
          ),
        }}/>
    </Tab.Navigator>
  )
}

export default RootNavigator;