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
    const { system_id, operation_type, payload } = await req.json();
    
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    const supabase = createClient(supabaseUrl, supabaseKey);

    console.log(`Processing ${operation_type} for system:`, system_id);

    // Get external system configuration
    const { data: system, error: systemError } = await supabase
      .from('external_systems')
      .select('*')
      .eq('id', system_id)
      .single();

    if (systemError || !system) {
      throw new Error('External system not found');
    }

    const startTime = Date.now();
    let response;
    let status = 'success';
    let errorMessage = null;
    let recordsProcessed = 0;

    try {
      // Prepare authentication headers
      let authHeaders: Record<string, string> = {
        'Content-Type': 'application/json',
      };

      if (system.authentication_method === 'api_key') {
        authHeaders['X-API-Key'] = system.configuration?.api_key || '';
      } else if (system.authentication_method === 'basic_auth') {
        const credentials = btoa(`${system.configuration?.username}:${system.configuration?.password}`);
        authHeaders['Authorization'] = `Basic ${credentials}`;
      } else if (system.authentication_method === 'oauth') {
        authHeaders['Authorization'] = `Bearer ${system.configuration?.access_token}`;
      }

      // Perform the external API call based on operation type
      if (operation_type === 'sync') {
        response = await fetch(`${system.endpoint_url}/sync`, {
          method: 'POST',
          headers: authHeaders,
          body: JSON.stringify(payload || {}),
        });
      } else if (operation_type === 'send') {
        response = await fetch(`${system.endpoint_url}/receive`, {
          method: 'POST',
          headers: authHeaders,
          body: JSON.stringify(payload),
        });
      } else if (operation_type === 'receive') {
        response = await fetch(`${system.endpoint_url}/data`, {
          method: 'GET',
          headers: authHeaders,
        });
      } else if (operation_type === 'authenticate') {
        response = await fetch(`${system.endpoint_url}/auth/verify`, {
          method: 'POST',
          headers: authHeaders,
        });
      }

      const responseData = await response?.json();
      
      if (!response?.ok) {
        status = 'failed';
        errorMessage = responseData?.message || `HTTP ${response?.status}`;
      } else {
        recordsProcessed = responseData?.records_count || 1;
        
        // Update system status
        await supabase
          .from('external_systems')
          .update({
            connection_status: 'active',
            last_sync: new Date().toISOString(),
            error_count: 0,
            last_error: null,
          })
          .eq('id', system_id);
      }

    } catch (fetchError: any) {
      status = 'failed';
      errorMessage = fetchError.message;
      
      // Update system error count
      await supabase
        .from('external_systems')
        .update({
          connection_status: 'error',
          error_count: (system.error_count || 0) + 1,
          last_error: errorMessage,
        })
        .eq('id', system_id);
    }

    const processingTime = Date.now() - startTime;

    // Log the integration attempt
    const { error: logError } = await supabase
      .from('integration_logs')
      .insert({
        system_id,
        operation_type,
        status,
        request_payload: payload,
        response_payload: response ? await response.json() : null,
        error_message: errorMessage,
        processing_time_ms: processingTime,
        records_processed: recordsProcessed,
        records_success: status === 'success' ? recordsProcessed : 0,
        records_failed: status === 'failed' ? recordsProcessed : 0,
      });

    if (logError) {
      console.error('Failed to log integration:', logError);
    }

    console.log(`Integration ${operation_type} completed:`, status);

    return new Response(JSON.stringify({
      success: status === 'success',
      operation_type,
      system_name: system.system_name,
      processing_time_ms: processingTime,
      records_processed: recordsProcessed,
      error: errorMessage,
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in external integration:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      success: false 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});