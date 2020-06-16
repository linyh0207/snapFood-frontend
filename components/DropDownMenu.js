import * as React from "react";
import { View } from "react-native";
import { Button, Menu, Divider } from "react-native-paper";
import { t } from "react-native-tailwindcss";
import StyledButton from "./StyledButton";

export default class MyComponent extends React.Component {
  state = {
    visible: false,
    title: "Sort",
  };

  _openMenu = () => this.setState({ visible: true });

  _closeMenu = () => this.setState({ visible: false });

  _handleSelection = (e, title) =>
    this.setState({ visible: false, title: title });

  render() {
    return (
      <View style={[t.pT10, t.flexRow, t.justifyCenter]}>
        <Menu
          visible={this.state.visible}
          onDismiss={this._closeMenu}
          anchor={
            <StyledButton
              title={this.state.title}
              mode="outlined"
              onPress={this._openMenu}
            />
          }
        >
          <Menu.Item title="Sort results by" />
          <Divider />
          <Menu.Item
            onPress={(e) => {
              this._handleSelection(e, "Sort: Rating");
            }}
            title="Rating"
          />
          <Menu.Item
            onPress={(e) => {
              this._handleSelection(e, "Sort: Distance");
            }}
            title="Distance"
          />
          <Menu.Item
            onPress={(e) => {
              this._handleSelection(e, "Sort: Best Deal");
            }}
            title="Best Deal"
          />
          <Menu.Item
            onPress={(e) => {
              this._handleSelection(e, "Sort: Most Recent");
            }}
            title="Most Recent"
          />
        </Menu>
      </View>
    );
  }
}

// function handleSelection() {
//   alert("clicked");
// }
