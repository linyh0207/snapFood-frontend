import * as React from 'react';
import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Snackbar } from 'react-native-paper';
import { t } from 'react-native-tailwindcss';

export default function SnackBar() {
  const [visible, setVisibility] = useState(false);

  const onToggleSnackBar = () => setVisibility(!visible);

  const onDismissSnackBar = () => setVisibility(false);

  return (
    <View>
      <Button onPress={onToggleSnackBar}>{visible ? 'Hide' : 'Show'}</Button>
      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        action={{
          label: 'Undo',
          onPress: () => {
            // Do something
          },
        }}
        style={[[t.insetX0, t.bottom0]]}
      >
        Hey there! Im a Snackbar.
      </Snackbar>
    </View>
  );
}
