import React from 'react';
import { View } from 'react-native';

type Props = {
  step: number;
  total: number;
};

export default function SignUpProgressBar({ step, total }: Props) {
  const percent = (step / total) * 100;

  return (
    <View
      style={{
        width: '100%',
        height: 5,
        backgroundColor: '#F7F7F7',
        borderRadius: 3,
        overflow: 'hidden',
        borderRadius: 12,
      }}
    >
      <View
        style={{
          width: `${percent}%`,
          height: '100%',
          backgroundColor: '#FF8C86',
        }}
      />
    </View>
  );
}
