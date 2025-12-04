import axios from "axios";

const BASE_URL =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/api/auth";

export const loginUser = async (email: string, password: string) => {
  const res = await axios.post(`${BASE_URL}/login`, { email, password });
  return res.data;
};

export const registerUser = async (
  username: string,
  email: string,
  password: string
) => {
  const res = await axios.post(`${BASE_URL}/register`, {
    username,
    email,
    password,
  });
  return res.data;
};
