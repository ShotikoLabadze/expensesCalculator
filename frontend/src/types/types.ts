export interface Finance {
  _id: string;
  amount: number;
  description?: string;
  date: string;
  type: "income" | "expense";
}
