import api from "@/lib/api";
import type { Finance, MonthlySummary, FinanceFormData } from "@/types/finance";

export const getFinances = async (): Promise<Finance[]> => {
  const res = await api.get("/finances");
  return res.data;
};

export const addFinance = async (data: FinanceFormData): Promise<Finance> => {
  const payload = {
    ...data,
    amount: Number(data.amount),
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
