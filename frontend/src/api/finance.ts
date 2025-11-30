import axios from "axios";

const BASE_URL =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/api";

export const getFinances = async () => {
  const res = await axios.get(`${BASE_URL}/finances`);
  return res.data;
};

export const addFinance = async (data: any) => {
  const res = await axios.post(`${BASE_URL}/finances`, data);
  return res.data;
};

export const deleteFinance = async (id: string) => {
  const res = await axios.delete(`${BASE_URL}/finances/${id}`);
  return res.data;
};

export const updateFinance = async (id: string) => {
  const res = await axios.put(`${BASE_URL}/finances/${id}`);
  return res.data;
};

export const monthlySummary = async (month: number, year: number) => {
  const res = await axios.get(
    `${BASE_URL}/finances/summary?month=${month}&year=${year}`
  );
  return res.data;
};
export const getCategoryBreakdown = async (month: number, year: number) => {
  const res = await axios.get(
    `${BASE_URL}/finances/category-breakdown?month=${month}&year=${year}`
  );
  return res.data;
};

export const predictNextMonthExpense = async () => {
  const res = await axios.get(`${BASE_URL}/finances/predict`);
  return res.data;
};
