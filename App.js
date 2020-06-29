import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { Platform, StatusBar, View, AsyncStorage } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { t } from 'react-native-tailwindcss';
import { useReducer } from 'react';
import useCachedResources from './hooks/useCachedResources';
import OnboardingScreen from './screens/OnboardingScreen';
import DrawerNavigator from './navigation/DrawerNavigator';
import { AuthContext, reducer, initialState } from './state/auth/authContext';
import * as actionTypes from './state/auth/actionTypes';

const Stack = createStackNavigator();

export default function App() {
  const isLoadingComplete = useCachedResources();
  const [authState, authDispatch] = useReducer(reducer, initialState);

  // const authMemo = React.useMemo(
  //   () => ({
  //     login: (email, password) => {
  //       axios
  //         .post(api.LOGIN, { email, password })
  //         .then((res) => {
  //           AsyncStorage.setItem('user', res.user).catch((err) => console.log(err));
  //           AsyncStorage.setItem('userToken', res.token).catch((err) => console.log(err));
  //           authDispatch({ type: actionTypes.LOGIN, user: res.user, token: res.token });
  //         })
  //         .catch((err) => console.log(err));
  //     },
  //     logout: () => {
  //       AsyncStorage.removeItem('user').catch((err) => console.log(err));
  //       AsyncStorage.removeItem('userToken').catch((err) => console.log(err));
  //       authDispatch({ type: actionTypes.LOGOUT });
  //     },
  //     register: (name, email, password) => {
  //       axios
  //         .post(api.REGISTER, { name, email, password })
  //         .then((res) => {
  //           AsyncStorage.setItem('user', res.user).catch((err) => console.log(err));
  //           AsyncStorage.setItem('userToken', res.token).catch((err) => console.log(err));
  //           authDispatch({ type: actionTypes.REGISTER, user: res.user, token: res.token });
  //         })
  //         .catch((err) => console.log(err));
  //     },
  //   }),
  //   []
  // );

  let isAuth = false;
  React.useEffect(() => {
    let user = null;
    let userToken = null;
    user = AsyncStorage.getItem('user').catch((err) => console.log(err));
    userToken = AsyncStorage.getItem('userToken').catch((err) => console.log(err));
    authDispatch({ type: actionTypes.RETRIEVE_TOKEN, user, token: userToken });
  }, []);

  // Authentication flow set up pending

  // true: home screen ; false: login/signup onboarding screen
  // need to manually RELOAD the app to update initialRoute

  if (!isLoadingComplete) {
    return null;
  }
  return (
    <PaperProvider>
      <AuthContext.Provider value={{ authState, authDispatch }}>
        <View style={[t.flex1, t.bgWhite]}>
          {Platform.OS === 'ios' && <StatusBar barStyle="dark-content" />}
          <NavigationContainer>
            <Stack.Navigator initialRouteName={isAuth ? 'Home' : 'Onboarding'}>
              <Stack.Screen name="Onboarding" component={OnboardingScreen} />
              <Stack.Screen name="Home" component={DrawerNavigator} />
            </Stack.Navigator>
          </NavigationContainer>
        </View>
      </AuthContext.Provider>
    </PaperProvider>
  );
}
