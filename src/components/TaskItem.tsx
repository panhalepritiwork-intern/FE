import { Task } from "../types/task";

type Props = {
  task: Task;
  onUpdate: (id: string, status: string) => void;
  onDelete: (id: string) => void;
};

const TaskItem: React.FC<Props> = ({ task, onUpdate, onDelete }) => {
  return (
    <div className="card shadow-sm mb-3 border-0 task-card">
      <div className="card-body d-flex justify-content-between align-items-center">
        {/* Left side-- Task info */}
        <div>
          <h6 className="card-title mb-1 fw-semibold">{task.title}</h6>
          <span
            className={`badge px-3 py-2 text-capitalize ${
              task.status === "completed"
                ? "bg-success"
                : task.status === "in-progress"
                ? "bg-info text-dark"
                : "bg-secondary"
            }`}
          >
            {task.status}
          </span>
        </div>

        {/* Right side-- Action buttons */}
        <div className="btn-group">
          <button
            className="btn btn-sm btn-outline-info"
            onClick={() => onUpdate(task._id, "in-progress")}
          >
            In Progress
          </button>
          <button
            className="btn btn-sm btn-outline-success"
            onClick={() => onUpdate(task._id, "completed")}
          >
            Complete
          </button>
          <button
            className="btn btn-sm btn-outline-danger"
            onClick={() => onDelete(task._id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
