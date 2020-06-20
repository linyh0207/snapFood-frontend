import * as React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { t } from 'react-native-tailwindcss';

export default function MyPostsScreen() {
  return (
    <View style={[t.flex1, t.justifyCenter]}>
      <Text style={[t.contentCenter]}>This is the page for my posts</Text>
    </View>
  );
}
