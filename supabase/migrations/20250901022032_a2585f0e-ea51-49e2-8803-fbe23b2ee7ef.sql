-- Military-Specific Operations Tables
CREATE TABLE public.field_hospitals (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  hospital_code TEXT NOT NULL UNIQUE,
  hospital_name TEXT NOT NULL,
  location TEXT NOT NULL,
  coordinates JSONB,
  deployment_status TEXT NOT NULL DEFAULT 'planned',
  capacity INTEGER DEFAULT 0,
  current_patients INTEGER DEFAULT 0,
  medical_equipment JSONB DEFAULT '[]'::jsonb,
  personnel_assigned UUID[] DEFAULT '{}'::uuid[],
  deployment_date TIMESTAMP WITH TIME ZONE,
  mission_type TEXT NOT NULL DEFAULT 'medical_support',
  theater_id UUID,
  commander_id UUID,
  supply_requirements JSONB DEFAULT '{}'::jsonb,
  logistics_status TEXT DEFAULT 'preparing'::text,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_by UUID
);

CREATE TABLE public.airdrop_operations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  operation_code TEXT NOT NULL UNIQUE,
  operation_name TEXT NOT NULL,
  target_location TEXT NOT NULL,
  coordinates JSONB NOT NULL,
  scheduled_date TIMESTAMP WITH TIME ZONE NOT NULL,
  actual_date TIMESTAMP WITH TIME ZONE,
  aircraft_type TEXT NOT NULL,
  pilot_assigned UUID,
  cargo_manifest JSONB DEFAULT '[]'::jsonb,
  total_weight NUMERIC DEFAULT 0,
  drop_zone_conditions TEXT,
  weather_status TEXT DEFAULT 'pending'::text,
  status TEXT NOT NULL DEFAULT 'planning',
  priority_level TEXT NOT NULL DEFAULT 'normal',
  recipient_unit TEXT NOT NULL,
  ground_contact_info JSONB,
  recovery_team UUID[],
  mission_success_rate NUMERIC DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_by UUID,
  theater_id UUID
);

CREATE TABLE public.combat_zone_supplies (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  supply_code TEXT NOT NULL UNIQUE,
  zone_designation TEXT NOT NULL,
  threat_level TEXT NOT NULL DEFAULT 'low',
  item_id UUID NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 0,
  unit_price NUMERIC DEFAULT 0,
  special_handling BOOLEAN DEFAULT false,
  armored_transport_required BOOLEAN DEFAULT false,
  expiry_date DATE,
  storage_conditions TEXT,
  assigned_medic UUID,
  last_resupply DATE,
  consumption_rate NUMERIC DEFAULT 0,
  critical_shortage_threshold INTEGER DEFAULT 10,
  evacuation_priority INTEGER DEFAULT 5,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_by UUID,
  theater_id UUID
);

CREATE TABLE public.evacuation_kits (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  kit_code TEXT NOT NULL UNIQUE,
  kit_name TEXT NOT NULL,
  kit_type TEXT NOT NULL DEFAULT 'standard_medical',
  contents JSONB NOT NULL DEFAULT '[]'::jsonb,
  weight_kg NUMERIC NOT NULL DEFAULT 0,
  volume_liters NUMERIC DEFAULT 0,
  expiry_date DATE,
  maintenance_due DATE,
  location TEXT NOT NULL,
  assigned_unit TEXT,
  deployment_ready BOOLEAN DEFAULT true,
  last_inspection DATE,
  inspection_notes TEXT,
  usage_scenarios TEXT[] DEFAULT '{}',
  training_required BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_by UUID
);

CREATE TABLE public.theater_operations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  theater_code TEXT NOT NULL UNIQUE,
  theater_name TEXT NOT NULL,
  operation_type TEXT NOT NULL DEFAULT 'humanitarian',
  start_date DATE NOT NULL,
  end_date DATE,
  status TEXT NOT NULL DEFAULT 'active',
  commander_id UUID NOT NULL,
  geographic_bounds JSONB,
  participating_units TEXT[] DEFAULT '{}',
  logistics_requirements JSONB DEFAULT '{}'::jsonb,
  supply_chain_priorities TEXT[] DEFAULT '{}',
  risk_assessment_level TEXT DEFAULT 'medium'::text,
  communication_protocols JSONB,
  evacuation_procedures TEXT,
  budget_allocated NUMERIC DEFAULT 0,
  budget_spent NUMERIC DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_by UUID
);

-- Emergency Response System Tables
CREATE TABLE public.disaster_response_kits (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  kit_code TEXT NOT NULL UNIQUE,
  disaster_type TEXT NOT NULL,
  kit_configuration JSONB NOT NULL DEFAULT '[]'::jsonb,
  deployment_locations TEXT[] DEFAULT '{}',
  response_time_hours INTEGER DEFAULT 24,
  personnel_required INTEGER DEFAULT 5,
  transportation_method TEXT DEFAULT 'air_transport',
  setup_time_hours INTEGER DEFAULT 2,
  operational_duration_days INTEGER DEFAULT 30,
  maintenance_schedule TEXT,
  last_deployment DATE,
  deployment_count INTEGER DEFAULT 0,
  effectiveness_rating NUMERIC DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_by UUID
);

CREATE TABLE public.mobile_command_units (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  unit_code TEXT NOT NULL UNIQUE,
  unit_name TEXT NOT NULL,
  vehicle_type TEXT NOT NULL,
  communication_equipment JSONB DEFAULT '[]'::jsonb,
  current_location TEXT,
  coordinates JSONB,
  operational_status TEXT DEFAULT 'standby'::text,
  crew_assigned UUID[] DEFAULT '{}'::uuid[],
  fuel_level NUMERIC DEFAULT 100,
  maintenance_due DATE,
  mission_assigned TEXT,
  deployment_history JSONB DEFAULT '[]'::jsonb,
  equipment_status JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_by UUID
);

-- Strategic Planning & Analysis Tables
CREATE TABLE public.strategic_plans (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  plan_code TEXT NOT NULL UNIQUE,
  plan_name TEXT NOT NULL,
  plan_type TEXT NOT NULL DEFAULT 'logistics_support',
  time_horizon TEXT NOT NULL DEFAULT 'annual',
  objectives JSONB NOT NULL DEFAULT '[]'::jsonb,
  resource_requirements JSONB DEFAULT '{}'::jsonb,
  risk_factors JSONB DEFAULT '[]'::jsonb,
  success_metrics JSONB DEFAULT '{}'::jsonb,
  budget_estimate NUMERIC DEFAULT 0,
  approval_status TEXT DEFAULT 'draft'::text,
  approved_by UUID,
  implementation_date DATE,
  review_date DATE,
  responsible_units TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_by UUID
);

CREATE TABLE public.supply_chain_risks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  risk_code TEXT NOT NULL UNIQUE,
  risk_category TEXT NOT NULL,
  risk_description TEXT NOT NULL,
  probability_score INTEGER NOT NULL DEFAULT 3,
  impact_score INTEGER NOT NULL DEFAULT 3,
  risk_level TEXT GENERATED ALWAYS AS (
    CASE 
      WHEN probability_score * impact_score <= 6 THEN 'low'
      WHEN probability_score * impact_score <= 15 THEN 'medium'
      ELSE 'high'
    END
  ) STORED,
  affected_items UUID[] DEFAULT '{}'::uuid[],
  mitigation_strategies TEXT[] DEFAULT '{}',
  contingency_plans TEXT,
  monitoring_frequency TEXT DEFAULT 'monthly'::text,
  responsible_officer UUID,
  last_assessment DATE DEFAULT CURRENT_DATE,
  next_review DATE,
  status TEXT DEFAULT 'active'::text,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_by UUID
);

-- Integration & Automation Tables
CREATE TABLE public.erp_integrations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  system_name TEXT NOT NULL,
  integration_type TEXT NOT NULL DEFAULT 'bi_directional',
  endpoint_url TEXT NOT NULL,
  authentication_method TEXT NOT NULL DEFAULT 'api_key',
  sync_frequency INTEGER DEFAULT 60,
  last_sync TIMESTAMP WITH TIME ZONE,
  sync_status TEXT DEFAULT 'active'::text,
  data_mapping JSONB DEFAULT '{}'::jsonb,
  error_handling JSONB DEFAULT '{}'::jsonb,
  performance_metrics JSONB DEFAULT '{}'::jsonb,
  business_rules JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_by UUID
);

CREATE TABLE public.gps_tracking (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  asset_id UUID NOT NULL,
  asset_type TEXT NOT NULL,
  current_coordinates JSONB NOT NULL,
  previous_coordinates JSONB,
  speed_kmh NUMERIC DEFAULT 0,
  heading_degrees INTEGER DEFAULT 0,
  altitude_meters NUMERIC,
  accuracy_meters NUMERIC DEFAULT 10,
  battery_level INTEGER,
  signal_strength INTEGER,
  last_update TIMESTAMP WITH TIME ZONE DEFAULT now(),
  geofence_violations INTEGER DEFAULT 0,
  route_adherence NUMERIC DEFAULT 100,
  estimated_arrival TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_by UUID
);

-- Quality & Compliance Tables
CREATE TABLE public.gdp_compliance_records (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  record_type TEXT NOT NULL DEFAULT 'temperature_log',
  item_id UUID,
  facility_location TEXT NOT NULL,
  compliance_date DATE NOT NULL DEFAULT CURRENT_DATE,
  temperature_celsius NUMERIC,
  humidity_percentage NUMERIC,
  storage_conditions TEXT,
  inspector_id UUID,
  compliance_status TEXT NOT NULL DEFAULT 'compliant',
  deviations TEXT,
  corrective_actions TEXT,
  verification_date DATE,
  documentation_reference TEXT,
  audit_trail JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_by UUID
);

-- Command & Control Tables  
CREATE TABLE public.command_levels (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  level_code TEXT NOT NULL UNIQUE,
  level_name TEXT NOT NULL,
  hierarchy_level INTEGER NOT NULL,
  parent_level_id UUID,
  reporting_frequency TEXT DEFAULT 'daily'::text,
  authorization_limits JSONB DEFAULT '{}'::jsonb,
  communication_protocols JSONB DEFAULT '{}'::jsonb,
  escalation_procedures TEXT,
  responsible_officers UUID[] DEFAULT '{}'::uuid[],
  operational_areas TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_by UUID
);

CREATE TABLE public.security_classifications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  classification_level TEXT NOT NULL UNIQUE,
  access_requirements TEXT[] NOT NULL DEFAULT '{}',
  handling_procedures TEXT NOT NULL,
  storage_requirements TEXT NOT NULL,
  transmission_protocols TEXT,
  authorized_personnel_roles TEXT[] DEFAULT '{}',
  clearance_level_required INTEGER NOT NULL DEFAULT 1,
  retention_period TEXT DEFAULT 'indefinite'::text,
  disposal_procedures TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_by UUID
);

CREATE TABLE public.regional_distribution_centers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  center_code TEXT NOT NULL UNIQUE,
  center_name TEXT NOT NULL,
  region TEXT NOT NULL,
  coordinates JSONB,
  storage_capacity_cubic_meters NUMERIC NOT NULL DEFAULT 0,
  current_utilization_percentage NUMERIC DEFAULT 0,
  cold_storage_capacity NUMERIC DEFAULT 0,
  served_bases TEXT[] DEFAULT '{}',
  transportation_hub BOOLEAN DEFAULT false,
  operational_status TEXT DEFAULT 'active'::text,
  staff_count INTEGER DEFAULT 0,
  equipment_inventory JSONB DEFAULT '[]'::jsonb,
  security_level TEXT DEFAULT 'standard'::text,
  last_audit_date DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_by UUID
);

-- Add RLS policies for all new tables
ALTER TABLE public.field_hospitals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.airdrop_operations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.combat_zone_supplies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.evacuation_kits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.theater_operations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.disaster_response_kits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mobile_command_units ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.strategic_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.supply_chain_risks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.erp_integrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gps_tracking ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gdp_compliance_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.command_levels ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.security_classifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.regional_distribution_centers ENABLE ROW LEVEL SECURITY;

-- RLS Policies for viewing
CREATE POLICY "All authenticated users can view field hospitals" ON public.field_hospitals FOR SELECT USING (true);
CREATE POLICY "All authenticated users can view airdrop operations" ON public.airdrop_operations FOR SELECT USING (true);
CREATE POLICY "All authenticated users can view combat zone supplies" ON public.combat_zone_supplies FOR SELECT USING (true);
CREATE POLICY "All authenticated users can view evacuation kits" ON public.evacuation_kits FOR SELECT USING (true);
CREATE POLICY "All authenticated users can view theater operations" ON public.theater_operations FOR SELECT USING (true);
CREATE POLICY "All authenticated users can view disaster response kits" ON public.disaster_response_kits FOR SELECT USING (true);
CREATE POLICY "All authenticated users can view mobile command units" ON public.mobile_command_units FOR SELECT USING (true);
CREATE POLICY "All authenticated users can view strategic plans" ON public.strategic_plans FOR SELECT USING (true);
CREATE POLICY "All authenticated users can view supply chain risks" ON public.supply_chain_risks FOR SELECT USING (true);
CREATE POLICY "All authenticated users can view erp integrations" ON public.erp_integrations FOR SELECT USING (true);
CREATE POLICY "All authenticated users can view gps tracking" ON public.gps_tracking FOR SELECT USING (true);
CREATE POLICY "All authenticated users can view gdp compliance records" ON public.gdp_compliance_records FOR SELECT USING (true);
CREATE POLICY "All authenticated users can view command levels" ON public.command_levels FOR SELECT USING (true);
CREATE POLICY "All authenticated users can view security classifications" ON public.security_classifications FOR SELECT USING (true);
CREATE POLICY "All authenticated users can view regional distribution centers" ON public.regional_distribution_centers FOR SELECT USING (true);

-- RLS Policies for management (Admins and Military Personnel)
CREATE POLICY "Military personnel can manage field hospitals" ON public.field_hospitals FOR ALL USING (is_admin() OR has_role(auth.uid(), 'karspau'::app_role) OR has_role(auth.uid(), 'kalakespra'::app_role));
CREATE POLICY "Military personnel can manage airdrop operations" ON public.airdrop_operations FOR ALL USING (is_admin() OR has_role(auth.uid(), 'karspau'::app_role) OR has_role(auth.uid(), 'kalakespra'::app_role));
CREATE POLICY "Military personnel can manage combat zone supplies" ON public.combat_zone_supplies FOR ALL USING (is_admin() OR has_role(auth.uid(), 'karspau'::app_role) OR has_role(auth.uid(), 'kalakespra'::app_role));
CREATE POLICY "Military personnel can manage evacuation kits" ON public.evacuation_kits FOR ALL USING (is_admin() OR has_role(auth.uid(), 'karspau'::app_role) OR has_role(auth.uid(), 'kalakespra'::app_role));
CREATE POLICY "Military personnel can manage theater operations" ON public.theater_operations FOR ALL USING (is_admin() OR has_role(auth.uid(), 'karspau'::app_role) OR has_role(auth.uid(), 'kalakespra'::app_role));
CREATE POLICY "Military personnel can manage disaster response kits" ON public.disaster_response_kits FOR ALL USING (is_admin() OR has_role(auth.uid(), 'karspau'::app_role) OR has_role(auth.uid(), 'kalakespra'::app_role));
CREATE POLICY "Military personnel can manage mobile command units" ON public.mobile_command_units FOR ALL USING (is_admin() OR has_role(auth.uid(), 'karspau'::app_role) OR has_role(auth.uid(), 'kalakespra'::app_role));
CREATE POLICY "Admins can manage strategic plans" ON public.strategic_plans FOR ALL USING (is_admin());
CREATE POLICY "Military personnel can manage supply chain risks" ON public.supply_chain_risks FOR ALL USING (is_admin() OR has_role(auth.uid(), 'karspau'::app_role) OR has_role(auth.uid(), 'kalakespra'::app_role));
CREATE POLICY "Admins can manage erp integrations" ON public.erp_integrations FOR ALL USING (is_admin());
CREATE POLICY "Military personnel can manage gps tracking" ON public.gps_tracking FOR ALL USING (is_admin() OR has_role(auth.uid(), 'karspau'::app_role) OR has_role(auth.uid(), 'kalakespra'::app_role));
CREATE POLICY "Military personnel can manage gdp compliance records" ON public.gdp_compliance_records FOR ALL USING (is_admin() OR has_role(auth.uid(), 'karspau'::app_role) OR has_role(auth.uid(), 'kasubdis'::app_role));
CREATE POLICY "Admins can manage command levels" ON public.command_levels FOR ALL USING (is_admin());
CREATE POLICY "Admins can manage security classifications" ON public.security_classifications FOR ALL USING (is_admin());
CREATE POLICY "Admins can manage regional distribution centers" ON public.regional_distribution_centers FOR ALL USING (is_admin());

-- Add updated_at triggers for all new tables
CREATE TRIGGER update_field_hospitals_updated_at BEFORE UPDATE ON public.field_hospitals FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_airdrop_operations_updated_at BEFORE UPDATE ON public.airdrop_operations FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_combat_zone_supplies_updated_at BEFORE UPDATE ON public.combat_zone_supplies FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_evacuation_kits_updated_at BEFORE UPDATE ON public.evacuation_kits FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_theater_operations_updated_at BEFORE UPDATE ON public.theater_operations FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_disaster_response_kits_updated_at BEFORE UPDATE ON public.disaster_response_kits FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_mobile_command_units_updated_at BEFORE UPDATE ON public.mobile_command_units FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_strategic_plans_updated_at BEFORE UPDATE ON public.strategic_plans FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_supply_chain_risks_updated_at BEFORE UPDATE ON public.supply_chain_risks FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_erp_integrations_updated_at BEFORE UPDATE ON public.erp_integrations FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_gps_tracking_updated_at BEFORE UPDATE ON public.gps_tracking FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_gdp_compliance_records_updated_at BEFORE UPDATE ON public.gdp_compliance_records FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_command_levels_updated_at BEFORE UPDATE ON public.command_levels FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_security_classifications_updated_at BEFORE UPDATE ON public.security_classifications FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_regional_distribution_centers_updated_at BEFORE UPDATE ON public.regional_distribution_centers FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();