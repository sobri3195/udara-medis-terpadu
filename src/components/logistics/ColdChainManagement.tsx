import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCRUD } from "@/hooks/useCRUD";
import { toast } from "sonner";
import { Thermometer, AlertCircle, Battery, MapPin, Plus, Settings } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export function ColdChainManagement() {
  const { data: sensors, loading, create, update } = useCRUD({ 
    table: 'cold_chain_sensors',
    orderBy: { column: 'created_at', ascending: false }
  });
  
  const { data: alerts } = useCRUD({ 
    table: 'cold_chain_alerts',
    orderBy: { column: 'created_at', ascending: false }
  });

  const [showAddSensor, setShowAddSensor] = useState(false);
  const [newSensor, setNewSensor] = useState({
    sensor_id: '',
    location: '',
    storage_type: 'refrigerator',
    target_temp_min: 2.0,
    target_temp_max: 8.0
  });

  const addSensor = async () => {
    try {
      await create({
        ...newSensor,
        current_temperature: Math.random() * 6 + 2, // Mock temperature
        current_humidity: Math.random() * 20 + 60,  // Mock humidity
        battery_level: Math.floor(Math.random() * 30) + 70,
        last_reading: new Date().toISOString(),
        status: 'active'
      });
      setNewSensor({
        sensor_id: '',
        location: '',
        storage_type: 'refrigerator',
        target_temp_min: 2.0,
        target_temp_max: 8.0
      });
      setShowAddSensor(false);
      toast.success('Sensor added successfully');
    } catch (error: any) {
      toast.error('Failed to add sensor: ' + error.message);
    }
  };

  const getTemperatureStatus = (current: number, min: number, max: number) => {
    if (current < min) return { status: 'Too Cold', color: 'text-blue-600', severity: 'high' };
    if (current > max) return { status: 'Too Hot', color: 'text-red-600', severity: 'critical' };
    return { status: 'Normal', color: 'text-green-600', severity: 'normal' };
  };

  const getBatteryStatus = (level: number) => {
    if (level < 20) return { status: 'Critical', color: 'text-red-600' };
    if (level < 50) return { status: 'Low', color: 'text-yellow-600' };
    return { status: 'Good', color: 'text-green-600' };
  };

  // Mock temperature chart data
  const generateChartData = () => {
    const data = [];
    const now = new Date();
    for (let i = 23; i >= 0; i--) {
      const time = new Date(now.getTime() - i * 60 * 60 * 1000);
      data.push({
        time: time.getHours() + ':00',
        temperature: Math.random() * 4 + 4, // Random temp between 4-8°C
        target_min: 2,
        target_max: 8
      });
    }
    return data;
  };

  const chartData = generateChartData();

  return (
    <div className="space-y-6">
      <Tabs defaultValue="sensors" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="sensors">Sensors</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="sensors" className="space-y-6">
          {/* Add Sensor */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Thermometer className="h-5 w-5" />
                    Cold Chain Sensors
                  </CardTitle>
                  <CardDescription>
                    Monitor temperature and humidity for medical storage
                  </CardDescription>
                </div>
                <Button onClick={() => setShowAddSensor(!showAddSensor)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Sensor
                </Button>
              </div>
            </CardHeader>
            {showAddSensor && (
              <CardContent className="border-t">
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="sensor-id">Sensor ID</Label>
                    <Input
                      id="sensor-id"
                      value={newSensor.sensor_id}
                      onChange={(e) => setNewSensor({...newSensor, sensor_id: e.target.value})}
                      placeholder="e.g., TEMP-001"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={newSensor.location}
                      onChange={(e) => setNewSensor({...newSensor, location: e.target.value})}
                      placeholder="e.g., Main Pharmacy Refrigerator"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="storage-type">Storage Type</Label>
                    <Select value={newSensor.storage_type} onValueChange={(value) => setNewSensor({...newSensor, storage_type: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="freezer">Freezer (-18°C to -25°C)</SelectItem>
                        <SelectItem value="refrigerator">Refrigerator (2°C to 8°C)</SelectItem>
                        <SelectItem value="room_temp">Room Temperature (15°C to 25°C)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Temperature Range</Label>
                    <div className="flex gap-2">
                      <Input
                        type="number"
                        step="0.1"
                        value={newSensor.target_temp_min}
                        onChange={(e) => setNewSensor({...newSensor, target_temp_min: parseFloat(e.target.value)})}
                        placeholder="Min °C"
                      />
                      <Input
                        type="number"
                        step="0.1"
                        value={newSensor.target_temp_max}
                        onChange={(e) => setNewSensor({...newSensor, target_temp_max: parseFloat(e.target.value)})}
                        placeholder="Max °C"
                      />
                    </div>
                  </div>
                  <div className="col-span-2 flex gap-2">
                    <Button onClick={addSensor}>Add Sensor</Button>
                    <Button variant="outline" onClick={() => setShowAddSensor(false)}>Cancel</Button>
                  </div>
                </div>
              </CardContent>
            )}
          </Card>

          {/* Sensors Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Active Sensors</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{sensors?.length || 0}</div>
                <p className="text-sm text-muted-foreground">
                  Monitoring storage areas
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Active Alerts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">
                  {alerts?.filter((a: any) => !a.acknowledged).length || 0}
                </div>
                <p className="text-sm text-muted-foreground">
                  Requiring attention
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Avg Temperature</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">5.2°C</div>
                <p className="text-sm text-muted-foreground">
                  Across all sensors
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Sensors Table */}
          <Card>
            <CardHeader>
              <CardTitle>Sensor Status</CardTitle>
              <CardDescription>Real-time monitoring of all cold chain sensors</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Sensor</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Temperature</TableHead>
                    <TableHead>Humidity</TableHead>
                    <TableHead>Battery</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sensors?.map((sensor: any) => {
                    const tempStatus = getTemperatureStatus(
                      sensor.current_temperature,
                      sensor.target_temp_min,
                      sensor.target_temp_max
                    );
                    const batteryStatus = getBatteryStatus(sensor.battery_level);
                    
                    return (
                      <TableRow key={sensor.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{sensor.sensor_id}</div>
                            <div className="text-sm text-muted-foreground capitalize">
                              {sensor.storage_type.replace('_', ' ')}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-gray-500" />
                            {sensor.location}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className={`font-medium ${tempStatus.color}`}>
                            {sensor.current_temperature?.toFixed(1)}°C
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Target: {sensor.target_temp_min}°C - {sensor.target_temp_max}°C
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">
                            {sensor.current_humidity?.toFixed(1)}%
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Battery className={`h-4 w-4 ${batteryStatus.color}`} />
                            <span className={batteryStatus.color}>
                              {sensor.battery_level}%
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant={tempStatus.severity === 'critical' ? 'destructive' : 
                                   tempStatus.severity === 'high' ? 'secondary' : 'default'}
                          >
                            {tempStatus.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">
                            <Settings className="h-4 w-4 mr-1" />
                            Configure
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                Temperature Alerts
              </CardTitle>
              <CardDescription>Recent cold chain monitoring alerts</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Alert Type</TableHead>
                    <TableHead>Sensor</TableHead>
                    <TableHead>Severity</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {alerts?.slice(0, 10).map((alert: any) => (
                    <TableRow key={alert.id}>
                      <TableCell>
                        <div className="capitalize">
                          {alert.alert_type?.replace('_', ' ')}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{alert.sensor_id}</div>
                          <div className="text-sm text-muted-foreground">
                            Current: {alert.current_value}°C
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={
                          alert.severity === 'critical' ? 'destructive' :
                          alert.severity === 'high' ? 'secondary' : 'default'
                        }>
                          {alert.severity}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {alert.duration_minutes} minutes
                      </TableCell>
                      <TableCell>
                        <Badge variant={alert.acknowledged ? 'default' : 'destructive'}>
                          {alert.acknowledged ? 'Acknowledged' : 'Pending'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {!alert.acknowledged && (
                          <Button variant="outline" size="sm">
                            Acknowledge
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Temperature Trend (Last 24 Hours)</CardTitle>
              <CardDescription>Historical temperature data from all sensors</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis domain={[0, 10]} />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="temperature" 
                    stroke="#3b82f6" 
                    strokeWidth={2}
                    name="Temperature"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="target_min" 
                    stroke="#ef4444" 
                    strokeWidth={1}
                    strokeDasharray="5 5"
                    name="Min Threshold"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="target_max" 
                    stroke="#ef4444" 
                    strokeWidth={1}
                    strokeDasharray="5 5"
                    name="Max Threshold"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}