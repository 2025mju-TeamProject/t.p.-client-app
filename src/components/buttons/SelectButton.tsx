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
          style={[
            textStyle ? textStyle : null,  // 전달받은 스타일 우선 적용
            { color: isSelected ? '#fff' : '#111' },
          ]}
        >
          {/* 이모지는 기본 폰트로 */}
          <Text style={{ fontFamily: undefined }}>
            {title.split(' ')[0] + ' '}
          </Text>

          {/* 나머지 텍스트는 전달 받은 textStyle 그대로 적용 */}
          <Text>
            {title.split(' ').slice(1).join(' ')}
          </Text>
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
    height: 44,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  text: {
    fontSize: 16,
    fontFamily: 'NanumSquareB',
    color: colors.background,
  },
});

export default SelectButton;
