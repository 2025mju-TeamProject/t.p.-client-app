import React, { useEffect, useRef, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../../../constants/colors';
import ChatBubble from '../../../components/chat/room/ChatBubble';
import Modal from 'react-native-modal';
import MenuModal from '../../../components/modals/MenuModal';
import TwoOptionModal from '../../../components/modals/TwoOptionModal';
import ChatInput from '../../../components/chat/room/ChatInput';

type option = {
  text: string;
  onClick: () => void;
};

function ChatScreen({ navigation, route }: any) {
  const { chatId } = route.params;
  const [text, setText] = useState('');
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isMenuVisible, setIsMenuVisible] = useState<boolean>(false);
  const content = getContent();
  const modalOption: Array<option> = [
    {
      text: '채팅방 나가기',
      onClick: () => {showModal()},

    },
    {
      text: '신고',
      onClick: () => {setIsMenuVisible(false);},
    },
  ]
  const scrollViewRef = useRef<ScrollView | null>(null);
  const scrollToBottom = () => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  };

  useEffect(() => {
    scrollToBottom();
  }, []);

  function showMenu() {
    setIsMenuVisible(true);
  }

  function closeMenu() {
    setIsMenuVisible(false);
  }

  function showModal() {
    closeMenu();
    setIsModalVisible(true);
  }

  function closeModal() {
    closeMenu();
    setIsModalVisible(false);
  }

  function blockUser() {
    setIsModalVisible(false);
    setIsMenuVisible(false);

    //todo 차단 api 연결
  }

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

          <TouchableOpacity
            onPress={() => {
              showMenu();
            }}
            style={{ marginLeft: 'auto' }}
          >
            <Icon name="ellipsis-horizontal-sharp" size={25} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.scrollContainer} >
        <ChatBubble time={'14:05'} text={chatId} isOpponent={true} />
        <ChatBubble time={'14:05'} text={chatId} isOpponent={false} />
        <ChatBubble time={'14:05'} text={chatId} isOpponent={true} />
        <ChatBubble time={'14:05'} text={chatId} isOpponent={true} />
        <ChatBubble time={'14:05'} text={chatId} isOpponent={true} />
        <ChatBubble time={'14:05'} text={chatId} isOpponent={true} />
        <ChatBubble time={'14:05'} text={chatId} isOpponent={true} />
        <ChatBubble time={'14:05'} text={chatId} isOpponent={true} />
        <ChatBubble time={'14:05'} text={'last'} isOpponent={true} />
      </ScrollView>


      <ChatInput />
      {/*채팅방 나가기 모달*/}
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setIsModalVisible(false)}
        animationIn="fadeInUp"
        animationOut="fadeOutDown">
        <TwoOptionModal
          title={'채팅을 종료할까요?'}
          subTitle={'채팅방을 나가면 다시 복구할 수 없어요.'}
          optionText1={'나가기'}
          optionText2={'취소'}
          onClick1={blockUser}
          onClick2={closeModal} />
      </Modal>

      {/*메뉴*/}
      <Modal
        isVisible={isMenuVisible}
        onBackdropPress={() => setIsModalVisible(false)}
        animationIn="fadeInUp"
        animationOut="fadeOutDown"
        style={{ justifyContent: 'flex-end', marginBottom: 100}}>
        <MenuModal
          options={modalOption} cancle={closeMenu} />
      </Modal>
    </>
  );
}

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 'auto',
    backgroundColor: '#ffffff',
  },
  scrollContainer: {
    height: 'auto',
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    flexDirection: 'column',
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
});

function getContent() {
  //todo 채팅 가져오기 api 연결

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
