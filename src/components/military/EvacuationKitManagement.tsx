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
import { Switch } from "@/components/ui/switch";
import { Package, Weight, MapPin, Clock, Plus, Edit, Trash2, CheckCircle, AlertCircle } from 'lucide-react';
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

interface EvacuationKit {
  id: string;
  kit_code: string;
  kit_name: string;
  kit_type: string;
  contents?: any[];
  weight_kg: number;
  volume_liters: number;
  expiry_date?: string;
  maintenance_due?: string;
  location: string;
  assigned_unit?: string;
  deployment_ready: boolean;
  last_inspection?: string;
  inspection_notes?: string;
  usage_scenarios?: string[];
  training_required: boolean;
  created_at: string;
  updated_at: string;
}

export function EvacuationKitManagement() {
  const { data: kits, loading, create, update, remove } = useCRUD({ 
    table: 'evacuation_kits',
    orderBy: { column: 'deployment_ready', ascending: false }
  });
  const { user, canManage } = useAuth();
  const canEdit = canManage('military_operations');
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingKit, setEditingKit] = useState<EvacuationKit | null>(null);
  const [formData, setFormData] = useState({
    kit_code: '',
    kit_name: '',
    kit_type: 'standard_medical',
    weight_kg: 0,
    volume_liters: 0,
    expiry_date: '',
    maintenance_due: '',
    location: '',
    assigned_unit: '',
    deployment_ready: true,
    inspection_notes: '',
    training_required: false
  });

  const resetForm = () => {
    setFormData({
      kit_code: '',
      kit_name: '',
      kit_type: 'standard_medical',
      weight_kg: 0,
      volume_liters: 0,
      expiry_date: '',
      maintenance_due: '',
      location: '',
      assigned_unit: '',
      deployment_ready: true,
      inspection_notes: '',
      training_required: false
    });
    setEditingKit(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingKit) {
        await update(editingKit.id, formData);
        toast.success("Kit evakuasi berhasil diperbarui");
      } else {
        await create(formData);
        toast.success("Kit evakuasi berhasil ditambahkan");
      }
      setIsDialogOpen(false);
      resetForm();
    } catch (error) {
      toast.error("Terjadi kesalahan saat menyimpan data");
    }
  };

  const handleEdit = (kit: EvacuationKit) => {
    setEditingKit(kit);
    setFormData({
      kit_code: kit.kit_code,
      kit_name: kit.kit_name,
      kit_type: kit.kit_type,
      weight_kg: kit.weight_kg,
      volume_liters: kit.volume_liters,
      expiry_date: kit.expiry_date ? new Date(kit.expiry_date).toISOString().split('T')[0] : '',
      maintenance_due: kit.maintenance_due ? new Date(kit.maintenance_due).toISOString().split('T')[0] : '',
      location: kit.location,
      assigned_unit: kit.assigned_unit || '',
      deployment_ready: kit.deployment_ready,
      inspection_notes: kit.inspection_notes || '',
      training_required: kit.training_required
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus kit evakuasi ini?')) {
      try {
        await remove(id);
        toast.success("Kit evakuasi berhasil dihapus");
      } catch (error) {
        toast.error("Terjadi kesalahan saat menghapus data");
      }
    }
  };

  const getKitTypeBadge = (type: string) => {
    const typeConfig = {
      standard_medical: { label: 'Medis Standar', color: 'bg-blue-500' },
      trauma: { label: 'Trauma', color: 'bg-red-500' },
      pediatric: { label: 'Anak', color: 'bg-green-500' },
      surgical: { label: 'Bedah', color: 'bg-purple-500' },
      emergency: { label: 'Darurat', color: 'bg-orange-500' },
      field_surgery: { label: 'Bedah Lapangan', color: 'bg-gray-700' }
    };
    
    const config = typeConfig[type as keyof typeof typeConfig] || typeConfig.standard_medical;
    return <Badge className={config.color}>{config.label}</Badge>;
  };

  const getReadinessStatus = (ready: boolean, maintenanceDue?: string, expiry?: string) => {
    if (!ready) {
      return <Badge className="bg-red-500">Tidak Siap</Badge>;
    }

    const now = new Date();
    const maintenance = maintenanceDue ? new Date(maintenanceDue) : null;
    const expiryDate = expiry ? new Date(expiry) : null;

    if (maintenance && maintenance <= now) {
      return <Badge className="bg-orange-500">Maintenance Due</Badge>;
    }

    if (expiryDate && expiryDate <= new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000)) {
      return <Badge className="bg-yellow-500">Segera Expired</Badge>;
    }

    return <Badge className="bg-green-500">Siap Deploy</Badge>;
  };

  const isMaintenanceOverdue = (maintenanceDue?: string) => {
    if (!maintenanceDue) return false;
    return new Date(maintenanceDue) <= new Date();
  };

  const isExpiringSoon = (expiry?: string) => {
    if (!expiry) return false;
    const thirtyDaysFromNow = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
    return new Date(expiry) <= thirtyDaysFromNow;
  };

  if (loading) {
    return <div className="p-4">Loading evacuation kits...</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Manajemen Kit Evakuasi Medis
              </CardTitle>
              <CardDescription>
                Manajemen kit evakuasi medis untuk operasi TNI AU
              </CardDescription>
            </div>
            {canEdit && (
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={resetForm}>
                    <Plus className="h-4 w-4 mr-1" />
                    Tambah Kit Evakuasi
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>
                      {editingKit ? 'Edit' : 'Tambah'} Kit Evakuasi
                    </DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="kit_code">Kode Kit</Label>
                        <Input
                          id="kit_code"
                          value={formData.kit_code}
                          onChange={(e) => setFormData({...formData, kit_code: e.target.value})}
                          placeholder="EVA-MED-001"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="kit_name">Nama Kit</Label>
                        <Input
                          id="kit_name"
                          value={formData.kit_name}
                          onChange={(e) => setFormData({...formData, kit_name: e.target.value})}
                          placeholder="Kit Evakuasi Medis Alpha"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="kit_type">Tipe Kit</Label>
                        <Select 
                          value={formData.kit_type} 
                          onValueChange={(value) => setFormData({...formData, kit_type: value})}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="standard_medical">Medis Standar</SelectItem>
                            <SelectItem value="trauma">Trauma</SelectItem>
                            <SelectItem value="pediatric">Anak</SelectItem>
                            <SelectItem value="surgical">Bedah</SelectItem>
                            <SelectItem value="emergency">Darurat</SelectItem>
                            <SelectItem value="field_surgery">Bedah Lapangan</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="location">Lokasi</Label>
                        <Input
                          id="location"
                          value={formData.location}
                          onChange={(e) => setFormData({...formData, location: e.target.value})}
                          placeholder="Gudang A-7, Lanud Halim"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="weight_kg">Berat (kg)</Label>
                        <Input
                          id="weight_kg"
                          type="number"
                          value={formData.weight_kg}
                          onChange={(e) => setFormData({...formData, weight_kg: parseFloat(e.target.value) || 0})}
                          min="0"
                          step="0.1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="volume_liters">Volume (liter)</Label>
                        <Input
                          id="volume_liters"
                          type="number"
                          value={formData.volume_liters}
                          onChange={(e) => setFormData({...formData, volume_liters: parseFloat(e.target.value) || 0})}
                          min="0"
                          step="0.1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="assigned_unit">Unit Ditugaskan</Label>
                        <Input
                          id="assigned_unit"
                          value={formData.assigned_unit}
                          onChange={(e) => setFormData({...formData, assigned_unit: e.target.value})}
                          placeholder="Skadron Medis 1"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiry_date">Tanggal Kadaluarsa</Label>
                        <Input
                          id="expiry_date"
                          type="date"
                          value={formData.expiry_date}
                          onChange={(e) => setFormData({...formData, expiry_date: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="maintenance_due">Jadwal Maintenance</Label>
                        <Input
                          id="maintenance_due"
                          type="date"
                          value={formData.maintenance_due}
                          onChange={(e) => setFormData({...formData, maintenance_due: e.target.value})}
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="inspection_notes">Catatan Inspeksi</Label>
                      <Textarea
                        id="inspection_notes"
                        value={formData.inspection_notes}
                        onChange={(e) => setFormData({...formData, inspection_notes: e.target.value})}
                        placeholder="Catatan hasil inspeksi terakhir..."
                        rows={3}
                      />
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="deployment_ready"
                          checked={formData.deployment_ready}
                          onCheckedChange={(checked) => setFormData({...formData, deployment_ready: checked})}
                        />
                        <Label htmlFor="deployment_ready">Siap Deploy</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="training_required"
                          checked={formData.training_required}
                          onCheckedChange={(checked) => setFormData({...formData, training_required: checked})}
                        />
                        <Label htmlFor="training_required">Memerlukan Training Khusus</Label>
                      </div>
                    </div>

                    <div className="flex justify-end space-x-2 pt-4">
                      <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                        Batal
                      </Button>
                      <Button type="submit">
                        {editingKit ? 'Update' : 'Simpan'}
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
                <TableHead>Tipe</TableHead>
                <TableHead>Lokasi</TableHead>
                <TableHead>Spesifikasi</TableHead>
                <TableHead>Unit</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Maintenance</TableHead>
                {canEdit && <TableHead>Aksi</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {kits?.map((kit: EvacuationKit) => (
                <TableRow key={kit.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{kit.kit_code}</div>
                      <div className="text-sm text-muted-foreground">{kit.kit_name}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {getKitTypeBadge(kit.kit_type)}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      {kit.location}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-sm">
                        <Weight className="h-3 w-3 text-gray-500" />
                        {kit.weight_kg} kg
                      </div>
                      <div className="text-xs text-gray-500">
                        {kit.volume_liters} L
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="text-sm">{kit.assigned_unit || 'Tidak ditugaskan'}</div>
                      {kit.training_required && (
                        <Badge variant="outline" className="text-xs mt-1">
                          Training Required
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    {getReadinessStatus(kit.deployment_ready, kit.maintenance_due, kit.expiry_date)}
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      {kit.maintenance_due && (
                        <div className={`text-xs flex items-center gap-1 ${
                          isMaintenanceOverdue(kit.maintenance_due) ? 'text-red-600' : 'text-gray-600'
                        }`}>
                          <Clock className="h-3 w-3" />
                          {new Date(kit.maintenance_due).toLocaleDateString('id-ID')}
                        </div>
                      )}
                      {kit.expiry_date && (
                        <div className={`text-xs flex items-center gap-1 ${
                          isExpiringSoon(kit.expiry_date) ? 'text-orange-600' : 'text-gray-600'
                        }`}>
                          <AlertCircle className="h-3 w-3" />
                          Exp: {new Date(kit.expiry_date).toLocaleDateString('id-ID')}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  {canEdit && (
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(kit)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(kit.id)}
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