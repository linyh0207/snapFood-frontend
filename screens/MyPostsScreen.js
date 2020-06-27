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
// const WIDTH = Dimensions.get('window').width;

const numColumns = 2;

export default function MyPostsScreen() {
  const navigation = useNavigation();

  const renderItem = ({ item, index }) => {
    return (
      <View
      // style={{
      //   flex: 1,
      //   // flexDirection: 'column',
      //   // alignItems: 'center',
      //   // justifyContent: 'center',
      //   width: 100,
      //   marginHorizontal: 10,
      //   marginVertical: 10,
      // }}
      >
        <ProductMainCard key={item.id} {...item} cardStyle={[t.m1]} />
        {/* <ProductDetailCard key={item.id} /> */}
      </View>
    );
  };
  return (
    <SafeAreaView style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
      {/* <View style={[t.flex1, t.flexRow, t.itemsCenter, t.p2]}> */}
      <View
        style={{
          flex: 0,
          flexDirection: 'row',
          padding: 20,
          justifyContent: 'center',
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
