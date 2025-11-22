import React, { JSX, use, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import styles from './writeProfileStyles';
import DropDownPicker from 'react-native-dropdown-picker';
import CheckBox from '@react-native-community/checkbox';

type Birthday = {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  knowTime: boolean;
};

type Props = {
  birthday: Birthday;
};

function BirthdayScreen() {
  const [noTime, setNoTime] = useState<boolean>(false);
  const [openPicker, setOpenPicker] = useState<
    null | 'year' | 'month' | 'day' | 'hour' | 'minute'
  >(null);

  // 전체 생일 상태
  const [birthday, setBirthday] = useState<Birthday>({
    year: 0,
    month: 0,
    day: 0,
    hour: 0,
    minute: 0,
    knowTime: false,
  });

  // 연
  const [yearValue, setYearValue] = useState<number | null>(null);
  const yearItems = Array.from({ length: 2006 - 1980 + 1 }, (_, i) => ({
    label: `${1980 + i}`,
    value: 1980 + i,
  }));

  // 월
  const [monthValue, setMonthValue] = useState<number | null>(null);
  const monthItems = Array.from({ length: 12 }, (_, i) => ({
    label: `${i + 1}`,
    value: i + 1,
  }));

  // 일
  const [dayValue, setDayValue] = useState<number | null>(null);
  const dayItems = Array.from({ length: 31 }, (_, i) => ({
    label: `${i + 1}`,
    value: i + 1,
  }));

  // 시
  const [hourValue, setHourValue] = useState<number | null>(null);
  const hourItems = Array.from({ length: 12 }, (_, i) => ({
    label: `${i + 1}`,
    value: i + 1,
  }));

  // 분
  const [minuteValue, setMinuteValue] = useState<number | null>(null);
  const minuteItems = Array.from({ length: 60 }, (_, i) => ({
    label: `${i}`,
    value: i,
  }));

  useEffect(() => {
    if(noTime) {
      setOpenPicker(null);
      setHourValue(null);
      setMinuteValue(null);
    }
  }, [noTime]);

  return (
    <View style={styles.container}>
      <View style={[styles.section, { marginTop: 30 }]}>
        <Text style={styles.title}>생년월일을 알려주세요</Text>
      </View>
      <View style={[styles.section, { marginTop: 5 }]}>
        <Text style={styles.subTitle}>
          {'생년월일은 추후 변경할 수 없으니 정확히 입력해 주세요.\n' +
            '태어난 시간은 추후 변경이 가능합니다'}
        </Text>
      </View>

      <View style={[styles.section, { marginTop: 30 }]}>
        <Text style={styles.text}>생년월일</Text>
      </View>
      <View style={[styles.section, { marginTop: 5, gap: 10 }]}>
        <DropDownPicker
          value={yearValue}
          items={yearItems}
          open={openPicker === 'year'}
          setOpen={open => setOpenPicker(open ? 'year' : null)}
          setValue={result => setYearValue(result)}
          placeholder={'연'}
          placeholderStyle={{ color: '#B1B1B1' }}
          containerStyle={{ width: '33%' }}
        />

        <DropDownPicker
          value={monthValue}
          items={monthItems}
          open={openPicker === 'month'}
          setOpen={open => setOpenPicker(open ? 'month' : null)}
          setValue={result => setMonthValue(result)}
          placeholder={'월'}
          placeholderStyle={{ color: '#B1B1B1' }}
          containerStyle={{ width: '30%' }}
        />

        <DropDownPicker
          value={dayValue}
          items={dayItems}
          open={openPicker === 'day'}
          setOpen={open => setOpenPicker(open ? 'day' : null)}
          setValue={result => setDayValue(result)}
          placeholder={'일'}
          placeholderStyle={{ color: '#B1B1B1' }}
          containerStyle={{ width: '30%' }}
        />
      </View>

      <View style={[styles.section, { marginTop: 30 }]}>
        <Text style={styles.text}>태어난 시간</Text>
      </View>
      <View style={[styles.section, { marginTop: 5, gap: 10, }]}>
        <DropDownPicker
          value={hourValue}
          items={hourItems}
          open={openPicker === 'hour' && !noTime}
          setOpen={open => !noTime && setOpenPicker(open ? 'hour' : null)}
          setValue={result => setHourValue(result)}
          placeholder={'시'}
          placeholderStyle={{ color: '#B1B1B1' }}
          style={{zIndex: 1}}
          containerStyle={{ width: '30%' }}
        />

        <DropDownPicker
          value={minuteValue}
          items={minuteItems}
          open={openPicker === 'minute' && !noTime}
          setOpen={open => !noTime && setOpenPicker(open ? 'minute' : null)}
          setValue={result => setMinuteValue(result)}
          placeholder={'분'}
          placeholderStyle={{ color: '#B1B1B1' }}
          style={{zIndex: 1}}
          containerStyle={{ width: '30%' }}
        />
      </View>

      <View style={[styles.section, { marginTop: 10 }]}>
        <CheckBox
          value={noTime}
          onValueChange={newValue => setNoTime(newValue)}
          tintColors={{ true: 'black', false: '#AAA' }}
        />
        <Text>시간 모름</Text>
      </View>
    </View>
  );
}

export default BirthdayScreen;

const localStyles = StyleSheet.create({
  dropdown: {},
  dropdownContainer: {
    flexGrow: 1,
  },
});
