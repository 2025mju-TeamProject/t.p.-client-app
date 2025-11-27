import React, { JSX, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View, Image } from 'react-native';

import styles from './writeProfileStyles';
import Modal from 'react-native-modal';

const cupiRight = '../../../../assets/cupi_wings_right.png';
const cupiLeft = '../../../../assets/cupi_wings_left.png';

type Props = {
  modalVisible: boolean;
}

function IntroductionScreen({ modalVisible }: Props) {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(modalVisible);
    const [introduction, setIntroduction] = useState<string>(`안녕하세요! 요즘은 퇴근 후 조용히 LP 돌리며 하루를 정리하는 걸 좋아하는 감자맛탕이에요. 고양이 두 마리와 함께 살고 있어서 털은 제 패션의 일부라고 생각합니다😺
    MBTI는 INFP지만, 좋아하는 사람 앞에서는 ENFP 버전이 자동 업데이트돼요. 주말엔 캠핑이나 드라이브로 기분 환기하는 걸 즐기고, 평소엔 따뜻한 대화를 나누는 시간이 제일 소중해요.
    조용하지만 유머코드 잘 맞는 사람, 서로의 속도를 존중하며 편안하게 이야기 나눌 수 있는 분이라면 좋은 인연이 될 수 있을 것 같아요!
    우리, 커피 한 잔처럼 부담 없이 대화부터 시작해볼까요?`);

    return (
      <View style={styles.container}>

        {/* 여기 ScrollView 추가!! */}
        <ScrollView style={{marginTop: 34}}>

          <View style={[styles.section, ]}>
            <Text style={styles.title}>{'마지막 단계예요.\n프로필 소개글을 써볼까요?'}</Text>
          </View>

          <View style={[styles.section, {marginTop: 5}]}>
            <Text style={styles.subTitle}>회원님을 소개하는 글을 작성해 주세요.</Text>
          </View>

          {/* AI 어시스턴트 쿠피 소개글 - 타이틀 */}
          <View style={[styles.section, {
              flexDirection: 'row', alignItems: 'center', gap: 3, marginTop:32 }]}>
            <Image
            source={require(cupiLeft)}
            style={{ width: 20, height: 20, resizeMode: 'contain' }}
            />
            <Text
              style={[
                styles.boldText,
                { fontSize: 16, color: '#FB222D', letterSpacing: -0.3 }
              ]}
            >
              AI 어시스턴스 쿠피를 소개합니다
            </Text>
            <Image
              source={require(cupiRight)}
              style={{ width: 20, height: 20, resizeMode: 'contain' }}
            />
          </View>

          {/* AI 어시스턴트 쿠피 소개글 - 설명 */}
          <View style={[styles.section, { marginTop: 10 }]}>
            <Text style={[styles.text13, { lineHeight: 20, color: '#515151', letterSpacing: -0.3 }]}>
              <Text style={{ fontFamily: 'NanumSquareB' }}>쿠피</Text>는 회원님이 지금까지 입력한 모든 정보인
              '성별, 생일, 관심사, MBTI, 직업, 지역'을 참고해서 프로필 소개글을 작성해주는{' '}
              <Text style={{ fontFamily: 'NanumSquareB' }}>
                AI 어시스턴트
              </Text>
              예요.
            </Text>
          </View>

          <View style={[styles.section, { marginTop: 30 }]}>
            <Text style={[styles.boldTextBB, { letterSpacing: -0.3 }]}>
              쿠피가 프로필 글을 작성해 봤어요
            </Text>
          </View>

          <View style={[styles.section, {marginTop: 16, marginBottom: 30}]}>
            <TextInput
              style={localStyles.textInput}
              multiline
              value={introduction}
              onChangeText={setIntroduction}
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
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: '#EDEDED',
    borderRadius: 18,
    fontSize: 14,
    lineHeight: 24,
    textAlign: 'left',
    textAlignVertical: 'top',
  },
})
