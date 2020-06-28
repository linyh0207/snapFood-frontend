import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { Camera } from 'expo-camera';
import { t } from 'react-native-tailwindcss';
import { Headline, TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import StyledButton from '../components/StyledButton';
import api from '../constants/Api';

export default function AddPostScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [imageUri, setImageUri] = useState('');
  const [searchBarVisible, setSearchBarVisibility] = useState(false);
  const [discountPrice, setDiscountPrice] = useState(null);
  const [regularPrice, setRegularPrice] = useState(null);
  const [uploadData, setUploadData] = useState(null);
  const [finalImageUri, setFinalImageUri] = useState('');

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  useEffect(() => {
    if (uploadData) {
      const Cloud = 'https://api.cloudinary.com/v1_1/dsqhp8ugk/upload/';
      fetch(Cloud, {
        body: JSON.stringify(uploadData),
        headers: {
          'content-type': 'application/json',
        },
        method: 'POST',
      })
        .then(async (res) => {
          console.log('Successfully uploaded image');
          const pic = await res.json();
          console.log('url:', pic.url);
          setFinalImageUri(pic.url);
        })
        .catch((err) => console.log(err));
    }
  }, [uploadData]);

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

  function post() {
    // // Backend - Need to save the post uri to db
    // const postData = {
    //   price: regularPrice,
    //   discountPrice,
    //   imageUrl: finalImageUri,
    //   // need to add:
    //   // storename,
    //   // address,
    //   // tags,
    //   // latitude,
    //   // longitude,
    // };
    // fetch(api.ADD_POST, {
    //   body: JSON.stringify(postData),
    //   headers: {
    //     'content-type': 'application/json',
    //   },
    //   method: 'POST',
    // }).catch((err) => console.log(err));
    setFinalImageUri('');
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

        <View style={[t.flex1]}>
          {!searchBarVisible ? (
            // User current location
            <View style={[t.flex1, t.flexRow, t.itemsCenter, t.justifyCenter, t.flexWrap, t.pB10]}>
              <Headline>T&T Supermarket</Headline>
              <StyledButton
                title="edit"
                icon="square-edit-outline"
                size="small"
                onPress={() => setSearchBarVisibility(true)}
              />
              <Text style={[t.textCenter]}>{'\n'}123 Happy Street, Vancouver, BC VS5 3D6</Text>
            </View>
          ) : (
            // User edit store location
            <View style={[t.flex1, t.flexRow, t.itemsCenter, t.justifyCenter, t.flexWrap, t.pB10]}>
              {/* Search store location bar placeholder */}
              <Text>SEARCH BAR</Text>
              <StyledButton
                title="cancel"
                icon="square-edit-outline"
                size="small"
                onPress={() => setSearchBarVisibility(false)}
              />
            </View>
          )}

          <Image
            source={{ uri: imageUri }}
            style={{ flex: 3, height: undefined, width: undefined }}
            resizeMode="contain"
          />

          <View style={[t.flex1, t.flexRow, t.justifyBetween, t.mR4, t.mL4, t.mB5]}>
            <View>
              <Text>Discount Price</Text>
              <TextInput
                value={discountPrice}
                onChangeText={(text) => setDiscountPrice(text)}
                style={[t.h10, t.pX20]}
              />
            </View>

            <View>
              <Text>Regular Price</Text>
              <TextInput
                value={regularPrice}
                onChangeText={(text) => setRegularPrice(text)}
                style={[t.h10, t.pX20]}
              />
            </View>
          </View>
          <View style={[t.flex1, t.pT6]}>
            {/* Tag entry bar placeholder  */}
            <Text style={[t.textCenter]}>TAG ENTRY BAR</Text>
            <TouchableOpacity
              style={[t.justifyEnd]}
              onPress={() => {
                cancelPhoto();
              }}
            >
              <Text style={[t.textLg]}> Cancel </Text>
            </TouchableOpacity>
            <StyledButton title="Post" mode="outlined" size="small" onPress={post} />
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}
