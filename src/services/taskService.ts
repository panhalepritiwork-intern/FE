import axios from "axios";
import { Task } from "../types/task";

const API_URL = "http://localhost:5000/api/tasks"; 

//fetch
export const getTasks = async (): Promise<Task[]> => {
  const res = await axios.get(API_URL);
  return res.data;
};

//create
export const createTask = async (title: string, userId: string): Promise<Task> => {
  const res = await axios.post(API_URL, { title, user: userId });
  return res.data;
};

//update
export const updateTask = async (id: string, status: string): Promise<Task> => {
  const res = await axios.put(`${API_URL}/${id}`, { status });
  return res.data;
};

//delete
export const deleteTask = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
