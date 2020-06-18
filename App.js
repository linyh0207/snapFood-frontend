import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { Platform, StatusBar, View } from 'react-native';
import { Provider as PaperProvider, Headline, Avatar } from 'react-native-paper';
import { t } from 'react-native-tailwindcss';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import useCachedResources from './hooks/useCachedResources';
import BottomTabNavigator from './navigation/BottomTabNavigator';
import LinkingConfiguration from './navigation/LinkingConfiguration';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function Root() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={BottomTabNavigator} />
    </Stack.Navigator>
  );
}

// Add drawer navigator header
function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <View style={[t.flex1, t.flexRow, t.p8, t.itemsCenter, t.bgGreen600]}>
        <Headline style={[t.pR2]}>Username</Headline>
        <Avatar.Icon size={24} icon="crown" />
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

export default function App(props) {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  }
  return (
    <PaperProvider>
      <View style={[t.flex1, t.bgWhite]}>
        {Platform.OS === 'ios' && <StatusBar barStyle="dark-content" />}
        <NavigationContainer linking={LinkingConfiguration}>
          <Drawer.Navigator
            initialRouteName="Home"
            drawerContent={(items) => <CustomDrawerContent {...items} />}
          >
            <Drawer.Screen
              name="My Posts"
              component={Root}
              options={{
                drawerIcon: () => <Avatar.Icon size={24} icon="folder-multiple-image" />,
              }}
            />
            <Drawer.Screen
              name="My Achievements"
              component={Root}
              options={{
                drawerIcon: () => <Avatar.Icon size={24} icon="trophy" />,
              }}
            />
            <Drawer.Screen
              name="Logout"
              component={Root}
              options={{
                drawerIcon: () => <Avatar.Icon size={24} icon="logout" />,
              }}
            />
          </Drawer.Navigator>
        </NavigationContainer>
      </View>
    </PaperProvider>
  );
}
