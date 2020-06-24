import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { Platform, StatusBar, View, AsyncStorage } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { t } from 'react-native-tailwindcss';
import useCachedResources from './hooks/useCachedResources';
import OnboardingScreen from './screens/OnboardingScreen';
import DrawerNavigator from './navigation/DrawerNavigator';
import { AuthContext, reducer, initialState } from './state/auth/authContext';
import * as actionTypes from './state/auth/actionTypes';
import api from './constants/Api';
import axios from 'axios';
import { useReducer } from 'react';

const Stack = createStackNavigator();

export default function App() {
  const isLoadingComplete = useCachedResources();
  const [authState, authDispatch] = useReducer(reducer, initialState);

  const authMemo = React.useMemo(
    () => ({
      login: (email, password) => {
        axios
          .post(api.LOGIN, { email, password })
          .then((res) => {
            AsyncStorage.setItem('userId', res.user.id).catch((err) => console.log(err));
            AsyncStorage.setItem('userToken', res.token).catch((err) => console.log(err));
            authDispatch({ type: actionTypes.LOGIN, id: res.user.id, token: res.token });
          })
          .catch((err) => console.log(err));
      },
      logout: () => {
        AsyncStorage.removeItem('userId').catch((err) => console.log(err));
        AsyncStorage.removeItem('userToken').catch((err) => console.log(err));
        authDispatch({ type: actionTypes.LOGOUT });
      },
      register: (name, email, password) => {
        axios
          .post(api.REGISTER, { name, email, password })
          .then((res) => {
            AsyncStorage.setItem('userId', res.user.id).catch((err) => console.log(err));
            AsyncStorage.setItem('userToken', res.token).catch((err) => console.log(err));
            authDispatch({ type: actionTypes.REGISTER, id: res.user.id, token: res.token });
          })
          .catch((err) => console.log(err));
      },
    }),
    []
  );

  React.useEffect(async () => {
    let userId = null;
    let userToken = null;
    try {
      userId = await AsyncStorage.getItem('userId');
      userToken = await AsyncStorage.getItem('userToken');
    } catch (err) {
      console.log(err);
    }
    authDispatch({ type: actionTypes.RETRIEVE_TOKEN, id: userId, token: userToken });
  }, []);

  // Authentication flow set up pending
  let isAuth;
  if (authState.userId === null) {
    isAuth = false;
  } else {
    isAuth = true;
  }

  // true: home screen ; false: login/signup onboarding screen
  // need to manually RELOAD the app to update initialRoute

  if (!isLoadingComplete) {
    return null;
  }
  return (
    <PaperProvider>
      <AuthContext.Provider value={authMemo}>
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
