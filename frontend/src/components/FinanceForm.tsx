import React, { useState } from "react";
import { addFinance } from "../api/finance";

interface Props {
  onAdded: () => void;
}

const FinanceForm: React.FC<Props> = ({ onAdded }) => {
  // Initialize amount as an empty string
  const [amount, setAmount] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<string>(
    new Date().toISOString().slice(0, 10)
  );
  const [type, setType] = useState<"income" | "expense">("expense");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await addFinance({
      amount: Number(amount),
      description,
      date,
      type,
    });

    // Reset form
    setAmount("");
    setDescription("");
    setType("expense");
    onAdded();
  };

  return (
    <form onSubmit={handleSubmit} className="finance-form">
      <div className="type-selector">
        <label>
          <input
            type="radio"
            value="income"
            checked={type === "income"}
            onChange={() => setType("income")}
          />{" "}
          Income
        </label>
        <label>
          <input
            type="radio"
            value="expense"
            checked={type === "expense"}
            onChange={() => setType("expense")}
          />{" "}
          Expense
        </label>
      </div>

      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
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
      <button type="submit">Add</button>
    </form>
  );
};

export default FinanceForm;
