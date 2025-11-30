import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import styles from './writeProfileStyles';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Ionicons';

type Props = {
  setParentYear: (value: number) => void;
  setParentMonth: (value: number) => void;
  setParentDay: (value: number) => void;
  setParentHour: (value: number) => void;
  setParentMinute: (value: number) => void;
};

function BirthdayScreen({ setParentYear, setParentMonth, setParentDay, setParentHour, setParentMinute}: Props) {
  const [noTime, setNoTime] = useState<boolean>(false);
  const [openPicker, setOpenPicker] = useState<
    null | 'year' | 'month' | 'day' | 'hour' | 'minute'
  >(null);

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
    if (noTime) {
      setOpenPicker(null);
      setHourValue(null);
      setMinuteValue(null);
    }

    setParentYear(yearValue !== null ? yearValue : 0);
    setParentMonth(monthValue !== null ? monthValue : 0);
    setParentDay(dayValue !== null ? dayValue : 0);
    setParentHour(hourValue !== null ? hourValue : 0);
    setParentMinute(minuteValue !== null ? minuteValue : 0);
  }, [yearValue, monthValue, dayValue, hourValue, minuteValue, noTime]);

  return (
    <View style={styles.container}>
      {/* 타이틀 */}
      <View style={[styles.section, { marginTop: 30 }]}>
        <Text style={styles.title}>생년월일을 알려주세요.</Text>
      </View>

      <View style={[styles.section, { marginTop: 5 }]}>
        <Text style={styles.subTitle}>추후 변경이 불가능한 항목입니다.</Text>
      </View>

      {/* 생년월일 */}
      <View style={[styles.section, { marginTop: 30 }]}>
        <Text
          style={[
            styles.subTitle,
            { fontFamily: 'NanumSquareB', color: '#111' },
          ]}
        >
          생년월일
        </Text>
      </View>

      <View style={[styles.section, { marginTop: 5, gap: 10 }]}>
        <DropDownPicker
          value={yearValue}
          items={yearItems}
          open={openPicker === 'year'}
          setOpen={(open) => setOpenPicker(open ? 'year' : null)}
          setValue={setYearValue}
          placeholder={'연'}
          placeholderStyle={{ color: '#B1B1B1' }}
          fontFamily={'NanumSquareR'}
          containerStyle={{ width: '33%' }}
          style={{ paddingLeft: 15 }}
        />

        <DropDownPicker
          value={monthValue}
          items={monthItems}
          open={openPicker === 'month'}
          setOpen={(open) => setOpenPicker(open ? 'month' : null)}
          setValue={setMonthValue}
          placeholder={'월'}
          placeholderStyle={{ color: '#B1B1B1' }}
          fontFamily={'NanumSquareR'}
          containerStyle={{ width: '30%' }}
          style={{ paddingLeft: 15 }}
        />

        <DropDownPicker
          value={dayValue}
          items={dayItems}
          open={openPicker === 'day'}
          setOpen={(open) => setOpenPicker(open ? 'day' : null)}
          setValue={setDayValue}
          placeholder={'일'}
          placeholderStyle={{ color: '#B1B1B1' }}
          fontFamily={'NanumSquareR'}
          containerStyle={{ width: '30%' }}
          style={{ paddingLeft: 15 }}
        />
      </View>

      {/* 태어난 시간 */}
      <View style={[styles.section, { marginTop: 30 }]}>
        <Text
          style={[
            styles.subTitle,
            { fontFamily: 'NanumSquareB', color: '#111' },
          ]}
        >
          태어난 시간
        </Text>
      </View>

      <View style={[styles.section, { marginTop: 5, gap: 10 }]}>
        <DropDownPicker
          value={hourValue}
          items={hourItems}
          open={openPicker === 'hour' && !noTime}
          setOpen={(open) => !noTime && setOpenPicker(open ? 'hour' : null)}
          setValue={setHourValue}
          placeholder={'시'}
          placeholderStyle={{ color: '#B1B1B1' }}
          fontFamily={'NanumSquareR'}
          containerStyle={{ width: '30%' }}
          style={{ paddingLeft: 15 }}
        />

        <DropDownPicker
          value={minuteValue}
          items={minuteItems}
          open={openPicker === 'minute' && !noTime}
          setOpen={(open) => !noTime && setOpenPicker(open ? 'minute' : null)}
          setValue={setMinuteValue}
          placeholder={'분'}
          placeholderStyle={{ color: '#B1B1B1' }}
          fontFamily={'NanumSquareR'}
          containerStyle={{ width: '30%' }}
          style={{ paddingLeft: 15 }}
        />
      </View>

      {/* 시간 모름 체크박스 */}
      <View style={[styles.section, { marginTop: 20, flexDirection: 'row', alignItems: 'center' }]}>
        <TouchableOpacity
          onPress={() => setNoTime(!noTime)}
          style={[
            localStyles.checkbox,
            { borderColor: noTime ? '#111' : '#C7C7C7' },
          ]}
        >
          {noTime && <Icon name="checkmark" size={15} color="#111" />}
        </TouchableOpacity>

        <Text
          style={{
            fontFamily: 'NanumSquareB',
            color: '#111',
            fontSize: 12,
          }}
        >
          시간 모름
        </Text>
      </View>
    </View>
  );
}

export default BirthdayScreen;

const localStyles = StyleSheet.create({
  checkbox: {
    width: 19,
    height: 19,
    borderWidth: 1,
    borderRadius: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
});
