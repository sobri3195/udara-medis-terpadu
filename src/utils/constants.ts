export const ROLES = {
  SUPERADMIN: 'superadmin',
  KAPUSKESAU: 'kapuskesau',
  WAKAPUSKESAU: 'wakapuskesau',
  KARSPAU: 'karspau',
  KALAKESPRA: 'kalakespra',
  KASUBDIS: 'kasubdis',
  STAFF: 'staff',
} as const;

export const ROLE_LABELS: Record<string, string> = {
  [ROLES.SUPERADMIN]: 'Super Administrator',
  [ROLES.KAPUSKESAU]: 'Kepala Pusat Kesehatan AU',
  [ROLES.WAKAPUSKESAU]: 'Wakil Kepala Pusat Kesehatan AU',
  [ROLES.KARSPAU]: 'Kepala Rumah Sakit Pusat AU',
  [ROLES.KALAKESPRA]: 'Kepala Lembaga Kesehatan Penerbangan',
  [ROLES.KASUBDIS]: 'Kepala Subdispenkes',
  [ROLES.STAFF]: 'Staff',
};

export const HOSPITAL_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  MAINTENANCE: 'maintenance',
} as const;

export const EMERGENCY_STATUS = {
  NORMAL: 'normal',
  BUSY: 'busy',
  CRITICAL: 'critical',
} as const;

export const EMERGENCY_STATUS_COLORS: Record<string, string> = {
  [EMERGENCY_STATUS.NORMAL]: 'bg-green-500',
  [EMERGENCY_STATUS.BUSY]: 'bg-yellow-500',
  [EMERGENCY_STATUS.CRITICAL]: 'bg-red-500',
};

export const DISTRIBUTION_STATUS = {
  PENDING: 'pending',
  IN_TRANSIT: 'in_transit',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
} as const;

export const DISTRIBUTION_STATUS_LABELS: Record<string, string> = {
  [DISTRIBUTION_STATUS.PENDING]: 'Menunggu',
  [DISTRIBUTION_STATUS.IN_TRANSIT]: 'Dalam Pengiriman',
  [DISTRIBUTION_STATUS.DELIVERED]: 'Terkirim',
  [DISTRIBUTION_STATUS.CANCELLED]: 'Dibatalkan',
};

export const INVENTORY_CATEGORIES = {
  MEDICINE: 'medicine',
  MEDICAL_EQUIPMENT: 'medical_equipment',
  CONSUMABLES: 'consumables',
  EMERGENCY_SUPPLIES: 'emergency_supplies',
  PROTECTIVE_EQUIPMENT: 'protective_equipment',
} as const;

export const INVENTORY_CATEGORY_LABELS: Record<string, string> = {
  [INVENTORY_CATEGORIES.MEDICINE]: 'Obat-obatan',
  [INVENTORY_CATEGORIES.MEDICAL_EQUIPMENT]: 'Alat Kesehatan',
  [INVENTORY_CATEGORIES.CONSUMABLES]: 'Bahan Habis Pakai',
  [INVENTORY_CATEGORIES.EMERGENCY_SUPPLIES]: 'Perlengkapan Darurat',
  [INVENTORY_CATEGORIES.PROTECTIVE_EQUIPMENT]: 'Alat Pelindung Diri',
};

export const PERSONNEL_POSITIONS = {
  DOCTOR: 'doctor',
  NURSE: 'nurse',
  PHARMACIST: 'pharmacist',
  LABORATORY: 'laboratory',
  RADIOLOGIST: 'radiologist',
  ADMINISTRATIVE: 'administrative',
} as const;

export const PERSONNEL_POSITION_LABELS: Record<string, string> = {
  [PERSONNEL_POSITIONS.DOCTOR]: 'Dokter',
  [PERSONNEL_POSITIONS.NURSE]: 'Perawat',
  [PERSONNEL_POSITIONS.PHARMACIST]: 'Apoteker',
  [PERSONNEL_POSITIONS.LABORATORY]: 'Analis Lab',
  [PERSONNEL_POSITIONS.RADIOLOGIST]: 'Radiolog',
  [PERSONNEL_POSITIONS.ADMINISTRATIVE]: 'Staff Administrasi',
};

export const SHIFT_TYPES = {
  MORNING: 'morning',
  AFTERNOON: 'afternoon',
  NIGHT: 'night',
} as const;

export const SHIFT_TYPE_LABELS: Record<string, string> = {
  [SHIFT_TYPES.MORNING]: 'Pagi (07:00 - 15:00)',
  [SHIFT_TYPES.AFTERNOON]: 'Siang (15:00 - 23:00)',
  [SHIFT_TYPES.NIGHT]: 'Malam (23:00 - 07:00)',
};

export const ALERT_SEVERITY = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  CRITICAL: 'critical',
} as const;

export const ALERT_SEVERITY_COLORS: Record<string, string> = {
  [ALERT_SEVERITY.LOW]: 'bg-blue-500',
  [ALERT_SEVERITY.MEDIUM]: 'bg-yellow-500',
  [ALERT_SEVERITY.HIGH]: 'bg-orange-500',
  [ALERT_SEVERITY.CRITICAL]: 'bg-red-500',
};

export const MISSION_TYPES = {
  MEDICAL_SUPPORT: 'medical_support',
  HUMANITARIAN: 'humanitarian',
  COMBAT_SUPPORT: 'combat_support',
  DISASTER_RESPONSE: 'disaster_response',
  PEACEKEEPING: 'peacekeeping',
} as const;

export const MISSION_TYPE_LABELS: Record<string, string> = {
  [MISSION_TYPES.MEDICAL_SUPPORT]: 'Dukungan Medis',
  [MISSION_TYPES.HUMANITARIAN]: 'Kemanusiaan',
  [MISSION_TYPES.COMBAT_SUPPORT]: 'Dukungan Tempur',
  [MISSION_TYPES.DISASTER_RESPONSE]: 'Tanggap Bencana',
  [MISSION_TYPES.PEACEKEEPING]: 'Penjaga Perdamaian',
};

export const THREAT_LEVELS = {
  LOW: 'low',
  MODERATE: 'moderate',
  HIGH: 'high',
  CRITICAL: 'critical',
} as const;

export const THREAT_LEVEL_LABELS: Record<string, string> = {
  [THREAT_LEVELS.LOW]: 'Rendah',
  [THREAT_LEVELS.MODERATE]: 'Sedang',
  [THREAT_LEVELS.HIGH]: 'Tinggi',
  [THREAT_LEVELS.CRITICAL]: 'Kritis',
};

export const DATE_FORMATS = {
  FULL: 'dd MMMM yyyy',
  SHORT: 'dd/MM/yyyy',
  TIME: 'HH:mm',
  DATETIME: 'dd/MM/yyyy HH:mm',
} as const;

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [10, 25, 50, 100],
} as const;

export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];

export const API_TIMEOUT = 30000; // 30 seconds
export const RETRY_ATTEMPTS = 3;
