import { Task } from "../types/task";

type Props = {
  task: Task;
  onUpdate: (id: string, status: string) => void;
  onDelete: (id: string) => void;
};

const TaskItem: React.FC<Props> = ({ task, onUpdate, onDelete }) => {
  const getStatusClass = (status: string) => {
    switch (status) {
      case "completed":
        return "status completed";
      case "in-progress":
        return "status in-progress";
      default:
        return "status pending";
    }
  };

  return (
    <div className="task-card">
      <h3>{task.title}</h3>
      <p className={getStatusClass(task.status)}>Status: {task.status}</p>

      <div style={{ marginTop: "10px" }}>
        <button onClick={() => onUpdate(task._id, "in-progress")}>In Progress</button>
        <button onClick={() => onUpdate(task._id, "completed")}>Complete</button>
        <button onClick={() => onDelete(task._id)}>Delete</button>
      </div>
    </div>
  );
};

export default TaskItem;
