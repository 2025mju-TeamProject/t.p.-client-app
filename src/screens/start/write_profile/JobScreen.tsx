import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import styles from './writeProfileStyles';
import SelectButton from '../../../components/buttons/SelectButton';

function JobScreen() {
  const [index, setIndex] = useState<number>(-1);

  return (
    <View style={styles.container}>
      <View style={[styles.section, {marginTop: 30}]}>
        <Text style={styles.title}>어떤 일을 하고 계신가요?</Text>
      </View>

      <View style={[styles.columnSection, { marginTop: 30, gap: 8 }]}>
        <SelectButton
          title={'💻  IT·개발직'}
          isSelected={index === 0}
          onPress={() => setIndex(0)}
          style={localStyle.button}
        />

        <SelectButton
          title={'🏢  사무·관리직'}
          isSelected={index === 1}
          onPress={() => setIndex(1)}
          style={localStyle.button}
        />

        <SelectButton
          title={'💼  전문직'}
          isSelected={index === 2}
          onPress={() => setIndex(2)}
          style={localStyle.button}
        />

        <SelectButton
          title={'🏛️  공공·교육직'}
          isSelected={index === 3}
          onPress={() => setIndex(3)}
          style={localStyle.button}
        />

        <SelectButton
          title={'🍽️  서비스·외식업'}
          isSelected={index === 4}
          onPress={() => setIndex(4)}
          style={localStyle.button}
        />

        <SelectButton
          title={'🌱  프리랜서·자영업'}
          isSelected={index === 5}
          onPress={() => setIndex(5)}
          style={localStyle.button}
        />

        <SelectButton
          title={'🎓  학생'}
          isSelected={index === 6}
          onPress={() => setIndex(6)}
          style={localStyle.button}
        />

        <SelectButton
          title={'✨  기타'}
          isSelected={index === 7}
          onPress={() => setIndex(7)}
          style={localStyle.button}
        />
      </View>

    </View>
  )
}

export default JobScreen;

const localStyle = StyleSheet.create({
  button: {
    width: '100%',
    height: 52,
    borderRadius: 17,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderWidth: 1,
  },
})
