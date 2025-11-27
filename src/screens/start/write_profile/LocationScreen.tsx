import React, { useState } from 'react';
import { Text, View } from 'react-native';
import styles from './writeProfileStyles';
import DropDownPicker from 'react-native-dropdown-picker';
import { regions } from './regions';

function IntroductionScreen() {
  const [sidoOpen, setSidoOpen] = useState(false);
  const [gunguOpen, setGunguOpen] = useState(false);

  const [sido, setSido] = useState<string | null>(null);
  const [gungu, setGungu] = useState<string | null>(null);

  const sidoItems = Object.keys(regions).map(s => ({
    label: s,
    value: s,
  }));

  const gunguItems = sido
    ? regions[sido].map(g => ({ label: g, value: g }))
    : [];

  return (
    <View style={styles.container}>
      {/* 제목 */}
      <View style={[styles.section, { marginTop: 30, marginBottom: 10 }]}>
        <Text style={styles.title}>{'활동하는 지역은 어디인가요?'}</Text>
      </View>

      {/* 라벨 */}
      <View style={[styles.section, { marginTop: 30, flexDirection: 'row' }]}>
        <View style={{ marginLeft: 5, width: '50%', marginBottom: 10 }}>
          <Text style={styles.boldText}>시/도 선택</Text>
        </View>
        <View style={{ marginLeft: 5, width: '50%', marginBottom: 10 }}>
          <Text style={styles.boldText}>시/군/구 선택</Text>
        </View>
      </View>

      {/* 드롭다운 */}
      <View style={[styles.section, { marginTop: 5, justifyContent: 'space-between' }]}>

        {/* 시/도 */}
        <DropDownPicker
          open={sidoOpen}
          value={sido}
          items={sidoItems}
          setOpen={(cb) => {
            const next = typeof cb === 'function' ? cb(sidoOpen) : cb;
            setSidoOpen(next);
            if (next) setGunguOpen(false);
          }}
          setValue={setSido}
          placeholder="선택"
          placeholderStyle={{ color: '#B1B1B1' }}
          fontFamily="NanumSquareR"
          style={{
            borderColor: '#111',
            borderWidth: 1,
            height: 46,
            borderRadius: 12,
            paddingHorizontal: 12,
            zIndex: 5000,
          }}
          containerStyle={{ width: '48%', zIndex: 5000 }}
          dropDownContainerStyle={{
            borderColor: '#111',
            borderWidth: 1,
            borderRadius: 12,
            zIndex: 5000,
          }}
        />

        {/* 군/구 */}
        <DropDownPicker
          open={gunguOpen}
          value={gungu}
          items={gunguItems}
          setOpen={(cb) => {
            const next = typeof cb === 'function' ? cb(gunguOpen) : cb;
            setGunguOpen(next);
            if (next) setSidoOpen(false);
          }}
          setValue={setGungu}
          placeholder="선택"
          placeholderStyle={{ color: '#B1B1B1' }}
          fontFamily="NanumSquareR"
          style={{
            borderColor: '#111',
            borderWidth: 1,
            height: 46,
            borderRadius: 12,
            paddingHorizontal: 12,
            zIndex: 4000,
          }}
          containerStyle={{ width: '48%', zIndex: 4000 }}
          dropDownContainerStyle={{
            borderColor: '#111',
            borderWidth: 1,
            borderRadius: 12,
            zIndex: 4000,
          }}
          disabled={!sido}
        />

      </View>
    </View>
  );
}

export default IntroductionScreen;
