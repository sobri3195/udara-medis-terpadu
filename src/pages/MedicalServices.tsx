
import React from 'react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, Users, Clock, Calendar, List, FileText } from 'lucide-react';
import { useCRUD } from '@/hooks/useCRUD';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface MedicalService {
  id: string;
  service_name: string;
  department: string;
  description?: string;
  capacity: number;
  current_load: number;
  status: string;
  created_at: string;
  updated_at: string;
}

const MedicalServices = () => {
  const { data: services, loading, create, update, remove } = useCRUD({
    table: 'medical_services',
    orderBy: { column: 'service_name', ascending: true }
  });
  const { canManage } = useAuth();
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    service_name: '',
    department: '',
    description: '',
    capacity: 0,
    current_load: 0,
    status: 'active'
  });

  const canEdit = canManage('medical_services');

  const resetForm = () => {
    setFormData({
      service_name: '',
      department: '',
      description: '',
      capacity: 0,
      current_load: 0,
      status: 'active'
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

  const handleEdit = (service: MedicalService) => {
    setFormData({
      service_name: service.service_name,
      department: service.department,
      description: service.description || '',
      capacity: service.capacity,
      current_load: service.current_load,
      status: service.status
    });
    setEditingId(service.id);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus layanan medis ini?')) {
      await remove(id);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { variant: 'default' as const, label: 'Aktif' },
      inactive: { variant: 'secondary' as const, label: 'Non-Aktif' },
      maintenance: { variant: 'secondary' as const, label: 'Maintenance' }
    };
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.active;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const getCapacityColor = (current: number, capacity: number) => {
    const percentage = (current / capacity) * 100;
    if (percentage >= 90) return 'bg-red-500';
    if (percentage >= 75) return 'bg-amber-500';
    return 'bg-green-500';
  };

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-auto bg-gray-50 p-4">
          <div className="max-w-7xl mx-auto">
            <div className="mb-6">
              <h1 className="text-2xl font-bold mb-1">Pelayanan Medis - CRUD Aktif</h1>
              <p className="text-muted-foreground">Manajemen pelayanan medis dengan sistem role-based access control</p>
            </div>

            {/* CRUD Component for Medical Services */}
            <Card className="mb-6">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Manajemen Layanan Medis</CardTitle>
                {canEdit && (
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <Button onClick={resetForm}>
                        <Plus className="h-4 w-4 mr-2" />
                        Tambah Layanan
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>
                          {editingId ? 'Edit Layanan Medis' : 'Tambah Layanan Medis'}
                        </DialogTitle>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="service_name">Nama Layanan</Label>
                            <Input
                              id="service_name"
                              value={formData.service_name}
                              onChange={(e) => setFormData(prev => ({ ...prev, service_name: e.target.value }))}
                              placeholder="Nama layanan medis"
                            />
                          </div>
                          <div>
                            <Label htmlFor="department">Departemen</Label>
                            <Input
                              id="department"
                              value={formData.department}
                              onChange={(e) => setFormData(prev => ({ ...prev, department: e.target.value }))}
                              placeholder="Departemen"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <Label htmlFor="description">Deskripsi</Label>
                          <Input
                            id="description"
                            value={formData.description}
                            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                            placeholder="Deskripsi layanan"
                          />
                        </div>
                        
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <Label htmlFor="capacity">Kapasitas</Label>
                            <Input
                              id="capacity"
                              type="number"
                              value={formData.capacity}
                              onChange={(e) => setFormData(prev => ({ ...prev, capacity: Number(e.target.value) }))}
                            />
                          </div>
                          <div>
                            <Label htmlFor="current_load">Beban Saat Ini</Label>
                            <Input
                              id="current_load"
                              type="number"
                              value={formData.current_load}
                              onChange={(e) => setFormData(prev => ({ ...prev, current_load: Number(e.target.value) }))}
                            />
                          </div>
                          <div>
                            <Label htmlFor="status">Status</Label>
                            <Select value={formData.status} onValueChange={(value) => setFormData(prev => ({ ...prev, status: value }))}>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="active">Aktif</SelectItem>
                                <SelectItem value="inactive">Non-Aktif</SelectItem>
                                <SelectItem value="maintenance">Maintenance</SelectItem>
                              </SelectContent>
                            </Select>
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
                        <TableHead>Nama Layanan</TableHead>
                        <TableHead>Departemen</TableHead>
                        <TableHead>Kapasitas</TableHead>
                        <TableHead>Beban</TableHead>
                        <TableHead>Status</TableHead>
                        {canEdit && <TableHead>Aksi</TableHead>}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {services.map((service: MedicalService) => (
                        <TableRow key={service.id}>
                          <TableCell className="font-medium">{service.service_name}</TableCell>
                          <TableCell>{service.department}</TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <span>{service.current_load}/{service.capacity}</span>
                              <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div 
                                  className={`h-full ${getCapacityColor(service.current_load, service.capacity)}`}
                                  style={{ width: `${Math.min(100, (service.current_load / service.capacity) * 100)}%` }}
                                />
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            {Math.round((service.current_load / service.capacity) * 100)}%
                          </TableCell>
                          <TableCell>{getStatusBadge(service.status)}</TableCell>
                          {canEdit && (
                            <TableCell>
                              <div className="flex gap-2">
                                <Button variant="outline" size="sm" onClick={() => handleEdit(service)}>
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button variant="destructive" size="sm" onClick={() => handleDelete(service.id)}>
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium flex items-center">
                    <Activity className="h-5 w-5 text-tniau-lightblue mr-2" />
                    Pasien Aktif
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-tniau-navy">402</div>
                  <p className="text-muted-foreground text-sm">+12 dalam 24 jam terakhir</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium flex items-center">
                    <Users className="h-5 w-5 text-tniau-lightblue mr-2" />
                    Dokter Bertugas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-tniau-navy">45</div>
                  <p className="text-muted-foreground text-sm">Dari total 68 dokter</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium flex items-center">
                    <Clock className="h-5 w-5 text-tniau-lightblue mr-2" />
                    Waktu Tunggu Rata-rata
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-tniau-navy">24m</div>
                  <p className="text-muted-foreground text-sm">-5m dari minggu lalu</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <Card>
                <CardHeader>
                  <CardTitle>Penggunaan Kamar</CardTitle>
                  <CardDescription>Status penggunaan ruang di seluruh rumah sakit</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Ruang Rawat Inap</span>
                      <div className="flex items-center gap-2">
                        <span className="bg-tniau-navy h-2 w-16 rounded-full overflow-hidden">
                          <span className="bg-tniau-lightblue h-full block" style={{ width: '78%' }}></span>
                        </span>
                        <span>78%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Ruang ICU</span>
                      <div className="flex items-center gap-2">
                        <span className="bg-tniau-navy h-2 w-16 rounded-full overflow-hidden">
                          <span className="bg-tniau-red h-full block" style={{ width: '92%' }}></span>
                        </span>
                        <span>92%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Ruang Operasi</span>
                      <div className="flex items-center gap-2">
                        <span className="bg-tniau-navy h-2 w-16 rounded-full overflow-hidden">
                          <span className="bg-tniau-lightblue h-full block" style={{ width: '65%' }}></span>
                        </span>
                        <span>65%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">IGD</span>
                      <div className="flex items-center gap-2">
                        <span className="bg-tniau-navy h-2 w-16 rounded-full overflow-hidden">
                          <span className="bg-tniau-red h-full block" style={{ width: '88%' }}></span>
                        </span>
                        <span>88%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Pasien Emergensi Terkini</CardTitle>
                  <CardDescription>Kasus emergensi dalam 24 jam terakhir</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border-l-4 border-tniau-red pl-3 py-1">
                      <div className="font-medium">Kasus Trauma Multi-Organ</div>
                      <div className="text-sm text-muted-foreground">RSPAU Hardjolukito - 2 jam lalu</div>
                    </div>
                    <div className="border-l-4 border-tniau-red pl-3 py-1">
                      <div className="font-medium">Serangan Jantung Akut</div>
                      <div className="text-sm text-muted-foreground">RS Lanud Adisutjipto - 4 jam lalu</div>
                    </div>
                    <div className="border-l-4 border-amber-400 pl-3 py-1">
                      <div className="font-medium">Kecelakaan Kendaraan</div>
                      <div className="text-sm text-muted-foreground">RS Lanud Halim - 6 jam lalu</div>
                    </div>
                    <div className="border-l-4 border-amber-400 pl-3 py-1">
                      <div className="font-medium">Luka Bakar Serius</div>
                      <div className="text-sm text-muted-foreground">RS Lanud Hasanuddin - 7 jam lalu</div>
                    </div>
                    <div className="mt-2 text-center">
                      <a href="#" className="text-sm text-tniau-lightblue hover:underline">Lihat semua kasus emergensi</a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Jadwal Operasi</CardTitle>
                  <CardDescription>Operasi terjadwal untuk hari ini</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center bg-gray-50 p-3 rounded-md">
                      <div>
                        <div className="font-medium">Apendektomi</div>
                        <div className="text-sm text-muted-foreground">Dokter Mia Purnama, SpB</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-tniau-lightblue">09:00 - 10:30</div>
                        <div className="text-sm">Ruang OP-2</div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center bg-gray-50 p-3 rounded-md">
                      <div>
                        <div className="font-medium">Hernioplasti</div>
                        <div className="text-sm text-muted-foreground">Dr. Budi Santoso, SpB</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-tniau-lightblue">11:00 - 12:30</div>
                        <div className="text-sm">Ruang OP-1</div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center bg-gray-50 p-3 rounded-md">
                      <div>
                        <div className="font-medium">Tiroidektomi</div>
                        <div className="text-sm text-muted-foreground">Dr. Rina Wijaya, SpB</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-tniau-lightblue">13:30 - 15:30</div>
                        <div className="text-sm">Ruang OP-3</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Dokumen Medis</CardTitle>
                  <CardDescription>Dokumen yang memerlukan perhatian</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex gap-3 items-center">
                      <FileText className="h-5 w-5 text-tniau-navy" />
                      <div>
                        <div className="font-medium">Laporan Medis Bulanan</div>
                        <div className="text-xs text-muted-foreground">Perlu ditandatangani</div>
                      </div>
                    </div>
                    <div className="flex gap-3 items-center">
                      <FileText className="h-5 w-5 text-tniau-navy" />
                      <div>
                        <div className="font-medium">Surat Rujukan (5)</div>
                        <div className="text-xs text-muted-foreground">Perlu diproses</div>
                      </div>
                    </div>
                    <div className="flex gap-3 items-center">
                      <FileText className="h-5 w-5 text-tniau-navy" />
                      <div>
                        <div className="font-medium">Riwayat Medis Pasien</div>
                        <div className="text-xs text-muted-foreground">Perlu diperbarui</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default MedicalServices;
