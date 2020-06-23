import * as React from 'react';
import { View, FlatList, Dimensions, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { t } from 'react-native-tailwindcss';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import StyledButton from '../components/StyledButton';
import UserName from '../components/TopBar/UserName';
import AchievementStatement from '../components/AchievementStatement';
import ProductMainCard from '../components/ProductMainCard';

const posts = [
  {
    id: '1',
    price: { discounted: 2.99, regular: 4.99 },
    totalVotes: 10,
    storeName: 'T&T Supermarket',
    distance: '500m',
  },
  {
    id: '2',

    price: { discounted: 2.99, regular: 4.99 },
    totalVotes: 10,
    storeName: 'T&T Supermarket',
    distance: '500m',
  },
  {
    id: '3',

    price: { discounted: 2.99, regular: 4.99 },
    totalVotes: 10,
    storeName: 'T&T Supermarket',
    distance: '500m',
  },
  {
    id: '4',

    price: { discounted: 2.99, regular: 4.99 },
    totalVotes: 10,
    storeName: 'T&T Supermarket',
    distance: '500m',
  },
  {
    id: '5',

    price: { discounted: 2.99, regular: 4.99 },
    totalVotes: 10,
    storeName: 'T&T Supermarket',
    distance: '500m',
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

const numColumns = 2;
const WIDTH = Dimensions.get('window').width;

export default function MyPostsScreen() {
  const navigation = useNavigation();

  const renderItem = ({ item, index }) => {
    return (
      <View>
        <ProductMainCard {...item} cardStyle={[t.m1]} />
      </View>
    );
  };
  return (
    <View style={[t.flex, t.flexCol]}>
      <View style={[t.flex, t.flexRow, t.itemsCenter, t.p2]}>
        <StyledButton icon="account" size="small" onPress={() => navigation.openDrawer()} />
        <UserName styles={[t.pX1]} textStyles={[t.textLg]} status="super">
          UserName
        </UserName>
      </View>
      <AchievementStatement>I have posted 100 posts</AchievementStatement>
      <View>
        <FlatList data={posts} numColumns={numColumns} renderItem={renderItem} />
      </View>
    </View>
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
