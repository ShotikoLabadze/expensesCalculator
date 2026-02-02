export interface Finance {
  _id: string;
  title: string;
  amount: number;
  type: "income" | "expense";
  category?: string;
  date?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface MonthlySummary {
  income: number;
  expense: number;
}

export interface AuthResponse {
  token: string;
  user?: {
    id: string;
    username: string;
    email: string;
  };
}

export interface FinanceFormData {
  title: string;
  amount: number;
  type: "income" | "expense";
  category?: string;
  date?: string;
}
