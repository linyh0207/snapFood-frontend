import * as React from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
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

      {/* Sample Snackbar */}
      <SnackBar />
    </View>
  );
}

HomeScreen.navigationOptions = {
  header: null,
};

function handleButtonPress() {
  Alert.alert('clicked');
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 30,
  },
});
