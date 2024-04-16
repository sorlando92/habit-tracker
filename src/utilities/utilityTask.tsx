import { Task } from "../interfaces/Interfaces";

const fetchTodosFromAPI = async (): Promise<Task[]> => {
  await new Promise((resolve) => setTimeout(resolve, 100));

  return [
    { id: 1, title: "Give Scrunchie his medicine.", description: "Half a pill, twice a day.", completed: false },
    { id: 2, title: "Text the baby sitters", description: "Find out all the weekends we can book them.", completed: true },
    { id: 3, title: "Renew registration.", description: "DMV failed, needed to go into an office", completed: false },
  ];
};

export { fetchTodosFromAPI };
