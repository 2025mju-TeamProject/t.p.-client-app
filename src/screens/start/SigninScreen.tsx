import React, { useState } from 'react';
import { Dimensions, StyleSheet, Text, TextInput, View } from 'react-native';
import AppButton from '../../components/buttons/AppButton';

const { width } = Dimensions.get('window');

function SigninScreen() {
  const [id, setId] = useState('');
  const [passwd, setPasswd] = useState('');

  const onIdInput = (value: string) => {
    setId(value);
  };

  const onPasswdInput = (value: string) => {
    setPasswd(value);
  };

  return (
    <View style={styles.container}>
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
          placeholder={'비밀번호 확인(문자, 숫자, 특수문자 포함 8~20자)'}
        ></TextInput>
      </View>

      {/*아래 하단 바*/}
      <View style={styles.bottomTab}>
        <AppButton
          title={'확인'}
          tintColors={{ true: '#F70054', false: '#B1B1B1' }}
          onPress={() => {}}
          isAbled={false}
        />
      </View>
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
});
