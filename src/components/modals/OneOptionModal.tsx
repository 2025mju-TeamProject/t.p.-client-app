import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import colors from '../../constants/colors';

type Props = {
  title: String;
  subTitle: String;
  optionText: string;
  onClick: () => void;
};

function OneOptionModal({ title, subTitle, optionText, onClick }: Props) {

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subTitle}>{subTitle}</Text>

      <TouchableOpacity onPress={() => {onClick()}} style={styles.button}>
        <Text style={{ color: 'white' }}>{optionText}</Text>
      </TouchableOpacity>
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
  button: {
    width: '100%',
    height: 44,
    backgroundColor: colors.pink,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
