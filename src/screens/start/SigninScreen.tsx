import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import AppButton from '../../components/buttons/AppButton';
import colors from '../../constants/colors';
import Modal from 'react-native-modal';
import strings from '../../constants/strings';
import Icon from 'react-native-vector-icons/Ionicons';
import { loginApi, registerApi, isApiError } from '../../api/auth';
import { saveTokens } from '../../utils/localTokens';

import {
  validateId,
  validatePassword,
  validateCheckPassword,
  validatePhone,
} from '../../utils/validation';
import ROUTES from '../../constants/routes';
import { useLoading } from '../../context/LoadingContext';
import { useNetInfoContext } from '../../context/NetInfoContext';

const { width } = Dimensions.get('window');

const termTexts = ['None', strings.term2, strings.term3] as const;

const termTitle = [
  'None',
  '서비스 이용 약관 동의',
  '개인정보 처리방침 동의',
] as const;

const idWarnText = [
  'None',
  '아이디는 6~20자 영어 소문자, 숫자만 가능합니다.',
  '이미 등록된 아이디입니다.',
];

function SigninScreen({ navigation }: any) {
  const { showLoading, hideLoading } = useLoading();
  const { isConnected } = useNetInfoContext();

  const [id, setId] = useState('');
  const [passwd, setPasswd] = useState('');
  const [checkPasswd, setCheckPasswd] = useState('');
  const [phone, setPhone] = useState('');
  const [isCheckPasswd, setIsCheckPasswd] = useState<boolean>(true);
  const [isId, setIsId] = useState<boolean>(true);
  const [isPasswd, setIsPasswd] = useState<boolean>(true);
  const [isPhone, setIsPhone] = useState<boolean>(true);
  const [idTextIndex, setIdTextIndex] = useState<number>(0);

  const [term1, setTerm1] = useState<boolean>(false);
  const [term2, setTerm2] = useState<boolean>(false);
  const [term3, setTerm3] = useState<boolean>(false);

  const [termIndex, setTermIndex] = useState(1);
  const [next, setNext] = useState<boolean>(false);
  const [isModalVisible, setModalVisible] = useState<boolean>(false);

  useEffect(() => {
    const ok =
      id.length >= 6 &&
      id.length <= 20 &&
      passwd.length >= 8 &&
      passwd.length <= 20 &&
      checkPasswd.length > 8 &&
      checkPasswd.length <= 20 &&
      phone.length == 11 &&
      term1 &&
      term2 &&
      term3;

    setNext(ok);
  }, [id, passwd, checkPasswd, phone, term1, term2, term3]);

  function onIdInput(value: string) {
    setId(value);
  }

  function onPasswdInput(value: string) {
    setPasswd(value);
  }

  function onCheckPasswdInput(value: string) {
    setCheckPasswd(value);
  }

  function onPhoneInput(value: string) {
    setPhone(value);
  }

  function onTerm1Input(value: boolean) {
    setTerm1(value);
  }

  function onTerm2Input(value: boolean) {
    setTerm2(value);
  }

  function onTerm3Input(value: boolean) {
    setTerm3(value);
  }

  function showTerm(value: number) {
    setTermIndex(value);
    setModalVisible(true);
  }

  async function trySignin() {
    const isValidId = validateId(id);
    const isValidPasswd = validatePassword(passwd);
    const isValidCheckPasswd = validateCheckPassword(passwd, checkPasswd);
    const isValidPhone = validatePhone(phone);

    setIsId(isValidId);
    setIsPasswd(isValidPasswd);
    setIsCheckPasswd(isValidCheckPasswd);
    setIsPhone(isValidPhone);

    if (!isValidId) {
      setIdTextIndex(1);
    }

    if (!isValidId || !isValidPasswd || !isValidCheckPasswd || !isValidPhone) {
      return;
    }

    if(!isConnected) {
      return;
    }

    showLoading();
    try {
      await registerApi({
        username: id,
        password: passwd,
        password_verify: checkPasswd,
        phone_number: phone,
      });

      const auth = await loginApi(id, passwd);

      await saveTokens(auth);

      navigation.reset({
        index: 0,
        routes: [{ name: ROUTES.WRITEPROFFILE }],
      });
    } catch (error: unknown) {
      if (isApiError(error)) {
        console.log('회원가입 실패 status:', error.response?.status);
        if (error.response?.status === 400) {
          const data = error.response?.data;

          if (data?.username) {
            setIdTextIndex(2);
            setIsId(false);
          }

          if (data?.phone_number) {
            setIsPhone(false);
          }
        }
      } else {
        console.log('예상 못 한 에러:', error);
      }
    } finally {
      hideLoading();
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={[styles.section, { marginTop: 70 }]}>
          <Text style={[styles.title, { fontFamily: 'SCDream7' }]}>
            회원가입
          </Text>
        </View>

        <View style={styles.section}>
          <Text
            style={[
              styles.subTitle,
              { fontFamily: 'NanumSquareR', marginBottom: 10 },
            ]}
          >
            사랑에 빠질 준비가 되었나요?
          </Text>
        </View>

        {/* 아이디 */}
        <View
          style={[
            styles.section,
            { marginTop: 20, marginLeft: 1, justifyContent: 'flex-start' },
          ]}
        >
          <Text
            style={[
              styles.subTitle,
              { fontFamily: 'NanumSquareB', color: 'black' },
            ]}
          >
            아이디
          </Text>
        </View>

        <View style={[styles.section, { marginTop: 5 }]}>
          <TextInput
            onChangeText={onIdInput}
            value={id}
            placeholder="아이디 입력(6~20자 영어 소문자, 숫자)"
            style={[
              styles.textInput,
              { fontFamily: 'NanumSquareR', fontSize: 12 },
            ]}
            placeholderTextColor="#979797"
          />
        </View>

        <View style={[styles.section, { marginTop: 2 }]}>
          <Icon
            name={'alert-circle-outline'}
            size={15}
            color={isId ? 'white' : '#FF0C00'}
          />
          <Text
            style={[styles.warningText, { color: isId ? 'white' : '#FF0C00' }]}
          >
            {idWarnText[idTextIndex]}
          </Text>
        </View>

        {/* 비밀번호 */}
        <View
          style={[
            styles.section,
            { marginTop: 12, marginLeft: 1, justifyContent: 'flex-start' },
          ]}
        >
          <Text
            style={[
              styles.subTitle,
              { fontFamily: 'NanumSquareB', color: 'black' },
            ]}
          >
            비밀번호
          </Text>
        </View>

        <View style={[styles.section, { marginTop: 5 }]}>
          <TextInput
            onChangeText={onPasswdInput}
            secureTextEntry
            value={passwd}
            style={[
              styles.textInput,
              { fontFamily: 'NanumSquareR', fontSize: 12 },
            ]}
            placeholder="비밀번호 입력(문자, 숫자, 특수문자 포함 8~20자)"
            placeholderTextColor="#979797"
          />
        </View>

        <View style={[styles.section, { marginTop: 2 }]}>
          <Icon
            name={'alert-circle-outline'}
            size={15}
            color={isPasswd ? 'white' : '#FF0C00'}
          />
          <Text
            style={[
              styles.warningText,
              { color: isPasswd ? 'white' : '#FF0C00' },
            ]}
          >
            비밀번호는 문자, 숫자, 특수문자 포함 8~20자만 가능합니다.
          </Text>
        </View>

        {/* 비밀번호 확인 */}
        <View
          style={[
            styles.section,
            { marginTop: 12, marginLeft: 1, justifyContent: 'flex-start' },
          ]}
        >
          <Text
            style={[
              styles.subTitle,
              { fontFamily: 'NanumSquareB', color: 'black' },
            ]}
          >
            비밀번호 확인
          </Text>
        </View>

        <View style={[styles.section, { marginTop: 5 }]}>
          <TextInput
            onChangeText={onCheckPasswdInput}
            secureTextEntry
            value={checkPasswd}
            style={[
              styles.textInput,
              { fontFamily: 'NanumSquareR', fontSize: 12 },
            ]}
            placeholder="비밀번호 확인(문자, 숫자, 특수문자 포함 8~20자)"
            placeholderTextColor="#979797"
          />
        </View>

        <View style={[styles.section, { marginTop: 2 }]}>
          <Icon
            name={'alert-circle-outline'}
            size={15}
            color={isCheckPasswd ? 'white' : '#FF0C00'}
          />
          <Text
            style={[
              styles.warningText,
              { color: isCheckPasswd ? 'white' : '#FF0C00' },
            ]}
          >
            비밀번호가 일치하지 않습니다
          </Text>
        </View>

        {/* 휴대폰 */}
        <View
          style={[
            styles.section,
            { marginTop: 12, marginLeft: 1, justifyContent: 'flex-start' },
          ]}
        >
          <Text
            style={[
              styles.subTitle,
              { fontFamily: 'NanumSquareB', color: 'black' },
            ]}
          >
            휴대폰 번호
          </Text>
        </View>

        <View style={[styles.section, { marginTop: 5 }]}>
          <TextInput
            onChangeText={onPhoneInput}
            inputMode="tel"
            value={phone}
            style={[
              styles.textInput,
              { fontFamily: 'NanumSquareR', fontSize: 12 },
            ]}
            placeholder="'-' 없이 숫자만 입력"
            placeholderTextColor="#979797"
          />
        </View>

        <View style={[styles.section, { marginTop: 2 }]}>
          <Icon
            name={'alert-circle-outline'}
            size={15}
            color={isPhone ? 'white' : '#FF0C00'}
          />
          <Text
            style={[
              styles.warningText,
              { color: isPhone ? 'white' : '#FF0C00' },
            ]}
          >
            '-'없이 11자리 숫자만 입력해 주세요.
          </Text>
        </View>

        {/* 약관 */}
        <View style={[styles.section, { marginTop: 12 }]}>
          <TouchableOpacity
            onPress={() => onTerm1Input(!term1)}
            style={[
              styles.checkbox,
              { borderColor: term1 ? '#111' : '#C7C7C7' },
            ]}
          >
            {term1 && <Icon name="checkmark" size={16} color="#111" />}
          </TouchableOpacity>

          <Text
            style={[
              styles.subTitle,
              { color: 'black', fontSize: 13, fontFamily: 'NanumSquareB' },
            ]}
          >
            (필수) 만 19세 이상입니다.
          </Text>
        </View>

        <View style={[styles.section, { marginTop: 20 }]}>
          <TouchableOpacity
            onPress={() => onTerm2Input(!term2)}
            style={[
              styles.checkbox,
              { borderColor: term2 ? '#111' : '#C7C7C7' },
            ]}
          >
            {term2 && <Icon name="checkmark" size={16} color="#111" />}
          </TouchableOpacity>

          <Text
            style={[
              styles.subTitle,
              { color: 'black', fontSize: 13, fontFamily: 'NanumSquareB' },
            ]}
          >
            (필수) 서비스 이용 약관 동의
          </Text>

          <TouchableOpacity onPress={() => showTerm(1)}>
            <Text
              style={[
                styles.subTitle,
                {
                  marginLeft: 5,
                  color: 'red',
                  fontSize: 13,
                  fontFamily: 'NanumSquareB',
                },
              ]}
            >
              [보기]
            </Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.section, { marginTop: 20, marginBottom: 26 }]}>
          <TouchableOpacity
            onPress={() => onTerm3Input(!term3)}
            style={[
              styles.checkbox,
              { borderColor: term3 ? '#111' : '#C7C7C7' },
            ]}
          >
            {term3 && <Icon name="checkmark" size={16} color="#111" />}
          </TouchableOpacity>

          <Text
            style={[
              styles.subTitle,
              { color: 'black', fontSize: 13, fontFamily: 'NanumSquareB' },
            ]}
          >
            (필수) 개인정보 처리방침 동의
          </Text>

          <TouchableOpacity onPress={() => showTerm(2)}>
            <Text
              style={[
                styles.subTitle,
                {
                  marginLeft: 5,
                  color: 'red',
                  fontSize: 13,
                  fontFamily: 'NanumSquareB',
                },
              ]}
            >
              [보기]
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* 하단 확정 버튼 */}
      <View style={styles.bottomTab}>
        <View style={{ height: 46 }}>
          <AppButton
            title={'확인'}
            tintColors={{ true: colors.pink, false: '#B1B1B1' }}
            onPress={trySignin}
            isAbled={next}
          />
        </View>
      </View>

      {/* 모달 */}
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}
        animationIn="fadeInUp"
        animationOut="fadeOutDown"
        style={{ paddingVertical: 70 }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHead}>
            <Text style={styles.modalTitle}>{termTitle[termIndex]}</Text>

            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={{ marginLeft: 'auto' }}
            >
              <Icon name={'close'} size={25} />
            </TouchableOpacity>
          </View>

          <ScrollView>
            <Text>{termTexts[termIndex]}</Text>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
}

export default SigninScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  section: {
    width: width,
    flexWrap: 'wrap',
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
  },
  subTitle: {
    fontSize: 12,
    color: '#979797',
  },
  textInput: {
    width: '100%',
    height: 46,
    borderWidth: 1,
    borderColor: '#111',
    borderRadius: 12,
    paddingHorizontal: 15,
  },
  warningText: {
    fontSize: 12,
    fontFamily: 'NanumSquareOTF',
    color: '#FF0C00',
    marginLeft: 3,
  },
  bottomTab: {
    width: '100%',
    height: 126,
    flexDirection: 'column',
    paddingHorizontal: 24,
    paddingTop: 20,
    alignSelf: 'flex-end',
    marginTop: 'auto',
    backgroundColor: '#fff',
    shadowColor: 'black',
    shadowOffset: { width: 20, height: 20 },
    elevation: 10,
  },
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalHead: {
    width: '100%',
    flexDirection: 'row',
    marginBottom: 15,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 16,
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
