import { ToDo } from "../interfaces/todoInterface";

const fetchTodosFromAPI = async (): Promise<ToDo[]> => {
  // Simulated API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Simulated response from the API
  return [
    { id: 1, title: "Todo 1", description: "Desc 1", completed: false },
    { id: 2, title: "Todo 2", description: "Desc 2", completed: true },
    { id: 3, title: "Todo 3", description: "Desc 2", completed: false },
  ];
};

export { fetchTodosFromAPI };
