import * as React from 'react';
import { View, FlatList, Image } from 'react-native';
import { Text, IconButton } from 'react-native-paper';
import { t } from 'react-native-tailwindcss';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { formatDistanceToNow } from 'date-fns';
import AchievementStatement from '../components/AchievementStatement';
import ProductMainCard from '../components/ProductMainCard';
import logo from '../assets/images/logos/green-logo.png';
import { FAKE_HOME_LOCATIONS } from '../utils/fakeData';
import Map from '../components/Map';

const numColumns = 2;

export default function MyPostsScreen() {
  const [posts, setPosts] = React.useState('');
  const [showMap, setShowMap] = React.useState(false);

  React.useEffect(() => {
    async function fetchData() {
      const test = await fetch(
        `https://glacial-cove-31720.herokuapp.com/posts?filter=created&latitude=${FAKE_HOME_LOCATIONS.Markham.latitude}&longitude=${FAKE_HOME_LOCATIONS.Markham.longitude}`
      );
      const load = await test.text();
      const posted = await JSON.parse(load).posts;
      setPosts(posted.reverse());
    }
    fetchData();
  }, []);

  const toMapView = () => {
    setShowMap(!showMap);
  };

  const navigation = useNavigation();

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
        />
      </View>
    );
  };

  const listPost =
    posts.length >= 1 ? (
      <FlatList data={posts} numColumns={numColumns} renderItem={renderItem} />
    ) : (
      <Text>No Posts Have Been Made</Text>
    );

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
      <AchievementStatement>I have posted {posts.length} posts</AchievementStatement>
      {showMap ? <Map height="270" posts={posts} /> : listPost}
    </SafeAreaView>
  );
}
