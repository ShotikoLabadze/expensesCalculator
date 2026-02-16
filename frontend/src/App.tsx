import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Dashboard from "./pages/Dashboard";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import { User } from "@/api/finance";

const queryClient = new QueryClient();

const App: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    setToken(savedToken);
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error("Failed to parse user from storage");
      }
    }
    setIsLoading(false);
  }, []);

  const handleLogin = (newToken: string, userData: User) => {
    localStorage.setItem("token", newToken);
    localStorage.setItem("user", JSON.stringify(userData));
    setToken(newToken);
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />

          <Route
            path="/login"
            element={
              token ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <Auth onLogin={handleLogin} defaultTab="login" />
              )
            }
          />
          <Route
            path="/register"
            element={
              token ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <Auth onLogin={handleLogin} defaultTab="signup" />
              )
            }
          />
          <Route
            path="/dashboard"
            element={
              token ? (
                <Dashboard onLogout={handleLogout} user={user} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
