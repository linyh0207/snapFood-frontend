import * as React from 'react';
import { Snackbar, Text } from 'react-native-paper';
import { t } from 'react-native-tailwindcss';

export default function SnackBar({ snackBarVisible, setSnackBarVisibility }) {
  const onDismissSnackBar = () => setSnackBarVisibility(false);

  return (
    <Snackbar
      visible={snackBarVisible}
      onDismiss={onDismissSnackBar}
      action={{
        label: 'Dismiss',
        onPress: () => {
          // Undo an action (serach result) or we can use it as dismiss (tips)
        },
      }}
      duration={Snackbar.DURATION_SHORT}
      style={[t.bgGreen600]}
    >
      <Text style={[t.textWhite]}>
        Average price for serach result is X. {'\n'}Average price for serach result is Y for Store
        A.
      </Text>
    </Snackbar>
  );
}
