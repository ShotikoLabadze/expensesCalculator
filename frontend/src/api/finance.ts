import api from "@/lib/api";
import type { Finance, MonthlySummary, FinanceFormData } from "@/types/finance";

export const getFinances = async (): Promise<Finance[]> => {
  const res = await api.get("/finances");
  return res.data;
};

export const addFinance = async (data: any): Promise<Finance> => {
  const payload = {
    amount: Number(data.amount),

    description: data.description || data.title,
    date: data.date || new Date().toISOString(),
    type: data.type,
  };
  const res = await api.post("/finances", payload);
  return res.data;
};

export const deleteFinance = async (id: string): Promise<void> => {
  await api.delete(`/finances/${id}`);
};

export const getMonthlySummary = async (
  month: number,
  year: number,
): Promise<MonthlySummary> => {
  const res = await api.get(`/finances/summary?month=${month}&year=${year}`);
  return res.data;
};

export interface User {
  id: string;
  email: string;
  username?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}
