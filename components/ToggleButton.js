import React, { useState } from 'react';
import { IconButton } from 'react-native-paper';
import { View } from 'react-native';
import { t } from 'react-native-tailwindcss';

export default function ToggleButton({
  selected,
  selectedIcon,
  unselectedIcon,
  handleSelected,
  style,
  color = 'black',
}) {
  return (
    <View style={style}>
      {selected ? (
        <IconButton icon={selectedIcon} onPress={handleSelected} compact color={color} />
      ) : (
        <IconButton icon={unselectedIcon} onPress={handleSelected} compact color={color} />
      )}
    </View>
  );
}
