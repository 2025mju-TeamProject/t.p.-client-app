import React from 'react';
import { StyleSheet, TouchableOpacity, Text, Image, View } from 'react-native';
import colors from '../../constants/colors';
import { ChatRoomResponse } from '../../api/chat';

type Props = { roomInfo: ChatRoomResponse; onPress: () => void };

function ChatListItem({roomInfo, onPress}: Props) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image
        source={require('../../../assets/sample-profile2.jpg')}
        style={styles.profileImage}/>

      <View style={styles.textContainer}>
        <Text style={styles.titleText}>{roomInfo.other_nickname}</Text>
        <Text>{roomInfo.last_message}</Text>
      </View>
      <Text style={styles.timeText}>14:18</Text>
    </TouchableOpacity>
  )
}

export default ChatListItem;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 18,
    backgroundColor: '#ffffff',
  },
  textContainer: {
    height: '100%',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 7,
  },
  recentChatText: {
    fontSize: 12,
    color: colors.gray,
  },
  timeText: {
    fontSize: 10,
    color: colors.gray,
    alignSelf: 'flex-start',
    marginLeft: 'auto',
    marginTop: 5,
  },
  profileImage: {
    width: 54,
    height: 54,
    borderRadius: 50,
    marginRight: 14,
  }
})