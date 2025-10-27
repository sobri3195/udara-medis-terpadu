import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface EmergencyDispatchRequest {
  caseId: string;
  location: string;
  severity: string;
  emergencyType: string;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? ""
    );

    const { caseId, location, severity, emergencyType }: EmergencyDispatchRequest = await req.json();

    const availableAmbulances = [
      { id: "AMB-001", name: "Ambulans Unit 1", status: "available", distance: 5 },
      { id: "AMB-002", name: "Ambulans Unit 2", status: "available", distance: 8 },
      { id: "AMB-003", name: "Ambulans Unit 3", status: "available", distance: 12 },
    ];

    const nearestAmbulance = availableAmbulances.sort((a, b) => a.distance - b.distance)[0];

    const estimatedArrival = Math.ceil(nearestAmbulance.distance * 2);

    const notificationData = {
      type: "emergency_dispatch",
      caseId,
      ambulanceId: nearestAmbulance.id,
      location,
      severity,
      estimatedArrival,
      timestamp: new Date().toISOString(),
    };

    console.log("Emergency dispatch notification:", notificationData);

    return new Response(
      JSON.stringify({
        success: true,
        ambulance: nearestAmbulance,
        estimatedArrival: `${estimatedArrival} menit`,
        message: "Ambulans berhasil dikirim",
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      }
    );
  }
});
