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
} from 'react-native-paper';
import { t } from 'react-native-tailwindcss';
import ToggleButton from './ToggleButton';
import UserName from './TopBar/UserName';
import LikedCounter from './LikedCounter';

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
  address,
  created,
  likes,
  initialUserSavedPost,
  userLikedPost,
  userDislikedPost,
  postId,
  userId = '5eead9d6d34bf31f58a86904',
}) {
  // USE ID IN AJAX TO CHANGE SAVED/CREATED
  const [userSavedPost, setUserSavedPost] = React.useState(initialUserSavedPost);

  const formatDistance = (rawDistance) => {
    if (distance < 1000) {
      return `${Math.round(rawDistance / 100) * 100}m`;
    }
    return `${Math.round(rawDistance / 1000)}km`;
  };

  const toggleSavePost = async () => {
    setUserSavedPost((prev) => !prev);
    const res = await fetch(`http://localhost:8000/users/${userId}`, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        postId,
        saving: userSavedPost,
      }),
    });
  };

  return (
    <View>
      {/* <ToggleIcon selectedIcon="bookmark" unselectedIcon="bookmark-outline" /> */}
      <Text>{postId}</Text>
      <Card style={[t.flex, t.flexCol, t.mT2, t.alignCenter, ...cardStyle]}>
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
            selected={userSavedPost}
            selectedIcon="bookmark"
            unselectedIcon="bookmark-outline"
            handleSelected={toggleSavePost}
          />
        </View>
        <Card.Content style={[t.flex, t.flexRow, t.justifyBetween]}>
          <View style={[t.flex, t.flexCol]}>
            <Text>{likes} likes</Text>
            <LikedCounter
              initialLiked={userLikedPost}
              initialDisliked={userDislikedPost}
              postId={postId}
            />
          </View>
          <View style={[t.flex, t.flexCol, t.itemsEnd]}>
            <View style={[t.flex, t.flexRow]}>
              <Text style={[t.textLg]}>${price.discounted}</Text>
              <Text style={[t.lineThrough]}>${price.regular}</Text>
            </View>
            <View style={[t.flex, t.flexCol]}>
              <Text>{storeName} </Text>
              <Text>{address} </Text>
              <Text>{formatDistance(distance)}</Text>
            </View>
          </View>
        </Card.Content>
      </Card>
    </View>
  );
}
