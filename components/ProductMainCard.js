import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Card, Portal, Modal } from 'react-native-paper';
import { t } from 'react-native-tailwindcss';
import ToggleButton from './ToggleButton';
import LikedCounter from './LikedCounter';
import ProductDetailCard from './ProductDetailCard';

export default function ProductMainCard({
  price,
  storeName,
  distance,
  cardStyle = [],
  coverStyle = [],
}) {
  const [bookmarked, setBookmarked] = React.useState(false);
  const [showDetailModal, setShowDetailModal] = React.useState(false);

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        // alignItems: 'center',
        justifyContent: 'center',
        // width: 100,
        // marginHorizontal: 10,
        // marginVertical: 10,
      }}
    >
      <Portal>
        <Modal visible={showDetailModal} onDismiss={() => setShowDetailModal(!showDetailModal)}>
          <ProductDetailCard />
        </Modal>
      </Portal>
      <Card
        // style={[t.flex, t.flexCol, t.alignCenter, ...cardStyle]}
        style={{
          flex: 1,
          // flexDirection: 'column',
          // alignItems: 'center',
          marginHorizontal: 5,
          marginVertical: 5,
        }}
        onLongPress={() => setShowDetailModal(!showDetailModal)}
      >
        <View style={[]}>
          <Text>10 minutes ago</Text>
        </View>
        <Card.Cover
          source={{ uri: 'https://picsum.photos/700' }}
          style={[...coverStyle]}
          resizeMethod="resize"
          resizeMode="center"
        />
        {/* <View style={{ width: 80 }}>
            <Text>View here with width 80</Text>
          </View> */}

        {/* <Card.Content style={[t.flexNone, t.flexRow, t.justifyBetween]}> */}
        <Card.Content
          style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between', width: 190 }}
        >
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
            <LikedCounter />
            <ToggleButton
              selected={bookmarked}
              selectedIcon="bookmark"
              unselectedIcon="bookmark-outline"
              handleSelected={() => setBookmarked(!bookmarked)}
            />
          </View>
          {/* <View style={[t.flex, t.flexCol, t.itemsEnd]}> */}
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start' }}>
            <Text style={[t.textLg]}>${price.discounted}</Text>
            <Text style={[t.lineThrough]}>${price.regular}</Text>
          </View>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text>{storeName}</Text>
            <Text>{distance}</Text>
          </View>
        </Card.Content>
      </Card>
    </View>
  );
}
