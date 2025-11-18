import React from 'react';
import { Text, View } from 'react-native';
import styles from './writeProfileStyles';

function IntroductionScreen() {
  return (
    <View style={styles.container}>
      <View style={[styles.section, {marginTop: 30}]}>
        <Text style={styles.title}>{'주로 활동하는\n지역은 어디인가요?'}</Text>
      </View>

    </View>
  );
}

export default IntroductionScreen;
