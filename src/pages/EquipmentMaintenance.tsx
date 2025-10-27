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
import { Wrench, Calendar, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { toast } from 'sonner';
import { useCRUD } from '@/hooks/useCRUD';
import { isExpiringSoon, getDaysUntil } from '@/utils/dateCalculations';

interface MaintenanceRecord {
  id: string;
  equipment_id: string;
  equipment_name: string;
  equipment_type: string;
  last_maintenance: string;
  next_maintenance: string;
  maintenance_interval_days: number;
  status: 'good' | 'due-soon' | 'overdue' | 'under-maintenance';
  location: string;
  technician?: string;
  notes?: string;
  created_at: string;
}

const EquipmentMaintenance = () => {
  const { data: records = [], create, update, remove } = useCRUD<MaintenanceRecord>('equipment_maintenance');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    equipment_name: '',
    equipment_type: 'medical',
    last_maintenance: '',
    next_maintenance: '',
    maintenance_interval_days: 90,
    location: '',
    notes: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await create({
        ...formData,
        equipment_id: `EQP-${Date.now()}`,
        status: 'good',
        created_at: new Date().toISOString(),
      });
      toast.success('Peralatan berhasil ditambahkan');
      setIsFormOpen(false);
      setFormData({
        equipment_name: '',
        equipment_type: 'medical',
        last_maintenance: '',
        next_maintenance: '',
        maintenance_interval_days: 90,
        location: '',
        notes: '',
      });
    } catch (error) {
      toast.error('Gagal menambahkan peralatan');
    }
  };

  const handleStartMaintenance = async (id: string) => {
    try {
      await update(id, {
        status: 'under-maintenance',
      });
      toast.success('Perawatan dimulai');
    } catch (error) {
      toast.error('Gagal memulai perawatan');
    }
  };

  const handleCompleteMaintenance = async (id: string) => {
    const today = new Date();
    const nextDate = new Date(today);
    const record = records.find((r) => r.id === id);
    if (record) {
      nextDate.setDate(today.getDate() + record.maintenance_interval_days);
    }

    try {
      await update(id, {
        status: 'good',
        last_maintenance: today.toISOString(),
        next_maintenance: nextDate.toISOString(),
      });
      toast.success('Perawatan selesai');
    } catch (error) {
      toast.error('Gagal menyelesaikan perawatan');
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { color: string; label: string }> = {
      good: { color: 'bg-green-500', label: 'Baik' },
      'due-soon': { color: 'bg-yellow-500', label: 'Segera Jatuh Tempo' },
      overdue: { color: 'bg-red-500', label: 'Terlambat' },
      'under-maintenance': { color: 'bg-blue-500', label: 'Dalam Perawatan' },
    };
    const variant = variants[status] || variants.good;
    return <Badge className={variant.color}>{variant.label}</Badge>;
  };

  const calculateStatus = (record: MaintenanceRecord): 'good' | 'due-soon' | 'overdue' => {
    const daysUntil = getDaysUntil(record.next_maintenance);
    if (daysUntil < 0) return 'overdue';
    if (daysUntil <= 7) return 'due-soon';
    return 'good';
  };

  const goodEquipment = records.filter((r) => calculateStatus(r) === 'good' && r.status !== 'under-maintenance');
  const dueSoon = records.filter((r) => calculateStatus(r) === 'due-soon' && r.status !== 'under-maintenance');
  const overdue = records.filter((r) => calculateStatus(r) === 'overdue' && r.status !== 'under-maintenance');
  const underMaintenance = records.filter((r) => r.status === 'under-maintenance');

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
            <h1 className="text-3xl font-bold">Perawatan Alat Medis</h1>
            <p className="text-gray-500">Tracking dan jadwal perawatan peralatan medis</p>
          </div>
          <Button onClick={() => setIsFormOpen(!isFormOpen)}>
            <Wrench className="mr-2 h-4 w-4" />
            Tambah Peralatan
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Peralatan</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{records.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Kondisi Baik</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{goodEquipment.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Segera Jatuh Tempo</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{dueSoon.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Terlambat</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{overdue.length}</div>
            </CardContent>
          </Card>
        </div>

        {isFormOpen && (
          <Card>
            <CardHeader>
              <CardTitle>Tambah Peralatan Baru</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="equipment_name">Nama Peralatan</Label>
                    <Input
                      id="equipment_name"
                      value={formData.equipment_name}
                      onChange={(e) => setFormData({ ...formData, equipment_name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="equipment_type">Jenis</Label>
                    <Select
                      value={formData.equipment_type}
                      onValueChange={(value) => setFormData({ ...formData, equipment_type: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="medical">Medis</SelectItem>
                        <SelectItem value="diagnostic">Diagnostik</SelectItem>
                        <SelectItem value="surgical">Bedah</SelectItem>
                        <SelectItem value="laboratory">Laboratorium</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last_maintenance">Perawatan Terakhir</Label>
                    <Input
                      id="last_maintenance"
                      type="date"
                      value={formData.last_maintenance}
                      onChange={(e) => setFormData({ ...formData, last_maintenance: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="next_maintenance">Perawatan Berikutnya</Label>
                    <Input
                      id="next_maintenance"
                      type="date"
                      value={formData.next_maintenance}
                      onChange={(e) => setFormData({ ...formData, next_maintenance: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="maintenance_interval_days">Interval (Hari)</Label>
                    <Input
                      id="maintenance_interval_days"
                      type="number"
                      value={formData.maintenance_interval_days}
                      onChange={(e) => setFormData({ ...formData, maintenance_interval_days: parseInt(e.target.value) })}
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
                  <div className="space-y-2 col-span-2">
                    <Label htmlFor="notes">Catatan</Label>
                    <Input
                      id="notes"
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
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

        <Tabs defaultValue="all" className="w-full">
          <TabsList>
            <TabsTrigger value="all">Semua ({records.length})</TabsTrigger>
            <TabsTrigger value="due-soon">Segera Jatuh Tempo ({dueSoon.length})</TabsTrigger>
            <TabsTrigger value="overdue">Terlambat ({overdue.length})</TabsTrigger>
            <TabsTrigger value="under-maintenance">Dalam Perawatan ({underMaintenance.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {records.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold">{item.equipment_name}</h3>
                        {getStatusBadge(item.status === 'under-maintenance' ? item.status : calculateStatus(item))}
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>ID: {item.equipment_id}</div>
                        <div>Tipe: {item.equipment_type}</div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          Terakhir: {new Date(item.last_maintenance).toLocaleDateString('id-ID')}
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          Berikutnya: {new Date(item.next_maintenance).toLocaleDateString('id-ID')}
                        </div>
                        <div>Lokasi: {item.location}</div>
                        <div>Interval: {item.maintenance_interval_days} hari</div>
                      </div>
                      {item.notes && <p className="text-sm text-gray-600">{item.notes}</p>}
                    </div>
                    <div className="flex gap-2">
                      {item.status !== 'under-maintenance' && (
                        <Button size="sm" onClick={() => handleStartMaintenance(item.id)}>
                          <Wrench className="mr-2 h-4 w-4" />
                          Mulai Perawatan
                        </Button>
                      )}
                      {item.status === 'under-maintenance' && (
                        <Button size="sm" onClick={() => handleCompleteMaintenance(item.id)}>
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Selesai
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="due-soon" className="space-y-4">
            {dueSoon.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold">{item.equipment_name}</h3>
                        {getStatusBadge('due-soon')}
                        <Badge variant="outline">{getDaysUntil(item.next_maintenance)} hari lagi</Badge>
                      </div>
                      <p className="text-sm">Lokasi: {item.location}</p>
                    </div>
                    <Button size="sm" onClick={() => handleStartMaintenance(item.id)}>
                      <Wrench className="mr-2 h-4 w-4" />
                      Mulai Perawatan
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="overdue" className="space-y-4">
            {overdue.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2">
                        <AlertCircle className="h-5 w-5 text-red-500" />
                        <h3 className="font-bold">{item.equipment_name}</h3>
                        {getStatusBadge('overdue')}
                        <Badge variant="destructive">{Math.abs(getDaysUntil(item.next_maintenance))} hari terlambat</Badge>
                      </div>
                      <p className="text-sm">Lokasi: {item.location}</p>
                    </div>
                    <Button size="sm" onClick={() => handleStartMaintenance(item.id)}>
                      <Wrench className="mr-2 h-4 w-4" />
                      Mulai Perawatan Segera
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="under-maintenance" className="space-y-4">
            {underMaintenance.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold">{item.equipment_name}</h3>
                        {getStatusBadge('under-maintenance')}
                      </div>
                      <p className="text-sm">Teknisi: {item.technician || 'Belum ditentukan'}</p>
                      <p className="text-sm">Lokasi: {item.location}</p>
                    </div>
                    <Button size="sm" onClick={() => handleCompleteMaintenance(item.id)}>
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Selesai
                    </Button>
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

export default EquipmentMaintenance;
