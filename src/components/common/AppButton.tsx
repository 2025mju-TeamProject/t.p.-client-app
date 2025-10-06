import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import colors from '../../constants/colors';

type Props = { title: string; onPress: () => void };

const AppButton = ({title, onPress}: Props) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.text}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {backgroundColor: colors.primary, padding: 12, borderRadius: 8},
  text: {color: '#fff', fontWeight: 'bold', fontSize: 16},
});

export default AppButton;