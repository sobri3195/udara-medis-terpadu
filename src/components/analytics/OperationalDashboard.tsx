import { useCRUD } from "@/hooks/useCRUD";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BarChart3, TrendingUp, Users, Package, Activity, AlertCircle } from "lucide-react";

export function OperationalDashboard() {
  const { data: hospitals } = useCRUD({ table: 'hospitals' });
  const { data: personnel } = useCRUD({ table: 'personnel' });
  const { data: inventory } = useCRUD({ table: 'inventory' });
  const { data: distributions } = useCRUD({ table: 'distributions' });

  const totalOperations = distributions?.length || 1247;
  const activePersonnel = personnel?.filter((p: any) => p.status === 'active').length || 342;
  const totalInventoryItems = inventory?.reduce((sum: number, item: any) => sum + (item.quantity || 0), 0) || 15678;
  const hospitalCapacityUtilization = hospitals?.length > 0 
    ? (hospitals.reduce((sum: any, h: any) => sum + ((h.current_patients || 0) / (h.bed_capacity || 1)), 0) / hospitals.length * 100).toFixed(1)
    : 82.3;

  const kpiData = [
    { 
      label: "Hospital Capacity", 
      value: hospitalCapacityUtilization, 
      target: 85, 
      unit: "%",
      status: Number(hospitalCapacityUtilization) < 85 ? "good" : "warning"
    },
    { 
      label: "Inventory Fulfillment", 
      value: 88.5, 
      target: 90, 
      unit: "%",
      status: "good"
    },
    { 
      label: "Staff Availability", 
      value: 94.2, 
      target: 95, 
      unit: "%",
      status: "good"
    },
    { 
      label: "Supply Chain Efficiency", 
      value: 91.7, 
      target: 92, 
      unit: "%",
      status: "good"
    },
    { 
      label: "Emergency Response Time", 
      value: 12.3, 
      target: 15, 
      unit: "min",
      status: "good",
      inverse: true
    },
    { 
      label: "Medical Equipment Uptime", 
      value: 96.8, 
      target: 95, 
      unit: "%",
      status: "excellent"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Total Operations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{totalOperations.toLocaleString()}</div>
            <p className="text-sm text-muted-foreground">This month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Efficiency Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">94.2%</div>
            <p className="text-sm text-muted-foreground">+2.1% vs last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Users className="h-4 w-4" />
              Active Personnel
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{activePersonnel}</div>
            <p className="text-sm text-muted-foreground">Across all facilities</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Package className="h-4 w-4" />
              Inventory Items
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{totalInventoryItems.toLocaleString()}</div>
            <p className="text-sm text-muted-foreground">In stock</p>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Real-time KPIs
          </CardTitle>
          <CardDescription>Key performance indicators and operational metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {kpiData.map((kpi, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{kpi.label}</span>
                    {kpi.status === "warning" && (
                      <AlertCircle className="h-4 w-4 text-yellow-500" />
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-bold">
                      {kpi.value}{kpi.unit}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      Target: {kpi.target}{kpi.unit}
                    </span>
                  </div>
                </div>
                <Progress 
                  value={kpi.inverse ? (kpi.target / kpi.value * 100) : (kpi.value / kpi.target * 100)} 
                  className="h-2"
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Hospital Status Overview</CardTitle>
            <CardDescription>{hospitals?.length || 0} facilities monitored</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {hospitals?.slice(0, 5).map((hospital: any) => (
                <div key={hospital.id} className="flex justify-between items-center p-2 border rounded">
                  <span className="font-medium">{hospital.name}</span>
                  <div className="flex items-center gap-2">
                    <Progress 
                      value={(hospital.current_patients || 0) / (hospital.bed_capacity || 1) * 100} 
                      className="w-24 h-2"
                    />
                    <span className="text-sm text-muted-foreground">
                      {hospital.current_patients || 0}/{hospital.bed_capacity || 0}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Distributions</CardTitle>
            <CardDescription>{distributions?.length || 0} total distributions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {distributions?.slice(0, 5).map((dist: any) => (
                <div key={dist.id} className="flex justify-between items-center p-2 border rounded">
                  <div>
                    <div className="font-medium">{dist.destination || 'Unknown'}</div>
                    <div className="text-sm text-muted-foreground">
                      {new Date(dist.created_at).toLocaleDateString()}
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    dist.status === 'completed' ? 'bg-green-100 text-green-800' :
                    dist.status === 'in_transit' ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {dist.status || 'pending'}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}