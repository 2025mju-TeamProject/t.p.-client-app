import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  StyleProp,
  View,
  ViewStyle,
} from 'react-native';
import colors from '../../constants/colors';

type Props = {
  title: string;
  tintColors: { true: string; false: string };
  isSelected?: boolean;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
};

function SelectButton({ title, tintColors, isSelected, onPress, style = null }: Props) {
  return (
    <TouchableOpacity
      style={ style === null ?
        [styles.button, { backgroundColor: isSelected ? tintColors.true : tintColors.false },] :
        [style, { backgroundColor: isSelected ? tintColors.true : tintColors.false }]}
      onPress={onPress}
    >
      <Text style={[styles.text, {color: isSelected ? 'white' : 'black'}]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    height: 46,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },

  text: {
    color: colors.background,
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default SelectButton;
