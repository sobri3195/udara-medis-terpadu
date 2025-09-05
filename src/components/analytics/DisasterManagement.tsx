import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertTriangle, Shield, Truck, MapPin, Users, Clock, Siren } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

interface DisasterAlert {
  alert_id: string;
  disaster_type: string;
  severity: string;
  affected_regions: string[];
  estimated_casualties: number;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  alert_time: string;
}

interface ActiveDisaster {
  id: string;
  incident_number: string;
  incident_type: string;
  severity: string;
  location: string;
  description: string;
  incident_date: string;
  investigation_status: string;
}

const DisasterManagement = () => {
  const [loading, setLoading] = useState(false);
  const [activeDisasters, setActiveDisasters] = useState<ActiveDisaster[]>([]);
  const [simulationData, setSimulationData] = useState({
    disaster_type: 'earthquake',
    severity: 'high',
    affected_regions: 'Jakarta Selatan, Bogor',
    estimated_casualties: 150,
    latitude: -6.2088,
    longitude: 106.8456
  });
  const { toast } = useToast();

  const simulateDisasterAlert = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('disaster-management-integration', {
        body: { 
          action: 'receive_bnpb_alert',
          ...simulationData,
          affected_regions: simulationData.affected_regions.split(',').map(r => r.trim())
        }
      });

      if (error) throw error;

      toast({
        title: "Alert BNPB Diterima",
        description: `Protokol darurat untuk ${simulationData.disaster_type} telah diaktivasi`
      });

      loadActiveDisasters();
    } catch (error) {
      console.error('Disaster alert error:', error);
      toast({
        title: "Error",
        description: "Gagal memproses alert bencana",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const createEmergencyResponse = async (alertId: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('disaster-management-integration', {
        body: { 
          action: 'create_emergency_response',
          alert_id: alertId
        }
      });

      if (error) throw error;

      toast({
        title: "Respons Darurat Dibuat",
        description: "Rencana deployment unit medis telah disiapkan"
      });
    } catch (error) {
      console.error('Emergency response error:', error);
      toast({
        title: "Error",
        description: "Gagal membuat rencana respons darurat",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const loadActiveDisasters = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('disaster-management-integration', {
        body: { action: 'get_active_disasters' }
      });

      if (error) throw error;
      setActiveDisasters(data.active_disasters);
    } catch (error) {
      console.error('Load disasters error:', error);
    }
  };

  useEffect(() => {
    loadActiveDisasters();
  }, []);

  const getSeverityBadge = (severity: string) => {
    const variants = {
      low: 'default' as const,
      medium: 'secondary' as const,
      high: 'destructive' as const,
      critical: 'destructive' as const
    };
    return <Badge variant={variants[severity as keyof typeof variants] || 'default'}>{severity.toUpperCase()}</Badge>;
  };

  const getDisasterIcon = (type: string) => {
    if (type.includes('earthquake')) return <AlertTriangle className="h-4 w-4 text-red-500" />;
    if (type.includes('flood')) return <Shield className="h-4 w-4 text-blue-500" />;
    return <Siren className="h-4 w-4 text-orange-500" />;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Integrasi Manajemen Bencana BNPB
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Sistem terintegrasi dengan BNPB untuk respons cepat terhadap bencana alam
            </AlertDescription>
          </Alert>

          {/* Disaster Simulation Form */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Simulasi Alert Bencana</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="disaster_type">Jenis Bencana</Label>
                  <Select 
                    value={simulationData.disaster_type} 
                    onValueChange={(value) => setSimulationData(prev => ({ ...prev, disaster_type: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="earthquake">Gempa Bumi</SelectItem>
                      <SelectItem value="flood">Banjir</SelectItem>
                      <SelectItem value="tsunami">Tsunami</SelectItem>
                      <SelectItem value="volcanic">Letusan Gunung Api</SelectItem>
                      <SelectItem value="landslide">Tanah Longsor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="severity">Tingkat Keparahan</Label>
                  <Select 
                    value={simulationData.severity} 
                    onValueChange={(value) => setSimulationData(prev => ({ ...prev, severity: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Rendah</SelectItem>
                      <SelectItem value="medium">Sedang</SelectItem>
                      <SelectItem value="high">Tinggi</SelectItem>
                      <SelectItem value="critical">Kritis</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="affected_regions">Wilayah Terdampak</Label>
                  <Input
                    value={simulationData.affected_regions}
                    onChange={(e) => setSimulationData(prev => ({ ...prev, affected_regions: e.target.value }))}
                    placeholder="Jakarta Selatan, Bogor"
                  />
                </div>

                <div>
                  <Label htmlFor="estimated_casualties">Estimasi Korban</Label>
                  <Input
                    type="number"
                    value={simulationData.estimated_casualties}
                    onChange={(e) => setSimulationData(prev => ({ ...prev, estimated_casualties: Number(e.target.value) }))}
                  />
                </div>

                <div>
                  <Label htmlFor="latitude">Latitude</Label>
                  <Input
                    type="number"
                    step="0.0001"
                    value={simulationData.latitude}
                    onChange={(e) => setSimulationData(prev => ({ ...prev, latitude: Number(e.target.value) }))}
                  />
                </div>

                <div>
                  <Label htmlFor="longitude">Longitude</Label>
                  <Input
                    type="number"
                    step="0.0001"
                    value={simulationData.longitude}
                    onChange={(e) => setSimulationData(prev => ({ ...prev, longitude: Number(e.target.value) }))}
                  />
                </div>
              </div>

              <Button onClick={simulateDisasterAlert} disabled={loading} className="w-full">
                <Siren className="h-4 w-4 mr-2" />
                Simulasi Alert BNPB
              </Button>
            </CardContent>
          </Card>

          {/* Active Disasters Table */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Bencana Aktif
              </CardTitle>
            </CardHeader>
            <CardContent>
              {activeDisasters.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>No. Insiden</TableHead>
                      <TableHead>Jenis</TableHead>
                      <TableHead>Lokasi</TableHead>
                      <TableHead>Keparahan</TableHead>
                      <TableHead>Tanggal</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {activeDisasters.map((disaster) => (
                      <TableRow key={disaster.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            {getDisasterIcon(disaster.incident_type)}
                            {disaster.incident_number}
                          </div>
                        </TableCell>
                        <TableCell>
                          {disaster.incident_type.replace('disaster_', '').toUpperCase()}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3 text-gray-500" />
                            {disaster.location}
                          </div>
                        </TableCell>
                        <TableCell>{getSeverityBadge(disaster.severity)}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3 text-gray-500" />
                            {new Date(disaster.incident_date).toLocaleDateString('id-ID')}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={disaster.investigation_status === 'open' ? 'destructive' : 'default'}>
                            {disaster.investigation_status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button 
                            size="sm" 
                            onClick={() => createEmergencyResponse(disaster.incident_number)}
                            disabled={loading}
                          >
                            <Truck className="h-3 w-3 mr-1" />
                            Deploy
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-8">
                  <Shield className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-muted-foreground">Tidak ada bencana aktif saat ini</p>
                </div>
              )}
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};

export default DisasterManagement;