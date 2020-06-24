import React, { useState, useEffect } from 'react';
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
  const markers = [
    {
      id: '1',
      latlng: { latitude: location.latitude + 0.05, longitude: location.longitude + 0.05 },
      title: 'T&T Supermarket',
    },
    {
      id: '2',
      latlng: { latitude: location.latitude - 0.5, longitude: location.longitude - 0.5 },
      title: 'T&T Supermarket',
    },
  ];

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
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
  if (location?.latitude) {
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
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
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
  return (
    <View style={styles.container}>
      <Text>We need your permission!</Text>
    </View>
  );
}
