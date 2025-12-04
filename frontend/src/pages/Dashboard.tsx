import { useEffect, useState } from "react";
import FinanceForm from "../components/FinanceForm";
import FinanceList from "../components/FinanceList";
import { getFinances, monthlySummary } from "../api/finance";
import type { Finance } from "../types/types";
import "../styles/dashboard.css";

const Dashboard = ({ onLogout }: { onLogout: () => void }) => {
  const [finances, setFinances] = useState<Finance[]>([]);
  const [income, setIncome] = useState<number>(0);
  const [expense, setExpense] = useState<number>(0);

  const loadFinances = async () => {
    const data = await getFinances();
    setFinances(data);

    const today = new Date();
    const summary = await monthlySummary(
      today.getMonth() + 1,
      today.getFullYear()
    );
    setIncome(summary.income);
    setExpense(summary.expense);
  };

  useEffect(() => {
    loadFinances();
  }, []);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Personal Finance Dashboard</h1>
        <button className="logout-btn" onClick={onLogout}>
          Logout
        </button>
      </div>

      <div className="summary">
        <div className="card income">
          <h3>Income</h3>
          <p>${income}</p>
        </div>
        <div className="card expense">
          <h3>Expense</h3>
          <p>${expense}</p>
        </div>
        <div className="card balance">
          <h3>Balance</h3>
          <p>${income - expense}</p>
        </div>
      </div>

      <div className="finance-form">
        <FinanceForm onAdded={loadFinances} />
      </div>

      <div className="transactions">
        <FinanceList finances={finances} onDelete={loadFinances} />
      </div>
    </div>
  );
};

export default Dashboard;
