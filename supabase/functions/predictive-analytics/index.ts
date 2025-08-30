import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { analysis_type, data_range, parameters } = await req.json();
    
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    const supabase = createClient(supabaseUrl, supabaseKey);

    console.log('Starting predictive health analytics:', analysis_type);

    // Gather comprehensive data based on analysis type
    let analysisData = {};

    if (analysis_type === 'disease_outbreak') {
      // Get medical services utilization data
      const { data: services } = await supabase
        .from('medical_services')
        .select('*');
      
      // Get hospital status data
      const { data: hospitals } = await supabase
        .from('hospitals')
        .select('*');

      // Get recent incident reports
      const { data: incidents } = await supabase
        .from('incident_reports')
        .select('*')
        .gte('created_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString())
        .limit(50);

      analysisData = { services, hospitals, incidents };
    } else if (analysis_type === 'resource_demand') {
      // Get inventory data
      const { data: inventory } = await supabase
        .from('inventory')
        .select('*');
      
      // Get distribution history
      const { data: distributions } = await supabase
        .from('distributions')
        .select('*')
        .gte('created_at', new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString())
        .limit(100);

      analysisData = { inventory, distributions };
    } else if (analysis_type === 'personnel_workload') {
      // Get personnel data
      const { data: personnel } = await supabase
        .from('personnel')
        .select('*');
      
      // Get schedule data
      const { data: schedules } = await supabase
        .from('schedules')
        .select('*')
        .gte('start_time', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString());

      analysisData = { personnel, schedules };
    }

    // Prepare AI prompt for predictive analytics
    const prompt = `You are an expert healthcare analytics specialist for TNI AU medical system.
    
    Perform ${analysis_type} predictive analysis with this data:
    
    Analysis Parameters: ${JSON.stringify(parameters || {})}
    Data Range: ${data_range || '30 days'}
    
    Current System Data:
    ${JSON.stringify(analysisData, null, 2)}
    
    Provide a comprehensive JSON response with:
    - predictions (array of prediction objects with date, probability, confidence)
    - risk_assessment (high/medium/low with detailed factors)
    - recommended_actions (prioritized array of actionable items)
    - resource_requirements (estimated needs)
    - timeline_forecast (30, 60, 90 day outlook)
    - alert_thresholds (when to trigger alerts)
    - mitigation_strategies (preventive measures)
    - confidence_metrics (overall confidence in predictions)
    
    Focus on:
    - Military medical readiness
    - Emergency preparedness
    - Resource optimization
    - Risk mitigation
    - Operational efficiency`;

    const aiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-5-2025-08-07',
        messages: [
          { role: 'system', content: 'You are an expert healthcare predictive analytics specialist. Always respond with valid JSON.' },
          { role: 'user', content: prompt }
        ],
        max_completion_tokens: 2000,
      }),
    });

    const aiData = await aiResponse.json();
    const analytics = JSON.parse(aiData.choices[0].message.content);

    console.log('Predictive analytics completed successfully');

    return new Response(JSON.stringify({
      success: true,
      analysis_type,
      generated_at: new Date().toISOString(),
      analytics
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in predictive analytics:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      success: false 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});