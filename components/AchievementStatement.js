import React from 'react';
import { Text } from 'react-native';
import { t } from 'react-native-tailwindcss';

export default function AchievementStatement({ style = [], children }) {
  return (
    <Text style={[t.border, t.p3, t.m3, t.textCenter, t.textLg, t.fontBold, t.roundedLg, ...style]}>
      {children}
    </Text>
  );
}
