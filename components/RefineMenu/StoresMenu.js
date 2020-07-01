import * as React from 'react';
import { List } from 'react-native-paper';
import { t } from 'react-native-tailwindcss';

export default function StoresMenu({ expanded, setExpanded, selectedStore, setStore }) {
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
      name: 'Superstore',
      distance: '950m',
    },
    {
      name: 'Safeway',
      distance: '650m',
    },
    {
      name: 'Loblaws',
      distance: '850m',
    },
    {
      name: 'Whole Foods',
      distance: '1.5km',
    },
    {
      name: 'Walmart',
      distance: '2km',
    },
  ];

  const handlePress = () => setExpanded(!expanded);

  return (
    <List.Section>
      <List.Accordion
        title={selectedStore}
        left={(props) => <List.Icon {...props} icon="store" />}
        expanded={expanded}
        onPress={handlePress}
        style={[t.bgGreen100]}
      >
        {stores.map((store) => {
          return (
            <List.Item
              key={store.name}
              title={store.name}
              description={store.distance}
              left={(props) => <List.Icon {...props} icon="map-marker" />}
              onPress={() => {
                setStore(store.name);
                handlePress();
              }}
            />
          );
        })}
      </List.Accordion>
    </List.Section>
  );
}
