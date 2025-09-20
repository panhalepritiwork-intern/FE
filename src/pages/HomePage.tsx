import { useEffect, useState } from "react";
import TaskItem from "../components/TaskItem";
import { Task } from "../types/task";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../services/taskService";

const DUMMY_USER_ID = "68ca441e8d7de7643abd7e01";

const HomePage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  const handleAddTask = async () => {
    if (!newTask.trim()) return;
    try {
      const task = await createTask(newTask, DUMMY_USER_ID);
      setTasks([...tasks, task]);
      setNewTask("");
    } catch (err) {
      console.error("Error creating task:", err);
    }
  };

  const handleUpdate = async (id: string, status: string) => {
    try {
      const updated = await updateTask(id, status);
      setTasks(tasks.map((t) => (t._id === id ? updated : t)));
    } catch (err) {
      console.error("Error updating task:", err);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteTask(id);
      setTasks(tasks.filter((t) => t._id !== id));
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  return (
    <div className="container">
      <h1>Track Your Progress</h1>

      {/* Add Task Form */}
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

      {/*Empty State */}
      {tasks.length === 0 ? (
        <div className="empty">
          <span>📋</span>
          <p>Your task list is empty. Add a task to get started.</p>
        </div>
      ) : (
        tasks.map((task) => (
          <TaskItem
            key={task._id}
            task={task}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        ))
      )}
    </div>
  );
};

export default HomePage;
