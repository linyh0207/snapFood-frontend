import * as React from 'react';
import { Text, View } from 'react-native';
import { Card, Chip, IconButton, Portal, Modal } from 'react-native-paper';
import { t } from 'react-native-tailwindcss';
import ToggleButton from './ToggleButton';
import UserName from './TopBar/UserName';
import LikedCounter from './LikedCounter';
import formatDistance from '../helpers/formatDistance';
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
  imageUrl,
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
      <Card style={[t.mX3]}>
        <Card.Content style={[t.flex1, t.flexRow, t.justifyBetween, t.itemsCenter, t.p6]}>
          <Text style={[t.textGray600, t.italic]}>{timeFromNow}</Text>
          <IconButton
            icon="map-marker"
            onPress={() => setShowMapModal(!showMapModal)}
            compact
            style={[t.mLAuto]}
            color="#22543d"
          />
          <Text>
            {storeName} ({formatDistance(distance)})
          </Text>
        </Card.Content>
        <Card.Cover
          source={{
            uri: imageUrl,
          }}
          style={{ width: '80%', height: undefined, aspectRatio: 4 / 5, alignSelf: 'center' }}
        />

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
          <UserName
            textStyles={[t.fontBold, t.trackingWidest]}
            iconColor="gold"
            status={posterStatus}
          >
            {posterName}
          </UserName>
          <Text style={[t.textXl, t.mLAuto, t.textGreen900, t.pR1]}>
            ${price.discounted.toFixed(2)}
          </Text>
          <Text style={[t.lineThrough, t.textGray800]}>${price.regular.toFixed(2)}</Text>
        </Card.Content>
        <Card.Content style={[t.flex1, t.flexRow, t.flexWrap, t.justifyStart, t.mT2, t.mB12]}>
          {tags.map((tag) => (
            <Chip
              key={tag}
              height={30}
              textStyle={[t.textSm, t.textWhite]}
              style={[t.bgGreen500, t.justifyCenter, t.mX1]}
              mode="outlined"
            >
              {tag}
            </Chip>
          ))}
        </Card.Content>
      </Card>
    </View>
  );
}
