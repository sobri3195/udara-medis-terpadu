import { useState } from 'react';
import { Plus, Edit, Trash2, Save, X, Package, Truck, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { useCRUD } from '@/hooks/useCRUD';

interface Distribution {
  id: string;
  item_id?: string;
  quantity: number;
  destination: string;
  status?: string;
  distribution_date?: string;
  requested_by?: string;
  approved_by?: string;
  created_at: string;
  updated_at: string;
}

const DistributionCRUD = () => {
  const { data: distributions, loading, create, update, remove } = useCRUD({
    table: 'distributions',
    orderBy: { column: 'created_at', ascending: false }
  });
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    item_name: '',
    quantity: 0,
    destination: '',
    status: 'pending',
    distribution_date: '',
    requested_by: '',
    approved_by: ''
  });

  const canEdit = true;

  const resetForm = () => {
    setFormData({
      item_name: '',
      quantity: 0,
      destination: '',
      status: 'pending',
      distribution_date: '',
      requested_by: '',
      approved_by: ''
    });
    setEditingId(null);
  };

  const handleSubmit = async () => {
    const submitData = {
      quantity: formData.quantity,
      destination: formData.destination,
      status: formData.status,
      distribution_date: formData.distribution_date ? new Date(formData.distribution_date).toISOString() : null,
      requested_by: formData.requested_by || null,
      approved_by: formData.approved_by || null
    };

    if (editingId) {
      await update(editingId, submitData);
    } else {
      await create(submitData);
    }
    setIsDialogOpen(false);
    resetForm();
  };

  const handleEdit = (distribution: Distribution) => {
    setFormData({
      item_name: '',
      quantity: distribution.quantity,
      destination: distribution.destination,
      status: distribution.status || 'pending',
      distribution_date: distribution.distribution_date ? 
        new Date(distribution.distribution_date).toISOString().slice(0, 16) : '',
      requested_by: distribution.requested_by || '',
      approved_by: distribution.approved_by || ''
    });
    setEditingId(distribution.id);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus distribusi ini?')) {
      await remove(id);
    }
  };

  const getStatusBadge = (status?: string) => {
    const statusConfig = {
      pending: { variant: 'secondary' as const, label: 'Menunggu' },
      approved: { variant: 'default' as const, label: 'Disetujui' },
      shipped: { variant: 'default' as const, label: 'Dikirim' },
      delivered: { variant: 'outline' as const, label: 'Terkirim' },
      cancelled: { variant: 'destructive' as const, label: 'Dibatalkan' }
    };
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const formatDateTime = (dateTime?: string) => {
    if (!dateTime) return 'Belum ditentukan';
    return new Date(dateTime).toLocaleString('id-ID', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Manajemen Distribusi Logistik</CardTitle>
        {canEdit && (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm}>
                <Plus className="h-4 w-4 mr-2" />
                Tambah Distribusi
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>
                  {editingId ? 'Edit Distribusi' : 'Tambah Distribusi'}
                </DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="item_name">Nama Item</Label>
                    <Input
                      id="item_name"
                      value={formData.item_name}
                      onChange={(e) => setFormData(prev => ({ ...prev, item_name: e.target.value }))}
                      placeholder="Nama item yang didistribusikan"
                    />
                  </div>
                  <div>
                    <Label htmlFor="quantity">Jumlah</Label>
                    <Input
                      id="quantity"
                      type="number"
                      value={formData.quantity}
                      onChange={(e) => setFormData(prev => ({ ...prev, quantity: Number(e.target.value) }))}
                      placeholder="Jumlah item"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="destination">Tujuan</Label>
                  <Input
                    id="destination"
                    value={formData.destination}
                    onChange={(e) => setFormData(prev => ({ ...prev, destination: e.target.value }))}
                    placeholder="Lokasi tujuan distribusi"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="status">Status</Label>
                    <Select value={formData.status} onValueChange={(value) => setFormData(prev => ({ ...prev, status: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Menunggu</SelectItem>
                        <SelectItem value="approved">Disetujui</SelectItem>
                        <SelectItem value="shipped">Dikirim</SelectItem>
                        <SelectItem value="delivered">Terkirim</SelectItem>
                        <SelectItem value="cancelled">Dibatalkan</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="distribution_date">Tanggal Distribusi</Label>
                    <Input
                      id="distribution_date"
                      type="datetime-local"
                      value={formData.distribution_date}
                      onChange={(e) => setFormData(prev => ({ ...prev, distribution_date: e.target.value }))}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="requested_by">Diminta Oleh</Label>
                    <Input
                      id="requested_by"
                      value={formData.requested_by}
                      onChange={(e) => setFormData(prev => ({ ...prev, requested_by: e.target.value }))}
                      placeholder="Nama peminta"
                    />
                  </div>
                  <div>
                    <Label htmlFor="approved_by">Disetujui Oleh</Label>
                    <Input
                      id="approved_by"
                      value={formData.approved_by}
                      onChange={(e) => setFormData(prev => ({ ...prev, approved_by: e.target.value }))}
                      placeholder="Nama penyetuju"
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
                <TableHead>ID Distribusi</TableHead>
                <TableHead>Jumlah</TableHead>
                <TableHead>Tujuan</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Tanggal Distribusi</TableHead>
                <TableHead>Peminta</TableHead>
                {canEdit && <TableHead>Aksi</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {distributions.map((distribution: Distribution) => (
                <TableRow key={distribution.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <Package className="h-4 w-4 text-blue-600" />
                      {distribution.id.slice(-8)}
                    </div>
                  </TableCell>
                  <TableCell>{distribution.quantity}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3 text-gray-500" />
                      {distribution.destination}
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(distribution.status)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm">
                      <Truck className="h-3 w-3 text-gray-500" />
                      {formatDateTime(distribution.distribution_date)}
                    </div>
                  </TableCell>
                  <TableCell>
                    {distribution.requested_by || 'Tidak ada'}
                  </TableCell>
                  {canEdit && (
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleEdit(distribution)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => handleDelete(distribution.id)}>
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

export default DistributionCRUD;