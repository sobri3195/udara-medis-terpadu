# Fitur Baru - Sistem Medical Logistics TNI AU

## 5 Fungsi Utility Baru

### 1. Date Calculations (`src/utils/dateCalculations.ts`)
Fungsi-fungsi untuk perhitungan tanggal dan waktu:
- `calculateAge()` - Menghitung usia dari tanggal lahir
- `calculateDuration()` - Menghitung durasi antara dua tanggal
- `getWorkingDays()` - Menghitung hari kerja dalam rentang tanggal
- `addBusinessDays()` - Menambahkan hari kerja ke tanggal
- `getQuarter()` - Mendapatkan kuartal dari tanggal
- `getDaysUntil()` - Menghitung hari hingga tanggal tertentu
- `isExpiringSoon()` - Mengecek apakah tanggal akan segera kadaluarsa
- `getWeekNumber()` - Mendapatkan nomor minggu dalam tahun

### 2. Data Transformation (`src/utils/dataTransform.ts`)
Fungsi-fungsi untuk manipulasi dan transformasi data:
- `groupBy()` - Mengelompokkan array berdasarkan key
- `sortBy()` - Mengurutkan array berdasarkan key
- `filterByDateRange()` - Filter data berdasarkan rentang tanggal
- `calculateTotal()` - Menghitung total dari field numerik
- `calculateAverage()` - Menghitung rata-rata
- `removeDuplicates()` - Menghapus data duplikat
- `mergeArrays()` - Menggabungkan dua array
- `paginate()` - Pagination data
- `chunkArray()` - Membagi array menjadi chunks
- `flattenObject()` - Flatten nested object

### 3. Medical Calculations (`src/utils/medicalCalculations.ts`)
Fungsi-fungsi untuk perhitungan medis:
- `calculateBMI()` - Menghitung Body Mass Index
- `getBMICategory()` - Kategori BMI (Kurus/Normal/Gemuk/Obesitas)
- `calculateBMR()` - Menghitung Basal Metabolic Rate
- `calculateDosage()` - Menghitung dosis obat berdasarkan berat badan
- `calculateDripRate()` - Menghitung tetes infus per menit
- `calculateBloodPressureCategory()` - Kategori tekanan darah
- `calculateGFR()` - Menghitung Glomerular Filtration Rate
- `calculatePulseOxygenSaturation()` - Kategori saturasi oksigen
- `calculateAPGARScore()` - Menghitung APGAR score untuk bayi
- `calculateIVFluidRate()` - Menghitung kecepatan cairan IV
- `calculateCalorieRequirement()` - Menghitung kebutuhan kalori

### 4. Report Helpers (`src/utils/reportHelpers.ts`)
Fungsi-fungsi untuk pembuatan laporan:
- `generateReportHeader()` - Generate header laporan
- `generateSummaryTable()` - Generate tabel ringkasan
- `calculateStatistics()` - Menghitung statistik (min, max, mean, median, stdDev)
- `generateTrendAnalysis()` - Analisis trend data
- `generateAlertsSummary()` - Ringkasan peringatan berdasarkan level
- `generateComparisonReport()` - Laporan perbandingan periode

### 5. Notification Helpers (`src/utils/notificationHelpers.ts`)
Fungsi-fungsi untuk manajemen notifikasi:
- `createNotification()` - Membuat notifikasi baru
- `sortNotificationsByPriority()` - Urutkan berdasarkan prioritas
- `filterUnreadNotifications()` - Filter notifikasi belum dibaca
- `filterByType()` - Filter berdasarkan tipe
- `markAsRead()` / `markAllAsRead()` - Tandai sebagai dibaca
- `getNotificationSummary()` - Ringkasan notifikasi
- `createInventoryAlertNotification()` - Notifikasi stok menipis
- `createExpiryAlertNotification()` - Notifikasi kadaluarsa
- `createMaintenanceReminderNotification()` - Pengingat perawatan

---

## 5 Fitur Baru (Pages)

### 1. Emergency Response (`/emergency-response`)
**Fitur:** Manajemen respons darurat dan pengiriman ambulans

**Fungsi Utama:**
- Pencatatan kasus darurat (medis, kecelakaan, bencana, pertempuran)
- Sistem dispatch ambulans otomatis
- Tracking status kasus (pending, dispatched, on-scene, resolved)
- Tingkat keparahan (low, medium, high, critical)
- Dashboard real-time untuk monitoring kasus aktif
- Riwayat kasus yang telah diselesaikan

**Komponen:**
- Form pencatatan kasus darurat
- Tabs untuk kasus menunggu, aktif, dan selesai
- Statistik kasus hari ini
- Quick action untuk pengiriman ambulans

### 2. Equipment Maintenance (`/equipment-maintenance`)
**Fitur:** Tracking dan jadwal perawatan peralatan medis

**Fungsi Utama:**
- Pendaftaran peralatan medis (diagnostik, bedah, laboratorium)
- Jadwal perawatan berkala dengan interval yang bisa dikustomisasi
- Alert untuk peralatan yang segera jatuh tempo atau terlambat
- Tracking status perawatan (good, due-soon, overdue, under-maintenance)
- Riwayat perawatan per peralatan
- Estimasi downtime untuk perawatan

**Komponen:**
- Form tambah peralatan baru
- Dashboard status peralatan
- Tabs untuk segera jatuh tempo dan terlambat
- Notifikasi untuk perawatan yang segera diperlukan

### 3. Telemedicine (`/telemedicine`)
**Fitur:** Konsultasi medis jarak jauh

**Fungsi Utama:**
- Penjadwalan konsultasi (video, phone, chat)
- Manajemen appointment pasien dan dokter
- Rekam medis konsultasi (diagnosis, resep, catatan)
- Status konsultasi (scheduled, in-progress, completed)
- Tracking durasi konsultasi
- Integrasi dengan sistem personel untuk data pasien

**Komponen:**
- Form jadwal konsultasi baru
- Dashboard konsultasi terjadwal dan berlangsung
- Rekam medis hasil konsultasi
- Meeting link untuk video call

**Edge Function:**
- `telemedicine-notification` - Kirim notifikasi ke pasien dan dokter
- Generate meeting link otomatis

### 4. Blood Bank (`/blood-bank`)
**Fitur:** Manajemen bank darah dan permintaan transfusi

**Fungsi Utama:**
- Inventori darah semua golongan (O+, O-, A+, A-, B+, B-, AB+, AB-)
- Tracking expiry date dan collection date
- Sistem permintaan darah dengan tingkat urgensi
- Alert untuk stok rendah dan darah yang segera kadaluarsa
- Kompatibilitas golongan darah otomatis
- Approval workflow untuk permintaan darah
- Tracking donor dan batch darah

**Komponen:**
- Dashboard inventori per golongan darah
- Form permintaan darah baru
- Tabs untuk inventori, permintaan, dan stok rendah
- Visual indicator untuk status stok

**Edge Function:**
- `blood-compatibility-check` - Validasi kompatibilitas golongan darah
- Matrix kompatibilitas transfusi otomatis

### 5. Training & Certification (`/training-certification`)
**Fitur:** Manajemen pelatihan dan sertifikasi personel medis

**Fungsi Utama:**
- Penjadwalan pelatihan (medis, taktis, darurat, teknis)
- Manajemen instruktur dan lokasi pelatihan
- Tracking peserta dan kapasitas pelatihan
- Manajemen sertifikasi personel
- Alert untuk sertifikasi yang akan kadaluarsa
- Auto-renewal untuk sertifikasi
- Generate sertifikat digital dengan QR code
- Verifikasi sertifikat online

**Komponen:**
- Form tambah pelatihan dan sertifikasi
- Dashboard pelatihan (scheduled, ongoing, completed)
- Dashboard sertifikasi (valid, expiring-soon, expired)
- Tracking perpanjangan sertifikasi

**Edge Function:**
- `training-certificate-generator` - Generate sertifikat digital
- Sistem verifikasi sertifikat online
- Auto-expiry notification

---

## 5 Edge Functions Baru

### 1. `emergency-dispatch`
**Fungsi:** Sistem dispatch ambulans otomatis
- Mencari ambulans terdekat yang available
- Kalkulasi estimasi waktu kedatangan
- Kirim notifikasi ke team emergency
- Update status ambulans

### 2. `blood-compatibility-check`
**Fungsi:** Validasi kompatibilitas golongan darah
- Cek kompatibilitas donor-recipient
- Matrix transfusi darah lengkap
- Identifikasi universal donor dan recipient
- Rekomendasi transfusi aman

### 3. `telemedicine-notification`
**Fungsi:** Notifikasi konsultasi telemedicine
- Kirim reminder ke pasien dan dokter
- Generate meeting link otomatis
- Tracking jadwal konsultasi
- Email notification

### 4. `maintenance-scheduler`
**Fungsi:** Penjadwalan perawatan peralatan
- Kalkulasi jadwal perawatan berikutnya
- Prioritas berdasarkan urgency
- Estimasi downtime
- Rekomendasi tindakan

### 5. `training-certificate-generator`
**Fungsi:** Generate sertifikat pelatihan
- Buat sertifikat digital
- QR code untuk verifikasi
- Auto-expiry tracking
- URL verifikasi online

---

## Integrasi dengan Sistem yang Ada

Semua fitur baru terintegrasi dengan:
- ✅ Sistem autentikasi dan RBAC
- ✅ Supabase database dan real-time updates
- ✅ TanStack Query untuk data fetching
- ✅ UI components dari shadcn/ui
- ✅ Notifikasi dengan toast/sonner
- ✅ Dashboard layout yang konsisten
- ✅ Responsive design untuk mobile

---

## Cara Penggunaan

### Setup Database Tables (Supabase)

```sql
-- Table untuk emergency cases
CREATE TABLE emergency_cases (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  case_number TEXT UNIQUE NOT NULL,
  caller_name TEXT NOT NULL,
  caller_phone TEXT NOT NULL,
  location TEXT NOT NULL,
  emergency_type TEXT NOT NULL,
  severity TEXT NOT NULL,
  status TEXT NOT NULL,
  description TEXT,
  ambulance_assigned TEXT,
  response_time_minutes INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  resolved_at TIMESTAMPTZ
);

-- Table untuk equipment maintenance
CREATE TABLE equipment_maintenance (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  equipment_id TEXT UNIQUE NOT NULL,
  equipment_name TEXT NOT NULL,
  equipment_type TEXT NOT NULL,
  last_maintenance TIMESTAMPTZ NOT NULL,
  next_maintenance TIMESTAMPTZ NOT NULL,
  maintenance_interval_days INTEGER NOT NULL,
  status TEXT NOT NULL,
  location TEXT NOT NULL,
  technician TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table untuk teleconsultations
CREATE TABLE teleconsultations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  consultation_id TEXT UNIQUE NOT NULL,
  patient_name TEXT NOT NULL,
  patient_nrp TEXT NOT NULL,
  patient_rank TEXT NOT NULL,
  doctor_name TEXT NOT NULL,
  consultation_type TEXT NOT NULL,
  status TEXT NOT NULL,
  scheduled_date TIMESTAMPTZ NOT NULL,
  duration_minutes INTEGER,
  chief_complaint TEXT NOT NULL,
  diagnosis TEXT,
  prescription TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table untuk blood inventory
CREATE TABLE blood_inventory (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  blood_type TEXT NOT NULL,
  rhesus TEXT NOT NULL,
  units_available INTEGER NOT NULL,
  min_stock_level INTEGER NOT NULL,
  collection_date TIMESTAMPTZ NOT NULL,
  expiry_date TIMESTAMPTZ NOT NULL,
  status TEXT NOT NULL,
  location TEXT NOT NULL,
  donor_id TEXT,
  notes TEXT
);

-- Table untuk blood requests
CREATE TABLE blood_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  request_id TEXT UNIQUE NOT NULL,
  patient_name TEXT NOT NULL,
  patient_nrp TEXT NOT NULL,
  blood_type TEXT NOT NULL,
  units_requested INTEGER NOT NULL,
  urgency TEXT NOT NULL,
  status TEXT NOT NULL,
  requested_date TIMESTAMPTZ NOT NULL,
  purpose TEXT NOT NULL
);

-- Table untuk trainings
CREATE TABLE trainings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  training_id TEXT UNIQUE NOT NULL,
  training_name TEXT NOT NULL,
  training_type TEXT NOT NULL,
  instructor TEXT NOT NULL,
  start_date TIMESTAMPTZ NOT NULL,
  end_date TIMESTAMPTZ NOT NULL,
  duration_hours INTEGER NOT NULL,
  location TEXT NOT NULL,
  max_participants INTEGER NOT NULL,
  enrolled_count INTEGER DEFAULT 0,
  status TEXT NOT NULL,
  description TEXT
);

-- Table untuk certifications
CREATE TABLE certifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  certification_id TEXT UNIQUE NOT NULL,
  personnel_name TEXT NOT NULL,
  personnel_nrp TEXT NOT NULL,
  certification_name TEXT NOT NULL,
  certification_type TEXT NOT NULL,
  issuing_organization TEXT NOT NULL,
  issue_date TIMESTAMPTZ NOT NULL,
  expiry_date TIMESTAMPTZ NOT NULL,
  status TEXT NOT NULL,
  credential_id TEXT,
  notes TEXT
);
```

### Deploy Edge Functions

```bash
# Deploy semua edge functions baru
supabase functions deploy emergency-dispatch
supabase functions deploy blood-compatibility-check
supabase functions deploy telemedicine-notification
supabase functions deploy maintenance-scheduler
supabase functions deploy training-certificate-generator
```

---

## Testing

Untuk testing semua fitur baru:

1. **Emergency Response**: Buat kasus darurat dan test pengiriman ambulans
2. **Equipment Maintenance**: Tambah peralatan dan test alert perawatan
3. **Telemedicine**: Jadwalkan konsultasi dan test notifikasi
4. **Blood Bank**: Tambah inventori dan buat permintaan darah
5. **Training & Certification**: Buat pelatihan dan generate sertifikat

---

## Teknologi yang Digunakan

- **Frontend**: React 18 + TypeScript + Vite
- **UI Components**: shadcn/ui + Tailwind CSS
- **State Management**: TanStack Query
- **Backend**: Supabase (PostgreSQL + Edge Functions)
- **Icons**: lucide-react
- **Routing**: React Router v6
- **Validation**: Custom validation utils
- **Date Handling**: Native Date + custom date utils

---

## Kontribusi

Fitur-fitur ini dirancang untuk meningkatkan kemampuan sistem medical logistics TNI AU dalam:
- ✅ Respons cepat terhadap situasi darurat
- ✅ Pemeliharaan peralatan medis yang proaktif
- ✅ Akses healthcare jarak jauh untuk personel di lapangan
- ✅ Manajemen bank darah yang efisien
- ✅ Pengembangan kompetensi personel medis berkelanjutan
