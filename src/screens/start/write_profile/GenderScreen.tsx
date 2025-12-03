import React, { useEffect, useState } from 'react';
import { Text, View, Image, TextInput } from 'react-native';
import styles from './writeProfileStyles';
import SelectButton from '../../../components/buttons/SelectButton';


type Props = {
  setParentGender: (value: string) => void;
  setParentNickname: (value: string) => void;
};

function GenderScreen({ setParentGender, setParentNickname }: Props) {
  const [gender, setGender] = useState<string>('');
  const [nickname, setNickname] = useState<string>(''); // 닉네임 상태 추가

  function handlePress(value: string) {
    setGender(value);
  }

  useEffect(() => {
    setParentGender(gender);
    setParentNickname(nickname);
  }, [gender, nickname]);

  return (
    <View style={styles.container}>

      {/* 타이틀 */}
      <View style={[styles.section, { marginTop: 30 }]}>
        <Text style={styles.title}>성별과 닉네임을 알려주세요.</Text>
      </View>

      <View style={[styles.section, { marginTop: 5 }]}>
        <Text style={styles.subTitle}>추후 변경이 불가능한 항목입니다.</Text>
      </View>

      {/* 성별 선택 */}
      <View style={[styles.section, { marginTop: 30, gap: 8 }]}>

        <SelectButton
          title={(selected) => (
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              <Image
                source={require('../../../../assets/icons/gender_m.png')}
                style={{ width: 18, height: 18, resizeMode: 'contain' }}
              />
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: 'NanumSquareB',
                  color: selected ? '#fff' : '#111',}}>남성
              </Text>
            </View>
          )}
          tintColors={{ true: '#111', false: 'white' }}
          isSelected={gender === '남성'}
          onPress={() => handlePress('남성')}
        />

        <SelectButton
          title={(selected) => (
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              <Image
                source={require('../../../../assets/icons/gender_w.png')}
                style={{ width: 18, height: 18, resizeMode: 'contain' }}
              />
              <Text
                style={{
                  fontSize: 14, fontFamily: 'NanumSquareB',
                  color: selected ? '#fff' : '#111',}}>여성
              </Text>
            </View>
          )}
          tintColors={{ true: '#111', false: 'white' }}
          isSelected={gender === '여성'}
          onPress={() => handlePress('여성')}
        />

      </View>

      {/* 닉네임 입력 */}
      <View style={[styles.section, { marginTop: 35 }]}>
        <Text style={styles.boldText}>
          닉네임
        </Text>
      </View>

      <View style={[styles.section, { marginTop: 8 }]}>
        <TextInput
          value={nickname}
          onChangeText={setNickname}
          placeholder="닉네임을 입력해 주세요."
          placeholderTextColor="#B1B1B1"
          style={{
            width: '100%',
            height: 46,
            borderWidth: 1,
            borderColor: '#111',
            borderRadius: 12,
            paddingHorizontal: 12,
            fontSize: 14,
            fontFamily: 'NanumSquareR',
          }}
        />
      </View>

    </View>
  );
}

export default GenderScreen;
