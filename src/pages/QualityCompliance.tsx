import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { QualityAudits } from "@/components/quality/QualityAudits";
import { IncidentReporting } from "@/components/quality/IncidentReporting";
import { DrugSafetyMonitoring } from "@/components/quality/DrugSafetyMonitoring";
import { Shield, AlertTriangle, Pill } from "lucide-react";

export default function QualityCompliance() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 ml-64 p-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Quality & Compliance</h1>
              <p className="text-gray-600 mt-2">
                Comprehensive quality assurance and compliance management
              </p>
            </div>

            <Tabs defaultValue="audits" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="audits" className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Quality Audits
                </TabsTrigger>
                <TabsTrigger value="incidents" className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4" />
                  Incident Reports
                </TabsTrigger>
                <TabsTrigger value="drug-safety" className="flex items-center gap-2">
                  <Pill className="h-4 w-4" />
                  Drug Safety
                </TabsTrigger>
              </TabsList>

              <TabsContent value="audits" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-blue-600" />
                      Quality Assurance Module
                    </CardTitle>
                    <CardDescription>
                      Audit trails, compliance monitoring, and accreditation tracking
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <QualityAudits />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="incidents" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-red-600" />
                      Incident Reporting System
                    </CardTitle>
                    <CardDescription>
                      Safety incidents, root cause analysis, and corrective actions
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <IncidentReporting />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="drug-safety" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Pill className="h-5 w-5 text-green-600" />
                      Drug Safety Monitoring
                    </CardTitle>
                    <CardDescription>
                      Adverse event tracking, pharmacovigilance, and drug interactions
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <DrugSafetyMonitoring />
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