import React, { useEffect, useRef, useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Platform,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../../../constants/colors';
import ChatBubble from '../../../components/chat/room/ChatBubble';
import Modal from 'react-native-modal';
import MenuModal from '../../../components/modals/MenuModal';
import TwoOptionModal from '../../../components/modals/TwoOptionModal';
import ChatInput from '../../../components/chat/room/ChatInput';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { isApiError } from '../../../api/auth';
import { useAuth } from '../../../context/AuthContext';
import { getAssistant, getMessage } from '../../../api/chat';
import { useLoading } from '../../../context/LoadingContext';

type option = {
  text: string;
  onClick: () => void;
};

type Chat = {
  message: string;
  sender: number;
  timeStamp: string;
};

function ChatScreen({ navigation, route }: any) {
  const { roomInfo } = route.params;
  const oppoId: number = roomInfo?.other_user_id;
  const { accessToken } = useAuth();
  const ws = useRef<WebSocket | null>(null);
  const [assistText, setAssisText] = useState<string[]>([]);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isMenuVisible, setIsMenuVisible] = useState<boolean>(false);
  const [isAssistantVisible, setIsAssistantVisible] = useState<boolean>(false);
  const [inputText, setInputText] = useState('');
  const [content, setContent] = useState<Chat[]>([]);
  const { showLoading, hideLoading } = useLoading()
  const modalOption: Array<option> = [
    {
      text: '채팅방 나가기',
      onClick: () => {
        showModal();
      },
    },
    {
      text: '신고',
      onClick: () => {
        setIsMenuVisible(false);
      },
    },
  ];
  const scrollViewRef = useRef<ScrollView | null>(null);
  const scrollToBottom = () => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  };

  useEffect(() => {
    if (!accessToken) return;

    loadMessages(oppoId, accessToken);

    const socket = new WebSocket(
      `ws://3.35.223.187:8000/ws/chat/${oppoId}/?token=${accessToken}`,
    );
    ws.current = socket;

    socket.onopen = () => {
      console.log('WebSocket connected');
    };

    socket.onmessage = event => {
      try {
        const data = JSON.parse(event.data);
        setContent(prev => [
          ...prev,
          {
            message: data.message,
            sender: data.sender,
            timeStamp: data.timestamp,
          },
        ]);
        console.log(data.message);
        if (data.type === 'message') {
          console.log(data);
        }
      } catch (error) {
        if (isApiError(error)) {
          console.log(error);
        }
      }
    };

    socket.onerror = error => {
      console.log('WebSocket error', error);
    };

    socket.onclose = e => {
      console.log('WebSocket closed', e.code, e.reason);
    };

    return () => {
      socket.close();
    };
  }, [roomInfo, accessToken]);

  useEffect(() => {
    if (!content.length) return;

    setTimeout(() => {
      scrollToBottom();
    }, 0);
  }, [content]);

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

  function handleAssistant() {
    if(isAssistantVisible) { setIsAssistantVisible(false); return }
    else setIsAssistantVisible(true);
    if(!accessToken || !oppoId) return;

    loadAssistant(oppoId, accessToken)
    scrollToBottom();
  }

  function blockUser() {
    setIsModalVisible(false);
    setIsMenuVisible(false);

    //todo 차단 api 연결
  }

  async function loadMessages(targetId: number, auth: string) {
    const data = await getMessage(targetId, auth);

    const mapped = data.map(item => ({
      message: item.content,
      sender: item.sender,
      timeStamp: item.timestamp,
    }));

    setContent(mapped);
  }

  async function loadAssistant(oppoId: number, auth: string) {
    showLoading()
    setAssisText([])
    try {
      const data = await getAssistant(oppoId, auth);
      console.log(data);
      setAssisText(data);
    } catch (error) {
      if(isApiError(error)) {
        console.log(error?.response);
      }
    } finally {
      hideLoading();
    }
  }

  function toTimeHM(isoString: string): string {
    const date = new Date(isoString);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  function sendMessage(text: string) {
    if (!text.trim()) return;
    if (!ws.current || ws.current.readyState !== WebSocket.OPEN) {
      console.log('소켓이 아직 안 열렸어요');
      return;
    }

    const payload = {
      message: text,
    };

    ws.current.send(JSON.stringify(payload));
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: '#fff' }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 48 : 0} // 헤더 높이만큼
      >
        {/*헤더*/}
        <View style={styles.header}>
          <View style={styles.headerContainer}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="arrow-back-sharp" size={25} />
            </TouchableOpacity>

            <Image
              source={{uri: `http://3.35.223.187:8000${roomInfo.other_image}`}}
              style={styles.profileImage}
            />
            <Text style={styles.headerText}>{roomInfo.other_nickname}</Text>

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

        <ScrollView
          style={styles.scrollContainer}
          ref={scrollViewRef}
          onContentSizeChange={() => scrollToBottom()}
        >
          {content !== undefined &&
            content.map((item, index) => (
              <ChatBubble
                key={item.timeStamp}
                text={item.message}
                time={toTimeHM(item.timeStamp)}
                isOpponent={item.sender === oppoId}
              />
            ))}
        </ScrollView>

        {isAssistantVisible === true && (
          <View style={styles.assistSection}>
            <View style={styles.assistContainer}>
              <View
                style={{
                  width: '100%',
                  height: 23,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <View
                  style={{ width: 78, height: 3, backgroundColor: '#C8C8C8' }}
                />
              </View>
              <TouchableOpacity style={styles.section} onPress={() => setInputText(assistText[0])}>
                <Text style={styles.optionText}>{assistText[0]}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.section} onPress={() => setInputText(assistText[1])}>
                <Text style={styles.optionText}>{assistText[1]}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.section} onPress={() => setInputText(assistText[2])}>
                <Text style={styles.optionText}>{assistText[2]}</Text>
              </TouchableOpacity>
              <View
                style={{ width: '100%', height: 23, justifyContent: 'center' }}
              >
                <Text
                  style={{
                    fontSize: 10,
                    color: '#8F8F8F',
                    paddingHorizontal: 24,
                    borderBottomWidth: 0,
                  }}
                >
                  메세지를 클릭하면, 자동으로 복사돼요.
                </Text>
              </View>
            </View>
          </View>
        )}

        <ChatInput
          onPress={handleAssistant}
          onSend={sendMessage}
          externalText={inputText}
        />
      </KeyboardAvoidingView>

      {/*채팅방 나가기 모달*/}
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setIsModalVisible(false)}
        animationIn="fadeInUp"
        animationOut="fadeOutDown"
      >
        <TwoOptionModal
          title={'채팅을 종료할까요?'}
          subTitle={'채팅방을 나가면 다시 복구할 수 없어요.'}
          optionText1={'나가기'}
          optionText2={'취소'}
          onClick1={blockUser}
          onClick2={closeModal}
        />
      </Modal>

      {/*메뉴*/}
      <Modal
        isVisible={isMenuVisible}
        onBackdropPress={() => setIsModalVisible(false)}
        animationIn="fadeInUp"
        animationOut="fadeOutDown"
        style={{ justifyContent: 'flex-end', marginBottom: 100 }}
      >
        <MenuModal options={modalOption} cancle={closeMenu} />
      </Modal>
    </SafeAreaView>
  );
}

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingTop: 5,
    flexDirection: 'column',
  },
  header: {
    height: 70,
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 24,
    paddingBottom: 14,
    backgroundColor: '#ffffff',
    //borderWidth: 1,
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
  assistSection: {
    width: '100%',
    height: 207,
    //backgroundColor: '#CACACA',
    paddingHorizontal: 24,
    marginBottom: 20,
  },
  assistContainer: {
    width: '100%',
    height: '100%',
    borderRadius: 22,
    backgroundColor: 'white',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EDEDED',
  },
  section: {
    width: '100%',
    height: 53,
    borderBottomWidth: 1,
    borderBottomColor: '#EDEDED',
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  optionText: {
    fontSize: 12,
    fontFamily: 'NanumSquareB',
    color: 'black',
  },
});
