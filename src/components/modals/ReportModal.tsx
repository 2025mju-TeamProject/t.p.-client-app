import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import colors from '../../constants/colors';
import Icon from 'react-native-vector-icons/Ionicons';

type Props = {
  onClick1: () => void;
  onClick2: () => void;
};

function ReportModal({ onClick1, onClick2 }: Props) {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>신고 항목을 선택해 주세요.</Text>

      <View style={styles.section}>
        <TouchableOpacity
          onPress={() => setSelected(0)}
          style={[
            styles.checkbox,
            { borderColor: selected === 0 ? '#111' : '#C7C7C7' },
          ]}
        >
          {selected === 0 && <Icon name="checkmark" size={15} color="#111" />}
        </TouchableOpacity>
        <Text style={styles.text}>스팸</Text>
      </View>

      <View style={styles.section}>
        <TouchableOpacity
          onPress={() => setSelected(1)}
          style={[
            styles.checkbox,
            { borderColor: selected === 1 ? '#111' : '#C7C7C7' },
          ]}
        >
          {selected === 1 && <Icon name="checkmark" size={15} color="#111" />}
        </TouchableOpacity>
        <Text style={styles.text}>욕설 및 비하 발언</Text>
      </View>

      <View style={styles.section}>
        <TouchableOpacity
          onPress={() => setSelected(2)}
          style={[
            styles.checkbox,
            { borderColor: selected === 2 ? '#111' : '#C7C7C7' },
          ]}
        >
          {selected === 2 && <Icon name="checkmark" size={15} color="#111" />}
        </TouchableOpacity>
        <Text style={styles.text}>나체 이미지 및 성적 행위</Text>
      </View>

      <View style={styles.section}>
        <TouchableOpacity
          onPress={() => setSelected(3)}
          style={[
            styles.checkbox,
            { borderColor: selected === 3 ? '#111' : '#C7C7C7' },
          ]}
        >
          {selected === 3 && <Icon name="checkmark" size={15} color="#111" />}
        </TouchableOpacity>
        <Text style={styles.text}>사기 및 거짓</Text>
      </View>

      <View style={styles.optionContainer}>
        <TouchableOpacity
          onPress={() => {
            onClick1();
          }}
          style={styles.button1}
        >
          <Text style={{ color: 'white' }}>신고하기</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            onClick2();
          }}
          style={styles.button2}
        >
          <Text style={{ color: 'black' }}>취소</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default ReportModal;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 333,
    paddingHorizontal: 12,
    paddingVertical: 12,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 18,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 12,
  },
  subTitle: {
    fontSize: 13,
  },
  section: {
    width: '100%',
    height: 20,
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  checkbox: {
    width: 19,
    height: 19,
    borderWidth: 1,
    borderRadius: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  text: {
    fontSize: 14,
    fontFamily: 'NanumSquare4'
  },
  optionContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  button1: {
    width: '48%',
    height: 44,
    backgroundColor: colors.pink,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button2: {
    width: '48%',
    height: 44,
    backgroundColor: colors.lightGray,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
