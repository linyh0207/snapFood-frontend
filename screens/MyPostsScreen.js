import * as React from 'react';
import { Text } from 'react-native-paper';
import { t } from 'react-native-tailwindcss';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function MyPostsScreen() {
  return (
    <SafeAreaView style={[t.flex1, t.justifyCenter]}>
      <Text style={[t.contentCenter]}>This is the page for my posts</Text>
    </SafeAreaView>
  );
}
