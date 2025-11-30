import React, { JSX, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import styles from './writeProfileStyles';
import SelectButton from '../../../components/buttons/SelectButton';

type Props = {
  setParentJob: (value: string) => void;
}

const jobs = [
  'IT·개발직',
  '사무·관리직',
  '전문직',
  '공공·교육직',
  '서비스·외식업',
  '프리랜서·자영업',
  '학생',
  '기타'
]

function JobScreen({ setParentJob }: Props): JSX.Element {
  const [index, setIndex] = useState<number>(-1);

  function handlePress(index: number) {
    setIndex(index);
    setParentJob(jobs[index]);
  }

  return (
    <View style={styles.container}>
      <View style={[styles.section, {marginTop: 30}]}>
        <Text style={styles.title}>어떤 일을 하고 계신가요?</Text>
      </View>

      <View style={[styles.columnSection, { marginTop: 30, gap: 8 }]}>
        <SelectButton
          title={'💻 IT·개발직'}
          tintColors={{ true: '#515151', false: 'white' }}
          isSelected={index === 0}
          onPress={() => handlePress(0)}
          style={localStyle.button}
        />

        <SelectButton
          title={'🏢 사무·관리직'}
          tintColors={{ true: '#515151', false: 'white' }}
          isSelected={index === 1}
          onPress={() => handlePress(1)}
          style={localStyle.button}
        />

        <SelectButton
          title={'💼 전문직'}
          tintColors={{ true: '#515151', false: 'white' }}
          isSelected={index === 2}
          onPress={() => handlePress(2)}
          style={localStyle.button}
        />

        <SelectButton
          title={'🏛️ 공공·교육직'}
          tintColors={{ true: '#515151', false: 'white' }}
          isSelected={index === 3}
          onPress={() => handlePress(3)}
          style={localStyle.button}
        />

        <SelectButton
          title={'🍽️ 서비스·외식업'}
          tintColors={{ true: '#515151', false: 'white' }}
          isSelected={index === 4}
          onPress={() => handlePress(4)}
          style={localStyle.button}
        />

        <SelectButton
          title={'🌱 프리랜서·자영업'}
          tintColors={{ true: '#515151', false: 'white' }}
          isSelected={index === 5}
          onPress={() => handlePress(5)}
          style={localStyle.button}
        />

        <SelectButton
          title={'🎓 학생'}
          tintColors={{ true: '#515151', false: 'white' }}
          isSelected={index === 6}
          onPress={() => handlePress(6)}
          style={localStyle.button}
        />

        <SelectButton
          title={'✨ 기타'}
          tintColors={{ true: '#515151', false: 'white' }}
          isSelected={index === 7}
          onPress={() => handlePress(7)}
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
