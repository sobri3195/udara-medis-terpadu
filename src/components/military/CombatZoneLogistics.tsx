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
import { AlertTriangle, Shield, Package, Clock, Plus, Edit, Trash2 } from 'lucide-react';
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

interface CombatZoneSupply {
  id: string;
  supply_code: string;
  zone_designation: string;
  threat_level: string;
  item_id: string;
  quantity: number;
  unit_price: number;
  special_handling: boolean;
  armored_transport_required: boolean;
  expiry_date?: string;
  storage_conditions?: string;
  assigned_medic?: string;
  last_resupply?: string;
  consumption_rate: number;
  critical_shortage_threshold: number;
  evacuation_priority: number;
  theater_id?: string;
  created_at: string;
  updated_at: string;
}

export function CombatZoneLogistics() {
  const { data: supplies, loading, create, update, remove } = useCRUD({ 
    table: 'combat_zone_supplies',
    orderBy: { column: 'evacuation_priority', ascending: true }
  });
  const { user, canManage } = useAuth();
  const canEdit = canManage('military_operations');
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSupply, setEditingSupply] = useState<CombatZoneSupply | null>(null);
  const [formData, setFormData] = useState({
    supply_code: '',
    zone_designation: '',
    threat_level: 'low',
    item_id: '',
    quantity: 0,
    unit_price: 0,
    special_handling: false,
    armored_transport_required: false,
    expiry_date: '',
    storage_conditions: '',
    consumption_rate: 0,
    critical_shortage_threshold: 10,
    evacuation_priority: 5
  });

  const resetForm = () => {
    setFormData({
      supply_code: '',
      zone_designation: '',
      threat_level: 'low',
      item_id: '',
      quantity: 0,
      unit_price: 0,
      special_handling: false,
      armored_transport_required: false,
      expiry_date: '',
      storage_conditions: '',
      consumption_rate: 0,
      critical_shortage_threshold: 10,
      evacuation_priority: 5
    });
    setEditingSupply(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingSupply) {
        await update(editingSupply.id, formData);
        toast.success("Supply zone tempur berhasil diperbarui");
      } else {
        await create(formData);
        toast.success("Supply zone tempur berhasil ditambahkan");
      }
      setIsDialogOpen(false);
      resetForm();
    } catch (error) {
      toast.error("Terjadi kesalahan saat menyimpan data");
    }
  };

  const handleEdit = (supply: CombatZoneSupply) => {
    setEditingSupply(supply);
    setFormData({
      supply_code: supply.supply_code,
      zone_designation: supply.zone_designation,
      threat_level: supply.threat_level,
      item_id: supply.item_id,
      quantity: supply.quantity,
      unit_price: supply.unit_price,
      special_handling: supply.special_handling,
      armored_transport_required: supply.armored_transport_required,
      expiry_date: supply.expiry_date ? new Date(supply.expiry_date).toISOString().split('T')[0] : '',
      storage_conditions: supply.storage_conditions || '',
      consumption_rate: supply.consumption_rate,
      critical_shortage_threshold: supply.critical_shortage_threshold,
      evacuation_priority: supply.evacuation_priority
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus supply zone tempur ini?')) {
      try {
        await remove(id);
        toast.success("Supply zone tempur berhasil dihapus");
      } catch (error) {
        toast.error("Terjadi kesalahan saat menghapus data");
      }
    }
  };

  const getThreatLevelBadge = (level: string) => {
    const levelConfig = {
      low: { label: 'Rendah', color: 'bg-green-500' },
      medium: { label: 'Sedang', color: 'bg-yellow-500' },
      high: { label: 'Tinggi', color: 'bg-orange-500' },
      critical: { label: 'Kritis', color: 'bg-red-500' }
    };
    
    const config = levelConfig[level as keyof typeof levelConfig] || levelConfig.low;
    return <Badge className={config.color}>{config.label}</Badge>;
  };

  const getPriorityColor = (priority: number) => {
    if (priority <= 2) return 'text-red-600 font-bold';
    if (priority <= 4) return 'text-orange-600 font-medium';
    if (priority <= 6) return 'text-blue-600';
    return 'text-gray-600';
  };

  const getStockStatus = (quantity: number, threshold: number) => {
    if (quantity <= threshold) {
      return <Badge className="bg-red-500">Stok Kritis</Badge>;
    }
    if (quantity <= threshold * 2) {
      return <Badge className="bg-orange-500">Stok Rendah</Badge>;
    }
    return <Badge className="bg-green-500">Stok Aman</Badge>;
  };

  if (loading) {
    return <div className="p-4">Loading combat zone supplies...</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Logistik Zone Tempur
              </CardTitle>
              <CardDescription>
                Manajemen supply medis di zone operasi dan zone tempur
              </CardDescription>
            </div>
            {canEdit && (
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={resetForm}>
                    <Plus className="h-4 w-4 mr-1" />
                    Tambah Supply Zone Tempur
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>
                      {editingSupply ? 'Edit' : 'Tambah'} Supply Zone Tempur
                    </DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="supply_code">Kode Supply</Label>
                        <Input
                          id="supply_code"
                          value={formData.supply_code}
                          onChange={(e) => setFormData({...formData, supply_code: e.target.value})}
                          placeholder="CZ-MED-001"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="zone_designation">Designasi Zone</Label>
                        <Input
                          id="zone_designation"
                          value={formData.zone_designation}
                          onChange={(e) => setFormData({...formData, zone_designation: e.target.value})}
                          placeholder="Alpha-7 Combat Zone"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="threat_level">Level Ancaman</Label>
                        <Select 
                          value={formData.threat_level} 
                          onValueChange={(value) => setFormData({...formData, threat_level: value})}
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
                        <Label htmlFor="item_id">ID Item</Label>
                        <Input
                          id="item_id"
                          value={formData.item_id}
                          onChange={(e) => setFormData({...formData, item_id: e.target.value})}
                          placeholder="Item inventory ID"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="quantity">Kuantitas</Label>
                        <Input
                          id="quantity"
                          type="number"
                          value={formData.quantity}
                          onChange={(e) => setFormData({...formData, quantity: parseInt(e.target.value) || 0})}
                          min="0"
                        />
                      </div>
                      <div>
                        <Label htmlFor="unit_price">Harga Satuan</Label>
                        <Input
                          id="unit_price"
                          type="number"
                          value={formData.unit_price}
                          onChange={(e) => setFormData({...formData, unit_price: parseFloat(e.target.value) || 0})}
                          min="0"
                          step="0.01"
                        />
                      </div>
                      <div>
                        <Label htmlFor="consumption_rate">Tingkat Konsumsi</Label>
                        <Input
                          id="consumption_rate"
                          type="number"
                          value={formData.consumption_rate}
                          onChange={(e) => setFormData({...formData, consumption_rate: parseFloat(e.target.value) || 0})}
                          min="0"
                          step="0.1"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="critical_shortage_threshold">Batas Kritis</Label>
                        <Input
                          id="critical_shortage_threshold"
                          type="number"
                          value={formData.critical_shortage_threshold}
                          onChange={(e) => setFormData({...formData, critical_shortage_threshold: parseInt(e.target.value) || 10})}
                          min="0"
                        />
                      </div>
                      <div>
                        <Label htmlFor="evacuation_priority">Prioritas Evakuasi (1-10)</Label>
                        <Input
                          id="evacuation_priority"
                          type="number"
                          value={formData.evacuation_priority}
                          onChange={(e) => setFormData({...formData, evacuation_priority: parseInt(e.target.value) || 5})}
                          min="1"
                          max="10"
                        />
                      </div>
                    </div>

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
                      <Label htmlFor="storage_conditions">Kondisi Penyimpanan</Label>
                      <Textarea
                        id="storage_conditions"
                        value={formData.storage_conditions}
                        onChange={(e) => setFormData({...formData, storage_conditions: e.target.value})}
                        placeholder="Deskripsi kondisi penyimpanan khusus..."
                        rows={3}
                      />
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="special_handling"
                          checked={formData.special_handling}
                          onCheckedChange={(checked) => setFormData({...formData, special_handling: checked})}
                        />
                        <Label htmlFor="special_handling">Penanganan Khusus</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="armored_transport_required"
                          checked={formData.armored_transport_required}
                          onCheckedChange={(checked) => setFormData({...formData, armored_transport_required: checked})}
                        />
                        <Label htmlFor="armored_transport_required">Memerlukan Kendaraan Lapis Baja</Label>
                      </div>
                    </div>

                    <div className="flex justify-end space-x-2 pt-4">
                      <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                        Batal
                      </Button>
                      <Button type="submit">
                        {editingSupply ? 'Update' : 'Simpan'}
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
                <TableHead>Kode & Zone</TableHead>
                <TableHead>Item</TableHead>
                <TableHead>Stok</TableHead>
                <TableHead>Ancaman</TableHead>
                <TableHead>Prioritas</TableHead>
                <TableHead>Transport</TableHead>
                <TableHead>Status</TableHead>
                {canEdit && <TableHead>Aksi</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {supplies?.map((supply: CombatZoneSupply) => (
                <TableRow key={supply.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{supply.supply_code}</div>
                      <div className="text-sm text-muted-foreground">{supply.zone_designation}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Package className="h-4 w-4 text-gray-500" />
                      <div>
                        <div>{supply.item_id}</div>
                        {supply.special_handling && (
                          <Badge variant="outline" className="text-xs mt-1">
                            Penanganan Khusus
                          </Badge>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{supply.quantity} unit</div>
                      <div className="text-xs text-gray-500">
                        Konsumsi: {supply.consumption_rate}/hari
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {getThreatLevelBadge(supply.threat_level)}
                  </TableCell>
                  <TableCell>
                    <div className={`font-bold text-lg ${getPriorityColor(supply.evacuation_priority)}`}>
                      #{supply.evacuation_priority}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      {supply.armored_transport_required && (
                        <Badge className="bg-red-100 text-red-800 text-xs">
                          <Shield className="h-3 w-3 mr-1" />
                          Lapis Baja
                        </Badge>
                      )}
                      {supply.expiry_date && new Date(supply.expiry_date) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) && (
                        <Badge className="bg-orange-100 text-orange-800 text-xs">
                          <Clock className="h-3 w-3 mr-1" />
                          Segera Expired
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    {getStockStatus(supply.quantity, supply.critical_shortage_threshold)}
                  </TableCell>
                  {canEdit && (
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(supply)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(supply.id)}
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