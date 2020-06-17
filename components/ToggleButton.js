import React, { useState } from 'react';
import { Button } from 'react-native-paper';
import { View } from 'react-native';

export default function ToggleButton({ selected, selectedIcon, unselectedIcon, handleSelected }) {
  return (
    <View>
      {selected ? (
        <Button icon={selectedIcon} onPress={handleSelected} />
      ) : (
        <Button icon={unselectedIcon} onPress={handleSelected} />
      )}
    </View>
  );
}
