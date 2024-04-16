class Task {
  id: number;
  name: string;
  description: string;
  priority: number;
  completed: boolean;

  constructor(id: number, name: string, description: string, priority: number, completed: boolean) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.priority = priority;
    this.completed = completed;
  }

  // Method to mark the task as completed
  markComplete(): void {
    this.completed = true;
  }
}
