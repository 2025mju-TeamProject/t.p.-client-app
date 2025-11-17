import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import AppButton from '../../components/buttons/AppButton';
import ROUTES from '../../constants/routes';
import { useAuth } from '../../context/AuthContext';
import CheckBox from '@react-native-community/checkbox';
import OneOptionModal from '../../components/modals/OneOptionModal';
import Modal from 'react-native-modal';

const { width } = Dimensions.get('window');

function LoginScreen({ navigation }: any) {
  const { login } = useAuth();
  const [id, setId] = useState('');
  const [passwd, setPasswd] = useState('');
  const [remember, setRemember] = useState(false);
  const [canLogin, setCanLogin] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const ok =
      id.length > 0 &&
      passwd.length > 0

    setCanLogin(ok)
  }, [id, passwd]);

  const handleLogin = () => {
    //Todo 로그인 api 연결
    if (id != '0000') {
      setIsModalVisible(true);
      return;
    }

    login('Jane Doe');
    //navigateToHomeScreen()
    navigation.reset({
      index: 0,
      routes: [{ name: ROUTES.BOTTOM }],
    });
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
        <Text style={styles.title}>사빠당</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.subTitle}>사랑에 빠질 당신</Text>
      </View>

      {/*아이디*/}
      <View
        style={[
          styles.section,
          { marginTop: 73, marginLeft: 1, justifyContent: 'flex-start' },
        ]}
      >
        <Text style={[styles.subTitle, { color: 'black' }]}>아이디</Text>
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
        <Text style={[styles.subTitle, { color: 'black' }]}>비밀번호</Text>
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
          <CheckBox
            value={remember}
            onValueChange={newValue => setRemember(newValue)}
            tintColors={{ true: 'black', false: '#AAA' }}
          />
          <Text style={{ fontSize: 12, fontWeight: 'bold' }}>자동 로그인</Text>
        </View>

        {/*Todo 테스트용 나중에 view로 바꿀것*/}
        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={testLogin}>
          <Text style={styles.subTitle}>아이디/비밀번호 찾기</Text>
        </TouchableOpacity>
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
      <View style={[styles.section, { marginTop: 18 }]}>
        <Text style={[styles.subTitle, { marginRight: 4 }]}>
          아직 회원이 아니신가요?
        </Text>
        <TouchableOpacity onPress={navigateToSigninScreen}>
          <Text style={[styles.subTitle, { color: 'black' }]}>회원가입</Text>
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
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#9c9c9c',
  },
  textInput: {
    width: '100%',
    height: 46,
    borderWidth: 2,
    borderColor: '#e3e3e3',
    borderRadius: 12,
  },
  checkBox: {
    width: 14,
    height: 14,
    borderWidth: 1,
    borderColor: 'black',
  },
});
