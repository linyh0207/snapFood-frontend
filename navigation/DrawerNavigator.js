import * as React from 'react';
import { View } from 'react-native';
import { Avatar } from 'react-native-paper';
import { t } from 'react-native-tailwindcss';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import BottomTabNavigator from './BottomTabNavigator';
import OnboardingScreen from '../screens/OnboardingScreen';
import UserName from '../components/TopBar/UserName';
import { FAKE_USER } from '../utils/fakeData';

const Drawer = createDrawerNavigator();

// Add drawer navigator header
function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <View style={[t.flex1, t.flexRow, t.p8, t.itemsCenter, t.bgGreen600]}>
        <UserName
          styles={[t.pX1]}
          textStyles={[t.text2xl, t.textWhite]}
          status="super"
          iconColor="gold"
        >
          {FAKE_USER.name}
        </UserName>
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(items) => <CustomDrawerContent {...items} />}
      drawerContentOptions={{
        activeTintColor: '#22543d',
        labelStyle: { fontSize: 15 },
      }}
    >
      <Drawer.Screen
        name="Home"
        component={BottomTabNavigator}
        options={{
          drawerIcon: () => <Avatar.Icon size={30} icon="home" />,
        }}
      />
      <Drawer.Screen
        name="My Posts"
        component={BottomTabNavigator}
        options={{
          drawerIcon: () => <Avatar.Icon size={30} icon="folder-multiple-image" />,
        }}
      />
      <Drawer.Screen
        name="My Achievements"
        component={BottomTabNavigator}
        options={{
          drawerIcon: () => <Avatar.Icon size={30} icon="trophy" />,
        }}
      />
      <Drawer.Screen
        name="Logout"
        component={OnboardingScreen}
        options={{
          drawerIcon: () => <Avatar.Icon size={30} icon="logout" />,
        }}
      />
    </Drawer.Navigator>
  );
}
