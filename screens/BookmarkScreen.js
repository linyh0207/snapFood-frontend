import * as React from 'react';
import { useState } from 'react';
import { View } from 'react-native';
import { Portal, Modal, TextInput, Text, Title, HelperText } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import { t } from 'react-native-tailwindcss';
import { SafeAreaView } from 'react-native-safe-area-context';
import StyledButton from '../components/StyledButton';
import SnackBar from '../components/SnackBar';
import ProductMainCard from '../components/ProductMainCard';
import SearchBar from '../components/SearchBar';
import Map from '../components/Map';
import ProductDetailCard from '../components/ProductDetailCard';

export default function ProductMainScreen({ navigation }) {
  const [posts, setPosts] = React.useState([]);
  const [refineModalVisible, setRefineModalVisibility] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const showRefineModal = () => setRefineModalVisibility(true);
  const hideRefineModal = () => setRefineModalVisibility(false);

  const loadData = async () => {
    const searchUri = `https://glacial-cove-31720.herokuapp.com/posts?filter=saved`;
    const apiData = await fetch(searchUri);
    const responseText = await apiData.text();
    const loadedPosts = JSON.parse(responseText).posts;
    console.log(loadedPosts);
    setPosts(loadedPosts);
  };

  React.useEffect(() => {
    loadData();
  }, []);

  const toMapView = () => {
    setShowMap(!showMap);
  };

  return (
    <SafeAreaView style={[t.flex1, t.bgWhite]}>
      <View style={[t.flexRow, t.itemsCenter]}>
        {/* Account Button to open drawer navigator */}
        <StyledButton
          icon="account-circle-outline"
          title="Account"
          size="small"
          onPress={() => navigation.openDrawer()}
        />

        {/* MapView / ListView Toggle Button Placeholder */}
        <StyledButton
          size="small"
          icon={showMap ? 'view-list' : 'map-outline'}
          onPress={toMapView}
        />
      </View>

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
              imageUrl={post.imageUrl}
            />
          ))}
        </ScrollView>
      )}
      <SnackBar />
    </SafeAreaView>
  );
}
