import * as React from 'react';
import { View, FlatList, Dimensions, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { t } from 'react-native-tailwindcss';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import StyledButton from '../components/StyledButton';
import UserName from '../components/TopBar/UserName';
import AchievementStatement from '../components/AchievementStatement';
import ProductMainCard from '../components/ProductMainCard';
import ProductDetailCard from '../components/ProductDetailCard';

const posts = [
  {
    id: '1',
    price: { discounted: 2.99, regular: 4.99 },
    storeName: 'T&T Supermarket',
    distance: '500m',
    timeFromNow: '1 day ago',
    likes: 10,
    dislikes: 4,
    posterName: 'Amy',
    posterStatus: 'super',
    tags: ['bread', 'sliced'],
  },
  {
    id: '2',
    price: { discounted: 2.99, regular: 4.99 },
    storeName: 'T&T Supermarket',
    distance: '500m',
    timeFromNow: '1 day ago',
    likes: 10,
    dislikes: 4,
    posterName: 'Amy',
    tags: ['bread', 'sliced'],
  },
  {
    id: '3',
    price: { discounted: 2.99, regular: 4.99 },
    storeName: 'T&T Supermarket',
    distance: '500m',
    timeFromNow: '1 day ago',
    likes: 10,
    dislikes: 4,
    posterName: 'Amy',
    posterStatus: 'super',
    tags: ['bread', 'sliced'],
  },
  {
    id: '4',
    price: { discounted: 2.99, regular: 4.99 },
    storeName: 'T&T Supermarket',
    distance: '500m',
    timeFromNow: '1 day ago',
    likes: 10,
    dislikes: 4,
    posterName: 'Amy',
    tags: ['bread', 'sliced'],
  },
  {
    price: { discounted: 2.99, regular: 4.99 },
    storeName: 'T&T Supermarket',
    distance: '500m',
    timeFromNow: '1 day ago',
    likes: 10,
    dislikes: 4,
    posterName: 'Amy',

    tags: ['bread', 'sliced'],
  },
];
// const formatData = (data, numColumns) => {
//   const totalRows = Math.floor(data.length / numColumns);
//   let totalLastRow = posts.length - totalRows * numColumns;

//   while (totalLastRow !== 0 && totalLastRow !== numColumns) {
//     posts.push({
//       id: `blank-${posts.length}`,
//       price: { discounted: 0, regular: 0 },
//       totalVotes: 0,
//       storeName: 'blank',
//       distance: '0m',
//       empty: true,
//     });
//     totalLastRow += 1;
//   }
// };
// const WIDTH = Dimensions.get('window').width;

const numColumns = 2;

export default function MyPostsScreen() {
  const navigation = useNavigation();

  const renderItem = ({ item }) => {
    return (
      <View>
        <ProductMainCard key={item.id} {...item} cardStyle={[t.m1]} />
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
      <View
        style={{
          flex: 0,
          flexDirection: 'row',
          // padding: 10,
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
        }}
      >
        <StyledButton icon="account" size="small" onPress={() => navigation.openDrawer()} />
        <UserName styles={[t.pX1]} textStyles={[t.textLg]} status="super">
          Amy
        </UserName>
      </View>
      <AchievementStatement>I have posted 100 posts</AchievementStatement>
      <FlatList data={posts} numColumns={numColumns} renderItem={renderItem} />
    </SafeAreaView>
  );
}

// const style = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   item: {
//     backgroundColor: '#3232ff',
//     alignItems: 'center',
//     justifyContent: 'center',
//     flex: 1,
//     margin: 1,
//     height: WIDTH / numColumns,
//   },
// });
