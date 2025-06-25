import { createContext, useContext, useState, ReactNode } from "react";
import { fetchTaskPhrasesByDay } from '../services/taskService';


// Define the shape of the context
interface TaskContextType {
  tasks: string[];
  loadTasks: (day: number) => Promise<void>;
  popTask: () => void;
}

// Provide a default value for TypeScript (null or dummy functions)
const TaskContext = createContext<TaskContextType | undefined>(undefined);

// Component props type
interface TaskProviderProps {
  children: ReactNode;
}

export const TaskProvider = ({ children }: TaskProviderProps) => {
  const [tasks, setTasks] = useState<string[]>([]);

  const loadTasks = async (day: number) => {
    const fetched = await fetchTaskPhrasesByDay(day); // <-- your real function
    setTasks(fetched);
  };

  const popTask = () => {
    setTasks(prev => prev.slice(1));
  };

  return (
    <TaskContext.Provider value={{ tasks, loadTasks, popTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTask = (): TaskContextType => {
  const context = useContext(TaskContext);
  if (!context) throw new Error("useTask must be used within a TaskProvider");
  return context;
};
