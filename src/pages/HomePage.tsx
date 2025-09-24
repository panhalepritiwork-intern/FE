import { useEffect, useState } from "react";
import TaskItem from "../components/TaskItem";
import { Task } from "../types/task";
import { getTasks, createTask, updateTask, deleteTask } from "../services/taskService";
import { auth } from "../firebase";

const HomePage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");
  const [newDesc, setNewDesc] = useState(""); 
  const [filter, setFilter] = useState<"all" | "pending" | "in-progress" | "completed">("all");

  useEffect(() => {
    fetchTasks();
  }, []);

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

  const handleAddTask = async () => {
    if (!newTask.trim()) return;
    try {
      const token = await auth.currentUser?.getIdToken();
      if (!token) return;

      const task = await createTask({ title: newTask, description: newDesc }, token);

      setTasks([...tasks, task]);
      setNewTask("");
      setNewDesc(""); 
    } catch (err) {
      console.error("Error creating task:", err);
    }
  };

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

  const completedCount = tasks.filter((t) => t.status === "completed").length;
  const progress = tasks.length > 0 ? (completedCount / tasks.length) * 100 : 0;

  return (
    <div className="container py-4">
      
      <h1 className="task-title text-center mb-4">Track Your Progress</h1>

      <form
        className="row g-2 justify-content-center mb-4"
        onSubmit={(e) => {
          e.preventDefault();
          handleAddTask();
        }}
      >
        <div className="col-md-8">
          <input
            type="text"
            className="form-control mb-2"
            placeholder="e.g. Learn MongoDB basics, Finish React project..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            required
          />

          <textarea
            className="form-control"
            placeholder="Add details or notes"
            value={newDesc}
            onChange={(e) => setNewDesc(e.target.value)}
          />
        </div>

        <div className="col-md-2">
          <button type="submit" className="btn btn-success w-100">
             Add Task
          </button>
        </div>
      </form>

      <div className="mb-4">
        <p className="fw-semibold">
          Completed: {completedCount}/{tasks.length}
        </p>
        <div className="progress" style={{ height: "14px", borderRadius: "8px" }}>
          <div
            className="progress-bar bg-success"
            role="progressbar"
            style={{ width: `${progress}%`, transition: "width 0.5s ease-in-out" }}
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </div>
      </div>

      <div className="d-flex justify-content-end mb-3">
        <select
          className="form-select w-auto"
          value={filter}
          onChange={(e) => setFilter(e.target.value as any)}
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {tasks.length === 0 ? (
        <div className="text-center text-muted mt-5">
          <span style={{ fontSize: "3rem" }}></span>
          <p className="mt-2">Your task list is empty. Add a task to get started.</p>
        </div>
      ) : (
        <div className="list-group">
          {tasks
            .filter((task) => filter === "all" || task.status === filter)
            .map((task) => (
              <TaskItem
                key={task._id}
                task={task}
                onUpdate={handleUpdate}
                onDelete={handleDelete}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
