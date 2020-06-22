import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, ImageBackground, Alert } from 'react-native';
import { Camera } from 'expo-camera';
import { t } from 'react-native-tailwindcss';

export default function CameraScreen() {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [imageUri, setImageUri] = useState('');

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const takePicture = async () => {
    if (cameraRef) {
      const photo = await cameraRef.takePictureAsync();
      // photo object to store or leverage in the 'Add Post' screen
      // console.log('photo', photo.uri);
      return setImageUri(photo.uri);
    }
    return setImageUri('');
  };

  return (
    <View style={[t.flex1]}>
      {!imageUri ? (
        <Camera
          style={[t.flex1]}
          type={type}
          ref={(ref) => {
            setCameraRef(ref);
          }}
        >
          <View style={[t.flex1, t.bgTransparent, t.justifyEnd]}>
            <TouchableOpacity
              style={[t.selfEnd, t.mR16]}
              onPress={() => {
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
              }}
            >
              <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Flip </Text>
            </TouchableOpacity>
            <TouchableOpacity style={[t.selfCenter]} onPress={takePicture}>
              <View
                style={{
                  borderWidth: 2,
                  borderRadius: '50%',
                  borderColor: 'white',
                  height: 50,
                  width: 50,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: 20,
                }}
              >
                <View
                  style={{
                    borderWidth: 2,
                    borderRadius: '50%',
                    borderColor: 'white',
                    height: 40,
                    width: 40,
                    backgroundColor: 'white',
                  }}
                />
              </View>
            </TouchableOpacity>
          </View>
        </Camera>
      ) : (
        <ImageBackground source={{ uri: imageUri }} style={{ width: '100%', height: '100%' }}>
          <TouchableOpacity
            style={[t.absolute, t.bottom0, t.left0]}
            onPress={() => {
              setImageUri('');
            }}
          >
            <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Cancel </Text>
          </TouchableOpacity>
        </ImageBackground>
      )}
    </View>
  );
}
