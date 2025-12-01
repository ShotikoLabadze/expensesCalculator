import React, { useEffect, useState } from "react";
import { getFinances, deleteFinance } from "../api/finance";
import type { Finance } from "../types/types";

const FinanceList = () => {
  const [finances, setFinances] = useState<Finance[]>([]);

  useEffect(() => {
    loadFinances();
  }, []);

  const loadFinances = async () => {
    const data = await getFinances();
    setFinances(data);
  };

  const handleDelete = async (id: string) => {
    await deleteFinance(id);
    loadFinances();
  };

  return (
    <div>
      <h2>Finance List</h2>
      <ul>
        {finances.map((f) => (
          <li key={f._id}>
            {f.date} - {f.category.name} - ${f.amount} - {f.description}
            <button onClick={() => handleDelete(f._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FinanceList;
