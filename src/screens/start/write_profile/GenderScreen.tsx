import React, { useEffect, useState } from 'react';
import { Text, View, Image } from 'react-native';
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
        <Text style={styles.title}>성별과 닉네임을 알려주세요.</Text>
      </View>

      <View style={[styles.section, { marginTop: 5 }]}>
        <Text style={styles.subTitle}>추후 변경이 불가능한 항목입니다.</Text>
      </View>

      <View style={[styles.section, { marginTop: 30, gap: 8 }]}>

        {/* 남성 */}
        <SelectButton
          title={(selected) => (
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              <Image
                source={require('../../../../assets/icons/gender_m.png')}
                style={{
                  width: 18,
                  height: 18,
                  resizeMode: 'contain',   // ← tintColor 제거!
                }}
              />
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: 'NanumSquareB',
                  color: selected ? '#fff' : '#111',   // ← 글자만 변경!
                }}
              >
                남성
              </Text>
            </View>
          )}
          tintColors={{ true: '#111', false: 'white' }}
          isSelected={gender === '남성'}
          onPress={() => handlePress('남성')}
        />


        {/* 여성 */}
        <SelectButton
          title={(selected) => (
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              <Image
                source={require('../../../../assets/icons/gender_w.png')}
                style={{
                  width: 18,
                  height: 18,
                  resizeMode: 'contain',
                }}
              />
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: 'NanumSquareB',
                  color: selected ? '#fff' : '#111',
                }}
              >
                여성
              </Text>
            </View>
          )}
          tintColors={{ true: '#111', false: 'white' }}
          isSelected={gender === '여성'}
          onPress={() => handlePress('여성')}
        />
      </View>
    </View>
  );
}

export default GenderScreen;
