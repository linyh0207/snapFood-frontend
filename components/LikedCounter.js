import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { t } from 'react-native-tailwindcss';
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
}) => {
  const [liked, setLiked] = useState(initialLiked);
  const [notLiked, setNotLiked] = useState(initialDisliked);
  const [totalLikes, setTotalLikes] = useState(likes);
  const [totalDislikes, setTotalDislikes] = useState(dislikes);

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

  const toggleLikePost = (upvote, remove) => {
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
              if (liked) {
                setLiked(false);
                toggleLikePost(true, true);
                setTotalLikes((prev) => prev - 1);
              } else if (notLiked) {
                setNotLiked(false);
                setLiked(true);
                toggleLikePost(true, false);
                setTotalLikes((prev) => prev + 1);
                setTotalDislikes((prev) => prev - 1);
              } else {
                setLiked(true);
                toggleLikePost(true, false);
                setTotalLikes((prev) => prev + 1);
              }
            }}
            color="#fd625e"
          />
          <Text style={{ textAlign: 'center', color: '#484848' }}>
            {totalLikes - totalDislikes}
          </Text>
          <ToggleButton
            selected={notLiked}
            selectedIcon="thumb-down"
            unselectedIcon="thumb-down-outline"
            handleSelected={() => {
              if (notLiked) {
                setNotLiked(false);
                toggleLikePost(false, true);
                setTotalDislikes((prev) => prev - 1);
              } else if (liked) {
                setLiked(false);
                setNotLiked(true);
                toggleLikePost(false, false);
                setTotalLikes((prev) => prev - 1);
                setTotalDislikes((prev) => prev + 1);
              } else {
                setNotLiked(true);
                toggleLikePost(false, false);
                setTotalDislikes((prev) => prev + 1);
              }
            }}
            color="grey"
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
                if (liked) {
                  setLiked(false);
                  toggleLikePost(true, true);
                  setTotalLikes((prev) => prev - 1);
                } else if (notLiked) {
                  setNotLiked(false);
                  setLiked(true);
                  toggleLikePost(true, false);
                  setTotalLikes((prev) => prev + 1);
                  setTotalDislikes((prev) => prev - 1);
                } else {
                  setLiked(true);
                  toggleLikePost(true, false);
                  setTotalLikes((prev) => prev + 1);
                }
              }}
              style={{ marginBottom: -10 }}
              color="#fd625e"
            />
            <Text style={{ textAlign: 'center', color: 'grey' }}>{totalLikes}</Text>
          </View>
          <View style={{}}>
            <ToggleButton
              selected={notLiked}
              selectedIcon="thumb-down"
              unselectedIcon="thumb-down-outline"
              handleSelected={() => {
                if (notLiked) {
                  setNotLiked(false);
                  toggleLikePost(false, true);
                  setTotalDislikes((prev) => prev - 1);
                } else if (liked) {
                  setLiked(false);
                  setNotLiked(true);
                  toggleLikePost(false, false);
                  setTotalLikes((prev) => prev - 1);
                  setTotalDislikes((prev) => prev + 1);
                } else {
                  setNotLiked(true);
                  toggleLikePost(false, false);
                  setTotalDislikes((prev) => prev + 1);
                }
              }}
              style={{ marginBottom: -10 }}
              color="grey"
            />
            <Text style={{ textAlign: 'center', color: 'grey' }}>{totalDislikes}</Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default LikedCounter;
