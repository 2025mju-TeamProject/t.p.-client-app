import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import BirthdayScreen from '../../screens/start/write_profile/BirthdayScreen';
import GenderScreen from '../../screens/start/write_profile/GenderScreen';
import AppButton from '../../components/buttons/AppButton';
import colors from '../../constants/colors';
import PagerView from 'react-native-pager-view';
import InterestScreen from '../../screens/start/write_profile/InterestScreen';
import MbtiScreen from '../../screens/start/write_profile/MbtiScreen';
import JobScreen from '../../screens/start/write_profile/JobScreen';
import LocationScreen from '../../screens/start/write_profile/LocationScreen';
import ImageScreen from '../../screens/start/write_profile/ImageScreen';
import IntroductionScreen from '../../screens/start/write_profile/IntroductionScreen';
import Modal from 'react-native-modal';
import ROUTES from '../../constants/routes';
import SignUpProgressBar from '../../components/progress/SignUpProgressBar';

const messages = ['쿠피가 프로필 작성 중', '쿠피가 프로필 작성 중.', '쿠피가 프로필 작성 중..', '쿠피가 프로필 작성 중...']

function WriteProfileScreen({ navigation }: any) {
  const pagerRef = useRef<PagerView>(null);
  const [page, setPage] = useState<number>(0);
  const [gender, setGender] = useState<string>('');
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [messageIndex, setMessageIndex] = useState<number>(0);

  const totalPages = 8;

  function goNext() {
    if (!pagerRef.current) return;
    if (page > totalPages - 1) return;
    if (page === totalPages - 1) {
      handleLogin()
      return;
    }

    pagerRef.current.setPage(page + 1);
  }

  function goBack() {
    if (!pagerRef.current) return;
    if (page <= 0) return;

    pagerRef.current.setPage(page - 1);
  }

  const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  useEffect(() => {
    if (page === totalPages - 1) {
      async function run() {
        setModalVisible(true);
        await wait(2000);
        setModalVisible(false);
      }
      run()
    }
  }, [page]);

  useEffect(() => {
    if(modalVisible) {
      const timer = setInterval(() => {
        setMessageIndex(prev => (prev + 1) % messages.length);
      }, 1000); // 1초

    }
  }, [modalVisible]);

  async function handleLogin(){
    if (page === totalPages - 1) {
      setModalVisible(true);

      await wait(3000)
      setModalVisible(false)

      navigation.reset({
        index: 0,
        routes: [{ name: ROUTES.LOGIN }],
      });
    }
  };

  return (
    <View style={styles.container}>
      {/* 헤더 & 상단 프로그레스바 */}
    <View style={styles.header}>
      <View style={styles.progressWrapper}>
        <SignUpProgressBar step={page + 1} total={totalPages} />
      </View>
    </View>

      {/* 페이지 뷰 */}
      <PagerView
        ref={pagerRef}
        style={styles.pager}
        initialPage={0}
        scrollEnabled={false}
        onPageSelected={e => setPage(e.nativeEvent.position)}
      >
        <View key="gender">
          <GenderScreen
            choosed={gender}
            onPress={value => {
              setGender(value);
            }}
          />
        </View>

        <View key="birthday">
          <BirthdayScreen />
        </View>

        <View key="interset">
          <InterestScreen />
        </View>

        <View key="mbti">
          <MbtiScreen />
        </View>

        <View key="job">
          <JobScreen />
        </View>

        <View key="location">
          <LocationScreen />
        </View>

        <View key="image">
          <ImageScreen />
        </View>

        <View key="introduction">
          <IntroductionScreen
            modalVisible={modalVisible} />
        </View>
      </PagerView>

      <Modal
        isVisible={modalVisible}
        onBackdropPress={() => {}}
        animationIn="fadeInUp"
        animationOut="fadeOutDown"
        style={{ justifyContent: 'center' }}>

        <View style={styles.copiModal}>
          <View style={{alignItems: 'center', gap: 10}}>
            <Image source={require('../../../assets/cupi.png')} style={{width: 110, height: 90}} />
            <Text style={styles.modalTitle}>{messages[messageIndex]}</Text>
            <Text style={styles.modalSubtitle}>AI 어시스턴트 쿠피와 함께 프로필을 써봐요!</Text>
          </View>

          <View style={{justifyContent: 'space-between', gap: 10, marginHorizontal: 24}}>
            <Text style={{fontSize: 16}}>쿠피는 무슨일을 하나요?</Text>
            <Text style={{fontSize: 13, color: '#434343'}}>{'\‘쿠피\’는 회원님이 지금까지 입력한 모든 정보인 성별, 생일, 관심사, mbti, 직업, 지역을 기반으로 프로필 소개글을 대신 작성해줘요.'}</Text>
          </View>
        </View>
      </Modal>

      {/* 하단 버튼  */}
      <View style={[styles.bottomTab, {gap: 10}]}>
        {page > 0 && (
          <>
            <AppButton
              title="이전"
              tintColors={{ true: '#f4f4f4', false: '#B1B1B1' }}
              onPress={goBack}
              isAbled={true}
              buttonStyle={styles.backButton}
              textColor={'#434343'} />

            <AppButton
              title="다음"
              tintColors={{ true: colors.pink, false: '#B1B1B1' }}
              onPress={goNext}
              isAbled={true} />
          </>
        )}
        {page == 0 && (
          <AppButton
            title="다음"
            tintColors={{ true: colors.pink, false: '#B1B1B1' }}
            onPress={goNext}
            isAbled={true}
          />
        )}

      </View>
    </View>
  );
}

export default WriteProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    width: '100%',
    height: 70,
    backgroundColor: 'white',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingTop: 42,
  },
  pager: {
    flex: 1,
  },
  bottomTab: {
    width: '100%',
    height: 126,
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingTop: 20,
    backgroundColor: '#ffffff',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
  },
  backButton: {
    width: 101,
    height: 46,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f4f4',
  },
  copiModal: {
    width: '100%',
    height: 381,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 18,
  },
  modalTitle: {
    fontSize: 19,
    color: '#FF4239'
  },
  modalSubtitle: {
    fontSize: 13,
    color: '#434343'
  },
    progressWrapper: {
      width: '96%',
      alignSelf: 'center',
    },
});
