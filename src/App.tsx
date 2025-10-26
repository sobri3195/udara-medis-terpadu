
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import LogisticsAndInventory from "./pages/LogisticsAndInventory";
import AdvancedLogistics from "./pages/AdvancedLogistics";
import MedicalServices from "./pages/MedicalServices";
import Personnel from "./pages/Personnel";
import Distribution from "./pages/Distribution";
import Schedule from "./pages/Schedule";
import Reports from "./pages/Reports";
import Analytics from "./pages/Analytics";
import QualityCompliance from "./pages/QualityCompliance";
import MilitaryOperations from "./pages/MilitaryOperations";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/logistics" element={<LogisticsAndInventory />} />
          <Route path="/military-operations" element={<MilitaryOperations />} />
          <Route path="/advanced-logistics" element={<AdvancedLogistics />} />
          <Route path="/medical-services" element={<MedicalServices />} />
          <Route path="/personnel" element={<Personnel />} />
          <Route path="/distribution" element={<Distribution />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/quality-compliance" element={<QualityCompliance />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
