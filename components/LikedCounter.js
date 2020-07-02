import React, { useState, useEffect } from 'react';

import { View, Text } from 'react-native';
import ToggleButton from './ToggleButton';

const LikedCounter = ({
  likes = 0,
  dislikes = 0,
  variant = 'general',
  style = {},
  initialLiked,
  initialDisliked,
  postId,
  userId = '5eead9d6d34bf31f58a86904',
  loadData,
  dispatch,
}) => {
  // const [liked, setLiked] = useState(initialLiked);
  // const [notLiked, setNotLiked] = useState(initialDisliked);
  const liked = initialLiked;
  const notLiked = initialDisliked;

  const toggleLikePost = (upvote) => {
    const remove = (upvote && liked) || (!upvote && notLiked);
    fetch(`https://glacial-cove-31720.herokuapp.com/posts/${postId}`, {
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

  // useEffect(() => {
  //   const payload = {};
  //   payload.userId = userId;
  //   payload.upvote = true;

  //   if (liked) {
  //     payload.remove = false;
  //   } else {
  //     payload.remove = true;
  //   }
  //   // fetch(`https://glacial-cove-31720.herokuapp.com/posts/${postId}`, {
  //   //   method: 'put',
  //   //   headers: {
  //   //     'Content-Type': 'application/json',
  //   //   },
  //   //   body: JSON.stringify(payload),
  //   // }).then((res) => console.log('success updating liked'));
  // }, [liked]);

  // useEffect(() => {
  //   const payload = {};
  //   payload.userId = userId;
  //   payload.upvote = false;

  //   if (notLiked) {
  //     payload.remove = false;
  //   } else {
  //     payload.remove = true;
  //   }
  //   fetch(`https://glacial-cove-31720.herokuapp.com/posts/${postId}`, {
  //     method: 'put',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(payload),
  //   }).then((res) => console.log('success updating notLiked'));
  // }, [notLiked]);

  return (
    <View>
      {variant === 'general' && (
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            ...style,
          }}
        >
          <ToggleButton
            selected={liked}
            selectedIcon="thumb-up"
            unselectedIcon="thumb-up-outline"
            handleSelected={() => {
              dispatch({ type: 'UPDATE_LIKE', id: postId, liked: !liked });
              // setLiked(!liked);
              toggleLikePost(true);
              // loadData();
            }}
          />
          <Text>{likes - dislikes}</Text>
          <ToggleButton
            selected={notLiked}
            selectedIcon="thumb-down"
            unselectedIcon="thumb-down-outline"
            handleSelected={() => {
              dispatch({ type: 'UPDATE_DISLIKE', id: postId, disliked: !notLiked });
              // setNotLiked(!notLiked);
              toggleLikePost(false);
              // loadData();
            }}
          />
        </View>
      )}
      {variant === 'detail' && (
        <View style={{ flex: 1, flexDirection: 'row', ...style }}>
          <View>
            <ToggleButton
              selected={liked}
              selectedIcon="thumb-up"
              unselectedIcon="thumb-up-outline"
              handleSelected={() => {
                dispatch({ type: 'UPDATE_LIKE', id: postId, liked: !liked });

                // setLiked(!liked);
                toggleLikePost(true);
                // loadData();
              }}
              style={{ marginBottom: -10 }}
            />
            <Text style={{ textAlign: 'center' }}>{likes}</Text>
          </View>
          <View style={{}}>
            <ToggleButton
              selected={notLiked}
              selectedIcon="thumb-down"
              unselectedIcon="thumb-down-outline"
              handleSelected={() => {
                dispatch({ type: 'UPDATE_DISLIKE', id: postId, disliked: !notLiked });

                // setNotLiked(!notLiked);
                toggleLikePost(false);
                // loadData();
              }}
              style={{ marginBottom: -10 }}
            />
            <Text style={{ textAlign: 'center' }}>{dislikes}</Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default LikedCounter;
