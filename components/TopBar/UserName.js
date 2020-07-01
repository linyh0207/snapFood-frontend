import * as React from 'react';
import { Text, View } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { t } from 'react-native-tailwindcss';

export default function UserName({
  status,
  children,
  textStyles = [],
  styles = [],
  iconColor = 'black',
}) {
  return (
    <View style={[t.flex, t.flexRow, t.itemsCenter, ...styles]}>
      <Text style={[t.pR1, ...textStyles]}>{children}</Text>
      {status === 'super' && <FontAwesome5 name="crown" size={16} color={iconColor} />}
    </View>
  );
}
