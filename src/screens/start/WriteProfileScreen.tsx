import React, { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
} from 'react-native';
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
import apiClient from '../../services/apiClient';
import axios from 'axios';

const messages = [
  '쿠피가 프로필 작성 중',
  '쿠피가 프로필 작성 중.',
  '쿠피가 프로필 작성 중..',
  '쿠피가 프로필 작성 중...',
];

type profile = {
  nickname: string;
  gender: string;
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  birth_time_unknown: boolean;
  location_city: string;
  location_district: string;
  job: string;
  mbti: string;
  hobbies: string[];
  images: ImageSourcePropType[];
};

function WriteProfileScreen({ navigation }: any) {
  const pagerRef = useRef<PagerView>(null);
  const [page, setPage] = useState<number>(0);
  const [profile, setProfile] = useState<profile>({
    nickname: '',
    gender: '',
    year: 0,
    month: 0,
    day: 0,
    hour: 0,
    minute: 0,
    birth_time_unknown: false,
    location_city: '',
    location_district: '',
    job: '',
    mbti: '',
    hobbies: [],
    images: [
      require('../../../assets/sample-profile2.jpg'),
      require('../../../assets/sample-profile2.jpg'),
      require('../../../assets/sample-profile2.jpg'),
    ],
  });
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [messageIndex, setMessageIndex] = useState<number>(0);
  const [profileText, setProfileText] = useState<string>('');

  const totalPages = 8;

  function goNext() {
    if (!pagerRef.current) return;
    if (page > totalPages - 1) return;
    if (page === totalPages - 2) {
      getIntroduction();
    }
    if (page === totalPages - 1) {
    }

    pagerRef.current.setPage(page + 1);
  }

  function goBack() {
    if (!pagerRef.current) return;
    if (page <= 0) return;

    pagerRef.current.setPage(page - 1);
  }

  async function getIntroduction() {
    const api = apiClient;
    let response;
    try {
      setModalVisible(true);

      const accessToken = await api.post('/api/login/', {
        username: 'ryan098761',
        password: 'sehoon2004!',
      });
      const formData = new FormData();

      const { images, ...profileWithoutImages } = profile;
      formData.append('nickname', (profile.nickname));
      formData.append('gender', (profile.gender));

      formData.append('year', String(profile.year));
      formData.append('month', String(profile.month));
      formData.append('day', String(profile.day));
      formData.append('hour', String(profile.hour));
      formData.append('minute', String(profile.minute));

      formData.append('birth_time_unknown', (profile.birth_time_unknown ? 'true' : 'false'));
      formData.append('location_city', (profile.location_city));
      formData.append('location_district', (profile.location_district));
      formData.append('job', (profile.job));
      formData.append('hobbies', JSON.stringify(profile.hobbies));

      profile.images.forEach((img, index) => {
        const asset = Image.resolveAssetSource(img);
        formData.append('images', {
          uri: asset.uri,
          type: 'image/jpeg',
          name: `profile_${index}.jpg`,
        } as any);
      });

      console.log('formdata', formData);
      response = await api.post('/api/profile/', formData, {
        headers: {
          Authorization: `Bearer ${accessToken.data.access}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      setProfileText(response.data.profile_text);

    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        console.log('프로필 작성 실패:', error.response?.status);
      } else {
        console.log('예상 못 한 에러:', error);
      }
    } finally {
      setModalVisible(false);
    }
  }

  useEffect(() => {
    if (!modalVisible) return;
    const interval = setInterval(() => {
      setMessageIndex(prev => (prev + 1) % messages.length);
    }, 1000);

    return () => clearInterval(interval);
  }, [modalVisible]);

  function isNextEnabled() {
    switch (page) {
      case 0:
        return profile.gender !== '' && profile.nickname !== '';

      case 1:
        const hasDate =
          profile.year !== 0 &&
          profile.month !== 0 &&
          profile.day !== 0;

        const hasTime =
          profile.birth_time_unknown
            ? true
            : profile.hour !== 0 && profile.minute !== 0;

        return hasDate && hasTime;

      case 2:
        return profile.hobbies.length >= 3 && profile.hobbies.length <= 8;

      case 3:
        return profile.mbti !== '';

      case 4:
        return profile.job !== '';

      case 5:
        return (
          profile.location_city !== '' &&
          profile.location_district !== ''
        );

      default:
        return true;
    }
  }

  async function handleLogin() {
    if (page === totalPages - 1) {
      setModalVisible(true);

      setModalVisible(false);

      navigation.reset({
        index: 0,
        routes: [{ name: ROUTES.LOGIN }],
      });
    }
  }

  return (
    <View style={styles.container}>
      {/* 헤더 */}
      <View style={styles.header}></View>

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
            setParentGender={value => {
              setProfile(prev => ({ ...prev, gender: value }));
            }}
            setParentNickname={value => {
              setProfile(prev => ({ ...prev, nickname: value }));
            }}
          />
        </View>

        <View key="birthday">
          <BirthdayScreen
            setParentYear={value => {
              setProfile(prev => ({ ...prev, year: value }));
            }}
            setParentMonth={value => {
              setProfile(prev => ({ ...prev, month: value }));
            }}
            setParentDay={value => {
              setProfile(prev => ({ ...prev, day: value }));
            }}
            setParentHour={value => {
              setProfile(prev => ({ ...prev, hour: value }));
            }}
            setParentMinute={value => {
              setProfile(prev => ({ ...prev, minute: value }));
            }}
            setParentNotime={value => {
              setProfile(prev => ({ ...prev, birth_time_unknown: value }));
            }}
          />
        </View>

        <View key="interset">
          <InterestScreen
            setParentHobbies={value => {
              setProfile(prev => ({ ...prev, hobbies: value }));
            }}
          />
        </View>

        <View key="mbti">
          <MbtiScreen
            setParentMbti={value => {
              setProfile(prev => ({ ...prev, mbti: value }));
            }}
          />
        </View>

        <View key="job">
          <JobScreen
            setParentJob={value => {
              setProfile(prev => ({ ...prev, job: value }));
            }}
          />
        </View>

        <View key="location">
          <LocationScreen
            setParentSido={value => {
              setProfile(prev => ({ ...prev, location_city: value }));
            }}
            setParentGungu={value => {
              setProfile(prev => ({ ...prev, location_district: value }));
            }}
          />
        </View>

        <View key="image">
          <ImageScreen />
        </View>

        <View key="introduction">
          <IntroductionScreen text={profileText} onChangeText={setProfileText} />
        </View>
      </PagerView>

      <Modal
        isVisible={modalVisible}
        onBackdropPress={() => {}}
        animationIn="fadeInUp"
        animationOut="fadeOutDown"
        style={{ justifyContent: 'center' }}
      >
        <View style={styles.copiModal}>
          <View style={{ alignItems: 'center', gap: 10 }}>
            <Image
              source={require('../../../assets/cupi.png')}
              style={{ width: 110, height: 90 }}
            />
            <Text style={styles.modalTitle}>{messages[messageIndex]}</Text>
            <Text style={styles.modalSubtitle}>
              AI 어시스턴트 쿠피와 함께 프로필을 써봐요!
            </Text>
          </View>

          <View
            style={{
              justifyContent: 'space-between',
              gap: 10,
              marginHorizontal: 24,
            }}
          >
            <Text style={{ fontSize: 16 }}>쿠피는 무슨일을 하나요?</Text>
            <Text style={{ fontSize: 13, color: '#434343' }}>
              {
                '‘쿠피’는 회원님이 지금까지 입력한 모든 정보인 성별, 생일, 관심사, mbti, 직업, 지역을 기반으로 프로필 소개글을 대신 작성해줘요.'
              }
            </Text>
          </View>
        </View>
      </Modal>

      {/* 하단 버튼  */}
      <View style={[styles.bottomTab, { gap: 10 }]}>
        {page > 0 && (
          <>
            <AppButton
              title="이전"
              tintColors={{ true: '#f4f4f4', false: '#B1B1B1' }}
              onPress={goBack}
              isAbled={true}
              buttonStyle={styles.backButton}
              textColor={'#434343'}
            />

            <AppButton
              title="다음"
              tintColors={{ true: colors.pink, false: '#B1B1B1' }}
              onPress={goNext}
              isAbled={isNextEnabled()}
            />
          </>
        )}
        {page == 0 && (
          <AppButton
            title="다음"
            tintColors={{ true: colors.pink, false: '#B1B1B1' }}
            onPress={goNext}
            isAbled={isNextEnabled()}
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
    color: '#FF4239',
  },
  modalSubtitle: {
    fontSize: 13,
    color: '#434343',
  },
});
