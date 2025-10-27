import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import { Video, Phone, MessageSquare, Calendar, Clock, User, FileText } from 'lucide-react';
import { toast } from 'sonner';
import { useCRUD } from '@/hooks/useCRUD';

interface TeleConsultation {
  id: string;
  consultation_id: string;
  patient_name: string;
  patient_nrp: string;
  patient_rank: string;
  doctor_name: string;
  consultation_type: 'video' | 'phone' | 'chat';
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  scheduled_date: string;
  duration_minutes?: number;
  chief_complaint: string;
  diagnosis?: string;
  prescription?: string;
  notes?: string;
  created_at: string;
}

const Telemedicine = () => {
  const { data: consultations = [], create, update, remove } = useCRUD<TeleConsultation>('teleconsultations');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    patient_name: '',
    patient_nrp: '',
    patient_rank: '',
    doctor_name: '',
    consultation_type: 'video' as 'video' | 'phone' | 'chat',
    scheduled_date: '',
    chief_complaint: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await create({
        ...formData,
        consultation_id: `TELE-${Date.now()}`,
        status: 'scheduled',
        created_at: new Date().toISOString(),
      });
      toast.success('Konsultasi berhasil dijadwalkan');
      setIsFormOpen(false);
      setFormData({
        patient_name: '',
        patient_nrp: '',
        patient_rank: '',
        doctor_name: '',
        consultation_type: 'video',
        scheduled_date: '',
        chief_complaint: '',
      });
    } catch (error) {
      toast.error('Gagal menjadwalkan konsultasi');
    }
  };

  const handleStartConsultation = async (id: string) => {
    try {
      await update(id, {
        status: 'in-progress',
      });
      toast.success('Konsultasi dimulai');
    } catch (error) {
      toast.error('Gagal memulai konsultasi');
    }
  };

  const handleCompleteConsultation = async (id: string, diagnosis: string, prescription: string, notes: string) => {
    try {
      await update(id, {
        status: 'completed',
        diagnosis,
        prescription,
        notes,
      });
      toast.success('Konsultasi selesai');
    } catch (error) {
      toast.error('Gagal menyelesaikan konsultasi');
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { color: string; label: string }> = {
      scheduled: { color: 'bg-blue-500', label: 'Terjadwal' },
      'in-progress': { color: 'bg-yellow-500', label: 'Berlangsung' },
      completed: { color: 'bg-green-500', label: 'Selesai' },
      cancelled: { color: 'bg-red-500', label: 'Dibatalkan' },
    };
    const variant = variants[status] || variants.scheduled;
    return <Badge className={variant.color}>{variant.label}</Badge>;
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Video className="h-4 w-4" />;
      case 'phone':
        return <Phone className="h-4 w-4" />;
      case 'chat':
        return <MessageSquare className="h-4 w-4" />;
      default:
        return <Video className="h-4 w-4" />;
    }
  };

  const scheduled = consultations.filter((c) => c.status === 'scheduled');
  const inProgress = consultations.filter((c) => c.status === 'in-progress');
  const completed = consultations.filter((c) => c.status === 'completed');

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-auto bg-gray-50 p-4">
          <div className="max-w-7xl mx-auto">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Telemedicine</h1>
            <p className="text-gray-500">Konsultasi medis jarak jauh</p>
          </div>
          <Button onClick={() => setIsFormOpen(!isFormOpen)}>
            <Video className="mr-2 h-4 w-4" />
            Jadwalkan Konsultasi
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Konsultasi</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{consultations.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Terjadwal</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{scheduled.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Berlangsung</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{inProgress.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Selesai</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{completed.length}</div>
            </CardContent>
          </Card>
        </div>

        {isFormOpen && (
          <Card>
            <CardHeader>
              <CardTitle>Jadwalkan Konsultasi Baru</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="patient_name">Nama Pasien</Label>
                    <Input
                      id="patient_name"
                      value={formData.patient_name}
                      onChange={(e) => setFormData({ ...formData, patient_name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="patient_nrp">NRP</Label>
                    <Input
                      id="patient_nrp"
                      value={formData.patient_nrp}
                      onChange={(e) => setFormData({ ...formData, patient_nrp: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="patient_rank">Pangkat</Label>
                    <Input
                      id="patient_rank"
                      value={formData.patient_rank}
                      onChange={(e) => setFormData({ ...formData, patient_rank: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="doctor_name">Nama Dokter</Label>
                    <Input
                      id="doctor_name"
                      value={formData.doctor_name}
                      onChange={(e) => setFormData({ ...formData, doctor_name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="consultation_type">Jenis Konsultasi</Label>
                    <Select
                      value={formData.consultation_type}
                      onValueChange={(value: 'video' | 'phone' | 'chat') =>
                        setFormData({ ...formData, consultation_type: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="video">Video Call</SelectItem>
                        <SelectItem value="phone">Telepon</SelectItem>
                        <SelectItem value="chat">Chat</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="scheduled_date">Tanggal & Waktu</Label>
                    <Input
                      id="scheduled_date"
                      type="datetime-local"
                      value={formData.scheduled_date}
                      onChange={(e) => setFormData({ ...formData, scheduled_date: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2 col-span-2">
                    <Label htmlFor="chief_complaint">Keluhan Utama</Label>
                    <Textarea
                      id="chief_complaint"
                      value={formData.chief_complaint}
                      onChange={(e) => setFormData({ ...formData, chief_complaint: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button type="submit">Simpan</Button>
                  <Button type="button" variant="outline" onClick={() => setIsFormOpen(false)}>
                    Batal
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        <Tabs defaultValue="scheduled" className="w-full">
          <TabsList>
            <TabsTrigger value="scheduled">Terjadwal ({scheduled.length})</TabsTrigger>
            <TabsTrigger value="in-progress">Berlangsung ({inProgress.length})</TabsTrigger>
            <TabsTrigger value="completed">Selesai ({completed.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="scheduled" className="space-y-4">
            {scheduled.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold">{item.consultation_id}</h3>
                        {getStatusBadge(item.status)}
                        <Badge variant="outline" className="flex items-center gap-1">
                          {getTypeIcon(item.consultation_type)}
                          {item.consultation_type}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          {item.patient_rank} {item.patient_name} ({item.patient_nrp})
                        </div>
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          Dokter: {item.doctor_name}
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          {new Date(item.scheduled_date).toLocaleDateString('id-ID')}
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          {new Date(item.scheduled_date).toLocaleTimeString('id-ID', {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </div>
                      </div>
                      <div className="text-sm">
                        <strong>Keluhan:</strong> {item.chief_complaint}
                      </div>
                    </div>
                    <Button size="sm" onClick={() => handleStartConsultation(item.id)}>
                      Mulai Konsultasi
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="in-progress" className="space-y-4">
            {inProgress.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold">{item.consultation_id}</h3>
                        {getStatusBadge(item.status)}
                        <Badge variant="outline" className="flex items-center gap-1">
                          {getTypeIcon(item.consultation_type)}
                          {item.consultation_type}
                        </Badge>
                      </div>
                      <div className="text-sm">
                        Pasien: {item.patient_rank} {item.patient_name}
                      </div>
                      <div className="text-sm">Dokter: {item.doctor_name}</div>
                    </div>
                    <div className="space-y-2">
                      <Button
                        size="sm"
                        onClick={() =>
                          handleCompleteConsultation(
                            item.id,
                            'Diagnosis akan diisi',
                            'Resep akan diisi',
                            'Catatan tambahan'
                          )
                        }
                      >
                        Selesaikan
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            {completed.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold">{item.consultation_id}</h3>
                      {getStatusBadge(item.status)}
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <strong>Pasien:</strong> {item.patient_rank} {item.patient_name}
                      </div>
                      <div>
                        <strong>Dokter:</strong> {item.doctor_name}
                      </div>
                      <div>
                        <strong>Tanggal:</strong> {new Date(item.scheduled_date).toLocaleDateString('id-ID')}
                      </div>
                      <div>
                        <strong>Durasi:</strong> {item.duration_minutes || 30} menit
                      </div>
                    </div>
                    {item.diagnosis && (
                      <div className="text-sm p-3 bg-gray-50 rounded">
                        <div className="flex items-start gap-2">
                          <FileText className="h-4 w-4 mt-0.5" />
                          <div>
                            <strong>Diagnosis:</strong> {item.diagnosis}
                          </div>
                        </div>
                      </div>
                    )}
                    {item.prescription && (
                      <div className="text-sm p-3 bg-gray-50 rounded">
                        <strong>Resep:</strong> {item.prescription}
                      </div>
                    )}
                    {item.notes && (
                      <div className="text-sm text-gray-600">
                        <strong>Catatan:</strong> {item.notes}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Telemedicine;
