import * as React from 'react';
import { View, Button } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { t } from 'react-native-tailwindcss';
import StyledButton from '../components/StyledButton';
import DropDownMenu from '../components/DropDownMenu';
import SnackBar from '../components/SnackBar';
import ProductMainCard from '../components/ProductMainCard';

export default function ProductMainScreen() {
  // For account button to open drawer navigator
  const navigation = useNavigation();
  const [posts, setPosts] = React.useState([]);

  const loadData = async () => {
    const apiData = await fetch(
      `http://localhost:8000/posts?latitude=5.2&longitude=4.3&&tag=free-run&tag=eggs&tag=cereal&radius=10000000`
    );
    const responseText = await apiData.text();
    const loadedPosts = JSON.parse(responseText).posts;
    setPosts(loadedPosts || []);
  };

  React.useEffect(() => {
    loadData();
  }, []);

  return (
    <View style={[t.flex1, t.bgWhite]}>
      <Button onPress={() => console.log(posts)}>PRESS ME</Button>
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
        <DropDownMenu />

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
