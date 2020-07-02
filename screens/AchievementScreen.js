import * as React from 'react';
import { View, Image, ScrollView, YellowBox } from 'react-native';
import { t } from 'react-native-tailwindcss';
import { Text, IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList } from 'react-native-gesture-handler';
import { formatDistanceToNow } from 'date-fns';
import AchievementStatement from '../components/AchievementStatement';
import logo from '../assets/images/logos/green-logo.png';
import ProductMainCard from '../components/ProductMainCard';
import { FAKE_HOME_LOCATIONS } from '../utils/fakeData';

YellowBox.ignoreWarnings([
  'VirtualizedLists should never be nested', // TODO: Remove when fixed
]);
/* eslint-disable */
YellowBox.ignoreWarnings([
  'VirtualizedLists should never be nested', // TODO: Remove when fixed
]);
const numColumns = 2;
export default function AchievementScreen() {
  // For account button to open drawer navigator
  const navigation = useNavigation();

  const [posts, setPosts] = React.useState('');

  React.useEffect(() => {
    async function fetchData() {
      const test = await fetch(
        `https://glacial-cove-31720.herokuapp.com/posts?filter=created&latitude=${FAKE_HOME_LOCATIONS.Markham.latitude}&longitude=${FAKE_HOME_LOCATIONS.Markham.longitude}`
      );
      const load = await test.text();
      const posted = await JSON.parse(load).posts;
      setPosts(posted);
    }
    fetchData();
  }, []);

  let totalSave = 0;
  let totalLikes = 0;
  for (let post of posts) {
    totalSave += post.price - post.discountPrice;
    totalLikes += post.likes;
  }

  let array = [...posts];
  const sortedPosts = array.sort((a, b) => a.likes - b.likes);

  const renderItem = ({ item }) => {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
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
        />
      </View>
    );
  };
  return (
    <SafeAreaView style={({ flex: 1, flexDirection: 'column', alignItems: 'center' }, [t.bgWhite])}>
      {/* Top Navigator --- Start */}
      <ScrollView>
        <View style={[t.flexRow, t.itemsCenter, t.justifyBetween, t.pX4]}>
          <IconButton
            icon="account-circle-outline"
            color="#22543d"
            size={30}
            onPress={() => navigation.openDrawer()}
          />
          <Image source={logo} style={[t.w56, t.h24]} />
          <IconButton color="#FFFFFF" size={30} />
        </View>
        {/* Top Navigator --- End */}
        <AchievementStatement>
          Total savings <Text style={[t.textRed400]}>${totalSave.toFixed(2)}</Text> from your posts
        </AchievementStatement>
        <AchievementStatement>
          Your reputation score is <Text style={[t.textRed400]}>{totalLikes}</Text>
        </AchievementStatement>
        <AchievementStatement>
          Your posts average{' '}
          <Text style={[t.textRed400, t.si]}>{(totalLikes / posts.length).toFixed(2)}</Text> likes
          each
        </AchievementStatement>
        <AchievementStatement>Your top and lowest rated posts:</AchievementStatement>
        <FlatList
          data={[sortedPosts[sortedPosts.length - 1], sortedPosts[0]]}
          numColumns={numColumns}
          renderItem={renderItem}
          scrollEnabled={false}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
