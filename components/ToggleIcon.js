import React, { useState } from 'react';
import { Button } from 'react-native-paper';
import { View } from 'react-native';

export default function ToggleButton({ select = false, selectedIcon, unselectedIcon }) {
  const [selected, setSelected] = useState(select);
  return (
    <View>
      {selected ? (
        <Button icon={selectedIcon} onPress={() => setSelected(false)} />
      ) : (
        <Button icon={unselectedIcon} onPress={() => setSelected(true)} />
      )}
    </View>
  );
}
