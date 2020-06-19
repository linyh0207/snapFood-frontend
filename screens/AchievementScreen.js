import * as React from 'react';
import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { t } from 'react-native-tailwindcss';
import { Modal, Portal, Text, TextInput, HelperText, Avatar, Button } from 'react-native-paper';
import UserName from '../components/TopBar/UserName';
import AchievementStatement from '../components/AchievementStatement';

export default function AchievementScreen() {
  return (
    <View>
      <View style={[t.flex, t.flexRow, t.itemsCenter, t.p2]}>
        <Avatar.Icon icon="account" size={36} style={[t.p0]} />
        <UserName styles={[t.pX1]} textStyles={[t.textLg]} status="super">
          UserName
        </UserName>
      </View>
      <Text style={[t.border, t.p3, t.m3, t.textCenter, t.textLg, t.fontBold, t.roundedLg]}>
        This is a test
      </Text>
      <AchievementStatement>
        This a second <Text style={[t.textRed400]}>test</Text>{' '}
      </AchievementStatement>
    </View>
  );
}
