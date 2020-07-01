import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';

import Colors from '../constants/Colors';

export default function TabBarIcon({ name, focused }) {
  return (
    <Ionicons
      name={name}
      size={30}
      style={{ marginBottom: -3 }}
      color={focused ? '#22543d' : Colors.tabIconDefault}
    />
  );
}
