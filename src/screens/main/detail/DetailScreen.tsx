import React, { useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView } from 'react-native';
import Modal from 'react-native-modal';
import DetailCard from '../../../components/profile/DetailCard';
import IconButton from '../../../components/buttons/IconButton';
import MenuModal from '../../../components/modals/MenuModal';
import colors from '../../../constants/colors';
import TwoOptionModal from '../../../components/modals/TwoOptionModal';

type option = {
  text: string;
  onClick: () => void;
};

function DetailScreen({ navigation }: any) {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isMenuVisible, setIsMenuVisible] = useState<boolean>(false);
  const modalOption: Array<option> = [
    {
      text: '신고',
      onClick: () => {
        closeModal();
      },
    },
    {
      text: '차단',
      onClick: () => {
        showModal();
      },
    },
  ];

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
    <View style={styles.container}>
      <DetailCard />

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
          onClick={showMenu}
        />
      </View>

      {/*모달*/}
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setIsModalVisible(false)}
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
});
