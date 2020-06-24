import * as React from 'react';
import { View, Button } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { t } from 'react-native-tailwindcss';
import StyledButton from '../components/StyledButton';
import DropDownMenu from '../components/DropDownMenu';
import SnackBar from '../components/SnackBar';
import ProductMainCard from '../components/ProductMainCard';
import SearchBar from '../components/SearchBar';

export default function ProductMainScreen() {
  // For account button to open drawer navigator
  const navigation = useNavigation();
  const [posts, setPosts] = React.useState([]);
  const [activeTags, setActiveTags] = React.useState([]);
  const [sort, setSort] = React.useState('Sort: Rating');

  const loadData = async () => {
    const searchUri = `http://localhost:8000/posts?latitude=5.2&longitude=4.3&radius=3000000${activeTags.map(
      (tag) => `&tag=${tag}`
    )}`;
    const apiData = await fetch(searchUri);
    const responseText = await apiData.text();
    const loadedPosts = JSON.parse(responseText).posts;
    setPosts(sortPosts(loadedPosts) || []);
  };

  React.useEffect(() => {
    setPosts(sortPosts(posts) || []);
    console.log(posts);
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

  React.useEffect(() => {
    loadData();
  }, [activeTags]);

  return (
    <View style={[t.flex1, t.bgWhite]}>
      <SearchBar
        searcher={1}
        latitude="20"
        longitude="10"
        radius="10000000"
        setActiveTags={setActiveTags}
        activeTags={activeTags}
      />
      <ScrollView contentContainerStyle={[t.p6]}>
        {/* Product card for product main page */}
        {posts.map((post) => (
          <ProductMainCard
            price={{ regular: post.price, discounted: post.discountPrice }}
            totalVotes={post.likes}
            storeName={post.storename}
            address={post.address}
            created={post.createdAt}
            distance={post.distance}
            initialUserSavedPost={post.userSavedPost}
            userLikedPost={post.userLikedPost}
            userDislikedPost={post.userDislikedPost}
            likes={post.likes}
            postId={post.id}
            key={post.id}
          />
        ))}
        {/* This is the drop down menu component - for ex: sortFilterMenu modal */}
        <DropDownMenu setSort={setSort} />

        {/* Account Button to open drawer navigator */}
        <StyledButton
          icon="account"
          title="Account"
          size="small"
          onPress={() => navigation.openDrawer()}
        />
      </ScrollView>

      {/* Sample Snackbar */}
      <SnackBar />
    </View>
  );
}
