import * as React from 'react';
import { View, FlatList } from 'react-native';
import { t } from 'react-native-tailwindcss';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import StyledButton from '../components/StyledButton';
import UserName from '../components/TopBar/UserName';
import AchievementStatement from '../components/AchievementStatement';
import ProductMainCard from '../components/ProductMainCard';

const posts = [
  {
    id: '1',
    price: { discounted: 2.99, regular: 4.99 },
    storeName: 'T&T Supermarket',
    distance: '500',
    timeFromNow: '1 day ago',
    likes: 10,
    dislikes: 4,
    posterName: 'Amy',
    posterStatus: 'super',
    tags: ['bread', 'sliced'],
    isExpired: true,
  },
  {
    id: '2',
    price: { discounted: 2.99, regular: 4.99 },
    storeName: 'T&T Supermarket',
    distance: '500',
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
    distance: '500',
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
    distance: '500',
    timeFromNow: '1 day ago',
    likes: 10,
    dislikes: 4,
    posterName: 'Amy',
    tags: ['bread', 'sliced'],
  },
  {
    price: { discounted: 2.99, regular: 4.99 },
    storeName: 'T&T Supermarket',
    distance: '500',
    timeFromNow: '1 day ago',
    likes: 10,
    dislikes: 4,
    posterName: 'Amy',
    tags: ['bread', 'sliced'],
  },
];

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
