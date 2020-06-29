import * as React from 'react';
import { Text, View } from 'react-native';

import { Card, Chip, IconButton, Portal, Modal } from 'react-native-paper';
import { t } from 'react-native-tailwindcss';
import ToggleButton from './ToggleButton';
import UserName from './TopBar/UserName';
import LikedCounter from './LikedCounter';
// import Map from './Map'; //es-lint error

export default function ProductDetailCard({
  timeFromNow = '1 day ago',
  price,
  storeName,
  distance,
  likes,
  dislikes,
  posterName,
  posterStatus = 'regular',
  tags = [],
}) {
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
      <Card style={{ flex: 1, flexDirection: 'column' }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          }}
        >
          <Text>{timeFromNow}</Text>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'flex-end',
            }}
          >
            <IconButton
              icon="map-marker"
              onPress={() => setShowMapModal(!showMapModal)}
              compact
              style={{ marginBottom: -5, marginRight: -5 }}
            />
            <Text>
              {storeName} ({distance})
            </Text>
          </View>
        </View>
        <Card.Cover
          source={{ uri: 'https://picsum.photos/200/300' }}
          resizeMethod="resize"
          resizeMode="center"
        />

        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
          <LikedCounter likes={likes} dislikes={dislikes} variant="detail" />
          <ToggleButton
            selected={bookmarked}
            selectedIcon="bookmark"
            unselectedIcon="bookmark-outline"
            handleSelected={() => setBookmarked(!bookmarked)}
          />
        </View>
        <Card.Content style={{ flex: 1, flexDirection: 'row' }}>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
              <Text>By: </Text>
              <UserName status={posterStatus}>{posterName}</UserName>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
              <Text style={[t.textLg]}>${price.discounted}</Text>
              <Text style={[t.lineThrough]}>${price.regular}</Text>
            </View>
          </View>
        </Card.Content>
        <Card.Content
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            marginTop: 3,
            marginLeft: -3,
          }}
        >
          {tags.map((tag) => (
            <Chip key={tag} mode="outlined" style={{}}>
              {tag}
            </Chip>
          ))}
        </Card.Content>
      </Card>
    </View>
  );
}
