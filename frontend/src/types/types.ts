export interface Finance {
  _id: string;
  amount: number;
  description?: string;
  date: string;
  category: Category;
}

export interface Category {
  _id: string;
  name: string;
  type: "income" | "expense";
}
