import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  StyleProp,
  View,
  ViewStyle,
  TextStyle,
} from 'react-native';
import colors from '../../constants/colors';

type Props = {
  title: string | React.ReactNode | ((selected: boolean) => React.ReactNode);
  tintColors?: { true: string; false: string };
  isSelected?: boolean;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};

function SelectButton({
  title,
  tintColors = { true: '#111', false: '#fff' },
  isSelected = false,
  onPress,
  style = null,
  textStyle = null,
}: Props) {
  return (
    <TouchableOpacity
      style={[
        style === null ? styles.button : style,
        { backgroundColor: isSelected ? tintColors.true : tintColors.false },
      ]}
      onPress={onPress}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>

        {/* 1. title이 함수면 isSelected를 넘겨서 내부 색상 제어 가능 */}
        {typeof title === 'function' ? (
          title(isSelected)

        /* 2. title이 문자열이면 기존 방식으로 처리 */
        ) : typeof title === 'string' ? (
          <Text
            style={
              textStyle === null
                ? [styles.text, { color: isSelected ? '#fff' : '#111' }]
                : [textStyle, { color: isSelected ? '#fff' : '#111' }]
            }
          >
            {title}
          </Text>

        /* 3. JSX면 그대로 렌더링 */
        ) : (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {title}
          </View>
        )}

      </View>
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
    fontWeight: 'bold',
    fontSize: 16,
    color: colors.background,
  },
});

export default SelectButton;
