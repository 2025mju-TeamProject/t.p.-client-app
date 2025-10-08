import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {useAuth} from '../../context/AuthContext';
import ROUTES from '../../constants/routes';

function LoginScreen({navigation}: any){
  const {login} = useAuth();
  const handleLogin = () => {
    login('Jane Doe');
    navigation.navigate(ROUTES.HOME);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>로그인 화면</Text>
      <Button title="로그인" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  title: {fontSize: 22, fontWeight: 'bold', marginBottom: 20},
});

export default LoginScreen;