import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import styles from './writeProfileStyles';
import DropDownPicker from 'react-native-dropdown-picker';
import { regions } from './regions';

type Props = {
  setParentSido: (value: string) => void;
  setParentGungu: (value: string) => void;
}

function IntroductionScreen({ setParentSido, setParentGungu }: Props) {
  const [sidoOpen, setSidoOpen] = useState<boolean>(false);
  const [gunguOpen, setGunguOpen] = useState<boolean>(false);

  const [sido, setSido] = useState<string | null>(null);
  const [gungu, setGungu] = useState<string | null>(null);

  useEffect(() => {
    setParentSido(sido !== null ? sido : '')
    setParentGungu(gungu !== null ? gungu : '')
  }, [sido, gungu]);

  const sidoItems = Object.keys(regions).map(s => ({
    label: s,
    value: s,
  }));

  const gunguItems = sido ? regions[sido].map(g => ({ label: g, value: g })) : [];

  return (
    <View style={styles.container}>
      <View style={[styles.section, { marginTop: 30 }]}>
        <Text style={styles.title}>{'주로 활동하는\n지역은 어디인가요?'}</Text>
      </View>

      <View style={[styles.section, { marginTop: 30, flexDirection: 'row' }]}>
        <View style={{ marginLeft: 5, width: '50%' }}>
          <Text style={{ fontSize: 12, fontWeight: 400 }}>시 / 도 선택</Text>
        </View>
        <View style={{ marginLeft: 5, width: '50%' }}>
          <Text style={{ fontSize: 12, fontWeight: 400 }}>
            시 / 군 / 구 선택
          </Text>
        </View>
      </View>

      <View
        style={[
          styles.section,
          { marginTop: 5, justifyContent: 'space-between' },
        ]}
      >
        {/* 시/도 */}
        <DropDownPicker
          open={sidoOpen}
          value={sido}
          items={sidoItems}
          setOpen={cb => {
            const next = typeof cb === 'function' ? cb(sidoOpen) : cb;
            setSidoOpen(next);
            if (next) setGunguOpen(false);
          }}
          setValue={setSido}
          placeholder="선택"
          placeholderStyle={{ color: '#B1B1B1' }}
          containerStyle={{ width: '48%' }}
        />

        {/* 군/구 */}
        <DropDownPicker
          open={gunguOpen}
          value={gungu}
          items={gunguItems}
          setOpen={cb => {
            const next = typeof cb === 'function' ? cb(gunguOpen) : cb;
            setGunguOpen(next);
            if (next) setSidoOpen(false);
          }}
          setValue={setGungu}
          placeholder="선택"
          placeholderStyle={{ color: '#B1B1B1' }}
          containerStyle={{ width: '48%' }}
          disabled={!sido}
        />
      </View>
    </View>
  );
}

export default IntroductionScreen;
