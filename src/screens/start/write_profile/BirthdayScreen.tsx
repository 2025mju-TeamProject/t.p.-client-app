import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import styles from './writeProfileStyles';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Ionicons';

type Birthday = {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  knowTime: boolean;
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
    if (noTime) {
      setOpenPicker(null);
      setHourValue(null);
      setMinuteValue(null);
    }
  }, [noTime]);

  // 드롭 박스
  const pickerStyle = {
    borderRadius: 12,
    height: 46,
    borderColor: '#111',
    backgroundColor: 'white',
    paddingLeft: 15,
    paddingHorizontal: 12,
  };

  const pickerDropdownStyle = {
    borderRadius: 12,
    borderColor: '#111',
    backgroundColor: 'white',
  };

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
          ]}>
          생년월일
        </Text>
      </View>

      <View style={[styles.section, { marginTop: 10, gap: 10 }]}>
        {/* 연 */}
        <DropDownPicker
          value={yearValue}
          items={yearItems}
          open={openPicker === 'year'}
          setOpen={(open) => setOpenPicker(open ? 'year' : null)}
          setValue={setYearValue}
          placeholder="연"
          placeholderStyle={{ color: '#B1B1B1' }}
          fontFamily="NanumSquareR"
          style={pickerStyle}
          containerStyle={{ width: '33%', zIndex: 5000  }}
          dropDownContainerStyle={{pickerDropdownStyle, zIndex: 5000}}


        />

        {/* 월 */}
        <DropDownPicker
          value={monthValue}
          items={monthItems}
          open={openPicker === 'month'}
          setOpen={(open) => setOpenPicker(open ? 'month' : null)}
          setValue={setMonthValue}
          placeholder="월"
          placeholderStyle={{ color: '#B1B1B1' }}
          fontFamily="NanumSquareR"
          style={pickerStyle}
          containerStyle={{ width: '30%', zIndex: 4000 }}
          dropDownContainerStyle={{ pickerDropdownStyle, zIndex: 4000 }}

        />

        {/* 일 */}
        <DropDownPicker
          value={dayValue}
          items={dayItems}
          open={openPicker === 'day'}
          setOpen={(open) => setOpenPicker(open ? 'day' : null)}
          setValue={setDayValue}
          placeholder="일"
          placeholderStyle={{ color: '#B1B1B1' }}
          fontFamily="NanumSquareR"
          style={pickerStyle}
          containerStyle={{ width: '30%', zIndex: 3000 }}
          dropDownContainerStyle={{ pickerDropdownStyle, zIndex: 3000 }}

        />
      </View>

      {/* 태어난 시간 */}
      <View style={[styles.section, { marginTop: 30 }]}>
        <Text
          style={[
            styles.subTitle,
            { fontFamily: 'NanumSquareB', color: '#111' },
          ]}>
          태어난 시간
        </Text>
      </View>

      <View style={[styles.section, { marginTop: 10, gap: 10 }]}>
        {/* 시 */}
        <DropDownPicker
          value={hourValue}
          items={hourItems}
          open={openPicker === 'hour' && !noTime}
          setOpen={(open) => !noTime && setOpenPicker(open ? 'hour' : null)}
          setValue={setHourValue}
          placeholder="시"
          placeholderStyle={{ color: '#B1B1B1' }}
          fontFamily="NanumSquareR"
          style={pickerStyle}
          containerStyle={{ width: '30%', zIndex: 2000 }}
          dropDownContainerStyle={{ pickerDropdownStyle, zIndex: 2000 }}

          // 활&비활 상태
          style={noTime ? disabledPickerStyle : activePickerStyle}
          dropDownContainerStyle={noTime ? disabledDropdown : activeDropdown}
          arrowIconStyle={{ tintColor: noTime ? '#979797' : '#111' }}
        />

        {/* 분 */}
        <DropDownPicker
          value={minuteValue}
          items={minuteItems}
          open={openPicker === 'minute' && !noTime}
          setOpen={(open) => !noTime && setOpenPicker(open ? 'minute' : null)}
          setValue={setMinuteValue}
          placeholder="분"
          placeholderStyle={{ color: '#B1B1B1' }}
          fontFamily="NanumSquareR"
          style={pickerStyle}
          containerStyle={{ width: '30%', zIndex: 1000 }}
          dropDownContainerStyle={{pickerDropdownStyle, zIndex: 1000 }}

          // 활&비활 상태
          style={noTime ? disabledPickerStyle : activePickerStyle}
          dropDownContainerStyle={noTime ? disabledDropdown : activeDropdown}
          arrowIconStyle={{ tintColor: noTime ? '#979797' : '#111' }}


        />
      </View>

      {/* 시간 모름 체크박스 */}
      <View
        style={[
          styles.section,
          { marginTop: 20, flexDirection: 'row', alignItems: 'center' },
        ]}>
        <TouchableOpacity
          onPress={() => setNoTime(!noTime)}
          style={[
            localStyles.checkbox,
            { borderColor: noTime ? '#111' : '#C7C7C7' },
          ]}>
          {noTime && <Icon name="checkmark" size={15} color="#111" />}
        </TouchableOpacity>

        <Text
          style={{
            fontFamily: 'NanumSquareB',
            color: '#111',
            fontSize: 12,
          }}>
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

// 활성화&비활성 드롭박스 스타일
const activePickerStyle = {
  borderRadius: 12,
  height: 46,
  borderColor: '#111',
  backgroundColor: 'white',
  paddingLeft: 15,
  paddingHorizontal: 12,
};

const disabledPickerStyle = {
  borderRadius: 12,
  height: 46,
  borderColor: '#E3E3E3',
  backgroundColor: '#FAFAFA',
  paddingLeft: 15,
  paddingHorizontal: 12,
};

const activeDropdown = {
  borderRadius: 12,
  borderColor: '#111',
  backgroundColor: 'white',
};

const disabledDropdown = {
  borderRadius: 12,
  borderColor: '#FAFAFA',
  backgroundColor: '#F2F2F2',
};

