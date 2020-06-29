import React, { useState } from 'react';
import { Button, IconButton } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';

export default function ToggleButton({
  selected,
  selectedIcon,
  unselectedIcon,
  handleSelected,
  style,
}) {
  return (
    <View style={style}>
      {selected ? (
        <IconButton icon={selectedIcon} onPress={handleSelected} compact />
      ) : (
        <IconButton icon={unselectedIcon} onPress={handleSelected} compact />
      )}
    </View>
  );
}
