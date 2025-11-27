import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import colors from '../../constants/colors';

type Props = {
  title: string;
  subtitle?: string;
  onPressAlarm?: () => void;
  hasAlarm?: boolean;
};

export default function HeaderHome({ title, subtitle, onPressAlarm, hasAlarm }: Props) {
  return (
    <View style={styles.container}>
      {/* 타이틀 */}
      <Text style={[styles.title, { fontFamily: 'SCDream7' }]}>
        {title}
      </Text>

      {/* 서브타이틀 */}
      {subtitle && (
        <Text style={[styles.subTitle, { fontFamily: 'NanumSquareR' }]}>
          {subtitle}
        </Text>
      )}

      {/* 알림 아이콘 */}
      {onPressAlarm && (
        <TouchableOpacity style={styles.alarmIcon} onPress={onPressAlarm}>
          <Image
            source={
              hasAlarm
                ? require('../../../assets/icons/alarm_unread.png') // 안읽음
                : require('../../../assets/icons/alarm_read.png')   // 읽음
            }
            style={{ width: 28, height: 28 }}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-end',
    height: 129,
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
    color: '#797979',
    marginTop: 8,
  },
  alarmIcon: {
    position: 'absolute',
    right: 24,
    top: 58,
  },
});
