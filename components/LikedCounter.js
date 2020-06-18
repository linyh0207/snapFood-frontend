import React, { useState, useEffect } from 'react';

import { View, Text } from 'react-native';
import { t } from 'react-native-tailwindcss';
import ToggleButton from './ToggleButton';

const LikedCounter = (netLiked = 0) => {
  const [liked, setLiked] = useState(false);
  const [notLiked, setNotLiked] = useState(false);

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
  return (
    <View style={[t.flex, t.flexCol]}>
      {/* <Text>{netLiked} likes</Text> */}
      <View style={[t.flex, t.flexRow, t.justifyStart]}>
        <ToggleButton
          selected={liked}
          selectedIcon="thumb-up"
          unselectedIcon="thumb-up-outline"
          handleSelected={() => {
            setLiked(!liked);
            // setNotLiked(liked);
          }}
        />
        <ToggleButton
          selected={notLiked}
          selectedIcon="thumb-down"
          unselectedIcon="thumb-down-outline"
          handleSelected={() => {
            setNotLiked(!notLiked);
            // setLiked(notLiked);
          }}
        />
      </View>
    </View>
  );
};

export default LikedCounter;
