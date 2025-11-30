export interface Finance {
  _id: number;
  amount: number;
  description?: string;
  date: string;
  category: Category;
}

export interface Category {
  _id: number;
  name: string;
  type: "income" | "expense";
}
