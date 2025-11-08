import React from 'react';
import { StyleSheet, View } from 'react-native';
import AppButton from '../../components/buttons/AppButton';
import ROUTES from '../../constants/routes';

function StartScreen({navigation}: any) {
  function navigateToLoginScreen() {
    navigation.navigate(ROUTES.LOGIN);
  }
  function navigateToSigninScreen() {
    navigation.navigate(ROUTES.SIGNIN);
  }

  return (
    <View style={styles.container}>
      <AppButton
        title="로그인"
        onPress={navigateToLoginScreen} />
      <AppButton
        title="회원가입"
        onPress={navigateToSigninScreen} />
    </View>
  )
}

export default StartScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 100,
    paddingHorizontal: 20,
  },
});