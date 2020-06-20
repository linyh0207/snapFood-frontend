import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import { Platform, StatusBar, View } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { t } from 'react-native-tailwindcss';
import useCachedResources from './hooks/useCachedResources';

import LinkingConfiguration from './navigation/LinkingConfiguration';
import Onboarding from './screens/OnboardingScreen';
import DrawerNavigator from './navigation/DrawerNavigator';

export default function App(props) {
  const isLoadingComplete = useCachedResources();

  // Authentication flow set up pending
  const isAuth = false;
  // true - home screen
  // false - login/signup onboarding screen

  if (!isLoadingComplete) {
    return null;
  }
  return (
    <PaperProvider>
      <View style={[t.flex1, t.bgWhite]}>
        {Platform.OS === 'ios' && <StatusBar barStyle="dark-content" />}
        <NavigationContainer linking={LinkingConfiguration}>
          {isAuth && <DrawerNavigator />}
          {!isAuth && <Onboarding />}
        </NavigationContainer>
      </View>
    </PaperProvider>
  );
}
