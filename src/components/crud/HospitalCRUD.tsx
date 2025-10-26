import { useState } from 'react';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { useCRUD } from '@/hooks/useCRUD';

interface Hospital {
  id: string;
  name: string;
  location: string;
  total_beds: number;
  available_beds: number;
  emergency_status: string;
  operating_rooms: number;
  available_ambulances: number;
  created_at: string;
  updated_at: string;
}

const HospitalCRUD = () => {
  const { data: hospitals, loading, create, update, remove } = useCRUD({
    table: 'hospitals',
    orderBy: { column: 'name', ascending: true }
  });
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    total_beds: 0,
    available_beds: 0,
    emergency_status: 'normal',
    operating_rooms: 0,
    available_ambulances: 0
  });

  const canEdit = true;

  const resetForm = () => {
    setFormData({
      name: '',
      location: '',
      total_beds: 0,
      available_beds: 0,
      emergency_status: 'normal',
      operating_rooms: 0,
      available_ambulances: 0
    });
    setEditingId(null);
  };

  const handleSubmit = async () => {
    if (editingId) {
      await update(editingId, formData);
    } else {
      await create(formData);
    }
    setIsDialogOpen(false);
    resetForm();
  };

  const handleEdit = (hospital: Hospital) => {
    setFormData({
      name: hospital.name,
      location: hospital.location,
      total_beds: hospital.total_beds,
      available_beds: hospital.available_beds,
      emergency_status: hospital.emergency_status,
      operating_rooms: hospital.operating_rooms,
      available_ambulances: hospital.available_ambulances
    });
    setEditingId(hospital.id);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus rumah sakit ini?')) {
      await remove(id);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      normal: { variant: 'default' as const, label: 'Normal' },
      warning: { variant: 'secondary' as const, label: 'Peringatan' },
      critical: { variant: 'destructive' as const, label: 'Kritis' }
    };
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.normal;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Manajemen Rumah Sakit</CardTitle>
        {canEdit && (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm}>
                <Plus className="h-4 w-4 mr-2" />
                Tambah Rumah Sakit
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>
                  {editingId ? 'Edit Rumah Sakit' : 'Tambah Rumah Sakit'}
                </DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Nama Rumah Sakit</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Nama rumah sakit"
                    />
                  </div>
                  <div>
                    <Label htmlFor="location">Lokasi</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                      placeholder="Lokasi rumah sakit"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="total_beds">Total Tempat Tidur</Label>
                    <Input
                      id="total_beds"
                      type="number"
                      value={formData.total_beds}
                      onChange={(e) => setFormData(prev => ({ ...prev, total_beds: Number(e.target.value) }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="available_beds">Tempat Tidur Tersedia</Label>
                    <Input
                      id="available_beds"
                      type="number"
                      value={formData.available_beds}
                      onChange={(e) => setFormData(prev => ({ ...prev, available_beds: Number(e.target.value) }))}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="emergency_status">Status Darurat</Label>
                    <Select value={formData.emergency_status} onValueChange={(value) => setFormData(prev => ({ ...prev, emergency_status: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="normal">Normal</SelectItem>
                        <SelectItem value="warning">Peringatan</SelectItem>
                        <SelectItem value="critical">Kritis</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="operating_rooms">Ruang Operasi</Label>
                    <Input
                      id="operating_rooms"
                      type="number"
                      value={formData.operating_rooms}
                      onChange={(e) => setFormData(prev => ({ ...prev, operating_rooms: Number(e.target.value) }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="available_ambulances">Ambulans Tersedia</Label>
                    <Input
                      id="available_ambulances"
                      type="number"
                      value={formData.available_ambulances}
                      onChange={(e) => setFormData(prev => ({ ...prev, available_ambulances: Number(e.target.value) }))}
                    />
                  </div>
                </div>
                
                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    <X className="h-4 w-4 mr-2" />
                    Batal
                  </Button>
                  <Button onClick={handleSubmit}>
                    <Save className="h-4 w-4 mr-2" />
                    Simpan
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </CardHeader>
      <CardContent>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama</TableHead>
                <TableHead>Lokasi</TableHead>
                <TableHead>Tempat Tidur</TableHead>
                <TableHead>Status Darurat</TableHead>
                <TableHead>Ruang Operasi</TableHead>
                <TableHead>Ambulans</TableHead>
                {canEdit && <TableHead>Aksi</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {hospitals.map((hospital: Hospital) => (
                <TableRow key={hospital.id}>
                  <TableCell className="font-medium">{hospital.name}</TableCell>
                  <TableCell>{hospital.location}</TableCell>
                  <TableCell>{hospital.available_beds}/{hospital.total_beds}</TableCell>
                  <TableCell>{getStatusBadge(hospital.emergency_status)}</TableCell>
                  <TableCell>{hospital.operating_rooms}</TableCell>
                  <TableCell>{hospital.available_ambulances}</TableCell>
                  {canEdit && (
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleEdit(hospital)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => handleDelete(hospital.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default HospitalCRUD;