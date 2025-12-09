// 상대방의 프로필을 볼 때 화면

import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Modal from 'react-native-modal';
import DetailCard from '../../../components/profile/DetailCard';
import IconButton from '../../../components/buttons/IconButton';
import MenuModal from '../../../components/modals/MenuModal';
import colors from '../../../constants/colors';
import TwoOptionModal from '../../../components/modals/TwoOptionModal';
import { ProfileResponse } from '../../../api/profile';
import { sendHeartApi, blockUserApi } from '../../../api/interacion';
import { useAuth } from '../../../context/AuthContext';
import { isApiError } from '../../../api/auth';
import AlertModal from '../../../components/modals/AlertModal';
import ReportModal from '../../../components/modals/ReportModal';
import SendChatModal from '../../../components/modals/SendChatModal';
import { sendMessage } from '../../../api/chat';
import { useLoading } from '../../../context/LoadingContext';

type option = {
  text: string;
  onClick: () => void;
};

function DetailScreen({ navigation, route }: any) {
  const [chat, setChat] = useState<string>('');
  const [modalPicker, setModalPicker] = useState<
    | null
    | 'ignore'
    | 'ignore_success'
    | 'heart'
    | 'heart_success'
    | 'heart_already_success'
    | 'chat'
    | 'chat_success'
    | 'report'
    | 'report_success'
  >(null);
  const successMessage: Record<string, string> = {
    heart_success: '하트를 보냈습니다.',
    heart_already_success: '이미 하트를 보냈습니다.',
    report_success: '신고가 접수되었습니다.',
    chat_success: '채팅을 보냈습니다.',
    ignore_success: '차단되었습니다.',
    ignore: '',
    heart: '',
    chat: '',
    report: '',
  };
  const [isMenuVisible, setIsMenuVisible] = useState<boolean>(false);
  const params = route.params;
  const oppoId = params.profile.user_id;
  const { accessToken } = useAuth();
  const { showLoading, hideLoading } = useLoading();
  const modalOption: Array<option> = [
    {
      text: '신고',
      onClick: () => {
        pickModal('report');
      },
    },
    {
      text: '차단',
      onClick: () => {
        pickModal('ignore');
      },
    },
  ];

  function pickModal(modalType: string | null) {
    setIsMenuVisible(false);
    if (
      modalType !== 'ignore' &&
      modalType !== 'ignore_success' &&
      modalType !== 'heart' &&
      modalType !== 'heart_success' &&
      modalType !== 'heart_already_success' &&
      modalType !== 'chat' &&
      modalType !== 'chat_success' &&
      modalType !== 'report_success' &&
      modalType !== 'report'
    )
      return;

    setModalPicker(modalType!);
  }

  function closeModal() {
    setIsMenuVisible(false);
    setModalPicker(null);
  }

  async function blockUser() {
    setModalPicker(null);
    setIsMenuVisible(false);
    if (!accessToken) return;

    pickModal('ignore_success');
    // try {
    //   const response = await blockUserApi(oppoId, accessToken);
    //   if(response) {
    //
    //   }
    // } catch (error) {
    //   if (isApiError(error)) {
    //     console.log(error);
    //   }
    // }
  }

  async function sendHeart() {
    if (!accessToken) return;

    try {
      const response = await sendHeartApi(oppoId, accessToken);
      if (response === '하트를 보냈습니다.') {
        pickModal('heart_success');
      } else if (response === '하트를 취소했습니다.') {
        await sendHeartApi(oppoId, accessToken);
        pickModal('heart_already_success');
      }
    } catch (error) {
      if (isApiError(error)) {
        console.log(error);
      }
    }
  }

  async function reportUser() {
    pickModal('report_success');
  }

  async function startChat() {
    if (!accessToken || !chat) return;

    pickModal(null);
    showLoading()
    try {
      const response = await sendMessage(chat, oppoId, accessToken);
      console.log(response);

      pickModal('chat_success');
    } catch (error) {
      if (isApiError(error)) {
        console.log(error);
      }
    } finally {
      hideLoading();
    }
  }

  return (
    <View style={styles.container}>
      <DetailCard profile={params.profile} report={params.report} />

      <View style={styles.backIcon}>
        <IconButton
          iconName={'arrow-back-sharp'}
          color={colors.white}
          size={30}
          onClick={() => {
            navigation.goBack();
          }}
        />
      </View>

      <View style={styles.menuIcon}>
        <IconButton
          iconName={'ellipsis-horizontal-sharp'}
          color={colors.white}
          size={30}
          onClick={() => setIsMenuVisible(true)}
        />
      </View>

      <View style={styles.likeIcon}>
        <IconButton
          iconName={'heart'}
          color={colors.white}
          size={30}
          onClick={() => setModalPicker('heart')}
        />
      </View>

      <View style={styles.messageIcon}>
        <IconButton
          iconName={'chatbox-sharp'}
          color={colors.white}
          size={30}
          onClick={() => setModalPicker('chat')}
        />
      </View>

      {/*모달*/}
      <Modal
        isVisible={modalPicker === 'ignore'}
        onBackdropPress={closeModal}
        animationIn="fadeInUp"
        animationOut="fadeOutDown"
      >
        <TwoOptionModal
          title={'이 회원을 차단할까요?'}
          subTitle={'나중에 차단 해제를 할 수 없어요.'}
          optionText1={'차단하기'}
          optionText2={'취소'}
          onClick1={blockUser}
          onClick2={closeModal}
        />
      </Modal>

      {/*하트 모달*/}
      <Modal
        isVisible={modalPicker === 'heart'}
        onBackdropPress={closeModal}
        animationIn="fadeInUp"
        animationOut="fadeOutDown"
      >
        <TwoOptionModal
          title={`\'하트\'를 보낼까요?`}
          subTitle={
            '하트를 보내면 상대방에게 알림이 가고\n상대방은 회원님의 프로필을 볼 수 있어요!'
          }
          optionText1={'보내기'}
          optionText2={'취소'}
          onClick1={sendHeart}
          onClick2={closeModal}
        />
      </Modal>

      {/*채팅 모달*/}
      <Modal
        isVisible={modalPicker === 'chat'}
        onBackdropPress={closeModal}
        animationIn="fadeInUp"
        animationOut="fadeOutDown"
      >
        <SendChatModal
          setText={(value) => setChat(value)}
          onClick={startChat}
        />
      </Modal>

      {/*신고 모달*/}
      <Modal
        isVisible={modalPicker === 'report'}
        onBackdropPress={closeModal}
        animationIn="fadeInUp"
        animationOut="fadeOutDown"
      >
        <ReportModal
          onClick1={reportUser}
          onClick2={closeModal}
        />
      </Modal>

      {/*알럿 모달*/}
      <Modal
        isVisible={
          modalPicker === 'heart_success' ||
          modalPicker === 'heart_already_success' ||
          modalPicker === 'report_success' ||
          modalPicker === 'ignore_success' ||
          modalPicker === 'chat_success'
        }
        onBackdropPress={closeModal}
      >
        <AlertModal
          title={successMessage[modalPicker ?? 'ignore']}
          optionText={'확인'}
          onClick={closeModal}
        />
      </Modal>

      {/*메뉴*/}
      <Modal
        isVisible={isMenuVisible}
        onBackdropPress={() => pickModal(null)}
        animationIn="fadeInUp"
        animationOut="fadeOutDown"
        style={{ justifyContent: 'flex-end', marginBottom: 100 }}
      >
        <MenuModal
          options={modalOption}
          cancle={() => setIsMenuVisible(false)}
        />
      </Modal>
    </View>
  );
}

export default DetailScreen;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingTop: 40,
    backgroundColor: '#ffffff',
  },
  backIcon: {
    position: 'absolute',
    top: 55,
    left: 18,
  },
  menuIcon: {
    position: 'absolute',
    top: 55,
    right: 18,
  },
  likeIcon: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: colors.darkGray,
    opacity: 0.8,
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 24,
    left: 24,
    right: 24,
  },
  messageIcon: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: colors.darkGray,
    opacity: 0.8,
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 24,
    right: 24,
  },
});
