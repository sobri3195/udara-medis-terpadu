import { useState } from 'react';
import { Plus, Edit, Trash2, Save, X, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { useCRUD } from '@/hooks/useCRUD';
import { useAuth } from '@/hooks/useAuth';

interface Personnel {
  id: string;
  name: string;
  rank: string;
  position: string;
  unit: string;
  status: string;
  contact_info: {
    phone?: string;
    email?: string;
  };
  created_at: string;
  updated_at: string;
}

const PersonnelCRUD = () => {
  const { data: personnel, loading, create, update, remove } = useCRUD({
    table: 'personnel',
    orderBy: { column: 'name', ascending: true }
  });
  const { canManage } = useAuth();
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    rank: '',
    position: '',
    unit: '',
    status: 'active',
    phone: '',
    email: ''
  });

  const canEdit = canManage('personnel');

  const resetForm = () => {
    setFormData({
      name: '',
      rank: '',
      position: '',
      unit: '',
      status: 'active',
      phone: '',
      email: ''
    });
    setEditingId(null);
  };

  const handleSubmit = async () => {
    const submitData = {
      name: formData.name,
      rank: formData.rank,
      position: formData.position,
      unit: formData.unit,
      status: formData.status,
      contact_info: {
        phone: formData.phone,
        email: formData.email
      }
    };

    if (editingId) {
      await update(editingId, submitData);
    } else {
      await create(submitData);
    }
    setIsDialogOpen(false);
    resetForm();
  };

  const handleEdit = (person: Personnel) => {
    setFormData({
      name: person.name,
      rank: person.rank,
      position: person.position,
      unit: person.unit,
      status: person.status,
      phone: person.contact_info?.phone || '',
      email: person.contact_info?.email || ''
    });
    setEditingId(person.id);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus personel ini?')) {
      await remove(id);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { variant: 'default' as const, label: 'Aktif' },
      inactive: { variant: 'secondary' as const, label: 'Non-Aktif' },
      on_leave: { variant: 'secondary' as const, label: 'Cuti' },
      retired: { variant: 'secondary' as const, label: 'Pensiun' }
    };
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.active;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Manajemen Personel</CardTitle>
        {canEdit && (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm}>
                <Plus className="h-4 w-4 mr-2" />
                Tambah Personel
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>
                  {editingId ? 'Edit Personel' : 'Tambah Personel'}
                </DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Nama Lengkap</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Nama lengkap"
                    />
                  </div>
                  <div>
                    <Label htmlFor="rank">Pangkat</Label>
                    <Input
                      id="rank"
                      value={formData.rank}
                      onChange={(e) => setFormData(prev => ({ ...prev, rank: e.target.value }))}
                      placeholder="Pangkat"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="position">Jabatan</Label>
                    <Input
                      id="position"
                      value={formData.position}
                      onChange={(e) => setFormData(prev => ({ ...prev, position: e.target.value }))}
                      placeholder="Jabatan"
                    />
                  </div>
                  <div>
                    <Label htmlFor="unit">Satuan</Label>
                    <Input
                      id="unit"
                      value={formData.unit}
                      onChange={(e) => setFormData(prev => ({ ...prev, unit: e.target.value }))}
                      placeholder="Satuan"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="status">Status</Label>
                    <Select value={formData.status} onValueChange={(value) => setFormData(prev => ({ ...prev, status: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Aktif</SelectItem>
                        <SelectItem value="inactive">Non-Aktif</SelectItem>
                        <SelectItem value="on_leave">Cuti</SelectItem>
                        <SelectItem value="retired">Pensiun</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="phone">Telepon</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="Nomor telepon"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="Email"
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
                <TableHead>Pangkat</TableHead>
                <TableHead>Jabatan</TableHead>
                <TableHead>Satuan</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Kontak</TableHead>
                {canEdit && <TableHead>Aksi</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {personnel.map((person: Personnel) => (
                <TableRow key={person.id}>
                  <TableCell className="font-medium">{person.name}</TableCell>
                  <TableCell>{person.rank}</TableCell>
                  <TableCell>{person.position}</TableCell>
                  <TableCell>{person.unit}</TableCell>
                  <TableCell>{getStatusBadge(person.status)}</TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      {person.contact_info?.phone && (
                        <div className="flex items-center gap-1 text-sm">
                          <Phone className="h-3 w-3" />
                          {person.contact_info.phone}
                        </div>
                      )}
                      {person.contact_info?.email && (
                        <div className="flex items-center gap-1 text-sm">
                          <Mail className="h-3 w-3" />
                          {person.contact_info.email}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  {canEdit && (
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleEdit(person)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => handleDelete(person.id)}>
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

export default PersonnelCRUD;