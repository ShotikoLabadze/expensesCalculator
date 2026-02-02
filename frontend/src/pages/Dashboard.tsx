import { useEffect, useState } from "react";
import { Bell, User, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import StatCards from "@/components/StatCards";
import TransactionFeed from "@/components/TransactionFeed";
import NewTransactionSheet from "@/components/NewTransactionSheet";
import { getFinances, getMonthlySummary, deleteFinance } from "@/api/finance";
import type { Finance } from "@/types/finance";

interface DashboardProps {
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  const [finances, setFinances] = useState<Finance[]>([]);
  const [income, setIncome] = useState<number>(0);
  const [expense, setExpense] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const { toast } = useToast();

  const loadFinances = async () => {
    try {
      const [financesData, today] = await Promise.all([
        getFinances(),
        Promise.resolve(new Date()),
      ]);

      setFinances(financesData);

      const summary = await getMonthlySummary(
        today.getMonth() + 1,
        today.getFullYear(),
      );
      setIncome(summary.income);
      setExpense(summary.expense);
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: "Failed to load data",
        description:
          err.response?.data?.message || err.message || "An error occurred",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      await deleteFinance(id);
      toast({
        title: "Transaction deleted",
        description: "The transaction has been removed successfully.",
      });
      loadFinances();
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: "Failed to delete",
        description:
          err.response?.data?.message || err.message || "An error occurred",
      });
    } finally {
      setDeletingId(null);
    }
  };

  const handleLogout = () => {
    onLogout();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  useEffect(() => {
    loadFinances();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-foreground">
              <CreditCard className="h-5 w-5 text-background" />
            </div>
            <span className="text-lg font-semibold">FinanceCalculator</span>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="rounded-lg">
              <Bell className="h-5 w-5 text-muted-foreground" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center gap-2 rounded-lg px-3"
                >
                  <div className="p-1.5 rounded-full bg-muted">
                    <User className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <span className="font-medium">John Doe</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="cursor-pointer"
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8 space-y-8">
        <section className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground">
              Track your income and expenses
            </p>
          </div>
          <NewTransactionSheet onAdded={loadFinances} />
        </section>

        <section>
          <StatCards income={income} expense={expense} />
        </section>

        <section>
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : (
            <TransactionFeed
              finances={finances}
              onDelete={handleDelete}
              isDeleting={deletingId}
            />
          )}
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
