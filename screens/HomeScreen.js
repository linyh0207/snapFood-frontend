import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Platform, StyleSheet, Text, View, Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { MonoText } from '../components/StyledText';
import StyledButton from '../components/StyledButton';
import DropDownMenu from '../components/DropDownMenu';
import SnackBar from '../components/SnackBar';

export default function HomeScreen() {
  // For account button to open drawer navigator
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        {/* Login & SignUp Onboarding page  */}
        <StyledButton title="Login" mode="contained" bordered onPress={handleButtonPress} />
        <StyledButton title="Sign Up" mode="outlined" bordered onPress={handleButtonPress} />

        {/* Basic buttons  */}
        <StyledButton title="Sign Up" mode="outlined" size="small" onPress={handleButtonPress} />
        <StyledButton title="Login" mode="outlined" size="small" onPress={handleButtonPress} />
        <DropDownMenu />

        {/* Account Button to open drawer navigator */}
        <StyledButton
          icon="account"
          title="Account"
          size="small"
          onPress={() => navigation.openDrawer()}
        />
      </ScrollView>
      <SnackBar />
    </View>
  );
}

HomeScreen.navigationOptions = {
  header: null,
};

function DevelopmentModeNotice() {
  if (__DEV__) {
    const learnMoreButton = (
      <Text onPress={handleLearnMorePress} style={styles.helpLinkText}>
        Learn more
      </Text>
    );

    return (
      <Text style={styles.developmentModeText}>
        Development mode is enabled: your app will be slower but you can use useful development
        tools. {learnMoreButton}
      </Text>
    );
  }
  return (
    <Text style={styles.developmentModeText}>
      You are not in development mode: your app will run at full speed.
    </Text>
  );
}

function handleLearnMorePress() {
  WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/workflow/development-mode/');
}

function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/get-started/create-a-new-app/#making-your-first-change'
  );
}

function handleButtonPress() {
  Alert.alert('clicked');
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
