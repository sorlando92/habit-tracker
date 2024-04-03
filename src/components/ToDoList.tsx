import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

interface ToDoListProps {
  todos: string[];
  onDeleteTodo: (index: number) => void;
  onEditTodo: (index: number, todo: string) => void;
}

const ToDoList: React.FC<ToDoListProps> = ({ todos, onDeleteTodo, onEditTodo }) => {
  const handleEditTodo = (index: number, todo: string) => {
    onEditTodo(index, todo);
  };

  const renderTodoItem = ({ item, index }: { item: string; index: number }) => (
    <View style={styles.todoItem}>
      <Text>{item}</Text>
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
