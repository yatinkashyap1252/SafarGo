import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Dialog, Portal, Button } from "react-native-paper"; // Import necessary components

interface CustomAlertDialogProps {
  visible: boolean;
  errorMessage: string;
  hideDialog: () => void;
}

const CustomAlertDialog: React.FC<CustomAlertDialogProps> = ({ visible, errorMessage, hideDialog }) => {
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Title>Error</Dialog.Title>
        <Dialog.Content>
          <Text>{errorMessage}</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={hideDialog}>Close</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};
export default CustomAlertDialog;
