import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import { GraduationCap, Award, Calendar, Users, FileText, Clock } from 'lucide-react';
import { toast } from 'sonner';
import { useCRUD } from '@/hooks/useCRUD';
import { getDaysUntil, isExpiringSoon } from '@/utils/dateCalculations';

interface Training {
  id: string;
  training_id: string;
  training_name: string;
  training_type: 'medical' | 'tactical' | 'emergency' | 'technical';
  instructor: string;
  start_date: string;
  end_date: string;
  duration_hours: number;
  location: string;
  max_participants: number;
  enrolled_count: number;
  status: 'scheduled' | 'ongoing' | 'completed' | 'cancelled';
  description?: string;
}

interface Certification {
  id: string;
  certification_id: string;
  personnel_name: string;
  personnel_nrp: string;
  certification_name: string;
  certification_type: string;
  issuing_organization: string;
  issue_date: string;
  expiry_date: string;
  status: 'valid' | 'expiring-soon' | 'expired' | 'pending-renewal';
  credential_id?: string;
  notes?: string;
}

const TrainingCertification = () => {
  const { data: trainings = [], create: createTraining, update: updateTraining } = useCRUD<Training>('trainings');
  const { data: certifications = [], create: createCertification, update: updateCertification } = useCRUD<Certification>('certifications');
  const [isTrainingFormOpen, setIsTrainingFormOpen] = useState(false);
  const [isCertFormOpen, setIsCertFormOpen] = useState(false);

  const [trainingForm, setTrainingForm] = useState({
    training_name: '',
    training_type: 'medical' as 'medical' | 'tactical' | 'emergency' | 'technical',
    instructor: '',
    start_date: '',
    end_date: '',
    duration_hours: 0,
    location: '',
    max_participants: 20,
    description: '',
  });

  const [certForm, setCertForm] = useState({
    personnel_name: '',
    personnel_nrp: '',
    certification_name: '',
    certification_type: 'medical',
    issuing_organization: '',
    issue_date: '',
    expiry_date: '',
    credential_id: '',
    notes: '',
  });

  const handleTrainingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createTraining({
        ...trainingForm,
        training_id: `TRN-${Date.now()}`,
        enrolled_count: 0,
        status: 'scheduled',
      });
      toast.success('Pelatihan berhasil ditambahkan');
      setIsTrainingFormOpen(false);
      setTrainingForm({
        training_name: '',
        training_type: 'medical',
        instructor: '',
        start_date: '',
        end_date: '',
        duration_hours: 0,
        location: '',
        max_participants: 20,
        description: '',
      });
    } catch (error) {
      toast.error('Gagal menambahkan pelatihan');
    }
  };

  const handleCertificationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const status = isExpiringSoon(certForm.expiry_date, 30) ? 'expiring-soon' : 'valid';
      await createCertification({
        ...certForm,
        certification_id: `CERT-${Date.now()}`,
        status,
      });
      toast.success('Sertifikasi berhasil ditambahkan');
      setIsCertFormOpen(false);
      setCertForm({
        personnel_name: '',
        personnel_nrp: '',
        certification_name: '',
        certification_type: 'medical',
        issuing_organization: '',
        issue_date: '',
        expiry_date: '',
        credential_id: '',
        notes: '',
      });
    } catch (error) {
      toast.error('Gagal menambahkan sertifikasi');
    }
  };

  const handleStartTraining = async (id: string) => {
    try {
      await updateTraining(id, { status: 'ongoing' });
      toast.success('Pelatihan dimulai');
    } catch (error) {
      toast.error('Gagal memulai pelatihan');
    }
  };

  const handleCompleteTraining = async (id: string) => {
    try {
      await updateTraining(id, { status: 'completed' });
      toast.success('Pelatihan selesai');
    } catch (error) {
      toast.error('Gagal menyelesaikan pelatihan');
    }
  };

  const handleRenewCertification = async (id: string) => {
    try {
      const today = new Date();
      const newExpiry = new Date(today);
      newExpiry.setFullYear(today.getFullYear() + 2);
      await updateCertification(id, {
        status: 'valid',
        issue_date: today.toISOString(),
        expiry_date: newExpiry.toISOString(),
      });
      toast.success('Sertifikasi berhasil diperpanjang');
    } catch (error) {
      toast.error('Gagal memperpanjang sertifikasi');
    }
  };

  const getTrainingStatusBadge = (status: string) => {
    const variants: Record<string, { color: string; label: string }> = {
      scheduled: { color: 'bg-blue-500', label: 'Terjadwal' },
      ongoing: { color: 'bg-yellow-500', label: 'Berlangsung' },
      completed: { color: 'bg-green-500', label: 'Selesai' },
      cancelled: { color: 'bg-red-500', label: 'Dibatalkan' },
    };
    const variant = variants[status] || variants.scheduled;
    return <Badge className={variant.color}>{variant.label}</Badge>;
  };

  const getCertStatusBadge = (status: string) => {
    const variants: Record<string, { color: string; label: string }> = {
      valid: { color: 'bg-green-500', label: 'Aktif' },
      'expiring-soon': { color: 'bg-yellow-500', label: 'Segera Berakhir' },
      expired: { color: 'bg-red-500', label: 'Kadaluarsa' },
      'pending-renewal': { color: 'bg-orange-500', label: 'Menunggu Perpanjangan' },
    };
    const variant = variants[status] || variants.valid;
    return <Badge className={variant.color}>{variant.label}</Badge>;
  };

  const calculateCertStatus = (cert: Certification): 'valid' | 'expiring-soon' | 'expired' => {
    const daysUntil = getDaysUntil(cert.expiry_date);
    if (daysUntil < 0) return 'expired';
    if (daysUntil <= 30) return 'expiring-soon';
    return 'valid';
  };

  const scheduledTrainings = trainings.filter((t) => t.status === 'scheduled');
  const ongoingTrainings = trainings.filter((t) => t.status === 'ongoing');
  const completedTrainings = trainings.filter((t) => t.status === 'completed');

  const validCerts = certifications.filter((c) => calculateCertStatus(c) === 'valid');
  const expiringSoonCerts = certifications.filter((c) => calculateCertStatus(c) === 'expiring-soon');
  const expiredCerts = certifications.filter((c) => calculateCertStatus(c) === 'expired');

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
            <h1 className="text-3xl font-bold">Pelatihan & Sertifikasi</h1>
            <p className="text-gray-500">Manajemen pelatihan dan sertifikasi personel medis</p>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => setIsTrainingFormOpen(!isTrainingFormOpen)}>
              <GraduationCap className="mr-2 h-4 w-4" />
              Tambah Pelatihan
            </Button>
            <Button variant="outline" onClick={() => setIsCertFormOpen(!isCertFormOpen)}>
              <Award className="mr-2 h-4 w-4" />
              Tambah Sertifikasi
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Pelatihan</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{trainings.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Pelatihan Aktif</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{ongoingTrainings.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Sertifikasi</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{certifications.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Perlu Perpanjangan</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{expiringSoonCerts.length + expiredCerts.length}</div>
            </CardContent>
          </Card>
        </div>

        {isTrainingFormOpen && (
          <Card>
            <CardHeader>
              <CardTitle>Tambah Pelatihan Baru</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleTrainingSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="training_name">Nama Pelatihan</Label>
                    <Input
                      id="training_name"
                      value={trainingForm.training_name}
                      onChange={(e) => setTrainingForm({ ...trainingForm, training_name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="training_type">Jenis Pelatihan</Label>
                    <Select
                      value={trainingForm.training_type}
                      onValueChange={(value: any) => setTrainingForm({ ...trainingForm, training_type: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="medical">Medis</SelectItem>
                        <SelectItem value="tactical">Taktis</SelectItem>
                        <SelectItem value="emergency">Darurat</SelectItem>
                        <SelectItem value="technical">Teknis</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="instructor">Instruktur</Label>
                    <Input
                      id="instructor"
                      value={trainingForm.instructor}
                      onChange={(e) => setTrainingForm({ ...trainingForm, instructor: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Lokasi</Label>
                    <Input
                      id="location"
                      value={trainingForm.location}
                      onChange={(e) => setTrainingForm({ ...trainingForm, location: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="start_date">Tanggal Mulai</Label>
                    <Input
                      id="start_date"
                      type="date"
                      value={trainingForm.start_date}
                      onChange={(e) => setTrainingForm({ ...trainingForm, start_date: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="end_date">Tanggal Selesai</Label>
                    <Input
                      id="end_date"
                      type="date"
                      value={trainingForm.end_date}
                      onChange={(e) => setTrainingForm({ ...trainingForm, end_date: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="duration_hours">Durasi (Jam)</Label>
                    <Input
                      id="duration_hours"
                      type="number"
                      value={trainingForm.duration_hours}
                      onChange={(e) => setTrainingForm({ ...trainingForm, duration_hours: parseInt(e.target.value) })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="max_participants">Maks. Peserta</Label>
                    <Input
                      id="max_participants"
                      type="number"
                      value={trainingForm.max_participants}
                      onChange={(e) => setTrainingForm({ ...trainingForm, max_participants: parseInt(e.target.value) })}
                      required
                    />
                  </div>
                  <div className="space-y-2 col-span-2">
                    <Label htmlFor="description">Deskripsi</Label>
                    <Input
                      id="description"
                      value={trainingForm.description}
                      onChange={(e) => setTrainingForm({ ...trainingForm, description: e.target.value })}
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button type="submit">Simpan</Button>
                  <Button type="button" variant="outline" onClick={() => setIsTrainingFormOpen(false)}>
                    Batal
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {isCertFormOpen && (
          <Card>
            <CardHeader>
              <CardTitle>Tambah Sertifikasi Baru</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCertificationSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="personnel_name">Nama Personel</Label>
                    <Input
                      id="personnel_name"
                      value={certForm.personnel_name}
                      onChange={(e) => setCertForm({ ...certForm, personnel_name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="personnel_nrp">NRP</Label>
                    <Input
                      id="personnel_nrp"
                      value={certForm.personnel_nrp}
                      onChange={(e) => setCertForm({ ...certForm, personnel_nrp: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="certification_name">Nama Sertifikasi</Label>
                    <Input
                      id="certification_name"
                      value={certForm.certification_name}
                      onChange={(e) => setCertForm({ ...certForm, certification_name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="certification_type">Jenis Sertifikasi</Label>
                    <Input
                      id="certification_type"
                      value={certForm.certification_type}
                      onChange={(e) => setCertForm({ ...certForm, certification_type: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="issuing_organization">Organisasi Penerbit</Label>
                    <Input
                      id="issuing_organization"
                      value={certForm.issuing_organization}
                      onChange={(e) => setCertForm({ ...certForm, issuing_organization: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="credential_id">ID Kredensial</Label>
                    <Input
                      id="credential_id"
                      value={certForm.credential_id}
                      onChange={(e) => setCertForm({ ...certForm, credential_id: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="issue_date">Tanggal Terbit</Label>
                    <Input
                      id="issue_date"
                      type="date"
                      value={certForm.issue_date}
                      onChange={(e) => setCertForm({ ...certForm, issue_date: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="expiry_date">Tanggal Berakhir</Label>
                    <Input
                      id="expiry_date"
                      type="date"
                      value={certForm.expiry_date}
                      onChange={(e) => setCertForm({ ...certForm, expiry_date: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2 col-span-2">
                    <Label htmlFor="notes">Catatan</Label>
                    <Input
                      id="notes"
                      value={certForm.notes}
                      onChange={(e) => setCertForm({ ...certForm, notes: e.target.value })}
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button type="submit">Simpan</Button>
                  <Button type="button" variant="outline" onClick={() => setIsCertFormOpen(false)}>
                    Batal
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        <Tabs defaultValue="trainings" className="w-full">
          <TabsList>
            <TabsTrigger value="trainings">Pelatihan ({trainings.length})</TabsTrigger>
            <TabsTrigger value="certifications">Sertifikasi ({certifications.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="trainings" className="space-y-4">
            <Tabs defaultValue="scheduled" className="w-full">
              <TabsList>
                <TabsTrigger value="scheduled">Terjadwal ({scheduledTrainings.length})</TabsTrigger>
                <TabsTrigger value="ongoing">Berlangsung ({ongoingTrainings.length})</TabsTrigger>
                <TabsTrigger value="completed">Selesai ({completedTrainings.length})</TabsTrigger>
              </TabsList>

              <TabsContent value="scheduled" className="space-y-4">
                {scheduledTrainings.map((item) => (
                  <Card key={item.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2 flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-bold">{item.training_name}</h3>
                            {getTrainingStatusBadge(item.status)}
                            <Badge variant="outline">{item.training_type}</Badge>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="flex items-center gap-2">
                              <Users className="h-4 w-4" />
                              Instruktur: {item.instructor}
                            </div>
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4" />
                              {new Date(item.start_date).toLocaleDateString('id-ID')} - {new Date(item.end_date).toLocaleDateString('id-ID')}
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4" />
                              {item.duration_hours} jam
                            </div>
                            <div className="flex items-center gap-2">
                              <Users className="h-4 w-4" />
                              Peserta: {item.enrolled_count}/{item.max_participants}
                            </div>
                          </div>
                          <div className="text-sm">Lokasi: {item.location}</div>
                          {item.description && <p className="text-sm text-gray-600">{item.description}</p>}
                        </div>
                        <Button size="sm" onClick={() => handleStartTraining(item.id)}>
                          Mulai
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="ongoing" className="space-y-4">
                {ongoingTrainings.map((item) => (
                  <Card key={item.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2 flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-bold">{item.training_name}</h3>
                            {getTrainingStatusBadge(item.status)}
                          </div>
                          <div className="text-sm">
                            Peserta: {item.enrolled_count}/{item.max_participants}
                          </div>
                        </div>
                        <Button size="sm" onClick={() => handleCompleteTraining(item.id)}>
                          Selesaikan
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="completed" className="space-y-4">
                {completedTrainings.map((item) => (
                  <Card key={item.id}>
                    <CardContent className="p-6">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold">{item.training_name}</h3>
                          {getTrainingStatusBadge(item.status)}
                        </div>
                        <div className="text-sm">
                          {new Date(item.start_date).toLocaleDateString('id-ID')} - {new Date(item.end_date).toLocaleDateString('id-ID')}
                        </div>
                        <div className="text-sm">Peserta: {item.enrolled_count} orang</div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </TabsContent>

          <TabsContent value="certifications" className="space-y-4">
            <Tabs defaultValue="valid" className="w-full">
              <TabsList>
                <TabsTrigger value="valid">Aktif ({validCerts.length})</TabsTrigger>
                <TabsTrigger value="expiring">Segera Berakhir ({expiringSoonCerts.length})</TabsTrigger>
                <TabsTrigger value="expired">Kadaluarsa ({expiredCerts.length})</TabsTrigger>
              </TabsList>

              <TabsContent value="valid" className="space-y-4">
                {validCerts.map((item) => (
                  <Card key={item.id}>
                    <CardContent className="p-6">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Award className="h-5 w-5 text-green-500" />
                          <h3 className="font-bold">{item.certification_name}</h3>
                          {getCertStatusBadge(calculateCertStatus(item))}
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>Personel: {item.personnel_name} ({item.personnel_nrp})</div>
                          <div>Penerbit: {item.issuing_organization}</div>
                          <div>Terbit: {new Date(item.issue_date).toLocaleDateString('id-ID')}</div>
                          <div>Berakhir: {new Date(item.expiry_date).toLocaleDateString('id-ID')}</div>
                        </div>
                        {item.credential_id && <div className="text-sm">ID: {item.credential_id}</div>}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="expiring" className="space-y-4">
                {expiringSoonCerts.map((item) => (
                  <Card key={item.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2 flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-bold">{item.certification_name}</h3>
                            {getCertStatusBadge('expiring-soon')}
                            <Badge variant="destructive">{getDaysUntil(item.expiry_date)} hari lagi</Badge>
                          </div>
                          <div className="text-sm">
                            Personel: {item.personnel_name} ({item.personnel_nrp})
                          </div>
                        </div>
                        <Button size="sm" onClick={() => handleRenewCertification(item.id)}>
                          Perpanjang
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="expired" className="space-y-4">
                {expiredCerts.map((item) => (
                  <Card key={item.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2 flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-bold">{item.certification_name}</h3>
                            {getCertStatusBadge('expired')}
                            <Badge variant="destructive">{Math.abs(getDaysUntil(item.expiry_date))} hari yang lalu</Badge>
                          </div>
                          <div className="text-sm">
                            Personel: {item.personnel_name} ({item.personnel_nrp})
                          </div>
                          <div className="text-sm">Berakhir: {new Date(item.expiry_date).toLocaleDateString('id-ID')}</div>
                        </div>
                        <Button size="sm" onClick={() => handleRenewCertification(item.id)}>
                          Perpanjang Sekarang
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </TabsContent>
        </Tabs>
      </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default TrainingCertification;
