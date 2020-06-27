import React, { useState, useEffect } from 'react';

import { View, Text } from 'react-native';
import { t } from 'react-native-tailwindcss';
import ToggleButton from './ToggleButton';

const LikedCounter = ({
  likes,
  initialLiked,
  initialDisliked,
  postId,
  userId = '5eead9d6d34bf31f58a86904',
}) => {
  const [totalLikes, setTotalLikes] = useState(likes);
  const [liked, setLiked] = useState(initialLiked);
  const [notLiked, setNotLiked] = useState(initialDisliked);

  useEffect(() => {
    if (liked) {
      setNotLiked(false);
    }
  }, [liked]);

  useEffect(() => {
    if (notLiked) {
      setLiked(false);
    }
  }, [notLiked]);

  const toggleLikePost = (upvote) => {
    const remove = (upvote && liked) || (!upvote && notLiked);
    fetch(`http://10.0.2.2:8000/posts/${postId}`, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        upvote,
        remove,
      }),
    });
  };

  return (
    <>
      <Text>{totalLikes} likes</Text>
      <View style={[t.flex, t.flexCol]}>
        {/* <Text>{netLiked} likes</Text> */}
        <View style={[t.flex, t.flexRow, t.justifyStart]}>
          <ToggleButton
            selected={liked}
            selectedIcon="thumb-up"
            unselectedIcon="thumb-up-outline"
            handleSelected={() => {
              setLiked(!liked);
              setTotalLikes((prev) => (liked ? prev - 1 : prev + 1));
              toggleLikePost(true);
              // setNotLiked(liked);
            }}
          />
          <ToggleButton
            selected={notLiked}
            selectedIcon="thumb-down"
            unselectedIcon="thumb-down-outline"
            handleSelected={() => {
              setNotLiked(!notLiked);
              toggleLikePost(false);
              // setLiked(notLiked);
            }}
          />
        </View>
      </View>
    </>
  );
};

export default LikedCounter;
