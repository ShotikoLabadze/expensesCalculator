import { useEffect, useState } from "react";
import FinanceForm from "../components/FinanceForm";
import FinanceList from "../components/FinanceList";
import { getFinances } from "../api/finance";
import type { Finance } from "../types/types";

const Dashboard = () => {
  const [finances, setFinances] = useState<Finance[]>([]);

  const loadFinances = async () => {
    const data = await getFinances();
    setFinances(data);
  };

  useEffect(() => {
    loadFinances();
  }, []);

  return (
    <div>
      <h1>Finance Dashboard</h1>

      <FinanceForm onAdded={loadFinances} />

      <FinanceList finances={finances} onDelete={loadFinances} />
    </div>
  );
};

export default Dashboard;
