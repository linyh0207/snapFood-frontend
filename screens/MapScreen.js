import React, { useState, useEffect, useRef } from 'react';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
// import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';

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

export default function MapScreen() {
  //   const [location, setLocation] = useState({ latitude: null, longitude: null });

  //   useEffect(async () => {
  //     const { status } = await Permissions.getAsync(Permissions.LOCATION);

  //     if (status !== 'granted') {
  //       const response = await Permissions.askAsync(Permissions.LOCATION);
  //     }
  //     navigator.geolocation.getCurrentPosition(
  //       ({ coords: { latitude, longitude } }) => setLocation({ latitude, longitude }),
  //       (error) => console.log('Error', error)
  //     );
  //   }, []);
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
      const locationRaw = await Location.getCurrentPositionAsync({});
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

    console.log('delta lat and long', maxLatDiff, maxLongDiff);

    return (
      <View style={styles.container}>
        <Text>{text}</Text>
        <MapView
          showsUserLocation
          style={styles.mapStyle}
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: maxLatDiff * 2 + 0.3,
            longitudeDelta: maxLongDiff * 2 + 0.3,

            // latitudeDelta: 0.922,
            // longitudeDelta: 0.421,
          }}
        >
          {markers.map((marker) => {
            // console.log('marker', marker);
            return <Marker key={marker.id} coordinate={marker.latlng} title={marker.title} />;
          })}
        </MapView>
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
