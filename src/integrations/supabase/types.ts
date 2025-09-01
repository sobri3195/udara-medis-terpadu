export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      adverse_events: {
        Row: {
          causality_assessment: string | null
          concomitant_medications: string[] | null
          created_at: string
          created_by: string | null
          dechallenge_result: string | null
          drug_batch_number: string | null
          drug_name: string
          event_description: string
          event_number: string
          id: string
          medical_history: string | null
          onset_date: string | null
          outcome: string | null
          patient_identifier: string
          rechallenge_result: string | null
          recovery_date: string | null
          regulatory_report_number: string | null
          regulatory_reported: boolean | null
          reported_by: string
          reported_date: string
          severity: string
          updated_at: string
        }
        Insert: {
          causality_assessment?: string | null
          concomitant_medications?: string[] | null
          created_at?: string
          created_by?: string | null
          dechallenge_result?: string | null
          drug_batch_number?: string | null
          drug_name: string
          event_description: string
          event_number: string
          id?: string
          medical_history?: string | null
          onset_date?: string | null
          outcome?: string | null
          patient_identifier: string
          rechallenge_result?: string | null
          recovery_date?: string | null
          regulatory_report_number?: string | null
          regulatory_reported?: boolean | null
          reported_by: string
          reported_date?: string
          severity?: string
          updated_at?: string
        }
        Update: {
          causality_assessment?: string | null
          concomitant_medications?: string[] | null
          created_at?: string
          created_by?: string | null
          dechallenge_result?: string | null
          drug_batch_number?: string | null
          drug_name?: string
          event_description?: string
          event_number?: string
          id?: string
          medical_history?: string | null
          onset_date?: string | null
          outcome?: string | null
          patient_identifier?: string
          rechallenge_result?: string | null
          recovery_date?: string | null
          regulatory_report_number?: string | null
          regulatory_reported?: boolean | null
          reported_by?: string
          reported_date?: string
          severity?: string
          updated_at?: string
        }
        Relationships: []
      }
      airdrop_operations: {
        Row: {
          actual_date: string | null
          aircraft_type: string
          cargo_manifest: Json | null
          coordinates: Json
          created_at: string
          created_by: string | null
          drop_zone_conditions: string | null
          ground_contact_info: Json | null
          id: string
          mission_success_rate: number | null
          operation_code: string
          operation_name: string
          pilot_assigned: string | null
          priority_level: string
          recipient_unit: string
          recovery_team: string[] | null
          scheduled_date: string
          status: string
          target_location: string
          theater_id: string | null
          total_weight: number | null
          updated_at: string
          weather_status: string | null
        }
        Insert: {
          actual_date?: string | null
          aircraft_type: string
          cargo_manifest?: Json | null
          coordinates: Json
          created_at?: string
          created_by?: string | null
          drop_zone_conditions?: string | null
          ground_contact_info?: Json | null
          id?: string
          mission_success_rate?: number | null
          operation_code: string
          operation_name: string
          pilot_assigned?: string | null
          priority_level?: string
          recipient_unit: string
          recovery_team?: string[] | null
          scheduled_date: string
          status?: string
          target_location: string
          theater_id?: string | null
          total_weight?: number | null
          updated_at?: string
          weather_status?: string | null
        }
        Update: {
          actual_date?: string | null
          aircraft_type?: string
          cargo_manifest?: Json | null
          coordinates?: Json
          created_at?: string
          created_by?: string | null
          drop_zone_conditions?: string | null
          ground_contact_info?: Json | null
          id?: string
          mission_success_rate?: number | null
          operation_code?: string
          operation_name?: string
          pilot_assigned?: string | null
          priority_level?: string
          recipient_unit?: string
          recovery_team?: string[] | null
          scheduled_date?: string
          status?: string
          target_location?: string
          theater_id?: string | null
          total_weight?: number | null
          updated_at?: string
          weather_status?: string | null
        }
        Relationships: []
      }
      audit_findings: {
        Row: {
          actual_completion_date: string | null
          audit_id: string
          category: string
          corrective_action: string | null
          created_at: string
          created_by: string | null
          description: string
          finding_type: string
          id: string
          preventive_action: string | null
          responsible_person: string | null
          root_cause: string | null
          severity: string
          status: string
          target_completion_date: string | null
          updated_at: string
          verification_date: string | null
        }
        Insert: {
          actual_completion_date?: string | null
          audit_id: string
          category: string
          corrective_action?: string | null
          created_at?: string
          created_by?: string | null
          description: string
          finding_type: string
          id?: string
          preventive_action?: string | null
          responsible_person?: string | null
          root_cause?: string | null
          severity?: string
          status?: string
          target_completion_date?: string | null
          updated_at?: string
          verification_date?: string | null
        }
        Update: {
          actual_completion_date?: string | null
          audit_id?: string
          category?: string
          corrective_action?: string | null
          created_at?: string
          created_by?: string | null
          description?: string
          finding_type?: string
          id?: string
          preventive_action?: string | null
          responsible_person?: string | null
          root_cause?: string | null
          severity?: string
          status?: string
          target_completion_date?: string | null
          updated_at?: string
          verification_date?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "audit_findings_audit_id_fkey"
            columns: ["audit_id"]
            isOneToOne: false
            referencedRelation: "quality_audits"
            referencedColumns: ["id"]
          },
        ]
      }
      budget_categories: {
        Row: {
          category_code: string
          category_name: string
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          is_active: boolean | null
          parent_category_id: string | null
          updated_at: string
        }
        Insert: {
          category_code: string
          category_name: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          parent_category_id?: string | null
          updated_at?: string
        }
        Update: {
          category_code?: string
          category_name?: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          parent_category_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "budget_categories_parent_category_id_fkey"
            columns: ["parent_category_id"]
            isOneToOne: false
            referencedRelation: "budget_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      budgets: {
        Row: {
          allocated_amount: number
          category_id: string
          committed_amount: number | null
          created_at: string
          created_by: string | null
          currency: string | null
          fiscal_year: number
          id: string
          spent_amount: number | null
          status: string
          updated_at: string
        }
        Insert: {
          allocated_amount: number
          category_id: string
          committed_amount?: number | null
          created_at?: string
          created_by?: string | null
          currency?: string | null
          fiscal_year: number
          id?: string
          spent_amount?: number | null
          status?: string
          updated_at?: string
        }
        Update: {
          allocated_amount?: number
          category_id?: string
          committed_amount?: number | null
          created_at?: string
          created_by?: string | null
          currency?: string | null
          fiscal_year?: number
          id?: string
          spent_amount?: number | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "budgets_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "budget_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      cold_chain_alerts: {
        Row: {
          acknowledged: boolean | null
          acknowledged_at: string | null
          acknowledged_by: string | null
          alert_type: string
          created_at: string
          created_by: string | null
          current_value: number | null
          duration_minutes: number | null
          id: string
          resolved: boolean | null
          resolved_at: string | null
          sensor_id: string
          severity: string
          threshold_value: number | null
        }
        Insert: {
          acknowledged?: boolean | null
          acknowledged_at?: string | null
          acknowledged_by?: string | null
          alert_type: string
          created_at?: string
          created_by?: string | null
          current_value?: number | null
          duration_minutes?: number | null
          id?: string
          resolved?: boolean | null
          resolved_at?: string | null
          sensor_id: string
          severity?: string
          threshold_value?: number | null
        }
        Update: {
          acknowledged?: boolean | null
          acknowledged_at?: string | null
          acknowledged_by?: string | null
          alert_type?: string
          created_at?: string
          created_by?: string | null
          current_value?: number | null
          duration_minutes?: number | null
          id?: string
          resolved?: boolean | null
          resolved_at?: string | null
          sensor_id?: string
          severity?: string
          threshold_value?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "cold_chain_alerts_sensor_id_fkey"
            columns: ["sensor_id"]
            isOneToOne: false
            referencedRelation: "cold_chain_sensors"
            referencedColumns: ["id"]
          },
        ]
      }
      cold_chain_sensors: {
        Row: {
          alert_threshold_breach_count: number | null
          battery_level: number | null
          created_at: string
          created_by: string | null
          current_humidity: number | null
          current_temperature: number | null
          id: string
          last_reading: string | null
          location: string
          sensor_id: string
          status: string
          storage_type: string
          target_temp_max: number
          target_temp_min: number
          updated_at: string
        }
        Insert: {
          alert_threshold_breach_count?: number | null
          battery_level?: number | null
          created_at?: string
          created_by?: string | null
          current_humidity?: number | null
          current_temperature?: number | null
          id?: string
          last_reading?: string | null
          location: string
          sensor_id: string
          status?: string
          storage_type: string
          target_temp_max: number
          target_temp_min: number
          updated_at?: string
        }
        Update: {
          alert_threshold_breach_count?: number | null
          battery_level?: number | null
          created_at?: string
          created_by?: string | null
          current_humidity?: number | null
          current_temperature?: number | null
          id?: string
          last_reading?: string | null
          location?: string
          sensor_id?: string
          status?: string
          storage_type?: string
          target_temp_max?: number
          target_temp_min?: number
          updated_at?: string
        }
        Relationships: []
      }
      combat_zone_supplies: {
        Row: {
          armored_transport_required: boolean | null
          assigned_medic: string | null
          consumption_rate: number | null
          created_at: string
          created_by: string | null
          critical_shortage_threshold: number | null
          evacuation_priority: number | null
          expiry_date: string | null
          id: string
          item_id: string
          last_resupply: string | null
          quantity: number
          special_handling: boolean | null
          storage_conditions: string | null
          supply_code: string
          theater_id: string | null
          threat_level: string
          unit_price: number | null
          updated_at: string
          zone_designation: string
        }
        Insert: {
          armored_transport_required?: boolean | null
          assigned_medic?: string | null
          consumption_rate?: number | null
          created_at?: string
          created_by?: string | null
          critical_shortage_threshold?: number | null
          evacuation_priority?: number | null
          expiry_date?: string | null
          id?: string
          item_id: string
          last_resupply?: string | null
          quantity?: number
          special_handling?: boolean | null
          storage_conditions?: string | null
          supply_code: string
          theater_id?: string | null
          threat_level?: string
          unit_price?: number | null
          updated_at?: string
          zone_designation: string
        }
        Update: {
          armored_transport_required?: boolean | null
          assigned_medic?: string | null
          consumption_rate?: number | null
          created_at?: string
          created_by?: string | null
          critical_shortage_threshold?: number | null
          evacuation_priority?: number | null
          expiry_date?: string | null
          id?: string
          item_id?: string
          last_resupply?: string | null
          quantity?: number
          special_handling?: boolean | null
          storage_conditions?: string | null
          supply_code?: string
          theater_id?: string | null
          threat_level?: string
          unit_price?: number | null
          updated_at?: string
          zone_designation?: string
        }
        Relationships: []
      }
      command_levels: {
        Row: {
          authorization_limits: Json | null
          communication_protocols: Json | null
          created_at: string
          created_by: string | null
          escalation_procedures: string | null
          hierarchy_level: number
          id: string
          level_code: string
          level_name: string
          operational_areas: string[] | null
          parent_level_id: string | null
          reporting_frequency: string | null
          responsible_officers: string[] | null
          updated_at: string
        }
        Insert: {
          authorization_limits?: Json | null
          communication_protocols?: Json | null
          created_at?: string
          created_by?: string | null
          escalation_procedures?: string | null
          hierarchy_level: number
          id?: string
          level_code: string
          level_name: string
          operational_areas?: string[] | null
          parent_level_id?: string | null
          reporting_frequency?: string | null
          responsible_officers?: string[] | null
          updated_at?: string
        }
        Update: {
          authorization_limits?: Json | null
          communication_protocols?: Json | null
          created_at?: string
          created_by?: string | null
          escalation_procedures?: string | null
          hierarchy_level?: number
          id?: string
          level_code?: string
          level_name?: string
          operational_areas?: string[] | null
          parent_level_id?: string | null
          reporting_frequency?: string | null
          responsible_officers?: string[] | null
          updated_at?: string
        }
        Relationships: []
      }
      disaster_response_kits: {
        Row: {
          created_at: string
          created_by: string | null
          deployment_count: number | null
          deployment_locations: string[] | null
          disaster_type: string
          effectiveness_rating: number | null
          id: string
          kit_code: string
          kit_configuration: Json
          last_deployment: string | null
          maintenance_schedule: string | null
          operational_duration_days: number | null
          personnel_required: number | null
          response_time_hours: number | null
          setup_time_hours: number | null
          transportation_method: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          deployment_count?: number | null
          deployment_locations?: string[] | null
          disaster_type: string
          effectiveness_rating?: number | null
          id?: string
          kit_code: string
          kit_configuration?: Json
          last_deployment?: string | null
          maintenance_schedule?: string | null
          operational_duration_days?: number | null
          personnel_required?: number | null
          response_time_hours?: number | null
          setup_time_hours?: number | null
          transportation_method?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          deployment_count?: number | null
          deployment_locations?: string[] | null
          disaster_type?: string
          effectiveness_rating?: number | null
          id?: string
          kit_code?: string
          kit_configuration?: Json
          last_deployment?: string | null
          maintenance_schedule?: string | null
          operational_duration_days?: number | null
          personnel_required?: number | null
          response_time_hours?: number | null
          setup_time_hours?: number | null
          transportation_method?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      distributions: {
        Row: {
          approved_by: string | null
          created_at: string
          destination: string
          distribution_date: string | null
          id: string
          item_id: string | null
          quantity: number
          requested_by: string | null
          status: string | null
          updated_at: string
        }
        Insert: {
          approved_by?: string | null
          created_at?: string
          destination: string
          distribution_date?: string | null
          id?: string
          item_id?: string | null
          quantity: number
          requested_by?: string | null
          status?: string | null
          updated_at?: string
        }
        Update: {
          approved_by?: string | null
          created_at?: string
          destination?: string
          distribution_date?: string | null
          id?: string
          item_id?: string | null
          quantity?: number
          requested_by?: string | null
          status?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "distributions_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "inventory"
            referencedColumns: ["id"]
          },
        ]
      }
      erp_integrations: {
        Row: {
          authentication_method: string
          business_rules: Json | null
          created_at: string
          created_by: string | null
          data_mapping: Json | null
          endpoint_url: string
          error_handling: Json | null
          id: string
          integration_type: string
          last_sync: string | null
          performance_metrics: Json | null
          sync_frequency: number | null
          sync_status: string | null
          system_name: string
          updated_at: string
        }
        Insert: {
          authentication_method?: string
          business_rules?: Json | null
          created_at?: string
          created_by?: string | null
          data_mapping?: Json | null
          endpoint_url: string
          error_handling?: Json | null
          id?: string
          integration_type?: string
          last_sync?: string | null
          performance_metrics?: Json | null
          sync_frequency?: number | null
          sync_status?: string | null
          system_name: string
          updated_at?: string
        }
        Update: {
          authentication_method?: string
          business_rules?: Json | null
          created_at?: string
          created_by?: string | null
          data_mapping?: Json | null
          endpoint_url?: string
          error_handling?: Json | null
          id?: string
          integration_type?: string
          last_sync?: string | null
          performance_metrics?: Json | null
          sync_frequency?: number | null
          sync_status?: string | null
          system_name?: string
          updated_at?: string
        }
        Relationships: []
      }
      evacuation_kits: {
        Row: {
          assigned_unit: string | null
          contents: Json
          created_at: string
          created_by: string | null
          deployment_ready: boolean | null
          expiry_date: string | null
          id: string
          inspection_notes: string | null
          kit_code: string
          kit_name: string
          kit_type: string
          last_inspection: string | null
          location: string
          maintenance_due: string | null
          training_required: boolean | null
          updated_at: string
          usage_scenarios: string[] | null
          volume_liters: number | null
          weight_kg: number
        }
        Insert: {
          assigned_unit?: string | null
          contents?: Json
          created_at?: string
          created_by?: string | null
          deployment_ready?: boolean | null
          expiry_date?: string | null
          id?: string
          inspection_notes?: string | null
          kit_code: string
          kit_name: string
          kit_type?: string
          last_inspection?: string | null
          location: string
          maintenance_due?: string | null
          training_required?: boolean | null
          updated_at?: string
          usage_scenarios?: string[] | null
          volume_liters?: number | null
          weight_kg?: number
        }
        Update: {
          assigned_unit?: string | null
          contents?: Json
          created_at?: string
          created_by?: string | null
          deployment_ready?: boolean | null
          expiry_date?: string | null
          id?: string
          inspection_notes?: string | null
          kit_code?: string
          kit_name?: string
          kit_type?: string
          last_inspection?: string | null
          location?: string
          maintenance_due?: string | null
          training_required?: boolean | null
          updated_at?: string
          usage_scenarios?: string[] | null
          volume_liters?: number | null
          weight_kg?: number
        }
        Relationships: []
      }
      expenses: {
        Row: {
          amount: number
          approval_status: string
          approved_at: string | null
          approved_by: string | null
          category_id: string
          created_at: string
          created_by: string | null
          currency: string | null
          description: string
          expense_date: string
          expense_number: string
          id: string
          payment_method: string | null
          payment_status: string
          reference_number: string | null
          updated_at: string
          vendor_id: string | null
        }
        Insert: {
          amount: number
          approval_status?: string
          approved_at?: string | null
          approved_by?: string | null
          category_id: string
          created_at?: string
          created_by?: string | null
          currency?: string | null
          description: string
          expense_date: string
          expense_number: string
          id?: string
          payment_method?: string | null
          payment_status?: string
          reference_number?: string | null
          updated_at?: string
          vendor_id?: string | null
        }
        Update: {
          amount?: number
          approval_status?: string
          approved_at?: string | null
          approved_by?: string | null
          category_id?: string
          created_at?: string
          created_by?: string | null
          currency?: string | null
          description?: string
          expense_date?: string
          expense_number?: string
          id?: string
          payment_method?: string | null
          payment_status?: string
          reference_number?: string | null
          updated_at?: string
          vendor_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "expenses_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "budget_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "expenses_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "vendors"
            referencedColumns: ["id"]
          },
        ]
      }
      external_systems: {
        Row: {
          api_version: string | null
          authentication_method: string | null
          auto_sync_enabled: boolean | null
          configuration: Json | null
          connection_status: string
          created_at: string
          created_by: string | null
          endpoint_url: string | null
          error_count: number | null
          id: string
          last_error: string | null
          last_sync: string | null
          sync_frequency: number | null
          system_name: string
          system_type: string
          updated_at: string
        }
        Insert: {
          api_version?: string | null
          authentication_method?: string | null
          auto_sync_enabled?: boolean | null
          configuration?: Json | null
          connection_status?: string
          created_at?: string
          created_by?: string | null
          endpoint_url?: string | null
          error_count?: number | null
          id?: string
          last_error?: string | null
          last_sync?: string | null
          sync_frequency?: number | null
          system_name: string
          system_type: string
          updated_at?: string
        }
        Update: {
          api_version?: string | null
          authentication_method?: string | null
          auto_sync_enabled?: boolean | null
          configuration?: Json | null
          connection_status?: string
          created_at?: string
          created_by?: string | null
          endpoint_url?: string | null
          error_count?: number | null
          id?: string
          last_error?: string | null
          last_sync?: string | null
          sync_frequency?: number | null
          system_name?: string
          system_type?: string
          updated_at?: string
        }
        Relationships: []
      }
      field_hospitals: {
        Row: {
          capacity: number | null
          commander_id: string | null
          coordinates: Json | null
          created_at: string
          created_by: string | null
          current_patients: number | null
          deployment_date: string | null
          deployment_status: string
          hospital_code: string
          hospital_name: string
          id: string
          location: string
          logistics_status: string | null
          medical_equipment: Json | null
          mission_type: string
          personnel_assigned: string[] | null
          supply_requirements: Json | null
          theater_id: string | null
          updated_at: string
        }
        Insert: {
          capacity?: number | null
          commander_id?: string | null
          coordinates?: Json | null
          created_at?: string
          created_by?: string | null
          current_patients?: number | null
          deployment_date?: string | null
          deployment_status?: string
          hospital_code: string
          hospital_name: string
          id?: string
          location: string
          logistics_status?: string | null
          medical_equipment?: Json | null
          mission_type?: string
          personnel_assigned?: string[] | null
          supply_requirements?: Json | null
          theater_id?: string | null
          updated_at?: string
        }
        Update: {
          capacity?: number | null
          commander_id?: string | null
          coordinates?: Json | null
          created_at?: string
          created_by?: string | null
          current_patients?: number | null
          deployment_date?: string | null
          deployment_status?: string
          hospital_code?: string
          hospital_name?: string
          id?: string
          location?: string
          logistics_status?: string | null
          medical_equipment?: Json | null
          mission_type?: string
          personnel_assigned?: string[] | null
          supply_requirements?: Json | null
          theater_id?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      gdp_compliance_records: {
        Row: {
          audit_trail: Json | null
          compliance_date: string
          compliance_status: string
          corrective_actions: string | null
          created_at: string
          created_by: string | null
          deviations: string | null
          documentation_reference: string | null
          facility_location: string
          humidity_percentage: number | null
          id: string
          inspector_id: string | null
          item_id: string | null
          record_type: string
          storage_conditions: string | null
          temperature_celsius: number | null
          updated_at: string
          verification_date: string | null
        }
        Insert: {
          audit_trail?: Json | null
          compliance_date?: string
          compliance_status?: string
          corrective_actions?: string | null
          created_at?: string
          created_by?: string | null
          deviations?: string | null
          documentation_reference?: string | null
          facility_location: string
          humidity_percentage?: number | null
          id?: string
          inspector_id?: string | null
          item_id?: string | null
          record_type?: string
          storage_conditions?: string | null
          temperature_celsius?: number | null
          updated_at?: string
          verification_date?: string | null
        }
        Update: {
          audit_trail?: Json | null
          compliance_date?: string
          compliance_status?: string
          corrective_actions?: string | null
          created_at?: string
          created_by?: string | null
          deviations?: string | null
          documentation_reference?: string | null
          facility_location?: string
          humidity_percentage?: number | null
          id?: string
          inspector_id?: string | null
          item_id?: string | null
          record_type?: string
          storage_conditions?: string | null
          temperature_celsius?: number | null
          updated_at?: string
          verification_date?: string | null
        }
        Relationships: []
      }
      gps_tracking: {
        Row: {
          accuracy_meters: number | null
          altitude_meters: number | null
          asset_id: string
          asset_type: string
          battery_level: number | null
          created_at: string
          created_by: string | null
          current_coordinates: Json
          estimated_arrival: string | null
          geofence_violations: number | null
          heading_degrees: number | null
          id: string
          last_update: string | null
          previous_coordinates: Json | null
          route_adherence: number | null
          signal_strength: number | null
          speed_kmh: number | null
          updated_at: string
        }
        Insert: {
          accuracy_meters?: number | null
          altitude_meters?: number | null
          asset_id: string
          asset_type: string
          battery_level?: number | null
          created_at?: string
          created_by?: string | null
          current_coordinates: Json
          estimated_arrival?: string | null
          geofence_violations?: number | null
          heading_degrees?: number | null
          id?: string
          last_update?: string | null
          previous_coordinates?: Json | null
          route_adherence?: number | null
          signal_strength?: number | null
          speed_kmh?: number | null
          updated_at?: string
        }
        Update: {
          accuracy_meters?: number | null
          altitude_meters?: number | null
          asset_id?: string
          asset_type?: string
          battery_level?: number | null
          created_at?: string
          created_by?: string | null
          current_coordinates?: Json
          estimated_arrival?: string | null
          geofence_violations?: number | null
          heading_degrees?: number | null
          id?: string
          last_update?: string | null
          previous_coordinates?: Json | null
          route_adherence?: number | null
          signal_strength?: number | null
          speed_kmh?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      hospitals: {
        Row: {
          available_ambulances: number | null
          available_beds: number | null
          created_at: string
          created_by: string | null
          emergency_status: string | null
          id: string
          location: string
          name: string
          operating_rooms: number | null
          total_beds: number | null
          updated_at: string
        }
        Insert: {
          available_ambulances?: number | null
          available_beds?: number | null
          created_at?: string
          created_by?: string | null
          emergency_status?: string | null
          id?: string
          location: string
          name: string
          operating_rooms?: number | null
          total_beds?: number | null
          updated_at?: string
        }
        Update: {
          available_ambulances?: number | null
          available_beds?: number | null
          created_at?: string
          created_by?: string | null
          emergency_status?: string | null
          id?: string
          location?: string
          name?: string
          operating_rooms?: number | null
          total_beds?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      incident_reports: {
        Row: {
          corrective_actions: string | null
          created_at: string
          created_by: string | null
          description: string
          follow_up_date: string | null
          follow_up_required: boolean | null
          id: string
          immediate_action: string | null
          incident_date: string
          incident_number: string
          incident_type: string
          investigation_status: string
          involved_personnel: string[] | null
          location: string
          preventive_measures: string | null
          regulatory_notification_required: boolean | null
          regulatory_notified: boolean | null
          reported_by: string | null
          reported_date: string
          root_cause_analysis: string | null
          severity: string
          updated_at: string
        }
        Insert: {
          corrective_actions?: string | null
          created_at?: string
          created_by?: string | null
          description: string
          follow_up_date?: string | null
          follow_up_required?: boolean | null
          id?: string
          immediate_action?: string | null
          incident_date: string
          incident_number: string
          incident_type: string
          investigation_status?: string
          involved_personnel?: string[] | null
          location: string
          preventive_measures?: string | null
          regulatory_notification_required?: boolean | null
          regulatory_notified?: boolean | null
          reported_by?: string | null
          reported_date?: string
          root_cause_analysis?: string | null
          severity?: string
          updated_at?: string
        }
        Update: {
          corrective_actions?: string | null
          created_at?: string
          created_by?: string | null
          description?: string
          follow_up_date?: string | null
          follow_up_required?: boolean | null
          id?: string
          immediate_action?: string | null
          incident_date?: string
          incident_number?: string
          incident_type?: string
          investigation_status?: string
          involved_personnel?: string[] | null
          location?: string
          preventive_measures?: string | null
          regulatory_notification_required?: boolean | null
          regulatory_notified?: boolean | null
          reported_by?: string | null
          reported_date?: string
          root_cause_analysis?: string | null
          severity?: string
          updated_at?: string
        }
        Relationships: []
      }
      integration_logs: {
        Row: {
          created_at: string
          created_by: string | null
          error_message: string | null
          id: string
          operation_type: string
          processing_time_ms: number | null
          records_failed: number | null
          records_processed: number | null
          records_success: number | null
          request_payload: Json | null
          response_payload: Json | null
          status: string
          system_id: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          error_message?: string | null
          id?: string
          operation_type: string
          processing_time_ms?: number | null
          records_failed?: number | null
          records_processed?: number | null
          records_success?: number | null
          request_payload?: Json | null
          response_payload?: Json | null
          status: string
          system_id: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          error_message?: string | null
          id?: string
          operation_type?: string
          processing_time_ms?: number | null
          records_failed?: number | null
          records_processed?: number | null
          records_success?: number | null
          request_payload?: Json | null
          response_payload?: Json | null
          status?: string
          system_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "integration_logs_system_id_fkey"
            columns: ["system_id"]
            isOneToOne: false
            referencedRelation: "external_systems"
            referencedColumns: ["id"]
          },
        ]
      }
      inter_hospital_transfers: {
        Row: {
          actual_delivery: string | null
          approved_by: string | null
          created_at: string
          created_by: string | null
          estimated_arrival: string | null
          from_hospital_id: string
          id: string
          item_id: string
          notes: string | null
          priority: string
          quantity: number
          requested_by: string | null
          status: string
          to_hospital_id: string
          tracking_number: string | null
          transfer_type: string
          updated_at: string
        }
        Insert: {
          actual_delivery?: string | null
          approved_by?: string | null
          created_at?: string
          created_by?: string | null
          estimated_arrival?: string | null
          from_hospital_id: string
          id?: string
          item_id: string
          notes?: string | null
          priority?: string
          quantity: number
          requested_by?: string | null
          status?: string
          to_hospital_id: string
          tracking_number?: string | null
          transfer_type?: string
          updated_at?: string
        }
        Update: {
          actual_delivery?: string | null
          approved_by?: string | null
          created_at?: string
          created_by?: string | null
          estimated_arrival?: string | null
          from_hospital_id?: string
          id?: string
          item_id?: string
          notes?: string | null
          priority?: string
          quantity?: number
          requested_by?: string | null
          status?: string
          to_hospital_id?: string
          tracking_number?: string | null
          transfer_type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "inter_hospital_transfers_from_hospital_id_fkey"
            columns: ["from_hospital_id"]
            isOneToOne: false
            referencedRelation: "hospitals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "inter_hospital_transfers_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "inventory"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "inter_hospital_transfers_to_hospital_id_fkey"
            columns: ["to_hospital_id"]
            isOneToOne: false
            referencedRelation: "hospitals"
            referencedColumns: ["id"]
          },
        ]
      }
      inventory: {
        Row: {
          category: string
          created_at: string
          created_by: string | null
          current_stock: number | null
          expiry_date: string | null
          id: string
          item_name: string
          last_restock_date: string | null
          minimum_stock: number | null
          supplier: string | null
          unit: string
          updated_at: string
        }
        Insert: {
          category: string
          created_at?: string
          created_by?: string | null
          current_stock?: number | null
          expiry_date?: string | null
          id?: string
          item_name: string
          last_restock_date?: string | null
          minimum_stock?: number | null
          supplier?: string | null
          unit: string
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          created_by?: string | null
          current_stock?: number | null
          expiry_date?: string | null
          id?: string
          item_name?: string
          last_restock_date?: string | null
          minimum_stock?: number | null
          supplier?: string | null
          unit?: string
          updated_at?: string
        }
        Relationships: []
      }
      inventory_forecasting: {
        Row: {
          algorithm_used: string
          confidence_score: number
          created_at: string
          created_by: string | null
          forecast_date: string
          id: string
          item_id: string
          predicted_demand: number
          seasonal_factor: number
          suggested_reorder_date: string | null
          suggested_reorder_quantity: number
          trend_factor: number
          updated_at: string
        }
        Insert: {
          algorithm_used?: string
          confidence_score?: number
          created_at?: string
          created_by?: string | null
          forecast_date: string
          id?: string
          item_id: string
          predicted_demand?: number
          seasonal_factor?: number
          suggested_reorder_date?: string | null
          suggested_reorder_quantity?: number
          trend_factor?: number
          updated_at?: string
        }
        Update: {
          algorithm_used?: string
          confidence_score?: number
          created_at?: string
          created_by?: string | null
          forecast_date?: string
          id?: string
          item_id?: string
          predicted_demand?: number
          seasonal_factor?: number
          suggested_reorder_date?: string | null
          suggested_reorder_quantity?: number
          trend_factor?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "inventory_forecasting_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "inventory"
            referencedColumns: ["id"]
          },
        ]
      }
      medical_services: {
        Row: {
          capacity: number | null
          created_at: string
          created_by: string | null
          current_load: number | null
          department: string
          description: string | null
          id: string
          service_name: string
          status: string | null
          updated_at: string
        }
        Insert: {
          capacity?: number | null
          created_at?: string
          created_by?: string | null
          current_load?: number | null
          department: string
          description?: string | null
          id?: string
          service_name: string
          status?: string | null
          updated_at?: string
        }
        Update: {
          capacity?: number | null
          created_at?: string
          created_by?: string | null
          current_load?: number | null
          department?: string
          description?: string | null
          id?: string
          service_name?: string
          status?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      mobile_command_units: {
        Row: {
          communication_equipment: Json | null
          coordinates: Json | null
          created_at: string
          created_by: string | null
          crew_assigned: string[] | null
          current_location: string | null
          deployment_history: Json | null
          equipment_status: Json | null
          fuel_level: number | null
          id: string
          maintenance_due: string | null
          mission_assigned: string | null
          operational_status: string | null
          unit_code: string
          unit_name: string
          updated_at: string
          vehicle_type: string
        }
        Insert: {
          communication_equipment?: Json | null
          coordinates?: Json | null
          created_at?: string
          created_by?: string | null
          crew_assigned?: string[] | null
          current_location?: string | null
          deployment_history?: Json | null
          equipment_status?: Json | null
          fuel_level?: number | null
          id?: string
          maintenance_due?: string | null
          mission_assigned?: string | null
          operational_status?: string | null
          unit_code: string
          unit_name: string
          updated_at?: string
          vehicle_type: string
        }
        Update: {
          communication_equipment?: Json | null
          coordinates?: Json | null
          created_at?: string
          created_by?: string | null
          crew_assigned?: string[] | null
          current_location?: string | null
          deployment_history?: Json | null
          equipment_status?: Json | null
          fuel_level?: number | null
          id?: string
          maintenance_due?: string | null
          mission_assigned?: string | null
          operational_status?: string | null
          unit_code?: string
          unit_name?: string
          updated_at?: string
          vehicle_type?: string
        }
        Relationships: []
      }
      personnel: {
        Row: {
          contact_info: Json | null
          created_at: string
          created_by: string | null
          id: string
          name: string
          position: string
          rank: string
          status: string | null
          unit: string
          updated_at: string
        }
        Insert: {
          contact_info?: Json | null
          created_at?: string
          created_by?: string | null
          id?: string
          name: string
          position: string
          rank: string
          status?: string | null
          unit: string
          updated_at?: string
        }
        Update: {
          contact_info?: Json | null
          created_at?: string
          created_by?: string | null
          id?: string
          name?: string
          position?: string
          rank?: string
          status?: string | null
          unit?: string
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string
          full_name: string | null
          id: string
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email: string
          full_name?: string | null
          id: string
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string
          full_name?: string | null
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      quality_audits: {
        Row: {
          audit_date: string
          audit_scope: string
          audit_title: string
          audit_type: string
          auditor_name: string
          auditor_organization: string | null
          compliance_percentage: number | null
          created_at: string
          created_by: string | null
          findings_count: number | null
          id: string
          next_audit_date: string | null
          non_conformities_count: number | null
          overall_score: number | null
          recommendations: string | null
          status: string
          updated_at: string
        }
        Insert: {
          audit_date: string
          audit_scope: string
          audit_title: string
          audit_type: string
          auditor_name: string
          auditor_organization?: string | null
          compliance_percentage?: number | null
          created_at?: string
          created_by?: string | null
          findings_count?: number | null
          id?: string
          next_audit_date?: string | null
          non_conformities_count?: number | null
          overall_score?: number | null
          recommendations?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          audit_date?: string
          audit_scope?: string
          audit_title?: string
          audit_type?: string
          auditor_name?: string
          auditor_organization?: string | null
          compliance_percentage?: number | null
          created_at?: string
          created_by?: string | null
          findings_count?: number | null
          id?: string
          next_audit_date?: string | null
          non_conformities_count?: number | null
          overall_score?: number | null
          recommendations?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      regional_distribution_centers: {
        Row: {
          center_code: string
          center_name: string
          cold_storage_capacity: number | null
          coordinates: Json | null
          created_at: string
          created_by: string | null
          current_utilization_percentage: number | null
          equipment_inventory: Json | null
          id: string
          last_audit_date: string | null
          operational_status: string | null
          region: string
          security_level: string | null
          served_bases: string[] | null
          staff_count: number | null
          storage_capacity_cubic_meters: number
          transportation_hub: boolean | null
          updated_at: string
        }
        Insert: {
          center_code: string
          center_name: string
          cold_storage_capacity?: number | null
          coordinates?: Json | null
          created_at?: string
          created_by?: string | null
          current_utilization_percentage?: number | null
          equipment_inventory?: Json | null
          id?: string
          last_audit_date?: string | null
          operational_status?: string | null
          region: string
          security_level?: string | null
          served_bases?: string[] | null
          staff_count?: number | null
          storage_capacity_cubic_meters?: number
          transportation_hub?: boolean | null
          updated_at?: string
        }
        Update: {
          center_code?: string
          center_name?: string
          cold_storage_capacity?: number | null
          coordinates?: Json | null
          created_at?: string
          created_by?: string | null
          current_utilization_percentage?: number | null
          equipment_inventory?: Json | null
          id?: string
          last_audit_date?: string | null
          operational_status?: string | null
          region?: string
          security_level?: string | null
          served_bases?: string[] | null
          staff_count?: number | null
          storage_capacity_cubic_meters?: number
          transportation_hub?: boolean | null
          updated_at?: string
        }
        Relationships: []
      }
      schedules: {
        Row: {
          assigned_personnel: string[] | null
          created_at: string
          created_by: string | null
          description: string | null
          end_time: string
          id: string
          start_time: string
          status: string | null
          title: string
          type: string
          updated_at: string
        }
        Insert: {
          assigned_personnel?: string[] | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          end_time: string
          id?: string
          start_time: string
          status?: string | null
          title: string
          type: string
          updated_at?: string
        }
        Update: {
          assigned_personnel?: string[] | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          end_time?: string
          id?: string
          start_time?: string
          status?: string | null
          title?: string
          type?: string
          updated_at?: string
        }
        Relationships: []
      }
      security_classifications: {
        Row: {
          access_requirements: string[]
          authorized_personnel_roles: string[] | null
          classification_level: string
          clearance_level_required: number
          created_at: string
          created_by: string | null
          disposal_procedures: string | null
          handling_procedures: string
          id: string
          retention_period: string | null
          storage_requirements: string
          transmission_protocols: string | null
          updated_at: string
        }
        Insert: {
          access_requirements?: string[]
          authorized_personnel_roles?: string[] | null
          classification_level: string
          clearance_level_required?: number
          created_at?: string
          created_by?: string | null
          disposal_procedures?: string | null
          handling_procedures: string
          id?: string
          retention_period?: string | null
          storage_requirements: string
          transmission_protocols?: string | null
          updated_at?: string
        }
        Update: {
          access_requirements?: string[]
          authorized_personnel_roles?: string[] | null
          classification_level?: string
          clearance_level_required?: number
          created_at?: string
          created_by?: string | null
          disposal_procedures?: string | null
          handling_procedures?: string
          id?: string
          retention_period?: string | null
          storage_requirements?: string
          transmission_protocols?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      strategic_plans: {
        Row: {
          approval_status: string | null
          approved_by: string | null
          budget_estimate: number | null
          created_at: string
          created_by: string | null
          id: string
          implementation_date: string | null
          objectives: Json
          plan_code: string
          plan_name: string
          plan_type: string
          resource_requirements: Json | null
          responsible_units: string[] | null
          review_date: string | null
          risk_factors: Json | null
          success_metrics: Json | null
          time_horizon: string
          updated_at: string
        }
        Insert: {
          approval_status?: string | null
          approved_by?: string | null
          budget_estimate?: number | null
          created_at?: string
          created_by?: string | null
          id?: string
          implementation_date?: string | null
          objectives?: Json
          plan_code: string
          plan_name: string
          plan_type?: string
          resource_requirements?: Json | null
          responsible_units?: string[] | null
          review_date?: string | null
          risk_factors?: Json | null
          success_metrics?: Json | null
          time_horizon?: string
          updated_at?: string
        }
        Update: {
          approval_status?: string | null
          approved_by?: string | null
          budget_estimate?: number | null
          created_at?: string
          created_by?: string | null
          id?: string
          implementation_date?: string | null
          objectives?: Json
          plan_code?: string
          plan_name?: string
          plan_type?: string
          resource_requirements?: Json | null
          responsible_units?: string[] | null
          review_date?: string | null
          risk_factors?: Json | null
          success_metrics?: Json | null
          time_horizon?: string
          updated_at?: string
        }
        Relationships: []
      }
      supply_chain_risks: {
        Row: {
          affected_items: string[] | null
          contingency_plans: string | null
          created_at: string
          created_by: string | null
          id: string
          impact_score: number
          last_assessment: string | null
          mitigation_strategies: string[] | null
          monitoring_frequency: string | null
          next_review: string | null
          probability_score: number
          responsible_officer: string | null
          risk_category: string
          risk_code: string
          risk_description: string
          risk_level: string | null
          status: string | null
          updated_at: string
        }
        Insert: {
          affected_items?: string[] | null
          contingency_plans?: string | null
          created_at?: string
          created_by?: string | null
          id?: string
          impact_score?: number
          last_assessment?: string | null
          mitigation_strategies?: string[] | null
          monitoring_frequency?: string | null
          next_review?: string | null
          probability_score?: number
          responsible_officer?: string | null
          risk_category: string
          risk_code: string
          risk_description: string
          risk_level?: string | null
          status?: string | null
          updated_at?: string
        }
        Update: {
          affected_items?: string[] | null
          contingency_plans?: string | null
          created_at?: string
          created_by?: string | null
          id?: string
          impact_score?: number
          last_assessment?: string | null
          mitigation_strategies?: string[] | null
          monitoring_frequency?: string | null
          next_review?: string | null
          probability_score?: number
          responsible_officer?: string | null
          risk_category?: string
          risk_code?: string
          risk_description?: string
          risk_level?: string | null
          status?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      theater_operations: {
        Row: {
          budget_allocated: number | null
          budget_spent: number | null
          commander_id: string
          communication_protocols: Json | null
          created_at: string
          created_by: string | null
          end_date: string | null
          evacuation_procedures: string | null
          geographic_bounds: Json | null
          id: string
          logistics_requirements: Json | null
          operation_type: string
          participating_units: string[] | null
          risk_assessment_level: string | null
          start_date: string
          status: string
          supply_chain_priorities: string[] | null
          theater_code: string
          theater_name: string
          updated_at: string
        }
        Insert: {
          budget_allocated?: number | null
          budget_spent?: number | null
          commander_id: string
          communication_protocols?: Json | null
          created_at?: string
          created_by?: string | null
          end_date?: string | null
          evacuation_procedures?: string | null
          geographic_bounds?: Json | null
          id?: string
          logistics_requirements?: Json | null
          operation_type?: string
          participating_units?: string[] | null
          risk_assessment_level?: string | null
          start_date: string
          status?: string
          supply_chain_priorities?: string[] | null
          theater_code: string
          theater_name: string
          updated_at?: string
        }
        Update: {
          budget_allocated?: number | null
          budget_spent?: number | null
          commander_id?: string
          communication_protocols?: Json | null
          created_at?: string
          created_by?: string | null
          end_date?: string | null
          evacuation_procedures?: string | null
          geographic_bounds?: Json | null
          id?: string
          logistics_requirements?: Json | null
          operation_type?: string
          participating_units?: string[] | null
          risk_assessment_level?: string | null
          start_date?: string
          status?: string
          supply_chain_priorities?: string[] | null
          theater_code?: string
          theater_name?: string
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          created_by: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      vendor_contracts: {
        Row: {
          auto_renewal: boolean | null
          contract_number: string
          contract_type: string
          created_at: string
          created_by: string | null
          currency: string | null
          delivery_schedule: string | null
          end_date: string
          id: string
          payment_schedule: string | null
          performance_metrics: Json | null
          renewal_option: boolean | null
          start_date: string
          status: string
          total_value: number | null
          updated_at: string
          vendor_id: string
        }
        Insert: {
          auto_renewal?: boolean | null
          contract_number: string
          contract_type: string
          created_at?: string
          created_by?: string | null
          currency?: string | null
          delivery_schedule?: string | null
          end_date: string
          id?: string
          payment_schedule?: string | null
          performance_metrics?: Json | null
          renewal_option?: boolean | null
          start_date: string
          status?: string
          total_value?: number | null
          updated_at?: string
          vendor_id: string
        }
        Update: {
          auto_renewal?: boolean | null
          contract_number?: string
          contract_type?: string
          created_at?: string
          created_by?: string | null
          currency?: string | null
          delivery_schedule?: string | null
          end_date?: string
          id?: string
          payment_schedule?: string | null
          performance_metrics?: Json | null
          renewal_option?: boolean | null
          start_date?: string
          status?: string
          total_value?: number | null
          updated_at?: string
          vendor_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "vendor_contracts_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "vendors"
            referencedColumns: ["id"]
          },
        ]
      }
      vendors: {
        Row: {
          address: string | null
          certification_status: string
          contact_person: string | null
          contract_end_date: string | null
          contract_start_date: string | null
          created_at: string
          created_by: string | null
          delivery_rating: number | null
          delivery_terms: string | null
          email: string | null
          id: string
          name: string
          payment_terms: string | null
          phone: string | null
          price_rating: number | null
          quality_rating: number | null
          registration_number: string | null
          status: string
          tax_id: string | null
          updated_at: string
          vendor_code: string
        }
        Insert: {
          address?: string | null
          certification_status?: string
          contact_person?: string | null
          contract_end_date?: string | null
          contract_start_date?: string | null
          created_at?: string
          created_by?: string | null
          delivery_rating?: number | null
          delivery_terms?: string | null
          email?: string | null
          id?: string
          name: string
          payment_terms?: string | null
          phone?: string | null
          price_rating?: number | null
          quality_rating?: number | null
          registration_number?: string | null
          status?: string
          tax_id?: string | null
          updated_at?: string
          vendor_code: string
        }
        Update: {
          address?: string | null
          certification_status?: string
          contact_person?: string | null
          contract_end_date?: string | null
          contract_start_date?: string | null
          created_at?: string
          created_by?: string | null
          delivery_rating?: number | null
          delivery_terms?: string | null
          email?: string | null
          id?: string
          name?: string
          payment_terms?: string | null
          phone?: string | null
          price_rating?: number | null
          quality_rating?: number | null
          registration_number?: string | null
          status?: string
          tax_id?: string | null
          updated_at?: string
          vendor_code?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_current_user_role: {
        Args: Record<PropertyKey, never>
        Returns: Database["public"]["Enums"]["app_role"]
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
    }
    Enums: {
      app_role:
        | "superadmin"
        | "kapuskesau"
        | "wakapuskesau"
        | "karspau"
        | "kalakespra"
        | "kasubdis"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: [
        "superadmin",
        "kapuskesau",
        "wakapuskesau",
        "karspau",
        "kalakespra",
        "kasubdis",
      ],
    },
  },
} as const
