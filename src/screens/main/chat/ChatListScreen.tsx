import React, { useState } from 'react';
import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ChatListItem from '../../../components/chat/ChatListItem';
import ROUTES from '../../../constants/routes';

function ChatListScreen({navigation}: any) {
  const chatList = getItems()

  function navigateToChatScreen() {
    navigation.navigate(ROUTES.CHAT);
  }

  return (
    <View style={styles.container}>
      <View style={styles.head}></View>
      <View style={styles.list}>
        <FlatList
          data={chatList}
          renderItem={({ item }) =>
            <ChatListItem
              title={item.title}
              onPress={navigateToChatScreen} /> }
            />
      </View>
    </View>
  );
}

export default ChatListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fafafa',
  },

  head: {
    flex: 1,
    backgroundColor: 'black',
  },

  list: {
    flex: 3,
  },

  item: {
    height: 100,
    backgroundColor: 'green',
    borderRadius: 5,
    borderWidth: 1,
  },
});

function getItems() {
  return [
    { title: 'chat1' },
    { title: 'chat2' },
    { title: 'chat3' },
    { title: 'chat4' },
    { title: 'chat5' },
    { title: 'chat6' },
    { title: 'chat7' },
    { title: 'chat8' },
  ]
}