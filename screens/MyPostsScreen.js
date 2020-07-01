import * as React from 'react';
import { View, FlatList, Text } from 'react-native';
import { t } from 'react-native-tailwindcss';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { formatDistanceToNow } from 'date-fns';
import StyledButton from '../components/StyledButton';
import UserName from '../components/TopBar/UserName';
import AchievementStatement from '../components/AchievementStatement';
import ProductMainCard from '../components/ProductMainCard';

const numColumns = 2;

export default function MyPostsScreen() {
  const [posts, setPosts] = React.useState('');

  React.useEffect(() => {
    async function fetchData() {
      const test = await fetch(
        'https://glacial-cove-31720.herokuapp.com/posts?filter=created&latitude=-79&longitude=43'
      );
      const load = await test.text();
      const posted = await JSON.parse(load).posts;
      setPosts(posted);
    }
    fetchData();
  }, []);

  const navigation = useNavigation();

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
    <SafeAreaView style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
      <View
        style={{
          flex: 0,
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
        }}
      >
        <StyledButton icon="account" size="small" onPress={() => navigation.openDrawer()} />
        <UserName styles={[t.pX1]} textStyles={[t.textLg]} status="super">
          Amy
        </UserName>
      </View>
      <AchievementStatement>I have posted {posts.length} posts</AchievementStatement>
      {posts.length >= 1 ? (
        <FlatList data={posts} numColumns={numColumns} renderItem={renderItem} />
      ) : (
        <Text>No Posts Have Been Made</Text>
      )}
    </SafeAreaView>
  );
}
