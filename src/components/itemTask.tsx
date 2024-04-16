import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Task } from "../interfaces/Interfaces";

interface TodoItemProps {
  task: Task;
  onDeleteTask: () => void;
  onEditTask: () => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ task, onDeleteTask, onEditTask }) => {
  const [expanded, setExpanded] = useState<boolean>(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <View style={[styles.container, expanded && styles.expandedContainer]}>
      <TouchableOpacity onPress={toggleExpand}>
        <View style={styles.header}>
          <Text style={styles.title}>{task.name}</Text>
        </View>
      </TouchableOpacity>
      {expanded && (
        <View style={styles.content}>
          <Text>{task.description}</Text>
          <View style={styles.actions}>
            <TouchableOpacity onPress={onEditTask}>
              <FontAwesome name="edit" size={20} style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={onDeleteTask}>
              <FontAwesome name="trash" size={20} style={styles.icon} />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#e6e6e6",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  expandedContainer: {
    marginBottom: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  content: {
    overflow: "hidden",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
  },
  icon: {
    marginLeft: 10,
  },
});

export default TodoItem;
