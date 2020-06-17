import React, { useState, useEffect } from 'react';

import { View } from 'react-native';
import ToggleButton from './ToggleButton';
import deconstructLike from '../helpers/deconstructLike';

const LikedCounter = () => {
  const [liked, setLiked] = useState(false);
  const [notLiked, setNotLiked] = useState(false);
  console.log('liked', liked);
  console.log('notLiked', notLiked);
  //   useEffect(() => {
  //     if (liked) {
  //       setNotLiked(false);
  //     } else {
  //       setNotLiked(true);
  //     }

  //     if (notLiked) {
  //       setLiked(true);
  //     } else {
  //       setLiked(false);
  //     }
  //   }, [liked, notLiked]);
  return (
    <View>
      <ToggleButton
        selected={liked}
        selectedIcon="thumb-up"
        unselectedIcon="thumb-up-outline"
        handleSelected={() => {
          setLiked(!liked);
          setNotLiked(liked);
        }}
      />
      <ToggleButton
        selected={notLiked}
        selectedIcon="thumb-down"
        unselectedIcon="thumb-down-outline"
        handleSelected={() => {
          setNotLiked(!notLiked);
          setLiked(notLiked);
        }}
      />
    </View>
  );
};

export default LikedCounter;
