
import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const INPUT_HEIGHT = 48;

function ChatInput() {
  const [text, setText] = useState("");

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"} // 키보드 올라올 때 input도 올라감
      keyboardVerticalOffset={Platform.OS === "ios" ? 16 : 0}
      style={styles.container}
    >
      <View style={styles.inputContainer}>
        {/* 왼쪽 아이콘 */}
        <TouchableOpacity style={styles.iconWrapper}>
          <Ionicons name="add" size={22} color="#666" />
        </TouchableOpacity>

        {/* 텍스트 입력창 */}
        <TextInput
          style={styles.textInput}
          multiline
          value={text}
          onChangeText={setText}
          placeholder="메시지를 입력하세요..."
          placeholderTextColor="#aaa"
          scrollEnabled={false} // 내용이 많을 때 스크롤 대신 높이 증가
        />

        {/* 오른쪽 아이콘 */}
        <TouchableOpacity style={styles.iconWrapper}>
          {text.length > 0 ? (
            <Ionicons name="send" size={22} color="black" />
          ) : (
            <Ionicons name="send" size={22} color="#CACACA" />
          )}
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

export default ChatInput;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
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
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 24,
    backgroundColor: "#f9f9f9",
    paddingHorizontal: 8,
  },
  iconWrapper: {
    width: INPUT_HEIGHT,
    height: INPUT_HEIGHT,
    borderRadius: INPUT_HEIGHT / 2,
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: {
    flex: 1,
    minHeight: INPUT_HEIGHT,
    maxHeight: INPUT_HEIGHT * 3, // 최대 3줄까지만 늘어나게
    paddingVertical: 8,
    paddingHorizontal: 10,
    fontSize: 16,
    color: "#222",
  },
});
