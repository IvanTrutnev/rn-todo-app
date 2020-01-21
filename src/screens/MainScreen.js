import React, { useState, useEffect, useContext, useCallback } from "react";
import { StyleSheet, View, FlatList, Image, Dimensions } from "react-native";
import { AddTodo } from "../components/AddTodo";
import { Todo } from "../components/Todo";
import { THEME } from "../theme";
import { TodoContext } from "../context/todo/TodoContext";
import { ScreenContext } from "../context/screen/screenContext";
import { AppLoader } from "../components/AppLoader";
import { AppText } from "../components/AppText";
import { AppButton } from "../components/AppButton";

export const MainScreen = () => {
  const { addTodo, todos, removeTodo, fetchTodos, loading, error } = useContext(
    TodoContext
  );
  const { changeScreen } = useContext(ScreenContext);
  const [deviceWidth, setDeviceWidth] = useState(
    Dimensions.get("window").width - THEME.PADDINT_HORIZONTAL * 2
  );

  const loadTodos = useCallback(async () => await fetchTodos(), [fetchTodos]);

  useEffect(() => {
    loadTodos();
  }, []);

  useEffect(() => {
    const update = () => {
      const width =
        Dimensions.get("window").width - THEME.PADDING_HORIZONTAL * 2;
      setDeviceWidth(width);
    };
    Dimensions.addEventListener("change", () => update);

    return () => {
      Dimensions.removeEventListener("change", () => update);
    };
  });

  if (loading) {
    return <AppLoader />;
  }

  if (error) {
    return (
      <View style={styles.center}>
        <AppText style={styles.error}>{error}</AppText>
        <AppButton omPress={loadTodos}>Repeat</AppButton>
      </View>
    );
  }

  let content = (
    <View style={deviceWidth}>
      <FlatList
        data={todos}
        renderItem={({ item }) => (
          <Todo todo={item} onRemove={removeTodo} onOpen={changeScreen} />
        )}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );

  if (!todos.length) {
    content = (
      <View style={styles.imageWrapper}>
        <Image
          style={styles.image}
          source={require("../../assets/no-icons.png")}
        />
      </View>
    );
  }

  return (
    <View>
      <AddTodo onSubmit={addTodo} />
      {content}
    </View>
  );
};

const styles = StyleSheet.create({
  imageWrapper: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    height: 300
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain"
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  error: {
    fontSize: 20,
    color: THEME.DANGER_COLOR
  }
});
