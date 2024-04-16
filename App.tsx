import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome5 } from "@expo/vector-icons";
import HomeScreen from "./src/screens/screenHome";
import ToDosScreen from "./src/screens/screenTasks";
import HabitsScreen from "./src/screens/screenHabits";

const Tab = createBottomTabNavigator();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color, size }) => <FontAwesome5 name="home" color={color} size={size} />,
          }}
        />
        <Tab.Screen
          name="To Dos"
          component={ToDosScreen}
          options={{
            tabBarIcon: ({ color, size }) => <FontAwesome5 name="tasks" color={color} size={size} />,
          }}
        />
        <Tab.Screen
          name="Habits"
          component={HabitsScreen}
          options={{
            tabBarIcon: ({ color, size }) => <FontAwesome5 name="heartbeat" color={color} size={size} />,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
