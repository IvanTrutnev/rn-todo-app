import React, { useReducer, useContext } from "react";
import { Alert } from "react-native";
import { TodoContext } from "./TodoContext";
import { TodoReducer } from "./TodoReducer";
import {
  ADD_TODO,
  REMOVE_TODO,
  UPDATE_TODO,
  SHOW_LOADER,
  HIDE_LOADER,
  SHOW_ERROR,
  HIDE_ERROR,
  FETCH_TODOS
} from "../types";
import { ScreenContext } from "../screen/screenContext";
import { Http } from "../../http/";

export const TodoState = ({ children }) => {
  const initialState = {
    todos: [],
    loading: false,
    error: null
  };
  const [state, dispatch] = useReducer(TodoReducer, initialState);
  const { changeScreen } = useContext(ScreenContext);

  const addTodo = async title => {
    hideError();
    try {
      const data = await Http.post(
        `https://rn-todo-app-c27d4.firebaseio.com/todos.json`,
        { title }
      );
      dispatch({ type: ADD_TODO, title, id: data.name });
    } catch (e) {
      showError("Something went wrong. Try again");
    }
  };

  const removeTodo = id => {
    const todo = state.todos.find(todo => todo.id === id);
    Alert.alert(
      `Removing todo`,
      `Are you sure that you want to delete ${todo.title} ?`,
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            changeScreen(null);
            await Http.delete(
              `https://rn-todo-app-c27d4.firebaseio.com/todos/${id}.json`,
              "DELETE"
            );
            dispatch({ type: REMOVE_TODO, id });
          }
        }
      ],
      {
        cancelable: false
      }
    );
  };

  const showLoader = () => dispatch({ type: SHOW_LOADER });
  const hideLoader = () => dispatch({ type: HIDE_LOADER });

  const showError = error => dispatch({ type: SHOW_ERROR, error });
  const hideError = () => dispatch({ type: HIDE_ERROR });

  const fetchTodos = async () => {
    showLoader();
    hideError();
    try {
      const data = await Http.get(
        `https://rn-todo-app-c27d4.firebaseio.com/todos.json`
      );
      const todos = Object.keys(data).map(key => ({ ...data[key], id: key }));
      dispatch({ type: FETCH_TODOS, todos });
    } catch (e) {
      showError("Something went wrong. Try again");
      console.log(e);
    } finally {
      hideLoader();
    }
  };

  const updateTodo = async (id, title) => {
    hideError();
    try {
      await Http.patch(
        `https://rn-todo-app-c27d4.firebaseio.com/todos/${id}.json`,
        { title }
      );
      dispatch({ type: UPDATE_TODO, id, title });
    } catch (e) {
      showError("Something went wrong. Try again");
      console.log(e);
    }
  };

  return (
    <TodoContext.Provider
      value={{
        todos: state.todos,
        loading: state.loading,
        error: state.error,
        addTodo,
        removeTodo,
        updateTodo,
        fetchTodos
      }}>
      {children}
    </TodoContext.Provider>
  );
};
