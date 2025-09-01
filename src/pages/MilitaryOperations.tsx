import React, { useState } from 'react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Shield, 
  Plane, 
  MapPin, 
  Package, 
  AlertTriangle, 
  Users, 
  Clock,
  Target,
  Radio,
  Truck
} from 'lucide-react';
import { FieldHospitalManagement } from '@/components/military/FieldHospitalManagement';
import { AirdropCoordination } from '@/components/military/AirdropCoordination';
import { CombatZoneLogistics } from '@/components/military/CombatZoneLogistics';
import { EvacuationKitManagement } from '@/components/military/EvacuationKitManagement';
import { TheaterOperations } from '@/components/military/TheaterOperations';

const MilitaryOperations = () => {
  const [activeOperation, setActiveOperation] = useState<string | null>(null);

  // Mock operational data
  const operationalStatus = {
    activeTheaters: 3,
    fieldHospitals: 12,
    airdropMissions: 8,
    combatZones: 5,
    evacuationKits: 45,
    personnelDeployed: 234
  };

  const urgentMissions = [
    {
      id: 1,
      type: 'medical_evacuation',
      location: 'Sector Alpha-7',
      priority: 'critical',
      eta: '15 minutes',
      status: 'in_progress'
    },
    {
      id: 2,
      type: 'supply_airdrop',
      location: 'Forward Base Charlie',
      priority: 'high',
      eta: '2 hours',
      status: 'scheduled'
    },
    {
      id: 3,
      type: 'field_hospital_setup',
      location: 'Zone Delta-3',
      priority: 'medium',
      eta: '6 hours',
      status: 'planning'
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      default: return 'bg-green-500';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in_progress': return 'bg-blue-500';
      case 'scheduled': return 'bg-purple-500';
      case 'planning': return 'bg-gray-500';
      default: return 'bg-green-500';
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-auto bg-gray-50 p-4">
          <div className="max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="mb-6">
              <h1 className="text-2xl font-bold mb-1 flex items-center gap-2">
                <Shield className="h-6 w-6 text-blue-600" />
                Operasi Militer TNI AU
              </h1>
              <p className="text-muted-foreground">
                Komando dan koordinasi operasi medis militer
              </p>
            </div>

            {/* Operational Status Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
              <Card>
                <CardContent className="p-4 flex items-center">
                  <div className="p-2 bg-blue-100 rounded-md mr-3">
                    <Target className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500">Theater Aktif</p>
                    <p className="text-lg font-semibold">{operationalStatus.activeTheaters}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 flex items-center">
                  <div className="p-2 bg-green-100 rounded-md mr-3">
                    <MapPin className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500">RS Lapangan</p>
                    <p className="text-lg font-semibold">{operationalStatus.fieldHospitals}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 flex items-center">
                  <div className="p-2 bg-purple-100 rounded-md mr-3">
                    <Plane className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500">Misi Airdrop</p>
                    <p className="text-lg font-semibold">{operationalStatus.airdropMissions}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 flex items-center">
                  <div className="p-2 bg-red-100 rounded-md mr-3">
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500">Zone Tempur</p>
                    <p className="text-lg font-semibold">{operationalStatus.combatZones}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 flex items-center">
                  <div className="p-2 bg-orange-100 rounded-md mr-3">
                    <Package className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500">Kit Evakuasi</p>
                    <p className="text-lg font-semibold">{operationalStatus.evacuationKits}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 flex items-center">
                  <div className="p-2 bg-teal-100 rounded-md mr-3">
                    <Users className="h-5 w-5 text-teal-600" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500">Personel</p>
                    <p className="text-lg font-semibold">{operationalStatus.personnelDeployed}</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Main Operations Panel - 3/4 width */}
              <div className="lg:col-span-3">
                <Card>
                  <CardHeader>
                    <CardTitle>Panel Operasi Militer</CardTitle>
                    <CardDescription>
                      Manajemen operasi medis militer terintegrasi
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="field-hospitals" className="w-full">
                      <TabsList className="grid w-full grid-cols-5">
                        <TabsTrigger value="field-hospitals">RS Lapangan</TabsTrigger>
                        <TabsTrigger value="airdrop">Airdrop</TabsTrigger>
                        <TabsTrigger value="combat-zone">Zone Tempur</TabsTrigger>
                        <TabsTrigger value="evacuation">Evakuasi</TabsTrigger>
                        <TabsTrigger value="theater">Theater</TabsTrigger>
                      </TabsList>

                      <TabsContent value="field-hospitals" className="mt-4">
                        <FieldHospitalManagement />
                      </TabsContent>

                      <TabsContent value="airdrop" className="mt-4">
                        <AirdropCoordination />
                      </TabsContent>

                      <TabsContent value="combat-zone" className="mt-4">
                        <CombatZoneLogistics />
                      </TabsContent>

                      <TabsContent value="evacuation" className="mt-4">
                        <EvacuationKitManagement />
                      </TabsContent>

                      <TabsContent value="theater" className="mt-4">
                        <TheaterOperations />
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </div>

              {/* Urgent Missions Panel - 1/4 width */}
              <div className="lg:col-span-1">
                <Card className="h-full">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-red-500" />
                      Misi Mendesak
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="space-y-3 p-4">
                      {urgentMissions.map((mission) => (
                        <div key={mission.id} className="border rounded-lg p-3 hover:bg-gray-50">
                          <div className="flex justify-between items-start mb-2">
                            <Badge className={`text-xs ${getPriorityColor(mission.priority)}`}>
                              {mission.priority.toUpperCase()}
                            </Badge>
                            <Badge variant="outline" className={`text-xs ${getStatusColor(mission.status)}`}>
                              {mission.status.replace('_', ' ')}
                            </Badge>
                          </div>
                          <h4 className="font-medium text-sm mb-1">
                            {mission.type.replace('_', ' ').toUpperCase()}
                          </h4>
                          <p className="text-xs text-gray-600 mb-2 flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {mission.location}
                          </p>
                          <p className="text-xs text-gray-500 flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            ETA: {mission.eta}
                          </p>
                          <Button size="sm" variant="outline" className="w-full mt-2 h-7 text-xs">
                            Detail Misi
                          </Button>
                        </div>
                      ))}
                    </div>

                    <div className="border-t p-4">
                      <Button variant="outline" className="w-full">
                        <Radio className="h-4 w-4 mr-2" />
                        Pusat Komando
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default MilitaryOperations;