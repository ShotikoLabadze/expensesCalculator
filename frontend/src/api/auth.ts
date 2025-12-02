import axios from "axios";

const BASE_URL =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/api";

export const registerUser = async (data: {
  username: string;
  email: string;
  password: string;
}) => {
  const res = await axios.post(`${BASE_URL}/auth/register`, data);
  return res.data;
};

export const loginUser = async (data: { email: string; password: string }) => {
  const res = await axios.post(`${BASE_URL}/auth/login`, data);
  return res.data;
};
