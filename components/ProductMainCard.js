import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import {
  ActivityIndicator,
  Colors,
  Drawer,
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  Portal,
  Modal,
} from 'react-native-paper';
import { t } from 'react-native-tailwindcss';
import ToggleButton from './ToggleButton';
import UserName from './TopBar/UserName';
import LikedCounter from './LikedCounter';
import ProductDetailCard from './ProductDetailCard';

const styles = StyleSheet.create({
  image: {
    resizeMode: 'cover',
    ...t.flex1,
  },
});
export default function ProductMainCard({
  price,
  totalVotes,
  storeName,
  distance,
  cardStyle = [],
  coverStyle = [],
}) {
  const [bookmarked, setBookmarked] = React.useState(false);
  const [showDetailModal, setShowDetailModal] = React.useState(false);

  return (
    <View>
      {/* <ToggleIcon selectedIcon="bookmark" unselectedIcon="bookmark-outline" /> */}
      <Portal>
        <Modal visible={showDetailModal} onDismiss={() => setShowDetailModal(!showDetailModal)}>
          <ProductDetailCard />
        </Modal>
      </Portal>
      <Card
        style={[t.flex, t.flexCol, t.alignCenter, ...cardStyle]}
        onLongPress={() => setShowDetailModal(!showDetailModal)}
      >
        {/* <ImageBackground style={styles.image} source={{ uri: 'https://picsum.photos/700' }}>
          <ToggleIcon selectedIcon="bookmark" unselectedIcon="bookmark-outline" />
        </ImageBackground> */}
        <View style={[]}>
          <Card.Cover
            source={{ uri: 'https://picsum.photos/700' }}
            style={[...coverStyle]}
            resizeMethod="resize"
            resizeMode="center"
          />
          <ToggleButton
            selected={bookmarked}
            selectedIcon="bookmark"
            unselectedIcon="bookmark-outline"
            handleSelected={() => setBookmarked(!bookmarked)}
          />
        </View>
        <Card.Content style={[t.flex, t.flexRow, t.justifyBetween]}>
          <View style={[t.flex, t.flexCol]}>
            {/* <Text>{totalVotes} likes</Text> */}
            <LikedCounter />
          </View>
          <View style={[t.flex, t.flexCol, t.itemsEnd]}>
            <View style={[t.flex, t.flexRow]}>
              <Text style={[t.textLg]}>${price.discounted}</Text>
              <Text style={[t.lineThrough]}>${price.regular}</Text>
            </View>
            <View style={[t.flex, t.flexRow]}>
              <Text>{storeName}</Text>
              <Text>{distance}</Text>
            </View>
          </View>
        </Card.Content>
      </Card>
    </View>
  );
}
