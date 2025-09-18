import TaskItem from "../components/TaskItem";
import { Task } from "../types/task";

const HomePage: React.FC = () => {
  const tasks: Task[] = [
    { _id: "1", title: "Learn TypeScript", status: "pending", user: "123" },
    { _id: "2", title: "Setup Boilerplate", status: "completed", user: "123" },
  ];

  return (
    <div>
      <h1>Home Page</h1>
      {tasks.map((task) => (
        <TaskItem key={task._id} task={task} />
      ))}
    </div>
  );
};

export default HomePage;
