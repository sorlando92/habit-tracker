import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Animated } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Habit } from "../interfaces/Interfaces";

interface HabitsListProps {
  habits: Habit[];
  onDeleteHabit: (index: number) => void;
  onEditHabit: (index: number, todo: Habit) => void;
  onCompelteHabit: (index: number) => void;
}

const HabitsList: React.FC<HabitsListProps> = ({ habits, onDeleteHabit, onEditHabit, onCompelteHabit }) => {
  const [expandedHabitIndex, setExpandedHabitIndex] = useState<number | null>(null);
  const [animation] = useState(new Animated.Value(0));

  const toggleExpand = (index: number) => {
    if (expandedHabitIndex === index) {
      setExpandedHabitIndex(null);
    } else {
      setExpandedHabitIndex(index);
    }
    Animated.timing(animation, {
      toValue: index === expandedHabitIndex ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const renderHabitItem = ({ item, index }: { item: Habit; index: number }) => {
    const isExpanded = index === expandedHabitIndex;

    return (
      <View style={[styles.habitContainer, item.completed && styles.completedHabit]}>
        <TouchableOpacity onPress={() => toggleExpand(index)}>
          <Animated.View style={[styles.habitItem, isExpanded && styles.expandedHabitItem]}>
            <Text style={styles.title}>{item.name}</Text>
            {isExpanded && <Text style={styles.description}>{item.description}</Text>}
            {isExpanded && (
              <View style={styles.iconContainer}>
                <TouchableOpacity onPress={() => onCompelteHabit(index)}>
                  <FontAwesome name="check" size={20} style={styles.icon} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => onEditHabit(index, item)}>
                  <FontAwesome name="pencil" size={20} style={styles.icon} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => onDeleteHabit(index)}>
                  <FontAwesome name="trash" size={20} style={styles.icon} />
                </TouchableOpacity>
              </View>
            )}
          </Animated.View>
        </TouchableOpacity>
      </View>
    );
  };

  return <FlatList data={habits} renderItem={renderHabitItem} keyExtractor={(habit, index) => index.toString()} />;
};

const styles = StyleSheet.create({
  habitContainer: {
    backgroundColor: "#7ed348",
    paddingHorizontal: 5,
    borderRadius: 10,
    margin: 10,
  },
  habitItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    overflow: "hidden",
  },
  expandedHabitItem: {
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
  completedHabit: {
    backgroundColor: "#a5d6a7",
  },
});

export default HabitsList;
