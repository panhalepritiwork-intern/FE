import axios from "axios";
import { Task } from "../types/task";

const API_URL = "http://localhost:5000/api/tasks";

//Add token to headers
const getAuthHeaders = (token: string) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

//Fetch
export const getTasks = async (token: string): Promise<Task[]> => {
  const res = await axios.get(API_URL, getAuthHeaders(token));
  return res.data;
};

//Create
export const createTask = async (title: string, token: string): Promise<Task> => {
  const res = await axios.post(
    API_URL,
    { title }, 
    getAuthHeaders(token)
  );
  return res.data;
};

//Update
export const updateTask = async (id: string, status: string, token: string): Promise<Task> => {
  const res = await axios.put(
    `${API_URL}/${id}`,
    { status },
    getAuthHeaders(token)
  );
  return res.data;
};

//Delete 
export const deleteTask = async (id: string, token: string): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`, getAuthHeaders(token));
};
