import React, { useState, useEffect } from "react";
import { View, Text, Button, FlatList, StyleSheet } from "react-native";
import AddHabitModal from "../components/modalAddHabit";
import HabitsList from "../components/HabitList";
import { Habit } from "../interfaces/Interfaces";
import { fetchHabitsFromAPI, handleAddHabit, handleDeleteHabit, handleMarkComplete } from "../utilities/utilityHabit";

const HabitsScreen: React.FC = () => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedHabitIndex, setSelectedHabitIndex] = useState<number | null>(null);
  const [habitName, setHabitName] = useState("");
  const [habitDescription, sethabitDescription] = useState("");

  useEffect(() => {
    const fetchHabits = async () => {
      try {
        const habitsFromAPI = await fetchHabitsFromAPI();
        setHabits(habitsFromAPI);
      } catch (e) {
        console.error("Error fetching todos: ", e);
      }
    };

    fetchHabits();
  }, []);

  const handleSaveHabit = (name: string, description: string) => {
    if (name.trim() !== "") {
      const newHabit: Habit = {
        id: Math.random(),
        name,
        description,
        completed: false,
      };

      if (selectedHabitIndex !== null) {
        const updatedHabits = [...habits];
        updatedHabits[selectedHabitIndex] = newHabit;
        setHabits(updatedHabits);
        setSelectedHabitIndex(null);
      } else {
        setHabits([...habits, newHabit]);
      }
    }

    setModalVisible(false);
    setHabitName("");
    sethabitDescription("");
  };

  const handleEditHabit = (index: number, habit: Habit) => {
    setSelectedHabitIndex(index);
    setHabitName(habit.name);
    sethabitDescription(habit.description);
    setModalVisible(true);
  };

  const handleDeleteHabit = (index: number) => {
    const updatedHabits = [...habits];
    updatedHabits.splice(index, 1);
    setHabits(updatedHabits);
  };

  const handleMarkComplete = (id: number) => {
    setHabits((prevHabits) =>
      prevHabits.map((habit) => {
        if (habit.id === id) {
          return {
            ...habit,
            completed: !habit.completed,
          };
        }
        return habit;
      })
    );
  };

  const handleCancelAddHabit = () => {
    setHabitName("");
    sethabitDescription("");
    setModalVisible(false);
    setSelectedHabitIndex(null);
  };

  return (
    <View style={styles.container}>
      <HabitsList habits={habits} onDeleteHabit={handleDeleteHabit} onEditHabit={handleEditHabit} onCompelteHabit={handleMarkComplete}></HabitsList>
      <AddHabitModal visible={modalVisible} onClose={handleCancelAddHabit} onAddHabit={handleSaveHabit} initialName={habitName} initialDescription={habitDescription} />
      <View style={styles.addHabitButton}>
        <Button title="Add Habit" onPress={() => setModalVisible(true)} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  addHabitButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
  habitContainer: {
    backgroundColor: "#e6e6e6",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  completedHabit: {
    backgroundColor: "#a5d6a7",
  },
  habitName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
});

export default HabitsScreen;
