import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, Text, View, ImageBackground, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

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
  Chip,
  IconButton,
  Portal,
  Modal,
} from 'react-native-paper';
import { t } from 'react-native-tailwindcss';
import ToggleButton from './ToggleButton';
import UserName from './TopBar/UserName';
import LikedCounter from './LikedCounter';
import Map from './Map';

const styles = StyleSheet.create({
  image: {
    resizeMode: 'cover',
    ...t.flex1,
  },
});
export default function ProductDetailCard({
  price,
  totalVotes,
  storeName,
  distance,
  cardStyle = [],
  coverStyle = [],
}) {
  const tags = ['bread', 'sliced'];
  const [bookmarked, setBookmarked] = React.useState(false);
  const [showMapModal, setShowMapModal] = React.useState(false);
  return (
    <SafeAreaView style={[t.flex1]}>
      <Portal>
        <Modal visible={showMapModal} onDismiss={() => setShowMapModal(!showMapModal)}>
          <Map />
        </Modal>
      </Portal>
      <View>
        <View>
          <Text>19 hours ago</Text>
          <View>
            <IconButton icon="map-marker" onPress={() => setShowMapModal(!showMapModal)} />
            <Text>T&T Supermarket (500m)</Text>
          </View>
        </View>
        <Image
          style={{ width: '50%', height: '20%' }}
          resizeMethod="resize"
          resizeMode="center"
          source={{ uri: 'https://picsum.photos/700' }}
        />
        <View>
          <LikedCounter />
          <ToggleButton
            selected={bookmarked}
            selectedIcon="bookmark"
            unselectedIcon="bookmark-outline"
            handleSelected={() => setBookmarked(!bookmarked)}
          />
        </View>
        <View>
          <View>
            <Text>by: Amy</Text>
            {tags.map((tag) => (
              // <Chip mode="outlined">{tag}</Chip>
              <Text>{tag}</Text>
            ))}
          </View>
          <Text>
            $1.50 <Text style={[t.lineThrough]}>$2.99</Text>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
// <View>
//   {/* <ToggleIcon selectedIcon="bookmark" unselectedIcon="bookmark-outline" /> */}

//   <Card style={[t.flex, t.flexCol, t.alignCenter, ...cardStyle]}>
//     {/* <ImageBackground style={styles.image} source={{ uri: 'https://picsum.photos/700' }}>
//       <ToggleIcon selectedIcon="bookmark" unselectedIcon="bookmark-outline" />
//     </ImageBackground> */}
//     <View style={[]}>
//       <Card.Cover
//         source={{ uri: 'https://picsum.photos/700' }}
//         style={[...coverStyle]}
//         resizeMethod="resize"
//         resizeMode="center"
//       />
//       <ToggleButton
//         selected={bookmarked}
//         selectedIcon="bookmark"
//         unselectedIcon="bookmark-outline"
//         handleSelected={() => setBookmarked(!bookmarked)}
//       />
//     </View>
//     <Card.Content style={[t.flex, t.flexRow, t.justifyBetween]}>
//       <View style={[t.flex, t.flexCol]}>
//         <Text>{totalVotes} likes</Text>
//         <LikedCounter />
//       </View>
//       <View style={[t.flex, t.flexCol, t.itemsEnd]}>
//         <View style={[t.flex, t.flexRow]}>
//           <Text style={[t.textLg]}>${price.discounted}</Text>
//           <Text style={[t.lineThrough]}>${price.regular}</Text>
//         </View>
//         <View style={[t.flex, t.flexRow]}>
//           <Text>{storeName}</Text>
//           <Text>{distance}</Text>
//         </View>
//       </View>
//     </Card.Content>
//   </Card>
// </View>
