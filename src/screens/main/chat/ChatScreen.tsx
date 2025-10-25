import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';

function ChatScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={{height: 1000}}>채팅방</Text>
    </ScrollView>
  )
}

export default ChatScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
});