import React, { JSX, useEffect, useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import styles from './writeProfileStyles';

type Props = {
  text: string;
  onChangeText: (text: string) => void;
};

function IntroductionScreen({ text, onChangeText }: Props) {
  const [introduction, setIntroduction] = useState<string>(text);

  useEffect(() => {
    setIntroduction(text);
  }, [text]);

  return (
    <View style={styles.container}>
      <View style={[styles.section, { marginTop: 30 }]}>
        <Text style={styles.title}>
          {'마지막 단계예요.\n프로필 소개글을 써볼까요?'}
        </Text>
      </View>
      <View style={[styles.section, { marginTop: 5 }]}>
        <Text style={styles.subTitle}>
          회원님을 소개하는 글을 작성해 주세요.
        </Text>
      </View>

      <ScrollView style={{ marginTop: 30 }}>
        <View style={styles.section}>
          <Text style={[styles.boldText, { fontSize: 16, color: '#FF4239' }]}>
            AI 어시스턴스 쿠피를 소개합니다!
          </Text>
        </View>
        <View style={[styles.section, { marginTop: 10 }]}>
          <Text style={styles.text}>
            {
              '‘쿠피’는 회원님이 지금까지 입력한 모든 정보인 성별, 생일, 관심사, MBTI, 직업, 지역을 기반으로 프로필 소개글을 작성해주는 AI 어시스턴트예요.'
            }
          </Text>
        </View>
        <View style={[styles.section, { marginTop: 10 }]}>
          <Text style={{ fontSize: 14, fontWeight: 700 }}>
            쿠피가 회원님의 프로필 글을 작성해 봤어요!
          </Text>
        </View>

        <View style={[styles.section, { marginTop: 10, marginBottom: 30 }]}>
          <TextInput
            style={localStyles.textInput}
            multiline
            value={introduction}
            onChangeText={value => {
              setIntroduction(value);   // 로컬 업데이트
              onChangeText(value);      // 부모에게도 바로 반영
            }}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>
    </View>
  );
}

export default IntroductionScreen;

const localStyles = StyleSheet.create({
  textInput: {
    width: '100%',
    height: 262,
    maxHeight: 'auto',
    paddingHorizontal: 24,
    paddingVertical: 24,
    borderWidth: 1,
    borderColor: '#EDEDED',
    borderRadius: 10,
    fontSize: 14,
    lineHeight: 24,
    textAlign: 'left',
    textAlignVertical: 'top',
  },
});
