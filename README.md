# 🏥 Sistem Manajemen Logistik Medis TNI AU

Sistem manajemen logistik medis terintegrasi berbasis web untuk TNI Angkatan Udara Indonesia dengan kontrol akses berbasis peran (RBAC), analitik prediktif bertenaga AI, dan integrasi dengan sistem nasional.

![Version](https://img.shields.io/badge/version-0.0.0-blue)
![React](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-3178C6?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-5.4.1-646CFF?logo=vite)
![Supabase](https://img.shields.io/badge/Supabase-2.56.0-3ECF8E?logo=supabase)

## 📋 Daftar Isi

- [Fitur Utama](#-fitur-utama)
- [Tech Stack](#-tech-stack)
- [Prasyarat](#-prasyarat)
- [Instalasi](#-instalasi)
- [Konfigurasi](#-konfigurasi)
- [Menjalankan Aplikasi](#-menjalankan-aplikasi)
- [Struktur Proyek](#-struktur-proyek)
- [Database Schema](#-database-schema)
- [Peran dan Hak Akses](#-peran-dan-hak-akses)
- [Integrasi Eksternal](#-integrasi-eksternal)
- [Edge Functions](#-edge-functions)
- [Pengembangan](#-pengembangan)
- [Deployment](#-deployment)
- [Kontribusi](#-kontribusi)
- [Lisensi](#-lisensi)

## ✨ Fitur Utama

### 🎯 Dashboard Operasional Real-Time
- **Monitoring multi-rumah sakit** dengan status tempat tidur, ruang operasi, dan ambulans
- **Statistik terintegrasi** pasien aktif, stok obat, kapasitas RS, dan distribusi logistik
- **Notifikasi dan alert** otomatis untuk kondisi kritis
- **Visualisasi resource utilization** dengan grafik interaktif

### 🏥 Manajemen Rumah Sakit
- Pengelolaan data rumah sakit TNI AU (RSPAU Hardjolukito, RS Lanud Halim, dll)
- Monitoring status darurat dan kapasitas real-time
- Manajemen fasilitas medis dan peralatan
- Field hospital deployment dan tracking

### 📦 Logistik & Inventori Cerdas
- **AI-powered inventory forecasting** dengan predictive analytics
- **Cold chain monitoring** dengan sensor suhu dan kelembaban real-time
- **Multi-hospital supply network** dengan inter-hospital transfer
- **Vendor management system** dengan rating dan sertifikasi
- Automated reorder suggestions berdasarkan trend dan seasonal factors
- Barcode/QR code integration untuk tracking item

### 🚁 Operasi Militer
- **Field hospital management** dengan deployment tracking
- **Airdrop operations** untuk pasokan medis ke zona tempur
- **Combat zone supplies** dengan threat level assessment
- **Evacuation kits** management dan readiness tracking
- **Theater operations** coordination untuk operasi multi-lokasi
- Mission planning dan execution tracking

### 🚚 Distribusi & Supply Chain
- Real-time tracking pengiriman obat dan alat kesehatan
- Route optimization untuk distribusi
- Integration dengan sistem logistik nasional
- Proof of delivery dan dokumentasi digital
- Emergency distribution protocols

### 👥 Manajemen Personel
- Database dokter, perawat, dan staff medis TNI AU
- Skill matrix dan certification tracking
- Deployment history dan availability status
- Performance tracking dan evaluations
- Training dan continuing education management

### 📅 Penjadwalan
- Jadwal dokter dan rotasi shift
- Operation theater booking system
- Resource allocation dan conflict prevention
- Emergency override capabilities
- Mobile-friendly scheduling interface

### 💊 Layanan Medis
- Patient records dan medical history (RBAC-protected)
- Treatment protocols dan clinical pathways
- Telemedicine integration
- Medical imaging dan lab results tracking
- Pharmacy integration

### 📊 Analytics & Reporting
- **Predictive analytics** untuk demand forecasting
- **Custom report builder** dengan berbagai template
- **WHO standards compliance** reporting
- Export ke PDF, Excel, dan format lainnya
- Data visualization dengan charts dan graphs interaktif
- Trend analysis dan benchmarking

### 🔐 Keamanan & Compliance
- **Role-Based Access Control (RBAC)** dengan 7+ roles
- **Row-Level Security (RLS)** di database layer
- **Audit logging** untuk semua operasi kritis
- **WHO standards compliance** monitoring
- Data encryption at rest dan in transit
- Secure authentication dengan Supabase Auth

### 🌐 Integrasi Sistem Nasional
- **BPJS Integration** untuk klaim dan verifikasi
- **SatuSehat/SATUSEHAT** untuk health data exchange
- **Disaster Management System** untuk koordinasi bencana
- **Military Logistics AI** untuk optimasi supply chain
- WHO reporting dan compliance system

## 🛠 Tech Stack

### Frontend
- **React 18.3.1** - UI library dengan hooks modern
- **TypeScript 5.5.3** - Type-safe JavaScript
- **Vite 5.4.1** - Fast build tool dan dev server
- **React Router 6.26.2** - Client-side routing
- **TanStack Query 5.56.2** - Data fetching dan caching
- **Tailwind CSS 3.4.11** - Utility-first CSS framework
- **shadcn/ui** - High-quality React components
- **Radix UI** - Accessible component primitives
- **Recharts 2.12.7** - Composable charting library
- **Lucide React** - Beautiful icon system
- **React Hook Form 7.53.0** - Performant form validation
- **Zod 3.23.8** - TypeScript-first schema validation
- **Sonner** - Toast notifications

### Backend
- **Supabase** - Backend-as-a-Service platform
  - PostgreSQL Database dengan Row-Level Security
  - Authentication & Authorization
  - Real-time subscriptions
  - Edge Functions (Deno runtime)
  - Storage untuk file uploads

### AI & Analytics
- Predictive analytics engine
- Inventory forecasting algorithms
- Military logistics optimization AI
- Natural language processing untuk reports

### DevOps & Tools
- **ESLint** - Code linting
- **PostCSS** - CSS transformations
- **Autoprefixer** - CSS vendor prefixing
- **TypeScript ESLint** - TypeScript linting
- **Lovable Tagger** - Component tagging system

## 📋 Prasyarat

Sebelum memulai, pastikan Anda telah menginstall:

- **Node.js** 18.x atau lebih tinggi
- **npm** atau **bun** (package manager)
- **Git** untuk version control
- **Supabase CLI** (optional, untuk local development)
- Browser modern (Chrome, Firefox, Safari, Edge)

## 🚀 Instalasi

### 1. Clone Repository

```bash
git clone <repository-url>
cd vite_react_shadcn_ts
```

### 2. Install Dependencies

Menggunakan npm:
```bash
npm install
```

Atau menggunakan bun:
```bash
bun install
```

### 3. Setup Environment Variables

Buat file `.env` di root directory:

```env
VITE_SUPABASE_PROJECT_ID=your_project_id
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your_anon_key
```

## ⚙️ Konfigurasi

### Supabase Setup

1. Buat akun di [Supabase](https://supabase.com)
2. Buat project baru
3. Jalankan migrations yang ada di folder `supabase/migrations/`
4. Deploy Edge Functions dari folder `supabase/functions/`
5. Configure authentication providers yang diperlukan

### Database Migrations

Jalankan migrations secara berurutan:

```bash
supabase db push
```

Atau import manual melalui Supabase Dashboard.

## 🏃‍♂️ Menjalankan Aplikasi

### Development Mode

```bash
npm run dev
```

Aplikasi akan berjalan di `http://localhost:5173`

### Build untuk Production

```bash
npm run build
```

Output akan berada di folder `dist/`

### Preview Production Build

```bash
npm run preview
```

### Linting

```bash
npm run lint
```

## 📁 Struktur Proyek

```
vite_react_shadcn_ts/
├── public/                  # Static assets
├── src/
│   ├── components/         # React components
│   │   ├── ui/            # shadcn/ui components
│   │   ├── dashboard/     # Dashboard-specific components
│   │   ├── logistics/     # Logistics components
│   │   ├── military/      # Military operations components
│   │   ├── analytics/     # Analytics components
│   │   ├── crud/          # CRUD form components
│   │   ├── export/        # Export/report components
│   │   ├── quality/       # Quality compliance components
│   │   ├── Header.tsx     # Main header component
│   │   ├── Sidebar.tsx    # Navigation sidebar
│   │   └── ProtectedRoute.tsx  # Route guard
│   ├── hooks/             # Custom React hooks
│   │   ├── useAuth.tsx    # Authentication hook & context
│   │   ├── useCRUD.tsx    # Generic CRUD operations hook
│   │   ├── use-toast.ts   # Toast notifications hook
│   │   └── use-mobile.tsx # Mobile detection hook
│   ├── integrations/      # External integrations
│   │   └── supabase/      # Supabase client & types
│   ├── lib/              # Utility functions
│   ├── pages/            # Page components (routes)
│   │   ├── Index.tsx          # Landing page
│   │   ├── Auth.tsx           # Login/Register
│   │   ├── Dashboard.tsx      # Main dashboard
│   │   ├── LogisticsAndInventory.tsx
│   │   ├── AdvancedLogistics.tsx
│   │   ├── Distribution.tsx
│   │   ├── Personnel.tsx
│   │   ├── Schedule.tsx
│   │   ├── MedicalServices.tsx
│   │   ├── Analytics.tsx
│   │   ├── MilitaryOperations.tsx
│   │   ├── QualityCompliance.tsx
│   │   ├── Reports.tsx
│   │   └── NotFound.tsx
│   ├── utils/            # Helper functions
│   ├── App.tsx           # Main App component
│   ├── main.tsx          # Entry point
│   └── index.css         # Global styles
├── supabase/
│   ├── functions/        # Edge Functions
│   │   ├── predictive-analytics/
│   │   ├── inventory-forecasting/
│   │   ├── military-logistics-ai/
│   │   ├── bpjs-satusehat-integration/
│   │   ├── disaster-management-integration/
│   │   ├── external-integration/
│   │   └── who-standards-compliance/
│   ├── migrations/       # Database migrations
│   └── config.toml       # Supabase config
├── components.json       # shadcn/ui config
├── tailwind.config.ts    # Tailwind configuration
├── tsconfig.json         # TypeScript configuration
├── vite.config.ts        # Vite configuration
└── package.json          # Dependencies & scripts
```

## 🗄 Database Schema

### Core Tables

#### Hospitals
Menyimpan data rumah sakit TNI AU
- `id`, `name`, `location`, `type`, `capacity`, `status`, `facilities`, `contact_info`

#### Inventory
Manajemen stok obat dan alat kesehatan
- `id`, `item_name`, `category`, `quantity`, `unit`, `reorder_level`, `expiry_date`, `supplier_id`, `hospital_id`

#### Inventory Forecasting
AI-powered demand prediction
- `id`, `item_id`, `forecast_date`, `predicted_demand`, `confidence_score`, `seasonal_factor`, `trend_factor`

#### Personnel
Database personel medis
- `id`, `name`, `rank`, `position`, `specialization`, `hospital_id`, `status`, `certifications`

#### Distributions
Tracking distribusi logistik
- `id`, `from_location`, `to_location`, `items`, `status`, `scheduled_date`, `actual_date`, `driver_id`

#### Schedules
Penjadwalan dokter dan fasilitas
- `id`, `personnel_id`, `hospital_id`, `date`, `shift_type`, `status`, `notes`

### Advanced Logistics Tables

#### Cold Chain Sensors
Monitoring suhu cold chain
- `id`, `sensor_id`, `location`, `target_temp_min`, `target_temp_max`, `current_temperature`, `status`

#### Cold Chain Alerts
Alert untuk breach suhu
- `id`, `sensor_id`, `alert_type`, `severity`, `acknowledged`, `resolved`

#### Inter-Hospital Transfers
Transfer antar rumah sakit
- `id`, `from_hospital_id`, `to_hospital_id`, `item_id`, `quantity`, `status`, `priority`

#### Vendors
Manajemen vendor/supplier
- `id`, `name`, `vendor_code`, `contact_person`, `certification_status`, `quality_rating`, `delivery_rating`

### Military Operations Tables

#### Field Hospitals
Rumah sakit lapangan
- `id`, `hospital_code`, `location`, `coordinates`, `deployment_status`, `capacity`, `personnel_assigned`

#### Airdrop Operations
Operasi airdrop supplies
- `id`, `operation_code`, `target_location`, `coordinates`, `aircraft_type`, `cargo_manifest`, `status`

#### Combat Zone Supplies
Supplies untuk zona tempur
- `id`, `supply_code`, `zone_designation`, `threat_level`, `item_id`, `armored_transport_required`

#### Evacuation Kits
Kit evakuasi medis
- `id`, `kit_code`, `kit_type`, `contents`, `location`, `deployment_ready`, `last_inspection`

#### Theater Operations
Koordinasi operasi theater
- `id`, `theater_code`, `operation_type`, `start_date`, `end_date`, `status`, `participating_units`

### Authentication & Authorization

#### User Roles
Role-based access control
- `id`, `user_id`, `role`, `assigned_by`, `assigned_at`

Roles yang tersedia:
- `superadmin` - Full access
- `kapuskesau` - Kepala Pusat Kesehatan AU
- `wakapuskesau` - Wakil Kepala Pusat Kesehatan AU
- `karspau` - Kepala Rumah Sakit Pusat AU
- `kalakespra` - Kepala Lembaga Kesehatan Penerbangan dan Ruang Angkasa
- `kasubdis` - Kepala Subdispenkes
- `staff` - Staff operasional

## 🔐 Peran dan Hak Akses

### Superadmin
- Full access ke semua fitur dan data
- User management
- System configuration
- Audit logs

### Kapuskesau & Wakapuskesau
- Hospital management
- Personnel management
- Inventory dan distributions
- Medical services
- Schedules
- Reports dan analytics

### Karspau
- Inventory management
- Medical services
- Distributions
- Military operations
- Reports

### Kalakespra
- Inventory management
- Distributions
- Military operations
- Field hospital management

### Kasubdis
- Medical services
- Personnel (read-only)
- Reports

### Staff
- Read-only access ke data sesuai assignment
- Input data operasional
- Basic reporting

## 🌐 Integrasi Eksternal

### 1. Predictive Analytics
**Path:** `/supabase/functions/predictive-analytics`

Analisis prediktif untuk:
- Demand forecasting
- Resource allocation
- Trend analysis

### 2. Inventory Forecasting
**Path:** `/supabase/functions/inventory-forecasting`

AI-powered inventory prediction:
- Seasonal adjustments
- Trend analysis
- Automated reorder suggestions

### 3. Military Logistics AI
**Path:** `/supabase/functions/military-logistics-ai`

Optimasi logistik militer:
- Route optimization
- Resource allocation
- Mission planning support

### 4. BPJS & SatuSehat Integration
**Path:** `/supabase/functions/bpjs-satusehat-integration`

Integrasi sistem kesehatan nasional:
- Klaim BPJS
- Data synchronization dengan SatuSehat
- Patient verification

### 5. Disaster Management Integration
**Path:** `/supabase/functions/disaster-management-integration`

Koordinasi manajemen bencana:
- Resource mobilization
- Communication protocols
- Multi-agency coordination

### 6. WHO Standards Compliance
**Path:** `/supabase/functions/who-standards-compliance`

Monitoring compliance:
- WHO guidelines adherence
- Quality metrics
- Automated reporting

### 7. External Integration
**Path:** `/supabase/functions/external-integration`

Generic integration framework untuk sistem eksternal

## 🔧 Edge Functions

Semua Edge Functions menggunakan Deno runtime dan dapat diakses via:

```
https://[project-ref].supabase.co/functions/v1/[function-name]
```

Authentication required via Bearer token.

### Development

Test locally:
```bash
supabase functions serve [function-name]
```

Deploy:
```bash
supabase functions deploy [function-name]
```

## 👨‍💻 Pengembangan

### Menambah Halaman Baru

1. Buat file baru di `src/pages/NamaHalaman.tsx`
2. Tambahkan route di `src/App.tsx`
3. Tambahkan navigation link di `src/components/Sidebar.tsx`

### Menambah Component

1. Buat component di folder yang sesuai di `src/components/`
2. Export dari index file jika perlu
3. Import dan gunakan di halaman

### Menambah Table Baru

1. Buat migration file di `supabase/migrations/`
2. Define schema dengan RLS policies
3. Update TypeScript types jika perlu
4. Jalankan migration

### Best Practices

- Gunakan TypeScript types yang strict
- Implement error boundaries
- Follow React hooks rules
- Use Tailwind utility classes
- Implement proper loading states
- Add proper error handling
- Write clean, documented code
- Follow component composition patterns
- Use custom hooks untuk reusable logic

## 🚢 Deployment

### Vercel (Recommended)

1. Connect repository ke Vercel
2. Set environment variables
3. Deploy otomatis dari branch main

### Netlify

1. Connect repository ke Netlify
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Set environment variables

### Manual Deployment

```bash
npm run build
# Upload dist/ folder ke hosting
```

### Supabase Backend

Backend sudah di-host di Supabase cloud. Untuk self-hosting:

1. Setup Supabase self-hosted
2. Run migrations
3. Deploy edge functions
4. Update connection strings

## 🤝 Kontribusi

Kontribusi sangat diterima! Silakan:

1. Fork repository
2. Buat branch fitur (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

### Coding Standards

- Follow ESLint rules
- Write meaningful commit messages
- Add tests untuk fitur baru
- Update documentation
- Keep components small dan focused

## 📝 Lisensi

Proprietary - TNI Angkatan Udara Indonesia

© 2024 TNI AU. All rights reserved.

---

## 📞 Kontak & Support

Untuk pertanyaan atau support, hubungi:
- Email: support@puskesau.mil.id
- Website: https://puskesau.mil.id

## 🙏 Acknowledgments

- TNI Angkatan Udara Indonesia
- Puskes AU
- Tim Development dan Support
- Open source community untuk tools yang digunakan

---

**⚠️ PERHATIAN:** Sistem ini mengandung data sensitif militer. Unauthorized access is prohibited and will be prosecuted according to Indonesian military law.
