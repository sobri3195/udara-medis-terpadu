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
import { Progress } from "@/components/ui/progress";
import { Target, MapPin, Users, Calendar, Plus, Edit, Trash2, DollarSign } from 'lucide-react';
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

interface TheaterOperation {
  id: string;
  theater_code: string;
  theater_name: string;
  operation_type: string;
  start_date: string;
  end_date?: string;
  status: string;
  commander_id: string;
  geographic_bounds?: any;
  participating_units?: string[];
  logistics_requirements?: any;
  supply_chain_priorities?: string[];
  risk_assessment_level: string;
  communication_protocols?: any;
  evacuation_procedures?: string;
  budget_allocated: number;
  budget_spent: number;
  created_at: string;
  updated_at: string;
}

export function TheaterOperations() {
  const { data: operations, loading, create, update, remove } = useCRUD({ 
    table: 'theater_operations',
    orderBy: { column: 'start_date', ascending: false }
  });
  const { user } = useAuth();
  const canEdit = true; // For now, allow all authenticated users to edit
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingOperation, setEditingOperation] = useState<TheaterOperation | null>(null);
  const [formData, setFormData] = useState({
    theater_code: '',
    theater_name: '',
    operation_type: 'humanitarian',
    start_date: '',
    end_date: '',
    status: 'active',
    commander_id: '',
    risk_assessment_level: 'medium',
    evacuation_procedures: '',
    budget_allocated: 0,
    budget_spent: 0
  });

  const resetForm = () => {
    setFormData({
      theater_code: '',
      theater_name: '',
      operation_type: 'humanitarian',
      start_date: '',
      end_date: '',
      status: 'active',
      commander_id: '',
      risk_assessment_level: 'medium',
      evacuation_procedures: '',
      budget_allocated: 0,
      budget_spent: 0
    });
    setEditingOperation(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingOperation) {
        await update(editingOperation.id, formData);
        toast.success("Operasi theater berhasil diperbarui");
      } else {
        await create(formData);
        toast.success("Operasi theater berhasil ditambahkan");
      }
      setIsDialogOpen(false);
      resetForm();
    } catch (error) {
      toast.error("Terjadi kesalahan saat menyimpan data");
    }
  };

  const handleEdit = (operation: TheaterOperation) => {
    setEditingOperation(operation);
    setFormData({
      theater_code: operation.theater_code,
      theater_name: operation.theater_name,
      operation_type: operation.operation_type,
      start_date: operation.start_date ? new Date(operation.start_date).toISOString().split('T')[0] : '',
      end_date: operation.end_date ? new Date(operation.end_date).toISOString().split('T')[0] : '',
      status: operation.status,
      commander_id: operation.commander_id,
      risk_assessment_level: operation.risk_assessment_level,
      evacuation_procedures: operation.evacuation_procedures || '',
      budget_allocated: operation.budget_allocated,
      budget_spent: operation.budget_spent
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus operasi theater ini?')) {
      try {
        await remove(id);
        toast.success("Operasi theater berhasil dihapus");
      } catch (error) {
        toast.error("Terjadi kesalahan saat menghapus data");
      }
    }
  };

  const getOperationTypeBadge = (type: string) => {
    const typeConfig = {
      humanitarian: { label: 'Kemanusiaan', color: 'bg-green-500' },
      combat_support: { label: 'Dukungan Tempur', color: 'bg-red-500' },
      medical_mission: { label: 'Misi Medis', color: 'bg-blue-500' },
      disaster_response: { label: 'Tanggap Bencana', color: 'bg-orange-500' },
      peacekeeping: { label: 'Penjaga Perdamaian', color: 'bg-purple-500' },
      training: { label: 'Latihan', color: 'bg-gray-500' }
    };
    
    const config = typeConfig[type as keyof typeof typeConfig] || typeConfig.humanitarian;
    return <Badge className={config.color}>{config.label}</Badge>;
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      planning: { label: 'Perencanaan', color: 'bg-gray-500' },
      active: { label: 'Aktif', color: 'bg-green-500' },
      suspended: { label: 'Tertunda', color: 'bg-yellow-500' },
      completed: { label: 'Selesai', color: 'bg-blue-500' },
      cancelled: { label: 'Dibatalkan', color: 'bg-red-500' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.planning;
    return <Badge variant="outline" className={config.color}>{config.label}</Badge>;
  };

  const getRiskLevelBadge = (level: string) => {
    const levelConfig = {
      low: { label: 'Rendah', color: 'bg-green-500' },
      medium: { label: 'Sedang', color: 'bg-yellow-500' },
      high: { label: 'Tinggi', color: 'bg-orange-500' },
      critical: { label: 'Kritis', color: 'bg-red-500' }
    };
    
    const config = levelConfig[level as keyof typeof levelConfig] || levelConfig.medium;
    return <Badge className={config.color}>{config.label}</Badge>;
  };

  const calculateBudgetProgress = (spent: number, allocated: number) => {
    if (allocated === 0) return 0;
    return Math.min(100, (spent / allocated) * 100);
  };

  const getBudgetProgressColor = (progress: number) => {
    if (progress > 90) return 'bg-red-500';
    if (progress > 75) return 'bg-orange-500';
    if (progress > 50) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  if (loading) {
    return <div className="p-4">Loading theater operations...</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Operasi Multi-Theater
              </CardTitle>
              <CardDescription>
                Manajemen operasi medis multi-theater TNI AU
              </CardDescription>
            </div>
            {canEdit && (
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={resetForm}>
                    <Plus className="h-4 w-4 mr-1" />
                    Tambah Operasi Theater
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>
                      {editingOperation ? 'Edit' : 'Tambah'} Operasi Theater
                    </DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="theater_code">Kode Theater</Label>
                        <Input
                          id="theater_code"
                          value={formData.theater_code}
                          onChange={(e) => setFormData({...formData, theater_code: e.target.value})}
                          placeholder="THEATER-001"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="theater_name">Nama Theater</Label>
                        <Input
                          id="theater_name"
                          value={formData.theater_name}
                          onChange={(e) => setFormData({...formData, theater_name: e.target.value})}
                          placeholder="Operasi Medis Nusantara"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="operation_type">Tipe Operasi</Label>
                        <Select 
                          value={formData.operation_type} 
                          onValueChange={(value) => setFormData({...formData, operation_type: value})}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="humanitarian">Kemanusiaan</SelectItem>
                            <SelectItem value="combat_support">Dukungan Tempur</SelectItem>
                            <SelectItem value="medical_mission">Misi Medis</SelectItem>
                            <SelectItem value="disaster_response">Tanggap Bencana</SelectItem>
                            <SelectItem value="peacekeeping">Penjaga Perdamaian</SelectItem>
                            <SelectItem value="training">Latihan</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="commander_id">ID Komandan</Label>
                        <Input
                          id="commander_id"
                          value={formData.commander_id}
                          onChange={(e) => setFormData({...formData, commander_id: e.target.value})}
                          placeholder="CMDR-001"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="start_date">Tanggal Mulai</Label>
                        <Input
                          id="start_date"
                          type="date"
                          value={formData.start_date}
                          onChange={(e) => setFormData({...formData, start_date: e.target.value})}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="end_date">Tanggal Selesai</Label>
                        <Input
                          id="end_date"
                          type="date"
                          value={formData.end_date}
                          onChange={(e) => setFormData({...formData, end_date: e.target.value})}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
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
                            <SelectItem value="active">Aktif</SelectItem>
                            <SelectItem value="suspended">Tertunda</SelectItem>
                            <SelectItem value="completed">Selesai</SelectItem>
                            <SelectItem value="cancelled">Dibatalkan</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="risk_assessment_level">Level Risiko</Label>
                        <Select 
                          value={formData.risk_assessment_level} 
                          onValueChange={(value) => setFormData({...formData, risk_assessment_level: value})}
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
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="budget_allocated">Budget Dialokasikan</Label>
                        <Input
                          id="budget_allocated"
                          type="number"
                          value={formData.budget_allocated}
                          onChange={(e) => setFormData({...formData, budget_allocated: parseFloat(e.target.value) || 0})}
                          min="0"
                          step="1000000"
                        />
                      </div>
                      <div>
                        <Label htmlFor="budget_spent">Budget Terpakai</Label>
                        <Input
                          id="budget_spent"
                          type="number"
                          value={formData.budget_spent}
                          onChange={(e) => setFormData({...formData, budget_spent: parseFloat(e.target.value) || 0})}
                          min="0"
                          step="1000000"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="evacuation_procedures">Prosedur Evakuasi</Label>
                      <Textarea
                        id="evacuation_procedures"
                        value={formData.evacuation_procedures}
                        onChange={(e) => setFormData({...formData, evacuation_procedures: e.target.value})}
                        placeholder="Deskripsi prosedur evakuasi medis..."
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
                <TableHead>Tipe</TableHead>
                <TableHead>Periode</TableHead>
                <TableHead>Komandan</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Risiko</TableHead>
                <TableHead>Budget</TableHead>
                {canEdit && <TableHead>Aksi</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {operations?.map((operation: TheaterOperation) => (
                <TableRow key={operation.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{operation.theater_code}</div>
                      <div className="text-sm text-muted-foreground">{operation.theater_name}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {getOperationTypeBadge(operation.operation_type)}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <div>
                        <div className="text-sm">
                          {new Date(operation.start_date).toLocaleDateString('id-ID')}
                        </div>
                        {operation.end_date && (
                          <div className="text-xs text-gray-500">
                            s/d {new Date(operation.end_date).toLocaleDateString('id-ID')}
                          </div>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4 text-gray-500" />
                      {operation.commander_id}
                    </div>
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(operation.status)}
                  </TableCell>
                  <TableCell>
                    {getRiskLevelBadge(operation.risk_assessment_level)}
                  </TableCell>
                  <TableCell>
                    <div className="space-y-2">
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4 text-gray-500" />
                        <div>
                          <div className="text-xs font-medium">
                            {formatCurrency(operation.budget_spent)}
                          </div>
                          <div className="text-xs text-gray-500">
                            dari {formatCurrency(operation.budget_allocated)}
                          </div>
                        </div>
                      </div>
                      <Progress 
                        value={calculateBudgetProgress(operation.budget_spent, operation.budget_allocated)}
                        className="h-2"
                      />
                      <div className="text-xs text-gray-500">
                        {calculateBudgetProgress(operation.budget_spent, operation.budget_allocated).toFixed(1)}% terpakai
                      </div>
                    </div>
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