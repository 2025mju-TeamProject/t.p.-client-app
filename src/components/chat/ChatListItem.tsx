import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';

type Props = { title: string; onPress: () => void };

function ChatListItem({title, onPress}: Props) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Icon name="user" size={50} color="black" />
      <Text style={styles.text}>{title}</Text>
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
    borderWidth: 1,
    borderColor: 'green',
  },
  text: {
    fontSize: 30,
  }
})