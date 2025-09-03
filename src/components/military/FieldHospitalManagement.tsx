import React, { useState } from 'react';
import { useCRUD } from "@/hooks/useCRUD";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Users, Bed, Activity, Plus, Edit, Trash2 } from 'lucide-react';
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

interface FieldHospital {
  id: string;
  hospital_code: string;
  hospital_name: string;
  location: string;
  coordinates?: any;
  deployment_status: string;
  capacity: number;
  current_patients: number;
  medical_equipment?: any[];
  personnel_assigned?: string[];
  deployment_date?: string;
  mission_type: string;
  theater_id?: string;
  commander_id?: string;
  supply_requirements?: any;
  logistics_status: string;
  created_at: string;
  updated_at: string;
}

export function FieldHospitalManagement() {
  const { data: hospitals, loading, create, update, remove } = useCRUD({ 
    table: 'field_hospitals',
    orderBy: { column: 'created_at', ascending: false }
  });
  const { user, canManage } = useAuth();
  const canEdit = canManage('military_operations');
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingHospital, setEditingHospital] = useState<FieldHospital | null>(null);
  const [formData, setFormData] = useState({
    hospital_code: '',
    hospital_name: '',
    location: '',
    deployment_status: 'planned',
    capacity: 0,
    current_patients: 0,
    mission_type: 'medical_support',
    logistics_status: 'preparing'
  });

  const resetForm = () => {
    setFormData({
      hospital_code: '',
      hospital_name: '',
      location: '',
      deployment_status: 'planned',
      capacity: 0,
      current_patients: 0,
      mission_type: 'medical_support',
      logistics_status: 'preparing'
    });
    setEditingHospital(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingHospital) {
        await update(editingHospital.id, formData);
        toast.success("Rumah sakit lapangan berhasil diperbarui");
      } else {
        await create(formData);
        toast.success("Rumah sakit lapangan berhasil ditambahkan");
      }
      setIsDialogOpen(false);
      resetForm();
    } catch (error) {
      toast.error("Terjadi kesalahan saat menyimpan data");
    }
  };

  const handleEdit = (hospital: FieldHospital) => {
    setEditingHospital(hospital);
    setFormData({
      hospital_code: hospital.hospital_code,
      hospital_name: hospital.hospital_name,
      location: hospital.location,
      deployment_status: hospital.deployment_status,
      capacity: hospital.capacity,
      current_patients: hospital.current_patients,
      mission_type: hospital.mission_type,
      logistics_status: hospital.logistics_status
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus rumah sakit lapangan ini?')) {
      try {
        await remove(id);
        toast.success("Rumah sakit lapangan berhasil dihapus");
      } catch (error) {
        toast.error("Terjadi kesalahan saat menghapus data");
      }
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      planned: { label: 'Direncanakan', color: 'bg-gray-500' },
      deploying: { label: 'Sedang Deploy', color: 'bg-blue-500' },
      operational: { label: 'Operasional', color: 'bg-green-500' },
      evacuating: { label: 'Evakuasi', color: 'bg-orange-500' },
      decommissioned: { label: 'Ditutup', color: 'bg-red-500' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.planned;
    return <Badge className={config.color}>{config.label}</Badge>;
  };

  const getLogisticsStatusColor = (status: string) => {
    switch (status) {
      case 'preparing': return 'text-yellow-600';
      case 'ready': return 'text-green-600';
      case 'resupplying': return 'text-blue-600';
      case 'critical': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const calculateOccupancyRate = (current: number, capacity: number) => {
    if (capacity === 0) return 0;
    return Math.round((current / capacity) * 100);
  };

  if (loading) {
    return <div className="p-4">Loading field hospitals...</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Manajemen Rumah Sakit Lapangan
              </CardTitle>
              <CardDescription>
                Koordinasi deployment dan operasi rumah sakit lapangan TNI AU
              </CardDescription>
            </div>
            {canEdit && (
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={resetForm}>
                    <Plus className="h-4 w-4 mr-1" />
                    Tambah RS Lapangan
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>
                      {editingHospital ? 'Edit' : 'Tambah'} Rumah Sakit Lapangan
                    </DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="hospital_code">Kode RS</Label>
                        <Input
                          id="hospital_code"
                          value={formData.hospital_code}
                          onChange={(e) => setFormData({...formData, hospital_code: e.target.value})}
                          placeholder="RSL-001"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="hospital_name">Nama RS</Label>
                        <Input
                          id="hospital_name"
                          value={formData.hospital_name}
                          onChange={(e) => setFormData({...formData, hospital_name: e.target.value})}
                          placeholder="RS Lapangan Alpha"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="location">Lokasi</Label>
                      <Input
                        id="location"
                        value={formData.location}
                        onChange={(e) => setFormData({...formData, location: e.target.value})}
                        placeholder="Koordinat atau nama lokasi"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="deployment_status">Status Deployment</Label>
                        <Select 
                          value={formData.deployment_status} 
                          onValueChange={(value) => setFormData({...formData, deployment_status: value})}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="planned">Direncanakan</SelectItem>
                            <SelectItem value="deploying">Sedang Deploy</SelectItem>
                            <SelectItem value="operational">Operasional</SelectItem>
                            <SelectItem value="evacuating">Evakuasi</SelectItem>
                            <SelectItem value="decommissioned">Ditutup</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="mission_type">Tipe Misi</Label>
                        <Select 
                          value={formData.mission_type} 
                          onValueChange={(value) => setFormData({...formData, mission_type: value})}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="medical_support">Dukungan Medis</SelectItem>
                            <SelectItem value="emergency_response">Tanggap Darurat</SelectItem>
                            <SelectItem value="combat_support">Dukungan Tempur</SelectItem>
                            <SelectItem value="humanitarian">Kemanusiaan</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="capacity">Kapasitas Tempat Tidur</Label>
                        <Input
                          id="capacity"
                          type="number"
                          value={formData.capacity}
                          onChange={(e) => setFormData({...formData, capacity: parseInt(e.target.value) || 0})}
                          min="0"
                        />
                      </div>
                      <div>
                        <Label htmlFor="current_patients">Pasien Saat Ini</Label>
                        <Input
                          id="current_patients"
                          type="number"
                          value={formData.current_patients}
                          onChange={(e) => setFormData({...formData, current_patients: parseInt(e.target.value) || 0})}
                          min="0"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="logistics_status">Status Logistik</Label>
                      <Select 
                        value={formData.logistics_status} 
                        onValueChange={(value) => setFormData({...formData, logistics_status: value})}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="preparing">Persiapan</SelectItem>
                          <SelectItem value="ready">Siap</SelectItem>
                          <SelectItem value="resupplying">Resupply</SelectItem>
                          <SelectItem value="critical">Kritis</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex justify-end space-x-2 pt-4">
                      <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                        Batal
                      </Button>
                      <Button type="submit">
                        {editingHospital ? 'Update' : 'Simpan'}
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Kode & Nama</TableHead>
                <TableHead>Lokasi</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Kapasitas</TableHead>
                <TableHead>Misi</TableHead>
                <TableHead>Logistik</TableHead>
                {canEdit && <TableHead>Aksi</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {hospitals?.map((hospital: FieldHospital) => (
                <TableRow key={hospital.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{hospital.hospital_code}</div>
                      <div className="text-sm text-muted-foreground">{hospital.hospital_name}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      {hospital.location}
                    </div>
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(hospital.deployment_status)}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Bed className="h-4 w-4 text-gray-500" />
                      <div>
                        <div className="font-medium">
                          {hospital.current_patients}/{hospital.capacity}
                        </div>
                        <div className="text-xs text-gray-500">
                          {calculateOccupancyRate(hospital.current_patients, hospital.capacity)}% occupancy
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {hospital.mission_type.replace('_', ' ')}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className={`font-medium ${getLogisticsStatusColor(hospital.logistics_status)}`}>
                      {hospital.logistics_status}
                    </div>
                  </TableCell>
                  {canEdit && (
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(hospital)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(hospital.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}