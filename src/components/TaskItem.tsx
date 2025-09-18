import { Task } from "../types/task";

type Props = {
  task: Task;
};

const TaskItem: React.FC<Props> = ({ task }) => {
  return (
    <div style={{ border: "1px solid #ccc", margin: "5px", padding: "10px", borderRadius: "6px" }}>
      <h3>{task.title}</h3>
      <p>Status: {task.status}</p>
    </div>
  );
};

export default TaskItem;
