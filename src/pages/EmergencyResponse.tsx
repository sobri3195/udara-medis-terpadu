import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import { Ambulance, AlertTriangle, Phone, MapPin, Clock, Activity } from 'lucide-react';
import { toast } from 'sonner';
import { useCRUD } from '@/hooks/useCRUD';

interface EmergencyCase {
  id: string;
  case_number: string;
  caller_name: string;
  caller_phone: string;
  location: string;
  emergency_type: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'pending' | 'dispatched' | 'on-scene' | 'resolved' | 'cancelled';
  description: string;
  ambulance_assigned?: string;
  response_time_minutes?: number;
  created_at: string;
  resolved_at?: string;
}

const EmergencyResponse = () => {
  const { data: cases = [], create, update, remove } = useCRUD<EmergencyCase>('emergency_cases');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    caller_name: '',
    caller_phone: '',
    location: '',
    emergency_type: 'medical',
    severity: 'medium',
    description: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const caseNumber = `EMG-${Date.now()}`;
      await create({
        ...formData,
        case_number: caseNumber,
        status: 'pending',
        created_at: new Date().toISOString(),
      });
      toast.success('Kasus darurat berhasil dicatat');
      setIsFormOpen(false);
      setFormData({
        caller_name: '',
        caller_phone: '',
        location: '',
        emergency_type: 'medical',
        severity: 'medium',
        description: '',
      });
    } catch (error) {
      toast.error('Gagal mencatat kasus darurat');
    }
  };

  const handleDispatch = async (caseId: string, ambulanceId: string) => {
    try {
      await update(caseId, {
        status: 'dispatched',
        ambulance_assigned: ambulanceId,
      });
      toast.success('Ambulans berhasil dikirim');
    } catch (error) {
      toast.error('Gagal mengirim ambulans');
    }
  };

  const handleResolve = async (caseId: string) => {
    try {
      await update(caseId, {
        status: 'resolved',
        resolved_at: new Date().toISOString(),
      });
      toast.success('Kasus berhasil diselesaikan');
    } catch (error) {
      toast.error('Gagal menyelesaikan kasus');
    }
  };

  const getSeverityBadge = (severity: string) => {
    const variants: Record<string, string> = {
      low: 'bg-blue-500',
      medium: 'bg-yellow-500',
      high: 'bg-orange-500',
      critical: 'bg-red-500',
    };
    return <Badge className={variants[severity]}>{severity.toUpperCase()}</Badge>;
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, string> = {
      pending: 'bg-gray-500',
      dispatched: 'bg-blue-500',
      'on-scene': 'bg-purple-500',
      resolved: 'bg-green-500',
      cancelled: 'bg-red-500',
    };
    return <Badge className={variants[status]}>{status.toUpperCase()}</Badge>;
  };

  const pendingCases = cases.filter((c) => c.status === 'pending' || c.status === 'dispatched');
  const activeCases = cases.filter((c) => c.status === 'on-scene');
  const resolvedCases = cases.filter((c) => c.status === 'resolved');

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-auto bg-gray-50 p-4">
          <div className="max-w-7xl mx-auto">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Respons Darurat</h1>
            <p className="text-gray-500">Manajemen kasus darurat dan ambulans</p>
          </div>
          <Button onClick={() => setIsFormOpen(!isFormOpen)}>
            <AlertTriangle className="mr-2 h-4 w-4" />
            Catat Kasus Darurat
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Kasus Hari Ini</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{cases.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Menunggu</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{pendingCases.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Aktif</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{activeCases.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Selesai</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{resolvedCases.length}</div>
            </CardContent>
          </Card>
        </div>

        {isFormOpen && (
          <Card>
            <CardHeader>
              <CardTitle>Form Kasus Darurat Baru</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="caller_name">Nama Pelapor</Label>
                    <Input
                      id="caller_name"
                      value={formData.caller_name}
                      onChange={(e) => setFormData({ ...formData, caller_name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="caller_phone">No. Telepon</Label>
                    <Input
                      id="caller_phone"
                      value={formData.caller_phone}
                      onChange={(e) => setFormData({ ...formData, caller_phone: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Lokasi</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="emergency_type">Jenis Darurat</Label>
                    <Select
                      value={formData.emergency_type}
                      onValueChange={(value) => setFormData({ ...formData, emergency_type: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="medical">Medis</SelectItem>
                        <SelectItem value="accident">Kecelakaan</SelectItem>
                        <SelectItem value="disaster">Bencana</SelectItem>
                        <SelectItem value="combat">Pertempuran</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="severity">Tingkat Keparahan</Label>
                    <Select
                      value={formData.severity}
                      onValueChange={(value) => setFormData({ ...formData, severity: value })}
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
                  <div className="space-y-2 col-span-2">
                    <Label htmlFor="description">Deskripsi</Label>
                    <Input
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button type="submit">Simpan</Button>
                  <Button type="button" variant="outline" onClick={() => setIsFormOpen(false)}>
                    Batal
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        <Tabs defaultValue="pending" className="w-full">
          <TabsList>
            <TabsTrigger value="pending">Menunggu ({pendingCases.length})</TabsTrigger>
            <TabsTrigger value="active">Aktif ({activeCases.length})</TabsTrigger>
            <TabsTrigger value="resolved">Selesai ({resolvedCases.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="space-y-4">
            {pendingCases.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold">{item.case_number}</h3>
                        {getSeverityBadge(item.severity)}
                        {getStatusBadge(item.status)}
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4" />
                          {item.caller_name} - {item.caller_phone}
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          {item.location}
                        </div>
                        <div className="flex items-center gap-2">
                          <Activity className="h-4 w-4" />
                          {item.emergency_type}
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          {new Date(item.created_at).toLocaleString('id-ID')}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                    <div className="flex gap-2">
                      {item.status === 'pending' && (
                        <Button size="sm" onClick={() => handleDispatch(item.id, 'AMB-001')}>
                          <Ambulance className="mr-2 h-4 w-4" />
                          Kirim Ambulans
                        </Button>
                      )}
                      {item.status === 'dispatched' && (
                        <Button size="sm" onClick={() => handleResolve(item.id)}>
                          Selesaikan
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="active" className="space-y-4">
            {activeCases.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold">{item.case_number}</h3>
                        {getSeverityBadge(item.severity)}
                        {getStatusBadge(item.status)}
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          {item.location}
                        </div>
                        <div className="flex items-center gap-2">
                          <Ambulance className="h-4 w-4" />
                          {item.ambulance_assigned || 'N/A'}
                        </div>
                      </div>
                    </div>
                    <Button size="sm" onClick={() => handleResolve(item.id)}>
                      Selesaikan
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="resolved" className="space-y-4">
            {resolvedCases.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold">{item.case_number}</h3>
                        {getSeverityBadge(item.severity)}
                        {getStatusBadge(item.status)}
                      </div>
                      <div className="text-sm text-gray-600">
                        Diselesaikan: {item.resolved_at ? new Date(item.resolved_at).toLocaleString('id-ID') : 'N/A'}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default EmergencyResponse;
