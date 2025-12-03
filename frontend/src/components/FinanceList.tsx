import React from "react";
import { deleteFinance } from "../api/finance";
import type { Finance } from "../types/types";

const FinanceList = ({
  finances,
  onDelete,
}: {
  finances: Finance[];
  onDelete: () => void;
}) => {
  const handleDelete = async (id: string) => {
    await deleteFinance(id);
    onDelete();
  };

  return (
    <div>
      <h2>Finance List</h2>
      <ul>
        {finances.map((f) => (
          <li key={f._id}>
            {f.date} - {f.category?.name} - ${f.amount} - {f.description}
            <button onClick={() => handleDelete(f._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FinanceList;
