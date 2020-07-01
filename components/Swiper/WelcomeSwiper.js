import React, { useState } from 'react';
import { View, Text, Dimensions, Image } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { t } from 'react-native-tailwindcss';
import logo from '../../assets/images/logos/white-logo.png';
import find from '../../assets/images/Onboarding/find.png';
import help from '../../assets/images/Onboarding/help.png';
import snap from '../../assets/images/Onboarding/snap.png';
// Icons made by Freepik from www.flaticon.com

export default function WelcomeSwiper() {
  const SCREEN_WIDTH = Dimensions.get('window').width;

  const Screen = ({ header, icon, description }) => (
    <View style={[t.flex1, t.justifyCenter, t.itemsCenter, t.mT8]}>
      <Image source={icon} style={{ width: 159, height: 159 }} />
      <Text style={[t.textWhite, t.text3xl, t.fontBold, t.mY4, t.textCenter]}>{header}</Text>
      <Text style={[t.textWhite, t.textLg, t.fontBold, t.mX8, t.textCenter, t.pX8]}>
        {description}
      </Text>
    </View>
  );

  const SCREENS = [
    <Screen
      header="Snap"
      icon={snap}
      description="Snap a photo of the discounted food from local grocery store."
    />,
    <Screen
      header="Find"
      icon={find}
      description="Find all the real-time discounted food deals near you."
    />,
    <Screen
      header="Help"
      icon={help}
      description="Help each other reduce food wastes and food costs."
    />,
  ];

  const [activeTab, setActiveTab] = useState(0);

  return (
    <View style={[t.flex1, t.justifyCenter, t.itemsCenter, t.bgGreen600]}>
      <Image source={logo} style={[t.mT6]} />
      <Carousel
        data={SCREENS}
        renderItem={({ item }) => item}
        onSnapToItem={(i) => setActiveTab(i)}
        sliderWidth={SCREEN_WIDTH}
        itemWidth={SCREEN_WIDTH}
        slideStyle={{ width: SCREEN_WIDTH }}
        inactiveSlideOpacity={1}
        inactiveSlideScale={1}
      />

      <Pagination
        dotsLength={SCREENS.length}
        containerStyle={[t.bgGreen600]}
        dotStyle={[t.w2, t.h2, t.mX2, t.bgGreen100]}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
        activeDotIndex={activeTab}
      />
    </View>
  );
}
