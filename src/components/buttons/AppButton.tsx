import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  StyleProp,
} from 'react-native';
import colors from '../../constants/colors';

type Props = {
  title: string;
  tintColors: { true: string; false: string };
  isAbled?: boolean;
  onPress: () => void;
  buttonStyle?: StyleProp<ViewStyle>;
  textColor?: string;
};

function AppButton({
  title,
  tintColors,
  isAbled,
  onPress,
  buttonStyle = null,
  textColor = colors.background,
}: Props) {
  return (
    <TouchableOpacity
      style={[
        buttonStyle === null ? styles.button : buttonStyle,
        { backgroundColor: isAbled ? tintColors.true : tintColors.false },
      ]}
      onPress={onPress}
      disabled={!isAbled}
    >
      <Text style={[styles.text, {color: textColor}]}>{title}</Text>
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
  },

  text: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default AppButton;
