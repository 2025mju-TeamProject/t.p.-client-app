import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/home/HomeScreen';
import LoginScreen from '../screens/login/LoginScreen';
import ROUTES from '../constants/routes';
import {RootStackParamList} from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator(){

    return (
        <Stack.Navigator>
            <Stack.Screen name={ROUTES.LOGIN} component={LoginScreen} />
            <Stack.Screen name={ROUTES.HOME} component={HomeScreen} />
        </Stack.Navigator>
    )
}

export default RootNavigator;