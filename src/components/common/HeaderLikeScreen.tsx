import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import colors from '../../constants/colors';

type Props = {
  title: string;
  subtitle?: string;
};

export default function LikeHeader({ title, subtitle}: Props) {
  return (
    <View style={styles.container}>
      <Text style={[styles.title, { fontFamily: 'SCDream7' }]}>
        {title}
      </Text>

      {/* 서브타이틀이 필요하면 */}
      {subtitle && (
        <Text style={[styles.subTitle, { fontFamily: 'NanumSquareR' }]}>
          {subtitle}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-end',
    height: 125,
    backgroundColor: colors.background,
    paddingHorizontal: 24,
    paddingBottom: 14,
  },
  title: {
    fontSize: 28,
    color: 'black',
  },
  subTitle: {
    fontSize: 12,
    color: '#9C9C9C',
    marginTop: 6,
  },
});
