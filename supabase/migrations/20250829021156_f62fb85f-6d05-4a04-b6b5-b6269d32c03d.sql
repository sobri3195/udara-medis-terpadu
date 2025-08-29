-- Advanced Logistics Tables

-- Smart Inventory Forecasting
CREATE TABLE public.inventory_forecasting (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  item_id UUID NOT NULL REFERENCES public.inventory(id) ON DELETE CASCADE,
  forecast_date DATE NOT NULL,
  predicted_demand INTEGER NOT NULL DEFAULT 0,
  confidence_score DECIMAL(3,2) NOT NULL DEFAULT 0.0,
  seasonal_factor DECIMAL(3,2) NOT NULL DEFAULT 1.0,
  trend_factor DECIMAL(3,2) NOT NULL DEFAULT 1.0,
  suggested_reorder_quantity INTEGER NOT NULL DEFAULT 0,
  suggested_reorder_date DATE,
  algorithm_used TEXT NOT NULL DEFAULT 'ai_prediction',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_by UUID REFERENCES auth.users(id)
);

-- Cold Chain Management
CREATE TABLE public.cold_chain_sensors (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  sensor_id TEXT NOT NULL UNIQUE,
  location TEXT NOT NULL,
  storage_type TEXT NOT NULL, -- freezer, refrigerator, room_temp
  target_temp_min DECIMAL(4,1) NOT NULL,
  target_temp_max DECIMAL(4,1) NOT NULL,
  current_temperature DECIMAL(4,1),
  current_humidity DECIMAL(4,1),
  battery_level INTEGER DEFAULT 100,
  last_reading TIMESTAMP WITH TIME ZONE,
  status TEXT NOT NULL DEFAULT 'active', -- active, maintenance, offline
  alert_threshold_breach_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_by UUID REFERENCES auth.users(id)
);

CREATE TABLE public.cold_chain_alerts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  sensor_id UUID NOT NULL REFERENCES public.cold_chain_sensors(id) ON DELETE CASCADE,
  alert_type TEXT NOT NULL, -- temperature_high, temperature_low, humidity_high, battery_low, sensor_offline
  severity TEXT NOT NULL DEFAULT 'medium', -- low, medium, high, critical
  current_value DECIMAL(4,1),
  threshold_value DECIMAL(4,1),
  duration_minutes INTEGER DEFAULT 0,
  acknowledged BOOLEAN DEFAULT FALSE,
  acknowledged_by UUID REFERENCES auth.users(id),
  acknowledged_at TIMESTAMP WITH TIME ZONE,
  resolved BOOLEAN DEFAULT FALSE,
  resolved_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_by UUID REFERENCES auth.users(id)
);

-- Multi-Hospital Supply Network
CREATE TABLE public.inter_hospital_transfers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  from_hospital_id UUID NOT NULL REFERENCES public.hospitals(id),
  to_hospital_id UUID NOT NULL REFERENCES public.hospitals(id),
  item_id UUID NOT NULL REFERENCES public.inventory(id),
  quantity INTEGER NOT NULL,
  transfer_type TEXT NOT NULL DEFAULT 'regular', -- regular, emergency, scheduled
  priority TEXT NOT NULL DEFAULT 'normal', -- low, normal, high, critical
  status TEXT NOT NULL DEFAULT 'requested', -- requested, approved, in_transit, delivered, cancelled
  requested_by UUID REFERENCES auth.users(id),
  approved_by UUID REFERENCES auth.users(id),
  estimated_arrival TIMESTAMP WITH TIME ZONE,
  actual_delivery TIMESTAMP WITH TIME ZONE,
  tracking_number TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_by UUID REFERENCES auth.users(id)
);

-- Vendor Management
CREATE TABLE public.vendors (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  vendor_code TEXT NOT NULL UNIQUE,
  contact_person TEXT,
  email TEXT,
  phone TEXT,
  address TEXT,
  registration_number TEXT,
  tax_id TEXT,
  certification_status TEXT NOT NULL DEFAULT 'pending', -- pending, approved, suspended, revoked
  quality_rating DECIMAL(3,2) DEFAULT 0.0,
  delivery_rating DECIMAL(3,2) DEFAULT 0.0,
  price_rating DECIMAL(3,2) DEFAULT 0.0,
  contract_start_date DATE,
  contract_end_date DATE,
  payment_terms TEXT,
  delivery_terms TEXT,
  status TEXT NOT NULL DEFAULT 'active', -- active, inactive, blacklisted
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_by UUID REFERENCES auth.users(id)
);

CREATE TABLE public.vendor_contracts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  vendor_id UUID NOT NULL REFERENCES public.vendors(id) ON DELETE CASCADE,
  contract_number TEXT NOT NULL UNIQUE,
  contract_type TEXT NOT NULL, -- purchase, service, maintenance
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  total_value DECIMAL(15,2),
  currency TEXT DEFAULT 'IDR',
  payment_schedule TEXT,
  delivery_schedule TEXT,
  performance_metrics JSONB,
  renewal_option BOOLEAN DEFAULT FALSE,
  auto_renewal BOOLEAN DEFAULT FALSE,
  status TEXT NOT NULL DEFAULT 'draft', -- draft, active, expired, terminated
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_by UUID REFERENCES auth.users(id)
);

-- Quality & Compliance Tables

-- Quality Assurance
CREATE TABLE public.quality_audits (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  audit_type TEXT NOT NULL, -- internal, external, regulatory, supplier
  audit_title TEXT NOT NULL,
  audit_scope TEXT NOT NULL,
  auditor_name TEXT NOT NULL,
  auditor_organization TEXT,
  audit_date DATE NOT NULL,
  status TEXT NOT NULL DEFAULT 'scheduled', -- scheduled, in_progress, completed, cancelled
  overall_score DECIMAL(4,2),
  compliance_percentage DECIMAL(5,2),
  findings_count INTEGER DEFAULT 0,
  non_conformities_count INTEGER DEFAULT 0,
  recommendations TEXT,
  next_audit_date DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_by UUID REFERENCES auth.users(id)
);

CREATE TABLE public.audit_findings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  audit_id UUID NOT NULL REFERENCES public.quality_audits(id) ON DELETE CASCADE,
  finding_type TEXT NOT NULL, -- non_conformity, observation, opportunity
  severity TEXT NOT NULL DEFAULT 'medium', -- low, medium, high, critical
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  root_cause TEXT,
  corrective_action TEXT,
  preventive_action TEXT,
  responsible_person TEXT,
  target_completion_date DATE,
  actual_completion_date DATE,
  verification_date DATE,
  status TEXT NOT NULL DEFAULT 'open', -- open, in_progress, completed, verified, closed
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_by UUID REFERENCES auth.users(id)
);

-- Incident Reporting
CREATE TABLE public.incident_reports (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  incident_number TEXT NOT NULL UNIQUE,
  incident_type TEXT NOT NULL, -- safety, quality, security, environmental, operational
  severity TEXT NOT NULL DEFAULT 'medium', -- low, medium, high, critical
  location TEXT NOT NULL,
  incident_date TIMESTAMP WITH TIME ZONE NOT NULL,
  reported_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  reported_by UUID REFERENCES auth.users(id),
  involved_personnel TEXT[],
  description TEXT NOT NULL,
  immediate_action TEXT,
  root_cause_analysis TEXT,
  corrective_actions TEXT,
  preventive_measures TEXT,
  investigation_status TEXT NOT NULL DEFAULT 'open', -- open, investigating, closed
  follow_up_required BOOLEAN DEFAULT TRUE,
  follow_up_date DATE,
  regulatory_notification_required BOOLEAN DEFAULT FALSE,
  regulatory_notified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_by UUID REFERENCES auth.users(id)
);

-- Drug Safety Monitoring
CREATE TABLE public.adverse_events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  event_number TEXT NOT NULL UNIQUE,
  patient_identifier TEXT NOT NULL, -- anonymized patient ID
  drug_name TEXT NOT NULL,
  drug_batch_number TEXT,
  event_description TEXT NOT NULL,
  severity TEXT NOT NULL DEFAULT 'mild', -- mild, moderate, severe, life_threatening
  onset_date DATE,
  recovery_date DATE,
  outcome TEXT, -- recovered, recovering, not_recovered, fatal, unknown
  causality_assessment TEXT DEFAULT 'possible', -- certain, probable, possible, unlikely, unrelated
  dechallenge_result TEXT, -- positive, negative, not_applicable
  rechallenge_result TEXT, -- positive, negative, not_done
  concomitant_medications TEXT[],
  medical_history TEXT,
  reported_by TEXT NOT NULL,
  reported_date DATE NOT NULL DEFAULT CURRENT_DATE,
  regulatory_reported BOOLEAN DEFAULT FALSE,
  regulatory_report_number TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_by UUID REFERENCES auth.users(id)
);

-- Analytics & Intelligence Tables

-- Cost Management
CREATE TABLE public.budget_categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  category_name TEXT NOT NULL UNIQUE,
  category_code TEXT NOT NULL UNIQUE,
  parent_category_id UUID REFERENCES public.budget_categories(id),
  description TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_by UUID REFERENCES auth.users(id)
);

CREATE TABLE public.budgets (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  category_id UUID NOT NULL REFERENCES public.budget_categories(id),
  fiscal_year INTEGER NOT NULL,
  allocated_amount DECIMAL(15,2) NOT NULL,
  spent_amount DECIMAL(15,2) DEFAULT 0,
  committed_amount DECIMAL(15,2) DEFAULT 0,
  currency TEXT DEFAULT 'IDR',
  status TEXT NOT NULL DEFAULT 'active', -- active, frozen, closed
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_by UUID REFERENCES auth.users(id)
);

CREATE TABLE public.expenses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  expense_number TEXT NOT NULL UNIQUE,
  category_id UUID NOT NULL REFERENCES public.budget_categories(id),
  vendor_id UUID REFERENCES public.vendors(id),
  description TEXT NOT NULL,
  amount DECIMAL(15,2) NOT NULL,
  currency TEXT DEFAULT 'IDR',
  expense_date DATE NOT NULL,
  payment_status TEXT NOT NULL DEFAULT 'pending', -- pending, paid, overdue, cancelled
  payment_method TEXT,
  reference_number TEXT,
  approval_status TEXT NOT NULL DEFAULT 'pending', -- pending, approved, rejected
  approved_by UUID REFERENCES auth.users(id),
  approved_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_by UUID REFERENCES auth.users(id)
);

-- External System Integration
CREATE TABLE public.external_systems (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  system_name TEXT NOT NULL,
  system_type TEXT NOT NULL, -- hospital, moh, insurance, vendor, laboratory
  endpoint_url TEXT,
  api_version TEXT,
  authentication_method TEXT, -- api_key, oauth, basic_auth, certificate
  connection_status TEXT NOT NULL DEFAULT 'inactive', -- active, inactive, error, maintenance
  last_sync TIMESTAMP WITH TIME ZONE,
  sync_frequency INTEGER DEFAULT 60, -- minutes
  auto_sync_enabled BOOLEAN DEFAULT FALSE,
  error_count INTEGER DEFAULT 0,
  last_error TEXT,
  configuration JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_by UUID REFERENCES auth.users(id)
);

CREATE TABLE public.integration_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  system_id UUID NOT NULL REFERENCES public.external_systems(id) ON DELETE CASCADE,
  operation_type TEXT NOT NULL, -- sync, send, receive, authenticate
  status TEXT NOT NULL, -- success, failed, partial
  request_payload JSONB,
  response_payload JSONB,
  error_message TEXT,
  processing_time_ms INTEGER,
  records_processed INTEGER DEFAULT 0,
  records_success INTEGER DEFAULT 0,
  records_failed INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_by UUID REFERENCES auth.users(id)
);

-- Enable RLS on all tables
ALTER TABLE public.inventory_forecasting ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cold_chain_sensors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cold_chain_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inter_hospital_transfers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vendors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vendor_contracts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quality_audits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_findings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.incident_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.adverse_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.budget_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.budgets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.external_systems ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.integration_logs ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for viewing (all authenticated users can view)
CREATE POLICY "All authenticated users can view inventory forecasting" 
ON public.inventory_forecasting FOR SELECT USING (true);

CREATE POLICY "All authenticated users can view cold chain sensors" 
ON public.cold_chain_sensors FOR SELECT USING (true);

CREATE POLICY "All authenticated users can view cold chain alerts" 
ON public.cold_chain_alerts FOR SELECT USING (true);

CREATE POLICY "All authenticated users can view inter hospital transfers" 
ON public.inter_hospital_transfers FOR SELECT USING (true);

CREATE POLICY "All authenticated users can view vendors" 
ON public.vendors FOR SELECT USING (true);

CREATE POLICY "All authenticated users can view vendor contracts" 
ON public.vendor_contracts FOR SELECT USING (true);

CREATE POLICY "All authenticated users can view quality audits" 
ON public.quality_audits FOR SELECT USING (true);

CREATE POLICY "All authenticated users can view audit findings" 
ON public.audit_findings FOR SELECT USING (true);

CREATE POLICY "All authenticated users can view incident reports" 
ON public.incident_reports FOR SELECT USING (true);

CREATE POLICY "All authenticated users can view adverse events" 
ON public.adverse_events FOR SELECT USING (true);

CREATE POLICY "All authenticated users can view budget categories" 
ON public.budget_categories FOR SELECT USING (true);

CREATE POLICY "All authenticated users can view budgets" 
ON public.budgets FOR SELECT USING (true);

CREATE POLICY "All authenticated users can view expenses" 
ON public.expenses FOR SELECT USING (true);

CREATE POLICY "All authenticated users can view external systems" 
ON public.external_systems FOR SELECT USING (true);

CREATE POLICY "All authenticated users can view integration logs" 
ON public.integration_logs FOR SELECT USING (true);

-- Create RLS policies for management (admins and specific roles)
CREATE POLICY "Admins and logistics can manage inventory forecasting" 
ON public.inventory_forecasting FOR ALL 
USING (is_admin() OR has_role(auth.uid(), 'karspau'::app_role) OR has_role(auth.uid(), 'kalakespra'::app_role));

CREATE POLICY "Admins and logistics can manage cold chain sensors" 
ON public.cold_chain_sensors FOR ALL 
USING (is_admin() OR has_role(auth.uid(), 'karspau'::app_role) OR has_role(auth.uid(), 'kalakespra'::app_role));

CREATE POLICY "Admins and logistics can manage cold chain alerts" 
ON public.cold_chain_alerts FOR ALL 
USING (is_admin() OR has_role(auth.uid(), 'karspau'::app_role) OR has_role(auth.uid(), 'kalakespra'::app_role));

CREATE POLICY "Admins and logistics can manage transfers" 
ON public.inter_hospital_transfers FOR ALL 
USING (is_admin() OR has_role(auth.uid(), 'karspau'::app_role) OR has_role(auth.uid(), 'kalakespra'::app_role));

CREATE POLICY "Admins can manage vendors" 
ON public.vendors FOR ALL USING (is_admin());

CREATE POLICY "Admins can manage vendor contracts" 
ON public.vendor_contracts FOR ALL USING (is_admin());

CREATE POLICY "Admins can manage quality audits" 
ON public.quality_audits FOR ALL USING (is_admin());

CREATE POLICY "Admins can manage audit findings" 
ON public.audit_findings FOR ALL USING (is_admin());

CREATE POLICY "All authenticated users can create incident reports" 
ON public.incident_reports FOR INSERT 
WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Admins can manage incident reports" 
ON public.incident_reports FOR UPDATE, DELETE USING (is_admin());

CREATE POLICY "Medical staff can manage adverse events" 
ON public.adverse_events FOR ALL 
USING (is_admin() OR has_role(auth.uid(), 'kasubdis'::app_role));

CREATE POLICY "Admins can manage budget categories" 
ON public.budget_categories FOR ALL USING (is_admin());

CREATE POLICY "Admins can manage budgets" 
ON public.budgets FOR ALL USING (is_admin());

CREATE POLICY "Admins can manage expenses" 
ON public.expenses FOR ALL USING (is_admin());

CREATE POLICY "Admins can manage external systems" 
ON public.external_systems FOR ALL USING (is_admin());

CREATE POLICY "Admins can manage integration logs" 
ON public.integration_logs FOR ALL USING (is_admin());

-- Create triggers for updated_at columns
CREATE TRIGGER update_inventory_forecasting_updated_at
BEFORE UPDATE ON public.inventory_forecasting
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_cold_chain_sensors_updated_at
BEFORE UPDATE ON public.cold_chain_sensors
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_inter_hospital_transfers_updated_at
BEFORE UPDATE ON public.inter_hospital_transfers
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_vendors_updated_at
BEFORE UPDATE ON public.vendors
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_vendor_contracts_updated_at
BEFORE UPDATE ON public.vendor_contracts
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_quality_audits_updated_at
BEFORE UPDATE ON public.quality_audits
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_audit_findings_updated_at
BEFORE UPDATE ON public.audit_findings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_incident_reports_updated_at
BEFORE UPDATE ON public.incident_reports
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_adverse_events_updated_at
BEFORE UPDATE ON public.adverse_events
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_budget_categories_updated_at
BEFORE UPDATE ON public.budget_categories
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_budgets_updated_at
BEFORE UPDATE ON public.budgets
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_expenses_updated_at
BEFORE UPDATE ON public.expenses
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_external_systems_updated_at
BEFORE UPDATE ON public.external_systems
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();