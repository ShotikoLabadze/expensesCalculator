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
      <h2>Transactions</h2>
      <ul>
        <li>
          <strong>Date</strong>
          <strong>Type</strong>
          <strong>Amount</strong>
          <strong>Description</strong>
          <span>Action</span>
        </li>
        {finances.map((f) => (
          <li key={f._id}>
            <span>{new Date(f.date).toLocaleDateString()}</span>
            <span className={f.type === "income" ? "income" : "expense"}>
              {f.type.toUpperCase()}
            </span>
            <span>${f.amount.toLocaleString()}</span>
            <span>{f.description || "-"}</span>
            <button onClick={() => handleDelete(f._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FinanceList;
