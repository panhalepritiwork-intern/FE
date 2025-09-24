import axios from "axios";
import { Task } from "../types/task";

const API_URL = "http://localhost:5000/api/tasks";

const getAuthHeaders = (token: string) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const getTasks = async (token: string): Promise<Task[]> => {
  const res = await axios.get(API_URL, getAuthHeaders(token));
  return res.data;
};

export const createTask = async (
  taskData: { title: string; description?: string },
  token: string
): Promise<Task> => {
  const res = await axios.post(API_URL, taskData, getAuthHeaders(token));
  return res.data;
};

export const updateTask = async (
  id: string,
  status: string,
  token: string
): Promise<Task> => {
  const res = await axios.put(
    `${API_URL}/${id}`,
    { status },
    getAuthHeaders(token)
  );
  return res.data;
};

export const deleteTask = async (id: string, token: string): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`, getAuthHeaders(token));
};
