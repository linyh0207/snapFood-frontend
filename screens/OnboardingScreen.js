import * as React from 'react';
import { useState } from 'react';
import { View, AsyncStorage } from 'react-native';
import { t } from 'react-native-tailwindcss';
import { Modal, Portal, Text, TextInput, HelperText } from 'react-native-paper';
import WelcomeSwiper from '../components/Swiper/WelcomeSwiper';
import StyledButton from '../components/StyledButton';
import { AuthContext } from '../state/auth/authContext';
import api from '../constants/Api';
import actionTypes from '../state/auth/actionTypes';

export default function OnboardingScreen({ navigation }) {
  const { authState, authDispatch } = React.useContext(AuthContext);
  // Manage login states
  const [loginModalVisible, setLoginModalVisibility] = useState(false);
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const showLoginModal = () => setLoginModalVisibility(true);
  const hideLoginModal = () => setLoginModalVisibility(false);

  // Manage signup states
  const [signUpModalVisible, setSignUpModalVisibility] = useState(false);
  const [signUpUsername, setSignUpUsername] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const showSignUpModal = () => setSignUpModalVisibility(true);
  const hideSignUpModal = () => setSignUpModalVisibility(false);
  const handleCreateAnAccount = () => {
    hideLoginModal();
    showSignUpModal();
  };
  const hasErrors = (email) => {
    return !email.includes('@');
  };

  // Trigger Authentication
  const handleLoginPress = async () => {
    const response = await fetch(api.LOGIN, {
      body: JSON.stringify({ email: loginUsername, password: loginPassword }),
      headers: {
        'content-type': 'application/json',
      },
      method: 'POST',
    });
    const text = await response.text();
    console.log(text);
    const res = await JSON.parse(text);
    console.log(res);
    await AsyncStorage.setItem('user', res.user).catch((err) => console.log(err));
    await AsyncStorage.setItem('userToken', res.token).catch((err) => console.log(err));
    await authDispatch({ type: actionTypes.LOGIN, user: res.user, token: res.token });
    console.log(authState);
    hideLoginModal();
    //navigation.navigate('Home');
    // After Authenticattion
    // Direct to Drawer Navigator
  };

  // Pending
  const handleForgotPasswordPress = () => {};

  // Trigger Registration
  const handleSignUpPress = async () => {
    const response = await fetch(api.REGISTER, {
      body: JSON.stringify({ name: signUpUsername, email: signUpEmail, password: signUpPassword }),
      headers: {
        'content-type': 'application/json',
      },
      method: 'POST',
    });
    const text = await response.text();
    console.log(text);
    const res = await JSON.parse(text);
    console.log(res);
    await AsyncStorage.setItem('user', res.user).catch((err) => console.log(err));
    await AsyncStorage.setItem('userToken', res.token).catch((err) => console.log(err));
    await authDispatch({ type: actionTypes.REGISTER, user: res.user, token: res.token });
    console.log(authState);
    hideSignUpModal();
    //navigation.navigate('Home');
    // Once the register done
    // Direct to Drawer Navigator
    // hideSignUpModal();
    // navigation.navigate('Home');
  };

  return (
    <View style={[t.flex1, t.justifyCenter, t.itemsCenter, t.bgGreen600]}>
      {/* Onboarding swiper slider */}
      <WelcomeSwiper />
      {/* Login Modal */}
      <Portal>
        <Modal
          contentContainerStyle={[t.bgWhite, t.p8]}
          visible={loginModalVisible}
          onDismiss={hideLoginModal}
        >
          <TextInput
            label="Username"
            value={loginUsername}
            onChangeText={(text) => setLoginUsername(text)}
          />
          <TextInput
            label="Password"
            value={loginPassword}
            secureTextEntry
            onChangeText={(text) => setLoginPassword(text)}
          />
          <Text style={[t.textRight, t.pT1, t.pB1]} onPress={() => handleForgotPasswordPress}>
            Forgot Password?
          </Text>
          <StyledButton title="Login" mode="outlined" size="small" onPress={handleLoginPress} />
          <Text style={[t.textCenter, t.pTPx]} onPress={handleCreateAnAccount}>
            Create An Account
          </Text>
        </Modal>
      </Portal>
      {/* Sign Up Modal */}
      <Portal>
        <Modal
          contentContainerStyle={[t.bgWhite, t.p8]}
          visible={signUpModalVisible}
          onDismiss={hideSignUpModal}
        >
          <TextInput
            label="Username"
            value={signUpUsername}
            onChangeText={(text) => setSignUpUsername(text)}
          />
          <TextInput
            label="Password"
            value={signUpPassword}
            secureTextEntry
            onChangeText={(text) => setSignUpPassword(text)}
          />
          <TextInput
            label="Email"
            value={signUpEmail}
            onChangeText={(text) => setSignUpEmail(text)}
          />
          <HelperText type="error" visible={hasErrors(signUpEmail)}>
            Email address is invalid!
          </HelperText>
          <StyledButton
            title="Sign Up Now"
            mode="outlined"
            size="small"
            onPress={handleSignUpPress}
          />
        </Modal>
      </Portal>
      {/* Login and Sign Up Buttons */}
      <StyledButton title="Login" mode="contained" bordered onPress={showLoginModal} />
      <StyledButton title="Sign Up" mode="outlined" bordered onPress={showSignUpModal} />
    </View>
  );
}
