import React, { useState } from "react";
import { View, StyleSheet, TextInput, Modal, Alert } from "react-native";
import { THEME } from "../theme";
import { AppButton } from "./AppButton";

export const EditModal = ({ visible, onCancel, value, onSave }) => {
  const [title, setTitle] = useState(value);

  const saveHandler = () => {
    const titleLength = title.trim().length;
    if (titleLength < 3) {
      Alert.alert(
        "Error!",
        `Minimum length of name is 3 characters. Now length is ${titleLength}`
      );
    } else {
      onSave(title);
    }
  };

  const cancelHandler = () => {
    setTitle(value);
    onCancel();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={false}>
      <View style={styles.wrap}>
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          autoCorrect={false}
          maxLength={64}
          placeholder="Enter todo name"
          value={title}
          onChangeText={setTitle}
        />
        <View style={styles.buttons}>
          <AppButton onPress={cancelHandler} color={THEME.GRAY_COLOR}>
            Cancel
          </AppButton>
          <AppButton onPress={saveHandler}>Save</AppButton>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  input: {
    width: "70%",
    padding: 10,
    borderBottomColor: THEME.MAIN_COLOR,
    borderBottomWidth: 2,
    borderStyle: "solid"
  },
  buttons: {
    width: "100%",
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-around"
  }
});
