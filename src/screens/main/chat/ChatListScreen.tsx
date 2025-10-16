import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';

function ChatListScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text>메세지리스트</Text>
    </ScrollView>
  )
}

export default ChatListScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
});