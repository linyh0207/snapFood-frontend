import { useState } from 'react';
import * as React from 'react';
import { View } from 'react-native';
import { Menu, Divider } from 'react-native-paper';
import { t } from 'react-native-tailwindcss';
import StyledButton from '../StyledButton';

export default function SortByMenu() {
  const [visible, setVisibility] = useState(false);
  const [title, setTitle] = useState('Select a store');

  const openMenu = () => setVisibility(true);
  const closeMenu = () => setVisibility(false);
  const handleSelection = (e, selection) => {
    closeMenu();
    setTitle(selection);
  };

  // Dummy data - sorted stores list
  const stores = [
    {
      name: 'PriceSmart Foods',
      distance: '850m',
    },
    {
      name: 'T&T Supermarket',
      distance: '1.1km',
    },
    {
      name: 'Save-On-Foods',
      distance: '900m',
    },
    {
      name: 'Real Canadian Superstore',
      distance: '950m',
    },
  ];

  return (
    <View style={[t.pT10, t.flexRow, t.justifyCenter]}>
      <Menu
        visible={visible}
        statusBarHeight={500}
        style={[t.justifyCenter]}
        onDismiss={closeMenu}
        anchor={<StyledButton title={title} mode="outlined" size="small" onPress={openMenu} />}
      >
        {stores.map((store) => {
          return (
            <Menu.Item
              onPress={(e) => {
                handleSelection(e, store.name);
              }}
              title={`${store.name} ${store.distance}`}
            />
          );
        })}
      </Menu>
    </View>
  );
}
