import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { ToDo } from "../interfaces/todoInterface";

interface ToDoListProps {
  todos: ToDo[];
  onDeleteTodo: (index: number) => void;
  onEditTodo: (index: number, todo: ToDo) => void;
}

const ToDoList: React.FC<ToDoListProps> = ({ todos, onDeleteTodo, onEditTodo }) => {
  const handleEditTodo = (index: number, todo: ToDo) => {
    onEditTodo(index, todo);
  };

  const renderTodoItem = ({ item, index }: { item: ToDo; index: number }) => (
    <View style={styles.todoItem}>
      <Text>{item.title}</Text>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => handleEditTodo(index, item)}>
          <FontAwesome name="pencil" size={20} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onDeleteTodo(index)}>
          <FontAwesome name="trash" size={20} style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return <FlatList data={todos} renderItem={renderTodoItem} keyExtractor={(item, index) => index.toString()} />;
};

const styles = StyleSheet.create({
  todoItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  iconContainer: {
    flexDirection: "row",
  },
  icon: {
    marginLeft: 10,
  },
});

export default ToDoList;
