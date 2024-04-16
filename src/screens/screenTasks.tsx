import React, { useEffect, useState } from "react";
import { View, Button, StyleSheet } from "react-native";
import AddToDoModal from "../components/AddTodoModal";
import ToDoList from "../components/ToDoList";
import { Task } from "../interfaces/Interfaces";
import { fetchTodosFromAPI } from "../utilities/utilityTask";

const ToDosScreen: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [todos, setTodos] = useState<Task[]>([]);
  const [todoTitle, setTodoTitle] = useState("");
  const [todoDescription, setTodoDescription] = useState("");

  const [selectedTodoIndex, setSelectedTodoIndex] = useState<number | null>(null);

  useEffect(() => {
    const fetchToDos = async () => {
      try {
        const todosFromAPI = await fetchTodosFromAPI();
        setTodos(todosFromAPI);
      } catch (e) {
        console.error("Error fetching todos: ", e);
      }
    };

    fetchToDos();
  }, []);

  const handleSaveTodo = (title: string, description: string) => {
    if (title.trim() !== "") {
      const newTodo: Task = {
        id: Math.random(),
        title,
        description,
        completed: false,
      };
      if (selectedTodoIndex !== null) {
        // Edit existing todo
        const updatedTodos = [...todos];
        updatedTodos[selectedTodoIndex] = newTodo;
        setTodos(updatedTodos);
        setSelectedTodoIndex(null);
      } else {
        // Add new todo
        setTodos([...todos, newTodo]);
      }
    }
    setIsModalVisible(false);
    setTodoTitle("");
    setTodoDescription("");
  };

  const handleDeleteTodo = (index: number) => {
    const updatedTodos = [...todos];
    updatedTodos.splice(index, 1);
    setTodos(updatedTodos);
  };

  const handleEditTodo = (index: number, todo: Task) => {
    setSelectedTodoIndex(index);
    setTodoTitle(todo.title);
    setTodoDescription(todo.description);
    setIsModalVisible(true);
  };

  const handleCancelAddTodo = () => {
    setTodoTitle("");
    setTodoDescription("");
    setIsModalVisible(false);
    setSelectedTodoIndex(null);
  };

  return (
    <View style={styles.container}>
      <ToDoList todos={todos} onDeleteTodo={handleDeleteTodo} onEditTodo={handleEditTodo} />
      <AddToDoModal visible={isModalVisible} onSave={handleSaveTodo} onClose={handleCancelAddTodo} initialTitle={todoTitle} initialDescription={todoDescription} />
      <View style={styles.addButtonContainer}>
        <Button title="Add Todo" onPress={() => setIsModalVisible(true)} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  addButtonContainer: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
});

export default ToDosScreen;
