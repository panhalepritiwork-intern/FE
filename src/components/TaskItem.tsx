import { Task } from "../types/task";

type Props = {
  task: Task;
  onUpdate: (id: string, status: string) => void;
  onDelete: (id: string) => void;
};

const TaskItem: React.FC<Props> = ({ task, onUpdate, onDelete }) => {
  return (
    <div className="task-card">
      {/*Left side: Task info*/}
      <div>
        <h3>{task.title}</h3>
        <p className={`status ${task.status}`}>Status: {task.status}</p>
      </div>

      {/*Right side: Action buttons*/}
      <div className="actions">
        <button
          className="in-progress"
          onClick={() => onUpdate(task._id, "in-progress")}
        >
          In Progress
        </button>
        <button
          className="complete"
          onClick={() => onUpdate(task._id, "completed")}
        >
          Complete
        </button>
        <button
          className="delete"
          onClick={() => onDelete(task._id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
