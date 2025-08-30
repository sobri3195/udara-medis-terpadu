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
    const { item_id, historical_data, seasonal_factors } = await req.json();
    
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    const supabase = createClient(supabaseUrl, supabaseKey);

    console.log('Starting AI inventory forecasting for item:', item_id);

    // Get historical consumption data
    const { data: inventory } = await supabase
      .from('inventory')
      .select('*')
      .eq('id', item_id)
      .single();

    if (!inventory) {
      throw new Error('Item not found');
    }

    // Prepare AI prompt for forecasting
    const prompt = `You are an expert supply chain analyst for TNI AU medical facilities. 
    
    Analyze this medical inventory item and provide demand forecasting:
    
    Item: ${inventory.item_name}
    Category: ${inventory.category}
    Current Stock: ${inventory.current_stock}
    Minimum Stock: ${inventory.minimum_stock}
    Unit: ${inventory.unit}
    
    Historical Data: ${JSON.stringify(historical_data || {})}
    Seasonal Factors: ${JSON.stringify(seasonal_factors || {})}
    
    Provide a JSON response with:
    - predicted_demand (next 30 days)
    - confidence_score (0.0-1.0)
    - seasonal_factor (multiplier)
    - trend_factor (multiplier)
    - suggested_reorder_quantity
    - suggested_reorder_date (YYYY-MM-DD)
    - risk_factors (array of strings)
    - recommendations (array of strings)
    
    Consider:
    - Medical emergency preparedness
    - Expiry dates and shelf life
    - Seasonal illness patterns
    - Military deployment schedules
    - Budget constraints`;

    const aiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-5-2025-08-07',
        messages: [
          { role: 'system', content: 'You are an expert medical supply chain analyst. Always respond with valid JSON.' },
          { role: 'user', content: prompt }
        ],
        max_completion_tokens: 1000,
      }),
    });

    const aiData = await aiResponse.json();
    const forecast = JSON.parse(aiData.choices[0].message.content);

    // Store forecast in database
    const { data: forecastRecord, error } = await supabase
      .from('inventory_forecasting')
      .insert({
        item_id,
        forecast_date: new Date().toISOString().split('T')[0],
        predicted_demand: forecast.predicted_demand,
        confidence_score: forecast.confidence_score,
        seasonal_factor: forecast.seasonal_factor,
        trend_factor: forecast.trend_factor,
        suggested_reorder_quantity: forecast.suggested_reorder_quantity,
        suggested_reorder_date: forecast.suggested_reorder_date,
        algorithm_used: 'ai_prediction',
      })
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      throw error;
    }

    console.log('Forecast generated successfully:', forecastRecord.id);

    return new Response(JSON.stringify({
      success: true,
      forecast: forecastRecord,
      analysis: {
        risk_factors: forecast.risk_factors,
        recommendations: forecast.recommendations,
      }
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in inventory forecasting:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      success: false 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});