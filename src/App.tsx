import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProgressProvider } from "@/contexts/ProgressContext";
import AppLayout from "@/components/AppLayout";
import Index from "./pages/Index";
import MathPage from "./pages/MathPage";
import EnglishPage from "./pages/EnglishPage";
import DesmosPage from "./pages/DesmosPage";
import ProgressPage from "./pages/ProgressPage";
import PremiumPage from "./pages/PremiumPage";
import FullTestPage from "./pages/FullTestPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <ProgressProvider>
        <BrowserRouter>
          <AppLayout>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/math" element={<MathPage />} />
              <Route path="/english" element={<EnglishPage />} />
              <Route path="/desmos" element={<DesmosPage />} />
              <Route path="/progress" element={<ProgressPage />} />
              <Route path="/premium" element={<PremiumPage />} />
              <Route path="/full-tests" element={<FullTestPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AppLayout>
        </BrowserRouter>
      </ProgressProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
