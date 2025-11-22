import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import styles from './writeProfileStyles';
import SelectButton from '../../../components/buttons/SelectButton';

type Props = {
  onPress: (value: string) => void;
  choosed: string;
};

function GenderScreen({ onPress, choosed }: Props) {
  const [gender, setGender] = useState<string>(choosed);

  function handlePress(value: string) {
    setGender(value);
    onPress(value);
  }

  return (
    <View style={styles.container}>
      <View style={[styles.section, { marginTop: 30 }]}>
        <Text style={styles.title}>성별을 알려주세요.</Text>
      </View>

      <View style={[styles.section, { marginTop: 5 }]}>
        <Text style={styles.subTitle}>추후 변경이 불가능한 항목입니다.</Text>
      </View>

      <View style={[styles.section, { marginTop: 30, gap: 8 }]}>
        <SelectButton
          title="남성"
          tintColors={{ true: '#515151', false: 'white' }}
          isSelected={gender === '남성'}
          onPress={() => handlePress('남성')}
        />

        <SelectButton
          title="여성"
          tintColors={{ true: '#515151', false: 'white' }}
          isSelected={gender === '여성'}
          onPress={() => handlePress('여성')}
        />
      </View>
    </View>
  );
}

export default GenderScreen;
