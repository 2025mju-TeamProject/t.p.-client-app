import React from 'react';
import { Text, View } from 'react-native';
import styles from './writeProfileStyles';

function IntroductionScreen() {
  return (
    <View style={styles.container}>
      <View style={[styles.section, {marginTop: 30}]}>
        <Text style={styles.title}>{'마지막 단계예요.\n프로필 소개글을 써볼까요?'}</Text>
      </View>
      <View style={[styles.section, {marginTop: 5}]}>
        <Text style={styles.subTitle}>회원님을 소개하는 글을 작서앻 주세요.</Text>
      </View>



    </View>
  );
}

export default IntroductionScreen;
