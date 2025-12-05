import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import colors from '../../constants/colors';

type Props = {
  setText: (text: string) => void;
  onClick: () => void;
};

function SendChatModal({ setText, onClick }: Props) {
  const [chat, setChat] = useState<string>('');

  useEffect(() => {
    setText(chat);
  }, [chat])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>채팅을 시작할까요?</Text>
      <Text style={styles.subTitle}>{'진심을 담은 메시지로 시작해 보세요!\n예의 있고 부드럽게 시작하는 말은 어떨까요?'}</Text>

      <TextInput
        onChangeText={(value) => setChat(value)}
        value={chat}
        style={styles.textInput}
      />
      
      <TouchableOpacity onPress={() => {onClick()}} style={styles.button}>
        <Text style={{ color: 'white' }}>다음</Text>
      </TouchableOpacity>
    </View>
  );
}

export default SendChatModal;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 260,
    paddingHorizontal: 12,
    paddingVertical: 12,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 18,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 12,
  },
  subTitle: {
    fontSize: 13,
  },
  textInput: {
    width: '100%',
    height: 46,
    borderWidth: 1,
    borderColor: '#111',
    borderRadius: 12,
    paddingHorizontal: 12,
  },
  button: {
    width: '100%',
    height: 44,
    backgroundColor: colors.pink,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
