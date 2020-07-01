import * as React from 'react';
import { View } from 'react-native';
import { RadioButton, Text } from 'react-native-paper';
import { t } from 'react-native-tailwindcss';

export default function SortByMenu({ setSort }) {
  const handleSelection = (value) => {
    setValue(value);
    setSort(value);
  };

  const [value, setValue] = React.useState('Rating');

  return (
    <RadioButton.Group onValueChange={handleSelection} value={value}>
      <View style={[t.flexRow, t.justifyBetween, t.p1]}>
        <Text>Rating</Text>
        <RadioButton color="#22543d" value="rating" />
      </View>
      <View style={[t.flexRow, t.justifyBetween, t.p1]}>
        <Text>Distance</Text>
        <RadioButton color="#22543d" value="distance" />
      </View>
      <View style={[t.flexRow, t.justifyBetween, t.p1]}>
        <Text>Best Deal</Text>
        <RadioButton color="#22543d" value="bestDeal" />
      </View>
      <View style={[t.flexRow, t.justifyBetween, t.p1]}>
        <Text>Most Recent</Text>
        <RadioButton color="#22543d" value="mostRecent" />
      </View>
    </RadioButton.Group>
  );
}
