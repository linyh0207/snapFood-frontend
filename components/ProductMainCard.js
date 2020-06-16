import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import {
  ActivityIndicator,
  Colors,
  Drawer,
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
} from 'react-native-paper';

import { t } from 'react-native-tailwindcss';
import UserName from './TopBar/UserName';

export default function ProductMainCard({ price, totalVotes }) {
  return (
    <Card style={[t.flex, t.flexCol, t.alignCenter]}>
      <Card.Actions>
        <Button icon="bookmark" />
      </Card.Actions>
      <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
      <Card.Content style={[t.flex, t.flexRow]}>
        <View style={[]}>
          <Text>{totalVotes} likes</Text>
          <Card.Actions>
            <Button icon="thumb-up" />
            <Button icon="thumb-down" />
          </Card.Actions>
        </View>
        <Card.Content style={[t.flex, t.flexRow]}>
          <Text>${price.discounted}</Text>
          <Text>${price.regular}</Text>
        </Card.Content>
      </Card.Content>
    </Card>
  );
}
