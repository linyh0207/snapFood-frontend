import React, { useState } from 'react';
import { View, Text, Dimensions, Image } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { MaterialIcons, FontAwesome5, FontAwesome } from '@expo/vector-icons';
import { t } from 'react-native-tailwindcss';
import logo from '../../assets/images/logo.png';

export default function WelcomeSwiper() {
  const SCREEN_WIDTH = Dimensions.get('window').width;

  const Screen = ({ header, icon, description }) => (
    <View style={[t.flex1, t.justifyCenter, t.itemsCenter, t.mX5]}>
      {icon}
      <Text style={[t.textWhite, t.text3xl, t.fontBold, t.mY4, t.textCenter]}>{header}</Text>
      <Text style={[t.textWhite, t.textLg, t.fontBold, t.mX8, t.textCenter]}>{description}</Text>
    </View>
  );

  const SCREENS = [
    <Screen
      header="Snap"
      icon={<MaterialIcons name="photo-camera" size={60} color="white" />}
      description="Snap a photo of the discounted food item from your local grocery store."
    />,
    <Screen
      header="Find"
      icon={<FontAwesome name="search" size={60} color="white" />}
      description="Find all the real-time discounted food deals near you."
    />,
    <Screen
      header="Help"
      icon={<FontAwesome5 name="hands-helping" size={60} color="white" />}
      description="Help each other to reduce the food wastes and food costs."
    />,
  ];

  const [activeTab, setActiveTab] = useState(0);

  return (
    <View style={[t.flex1, t.justifyCenter, t.itemsCenter, t.bgGreen600]}>
      <Image source={logo} style={{ width: 305, height: 159 }} />
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
