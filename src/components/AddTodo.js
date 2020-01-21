import React, { useState } from "react";
import { View, StyleSheet, TextInput, Keyboard } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { THEME } from "../theme";

export const AddTodo = ({ onSubmit }) => {
  const [value, setValue] = useState("");

  const pressHandlner = () => {
    if (value.trim()) {
      onSubmit(value);
      setValue("");
      Keyboard.dismiss();
    } else {
      alert("Error! Enter todo title!");
    }
  };

  return (
    <View style={styles.block}>
      <TextInput
        style={styles.input}
        onChangeText={text => setValue(text)}
        value={value}
        autoCorrect={false}
        autoCapitalize="none"
      />
      <AntDesign.Button onPress={pressHandlner} name="pluscircleo">
        Add
      </AntDesign.Button>
      {/* <Button title="Add" onPress={pressHandlner} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  block: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15
  },
  input: {
    width: "60%",
    padding: 10,
    borderBottomColor: THEME.MAIN_COLOR,
    borderBottomWidth: 2,
    borderStyle: "solid"
  }
});
