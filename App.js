import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { Platform, StatusBar, View } from 'react-native';
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

export default function App(props) {
  const isLoadingComplete = useCachedResources();
  const [authState, authDispatch] = useReducer(reducer, initialState);

  const authMemo = React.useMemo(() => {
    login: (email, password) => {
      axios
        .post(api.LOGIN, { email, password })
        .then((res) => {
          authDispatch({ type: actionTypes.LOGIN, id: res.user.id, token: res.token });
        })
        .catch((err) => console.log(err));
    };
    logout: () => {
      authDispatch({ type: actionTypes.LOGOUT });
    };
    register: (name, email, password) => {
      axios
        .post(api.REGISTER, { name, email, password })
        .then((res) => {
          authDispatch({ type: actionTypes.REGISTER, id: res.user.id, token: res.token });
        })
        .catch((err) => console.log(err));
    };
  }, []);

  // Authentication flow set up pending
  const isAuth = true;
  // true: home screen ; false: login/signup onboarding screen
  // need to manually RELOAD the app to update initialRoute

  if (!isLoadingComplete) {
    return null;
  }
  return (
    <AuthContext.Provider value={authMemo}>
      <PaperProvider>
        <View style={[t.flex1, t.bgWhite]}>
          {Platform.OS === 'ios' && <StatusBar barStyle="dark-content" />}
          <NavigationContainer>
            <Stack.Navigator initialRouteName={authState.isAuth ? 'Home' : 'Onboarding'}>
              <Stack.Screen name="Onboarding" component={OnboardingScreen} />
              <Stack.Screen name="Home" component={DrawerNavigator} />
            </Stack.Navigator>
          </NavigationContainer>
        </View>
      </PaperProvider>
    </AuthContext.Provider>
  );
}
