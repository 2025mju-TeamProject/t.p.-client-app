import React, { JSX, useState } from 'react';
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

  // 전체 생일 상태
  const [birthday, setBirthday] = useState<Birthday>({
    year: null,
    month: null,
    day: null,
    hour: null,
    minute: null,
    knowTime: false,
  });

  // 연
  const [yearOpen, setYearOpen] = useState(false);
  const [yearValue, setYearValue] = useState<number | null>(null);
  const yearItems = Array.from({ length: 2006 - 1980 + 1 }, (_, i) => ({
    label: `${1980 + i}`,
    value: 1980 + i,
  }));

  // 월
  const [monthOpen, setMonthOpen] = useState(false);
  const [monthValue, setMonthValue] = useState<number | null>(null);
  const monthItems = Array.from({ length: 12 }, (_, i) => ({
    label: `${i + 1}`,
    value: i + 1,
  }));

  // 일
  const [dayOpen, setDayOpen] = useState(false);
  const [dayValue, setDayValue] = useState<number | null>(null);
  const dayItems = Array.from({ length: 31 }, (_, i) => ({
    label: `${i + 1}`,
    value: i + 1,
  }));

  // 시
  const [hourOpen, setHourOpen] = useState(false);
  const [hourValue, setHourValue] = useState<number | null>(null);
  const hourItems = Array.from({ length: 12 }, (_, i) => ({
    label: `${i + 1}`,
    value: i + 1,
  }));

  // 분
  const [minuteOpen, setMinuteOpen] = useState(false);
  const [minuteValue, setMinuteValue] = useState<number | null>(null);
  const minuteItems = Array.from({ length: 59 }, (_, i) => ({
    label: `${i + 1}`,
    value: i + 1,
  }));

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

      <View style={[styles.section, { marginTop: 40 }]}>
        <Text style={styles.text}>생년월일</Text>
      </View>

      {/*연 월 일*/}
      <View
        style={[
          styles.section,
          {
            marginTop: 5,
            flexDirection: 'row',
            zIndex: 3000, // 드롭다운 겹침 방지
          },
        ]}
      >
        {/* 연 */}
        <DropDownPicker
          open={yearOpen}
          value={yearValue}
          items={yearItems}
          setOpen={open => {
            setYearOpen(open);
            if (open) {
              setMonthOpen(false);
              setDayOpen(false);
              setHourOpen(false);
              setMinuteOpen(false);
            }
          }}
          setValue={callback => {
            const val = callback(yearValue) as number | null;
            setYearValue(val);
            setBirthday(prev => ({ ...prev, year: val }));
          }}
          setItems={() => {}}
          placeholder="연"
          style={{ height: 50, borderRadius: 12, width: 94 }}
          dropDownContainerStyle={{ borderRadius: 12, width: 94 }}
          zIndex={3000}
          zIndexInverse={1000}
        />

        {/* 월 */}
        <DropDownPicker
          open={monthOpen}
          value={monthValue}
          items={monthItems}
          setOpen={open => {
            setMonthOpen(open);
            if (open) {
              setYearOpen(false);
              setDayOpen(false);
              setHourOpen(false);
              setMinuteOpen(false);
            }
          }}
          setValue={callback => {
            const val = callback(monthValue) as number | null;
            setMonthValue(val);
            setBirthday(prev => ({ ...prev, month: val }));
          }}
          setItems={() => {}}
          placeholder="월"
          style={{ height: 50, borderRadius: 12, width: 94 }}
          dropDownContainerStyle={{ borderRadius: 12, width: 94 }}
          zIndex={2000}
          zIndexInverse={2000}
        />

        {/* 일 */}
        <DropDownPicker
          open={dayOpen}
          value={dayValue}
          items={dayItems}
          setOpen={open => {
            setDayOpen(open);
            if (open) {
              setYearOpen(false);
              setMonthOpen(false);
              setHourOpen(false);
              setMinuteOpen(false);
            }
          }}
          setValue={callback => {
            const val = callback(dayValue) as number | null;
            setDayValue(val);
            setBirthday(prev => ({ ...prev, day: val }));
          }}
          setItems={() => {}}
          placeholder="일"
          style={{ height: 50, borderRadius: 12, width: 94 }}
          dropDownContainerStyle={{ borderRadius: 12, width: 94 }}
          zIndex={1000}
          zIndexInverse={3000}
        />
      </View>

      <View
        style={[
          styles.section,
          {
            marginTop: 5,
            flexDirection: 'row',
            zIndex: 100, // 드롭다운 겹침 방지
          },
        ]}
      >
        {/* 시 */}
        <DropDownPicker
          open={hourOpen}
          value={hourValue}
          items={hourItems}
          setOpen={open => {
            setHourOpen(open);
            if (open) {
              setYearOpen(false);
              setMonthOpen(false);
              setDayOpen(false);
              setMinuteOpen(false);
            }
          }}
          setValue={callback => {
            const val = callback(hourValue) as number | null;
            setHourValue(val);
            setBirthday(prev => ({ ...prev, hour: val }));
          }}
          setItems={() => {}}
          placeholder="시"
          style={{ height: 50, borderRadius: 12, width: 94 }}
          dropDownContainerStyle={{ borderRadius: 12, width: 94 }}
          zIndex={3000}
          zIndexInverse={1000}
        />

        {/* 분 */}
        <DropDownPicker
          open={minuteOpen}
          value={minuteValue}
          items={minuteItems}
          setOpen={open => {
            setMinuteOpen(open);
            if (open) {
              setYearOpen(false);
              setDayOpen(false);
              setMonthOpen(false);
              setHourOpen(false);
            }
          }}
          setValue={callback => {
            const val = callback(minuteValue) as number | null;
            setMinuteValue(val);
            setBirthday(prev => ({ ...prev, minute: val }));
          }}
          setItems={() => {}}
          placeholder="분"
          style={{ height: 50, borderRadius: 12, width: 94 }}
          dropDownContainerStyle={{ borderRadius: 12, width: 94 }}
          zIndex={2000}
          zIndexInverse={2000}
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
  dropdown: {

  },
  dropdownContainer: {
    flexGrow: 1,

  },
})