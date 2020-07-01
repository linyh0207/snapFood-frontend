import * as React from 'react';
import { View } from 'react-native';
import { RadioButton, Text } from 'react-native-paper';
import { t } from 'react-native-tailwindcss';

export default function SortByMenu({ setSort, sortValue }) {
  return (
    <RadioButton.Group onValueChange={(value) => setSort(value)} value={sortValue}>
      <View style={[t.flexRow, t.justifyBetween, t.p1, t.bgGreen100]}>
        <Text>Rating</Text>
        <RadioButton color="#22543d" value="rating" />
      </View>
      <View style={[t.flexRow, t.justifyBetween, t.p1, t.bgGreen100]}>
        <Text>Distance</Text>
        <RadioButton color="#22543d" value="distance" />
      </View>
      <View style={[t.flexRow, t.justifyBetween, t.p1, t.bgGreen100]}>
        <Text>Best Deal</Text>
        <RadioButton color="#22543d" value="bestDeal" />
      </View>
      <View style={[t.flexRow, t.justifyBetween, t.p1, t.bgGreen100]}>
        <Text>Most Recent</Text>
        <RadioButton color="#22543d" value="mostRecent" />
      </View>
    </RadioButton.Group>
  );
}
