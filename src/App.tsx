import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import Overview from "./pages/Overview";
import SectorRiskAnalysis from "./pages/SectorRiskAnalysis";
import RiskMetrics from "./pages/RiskMetrics";
import CompanyComparison from "./pages/CompanyComparison";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout><Overview /></AppLayout>} />
          <Route path="/sector-risk" element={<AppLayout><SectorRiskAnalysis /></AppLayout>} />
          <Route path="/risk-metrics" element={<AppLayout><RiskMetrics /></AppLayout>} />
          <Route path="/company-comparison" element={<AppLayout><CompanyComparison /></AppLayout>} />
          <Route path="/portfolio" element={<AppLayout><Overview /></AppLayout>} />
          <Route path="/settings" element={<AppLayout><Overview /></AppLayout>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
