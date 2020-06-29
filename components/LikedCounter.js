import React, { useState, useEffect } from 'react';

import { View, Text } from 'react-native';
import ToggleButton from './ToggleButton';

const LikedCounter = ({ likes = 0, dislikes = 0, variant = 'general', style = {} }) => {
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
              setLiked(!liked);
            }}
          />
          <Text>{likes - dislikes}</Text>
          <ToggleButton
            selected={notLiked}
            selectedIcon="thumb-down"
            unselectedIcon="thumb-down-outline"
            handleSelected={() => {
              setNotLiked(!notLiked);
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
                setLiked(!liked);
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
                setNotLiked(!notLiked);
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
