import React, { useState, useEffect } from 'react';

import { View, Text } from 'react-native';
import { t } from 'react-native-tailwindcss';
import ToggleButton from './ToggleButton';

const LikedCounter = ({ likes = 0, dislikes = 0, variant = 'general' }) => {
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
    <View
      style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}
    >
      <View style={{ flex: 1, flexDirection: 'column' }}>
        <ToggleButton
          selected={liked}
          selectedIcon="thumb-up"
          unselectedIcon="thumb-up-outline"
          handleSelected={() => {
            setLiked(!liked);
          }}
        />
        {variant === 'detail' && <Text>{likes}</Text>}
      </View>
      {variant === 'general' && <Text>{likes - dislikes}</Text>}
      <View style={{ flex: 1, flexDirection: 'column' }}>
        <ToggleButton
          selected={notLiked}
          selectedIcon="thumb-down"
          unselectedIcon="thumb-down-outline"
          handleSelected={() => {
            setNotLiked(!notLiked);
          }}
        />
        {variant === 'detail' && <Text>{dislikes}</Text>}
      </View>
    </View>
  );
};

export default LikedCounter;
