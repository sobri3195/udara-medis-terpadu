import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.56.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface DisasterAlert {
  alert_id: string;
  disaster_type: 'earthquake' | 'flood' | 'tsunami' | 'volcanic' | 'landslide';
  severity: 'low' | 'medium' | 'high' | 'critical';
  affected_regions: string[];
  estimated_casualties: number;
  required_medical_supplies: Array<{
    item_type: string;
    estimated_quantity: number;
    priority: 'low' | 'medium' | 'high' | 'critical';
  }>;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  alert_time: string;
}

interface EmergencyResponse {
  response_id: string;
  disaster_alert_id: string;
  deployment_plan: {
    field_hospitals: string[];
    medical_teams: string[];
    supply_distribution: Array<{
      location: string;
      supplies: string[];
      estimated_arrival: string;
    }>;
  };
  status: 'planning' | 'deploying' | 'active' | 'completed';
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { action, data } = await req.json();
    console.log('Disaster Management action:', action);

    switch (action) {
      case 'receive_bnpb_alert':
        // Simulate receiving disaster alert from BNPB
        const disasterAlert: DisasterAlert = {
          alert_id: `BNPB_${Date.now()}`,
          disaster_type: data.disaster_type || 'earthquake',
          severity: data.severity || 'high',
          affected_regions: data.affected_regions || ['Jakarta Selatan', 'Bogor'],
          estimated_casualties: data.estimated_casualties || 150,
          required_medical_supplies: [
            { item_type: 'Emergency Kit', estimated_quantity: 50, priority: 'critical' },
            { item_type: 'Blood Bag', estimated_quantity: 200, priority: 'high' },
            { item_type: 'Antibiotik', estimated_quantity: 300, priority: 'high' },
            { item_type: 'Morphine', estimated_quantity: 100, priority: 'medium' }
          ],
          coordinates: {
            latitude: data.latitude || -6.2088,
            longitude: data.longitude || 106.8456
          },
          alert_time: new Date().toISOString()
        };

        // Create incident report
        const { data: incident } = await supabase.from('incident_reports').insert({
          incident_number: disasterAlert.alert_id,
          incident_type: `disaster_${disasterAlert.disaster_type}`,
          severity: disasterAlert.severity,
          location: disasterAlert.affected_regions.join(', '),
          description: `BNPB Alert: ${disasterAlert.disaster_type} with ${disasterAlert.severity} severity affecting ${disasterAlert.affected_regions.join(', ')}`,
          incident_date: disasterAlert.alert_time,
          investigation_status: 'open',
          immediate_action: 'Emergency response protocol activated'
        }).select().single();

        // Create disaster response kit deployment
        await supabase.from('disaster_response_kits').insert({
          kit_code: `EMERGENCY_${disasterAlert.alert_id}`,
          disaster_type: disasterAlert.disaster_type,
          kit_configuration: disasterAlert.required_medical_supplies,
          deployment_locations: disasterAlert.affected_regions,
          response_time_hours: disasterAlert.severity === 'critical' ? 2 : 6,
          personnel_required: Math.ceil(disasterAlert.estimated_casualties / 30)
        });

        return new Response(JSON.stringify({ 
          success: true, 
          message: 'Disaster alert processed and emergency response initiated',
          alert: disasterAlert,
          incident_id: incident?.id
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });

      case 'create_emergency_response':
        const emergencyResponse: EmergencyResponse = {
          response_id: `RESP_${Date.now()}`,
          disaster_alert_id: data.alert_id,
          deployment_plan: {
            field_hospitals: ['Mobile Unit Alpha', 'Mobile Unit Beta'],
            medical_teams: ['Team 1', 'Team 2', 'Trauma Team'],
            supply_distribution: [
              {
                location: 'Jakarta Selatan',
                supplies: ['Emergency Kits', 'Blood Products', 'Antibiotics'],
                estimated_arrival: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString()
              }
            ]
          },
          status: 'planning'
        };

        // Update field hospital deployment status
        await supabase.from('field_hospitals')
          .update({ 
            deployment_status: 'deploying',
            mission_type: 'disaster_response',
            logistics_status: 'emergency_deploy'
          })
          .in('hospital_name', emergencyResponse.deployment_plan.field_hospitals);

        return new Response(JSON.stringify({ 
          success: true, 
          message: 'Emergency response plan created',
          response: emergencyResponse 
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });

      case 'get_active_disasters':
        const { data: activeIncidents } = await supabase
          .from('incident_reports')
          .select('*')
          .like('incident_type', 'disaster_%')
          .eq('investigation_status', 'open')
          .order('incident_date', { ascending: false });

        return new Response(JSON.stringify({ 
          success: true, 
          active_disasters: activeIncidents || [] 
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });

      case 'update_response_status':
        await supabase.from('disaster_response_kits')
          .update({ 
            last_deployment: new Date().toISOString().split('T')[0],
            deployment_count: data.deployment_count || 1
          })
          .eq('kit_code', data.kit_code);

        return new Response(JSON.stringify({ 
          success: true, 
          message: 'Response status updated' 
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });

      default:
        return new Response(JSON.stringify({ 
          error: 'Invalid action' 
        }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
    }
  } catch (error) {
    console.error('Disaster Management error:', error);
    return new Response(JSON.stringify({ 
      error: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});