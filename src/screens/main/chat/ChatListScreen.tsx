import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import ChatListItem from '../../../components/chat/ChatListItem';
import ROUTES from '../../../constants/routes';
import colors from '../../../constants/colors';
import Header from '../../../components/common/Header';
import { ChatRoomResponse, getChatRooms } from '../../../api/chat';
import { useAuth } from '../../../context/AuthContext';

function ChatListScreen({ navigation }: any) {
  const [chatList, setChatList] = useState<ChatRoomResponse[]>([]);
  const { accessToken } = useAuth();

  useEffect(() => {
    if (!accessToken) return;

    loadChatRooms(accessToken);
  }, [accessToken]);

  async function loadChatRooms(auth: string) {
    const data = await getChatRooms(auth);
    const mapped = data.map(item => ({
      room_id: item.room_id,
      other_user_id: item.other_user_id,
      other_nickname: item.other_nickname,
      other_image: item.other_image,
      last_message: item.last_message,
      timestamp: item.timestamp,
    }));

    setChatList(mapped);
  }

  function navigateToChatScreen(item: any) {
    navigation.navigate(ROUTES.CHAT, { roomInfo: item });
  }

  return (
    <View style={styles.container}>
      <Header title="채팅" />

      <View style={styles.list}>
        <FlatList
          data={chatList}
          renderItem={({ item }) => (
            <ChatListItem
              roomInfo={item}
              onPress={() => navigateToChatScreen(item)}
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
