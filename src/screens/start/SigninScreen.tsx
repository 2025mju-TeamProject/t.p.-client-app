import React from 'react'
import { StyleSheet, Text, View } from 'react-native';

function SigninScreen() {
  return (
    <View style={styles.container}>
      <Text>회원가입</Text>
    </View>
  )
}

export default SigninScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 100,
    paddingHorizontal: 20,
  },
})