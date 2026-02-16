import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "@/api/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, CreditCard } from "lucide-react";
import { cn } from "@/lib/utils";
import { User } from "@/api/finance";

interface AuthProps {
  onLogin: (token: string, user: User) => void;
  defaultTab?: "login" | "signup";
}

const Auth: React.FC<AuthProps> = ({ onLogin, defaultTab = "login" }) => {
  const [activeTab, setActiveTab] = useState<"login" | "signup">(defaultTab);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let data;
      if (activeTab === "login") {
        data = await loginUser(email, password);
      } else {
        data = await registerUser(username, email, password);
      }

      if (data.token && data.user) {
        onLogin(data.token, data.user);

        toast({
          title: activeTab === "login" ? "Welcome back!" : "Account created!",
          description:
            activeTab === "login"
              ? "You have successfully logged in."
              : "Welcome to FinanceFlow.",
        });
        navigate("/dashboard");
      }
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: activeTab === "login" ? "Login failed" : "Registration failed",
        description:
          err.response?.data?.message || err.message || "An error occurred",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setUsername("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md border-0 shadow-lg rounded-2xl">
        <CardContent className="p-8">
          <div className="flex flex-col items-center mb-8">
            <div className="p-3 rounded-xl bg-foreground mb-4">
              <CreditCard className="h-6 w-6 text-background" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">
              Finance Calculator
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage your finances with ease
            </p>
          </div>

          <div className="flex bg-muted rounded-xl p-1 mb-6">
            <button
              type="button"
              onClick={() => {
                setActiveTab("login");
                resetForm();
              }}
              className={cn(
                "flex-1 py-2.5 text-sm font-medium rounded-lg transition-all duration-200",
                activeTab === "login"
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab("signup");
                resetForm();
              }}
              className={cn(
                "flex-1 py-2.5 text-sm font-medium rounded-lg transition-all duration-200",
                activeTab === "signup"
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {activeTab === "signup" && (
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="johndoe"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="h-12 rounded-xl border-border"
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-12 rounded-xl border-border"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-12 rounded-xl border-border"
              />
            </div>

            <Button
              type="submit"
              className="w-full h-12 rounded-xl font-medium bg-foreground text-background hover:bg-foreground/90"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {activeTab === "login"
                    ? "Signing in..."
                    : "Creating account..."}
                </>
              ) : activeTab === "login" ? (
                "Login"
              ) : (
                "Sign Up"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
