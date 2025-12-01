import FinanceForm from "../components/FinanceForm";
import FinanceList from "../components/FinanceList";

const Dashboard = () => {
  return (
    <div>
      <h1>Finance Dashboard</h1>
      <FinanceForm />
      <FinanceList />
    </div>
  );
};

export default Dashboard;
