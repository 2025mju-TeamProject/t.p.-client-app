import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import ChatListItem from '../../../components/chat/ChatListItem';
import ROUTES from '../../../constants/routes';
import colors from '../../../constants/colors';
import Header from '../../../components/common/Header';

function ChatListScreen({ navigation }: any) {
  const chatList = getItems();

  function navigateToChatScreen(item: any) {
    navigation.navigate(ROUTES.CHAT, { chatId: item });
  }

  return (
    <View style={styles.container}>
      <Header title="채팅" />

      <View style={styles.list}>
        <FlatList
          data={chatList}
          renderItem={({ item }) => (
            <ChatListItem
              title={item.title}
              onPress={() => navigateToChatScreen(item.title)}
            />
          )}
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
    paddingBottom: 100,
  },

  head: {
    justifyContent: 'flex-end',
    height: 107,
    backgroundColor: colors.background,
  },

  headText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 14,
    marginLeft: 24,
  },

  list: {},

  item: {
    height: 100,
    backgroundColor: 'green',
    borderRadius: 5,
    borderWidth: 1,
  },
});

function getItems() {
  return [
    { title: '감자맛탕 29세' },
    { title: 'chat2' },
    { title: 'chat3' },
    { title: 'chat4' },
    { title: 'chat5' },
    { title: 'chat6' },
    { title: 'chat7' },
    { title: 'chat8' },
  ];
}
