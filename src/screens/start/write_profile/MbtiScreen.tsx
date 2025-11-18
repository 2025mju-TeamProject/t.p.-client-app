import React from 'react';
import { Text, View } from 'react-native';
import styles from './writeProfileStyles';

function MbtiScreen() {
  return (
    <View style={styles.container}>
      <View style={[styles.section, {marginTop: 30}]}>
        <Text style={styles.title}>MBTI를 알려주세요</Text>
      </View>
      <View style={[styles.section, {marginTop: 5}]}>
        <Text style={styles.subTitle}>모든 항목을 선택해 주세요.</Text>
      </View>



    </View>
  )
}

export default MbtiScreen;
