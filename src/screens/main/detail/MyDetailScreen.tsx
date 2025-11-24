import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function MyProfileScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        사용자가 직접 사용자의 프로필을 보는 페이지
      </Text>
    </View>
  );
}

export default MyProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  text: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
  },
});
