import React, { useState, useEffect } from 'react';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import * as Permissions from 'expo-permissions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

const markers = [{ latlng: { latitude: 37.7883, longitude: -122.432 }, title: 'T&T Supermarket' }];
export default function MapScreen() {
  const [location, setLocation] = useState({ latitude: null, longitude: null });

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

  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapStyle}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          //   latitude: location.latitude,
          //   longitude: location.longitude,
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {markers.map((marker) => {
          return <Marker coordinate={marker.latlng} title={marker.title} />;
        })}
      </MapView>
    </View>
  );
}
