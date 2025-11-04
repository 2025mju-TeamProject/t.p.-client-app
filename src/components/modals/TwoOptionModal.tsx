import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import colors from '../../constants/colors';

type Props = {
  title: String;
  subTitle: String;
  optionText1: string;
  optionText2: string;
  onClick1: () => void;
  onClick2: () => void;
};

function OneOptionModal({ title, subTitle, optionText1, optionText2, onClick1, onClick2 }: Props) {

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subTitle}>{subTitle}</Text>

      <View style={styles.optionContainer}>
        <TouchableOpacity onPress={() => {onClick1()}} style={styles.button1}>
          <Text style={{ color: 'white' }}>{optionText1}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {onClick2()}} style={styles.button2}>
          <Text style={{ color: 'black' }}>{optionText2}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default OneOptionModal;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 180,
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
