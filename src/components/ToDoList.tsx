import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Animated } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { ToDo } from "../interfaces/todoInterface";

interface ToDoListProps {
  todos: ToDo[];
  onDeleteTodo: (index: number) => void;
  onEditTodo: (index: number, todo: ToDo) => void;
}

const ToDoList: React.FC<ToDoListProps> = ({ todos, onDeleteTodo, onEditTodo }) => {
  const [expandedTodoIndex, setExpandedTodoIndex] = useState<number | null>(null);
  const [animation] = useState(new Animated.Value(0));

  const toggleExpand = (index: number) => {
    if (expandedTodoIndex === index) {
      setExpandedTodoIndex(null);
    } else {
      setExpandedTodoIndex(index);
    }
    Animated.timing(animation, {
      toValue: index === expandedTodoIndex ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const renderTodoItem = ({ item, index }: { item: ToDo; index: number }) => {
    const isExpanded = index === expandedTodoIndex;

    const heightInterpolation = animation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, isExpanded && item.description ? 100 : 0],
    });

    const animatedStyles = {
      height: heightInterpolation,
    };

    return (
      <View style={styles.todoContainer}>
        <TouchableOpacity onPress={() => toggleExpand(index)}>
          <Animated.View style={[styles.todoItem, isExpanded && styles.expandedTodoItem]}>
            <Text style={styles.title}>{item.title}</Text>
            {isExpanded && <Text style={styles.description}>{item.description}</Text>}
            {isExpanded && (
              <View style={styles.iconContainer}>
                <TouchableOpacity onPress={() => onEditTodo(index, item)}>
                  <FontAwesome name="pencil" size={20} style={styles.icon} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => onDeleteTodo(index)}>
                  <FontAwesome name="trash" size={20} style={styles.icon} />
                </TouchableOpacity>
              </View>
            )}
          </Animated.View>
        </TouchableOpacity>
      </View>
    );
  };

  return <FlatList data={todos} renderItem={renderTodoItem} keyExtractor={(item, index) => index.toString()} />;
};

const styles = StyleSheet.create({
  todoContainer: {
    backgroundColor: "#c0c0c0",
    paddingHorizontal: 5,
    borderRadius: 10,
    margin: 10,
  },
  todoItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    overflow: "hidden",
  },
  expandedTodoItem: {
    borderBottomWidth: 0,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  icon: {
    marginRight: 10,
  },
});

export default ToDoList;
