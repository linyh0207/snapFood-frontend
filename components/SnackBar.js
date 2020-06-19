import * as React from 'react';
import { useState } from 'react';
import { View } from 'react-native';
import { Button, Snackbar, Text } from 'react-native-paper';
import { t } from 'react-native-tailwindcss';

export default function SnackBar() {
  const [visible, setVisibility] = useState(false);

  const onToggleSnackBar = () => setVisibility(!visible);

  const onDismissSnackBar = () => setVisibility(false);

  return (
    <View>
      {/* The state can be modify by an event or action. Button is for developing purpose */}
      <Button onPress={onToggleSnackBar}>{visible ? 'Hide Snackbar' : 'Show Snackbar'}</Button>

      {/* If no duraction set, the snackbar will only dismiss if the user click on the action */}

      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        action={{
          label: 'Undo',
          onPress: () => {
            // Undo an action (serach result) or we can use it as dismiss (tips)
          },
        }}
        duration={Snackbar.DURATION_SHORT}
      >
        <Text style={[t.textWhite]}>
          Average price for serach result is X. {'\n'}Average price for serach result is Y for Store
          A.
        </Text>
      </Snackbar>
    </View>
  );
}
