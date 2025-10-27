
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
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
import EmergencyResponse from "./pages/EmergencyResponse";
import EquipmentMaintenance from "./pages/EquipmentMaintenance";
import Telemedicine from "./pages/Telemedicine";
import BloodBank from "./pages/BloodBank";
import TrainingCertification from "./pages/TrainingCertification";
import ProtectedRoute from "./components/ProtectedRoute";
import ErrorBoundary from "./components/ErrorBoundary";
import { AuthProvider } from "./hooks/useAuth";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/logistics" element={<ProtectedRoute><LogisticsAndInventory /></ProtectedRoute>} />
              <Route path="/military-operations" element={<ProtectedRoute><MilitaryOperations /></ProtectedRoute>} />
              <Route path="/advanced-logistics" element={<ProtectedRoute><AdvancedLogistics /></ProtectedRoute>} />
              <Route path="/medical-services" element={<ProtectedRoute><MedicalServices /></ProtectedRoute>} />
              <Route path="/personnel" element={<ProtectedRoute><Personnel /></ProtectedRoute>} />
              <Route path="/distribution" element={<ProtectedRoute><Distribution /></ProtectedRoute>} />
              <Route path="/schedule" element={<ProtectedRoute><Schedule /></ProtectedRoute>} />
              <Route path="/reports" element={<ProtectedRoute><Reports /></ProtectedRoute>} />
              <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
              <Route path="/quality-compliance" element={<ProtectedRoute><QualityCompliance /></ProtectedRoute>} />
              <Route path="/emergency-response" element={<ProtectedRoute><EmergencyResponse /></ProtectedRoute>} />
              <Route path="/equipment-maintenance" element={<ProtectedRoute><EquipmentMaintenance /></ProtectedRoute>} />
              <Route path="/telemedicine" element={<ProtectedRoute><Telemedicine /></ProtectedRoute>} />
              <Route path="/blood-bank" element={<ProtectedRoute><BloodBank /></ProtectedRoute>} />
              <Route path="/training-certification" element={<ProtectedRoute><TrainingCertification /></ProtectedRoute>} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
