import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Modal, Button, StyleSheet } from "react-native";

interface AddHabitModalProps {
  visible: boolean;
  onClose: () => void;
  onAddHabit: (name: string, description: string) => void;
  initialName: string;
  initialDescription: string;
}

const AddHabitModal: React.FC<AddHabitModalProps> = ({ visible, onClose, onAddHabit, initialName, initialDescription }) => {
  const [habitName, setHabitName] = useState("");
  const [habitDescription, setHabitDescription] = useState("");

  useEffect(() => {
    if (visible) {
      setHabitName(initialName);
      setHabitDescription(initialDescription);
    }
  }, [visible, initialName, initialDescription]);

  const handleAddHabit = () => {
    if (habitName.trim() !== "") {
      onAddHabit(habitName, habitDescription);
      setHabitName("");
      setHabitDescription("");
      onClose();
    }
  };

  return (
    <>
      <Modal visible={visible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.title}>{habitName ? "Edit Habit" : "Add Habit"}</Text>
            <TextInput style={styles.input} value={habitName} onChangeText={setHabitName} placeholder="Habit Name" />
            <TextInput style={[styles.input, styles.habitDescription]} placeholder="Description" value={habitDescription} onChangeText={setHabitDescription} multiline />
            <View style={styles.buttonContainer}>
              <Button title="Cancel" onPress={onClose} color="red" />
              <Button title="Save" onPress={handleAddHabit} />
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  habitDescription: {
    height: 80,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
});

export default AddHabitModal;
