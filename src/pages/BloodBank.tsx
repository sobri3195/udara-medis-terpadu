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
import { Droplet, AlertTriangle, Calendar, User, Activity } from 'lucide-react';
import { toast } from 'sonner';
import { useCRUD } from '@/hooks/useCRUD';
import { isExpiringSoon, getDaysUntil } from '@/utils/dateCalculations';

interface BloodInventory {
  id: string;
  blood_type: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  rhesus: '+' | '-';
  units_available: number;
  min_stock_level: number;
  collection_date: string;
  expiry_date: string;
  status: 'available' | 'reserved' | 'expired' | 'low-stock';
  location: string;
  donor_id?: string;
  notes?: string;
}

interface BloodRequest {
  id: string;
  request_id: string;
  patient_name: string;
  patient_nrp: string;
  blood_type: string;
  units_requested: number;
  urgency: 'routine' | 'urgent' | 'emergency';
  status: 'pending' | 'approved' | 'fulfilled' | 'rejected';
  requested_date: string;
  purpose: string;
}

const BloodBank = () => {
  const { data: inventory = [], create: createInventory, update: updateInventory } = useCRUD<BloodInventory>('blood_inventory');
  const { data: requests = [], create: createRequest, update: updateRequest } = useCRUD<BloodRequest>('blood_requests');
  const [isInventoryFormOpen, setIsInventoryFormOpen] = useState(false);
  const [isRequestFormOpen, setIsRequestFormOpen] = useState(false);

  const [inventoryForm, setInventoryForm] = useState({
    blood_type: 'O+' as 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-',
    units_available: 0,
    min_stock_level: 10,
    collection_date: '',
    expiry_date: '',
    location: '',
    donor_id: '',
    notes: '',
  });

  const [requestForm, setRequestForm] = useState({
    patient_name: '',
    patient_nrp: '',
    blood_type: 'O+',
    units_requested: 1,
    urgency: 'routine' as 'routine' | 'urgent' | 'emergency',
    purpose: '',
  });

  const handleInventorySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const rhesus = inventoryForm.blood_type.includes('+') ? '+' : '-';
      await createInventory({
        ...inventoryForm,
        rhesus,
        status: 'available',
      });
      toast.success('Stok darah berhasil ditambahkan');
      setIsInventoryFormOpen(false);
      setInventoryForm({
        blood_type: 'O+',
        units_available: 0,
        min_stock_level: 10,
        collection_date: '',
        expiry_date: '',
        location: '',
        donor_id: '',
        notes: '',
      });
    } catch (error) {
      toast.error('Gagal menambahkan stok darah');
    }
  };

  const handleRequestSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createRequest({
        ...requestForm,
        request_id: `BR-${Date.now()}`,
        status: 'pending',
        requested_date: new Date().toISOString(),
      });
      toast.success('Permintaan darah berhasil dibuat');
      setIsRequestFormOpen(false);
      setRequestForm({
        patient_name: '',
        patient_nrp: '',
        blood_type: 'O+',
        units_requested: 1,
        urgency: 'routine',
        purpose: '',
      });
    } catch (error) {
      toast.error('Gagal membuat permintaan darah');
    }
  };

  const handleApproveRequest = async (id: string) => {
    try {
      await updateRequest(id, { status: 'approved' });
      toast.success('Permintaan disetujui');
    } catch (error) {
      toast.error('Gagal menyetujui permintaan');
    }
  };

  const handleFulfillRequest = async (id: string, bloodType: string, unitsRequested: number) => {
    try {
      const bloodItem = inventory.find((item) => item.blood_type === bloodType && item.units_available >= unitsRequested);
      if (bloodItem) {
        await updateInventory(bloodItem.id, {
          units_available: bloodItem.units_available - unitsRequested,
        });
        await updateRequest(id, { status: 'fulfilled' });
        toast.success('Permintaan terpenuhi');
      } else {
        toast.error('Stok tidak mencukupi');
      }
    } catch (error) {
      toast.error('Gagal memenuhi permintaan');
    }
  };

  const getBloodTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      'O+': 'bg-red-500',
      'O-': 'bg-red-700',
      'A+': 'bg-blue-500',
      'A-': 'bg-blue-700',
      'B+': 'bg-green-500',
      'B-': 'bg-green-700',
      'AB+': 'bg-purple-500',
      'AB-': 'bg-purple-700',
    };
    return colors[type] || 'bg-gray-500';
  };

  const getUrgencyBadge = (urgency: string) => {
    const variants: Record<string, string> = {
      routine: 'bg-blue-500',
      urgent: 'bg-yellow-500',
      emergency: 'bg-red-500',
    };
    return <Badge className={variants[urgency]}>{urgency.toUpperCase()}</Badge>;
  };

  const lowStock = inventory.filter((item) => item.units_available <= item.min_stock_level);
  const expiringSoon = inventory.filter((item) => isExpiringSoon(item.expiry_date, 14));
  const totalUnits = inventory.reduce((sum, item) => sum + item.units_available, 0);

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
            <h1 className="text-3xl font-bold">Bank Darah</h1>
            <p className="text-gray-500">Manajemen inventori dan permintaan darah</p>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => setIsInventoryFormOpen(!isInventoryFormOpen)}>
              <Droplet className="mr-2 h-4 w-4" />
              Tambah Stok
            </Button>
            <Button variant="outline" onClick={() => setIsRequestFormOpen(!isRequestFormOpen)}>
              Buat Permintaan
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Unit Tersedia</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalUnits}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Jenis Golongan</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{inventory.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Stok Rendah</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{lowStock.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Segera Kadaluarsa</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{expiringSoon.length}</div>
            </CardContent>
          </Card>
        </div>

        {isInventoryFormOpen && (
          <Card>
            <CardHeader>
              <CardTitle>Tambah Stok Darah</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleInventorySubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="blood_type">Golongan Darah</Label>
                    <Select
                      value={inventoryForm.blood_type}
                      onValueChange={(value: any) => setInventoryForm({ ...inventoryForm, blood_type: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="O+">O+</SelectItem>
                        <SelectItem value="O-">O-</SelectItem>
                        <SelectItem value="A+">A+</SelectItem>
                        <SelectItem value="A-">A-</SelectItem>
                        <SelectItem value="B+">B+</SelectItem>
                        <SelectItem value="B-">B-</SelectItem>
                        <SelectItem value="AB+">AB+</SelectItem>
                        <SelectItem value="AB-">AB-</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="units_available">Jumlah Unit</Label>
                    <Input
                      id="units_available"
                      type="number"
                      value={inventoryForm.units_available}
                      onChange={(e) => setInventoryForm({ ...inventoryForm, units_available: parseInt(e.target.value) })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="min_stock_level">Minimal Stok</Label>
                    <Input
                      id="min_stock_level"
                      type="number"
                      value={inventoryForm.min_stock_level}
                      onChange={(e) => setInventoryForm({ ...inventoryForm, min_stock_level: parseInt(e.target.value) })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Lokasi Penyimpanan</Label>
                    <Input
                      id="location"
                      value={inventoryForm.location}
                      onChange={(e) => setInventoryForm({ ...inventoryForm, location: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="collection_date">Tanggal Pengumpulan</Label>
                    <Input
                      id="collection_date"
                      type="date"
                      value={inventoryForm.collection_date}
                      onChange={(e) => setInventoryForm({ ...inventoryForm, collection_date: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="expiry_date">Tanggal Kadaluarsa</Label>
                    <Input
                      id="expiry_date"
                      type="date"
                      value={inventoryForm.expiry_date}
                      onChange={(e) => setInventoryForm({ ...inventoryForm, expiry_date: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="donor_id">ID Pendonor (opsional)</Label>
                    <Input
                      id="donor_id"
                      value={inventoryForm.donor_id}
                      onChange={(e) => setInventoryForm({ ...inventoryForm, donor_id: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="notes">Catatan</Label>
                    <Input
                      id="notes"
                      value={inventoryForm.notes}
                      onChange={(e) => setInventoryForm({ ...inventoryForm, notes: e.target.value })}
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button type="submit">Simpan</Button>
                  <Button type="button" variant="outline" onClick={() => setIsInventoryFormOpen(false)}>
                    Batal
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {isRequestFormOpen && (
          <Card>
            <CardHeader>
              <CardTitle>Buat Permintaan Darah</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleRequestSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="patient_name">Nama Pasien</Label>
                    <Input
                      id="patient_name"
                      value={requestForm.patient_name}
                      onChange={(e) => setRequestForm({ ...requestForm, patient_name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="patient_nrp">NRP</Label>
                    <Input
                      id="patient_nrp"
                      value={requestForm.patient_nrp}
                      onChange={(e) => setRequestForm({ ...requestForm, patient_nrp: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="blood_type_req">Golongan Darah</Label>
                    <Select
                      value={requestForm.blood_type}
                      onValueChange={(value) => setRequestForm({ ...requestForm, blood_type: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="O+">O+</SelectItem>
                        <SelectItem value="O-">O-</SelectItem>
                        <SelectItem value="A+">A+</SelectItem>
                        <SelectItem value="A-">A-</SelectItem>
                        <SelectItem value="B+">B+</SelectItem>
                        <SelectItem value="B-">B-</SelectItem>
                        <SelectItem value="AB+">AB+</SelectItem>
                        <SelectItem value="AB-">AB-</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="units_requested">Jumlah Unit</Label>
                    <Input
                      id="units_requested"
                      type="number"
                      value={requestForm.units_requested}
                      onChange={(e) => setRequestForm({ ...requestForm, units_requested: parseInt(e.target.value) })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="urgency">Tingkat Urgensi</Label>
                    <Select
                      value={requestForm.urgency}
                      onValueChange={(value: any) => setRequestForm({ ...requestForm, urgency: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="routine">Rutin</SelectItem>
                        <SelectItem value="urgent">Mendesak</SelectItem>
                        <SelectItem value="emergency">Darurat</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2 col-span-2">
                    <Label htmlFor="purpose">Tujuan Penggunaan</Label>
                    <Input
                      id="purpose"
                      value={requestForm.purpose}
                      onChange={(e) => setRequestForm({ ...requestForm, purpose: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button type="submit">Simpan</Button>
                  <Button type="button" variant="outline" onClick={() => setIsRequestFormOpen(false)}>
                    Batal
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        <Tabs defaultValue="inventory" className="w-full">
          <TabsList>
            <TabsTrigger value="inventory">Inventori ({inventory.length})</TabsTrigger>
            <TabsTrigger value="requests">Permintaan ({requests.length})</TabsTrigger>
            <TabsTrigger value="low-stock">Stok Rendah ({lowStock.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="inventory" className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {inventory.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-6">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Badge className={`${getBloodTypeColor(item.blood_type)} text-white text-lg px-4 py-2`}>
                          {item.blood_type}
                        </Badge>
                        {item.units_available <= item.min_stock_level && (
                          <AlertTriangle className="h-5 w-5 text-yellow-500" />
                        )}
                      </div>
                      <div className="text-3xl font-bold">{item.units_available} unit</div>
                      <div className="text-sm space-y-1">
                        <div>Lokasi: {item.location}</div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          Kadaluarsa: {new Date(item.expiry_date).toLocaleDateString('id-ID')}
                        </div>
                        {isExpiringSoon(item.expiry_date, 14) && (
                          <Badge variant="destructive" className="text-xs">
                            {getDaysUntil(item.expiry_date)} hari lagi
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="requests" className="space-y-4">
            {requests.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold">{item.request_id}</h3>
                        {getUrgencyBadge(item.urgency)}
                        <Badge>{item.status}</Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          {item.patient_name} ({item.patient_nrp})
                        </div>
                        <div className="flex items-center gap-2">
                          <Droplet className="h-4 w-4" />
                          {item.blood_type} - {item.units_requested} unit
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          {new Date(item.requested_date).toLocaleDateString('id-ID')}
                        </div>
                        <div className="flex items-center gap-2">
                          <Activity className="h-4 w-4" />
                          {item.purpose}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {item.status === 'pending' && (
                        <>
                          <Button size="sm" onClick={() => handleApproveRequest(item.id)}>
                            Setujui
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleFulfillRequest(item.id, item.blood_type, item.units_requested)}
                          >
                            Penuhi
                          </Button>
                        </>
                      )}
                      {item.status === 'approved' && (
                        <Button size="sm" onClick={() => handleFulfillRequest(item.id, item.blood_type, item.units_requested)}>
                          Penuhi
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="low-stock" className="space-y-4">
            {lowStock.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <AlertTriangle className="h-8 w-8 text-yellow-500" />
                      <div>
                        <div className="flex items-center gap-2">
                          <Badge className={`${getBloodTypeColor(item.blood_type)} text-white`}>{item.blood_type}</Badge>
                          <span className="font-bold">{item.units_available} unit tersisa</span>
                        </div>
                        <div className="text-sm text-gray-600">Minimal: {item.min_stock_level} unit</div>
                        <div className="text-sm text-gray-600">Lokasi: {item.location}</div>
                      </div>
                    </div>
                    <Button size="sm">Pesan Stok</Button>
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

export default BloodBank;
