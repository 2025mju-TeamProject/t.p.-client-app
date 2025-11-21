import React, { JSX, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import styles from './writeProfileStyles';
import Modal from 'react-native-modal';

type Props = {
  modalVisible: boolean;
}

function IntroductionScreen({ modalVisible }: Props) {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(modalVisible);
  const [introduction, setIntroduction] = useState<string>(
    ' 안녕하세요, 감자맛탕입니다. 고양이 \n' +
      '털에 묻은 그래픽 디자이너이며, \n' +
      "주말엔 캠핑을 즐기는 '갑술' 여자입니다. 갑술의 성향처럼 편안한 사람들과 어울리는 것을 좋아해요. LP판을 들으며 마시는 커피 한 잔의 여유를 아는 그런… 가끔은 말수가 적어도 이해해주실 수 있나요? 그렇다면, 긍정적이고 따뜻한 세상을 함께 만들어가요. 유머가 조금 섞인, 친근한 대화로 시작해볼까요?",
  );

  return (
    <View style={styles.container}>
      <View style={[styles.section, {marginTop: 30}]}>
        <Text style={styles.title}>{'마지막 단계예요.\n프로필 소개글을 써볼까요?'}</Text>
      </View>
      <View style={[styles.section, {marginTop: 5}]}>
        <Text style={styles.subTitle}>회원님을 소개하는 글을 작성해 주세요.</Text>
      </View>

      <ScrollView style={{marginTop: 30}}>
        <View style={styles.section}>
          <Text style={[styles.boldText, {fontSize: 16, color: '#FF4239'}]}>AI 어시스턴스 쿠피를 소개합니다!</Text>
        </View>
        <View style={[styles.section, {marginTop: 10}]}>
          <Text style={styles.text}>{'\\‘쿠피\\’는 회원님이 지금까지 입력한 모든 정보인 성별, 생일, 관심사, MBTI, 직업, 지역을 기반으로 프로필 소개글을 작성해주는 AI 어시스턴트예요.'}</Text>
        </View>
        <View style={[styles.section, {marginTop: 10}]}>
          <Text style={{fontSize: 14, fontWeight: 700,}}>쿠피가 회원님의 프로필 글을 작성해 봤어요!</Text>
        </View>

        <View style={[styles.section, {marginTop: 10, marginBottom: 30}]}>
          <TextInput
            style={localStyles.textInput}
            multiline
            value={introduction}
            onChangeText={setIntroduction}
            scrollEnabled={false} />
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
})
