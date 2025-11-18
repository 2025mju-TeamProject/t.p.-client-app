import React from 'react';
import { Text, View } from 'react-native';
import styles from './writeProfileStyles';

function JobScreen() {
  return (
    <View style={styles.container}>
      <View style={[styles.section, {marginTop: 30}]}>
        <Text style={styles.title}>어떤 일을 하고 계신가요?</Text>
      </View>



    </View>
  )
}

export default JobScreen;
