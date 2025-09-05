import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.56.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface BPJSPredictionData {
  region: string;
  medication_type: string;
  predicted_demand: number;
  confidence_score: number;
  seasonal_factor: number;
  historical_usage: number[];
}

interface SatuSehatData {
  facility_id: string;
  patient_count: number;
  disease_trends: Array<{
    disease_code: string;
    case_count: number;
    trend: 'increasing' | 'stable' | 'decreasing';
  }>;
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
    console.log('BPJS Integration action:', action);

    switch (action) {
      case 'sync_bpjs_data':
        // Simulate BPJS API call for drug usage data
        const bpjsData: BPJSPredictionData[] = [
          {
            region: 'Jakarta',
            medication_type: 'Antibiotik',
            predicted_demand: 1250,
            confidence_score: 0.89,
            seasonal_factor: 1.2,
            historical_usage: [1000, 1100, 1200, 1180, 1250]
          },
          {
            region: 'Surabaya',
            medication_type: 'Analgesik',
            predicted_demand: 890,
            confidence_score: 0.76,
            seasonal_factor: 0.95,
            historical_usage: [800, 850, 900, 880, 890]
          }
        ];

        // Store predictions in inventory_forecasting table
        for (const prediction of bpjsData) {
          await supabase.from('inventory_forecasting').insert({
            item_id: null, // Will be mapped to actual inventory items
            forecast_date: new Date().toISOString().split('T')[0],
            predicted_demand: prediction.predicted_demand,
            confidence_score: prediction.confidence_score,
            seasonal_factor: prediction.seasonal_factor,
            trend_factor: prediction.historical_usage[4] / prediction.historical_usage[0],
            algorithm_used: 'bpjs_integration',
            suggested_reorder_quantity: Math.ceil(prediction.predicted_demand * 1.2),
            suggested_reorder_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
          });
        }

        return new Response(JSON.stringify({ 
          success: true, 
          message: 'BPJS data synchronized successfully',
          predictions: bpjsData 
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });

      case 'sync_satusehat_data':
        // Simulate SatuSehat API call for health facility data
        const satuSehatData: SatuSehatData = {
          facility_id: 'RS_TNI_AU_001',
          patient_count: 1450,
          disease_trends: [
            { disease_code: 'J44', case_count: 45, trend: 'increasing' },
            { disease_code: 'I10', case_count: 78, trend: 'stable' },
            { disease_code: 'E11', case_count: 32, trend: 'decreasing' }
          ]
        };

        // Log integration activity
        await supabase.from('integration_logs').insert({
          system_id: 'satusehat_system',
          operation_type: 'data_sync',
          status: 'success',
          request_payload: { action: 'sync_satusehat_data' },
          response_payload: satuSehatData,
          records_processed: satuSehatData.disease_trends.length,
          records_success: satuSehatData.disease_trends.length,
          records_failed: 0,
          processing_time_ms: 1200
        });

        return new Response(JSON.stringify({ 
          success: true, 
          message: 'SatuSehat data synchronized successfully',
          data: satuSehatData 
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });

      case 'get_demand_predictions':
        const { data: predictions } = await supabase
          .from('inventory_forecasting')
          .select('*')
          .eq('algorithm_used', 'bpjs_integration')
          .order('created_at', { ascending: false })
          .limit(10);

        return new Response(JSON.stringify({ 
          success: true, 
          predictions: predictions || [] 
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
    console.error('BPJS Integration error:', error);
    return new Response(JSON.stringify({ 
      error: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});