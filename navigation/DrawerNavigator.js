import * as React from 'react';
import { View, AsyncStorage } from 'react-native';
import { Headline, Avatar } from 'react-native-paper';
import { t } from 'react-native-tailwindcss';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import BottomTabNavigator from './BottomTabNavigator';
import AchievementScreen from '../screens/AchievementScreen';
import MyPostsScreen from '../screens/MyPostsScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import { AuthContext } from '../state/auth/authContext';
import actionTypes from '../state/auth/actionTypes';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  const { authState, authDispatch } = React.useContext(AuthContext);
  console.log(authState);
  // Add drawer navigator header
  function CustomDrawerContent(props) {
    return (
      <DrawerContentScrollView {...props}>
        <View style={[t.flex1, t.flexRow, t.p8, t.itemsCenter, t.bgGreen600]}>
          <Headline style={[t.pR2]}>{authState.user}</Headline>
          <Avatar.Icon size={24} icon="crown" />
        </View>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
    );
  }

  return (
    <Drawer.Navigator drawerContent={(items) => <CustomDrawerContent {...items} />}>
      <Drawer.Screen
        name="Home"
        component={BottomTabNavigator}
        options={{
          drawerIcon: () => <Avatar.Icon size={24} icon="home" />,
        }}
      />
      <Drawer.Screen
        name="My Posts"
        component={MyPostsScreen}
        options={{
          drawerIcon: () => <Avatar.Icon size={24} icon="folder-multiple-image" />,
        }}
      />
      <Drawer.Screen
        name="My Achievements"
        component={AchievementScreen}
        options={{
          drawerIcon: () => <Avatar.Icon size={24} icon="trophy" />,
        }}
      />
      <Drawer.Screen
        name="Logout"
        component={OnboardingScreen}
        onPress={() => {
          AsyncStorage.removeItem('user').catch((err) => console.log(err));
          AsyncStorage.removeItem('userToken').catch((err) => console.log(err));
          authDispatch({ type: actionTypes.LOGOUT });
        }}
        options={{
          drawerIcon: () => <Avatar.Icon size={24} icon="logout" />,
        }}
      />
    </Drawer.Navigator>
  );
}
