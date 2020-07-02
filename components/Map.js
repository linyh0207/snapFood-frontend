import React, { useState, useEffect } from 'react';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import * as Location from 'expo-location';
import { Portal, Modal, ActivityIndicator } from 'react-native-paper';
import Carousel from 'react-native-snap-carousel';
import { t } from 'react-native-tailwindcss';
import { formatDistanceToNow } from 'date-fns';
import ProductMainCard from './ProductMainCard';
import { scrollInterpolator, animatedStyles } from '../utils/animations';

export default function Map({ posts, height = 180 }) {
  // Products Swiper Modal --- start
  const SLIDER_WIDTH = Dimensions.get('window').width;
  const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
  const ITEM_HEIGHT = Math.round((ITEM_WIDTH * 5) / 4);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    mapStyle: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height - height,
    },
  });

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
        <ProductMainCard
          price={{ regular: item.price, discounted: item.discountPrice }}
          // totalVotes={post.likes}
          storeName={item.storename}
          address={item.address}
          // created={post.createdAt}
          distance={item.distance}
          initialUserSavedPost={item.userSavedPost}
          userLikedPost={item.userLikedPost}
          userDislikedPost={item.userDislikedPost}
          likes={item.likes}
          postId={item.id}
          timeFromNow={formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })}
          dislikes={item.dislikes}
          posterName={item.posterName}
          posterStatus={item.posterStatus}
          tags={item.tags}
          imageUrl={item.imageUrl}
        />
      </View>
    );
  };

  const [activeTab, setActiveTab] = useState(0);
  const [productsSwiperModalVisible, setProductsSwiperModalVisibility] = useState(false);

  const [currentMarker, setCurrentMarker] = useState({});

  const showProductsSwiperModal = () => setProductsSwiperModalVisibility(true);
  const hideProductsSwiperModal = () => {
    setActiveTab(0);
    setProductsSwiperModalVisibility(false);
  };

  // Products Swiper Modal --- end

  // Map View --- start
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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
      // Temp for testing in markham
      setLocation({
        accuracy: 30,
        altitude: 21.54458999633789,
        altitudeAccuracy: 4,
        heading: -1,
        latitude: 43.879,
        longitude: -79.3,
        speed: 0,
      });
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify({ longitude: location.longitude, latitude: location.latitude });
  }
  if (location && location?.latitude) {
    const maxLatDiff = posts
      .map((post) => post.latitude)
      .reduce((acc, curr) => Math.max(Math.abs(curr - location.latitude), acc), 0);
    const maxLongDiff = posts
      .map((post) => post.longitude)
      .reduce((acc, curr) => Math.max(Math.abs(curr - location.longitude), acc), 0);

    return (
      <View>
        <MapView
          showsUserLocation
          style={styles.mapStyle}
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: maxLatDiff * 2 + 0.05,
            longitudeDelta: maxLongDiff * 2 + 0.05,

            // latitudeDelta: 0.922,
            // longitudeDelta: 0.421,
          }}
          moveOnMarkerPress={false}
          // onPress={() => setCurrentMarker({})}
        >
          {posts.map((post) => (
            <Marker
              key={post.id}
              coordinate={{ latitude: post.latitude, longitude: post.longitude }}
              title={post.storename}
              onPress={() => {
                setCurrentMarker(post);
                setProductsSwiperModalVisibility(true);
              }}
            />
          ))}
        </MapView>
        {/* Products Swiper Modal --- start */}
        <Portal>
          <Modal visible={productsSwiperModalVisible} onDismiss={hideProductsSwiperModal}>
            <View>
              <Text style={[t.mT6, t.text3xl, t.fontBold, t.textCenter, t.textWhite]}>
                {currentMarker.storename}
              </Text>
              <Carousel
                // data={posts}
                data={posts.filter((post) => post.address === currentMarker.address)}
                renderItem={renderItem}
                sliderWidth={SLIDER_WIDTH}
                itemWidth={ITEM_WIDTH}
                itemHeight={ITEM_HEIGHT}
                inactiveSlideShift={0}
                onSnapToItem={(i) => setActiveTab(i)}
                scrollInterpolator={scrollInterpolator}
                slideInterpolatedStyle={animatedStyles}
                useScrollView
              />
              <Text style={[t.mT6, t.text2xl, t.fontBold, t.textCenter, t.textWhite]}>
                {activeTab + 1} /{' '}
                {posts.filter((post) => post.address === currentMarker.address).length}
              </Text>
            </View>
          </Modal>
        </Portal>
        {/* Products Swiper Modal --- end */}
        <View>
          {Object.keys(currentMarker).length > 0 ? (
            <Text style={[t.p1]}>
              {currentMarker.title} {currentMarker.address}
            </Text>
          ) : (
            <Text style={[t.p1]}>See more details by clicking on one of the markers!</Text>
          )}
        </View>
      </View>
    );
  }
  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Text>We need your permission!</Text>
    </View>
  );
}
