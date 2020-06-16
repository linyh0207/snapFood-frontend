import * as React from "react";
import { Button } from "react-native-paper";

const StyledButton = ({
  title,
  onPress,
  mode = "contained",
  uppercase = false,
  bordered,
}) => {
  const btnBorderRadius = bordered ? 20 : 3;

  const theme = {
    roundness: btnBorderRadius,
  };

  return (
    <Button mode={mode} onPress={onPress} uppercase={uppercase} theme={theme}>
      {title}
    </Button>
  );
};

export default StyledButton;
