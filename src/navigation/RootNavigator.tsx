import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/login/LoginScreen';
import ROUTES from '../constants/routes';
import {RootStackParamList} from './types';
import BottomNavigator from './BottomNavigator';

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator(){

    return (
        <Stack.Navigator>
            <Stack.Screen name={ROUTES.LOGIN} component={LoginScreen} />
            <Stack.Screen
              name={ROUTES.BOTTOM}
              component={BottomNavigator}
              options={{
                headerShown: false,
              }}/>
        </Stack.Navigator>
    )
}

export default RootNavigator;