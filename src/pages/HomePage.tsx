import { useEffect, useState } from "react";
import TaskItem from "../components/TaskItem";
import { Task } from "../types/task";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../services/taskService";
import { auth } from "../firebase";

const HomePage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState<"all" | "pending" | "in-progress" | "completed">("all");

  //Load tasks
  useEffect(() => {
    fetchTasks();
  }, []);

  //Fetch
  const fetchTasks = async () => {
    try {
      const token = await auth.currentUser?.getIdToken();
      if (!token) return;

      const data = await getTasks(token);
      setTasks(data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  //Add
  const handleAddTask = async () => {
    if (!newTask.trim()) return;
    try {
      const token = await auth.currentUser?.getIdToken();
      if (!token) return;

      const task = await createTask(newTask, token);
      setTasks([...tasks, task]);
      setNewTask("");
    } catch (err) {
      console.error("Error creating task:", err);
    }
  };

  //Update
  const handleUpdate = async (id: string, status: string) => {
    try {
      const token = await auth.currentUser?.getIdToken();
      if (!token) return;

      const updated = await updateTask(id, status, token);
      setTasks(tasks.map((t) => (t._id === id ? updated : t)));
    } catch (err) {
      console.error("Error updating task:", err);
    }
  };

  //Delete
  const handleDelete = async (id: string) => {
    try {
      const token = await auth.currentUser?.getIdToken();
      if (!token) return;

      await deleteTask(id, token);
      setTasks(tasks.filter((t) => t._id !== id));
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  //Progress
  const completedCount = tasks.filter((t) => t.status === "completed").length;
  const progress = tasks.length > 0 ? (completedCount / tasks.length) * 100 : 0;

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

      {/* Progress Bar */}
      <div style={{ margin: "20px 0" }}>
        <p>
          Completed: {completedCount}/{tasks.length}
        </p>
        <div
          style={{
            background: "#e0e0e0",
            borderRadius: "8px",
            overflow: "hidden",
            height: "12px",
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              background: "#28a745",
              height: "100%",
              transition: "width 0.3s ease",
            }}
          />
        </div>
      </div>

      {/* Task Filter */}
      <div style={{ marginBottom: "15px", textAlign: "right" }}>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as any)}
          style={{ padding: "6px", borderRadius: "6px" }}
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {/*Empty State */}
      {tasks.length === 0 ? (
        <div className="empty">
          <p>Your task list is empty. Add a task to get started.</p>
        </div>
      ) : (
        tasks
          .filter((task) => filter === "all" || task.status === filter)
          .map((task) => (
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
