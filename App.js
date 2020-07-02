import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { Platform, StatusBar, View } from 'react-native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { t } from 'react-native-tailwindcss';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import useCachedResources from './hooks/useCachedResources';
import OnboardingScreen from './screens/OnboardingScreen';
import DrawerNavigator from './navigation/DrawerNavigator';

const Stack = createStackNavigator();

export default function App(props) {
  const isLoadingComplete = useCachedResources();

  // Authentication flow set up pending
  const isAuth = false;
  // true: home screen ; false: login/signup onboarding screen
  // need to manually RELOAD the app to update initialRoute

  if (!isLoadingComplete) {
    return null;
  }

  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: '#22543d',
      accent: '#22543d',
    },
  };
  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <View style={[t.flex1, t.bgWhite]}>
          {Platform.OS === 'ios' && <StatusBar barStyle="dark-content" />}
          <NavigationContainer>
            <Stack.Navigator initialRouteName={isAuth ? 'Home' : 'Onboarding'} headerMode="none">
              <Stack.Screen
                name="Onboarding"
                component={OnboardingScreen}
                options={{ gesturesEnabled: false }}
              />
              <Stack.Screen name="Home" component={DrawerNavigator} />
            </Stack.Navigator>
          </NavigationContainer>
        </View>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
