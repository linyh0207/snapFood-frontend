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

  return (
    <Button
      icon={icon}
      style={[btnSize, t.selfCenter, t.h10, t.border2, t.m2]}
      mode={mode}
      onPress={onPress}
      uppercase={uppercase}
      color="#22543d"
      theme={theme}
    >
      {title}
    </Button>
  );
};

export default StyledButton;

// IMPORT STYLEFBUTTON (EX: APP.JS)
// import StyledButton from '../components/StyledButton';

// LOGIN AND SIGNUP BUTTONS (WIDE, ROUND, FILLED)
// <StyledButton title="Login" mode="contained" bordered onPress={handleButtonPress} />
// <StyledButton title="Sign Up" mode="outlined" bordered onPress={handleButtonPress} />

// BASIC BUTTON (NARROW, SQUARE, OUTLINED)
// <StyledButton title="Sort" mode="outlined" size="small" icon="sort-variant" onPress={openMenu} />

// ONPRESS FUNCTION
// function handleButtonPress() {
//   Alert.alert('clicked');
// }
