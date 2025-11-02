import React from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import colors from '../../constants/colors';

type Props = { text: String; time: String; isOpponent: boolean };

function ChatBubble({ text, time, isOpponent }: Props) {
  if (isOpponent) {
    return (
      <View style={styles.oppoContainer}>
        <View style={styles.oppoBubble}>
          <Text style={styles.oppoText}>{text}</Text>
        </View>
        <Text style={styles.oppoTime}>{time}</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Text style={styles.time}>{time}</Text>
      <View style={styles.bubble}>
        <Text style={styles.text}>{text}</Text>
      </View>
    </View>
  );
}

export default ChatBubble;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    alignSelf: 'flex-end',
    marginBottom: 10,
  },
  oppoContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  time: {
    fontSize: 10,
    color: colors.gray,
    marginRight: 8,
  },
  oppoTime: {
    fontSize: 10,
    color: colors.gray,
    marginLeft: 8,
  },
  text: {
    color: 'white',
  },
  oppoText: {
    color: 'black',
  },
  bubble: {
    maxWidth: (Dimensions.get('window').width * 3) / 5,
    width: 'auto',
    backgroundColor: 'black',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    borderBottomRightRadius: 0,
  },
  oppoBubble: {
    maxWidth: (Dimensions.get('window').width * 3) / 5,
    width: 'auto',
    backgroundColor: '#F7F7F7',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    borderBottomLeftRadius: 0,
  },
});
