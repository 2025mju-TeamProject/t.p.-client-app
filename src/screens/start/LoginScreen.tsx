import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AppButton from '../../components/buttons/AppButton';
import ROUTES from '../../constants/routes';
import { useAuth } from '../../context/AuthContext';
import CheckBox from '@react-native-community/checkbox';
import OneOptionModal from '../../components/modals/OneOptionModal';
import Modal from 'react-native-modal';
import { loginApi, isApiError } from '../../api/auth';
import { saveTokens } from '../../utils/token';
import axios, { AxiosResponse } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

function LoginScreen({ navigation }: any) {
  const { login } = useAuth();
  const [id, setId] = useState<string>('');
  const [passwd, setPasswd] = useState<string>('');
  const [remember, setRemember] = useState(false);
  const [canLogin, setCanLogin] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const ok =
      id.length > 0 &&
      passwd.length > 0

    setCanLogin(ok)
  }, [id, passwd]);

  const handleLogin = async () => {
    try {
      const auth = await loginApi(id, passwd); // ← API 모듈 사용

      if (remember) {
        await saveTokens(auth); // access/refresh 둘 다 저장
      }

      // 전역 auth context 같은 곳에 access 저장
      login(auth.access); // 기존에 쓰던 login 함수 이름이 login이면 이름 충돌 주의

      navigation.reset({
        index: 0,
        routes: [{ name: ROUTES.BOTTOM }],
      });
    } catch (error: unknown) {
      if (isApiError(error)) {
        console.log('로그인 실패 status:', error.response?.status);
        console.log(error.response?.data);
        showModal();
      } else {
        console.log('예상 못 한 에러:', error);
      }
    }
  };

  const onIdInput = (value: string) => {
    setId(value);
  };

  const onPasswdInput = (value: string) => {
    setPasswd(value);
  };

  function navigateToSigninScreen() {
    navigation.navigate(ROUTES.SIGNIN);
  }
  function navigateToHomeScreen() {
    navigation.navigate(ROUTES.BOTTOM);
  }

  function showModal() {
    setIsModalVisible(true);
  }

  function closeModal() {
    setIsModalVisible(false);
  }

  function testLogin() {
    login('Jane Doe');
    navigateToHomeScreen()
    navigation.reset({
      index: 0,
      routes: [{ name: ROUTES.BOTTOM }],
    });
  }

  return (
    <View style={styles.container}>
      <View style={[styles.section, { marginTop: 135 }]}>
        <Text style={[styles.title, { fontFamily: 'SCDream7' }]}>사빠당</Text>
      </View>
      <View style={styles.section}>
        <Text style={[styles.subTitle,
            { fontFamily: 'NanumSquareR', marginBottom: 10 }]}>
            사랑에 빠질 당신을 위한 소개팅</Text>
      </View>

      {/*아이디*/}
      <View
        style={[
          styles.section,
          { marginTop: 73, marginLeft: 1, justifyContent: 'flex-start' },
        ]}
      >
        <Text style={[styles.subTitle,
            { fontFamily: 'NanumSquareB', color: 'black' }]}>아이디</Text>
      </View>

      <View style={[styles.section, { marginTop: 5 }]}>
        <TextInput
          onChangeText={onIdInput}
          value={id}
          style={styles.textInput}
        ></TextInput>
      </View>

      {/*비밀번호*/}
      <View
        style={[
          styles.section,
          { marginTop: 33, marginLeft: 1, justifyContent: 'flex-start' },
        ]}
      >
        <Text style={[styles.subTitle,
            { fontFamily: 'NanumSquareB', color: 'black' }]}>비밀번호</Text>
      </View>

      <View style={[styles.section, { marginTop: 5 }]}>
        <TextInput
          onChangeText={onPasswdInput}
          secureTextEntry={true}
          value={passwd}
          style={styles.textInput}
        ></TextInput>
      </View>

      {/*자동 로그인*/}
      <View style={[styles.section2, { marginTop: 22 }]}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity
            onPress={() => setRemember(!remember)}
            style={[ styles.checkbox,
                { borderColor: remember ? '#111' : '#C7C7C7' },
            ]}>
              {remember && <Icon name="checkmark" size={15} color="#111" />}
          </TouchableOpacity>
          <Text
            style={[ styles.subTitle,
               { color: 'black', fontSize: 12, fontFamily: 'NanumSquareB' },]}
            >
              자동 로그인
            </Text>
          </View>

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={[styles.subTitle, { fontFamily: 'NanumSquareR', color: '#979797' }]}>아이디/비밀번호 찾기</Text>
        </View>
      </View>

      {/*로그인 버튼*/}
      <View style={[styles.section, { marginTop: 39 }]}>
        <AppButton
          title="로그인"
          tintColors={{ true: '#111111', false: '#B1B1B1' }}
          isAbled={canLogin}
          onPress={handleLogin}
        />
      </View>

      {/*회원가입*/}
      <View style={[styles.section, { marginTop: 18, marginBottom: 200 }]}>
        <Text style={[styles.subTitle, { fontFamily:'NanumSquareB', marginRight: 4, color: '#979797' }]}>
          아직 회원이 아니신가요?
        </Text>
        <TouchableOpacity onPress={navigateToSigninScreen}>
          <Text style={[styles.subTitle, { fontFamily:'NanumSquareEB', color: 'black' }]}> 회원가입</Text>
        </TouchableOpacity>
      </View>

      {/*로그인 실패 모달*/}
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setIsModalVisible(false)}
        animationIn="fadeInUp"
        animationOut="fadeOutDown" >
        <OneOptionModal
          title={'로그인 실패'}
          subTitle={'아이디와 비밀번호가 일치하지 않습니다'}
          optionText={'확인'}
          onClick={closeModal} />
      </Modal>
    </View>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#ffffff'
  },
  section: {
    width: width,
    height: 'auto',
    flexWrap: 'wrap',
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  section2: {
    width: width,
    height: 'auto',
    flexWrap: 'wrap',
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 38,
  },
  subTitle: {
    fontSize: 12,
  },
  textInput: {
    width: '100%',
    height: 46,
    borderWidth: 1,
    borderColor: '#111',
    borderRadius: 12,
    paddingHorizontal: 12,
  },
  checkbox: {
    width: 19,
    height: 19,
    borderWidth: 1,
    borderRadius: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
});
