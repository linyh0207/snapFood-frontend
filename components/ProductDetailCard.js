import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Card, Chip, IconButton, Portal, Modal } from 'react-native-paper';
import { t } from 'react-native-tailwindcss';
import ToggleButton from './ToggleButton';
import UserName from './TopBar/UserName';
import LikedCounter from './LikedCounter';
// import Map from './Map'; //es-lint error

const styles = StyleSheet.create({
  image: {
    resizeMode: 'cover',
    ...t.flex1,
  },
});
export default function ProductDetailCard({ price, totalVotes, storeName, distance }) {
  const tags = ['bread', 'sliced']; // dummy data

  const [bookmarked, setBookmarked] = React.useState(false);
  const [showMapModal, setShowMapModal] = React.useState(false);
  return (
    <View style={[t.flex1]}>
      {/* throws eslint error  */}
      {/* <Portal>
        <Modal visible={showMapModal} onDismiss={() => setShowMapModal(!showMapModal)}>
          <Map />
        </Modal>
      </Portal> */}
      <View style={{ flex: 1, flexDirection: 'column' }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          }}
        >
          <Text>19 hours ago</Text>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'flex-end',
            }}
          >
            <IconButton icon="map-marker" onPress={() => setShowMapModal(!showMapModal)} compact />
            <Text>T&T Supermarket (500m)</Text>
          </View>
        </View>
        <Card.Cover
          source={{ uri: 'https://picsum.photos/200/300' }}
          resizeMethod="resize"
          resizeMode="center"
        />

        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
          <LikedCounter likes={10} dislikes={1} variant="detail" />
          <ToggleButton
            selected={bookmarked}
            selectedIcon="bookmark"
            unselectedIcon="bookmark-outline"
            handleSelected={() => setBookmarked(!bookmarked)}
          />
        </View>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
              <Text>By: </Text>
              <UserName status="super">Amy</UserName>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
              <Text style={[t.textLg]}>${price.discounted}</Text>
              <Text style={[t.lineThrough]}>${price.regular}</Text>
            </View>
          </View>
        </View>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start' }}>
          {tags.map((tag) => (
            <Chip key={tag} mode="outlined" style={{}}>
              {tag}
            </Chip>
          ))}
        </View>
      </View>
    </View>
  );
}
