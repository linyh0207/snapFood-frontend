import * as React from 'react';
import { useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { ScrollView, FlatList } from 'react-native-gesture-handler';
import { t } from 'react-native-tailwindcss';
import { SafeAreaView } from 'react-native-safe-area-context';
import { formatDistanceToNow } from 'date-fns';
import { View, Image } from 'react-native';
import { Portal, Modal, TextInput, Text, Title, HelperText, IconButton } from 'react-native-paper';
import StyledButton from '../components/StyledButton';
import SortByMenu from '../components/DropDownMenu/SortByMenu';
import StoresMenu from '../components/DropDownMenu/StoresMenu';
import SnackBar from '../components/SnackBar';
import ProductMainCard from '../components/ProductMainCard';
import SearchBar from '../components/SearchBar';
import Map from '../components/Map';
import formatDistance from '../helpers/formatDistance';
import logo from '../assets/images/logos/green-logo.png';

export default function ProductMainScreen({ navigation }) {
  // For account button to open drawer navigator
  // const navigation = useNavigation();
  const [searchRadius, setSearchRadius] = useState('499');
  const [posts, setPosts] = React.useState([]);
  const [activeTags, setActiveTags] = React.useState([]);
  const [sort, setSort] = React.useState('Sort: Rating');
  const [storeFilter, setStoreFilter] = React.useState('All');
  const [refineModalVisible, setRefineModalVisibility] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const showRefineModal = () => setRefineModalVisibility(true);
  const hideRefineModal = () => setRefineModalVisibility(false);

  const numColumns = 2;

  const loadData = async () => {
    const searchUri = `https://glacial-cove-31720.herokuapp.com/posts?latitude=-79&longitude=43&radius=${searchRadius}000${activeTags.map(
      (tag) => `&tag=${tag}`
    )}`;
    const apiData = await fetch(searchUri);
    const responseText = await apiData.text();
    const loadedPosts = JSON.parse(responseText).posts;
    setPosts(sortPosts(loadedPosts) || []);
  };

  React.useEffect(() => {
    console.log('load posts ran');
    loadData();
  }, [activeTags, searchRadius]);

  useFocusEffect(
    React.useCallback(() => {
      console.log('should run once only when onFirstLoad');
      loadData();
    }, [])
  ); // run once when screen loads

  React.useEffect(() => {
    setPosts(sortPosts(posts) || []);
  }, [sort]);

  React.useEffect(() => {
    console.log('enters store filter', storeFilter);
    setPosts((oldPosts) => {
      return oldPosts.map((oldPost) => {
        if (storeFilter === 'All') return { ...oldPost, isFiltered: false };
        if (`${oldPost.storename}--${oldPost.address}` === storeFilter) {
          return { ...oldPost, isFiltered: false };
        }
        return { ...oldPost, isFiltered: true };
      });
    });
  }, [storeFilter]);

  const sortPosts = (currentPosts) => {
    if (!currentPosts) return null;
    switch (sort) {
      case 'Sort: Rating':
        return currentPosts.slice(0).sort((a, b) => {
          const netLikeA = a.likes - a.dislikes;
          const netLikeB = b.likes - b.dislikes;
          if (netLikeA > netLikeB) {
            return -1;
          }
          if (netLikeA < netLikeB) {
            return 1;
          }
          return 0;
        });
      case 'Sort: Distance':
        return currentPosts.slice(0).sort((a, b) => a.distance - b.distance);
      case 'Sort: Best Deal':
        return currentPosts
          .slice(0)
          .sort((a, b) => b.price - b.discountPrice - (a.price - a.discountPrice));
      case 'Sort: Most Recent':
        return currentPosts
          .slice(0)
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
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

  // eslint-disable-next-line no-shadow
  const getStoresInfo = (posts) => {
    const uniqueStores = posts.reduce((acc, curr) => {
      // using storename and address as unique identifier; better to have a storeId (TODO)
      if (!acc[`${curr.storename}--${curr.address}`]) {
        acc[`${curr.storename}--${curr.address}`] = {
          name: curr.storename,
          distance: curr.distance,
          address: curr.address,
        };
      }
      return acc;
    }, {});
    const formattedStores = Object.values(uniqueStores)
      .sort((a, b) => a.distance - b.distance)
      .map((item) => ({ ...item, distance: formatDistance(item.distance) }));

    return [{ name: 'All', address: '', distance: '' }, ...formattedStores];
  };
  // console.log('sample post', posts[0]);
  // Object {
  //   "address": "5762 Hwy 7, Markham, ON L3P 1A8, Canada",
  //   "createdAt": "2020-06-30T15:53:46.733Z",
  //   "discountPrice": 1.35,
  //   "dislikes": 0,
  //   "distance": 34770.10542051625,
  //   "id": "5eead9d6d34bf31f58a86904",
  //   "imageUrl": "https://thumbs.dreamstime.com/b/stacked-bread-packages-store-to-sell-sliced-bread-sealed-plastic-packaging-stacked-basket-store-selling-bakery-148749850.jpg",
  //   "latitude": -79.266,
  //   "likes": 2,
  //   "longitude": 43.872,
  //   "price": 2,
  //   "storename": "No Frills",
  //   "tags": Array [
  //     "bread",
  //     "sliced",
  //     "grain",
  //   ],
  //   "userDislikedPost": false,
  //   "userLikedPost": true,
  //   "userSavedPost": true,
  // }

  const renderItem = ({ item }) => {
    return (
      <View>
        <ProductMainCard
          price={{ regular: item.price, discounted: item.discountPrice }}
          storeName={item.storename}
          address={item.address}
          distance={item.distance}
          initialUserSavedPost={item.userSavedPost}
          userLikedPost={item.userLikedPost}
          userDislikedPost={item.userDislikedPost}
          likes={item.likes}
          postId={item.id}
          key={item.id}
          timeFromNow={formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })}
          dislikes={item.dislikes}
          posterName="Amy" // TODO: Add missing data from back-end
          posterStatus="super" // TODO: Add missing data from back-end
          tags={item.tags}
          imageUrl={item.imageUrl}
          cardStyle={[t.m1]}
        />
      </View>
    );
  };

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
          searcher={0}
          latitude="43"
          longitude="-79"
          radius="100000000"
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
          contentContainerStyle={{ backgroundColor: 'white' }}
          visible={refineModalVisible}
          onDismiss={hideRefineModal}
        >
          <Title style={[t.textCenter]}>SORT BY</Title>
          <SortByMenu setSort={setSort} />
          <Title style={[t.textCenter]}>FILTER BY</Title>
          <View style={[t.flexRow, t.itemsCenter]}>
            <TextInput
              label="Distance"
              value={searchRadius}
              mode="outline"
              placeholder="5"
              onChangeText={(text) => setSearchRadius(text)}
              style={[t.w3_4, t.m2]}
            />
            <Text>km</Text>
          </View>
          <DistanceEntryError />
          <StoresMenu stores={getStoresInfo(posts)} setStoreFilter={setStoreFilter} />
        </Modal>
      </Portal>
      {/* Refine Modal --- End */}

      {showMap ? (
        <Map />
      ) : (
        <FlatList
          data={posts.filter((post) => post.isFiltered === false || storeFilter === 'All')}
          numColumns={numColumns}
          renderItem={renderItem}
        />
      )}

      <SnackBar />
    </SafeAreaView>
  );
}
