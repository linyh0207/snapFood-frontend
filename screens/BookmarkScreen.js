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

export default function ProductMainScreen({ navigation }) {
  const [searchRadius, setSearchRadius] = React.useState('499');
  const [posts, setPosts] = React.useState([]);
  const [activeTags, setActiveTags] = React.useState([]);
  const [storeFilter, setStoreFilter] = React.useState('All');
  const [showMap, setShowMap] = React.useState(false);

  const numColumns = 2;

  // May need to update the URL with lng and lat
  const loadData = async () => {
    const searchUri = `https://glacial-cove-31720.herokuapp.com/posts?filter=saved`;
    const apiData = await fetch(searchUri);
    const responseText = await apiData.text();
    const loadedPosts = JSON.parse(responseText).posts;
    setPosts(loadedPosts);
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

  const toMapView = () => {
    setShowMap(!showMap);
  };

  // eslint-disable-next-line no-shadow
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
      {showMap ? (
        <Map posts={posts} />
      ) : (
        <FlatList
          data={posts.filter((post) => post.isFiltered === false || storeFilter === 'All')}
          numColumns={numColumns}
          renderItem={renderItem}
        />
      )}
    </SafeAreaView>
  );
}

// import * as React from 'react';
// import { useState } from 'react';
// import { View } from 'react-native';
// import { Portal, Modal, TextInput, Text, Title, HelperText } from 'react-native-paper';
// import { ScrollView } from 'react-native-gesture-handler';
// import { t } from 'react-native-tailwindcss';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import StyledButton from '../components/StyledButton';
// import SortByMenu from '../components/DropDownMenu/SortByMenu';
// import StoresMenu from '../components/DropDownMenu/StoresMenu';
// import SnackBar from '../components/SnackBar';
// import ProductMainCard from '../components/ProductMainCard';
// import SearchBar from '../components/SearchBar';
// import Map from '../components/Map';
// import ProductDetailCard from '../components/ProductDetailCard';

// export default function ProductMainScreen({ navigation }) {
//   const [posts, setPosts] = React.useState([]);
//   const [refineModalVisible, setRefineModalVisibility] = useState(false);
//   const [showMap, setShowMap] = useState(false);
//   const showRefineModal = () => setRefineModalVisibility(true);
//   const hideRefineModal = () => setRefineModalVisibility(false);

//   const loadData = async () => {
//     const searchUri = `https://glacial-cove-31720.herokuapp.com/posts?filter=saved`;
//     const apiData = await fetch(searchUri);
//     const responseText = await apiData.text();
//     const loadedPosts = JSON.parse(responseText).posts;
//     console.log(loadedPosts);
//     setPosts(loadedPosts);
//   };

//   React.useEffect(() => {
//     loadData();
//   }, []);

//   const toMapView = () => {
//     setShowMap(!showMap);
//   };

//   return (
//     <SafeAreaView style={[t.flex1, t.bgWhite]}>
//       <View style={[t.flexRow, t.itemsCenter]}>
//         {/* Account Button to open drawer navigator */}
//         <StyledButton
//           icon="account-circle-outline"
//           title="Account"
//           size="small"
//           onPress={() => navigation.openDrawer()}
//         />

//         {/* MapView / ListView Toggle Button Placeholder */}
//         <StyledButton
//           size="small"
//           icon={showMap ? 'view-list' : 'map-outline'}
//           onPress={toMapView}
//         />
//       </View>

//       {showMap ? (
//         <Map />
//       ) : (
//         <ScrollView contentContainerStyle={[t.p6]}>
//           {/* Product card for product main page */}
//           {posts.map((post) => (
//             <ProductMainCard
//               price={{ regular: post.price, discounted: post.discountPrice }}
//               // totalVotes={post.likes}
//               storeName={post.storename}
//               address={post.address}
//               // created={post.createdAt}
//               distance={post.distance}
//               initialUserSavedPost={post.userSavedPost}
//               userLikedPost={post.userLikedPost}
//               userDislikedPost={post.userDislikedPost}
//               likes={post.likes}
//               postId={post.id}
//               key={post.id}
//               timeFromNow="1 day ago"
//               dislikes={4}
//               posterName="Amy"
//               posterStatus="super"
//               tags={['bread', 'sliced']}
//               imageUrl={post.imageUrl}
//             />
//           ))}
//         </ScrollView>
//       )}
//       <SnackBar />
//     </SafeAreaView>
//   );
// }
