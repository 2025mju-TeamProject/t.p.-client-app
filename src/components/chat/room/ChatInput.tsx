
import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text
} from "react-native";
import Ionicons from "react-native-vector-icons/Feather";

type Props = {
  onSend: (text: string) => void;
};

const INPUT_HEIGHT = 48;

function ChatInput({ onSend }: Props) {
  const [text, setText] = useState("");

  function handleSend() {
    onSend(text);
    setText('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        {/* 왼쪽 아이콘 */}
        <TouchableOpacity style={styles.iconWrapper}>
          <Ionicons name="image" size={22} color="black" />
        </TouchableOpacity>

        {/* 텍스트 입력창 */}
        <TextInput
          style={styles.textInput}
          multiline
          value={text}
          onChangeText={setText}
          scrollEnabled={false} // 내용이 많을 때 스크롤 대신 높이 증가
        />

        {/* 오른쪽 아이콘 */}
        <TouchableOpacity style={[styles.iconWrapper, {width: 40}]} onPress={handleSend}>
          {text.length > 0 ? (
            <Text style={[styles.sendText, {color: 'black'}]}>보내기</Text>
          ) : (
            <Text style={[styles.sendText, {color: '#CACACA'}]}>보내기</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default ChatInput;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "white",
    borderTopWidth: 0.5,
    borderTopColor: "#ddd",
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    //borderWidth: 1,
    paddingHorizontal: 8,
  },
  iconWrapper: {
    width: 24,
    height: INPUT_HEIGHT,
    //borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: {
    flex: 1,
    minHeight: INPUT_HEIGHT,
    maxHeight: INPUT_HEIGHT * 3, // 최대 3줄까지만 늘어나게
    paddingVertical: 8,
    paddingHorizontal: 10,
    paddingBottom: 15,
    fontSize: 16,
    color: "#222",
    //borderWidth: 1,
  },
  sendText: {
    fontSize: 14,
    fontFamily: 'NanumSquare4'
  }
});
