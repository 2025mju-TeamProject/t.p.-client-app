import React, { useEffect, useState } from 'react';
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
import ChatBubble from '../../../components/chat/ChatBubble';
import OneOptionModal from '../../../components/modals/OneOptionModal';
import Modal from 'react-native-modal';

function ChatScreen({ navigation, route }: any) {
  const { chatId } = route.params;
  const [text, setText] = useState('');
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const content = getContent();

  useEffect(() => {}, []);

  function showModal() {
    setIsModalVisible(true);
  }

  function closeModal() {
    setIsModalVisible(false);
  }

  return (
    <View>
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

          <TouchableOpacity
            onPress={() => {
              showModal();
            }}
            style={{ marginLeft: 'auto' }}
          >
            <Icon name="ellipsis-horizontal-sharp" size={25} />
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setIsModalVisible(false)}
        animationIn="fadeInUp"
        animationOut="fadeOutDown"
      >
        <OneOptionModal
          title={'이 회원을 차단할까요?'}
          subTitle={'나중에 차단 해제를 할 수 없어요.'}
          optionText={'확인'}
        />
      </Modal>
      <ScrollView style={styles.container}>
        <ChatBubble time={'14:05'} text={chatId} isOpponent={true} />
        <ChatBubble time={'14:05'} text={chatId} isOpponent={false} />
        <ChatBubble time={'14:05'} text={chatId} isOpponent={true} />
      </ScrollView>

      <TextInput style={styles.textInput} value={text} onChangeText={setText} />

      {/*채팅*/}
    </View>
  );
}

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    height: 1000,
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    height: 87,
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 24,
    backgroundColor: '#ffffff',
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

function getContent() {
  return [
    {
      text: '안녕하세요~',
      isOpponent: false,
    },
    {
      text: '안녕하세요',
      isOpponent: true,
    },
    {
      text:
        ' 감자깡은 사교적이고 자유로운 기운이 강해 처음엔 나와 속도가 다를 수 있지' +
        '만, 그 밝고 활발한 에너지가 내 삶에 새' +
        '로운 활력을 줄 것 같아요. ',
      isOpponent: false,
    },
    {
      text:
        ' 감자깡은 사교적이고 자유로운 기운이 강해 처음엔 나와 속도가 다를 수 있지' +
        '만, 그 밝고 활발한 에너지가 내 삶에 새' +
        '로운 활력을 줄 것 같아요. ',
      isOpponent: true,
    },
    {
      text: '반갑습니다반갑습니다',
      isOpponent: false,
    },
    {
      text: '반갑습니다',
      isOpponent: false,
    },
  ];
}
