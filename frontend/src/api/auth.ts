import api from "@/lib/api";
import type { AuthResponse } from "@/types/finance";

export const loginUser = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  const res = await api.post("/auth/login", { email, password });
  return res.data;
};

export const registerUser = async (
  username: string,
  email: string,
  password: string
): Promise<AuthResponse> => {
  const res = await api.post("/auth/register", { username, email, password });
  return res.data;
};
