import React from 'react';
import { StyleSheet, TouchableOpacity, Text, Image, View } from 'react-native';
import colors from '../../constants/colors';
import { ChatRoomResponse } from '../../api/chat';

type Props = { roomInfo: ChatRoomResponse; onPress: () => void };

function ChatListItem({roomInfo, onPress}: Props) {
  const imageUri = `http://3.35.223.187:8000${roomInfo.other_image}`;
  function toTimeHM(isoString: string): string {
    const date = new Date(isoString);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.imageContainer}>
        <Image
          source={{uri: imageUri}}
          style={styles.profileImage}/>
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.titleText}>{roomInfo.other_nickname}</Text>
        <View style={{width:'100%'}}>
          <Text style={styles.recentChatText} numberOfLines={2} ellipsizeMode={'clip'}>{roomInfo.last_message}</Text>
        </View>
      </View>

      <View style={styles.timeContainer}>
        <Text style={styles.timeText}>{toTimeHM(roomInfo.timestamp)}</Text>
      </View>

    </TouchableOpacity>
  )
}

export default ChatListItem;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 100,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
    //borderWidth: 1,
    backgroundColor: '#ffffff',
  },
  textContainer: {
    width: '60%',
    //borderWidth: 1,
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
  timeContainer: {
    width: 40,
    height: '100%',
   // borderWidth: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  timeText: {
    fontSize: 10,
    color: colors.gray,
    marginTop: 5,
  },
  profileImage: {
    width: 54,
    height: 54,
    borderRadius: 50,
    borderWidth: 0.8,
    borderColor: colors.gray,
  },
  imageContainer: {
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    //borderWidth: 1,
  }
})