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
import CheckBox from '@react-native-community/checkbox';
import Modal from 'react-native-modal';
import strings from '../../constants/strings';
import Icon from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');
const termTexts = [
  'None',
  strings.term2,
  strings.term3,
] as const;

const termTitle = [
  'None',
  '서비스 이용 약관 동의',
  '개인정보 처리방침 동의'
] as const;

function SigninScreen({ navigation }: any) {
  const [id, setId] = useState('');
  const [passwd, setPasswd] = useState('');
  const [checkPasswd, setCheckPasswd] = useState('');
  const [phone, setPhone] = useState('');
  const [term1, setTerm1] = useState(false);
  const [term2, setTerm2] = useState(false);
  const [term3, setTerm3] = useState(false);
  const [termIndex, setTermIndex] = useState(1);
  const [next, setNext] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  useEffect(() => {
    const ok =
      id.length > 0 &&
      passwd.length > 0 &&
      checkPasswd.length > 0 &&
      phone.length > 0 &&
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

  function trySignin() {
    //todo 회원가입 api 연결
    navigation.navigate('WriteProfile');

  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={[styles.section, { marginTop: 104 }]}>
          <Text style={[styles.title]}>회원가입</Text>
        </View>
        <View style={styles.section}>
          <Text style={[styles.subTitle]}>사랑에 빠지실 준비가 되었나요?</Text>
        </View>

        {/*아이디*/}
        <View
          style={[
            styles.section,
            { marginTop: 33, marginLeft: 1, justifyContent: 'flex-start' },
          ]}
        >
          <Text style={[styles.subTitle, { color: 'black' }]}>아이디</Text>
        </View>

        <View style={[styles.section, { marginTop: 5 }]}>
          <TextInput
            onChangeText={onIdInput}
            value={id}
            style={styles.textInput}
            placeholder={'아이디 입력(6~20자 영어 소문자, 숫자)'}
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
            placeholder={'비밀번호 입력(문자, 숫자, 특수문자 포함 8~20자)'}
          />
        </View>

        {/*비밀번호 확인*/}
        <View
          style={[
            styles.section,
            { marginTop: 33, marginLeft: 1, justifyContent: 'flex-start' },
          ]}
        >
          <Text style={[styles.subTitle, { color: 'black' }]}>
            비밀번호 확인
          </Text>
        </View>

        <View style={[styles.section, { marginTop: 5 }]}>
          <TextInput
            onChangeText={onCheckPasswdInput}
            secureTextEntry={true}
            value={checkPasswd}
            style={styles.textInput}
            placeholder={'비밀번호 확인(문자, 숫자, 특수문자 포함 8~20자)'}
          />
        </View>

        {/*휴대폰 번호*/}
        <View
          style={[
            styles.section,
            { marginTop: 33, marginLeft: 1, justifyContent: 'flex-start' },
          ]}
        >
          <Text style={[styles.subTitle, { color: 'black' }]}>휴대폰 번호</Text>
        </View>

        <View style={[styles.section, { marginTop: 5 }]}>
          <TextInput
            onChangeText={onPhoneInput}
            inputMode="tel"
            value={phone}
            style={styles.textInput}
            placeholder={"'-' 없이 숫자만 입력"}
          />
        </View>

        {/*약관*/}
        <View style={[styles.section, { marginTop: 33 }]}>
          <CheckBox
            value={term1}
            onValueChange={newValue => onTerm1Input(newValue)}
            tintColors={{ true: 'black', false: '#AAA' }}
          />
          <Text style={[styles.subTitle, { color: 'black' }]}>
            (필수) 만 19세 이상입니다.
          </Text>
        </View>

        <View style={[styles.section, { marginTop: 5 }]}>
          <CheckBox
            value={term2}
            onValueChange={newValue => onTerm2Input(newValue)}
            tintColors={{ true: 'black', false: '#AAA' }}
          />
          <Text style={[styles.subTitle, { color: 'black' }]}>
            (필수) 서비스 이용 약관 동의
          </Text>
          <TouchableOpacity onPress={() => showTerm(1)}>
            <Text style={[styles.subTitle, { marginLeft: 5, color: 'red' }]}>
              [보기]
            </Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.section, { marginTop: 5, marginBottom: 5 }]}>
          <CheckBox
            value={term3}
            onValueChange={newValue => onTerm3Input(newValue)}
            tintColors={{ true: 'black', false: '#AAA' }}
          />
          <Text style={[styles.subTitle, { color: 'black' }]}>
            (필수) 개인정보 처리방침 동의
          </Text>
          <TouchableOpacity onPress={() => showTerm(2)}>
            <Text style={[styles.subTitle, { marginLeft: 5, color: 'red' }]}>
              [보기]
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/*아래 하단 바*/}
      <View style={styles.bottomTab}>
        <AppButton
          title={'확인'}
          tintColors={{ true: colors.pink, false: '#B1B1B1' }}
          onPress={trySignin}
          //isAbled={next}
          isAbled={true}
        />
      </View>

      {/*모달*/}
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}
        animationIn="fadeInUp"
        animationOut="fadeOutDown"
        style={{ paddingVertical: 70 }} >

        <View style={styles.modalContainer}>
          <View style={styles.modalHead}>
            <Text style={styles.modalTitle}>{termTitle[termIndex]}</Text>
            <TouchableOpacity onPress={() => setModalVisible(false)} style={{marginLeft: 'auto'}}>
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
    height: 'auto',
    flexWrap: 'wrap',
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
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
    paddingHorizontal: 15,
  },
  bottomTab: {
    width: '100%',
    height: 126,
    flexDirection: 'column',
    paddingHorizontal: 24,
    paddingTop: 20,
    alignSelf: 'flex-end',
    marginTop: 'auto',
    backgroundColor: '#ffffff',
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
});
