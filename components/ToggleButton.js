import React, { useState } from 'react';
import { Button } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';

export default function ToggleButton({ selected, selectedIcon, unselectedIcon, handleSelected }) {
  return (
    <View>
      {selected ? (
        <Button icon={selectedIcon} onPress={handleSelected} compact />
      ) : (
        <Button icon={unselectedIcon} onPress={handleSelected} compact />
      )}
    </View>
  );
}
