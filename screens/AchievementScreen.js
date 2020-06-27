import * as React from 'react';
import { View } from 'react-native';
import { t } from 'react-native-tailwindcss';
import { Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import UserName from '../components/TopBar/UserName';
import AchievementStatement from '../components/AchievementStatement';
import StyledButton from '../components/StyledButton';

export default function AchievementScreen() {
  // For account button to open drawer navigator
  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <View style={[t.flex, t.flexRow, t.itemsCenter, t.p2]}>
        <StyledButton icon="account" size="small" onPress={() => navigation.openDrawer()} />
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
    </SafeAreaView>
  );
}
