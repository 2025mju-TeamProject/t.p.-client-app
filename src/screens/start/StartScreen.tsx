import ROUTES from '../../constants/routes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react';
import {View} from 'react-native';

function StartScreen({ navigation }: any) {
  async function handleNavigate() {
    let route
    const token = await AsyncStorage.getItem('accessToken');
    if(token !== null) {

      route = ROUTES.WRITEPROFFILE;
    } else {
      route = ROUTES.HOME;
    }
    navigation.reset({
      index: 0,
      // routes: [{ name: route }],
      routes: [{ name: ROUTES.LOGIN }],
    });
  }

  useEffect(() => {
    handleNavigate();
  })

  return (
    <View />
  );
}

export default StartScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     flexDirection: 'column',
//     alignItems: 'center',
//   },
// });
