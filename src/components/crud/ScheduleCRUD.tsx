import { useState } from 'react';
import { Plus, Edit, Trash2, Save, X, Calendar, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { useCRUD } from '@/hooks/useCRUD';
import { useAuth } from '@/hooks/useAuth';

interface Schedule {
  id: string;
  title: string;
  description?: string;
  start_time: string;
  end_time: string;
  type: string;
  status: string;
  assigned_personnel: string[];
  created_at: string;
  updated_at: string;
}

const ScheduleCRUD = () => {
  const { data: schedules, loading, create, update, remove } = useCRUD({
    table: 'schedules',
    orderBy: { column: 'start_time', ascending: true }
  });
  const { canManage } = useAuth();
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    start_time: '',
    end_time: '',
    type: 'meeting',
    status: 'scheduled',
    assigned_personnel: ''
  });

  const canEdit = canManage('schedules');

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      start_time: '',
      end_time: '',
      type: 'meeting',
      status: 'scheduled',
      assigned_personnel: ''
    });
    setEditingId(null);
  };

  const handleSubmit = async () => {
    const submitData = {
      title: formData.title,
      description: formData.description,
      start_time: formData.start_time,
      end_time: formData.end_time,
      type: formData.type,
      status: formData.status,
      assigned_personnel: formData.assigned_personnel.split(',').map(p => p.trim()).filter(p => p)
    };

    if (editingId) {
      await update(editingId, submitData);
    } else {
      await create(submitData);
    }
    setIsDialogOpen(false);
    resetForm();
  };

  const handleEdit = (schedule: Schedule) => {
    setFormData({
      title: schedule.title,
      description: schedule.description || '',
      start_time: new Date(schedule.start_time).toISOString().slice(0, 16),
      end_time: new Date(schedule.end_time).toISOString().slice(0, 16),
      type: schedule.type,
      status: schedule.status,
      assigned_personnel: schedule.assigned_personnel?.join(', ') || ''
    });
    setEditingId(schedule.id);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus jadwal ini?')) {
      await remove(id);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      scheduled: { variant: 'default' as const, label: 'Terjadwal' },
      ongoing: { variant: 'secondary' as const, label: 'Berlangsung' },
      completed: { variant: 'outline' as const, label: 'Selesai' },
      cancelled: { variant: 'destructive' as const, label: 'Dibatalkan' }
    };
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.scheduled;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const getTypeBadge = (type: string) => {
    const typeConfig = {
      meeting: { color: 'bg-blue-100 text-blue-800', label: 'Rapat' },
      training: { color: 'bg-green-100 text-green-800', label: 'Pelatihan' },
      operation: { color: 'bg-red-100 text-red-800', label: 'Operasi' },
      maintenance: { color: 'bg-orange-100 text-orange-800', label: 'Maintenance' },
      emergency: { color: 'bg-red-100 text-red-800', label: 'Darurat' }
    };
    const config = typeConfig[type as keyof typeof typeConfig] || { color: 'bg-gray-100 text-gray-800', label: type };
    return <Badge className={config.color}>{config.label}</Badge>;
  };

  const formatDateTime = (dateTime: string) => {
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
        <CardTitle>Manajemen Jadwal & Tugas</CardTitle>
        {canEdit && (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm}>
                <Plus className="h-4 w-4 mr-2" />
                Tambah Jadwal
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>
                  {editingId ? 'Edit Jadwal' : 'Tambah Jadwal'}
                </DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div>
                  <Label htmlFor="title">Judul</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Judul kegiatan"
                  />
                </div>
                
                <div>
                  <Label htmlFor="description">Deskripsi</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Deskripsi kegiatan"
                    rows={3}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="start_time">Waktu Mulai</Label>
                    <Input
                      id="start_time"
                      type="datetime-local"
                      value={formData.start_time}
                      onChange={(e) => setFormData(prev => ({ ...prev, start_time: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="end_time">Waktu Selesai</Label>
                    <Input
                      id="end_time"
                      type="datetime-local"
                      value={formData.end_time}
                      onChange={(e) => setFormData(prev => ({ ...prev, end_time: e.target.value }))}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="type">Tipe Kegiatan</Label>
                    <Select value={formData.type} onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="meeting">Rapat</SelectItem>
                        <SelectItem value="training">Pelatihan</SelectItem>
                        <SelectItem value="operation">Operasi</SelectItem>
                        <SelectItem value="maintenance">Maintenance</SelectItem>
                        <SelectItem value="emergency">Darurat</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="status">Status</Label>
                    <Select value={formData.status} onValueChange={(value) => setFormData(prev => ({ ...prev, status: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="scheduled">Terjadwal</SelectItem>
                        <SelectItem value="ongoing">Berlangsung</SelectItem>
                        <SelectItem value="completed">Selesai</SelectItem>
                        <SelectItem value="cancelled">Dibatalkan</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="assigned_personnel">Personel yang Ditugaskan</Label>
                  <Input
                    id="assigned_personnel"
                    value={formData.assigned_personnel}
                    onChange={(e) => setFormData(prev => ({ ...prev, assigned_personnel: e.target.value }))}
                    placeholder="Nama personel (pisahkan dengan koma)"
                  />
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
                <TableHead>Judul</TableHead>
                <TableHead>Tipe</TableHead>
                <TableHead>Waktu Mulai</TableHead>
                <TableHead>Waktu Selesai</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Personel</TableHead>
                {canEdit && <TableHead>Aksi</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {schedules.map((schedule: Schedule) => (
                <TableRow key={schedule.id}>
                  <TableCell className="font-medium">
                    <div>
                      <div>{schedule.title}</div>
                      {schedule.description && (
                        <div className="text-sm text-gray-500 truncate max-w-xs">
                          {schedule.description}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{getTypeBadge(schedule.type)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm">
                      <Calendar className="h-3 w-3" />
                      {formatDateTime(schedule.start_time)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm">
                      <Clock className="h-3 w-3" />
                      {formatDateTime(schedule.end_time)}
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(schedule.status)}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {schedule.assigned_personnel?.length > 0 ? (
                        <div>{schedule.assigned_personnel.slice(0, 2).join(', ')}
                          {schedule.assigned_personnel.length > 2 && ` +${schedule.assigned_personnel.length - 2}`}
                        </div>
                      ) : (
                        <span className="text-gray-400">Tidak ada</span>
                      )}
                    </div>
                  </TableCell>
                  {canEdit && (
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleEdit(schedule)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => handleDelete(schedule.id)}>
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

export default ScheduleCRUD;