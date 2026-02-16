import {
  TrendingUp,
  TrendingDown,
  Trash2,
  Wallet,
  Receipt,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import type { Finance } from "@/types/finance";

interface TransactionFeedProps {
  finances: Finance[];
  onDelete: (id: string) => void;
  isDeleting: string | null;
}

const TransactionFeed: React.FC<TransactionFeedProps> = ({
  finances,
  onDelete,
  isDeleting,
}) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };

  const sortedFinances = [...finances].sort((a, b) => {
    const dateA = new Date(a.date || 0);
    const dateB = new Date(b.date || 0);
    return dateB.getTime() - dateA.getTime();
  });

  return (
    <Card className="rounded-2xl border-0 shadow-card bg-card">
      <CardHeader className="pb-4 px-6 pt-6">
        <div className="flex items-center gap-2">
          <Receipt className="h-5 w-5 text-muted-foreground" />
          <CardTitle className="text-lg font-semibold">
            Recent Transactions
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="pt-0 px-6 pb-6">
        {finances.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="p-4 rounded-full bg-muted mb-4">
              <Wallet className="h-8 w-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground font-medium">
              No transactions yet
            </p>
          </div>
        ) : (
          <ScrollArea className="h-[400px]">
            <div className="space-y-1">
              {sortedFinances.map((finance, index) => (
                <div
                  key={finance._id}
                  className={cn(
                    "flex items-center justify-between py-4 transition-all duration-200 group",
                    index !== sortedFinances.length - 1 &&
                      "border-b border-border/50",
                  )}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={cn(
                        "p-2.5 rounded-xl",
                        finance.type === "income"
                          ? "bg-stat-income-bg"
                          : "bg-stat-expense-bg",
                      )}
                    >
                      {finance.type === "income" ? (
                        <TrendingUp className="h-5 w-5 text-stat-income" />
                      ) : (
                        <TrendingDown className="h-5 w-5 text-stat-expense" />
                      )}
                    </div>

                    <div className="flex flex-col">
                      <p className="font-medium text-foreground leading-none">
                        {finance.description || "Untitled Transaction"}
                      </p>
                      <p className="text-[11px] text-muted-foreground/70 mt-1.5">
                        {formatDate(finance.date)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span
                      className={cn(
                        "font-semibold",
                        finance.type === "income"
                          ? "text-stat-income"
                          : "text-stat-expense",
                      )}
                    >
                      {finance.type === "income" ? "+" : "-"}
                      {formatCurrency(finance.amount)}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-lg text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => onDelete(finance._id)}
                      disabled={isDeleting === finance._id}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
};

export default TransactionFeed;
