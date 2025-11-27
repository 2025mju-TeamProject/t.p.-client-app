import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import styles from './writeProfileStyles';
import SelectButton from '../../../components/buttons/SelectButton';

function MbtiScreen() {
  const [ei, setEI] = useState<number>(-1);
  const [sn, setSN] = useState<number>(-1);
  const [tf, setTF] = useState<number>(-1);
  const [jp, setJP] = useState<number>(-1);
  const [mbti, setMBTI] = useState<string>('MBTI');

  useEffect(() => {
    if (ei === -1 || sn === -1 || tf === -1 || jp === -1) return;
    refreshMBTI();
  }, [ei, sn, tf, jp, refreshMBTI]);

  return (
    <View style={styles.container}>
      <View style={[styles.section, { marginTop: 30 }]}>
        <Text style={styles.title}>{mbti}를 알려주세요</Text>
      </View>
      <View style={[styles.section, { marginTop: 5 }]}>
        <Text style={styles.subTitle}>모든 항목을 선택해 주세요.</Text>
      </View>

      <View style={[styles.section, { marginTop: 30 }]}>
        <Text style={styles.boldText}>에너지 방향</Text>
      </View>
      <View style={[styles.section, { marginTop: 5, gap: 8 }]}>
        <SelectButton
          title={'E'}
          tintColors={{ true: '#515151', false: 'white' }}
          isSelected={ei === 0}
          onPress={() => setEI(0)}
        />
        <SelectButton
          title={'I'}
          tintColors={{ true: '#515151', false: 'white' }}
          isSelected={ei === 1}
          onPress={() => setEI(1)}
        />
      </View>
      <View
        style={[
          styles.section,
          {
            marginTop: 5,
            justifyContent: 'space-between',
            paddingHorizontal: 30,
          },
        ]}
      >
        <Text style={styles.text}>#밖에서 에너지 충전</Text>
        <Text style={styles.text}>#집에서 에너지 충전</Text>
      </View>

      <View style={[styles.section, { marginTop: 30 }]}>
        <Text style={styles.boldText}>인식 방식</Text>
      </View>
      <View style={[styles.section, { marginTop: 5, gap: 8 }]}>
        <SelectButton
          title={'S'}
          tintColors={{ true: '#515151', false: 'white' }}
          isSelected={sn === 0}
          onPress={() => setSN(0)}
        />
        <SelectButton
          title={'N'}
          tintColors={{ true: '#515151', false: 'white' }}
          isSelected={sn === 1}
          onPress={() => setSN(1)}
        />
      </View>
      <View
        style={[
          styles.section,
          {
            marginTop: 5,
            justifyContent: 'space-between',
            paddingHorizontal: 30,
          },
        ]}
      >
        <Text style={styles.text}>#현재가 중요한 현실형</Text>
        <Text style={styles.text}>#미래가 중요한 상상형</Text>
      </View>

      <View style={[styles.section, { marginTop: 30 }]}>
        <Text style={styles.boldText}>결정 방식</Text>
      </View>
      <View style={[styles.section, { marginTop: 5, gap: 8 }]}>
        <SelectButton
          title={'T'}
          tintColors={{ true: '#515151', false: 'white' }}
          isSelected={tf === 0}
          onPress={() => setTF(0)}
        />
        <SelectButton
          title={'F'}
          tintColors={{ true: '#515151', false: 'white' }}
          isSelected={tf === 1}
          onPress={() => setTF(1)}
        />
      </View>
      <View
        style={[
          styles.section,
          {
            marginTop: 5,
            justifyContent: 'space-between',
            paddingHorizontal: 30,
          },
        ]}
      >
        <Text style={styles.text}>#논리 중심적 판단형</Text>
        <Text style={styles.text}>#감정 중심적 공감형</Text>
      </View>

      <View style={[styles.section, { marginTop: 30 }]}>
        <Text style={styles.boldText}>삶의 패턴</Text>
      </View>
      <View style={[styles.section, { marginTop: 5, gap: 8 }]}>
        <SelectButton
          title={'J'}
          tintColors={{ true: '#515151', false: 'white' }}
          isSelected={jp === 0}
          onPress={() => setJP(0)}
        />
        <SelectButton
          title={'P'}
          tintColors={{ true: '#515151', false: 'white' }}
          isSelected={jp === 1}
          onPress={() => setJP(1)}
        />
      </View>
      <View
        style={[
          styles.section,
          {
            marginTop: 5,
            justifyContent: 'space-between',
            paddingHorizontal: 30,
          },
        ]}
      >
        <Text style={styles.text}>#즉흥적이고 유연한 대응</Text>
        <Text style={styles.text}>#계획이 철저한 일정중시</Text>
      </View>
    </View>
  );

  function refreshMBTI() {
    const twoBit = 8 * ei + 4 * sn + 2 * tf + jp;
    let tmp = 'MBTI';
    switch (twoBit) {
      case 0:
        tmp = 'ESTJ';
        break;
      case 1:
        tmp = 'ESTP';
        break;
      case 2:
        tmp = 'ESFJ';
        break;
      case 3:
        tmp = 'ESFP';
        break;
      case 4:
        tmp = 'ENTJ';
        break;
      case 5:
        tmp = 'ENTP';
        break;
      case 6:
        tmp = 'ENFJ';
        break;
      case 7:
        tmp = 'ENFP';
        break;
      case 8:
        tmp = 'ISTJ';
        break;
      case 9:
        tmp = 'ISTP';
        break;
      case 10:
        tmp = 'ISFJ';
        break;
      case 11:
        tmp = 'ISFP';
        break;
      case 12:
        tmp = 'INTJ';
        break;
      case 13:
        tmp = 'INTP';
        break;
      case 14:
        tmp = 'INFJ';
        break;
      case 15:
        tmp = 'INFP';
        break;
      default:
        tmp = 'MBTI';
        break;
    }
    setMBTI(tmp);
  }
}

export default MbtiScreen;

const localStyle = StyleSheet.create({
  button: {
    flex: 1,
    height: 46,
    borderRadius: 12,
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderWidth: 1,
  },
})
