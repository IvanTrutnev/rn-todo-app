import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { AppText } from "./AppText";

export const Todo = ({ todo, onRemove, onOpen }) => {
  const longPressHandlner = () => {
    onRemove(todo.id);
  };

  const pressHandler = () => {
    onOpen(todo.id);
  };

  return (
    <TouchableOpacity onLongPress={longPressHandlner} onPress={pressHandler}>
      <View style={styles.todo}>
        <AppText>{todo.title}</AppText>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  todo: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 5,
    marginBottom: 10
  }
});
