import axios from "axios";

const BASE_URL =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/api";

export const getCategories = async () => {
  const res = await axios.get(`${BASE_URL}/categories`);
  return res.data;
};

export const addCategory = async (data: any) => {
  const res = await axios.post(`${BASE_URL}/categories`, data);
  return res.data;
};
