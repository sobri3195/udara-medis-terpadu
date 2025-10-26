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
import { Plane, MapPin, Package, Clock, Plus, Edit, Trash2, AlertCircle } from 'lucide-react';
import { toast } from "sonner";

interface AirdropOperation {
  id: string;
  operation_code: string;
  operation_name: string;
  target_location: string;
  coordinates?: any;
  scheduled_date: string;
  actual_date?: string;
  aircraft_type: string;
  pilot_assigned?: string;
  cargo_manifest?: any[];
  total_weight: number;
  drop_zone_conditions?: string;
  weather_status: string;
  status: string;
  priority_level: string;
  recipient_unit: string;
  ground_contact_info?: any;
  recovery_team?: string[];
  mission_success_rate: number;
  theater_id?: string;
  created_at: string;
  updated_at: string;
}

export function AirdropCoordination() {
  const { data: operations, loading, create, update, remove } = useCRUD({ 
    table: 'airdrop_operations',
    orderBy: { column: 'scheduled_date', ascending: true }
  });
  const canEdit = true;
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingOperation, setEditingOperation] = useState<AirdropOperation | null>(null);
  const [formData, setFormData] = useState({
    operation_code: '',
    operation_name: '',
    target_location: '',
    scheduled_date: '',
    aircraft_type: '',
    total_weight: 0,
    weather_status: 'pending',
    status: 'planning',
    priority_level: 'normal',
    recipient_unit: '',
    drop_zone_conditions: ''
  });

  const resetForm = () => {
    setFormData({
      operation_code: '',
      operation_name: '',
      target_location: '',
      scheduled_date: '',
      aircraft_type: '',
      total_weight: 0,
      weather_status: 'pending',
      status: 'planning',
      priority_level: 'normal',
      recipient_unit: '',
      drop_zone_conditions: ''
    });
    setEditingOperation(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingOperation) {
        await update(editingOperation.id, formData);
        toast.success("Operasi airdrop berhasil diperbarui");
      } else {
        await create(formData);
        toast.success("Operasi airdrop berhasil ditambahkan");
      }
      setIsDialogOpen(false);
      resetForm();
    } catch (error) {
      toast.error("Terjadi kesalahan saat menyimpan data");
    }
  };

  const handleEdit = (operation: AirdropOperation) => {
    setEditingOperation(operation);
    setFormData({
      operation_code: operation.operation_code,
      operation_name: operation.operation_name,
      target_location: operation.target_location,
      scheduled_date: operation.scheduled_date ? new Date(operation.scheduled_date).toISOString().slice(0, 16) : '',
      aircraft_type: operation.aircraft_type,
      total_weight: operation.total_weight,
      weather_status: operation.weather_status,
      status: operation.status,
      priority_level: operation.priority_level,
      recipient_unit: operation.recipient_unit,
      drop_zone_conditions: operation.drop_zone_conditions || ''
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus operasi airdrop ini?')) {
      try {
        await remove(id);
        toast.success("Operasi airdrop berhasil dihapus");
      } catch (error) {
        toast.error("Terjadi kesalahan saat menghapus data");
      }
    }
  };

  const getPriorityBadge = (priority: string) => {
    const priorityConfig = {
      critical: { label: 'Kritis', color: 'bg-red-500' },
      high: { label: 'Tinggi', color: 'bg-orange-500' },
      normal: { label: 'Normal', color: 'bg-blue-500' },
      low: { label: 'Rendah', color: 'bg-gray-500' }
    };
    
    const config = priorityConfig[priority as keyof typeof priorityConfig] || priorityConfig.normal;
    return <Badge className={config.color}>{config.label}</Badge>;
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      planning: { label: 'Perencanaan', color: 'bg-gray-500' },
      scheduled: { label: 'Terjadwal', color: 'bg-blue-500' },
      in_progress: { label: 'Berlangsung', color: 'bg-yellow-500' },
      completed: { label: 'Selesai', color: 'bg-green-500' },
      cancelled: { label: 'Dibatalkan', color: 'bg-red-500' },
      delayed: { label: 'Tertunda', color: 'bg-orange-500' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.planning;
    return <Badge variant="outline" className={config.color}>{config.label}</Badge>;
  };

  const getWeatherStatus = (weather: string) => {
    const weatherConfig = {
      clear: '☀️ Cerah',
      cloudy: '☁️ Berawan',
      stormy: '⛈️ Badai',
      pending: '🌤️ Menunggu'
    };
    
    return weatherConfig[weather as keyof typeof weatherConfig] || weather;
  };

  if (loading) {
    return <div className="p-4">Loading airdrop operations...</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Plane className="h-5 w-5" />
                Koordinasi Airdrop Medis
              </CardTitle>
              <CardDescription>
                Manajemen operasi airdrop supply medis TNI AU
              </CardDescription>
            </div>
            {canEdit && (
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={resetForm}>
                    <Plus className="h-4 w-4 mr-1" />
                    Tambah Operasi Airdrop
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>
                      {editingOperation ? 'Edit' : 'Tambah'} Operasi Airdrop
                    </DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="operation_code">Kode Operasi</Label>
                        <Input
                          id="operation_code"
                          value={formData.operation_code}
                          onChange={(e) => setFormData({...formData, operation_code: e.target.value})}
                          placeholder="AIRDROP-001"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="operation_name">Nama Operasi</Label>
                        <Input
                          id="operation_name"
                          value={formData.operation_name}
                          onChange={(e) => setFormData({...formData, operation_name: e.target.value})}
                          placeholder="Operasi Medical Supply Alpha"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="target_location">Lokasi Target</Label>
                      <Input
                        id="target_location"
                        value={formData.target_location}
                        onChange={(e) => setFormData({...formData, target_location: e.target.value})}
                        placeholder="Drop Zone Alpha"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="scheduled_date">Tanggal Terjadwal</Label>
                        <Input
                          id="scheduled_date"
                          type="datetime-local"
                          value={formData.scheduled_date}
                          onChange={(e) => setFormData({...formData, scheduled_date: e.target.value})}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="aircraft_type">Tipe Pesawat</Label>
                        <Select 
                          value={formData.aircraft_type} 
                          onValueChange={(value) => setFormData({...formData, aircraft_type: value})}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih pesawat" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="C-130 Hercules">C-130 Hercules</SelectItem>
                            <SelectItem value="CN-235">CN-235</SelectItem>
                            <SelectItem value="C-212 Aviocar">C-212 Aviocar</SelectItem>
                            <SelectItem value="Casa 212">Casa 212</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="total_weight">Total Berat (kg)</Label>
                        <Input
                          id="total_weight"
                          type="number"
                          value={formData.total_weight}
                          onChange={(e) => setFormData({...formData, total_weight: parseFloat(e.target.value) || 0})}
                          min="0"
                          step="0.1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="recipient_unit">Unit Penerima</Label>
                        <Input
                          id="recipient_unit"
                          value={formData.recipient_unit}
                          onChange={(e) => setFormData({...formData, recipient_unit: e.target.value})}
                          placeholder="Batalyon Medis A"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="priority_level">Prioritas</Label>
                        <Select 
                          value={formData.priority_level} 
                          onValueChange={(value) => setFormData({...formData, priority_level: value})}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="critical">Kritis</SelectItem>
                            <SelectItem value="high">Tinggi</SelectItem>
                            <SelectItem value="normal">Normal</SelectItem>
                            <SelectItem value="low">Rendah</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="status">Status</Label>
                        <Select 
                          value={formData.status} 
                          onValueChange={(value) => setFormData({...formData, status: value})}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="planning">Perencanaan</SelectItem>
                            <SelectItem value="scheduled">Terjadwal</SelectItem>
                            <SelectItem value="in_progress">Berlangsung</SelectItem>
                            <SelectItem value="completed">Selesai</SelectItem>
                            <SelectItem value="cancelled">Dibatalkan</SelectItem>
                            <SelectItem value="delayed">Tertunda</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="weather_status">Cuaca</Label>
                        <Select 
                          value={formData.weather_status} 
                          onValueChange={(value) => setFormData({...formData, weather_status: value})}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="clear">Cerah</SelectItem>
                            <SelectItem value="cloudy">Berawan</SelectItem>
                            <SelectItem value="stormy">Badai</SelectItem>
                            <SelectItem value="pending">Menunggu</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="drop_zone_conditions">Kondisi Drop Zone</Label>
                      <Textarea
                        id="drop_zone_conditions"
                        value={formData.drop_zone_conditions}
                        onChange={(e) => setFormData({...formData, drop_zone_conditions: e.target.value})}
                        placeholder="Deskripsi kondisi area pendaratan..."
                        rows={3}
                      />
                    </div>

                    <div className="flex justify-end space-x-2 pt-4">
                      <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                        Batal
                      </Button>
                      <Button type="submit">
                        {editingOperation ? 'Update' : 'Simpan'}
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
                <TableHead>Target</TableHead>
                <TableHead>Jadwal</TableHead>
                <TableHead>Pesawat</TableHead>
                <TableHead>Cargo</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Prioritas</TableHead>
                {canEdit && <TableHead>Aksi</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {operations?.map((operation: AirdropOperation) => (
                <TableRow key={operation.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{operation.operation_code}</div>
                      <div className="text-sm text-muted-foreground">{operation.operation_name}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <div>
                        <div>{operation.target_location}</div>
                        <div className="text-xs text-gray-500">{operation.recipient_unit}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <div>
                        <div className="text-sm">
                          {new Date(operation.scheduled_date).toLocaleDateString('id-ID')}
                        </div>
                        <div className="text-xs text-gray-500">
                          {new Date(operation.scheduled_date).toLocaleTimeString('id-ID', { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Plane className="h-4 w-4 text-gray-500" />
                      {operation.aircraft_type}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Package className="h-4 w-4 text-gray-500" />
                      <div>
                        <div className="font-medium">{operation.total_weight} kg</div>
                        <div className="text-xs text-gray-500">
                          {getWeatherStatus(operation.weather_status)}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(operation.status)}
                  </TableCell>
                  <TableCell>
                    {getPriorityBadge(operation.priority_level)}
                  </TableCell>
                  {canEdit && (
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(operation)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(operation.id)}
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