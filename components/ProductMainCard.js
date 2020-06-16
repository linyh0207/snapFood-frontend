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

import { UserName } from './TopBar/UserName';

export default function ProductMainCard({ price, totalVotes }) {
  return (
    <Card>
      <Card.Content>
        <Title>Card title</Title>
        <Paragraph>Card content</Paragraph>
      </Card.Content>
      <Card.Actions>
        <Button icon="bookmark" />
      </Card.Actions>
      <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
      <Card.Actions>
        <Button icon="thumb-up" />
        <Button icon="thumb-down" />
      </Card.Actions>
    </Card>
  );
}
