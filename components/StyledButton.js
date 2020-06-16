import * as React from 'react';
import { Button } from 'react-native-paper';
import { t } from 'react-native-tailwindcss';

const StyledButton = ({
  title,
  onPress,
  mode = 'contained',
  uppercase = false,
  bordered,
  size = 'large',
  icon,
}) => {
  const btnBorderRadius = bordered ? 20 : 3;
  const btnSize = size === 'large' ? t.w3_4 : t.wAuto;
  const theme = {
    roundness: btnBorderRadius,
  };

  const btnIcon = (iconType) => {
    switch (iconType) {
      case 'sort':
        return 'sort-variant';
      default:
        return '';
    }
  };

  return (
    <Button
      icon={btnIcon(icon)}
      style={[btnSize, t.selfCenter, t.h10]}
      mode={mode}
      onPress={onPress}
      uppercase={uppercase}
      theme={theme}
    >
      {title}
    </Button>
  );
};

export default StyledButton;
