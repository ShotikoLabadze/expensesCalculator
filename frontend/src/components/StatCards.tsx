import { TrendingUp, TrendingDown, Wallet } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: number;
  type: "income" | "expense" | "balance";
}

const typeStyles = {
  income: {
    bg: "bg-stat-income-bg",
    text: "text-stat-income",
    iconBg: "bg-stat-income/10",
  },
  expense: {
    bg: "bg-stat-expense-bg",
    text: "text-stat-expense",
    iconBg: "bg-stat-expense/10",
  },
  balance: {
    bg: "bg-stat-balance-bg",
    text: "text-stat-balance",
    iconBg: "bg-stat-balance/10",
  },
};

const StatCard: React.FC<StatCardProps> = ({ title, value, type }) => {
  const styles = typeStyles[type];
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getIcon = () => {
    switch (type) {
      case "income":
        return <TrendingUp className={cn("h-6 w-6", styles.text)} />;
      case "expense":
        return <TrendingDown className={cn("h-6 w-6", styles.text)} />;
      case "balance":
        return <Wallet className={cn("h-6 w-6", styles.text)} />;
    }
  };

  return (
    <Card className={cn(
      "rounded-2xl border-0 transition-all duration-200",
      styles.bg
    )}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className={cn("text-2xl font-bold tracking-tight", styles.text)}>
              {formatCurrency(value)}
            </p>
          </div>
          <div className={cn("p-3 rounded-xl", styles.iconBg)}>
            {getIcon()}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

interface StatCardsProps {
  income: number;
  expense: number;
}

const StatCards: React.FC<StatCardsProps> = ({ income, expense }) => {
  const balance = income - expense;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <StatCard
        title="Total Income"
        value={income}
        type="income"
      />
      <StatCard
        title="Total Expense"
        value={expense}
        type="expense"
      />
      <StatCard
        title="Current Balance"
        value={balance}
        type="balance"
      />
    </div>
  );
};

export default StatCards;
