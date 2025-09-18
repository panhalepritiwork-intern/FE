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
        <div key={task._id} className="task-item">
          <TaskItem task={task} />
        </div>
      ))}
    </div>
  );
};

export default HomePage;
