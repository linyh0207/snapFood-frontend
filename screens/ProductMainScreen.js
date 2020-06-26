import * as React from 'react';
import { useState } from 'react';
import { View, Dimensions } from 'react-native';
import { Portal, Modal, TextInput, Text, Title, HelperText } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import { t } from 'react-native-tailwindcss';
import { SafeAreaView } from 'react-native-safe-area-context';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { MaterialIcons, FontAwesome5, FontAwesome } from '@expo/vector-icons';
import StyledButton from '../components/StyledButton';
import SortByMenu from '../components/DropDownMenu/SortByMenu';
import StoresMenu from '../components/DropDownMenu/StoresMenu';
import SnackBar from '../components/SnackBar';
import ProductMainCard from '../components/ProductMainCard';
import LikedCounter from '../components/LikedCounter';
import Map from '../components/Map';

export default function ProductMainScreen({ navigation }) {
  const SCREEN_WIDTH = Dimensions.get('window').width;

  const Screen = ({ header, icon, description }) => (
    // <View style={[t.flex1, t.justifyCenter, t.itemsCenter, t.bgGreen600]}>
    <View style={{ backgroundColor: 'blue' }}>{icon}</View>
    // {icon}
    //   {/* <Text style={[t.textWhite, t.text3xl, t.fontBold, t.mY4, t.textCenter]}>{header}</Text>
    //   <Text style={[t.textWhite, t.textLg, t.fontBold, t.mX8, t.textCenter]}>{description}</Text> */}
    // // </View>
  );

  const SCREENS = [
    // <Screen
    //   header="Snap"
    //   icon={<MaterialIcons name="photo-camera" size={60} color="black" />}
    //   description="Snap a photo of discounted food item from your local grocery store"
    // />,
    // <Screen
    //   header="Find"
    //   icon={<FontAwesome name="search" size={60} color="black" />}
    //   description="Find real-time discounted food items near you"
    // />,
    // <Screen
    //   header="Help"
    //   icon={<FontAwesome5 name="hands-helping" size={60} color="black" />}
    //   description="Help each other to reduce the food waste and food cost"
    // />,
    <ProductMainCard
      price={{ regular: 2.99, discounted: 0.99 }}
      totalVotes={10}
      storeName="T&T Supermarket"
      distance="500m"
    />,
    <ProductMainCard
      price={{ regular: 2.99, discounted: 0.99 }}
      totalVotes={10}
      storeName="T&T Supermarket"
      distance="500m"
    />,
    <ProductMainCard
      price={{ regular: 2.99, discounted: 0.99 }}
      totalVotes={10}
      storeName="T&T Supermarket"
      distance="500m"
    />,
  ];

  const [activeTab, setActiveTab] = useState(0);

  const [refineModalVisible, setRefineModalVisibility] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const showRefineModal = () => setRefineModalVisibility(true);
  const hideRefineModal = () => setRefineModalVisibility(false);

  // Products swiper modal visibility
  const [productsSwiperModalVisible, setProductsSwiperModalVisibility] = useState(false);
  const showProductsSwiperModal = () => setProductsSwiperModalVisibility(true);
  const hideProductsSwiperModal = () => setProductsSwiperModalVisibility(false);

  const toMapView = () => {
    setShowMap(!showMap);
  };
  // Default 5km for the placeholder
  const [distance, setDistance] = useState('');

  const DistanceEntryError = () => {
    function isNormalInteger(str) {
      if (!str) return true;
      const trimStr = str.trim();
      if (!trimStr) {
        return false;
      }
      const input = trimStr.replace(/^0+/, '') || '0';
      const n = Math.floor(Number(input));
      return n !== Infinity && String(n) === input && n >= 0 && n < 200;
    }

    const errorVisibility = !isNormalInteger(distance);

    return (
      <HelperText type="error" visible={errorVisibility}>
        Invalid Entry. Please enter an integer between 0 and 200.
      </HelperText>
    );
  };

  return (
    <SafeAreaView style={[t.flex1, t.bgWhite]}>
      <View style={[t.flexRow, t.itemsCenter]}>
        {/* Account Button to open drawer navigator */}
        <StyledButton
          icon="account-circle-outline"
          title="Account"
          size="small"
          onPress={() => navigation.openDrawer()}
        />
        {/* Searchbar Placeholder */}

        {/* Refine Modal */}
        <Portal>
          <Modal
            contentContainerStyle={{ backgroundColor: 'blue' }}
            visible={refineModalVisible}
            onDismiss={hideRefineModal}
          >
            <Title style={[t.textCenter]}>SORT BY</Title>
            <SortByMenu />
            <Title style={[t.textCenter]}>FILTER BY</Title>
            <View style={[t.flexRow, t.itemsCenter]}>
              <TextInput
                label="Distance"
                value={distance}
                mode="outline"
                placeholder="5"
                onChangeText={(text) => setDistance(text)}
                style={[t.w3_4, t.m2]}
              />
              <Text>km</Text>
            </View>
            <DistanceEntryError />
            <StoresMenu />
          </Modal>
        </Portal>
        <StyledButton icon="playlist-edit" title="Refine" size="small" onPress={showRefineModal} />
        {/* MapView / ListView Toggle Button Placeholder */}
        <StyledButton
          size="small"
          icon={showMap ? 'view-list' : 'map-outline'}
          onPress={toMapView}
        />
      </View>
      {showMap ? (
        <Map />
      ) : (
        <ScrollView contentContainerStyle={[t.p6]}>
          {/* Product card for product main page */}
          <ProductMainCard
            price={{ regular: 2.99, discounted: 0.99 }}
            totalVotes={10}
            storeName="T&T Supermarket"
            distance="500m"
          />
        </ScrollView>
      )}

      <SnackBar />
      {/* Products swiper modal starts --- */}
      {/* For map view, trigger from a button for dev */}
      <StyledButton title="Products" size="small" onPress={showProductsSwiperModal} />
      <Portal>
        <Modal
          // contentContainerStyle={}
          visible={productsSwiperModalVisible}
          onDismiss={hideProductsSwiperModal}
        >
          {/* <View style={[t.flex1, t.justifyCenter, t.itemsCenter, t.bgGreen600]}> */}
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
          {/* </View> */}
        </Modal>
      </Portal>
      {/* Products swiper modal ends --- */}
    </SafeAreaView>
  );
}
