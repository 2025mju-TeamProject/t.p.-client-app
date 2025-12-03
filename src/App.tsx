import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RootNavigator from './navigation/RootNavigator';
import {AuthProvider} from './context/AuthContext';
import { StatusBar } from 'react-native';
import { NetInfoProvider } from './context/NetInfoContext';
import { LoadingProvider } from './context/LoadingContext';

function App(){
    return (
      <>
        <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

        <NetInfoProvider>
          <LoadingProvider>
            <AuthProvider>
              <NavigationContainer>
                <RootNavigator />
              </NavigationContainer>
            </AuthProvider>
          </LoadingProvider>
        </NetInfoProvider>
      </>

    )
}

export default App;