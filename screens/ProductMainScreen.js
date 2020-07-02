import * as React from 'react';
import { View, Image, Alert } from 'react-native';
import { Portal, TextInput, Text, Title, IconButton, Dialog } from 'react-native-paper';
import { ScrollView, FlatList } from 'react-native-gesture-handler';
import { useFocusEffect } from '@react-navigation/native';
import { t } from 'react-native-tailwindcss';
import { SafeAreaView } from 'react-native-safe-area-context';
import { formatDistanceToNow } from 'date-fns';
import SortByMenu from '../components/RefineMenu/SortByMenu';
import StoresMenu from '../components/RefineMenu/StoresMenu';
import SnackBar from '../components/SnackBar';
import ProductMainCard from '../components/ProductMainCard';
import SearchBar from '../components/SearchBar';
import Map from '../components/Map';
import formatDistance from '../helpers/formatDistance';
import logo from '../assets/images/logos/green-logo.png';
import StyledButton from '../components/StyledButton';
import { FAKE_HOME_LOCATIONS } from '../utils/fakeData';

export default function ProductMainScreen({ navigation }) {
  const [searchRadius, setSearchRadius] = React.useState('20');
  const [posts, setPosts] = React.useState([]);
  const [activeTags, setActiveTags] = React.useState([]);
  const [sort, setSort] = React.useState('rating');
  const [storeFilter, setStoreFilter] = React.useState('All');
  const [showMap, setShowMap] = React.useState(false);

  // Refine menu dialog
  const [refineDialogVisible, setRefineDialogVisibility] = React.useState(false);
  const showRefineDialog = () => setRefineDialogVisibility(true);
  const hideRefineDialog = () => setRefineDialogVisibility(false);
  // Store list within refine menu
  const [expanded, setExpanded] = React.useState(false);
  const [selectedStore, setStore] = React.useState('Select a store');
  // Snack bar
  const [snackBarVisible, setSnackBarVisibility] = React.useState(false);

  const numColumns = 2;

  const loadData = async () => {
    const searchUri = `https://glacial-cove-31720.herokuapp.com/posts?latitude=${
      FAKE_HOME_LOCATIONS.Markham.latitude
    }&longitude=${FAKE_HOME_LOCATIONS.Markham.longitude}&radius=${searchRadius}000${activeTags.map(
      (tag) => `&tag=${tag}`
    )}`;
    console.log(searchUri, 'is search uri');
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
      case 'rating':
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
      case 'distance':
        return currentPosts.slice(0).sort((a, b) => a.distance - b.distance);
      case 'bestDeal':
        return currentPosts
          .slice(0)
          .sort((a, b) => b.price - b.discountPrice - (a.price - a.discountPrice));
      case 'mostRecent':
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

  const handleApplyPress = () => {
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
    // If it's an invalid distance entry
    if (!isNormalInteger(searchRadius)) {
      Alert.alert('Invalid Distance Entry', 'Please enter an integer between 0 and 200.', [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]);
    } else {
      hideRefineDialog();
      setSnackBarVisibility(true);
    }
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
      <View style={{ flexShrink: 1, justifyContent: 'center' }}>
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
          posterName={item.posterName} // TODO: Add missing data from back-end
          posterStatus={item.posterStatus} // TODO: Add missing data from back-end
          tags={item.tags}
          imageUrl={item.imageUrl}
          cardStyle={[t.m1]}
          loadData={loadData}
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
      <SearchBar
        searcher={0}
        latitude="43"
        longitude="-79"
        radius="100000000"
        setActiveTags={setActiveTags}
        activeTags={activeTags}
        showRefineDialog={showRefineDialog}
        style={[t.m2]}
        errMsg="No matching tags in your area."
      />
      {/* Search bar & Refine Menu --- End */}
      {/* Refine Dialog--- Start */}
      <Portal>
        <Dialog
          style={[t.bgWhite, t.p8, t.mX5, t.roundedLg]}
          visible={refineDialogVisible}
          onDismiss={hideRefineDialog}
        >
          {/* If the select a store list expanded */}
          {expanded ? (
            <ScrollView>
              <StoresMenu
                expanded={expanded}
                setExpanded={setExpanded}
                selectedStore={selectedStore}
                setStore={setStore}
                stores={getStoresInfo(posts)}
                setStoreFilter={setStoreFilter}
              />
            </ScrollView>
          ) : (
            <>
              <View style={[t.bgGreen600]}>
                <Title style={[t.textCenter, t.textWhite]}>SORT BY</Title>
              </View>
              <SortByMenu setSort={setSort} sortValue={sort} />
              <View style={[t.bgGreen600]}>
                <Title style={[t.textCenter, t.textWhite]}>FILTER BY</Title>
              </View>
              <View style={[t.flexRow, t.itemsCenter, t.justifyBetween, t.bgGreen100]}>
                <TextInput
                  label="Distance"
                  value={searchRadius}
                  placeholder="5"
                  onChangeText={(text) => setSearchRadius(text)}
                  style={[t.w10_12]}
                  keyboardType="numeric"
                  mode="outlined"
                />
                <Text style={[t.pR4]}>km</Text>
              </View>
              <ScrollView style={[t.bgGreen100]}>
                <StoresMenu
                  expanded={expanded}
                  setExpanded={setExpanded}
                  selectedStore={selectedStore}
                  setStore={setStore}
                  stores={getStoresInfo(posts)}
                  setStoreFilter={setStoreFilter}
                />
              </ScrollView>
              <StyledButton title="Close" mode="outlined" size="small" onPress={hideRefineDialog} />
            </>
          )}
        </Dialog>
      </Portal>
      {/* Refine Dialog --- End */}
      {showMap ? (
        <Map posts={posts} height="250" />
      ) : (
        // <Map posts={posts} />
        <FlatList
          data={posts.filter((post) => post.isFiltered === false || storeFilter === 'All')}
          numColumns={2}
          renderItem={renderItem}
          style={{ flexGrow: 0 }}
        />
      )}
      <SnackBar snackBarVisible={snackBarVisible} setSnackBarVisibility={setSnackBarVisibility} />
    </SafeAreaView>
  );
}
