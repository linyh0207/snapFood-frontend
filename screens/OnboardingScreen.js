import * as React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import WelcomeSwiper from '../components/Swiper/WelcomeSwiper';

export default function OnboardingScreen() {
  return <WelcomeSwiper />;
}

OnboardingScreen.navigationOptions = {
  header: null,
};
