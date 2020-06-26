import React, { useState, useEffect } from 'react';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import * as Location from 'expo-location';
import { Portal, Modal } from 'react-native-paper';
import Carousel from 'react-native-snap-carousel';
import { t } from 'react-native-tailwindcss';
import ProductMainCard from './ProductMainCard';
import { scrollInterpolator, animatedStyles } from '../utils/animations';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 200,
  },
});

export default function Map() {
  // Products Swiper Modal --- start
  const SLIDER_WIDTH = Dimensions.get('window').width;
  const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
  const ITEM_HEIGHT = Math.round((ITEM_WIDTH * 5) / 4);

  // Dummy screen datas
  const SCREENS = [
    <ProductMainCard
      price={{ regular: 3.99, discounted: 1.99 }}
      totalVotes={10}
      storeName="T&T Supermarket"
      distance="500m"
    />,
    <ProductMainCard
      price={{ regular: 10.99, discounted: 4.99 }}
      totalVotes={10}
      storeName="Superstore"
      distance="500m"
    />,
    <ProductMainCard
      price={{ regular: 2.99, discounted: 0.99 }}
      totalVotes={10}
      storeName="Save On Food"
      distance="500m"
    />,
  ];

  const renderItem = ({ item }) => {
    return (
      <View
        style={{
          width: ITEM_WIDTH,
          height: ITEM_HEIGHT,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {item}
      </View>
    );
  };

  const [activeTab, setActiveTab] = useState(0);
  const [productsSwiperModalVisible, setProductsSwiperModalVisibility] = useState(false);
  const showProductsSwiperModal = () => setProductsSwiperModalVisibility(true);
  const hideProductsSwiperModal = () => setProductsSwiperModalVisibility(false);
  // Products Swiper Modal --- end

  // Map View --- start
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const markers = [
    {
      id: '1',
      latlng: { latitude: location?.latitude + 0.05, longitude: location?.longitude + 0.05 },
      title: 'T&T Supermarket',
    },
    {
      id: '2',
      latlng: { latitude: location?.latitude - 0.5, longitude: location?.longitude - 0.5 },
      title: 'T&T Supermarket',
    },
    {
      id: '3',
      latlng: { latitude: location?.latitude + 0.8, longitude: location?.longitude + 0.05 },
      title: 'T&T Supermarket',
    },
    {
      id: '4',
      latlng: { latitude: location?.latitude - 0.8, longitude: location?.longitude - 0.8 },
      title: 'T&T Supermarket',
    },
  ];

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        setIsLoading(false);
      }
      // contains object of timestamp: sec, mocked: boolean, coords: {altitude: int, heading: int, longitude: float, speed: float, latitude: float, accuracy: float}
      const locationRaw = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      setLocation(locationRaw.coords);
    })();
  });

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify({ longitude: location.longitude, latitude: location.latitude });
  }
  if (location && location?.latitude) {
    const maxLatDiff = markers
      .map((marker) => marker.latlng.latitude)
      .reduce((acc, curr) => Math.max(Math.abs(curr - location.latitude), acc), 0);
    const maxLongDiff = markers
      .map((marker) => marker.latlng.longitude)
      .reduce((acc, curr) => Math.max(Math.abs(curr - location.longitude), acc), 0);

    return (
      <View>
        <Text>{text}</Text>
        <MapView
          showsUserLocation
          style={styles.mapStyle}
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: maxLatDiff * 2 + 0.4,
            longitudeDelta: maxLongDiff * 2 + 0.4,

            // latitudeDelta: 0.922,
            // longitudeDelta: 0.421,
          }}
          moveOnMarkerPress={false}
        >
          {markers.map((marker) => {
            return (
              <Marker
                key={marker.id}
                coordinate={marker.latlng}
                title={marker.title}
                onPress={showProductsSwiperModal}
              />
            );
          })}
        </MapView>
        {/* Products Swiper Modal --- start */}
        <Portal>
          <Modal visible={productsSwiperModalVisible} onDismiss={hideProductsSwiperModal}>
            <View>
              <Carousel
                data={SCREENS}
                renderItem={renderItem}
                sliderWidth={SLIDER_WIDTH}
                itemWidth={ITEM_WIDTH}
                inactiveSlideShift={0}
                onSnapToItem={(i) => setActiveTab(i)}
                scrollInterpolator={scrollInterpolator}
                slideInterpolatedStyle={animatedStyles}
                useScrollView
              />
              <Text style={[t.mT6, t.text3xl, t.fontBold, t.textCenter, t.textWhite]}>
                {activeTab + 1} / {SCREENS.length}
              </Text>
            </View>
          </Modal>
        </Portal>
        {/* Products Swiper Modal --- end */}
      </View>
    );
  }
  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Text>We need your permission!</Text>
    </View>
  );
}
