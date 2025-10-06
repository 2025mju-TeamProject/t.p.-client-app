import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {useAuth} from '../../context/AuthContext';
import ROUTES from '../../constants/routes';

const HomeScreen = ({navigation}: any) => {
  const {user, logout} = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>안녕하세요, {user}님 👋</Text>
      <Button title="로그아웃" onPress={() => { logout(); navigation.replace(ROUTES.LOGIN); }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  title: {fontSize: 22, fontWeight: 'bold', marginBottom: 20},
});

export default HomeScreen;