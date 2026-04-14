import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProgressProvider } from "@/contexts/ProgressContext";
import AppLayout from "@/components/AppLayout";
import RequireAuth from "@/components/RequireAuth";
import Index from "./pages/Index";
import MathPage from "./pages/MathPage";
import EnglishPage from "./pages/EnglishPage";
import ProgressPage from "./pages/ProgressPage";
import FullTestPage from "./pages/FullTestPage";
import AuthPage from "./pages/AuthPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <ProgressProvider>
          <BrowserRouter>
            <AppLayout>
              <Routes>
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/reset-password" element={<ResetPasswordPage />} />
                <Route path="/" element={<RequireAuth><Index /></RequireAuth>} />
                <Route path="/math" element={<RequireAuth><MathPage /></RequireAuth>} />
                <Route path="/english" element={<RequireAuth><EnglishPage /></RequireAuth>} />
                <Route path="/progress" element={<RequireAuth><ProgressPage /></RequireAuth>} />
                <Route path="/full-tests" element={<RequireAuth><FullTestPage /></RequireAuth>} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AppLayout>
          </BrowserRouter>
        </ProgressProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
