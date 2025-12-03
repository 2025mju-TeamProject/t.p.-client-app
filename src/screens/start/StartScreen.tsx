import ROUTES from '../../constants/routes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react';
import {View} from 'react-native';
import { getAccessToken } from '../../utils/token';

function StartScreen({ navigation }: any) {
  async function handleNavigate() {
    // let route
    // const token = getAccessToken();
    // if(token !== null) {
    //   // todo 프로필 여부 체크
    //   route = ROUTES.WRITEPROFFILE;
    // } else {
    //   route = ROUTES.HOME;
    // }
    navigation.reset({
      index: 0,
      //routes: [{ name: route }],
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
