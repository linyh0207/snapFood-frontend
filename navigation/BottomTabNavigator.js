import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';

import TabBarIcon from '../components/TabBarIcon';
import ProductMainScreen from '../screens/ProductMainScreen';
import AddPostScreen from '../screens/AddPostScreen';
import BookmarkScreen from '../screens/BookmarkScreen';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'ProductMain';

export default function BottomTabNavigator() {
  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name="ProductMain"
        component={ProductMainScreen}
        options={{
          title: 'Search',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="ios-search" />,
        }}
      />
      <BottomTab.Screen
        name="Camera"
        component={AddPostScreen}
        options={{
          title: 'Camera',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="ios-camera" />,
        }}
      />
      <BottomTab.Screen
        name="Bookmark"
        component={BookmarkScreen}
        options={{
          title: 'Bookmark',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="ios-bookmark" />,
        }}
      />
    </BottomTab.Navigator>
  );
}
