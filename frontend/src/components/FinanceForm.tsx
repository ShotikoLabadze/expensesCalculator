import React, { useState, useEffect } from "react";
import { addFinance } from "../api/finance";
import { getCategories } from "../api/category";
import type { Category } from "../types/types";
import CategorySelect from "./CategorySelect";

const FinanceForm = () => {
  const [amount, setAmount] = useState<number>(0);
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<string>(
    new Date().toISOString().slice(0, 10)
  );
  const [category, setCategory] = useState<string>("");
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!category) {
      alert("Please select a category");
      return;
    }

    try {
      await addFinance({ amount, description, date, category });
      alert("Finance added!");
      setAmount(0);
      setDescription("");
      setCategory("");
    } catch (err: any) {
      console.error(err.response?.data);
      alert(err.response?.data?.message || "Error adding finance");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(+e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <CategorySelect
        categories={categories}
        value={category}
        onChange={setCategory}
      />
      <button type="submit">Add Finance</button>
    </form>
  );
};

export default FinanceForm;
