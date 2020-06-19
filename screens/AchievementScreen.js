import * as React from 'react';
import { useState } from 'react';
import { View } from 'react-native';
import { t } from 'react-native-tailwindcss';
import { Modal, Portal, Text, TextInput, HelperText, Avatar } from 'react-native-paper';
import UserName from '../components/TopBar/UserName';

export default function AchievementScreen() {
  return (
    <View style={[t.flex, t.flexRow, t.itemsCenter, t.p2]}>
      <Avatar.Icon icon="account" size={36} style={[t.p0]} />
      <UserName styles={[t.pX1]} textStyles={[t.textLg]} status="super">
        UserName
      </UserName>
    </View>
  );
}
