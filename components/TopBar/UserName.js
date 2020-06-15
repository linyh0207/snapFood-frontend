import * as React from "react";
import { Text, View } from "react-native";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { t } from 'react-native-tailwindcss';

export function UserName({ status, children }) {
  return (
    <View style={[t.flex, t.flexRow, t.itemsCenter]}>
      <Text style={[t.p2]}>{children}</Text>
      {status === "super" && (
        <FontAwesome5 name="crown" size={16} color="black" />
      )}
    </View>
  );
}
