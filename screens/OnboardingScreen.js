import * as React from 'react';
import { useState } from 'react';
import { View } from 'react-native';
import { t } from 'react-native-tailwindcss';
import { Modal, Portal, Text, TextInput, HelperText } from 'react-native-paper';
import WelcomeSwiper from '../components/Swiper/WelcomeSwiper';
import StyledButton from '../components/StyledButton';

export default function OnboardingScreen() {
  // Manage login states
  const [loginModalVisible, setloginModalVisibility] = useState(false);
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const showLoginModal = () => setloginModalVisibility(true);
  const hideLoginModal = () => setloginModalVisibility(false);

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
            onChangeText={(text) => setLoginPassword(text)}
          />
          <Text style={[t.textRight, t.pT1, t.pB1]} onPress={handleForgotPasswordPress}>
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

OnboardingScreen.navigationOptions = {
  header: null,
};

// Pending
function handleForgotPasswordPress() {}

// Trigger Authentication
function handleLoginPress() {}

// Trigger Registration
function handleSignUpPress() {}
