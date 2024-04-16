import { Habit } from "../interfaces/Interfaces";

//handle habit functions
export const handleAddHabit = (habits: Habit[], name: string, description: string, setHabits: React.Dispatch<React.SetStateAction<Habit[]>>) => {
  const newHabit: Habit = {
    id: Math.random(),
    name,
    description,
    completed: false,
  };
  setHabits([...habits, newHabit]);
};

export const handleDeleteHabit = (habits: Habit[], index: number, setHabits: React.Dispatch<React.SetStateAction<Habit[]>>) => {
  const updatedHabits = [...habits];
  return updatedHabits.splice(index, 1);
};

export const handleMarkComplete = (id: number, habits: Habit[], setHabits: React.Dispatch<React.SetStateAction<Habit[]>>) => {
  setHabits((prevHabits) => prevHabits.map((habit) => (habit.id === id ? { ...habit, completed: !habit.completed } : habit)));
};

// APIs to fetch habits
export const fetchHabitsFromAPI = async (): Promise<Habit[]> => {
  await new Promise((resolve) => setTimeout(resolve, 100));

  return [
    { id: 1, name: "Go on a walk with the kids.", description: "Its your special time!", completed: false },
    { id: 2, name: "Eat a meal with husband.", description: "Be close.", completed: true },
  ];
};
