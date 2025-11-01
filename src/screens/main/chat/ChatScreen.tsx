import React, { useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../../../constants/colors';

function ChatScreen({ navigation, route }: any) {
  const { chatId } = route.params;
  const [text, setText] = useState('');

  return (
    <>
      {/*헤더*/}
      <View style={styles.header}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back-sharp" size={25} />
          </TouchableOpacity>

          <Image
            source={require('../../../../assets/sample-profile2.jpg')}
            style={styles.profileImage}
          />
          <Text style={styles.headerText}>{chatId}</Text>

          <TouchableOpacity onPress={() => {}} style={{ marginLeft: 'auto' }}>
            <Icon name="ellipsis-horizontal-sharp" size={25} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.container}>
        <Text style={{ height: 1000 }}>채팅방</Text>
      </ScrollView>

      <TextInput style={styles.textInput} value={text} onChangeText={setText} />

      {/*채팅*/}
    </>
  );
}

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    height: 87,
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 24,
    paddingBottom: 8,
  },
  headerContainer: {
    width: '100%',
    height: 37,
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 30,
    height: 30,
    borderRadius: 50,
    marginLeft: 15,
    marginRight: 10,
  },
  headerText: {
    fontSize: 14,
  },
  chat: {
    height: 100,
    backgroundColor: colors.primary,
  },
  textInput: {
    width: 300,
    height: 100,
    borderColor: '#aaa',
    textAlignVertical: 'top', // Android에서 위부터 입력
    padding: 10,
  },
});
