import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';

import TabBarIcon from '../components/TabBarIcon';
import ProductMainScreen from '../screens/ProductMainScreen';
import AddPostScreen from '../screens/AddPostScreen';
import BookmarkScreen from '../screens/BookmarkScreen';
import MyPostsScreen from '../screens/MyPostsScreen';
import AchievementScreen from '../screens/AchievementScreen';

const BottomTab = createBottomTabNavigator();

export default function BottomTabNavigator({ route }) {
  return (
    <BottomTab.Navigator
      initialRouteName={route.name}
      screenOptions={({ route }) => ({
        tabBarButton: ['My Posts', 'My Achievements'].includes(route.name)
          ? () => {
              return null;
            }
          : undefined,
      })}
      tabBarOptions={{ activeTintColor: '#22543d' }}
    >
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
      <BottomTab.Screen
        name="My Posts"
        component={MyPostsScreen}
        options={{
          title: 'My Posts',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="ios-search" />,
        }}
      />
      <BottomTab.Screen
        name="My Achievements"
        component={AchievementScreen}
        options={{
          title: 'My Achievements',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="ios-search" />,
        }}
      />
    </BottomTab.Navigator>
  );
}
