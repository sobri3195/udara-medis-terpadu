import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PredictiveAnalytics } from "@/components/analytics/PredictiveAnalytics";
import { OperationalDashboard } from "@/components/analytics/OperationalDashboard";
import { CostManagement } from "@/components/analytics/CostManagement";
import { ExternalIntegration } from "@/components/analytics/ExternalIntegration";
import { TrendingUp, BarChart3, DollarSign, Globe } from "lucide-react";

export default function Analytics() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 ml-64 p-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Analytics & Intelligence</h1>
              <p className="text-gray-600 mt-2">
                Advanced analytics, predictive insights, and external system integration
              </p>
            </div>

            <Tabs defaultValue="predictive" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="predictive" className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Predictive Analytics
                </TabsTrigger>
                <TabsTrigger value="dashboard" className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  Operations Dashboard
                </TabsTrigger>
                <TabsTrigger value="cost" className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  Cost Management
                </TabsTrigger>
                <TabsTrigger value="integration" className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  External Integration
                </TabsTrigger>
              </TabsList>

              <TabsContent value="predictive" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-blue-600" />
                      Predictive Health Analytics
                    </CardTitle>
                    <CardDescription>
                      Disease outbreak prediction and resource demand forecasting
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <PredictiveAnalytics />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="dashboard" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5 text-green-600" />
                      Operational Dashboard
                    </CardTitle>
                    <CardDescription>
                      Real-time KPIs, performance metrics, and decision support
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <OperationalDashboard />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="cost" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <DollarSign className="h-5 w-5 text-yellow-600" />
                      Cost Management System
                    </CardTitle>
                    <CardDescription>
                      Budget tracking, expense analysis, and financial reporting
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <CostManagement />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="integration" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Globe className="h-5 w-5 text-purple-600" />
                      External System Integration
                    </CardTitle>
                    <CardDescription>
                      Hospital networks, MOH systems, insurance providers
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ExternalIntegration />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
}