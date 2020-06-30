import React, { useState, useEffect, useRef } from 'react';
import { Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Camera } from 'expo-camera';
import { t } from 'react-native-tailwindcss';
import { Headline, TextInput, Card, ActivityIndicator } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import StyledButton from '../components/StyledButton';
import AddressSearchBar from '../components/AddressSearchBar';
import SearchBar from '../components/SearchBar';
import api from '../constants/Api';

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
  const [selectedPlace, setSelectedPlace] = useState({});
  const [uploadData, setUploadData] = useState(null);
  const [finalImageUri, setFinalImageUri] = useState('');

  // Handles waiting for uploaded image url to come back. Posting will show spinner if not uploaded yet
  const [showSpinner, setShowSpinner] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  // useEffect(() => {
  //   if (uploadData) {
  //   //   setShowSpinner(true);
  //   //   const Cloud = 'https://api.cloudinary.com/v1_1/dsqhp8ugk/upload/';
  //   //   fetch(Cloud, {
  //   //     body: JSON.stringify(uploadData),
  //   //     headers: {
  //   //       'content-type': 'application/json',
  //   //     },
  //   //     method: 'POST',
  //   //   })
  //   //     .then(async (res) => {
  //   //       console.log('Successfully uploaded image');
  //   //       const pic = await res.json();
  //   //       console.log('url:', pic.url);
  //   //       setFinalImageUri(pic.url);
  //   //       setShowSpinner(false)
  //   //     })
  //   //     .catch((err) => console.log(err));
  //   }
  // }, [uploadData]);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const takePicture = async () => {
    if (cameraRef) {
      const photo = await cameraRef.takePictureAsync({ base64: true });
      // photo uri to store in the db
      // console.log(photo);
      const base64Img = `data:image/jpg;base64,${photo.base64}`;
      const data = {
        file: base64Img,
        upload_preset: 'oohwpvh9',
      };
      setUploadData(data);
      return setImageUri(photo.uri);
    }
    return setImageUri('');
  };

  function cancelPhoto() {
    setImageUri('');
    setUploadData(null);
    setSearchBarVisibility(false);
  }

  async function post() {
    if (
      !selectedPlace.address ||
      !selectedPlace.storename ||
      activeTags.length === 0 ||
      !regularPrice ||
      !discountPrice
    ) {
      // Can add an error message here
      return console.log('missing information');
    }
    setShowSpinner(true);
    const Cloud = 'https://api.cloudinary.com/v1_1/dsqhp8ugk/upload/';
    try {
      const res = await fetch(Cloud, {
        body: JSON.stringify(uploadData),
        headers: {
          'content-type': 'application/json',
        },
        method: 'POST',
      });
      const pic = await res.json();
      setFinalImageUri(pic.url);
      setShowSpinner(false);
      await fetch('https://glacial-cove-31720.herokuapp.com/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          address: selectedPlace.address,
          storename: selectedPlace.name,
          tags: activeTags,
          latitude: -79,
          longitude: 43,
          price: regularPrice,
          discountPrice,
          imageUrl: pic.url,
        }),
      });

      setImageUri('');
      navigation.navigate('ProductMain');
    } catch (e) {
      console.error(e);
    }
    return '';
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
        <ScrollView ref={scrollRef} keyboardShouldPersistTaps="always">
          <KeyboardAwareScrollView
            resetScrollToCoords={{ x: 0, y: 0 }}
            scrollEnabled={false}
            keyboardShouldPersistTaps="always"
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
                selectedPlace={selectedPlace}
                setSelectedPlace={setSelectedPlace}
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
                latitude={43.4073}
                longitude={-79.3298}
                radius={10000}
                activeTags={activeTags}
                setActiveTags={setActiveTags}
              />
            </Card>
            {showSpinner ? (
              <ActivityIndicator />
            ) : (
              <StyledButton title="Post" mode="outlined" size="large" onPress={post} />
            )}

            {/* Adds space to make scroll down work. Without, rendering/scrolling order doesnt work out right */}
            <View style={t.h64} />
            <View style={t.h64} />
          </KeyboardAwareScrollView>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
