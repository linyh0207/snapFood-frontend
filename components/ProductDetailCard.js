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
    <View>
      {/* //  throws eslint error
    //  <Portal>
    //   <Modal visible={showMapModal} onDismiss={() => setShowMapModal(!showMapModal)}>
    //     <Map />
    //   </Modal>
    // </Portal> */}
      <Card>
        <Card.Content style={[t.flex1, t.flexRow, t.justifyBetween, t.itemsCenter, t.p6]}>
          <Text>{timeFromNow}</Text>
          <IconButton
            icon="map-marker"
            onPress={() => setShowMapModal(!showMapModal)}
            compact
            style={[t.mLAuto]}
          />
          <Text>
            {storeName} ({distance})
          </Text>
        </Card.Content>
        <Card.Cover source={{ uri: 'https://picsum.photos/200/300' }} style={t.mX2} />

        <Card.Actions>
          <LikedCounter likes={likes} dislikes={dislikes} variant="detail" />
          <ToggleButton
            selected={bookmarked}
            selectedIcon="bookmark"
            unselectedIcon="bookmark-outline"
            handleSelected={() => setBookmarked(!bookmarked)}
            style={[t.mLAuto]}
          />
        </Card.Actions>
        <Card.Content style={[t.flex1, t.flexRow, t.justifyBetween, t.itemsCenter, t.pY4]}>
          <Text>By: </Text>
          <UserName status={posterStatus}>{posterName}</UserName>

          <Text style={[t.textLg, t.mLAuto]}>${price.discounted}</Text>
          <Text style={[t.lineThrough]}>${price.regular}</Text>
        </Card.Content>
        <Card.Content style={[t.flex1, t.flexRow, t.flexWrap, t.justifyStart, t.mB12]}>
          {tags.map((tag) => (
            <Chip key={tag} height={30} textStyle={[t.textBlack, t.textSm]} mode="outlined">
              {tag}
            </Chip>
          ))}
        </Card.Content>
      </Card>
    </View>
  );
}
