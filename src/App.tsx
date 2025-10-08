import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RootNavigator from './navigation/RootNavigator';
import {AuthProvider} from './context/AuthContext';

function App(){
    return (
        <AuthProvider>
            <NavigationContainer>
                <RootNavigator />
            </NavigationContainer>
        </AuthProvider>
    )
}

export default App;