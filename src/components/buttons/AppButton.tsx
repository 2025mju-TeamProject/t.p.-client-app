import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import colors from '../../constants/colors';

type Props = {
  title: string;
  tintColors: { true: string; false: string };
  isAbled?: boolean;
  onPress: () => void;
};

function AppButton({ title, tintColors, isAbled, onPress }: Props) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: isAbled ? tintColors.true : tintColors.false },
      ]}
      onPress={onPress}
      disabled={!isAbled}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: 46,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  text: {
    color: colors.background,
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default AppButton;
