import * as React from 'react';
import { View, Image, Alert } from 'react-native';
import { IconButton } from 'react-native-paper';
import { FlatList } from 'react-native-gesture-handler';
import { useFocusEffect } from '@react-navigation/native';
import { t } from 'react-native-tailwindcss';
import { SafeAreaView } from 'react-native-safe-area-context';
import { formatDistanceToNow } from 'date-fns';
import ProductMainCard from '../components/ProductMainCard';
import Map from '../components/Map';
import logo from '../assets/images/logos/green-logo.png';
import { FAKE_HOME_LOCATIONS } from '../utils/fakeData';

export default function BookmarkScreen({ navigation }) {
  const [posts, setPosts] = React.useState([]);
  const [showMap, setShowMap] = React.useState(false);

  const numColumns = 2;

  // May need to update the URL with lng and lat
  const loadData = async () => {
    const searchUri = `https://glacial-cove-31720.herokuapp.com/posts?filter=saved&latitude=${FAKE_HOME_LOCATIONS.Markham.latitude}&longitude=${FAKE_HOME_LOCATIONS.Markham.longitude}`;
    const apiData = await fetch(searchUri);
    const responseText = await apiData.text();
    const loadedPosts = JSON.parse(responseText).posts;
    setPosts(loadedPosts);
  };

  useFocusEffect(
    React.useCallback(() => {
      console.log('should run once only when onFirstLoad');
      loadData();
    }, [])
  ); // run once when screen loads

  const toMapView = () => {
    setShowMap(!showMap);
  };

  // eslint-disable-next-line no-shadow
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
          posterName="Amy" // TODO: Add missing data from back-end
          posterStatus="super" // TODO: Add missing data from back-end
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
      {showMap ? (
        <Map posts={posts} />
      ) : (
        <FlatList data={posts} numColumns={numColumns} renderItem={renderItem} />
      )}
    </SafeAreaView>
  );
}
