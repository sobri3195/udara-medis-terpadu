import { useState } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SmartInventoryForecasting } from "@/components/logistics/SmartInventoryForecasting";
import { ColdChainManagement } from "@/components/logistics/ColdChainManagement";
import { MultiHospitalNetwork } from "@/components/logistics/MultiHospitalNetwork";
import { VendorManagement } from "@/components/logistics/VendorManagement";
import { Brain, Thermometer, Network, Users } from "lucide-react";

export default function AdvancedLogistics() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 ml-64 p-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Advanced Logistics</h1>
              <p className="text-gray-600 mt-2">
                AI-powered logistics management for TNI AU medical facilities
              </p>
            </div>

            <Tabs defaultValue="forecasting" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="forecasting" className="flex items-center gap-2">
                  <Brain className="h-4 w-4" />
                  Smart Forecasting
                </TabsTrigger>
                <TabsTrigger value="coldchain" className="flex items-center gap-2">
                  <Thermometer className="h-4 w-4" />
                  Cold Chain
                </TabsTrigger>
                <TabsTrigger value="network" className="flex items-center gap-2">
                  <Network className="h-4 w-4" />
                  Supply Network
                </TabsTrigger>
                <TabsTrigger value="vendors" className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Vendors
                </TabsTrigger>
              </TabsList>

              <TabsContent value="forecasting" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Brain className="h-5 w-5 text-blue-600" />
                      Smart Inventory Forecasting
                    </CardTitle>
                    <CardDescription>
                      AI-powered demand prediction and automatic reorder points
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <SmartInventoryForecasting />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="coldchain" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Thermometer className="h-5 w-5 text-red-600" />
                      Cold Chain Management
                    </CardTitle>
                    <CardDescription>
                      Temperature monitoring for vaccines and medicines with alert systems
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ColdChainManagement />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="network" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Network className="h-5 w-5 text-green-600" />
                      Multi-Hospital Supply Network
                    </CardTitle>
                    <CardDescription>
                      Inter-hospital resource sharing and emergency stock transfers
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <MultiHospitalNetwork />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="vendors" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-purple-600" />
                      Vendor Management System
                    </CardTitle>
                    <CardDescription>
                      Supplier performance tracking, contract management, and procurement
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <VendorManagement />
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