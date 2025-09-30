import axios from "axios";

const API_URL = "http://localhost:5000/api/users";

const getAuthHeaders = (token: string) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});


export const getUsers = async (token: string) => {
  const res = await axios.get(API_URL, getAuthHeaders(token));
  return res.data;
};


export const setUserRole = async (uid: string, role: string, token: string) => {
  const res = await axios.post(
    `${API_URL}/set-role`,
    { uid, role },
    getAuthHeaders(token)
  );
  return res.data;
};
