import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RootNavigator from './navigation/RootNavigator';
import {AuthProvider} from './context/AuthContext';
import { StatusBar } from 'react-native';

function App(){
    return (
      <>
        <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
        <AuthProvider>
          <NavigationContainer>
            <RootNavigator />
          </NavigationContainer>
        </AuthProvider>
      </>

    )
}

export default App;