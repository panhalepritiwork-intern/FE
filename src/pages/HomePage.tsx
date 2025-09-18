import { useState } from "react";
import TaskItem from "../components/TaskItem";
import { Task } from "../types/task";

const HomePage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { _id: "1", title: "Learn TypeScript", status: "pending", user: "123" },
    { _id: "2", title: "Setup Boilerplate", status: "completed", user: "123" },
  ]);

  const [newTask, setNewTask] = useState("");

  const handleAddTask = () => {
    if (!newTask.trim()) return;
    const task: Task = {
      _id: Date.now().toString(),
      title: newTask,
      status: "pending",
      user: "123",
    };
    setTasks([...tasks, task]);
    setNewTask("");
  };

  const handleUpdate = (id: string, status: string) => {
    const updatedTasks = tasks.map((task) =>
      task._id === id ? { ...task, status } : task
    );
    setTasks(updatedTasks);
  };

  const handleDelete = (id: string) => {
    setTasks(tasks.filter((task) => task._id !== id));
  };

  return (
    <div className="container">
      <h1>Home Page</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAddTask();
        }}
      >
        <input
          type="text"
          placeholder="Enter new task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button type="submit">Add Task</button>
      </form>

      {tasks.map((task) => (
        <TaskItem
          key={task._id}
          task={task}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default HomePage;
