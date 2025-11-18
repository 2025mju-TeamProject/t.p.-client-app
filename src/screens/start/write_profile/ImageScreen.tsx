import React from 'react';
import { Text, View } from 'react-native';
import styles from './writeProfileStyles';

function ImageScreen() {
  return (
    <View style={styles.container}>
      <View style={[styles.section, {marginTop: 30}]}>
        <Text style={styles.title}>{'프로필 사진을\n등록해 볼까요?'}</Text>
      </View>



    </View>
  )
}

export default ImageScreen;
