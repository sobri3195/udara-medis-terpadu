export interface Hospital {
  id: string;
  name: string;
  location: string;
  type: string;
  capacity: number;
  status: 'active' | 'inactive' | 'maintenance';
  facilities?: string[];
  contact_info?: {
    phone?: string;
    email?: string;
    address?: string;
  };
  created_at?: string;
  updated_at?: string;
}

export interface InventoryItem {
  id: string;
  item_name: string;
  category: string;
  quantity: number;
  unit: string;
  reorder_level: number;
  expiry_date?: string;
  supplier_id?: string;
  hospital_id?: string;
  batch_number?: string;
  status?: 'available' | 'low_stock' | 'out_of_stock' | 'expired';
  created_at?: string;
  updated_at?: string;
}

export interface Personnel {
  id: string;
  name: string;
  rank: string;
  position: string;
  specialization?: string;
  hospital_id?: string;
  status: 'active' | 'inactive' | 'deployed' | 'leave';
  certifications?: string[];
  contact_info?: {
    phone?: string;
    email?: string;
  };
  created_at?: string;
  updated_at?: string;
}

export interface Distribution {
  id: string;
  from_location: string;
  to_location: string;
  items: DistributionItem[];
  status: 'pending' | 'in_transit' | 'delivered' | 'cancelled';
  scheduled_date: string;
  actual_date?: string;
  driver_id?: string;
  tracking_number?: string;
  notes?: string;
  created_at?: string;
  updated_at?: string;
}

export interface DistributionItem {
  item_id: string;
  item_name: string;
  quantity: number;
  unit: string;
}

export interface Schedule {
  id: string;
  personnel_id: string;
  hospital_id: string;
  date: string;
  shift_type: 'morning' | 'afternoon' | 'night';
  status: 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
  created_at?: string;
  updated_at?: string;
}

export interface FieldHospital {
  id: string;
  hospital_code: string;
  hospital_name: string;
  location: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  deployment_status: 'planned' | 'deploying' | 'operational' | 'returning' | 'deactivated';
  capacity: number;
  current_patients: number;
  medical_equipment?: string[];
  personnel_assigned?: string[];
  deployment_date?: string;
  mission_type: string;
  created_at?: string;
  updated_at?: string;
}

export interface AirdropOperation {
  id: string;
  operation_code: string;
  operation_name: string;
  target_location: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  scheduled_date: string;
  actual_date?: string;
  aircraft_type: string;
  pilot_assigned?: string;
  cargo_manifest: CargoItem[];
  status: 'planning' | 'approved' | 'in_progress' | 'completed' | 'cancelled';
  priority_level: 'low' | 'normal' | 'high' | 'critical';
  created_at?: string;
  updated_at?: string;
}

export interface CargoItem {
  item_id: string;
  item_name: string;
  quantity: number;
  weight: number;
  unit: string;
}

export interface ColdChainSensor {
  id: string;
  sensor_id: string;
  location: string;
  storage_type: 'freezer' | 'refrigerator' | 'room_temp';
  target_temp_min: number;
  target_temp_max: number;
  current_temperature?: number;
  current_humidity?: number;
  battery_level?: number;
  last_reading?: string;
  status: 'active' | 'maintenance' | 'offline';
  created_at?: string;
  updated_at?: string;
}

export interface ColdChainAlert {
  id: string;
  sensor_id: string;
  alert_type: 'temperature_high' | 'temperature_low' | 'humidity_high' | 'battery_low' | 'sensor_offline';
  severity: 'low' | 'medium' | 'high' | 'critical';
  current_value?: number;
  threshold_value?: number;
  acknowledged: boolean;
  resolved: boolean;
  created_at?: string;
}

export interface Vendor {
  id: string;
  name: string;
  vendor_code: string;
  contact_person?: string;
  email?: string;
  phone?: string;
  address?: string;
  certification_status: 'pending' | 'approved' | 'suspended' | 'revoked';
  quality_rating?: number;
  delivery_rating?: number;
  price_rating?: number;
  status: 'active' | 'inactive' | 'blacklisted';
  created_at?: string;
  updated_at?: string;
}

export interface UserRole {
  id: string;
  user_id: string;
  role: 'superadmin' | 'kapuskesau' | 'wakapuskesau' | 'karspau' | 'kalakespra' | 'kasubdis' | 'staff';
  assigned_by?: string;
  assigned_at?: string;
}

export interface ApiResponse<T> {
  data: T | null;
  error: Error | null;
}

export interface PaginationParams {
  page: number;
  pageSize: number;
}

export interface SortParams {
  column: string;
  ascending: boolean;
}

export interface FilterParams {
  [key: string]: any;
}
