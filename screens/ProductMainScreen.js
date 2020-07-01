import * as React from 'react';
import { useState } from 'react';
import { View, Image } from 'react-native';
import { Portal, Modal, TextInput, Text, Title, HelperText, IconButton } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import { t } from 'react-native-tailwindcss';
import { SafeAreaView } from 'react-native-safe-area-context';
import SortByMenu from '../components/DropDownMenu/SortByMenu';
import StoresMenu from '../components/DropDownMenu/StoresMenu';
import SnackBar from '../components/SnackBar';
import ProductMainCard from '../components/ProductMainCard';
import SearchBar from '../components/SearchBar';
import Map from '../components/Map';
import logo from '../assets/images/logos/green-logo.png';
import ProductDetailCard from '../components/ProductDetailCard';

export default function ProductMainScreen({ navigation }) {
  // For account button to open drawer navigator
  // const navigation = useNavigation();
  const [searchRadius, setSearchRadius] = useState('499');
  const [posts, setPosts] = React.useState([]);
  const [activeTags, setActiveTags] = React.useState([]);
  const [sort, setSort] = React.useState('Sort: Rating');
  const [refineModalVisible, setRefineModalVisibility] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const showRefineModal = () => setRefineModalVisibility(true);
  const hideRefineModal = () => setRefineModalVisibility(false);

  const loadData = async () => {
    const searchUri = `http://10.0.2.2:8000/posts?latitude=5.2&longitude=4.3&radius=${searchRadius}000${activeTags.map(
      (tag) => `&tag=${tag}`
    )}`;
    const apiData = await fetch(searchUri);
    const responseText = await apiData.text();
    const loadedPosts = JSON.parse(responseText).posts;
    setPosts(sortPosts(loadedPosts) || []);
  };

  React.useEffect(() => {
    loadData();
  }, [activeTags, searchRadius]);

  React.useEffect(() => {
    setPosts(sortPosts(posts) || []);
  }, [sort]);

  const sortPosts = (currentPosts) => {
    if (!currentPosts) return null;
    switch (sort) {
      case 'Sort: Rating':
        return currentPosts.slice(0).sort((a, b) => b.likes - a.likes);
      case 'Sort: Distance':
        return currentPosts.slice(0).sort((a, b) => a.distance - b.distance);
      case 'Sort: Best Deal':
        return currentPosts
          .slice(0)
          .sort((a, b) => a.price - a.discountPrice - (b.price - b.discountPrice));
      case 'Sort: Most Recent':
        return currentPosts
          .slice(0)
          .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
      default:
        return currentPosts;
    }
  };
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
      return n !== Infinity && String(n) === input && n >= 0 && n < 500;
    }

    const errorVisibility = !isNormalInteger(searchRadius);

    return (
      <HelperText type="error" visible={errorVisibility}>
        Invalid Entry. Please enter an integer between 0 and 200.
      </HelperText>
    );
  };

  // sample data from one post returned from db
  // {
  //   "address": "2 main st.",
  //   "createdAt": "2020-06-19T23:16:53.582Z",
  //   "discountPrice": 3.35,
  //   "dislikes": 2,
  //   "distance": 235547.53350062753,
  //   "id": "5eead9d6d34bf31f58a86905",
  //   "latitude": 3.2,
  //   "likes": 1,
  //   "longitude": 5,
  //   "price": 5.1,
  //   "storename": "walmart",
  //   "tags": Array [
  //     "chicken",
  //     "meat",
  //   ],
  //   "userDislikedPost": false,
  //   "userLikedPost": true,
  //   "userSavedPost": true,
  // }

  return (
    <SafeAreaView style={[t.flex1, t.bgWhite]}>
      {/* Top Navigator --- Start */}
      <View style={[t.flexRow, t.itemsCenter, t.justifyBetween, t.pX4]}>
        <IconButton
          icon="account-circle-outline"
          color="#22543d"
          size={30}
          onPress={() => navigation.openDrawer()}
        />
        <Image source={logo} style={[t.w56, t.h24]} />
        <IconButton
          color="#22543d"
          icon={showMap ? 'view-list' : 'map-outline'}
          size={30}
          onPress={toMapView}
        />
      </View>
      {/* Top Navigator --- End */}
      <View style={[t.borderGray300, t.borderB, t.mX3, t._mT4]} />
      {/* Search bar & Refine Menu --- Start */}
      <View style={[t.flexRow, t.itemsCenter, t.justifyBetween, t.p4]}>
        <SearchBar
          searcher={1}
          latitude="20"
          longitude="10"
          radius="10000000"
          setActiveTags={setActiveTags}
          activeTags={activeTags}
          style={[t.flex1]}
        />
        <IconButton color="#22543d" icon="playlist-edit" size={30} onPress={showRefineModal} />
      </View>
      {/* Search bar & Refine Menu --- End */}
      {/* Refine Modal --- Start */}
      <Portal>
        <Modal
          contentContainerStyle={[t.bgWhite, t.p8, t.mX5, t.roundedLg]}
          visible={refineModalVisible}
          onDismiss={hideRefineModal}
        >
          <View style={[t.bgGreen600]}>
            <Title style={[t.textCenter, t.textWhite]}>SORT BY</Title>
          </View>
          <SortByMenu setSort={setSort} />

          <View style={[t.bgGreen600]}>
            <Title style={[t.textCenter, t.textWhite]}>FILTER BY</Title>
          </View>

          <View style={[t.flexRow, t.itemsCenter]}>
            <TextInput
              label="Distance"
              value={searchRadius}
              placeholder="5"
              onChangeText={(text) => setSearchRadius(text)}
              style={[t.w3_4, t.m2]}
            />
            <Text>km</Text>
          </View>
          <DistanceEntryError />
          <StoresMenu />
        </Modal>
      </Portal>
      {/* Refine Modal --- End */}

      {showMap ? (
        <Map />
      ) : (
        <ScrollView contentContainerStyle={[t.p6]}>
          {/* Product card for product main page */}
          {posts.map((post) => (
            <ProductMainCard
              price={{ regular: post.price, discounted: post.discountPrice }}
              // totalVotes={post.likes}
              storeName={post.storename}
              address={post.address}
              // created={post.createdAt}
              distance={post.distance}
              initialUserSavedPost={post.userSavedPost}
              userLikedPost={post.userLikedPost}
              userDislikedPost={post.userDislikedPost}
              likes={post.likes}
              postId={post.id}
              key={post.id}
              timeFromNow="1 day ago"
              dislikes={4}
              posterName="Amy"
              posterStatus="super"
              tags={['bread', 'sliced']}
            />
          ))}
        </ScrollView>
      )}
      {/* <ProductDetailCard
        price={{ regular: 2.99, discounted: 0.99 }}
        storeName="T&T Supermarket"
        distance="500m"
        timeFromNow="1 day ago"
        likes={10}
        dislikes={4}
        posterName="Amy"
        posterStatus="super"
        tags={['bread', 'sliced']}
      /> */}
      <SnackBar />
    </SafeAreaView>
  );
}
