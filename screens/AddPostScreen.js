import React, { useState, useEffect, useRef } from 'react';
import { Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Camera } from 'expo-camera';
import { t } from 'react-native-tailwindcss';
import { Headline, TextInput, Card } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import StyledButton from '../components/StyledButton';
import AddressSearchBar from '../components/AddressSearchBar';
import SearchBar from '../components/SearchBar';

export default function AddPostScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [imageUri, setImageUri] = useState('');
  const [searchBarVisible, setSearchBarVisibility] = useState(false);
  const [discountPrice, setDiscountPrice] = useState(null);
  const [regularPrice, setRegularPrice] = useState(null);
  const scrollRef = useRef(null);
  const [activeTags, setActiveTags] = useState([]);

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
      // photo uri to store in the db
      // console.log('photo', photo.uri);
      return setImageUri(photo.uri);
    }
    return setImageUri('');
  };

  function cancelPhoto() {
    setImageUri('');
    setSearchBarVisibility(false);
  }

  function post() {
    // Backend - Need to save the post uri to db
    setImageUri('');
    navigation.navigate('ProductMain');
  }

  return (
    <SafeAreaView style={[t.flex1]}>
      {!imageUri ? (
        // Camera Screen
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
                  borderTopLeftRadius: 50,
                  borderTopRightRadius: 50,
                  borderBottomLeftRadius: 50,
                  borderBottomRightRadius: 50,
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
                    borderTopLeftRadius: 50,
                    borderTopRightRadius: 50,
                    borderBottomLeftRadius: 50,
                    borderBottomRightRadius: 50,
                    borderColor: 'white',
                    height: 40,
                    width: 40,
                    backgroundColor: 'white',
                  }}
                />
              </View>
            </TouchableOpacity>
            <Text style={[t.textWhite, t.textCenter]}>
              Post includes price tag and label get upvoted the most!
            </Text>
          </View>
        </Camera>
      ) : (
        // Add Post Screen
        <ScrollView ref={scrollRef} keyboardShouldPersistTaps>
          <KeyboardAwareScrollView
            resetScrollToCoords={{ x: 0, y: 0 }}
            scrollEnabled={false}
            keyboardShouldPersistTaps
          >
            {/* Image  */}
            <Card style={t.m1}>
              <Image source={{ uri: imageUri }} style={[t.wFull, t.h56]} />
            </Card>

            {/* Location */}
            <Card style={t.m1}>
              <Card.Title title="Store Information" />
              <AddressSearchBar
                latitude={48.4073}
                longitude={-123.3298}
                radius={10000}
                scrollRef={scrollRef}
              />
            </Card>

            {/* Pricing */}
            <Card style={t.m1}>
              <Card.Title title="Pricing" />
              <View style={[t.flexRow, t.justifyAround]}>
                <TextInput
                  value={discountPrice}
                  onChangeText={(text) => setDiscountPrice(text)}
                  style={[t.w40, t.m1]}
                  mode="outlined"
                  label="Discount Price"
                  dense
                />

                <TextInput
                  value={regularPrice}
                  onChangeText={(text) => setRegularPrice(text)}
                  style={[t.w40, t.m1]}
                  mode="outlined"
                  label="Regular Price"
                  dense
                />
              </View>
            </Card>

            <Card style={t.m1}>
              <Card.Title title="Add Tags" />
              <SearchBar
                latitude={48.4073}
                longitude={-123.3298}
                radius={10000}
                activeTags={activeTags}
                setActiveTags={setActiveTags}
              />
            </Card>

            <StyledButton title="Post" mode="outlined" size="small" onPress={post} />

            {/* Adds space to make scroll down work. Without, rendering/scrolling order doesnt work out right */}
            <View style={t.h64} />
            <View style={t.h64} />
          </KeyboardAwareScrollView>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
