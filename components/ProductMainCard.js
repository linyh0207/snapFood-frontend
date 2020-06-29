import * as React from 'react';
import { Text, View } from 'react-native';
import { Card, Portal, Modal } from 'react-native-paper';
import { t } from 'react-native-tailwindcss';
import ToggleButton from './ToggleButton';
import LikedCounter from './LikedCounter';
import ProductDetailCard from './ProductDetailCard';

export default function ProductMainCard(props) {
  const {
    timeFromNow = '1 day ago',
    price,
    storeName,
    distance,
    likes,
    dislikes,
    posterName,
    posterStatus = 'regular',
    tags = [],
  } = props;
  const [bookmarked, setBookmarked] = React.useState(false);
  const [showDetailModal, setShowDetailModal] = React.useState(false);

  return (
    <View>
      <Portal>
        <Modal visible={showDetailModal} onDismiss={() => setShowDetailModal(!showDetailModal)}>
          <ProductDetailCard {...props} />
        </Modal>
      </Portal>
      <Card
        style={{
          flex: 1,
          marginHorizontal: 5,
          marginVertical: 5,
          borderColor: posterStatus === 'super' ? '#48bb78' : 'transparent',
          borderWidth: posterStatus === 'super' ? 2 : 0,
        }}
        onLongPress={() => setShowDetailModal(!showDetailModal)}
      >
        <View style={[]}>
          <Text>{timeFromNow}</Text>
        </View>
        <Card.Cover
          source={{ uri: 'https://picsum.photos/200/300' }}
          resizeMethod="resize"
          resizeMode="center"
        />
        <Card.Content
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'space-between',
            width: '100%',
          }}
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
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
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
