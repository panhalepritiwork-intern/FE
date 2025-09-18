import { Task } from "../types/task";

type Props = {
  task: Task;
};

const TaskItem: React.FC<Props> = ({ task }) => {
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
    </div>
  );
};

export default TaskItem;
