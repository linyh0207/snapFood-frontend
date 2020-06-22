import { useState } from 'react';
import * as React from 'react';
import { View } from 'react-native';
import { Menu, Divider } from 'react-native-paper';
import { t } from 'react-native-tailwindcss';
import StyledButton from '../StyledButton';

export default function SortByMenu() {
  const [visible, setVisibility] = useState(false);
  const [title, setTitle] = useState('Sort');

  const openMenu = () => setVisibility(true);
  const closeMenu = () => setVisibility(false);
  const handleSelection = (e, selection) => {
    closeMenu();
    setTitle(selection);
  };

  return (
    <View style={[t.pT10, t.flexRow, t.justifyCenter]}>
      <Menu
        visible={visible}
        statusBarHeight={75}
        style={[t.justifyCenter]}
        onDismiss={closeMenu}
        anchor={
          <StyledButton
            title={title}
            mode="outlined"
            size="small"
            icon="sort-variant"
            onPress={openMenu}
          />
        }
      >
        <Menu.Item
          onPress={(e) => {
            handleSelection(e, 'Sort: Rating');
          }}
          title="Rating"
        />
        <Divider />
        <Menu.Item
          onPress={(e) => {
            handleSelection(e, 'Sort: Distance');
          }}
          title="Distance"
        />
        <Divider />
        <Menu.Item
          onPress={(e) => {
            handleSelection(e, 'Sort: Best Deal');
          }}
          title="Best Deal"
        />
        <Divider />
        <Menu.Item
          onPress={(e) => {
            handleSelection(e, 'Sort: Most Recent');
          }}
          title="Most Recent"
        />
      </Menu>
    </View>
  );
}
