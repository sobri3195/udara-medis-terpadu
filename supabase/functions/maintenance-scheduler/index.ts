import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface MaintenanceScheduleRequest {
  equipmentId: string;
  equipmentName: string;
  lastMaintenanceDate: string;
  intervalDays: number;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const {
      equipmentId,
      equipmentName,
      lastMaintenanceDate,
      intervalDays,
    }: MaintenanceScheduleRequest = await req.json();

    const lastMaintenance = new Date(lastMaintenanceDate);
    const nextMaintenance = new Date(lastMaintenance);
    nextMaintenance.setDate(lastMaintenance.getDate() + intervalDays);

    const today = new Date();
    const daysUntilMaintenance = Math.floor(
      (nextMaintenance.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    );

    let priority = "low";
    if (daysUntilMaintenance <= 7) {
      priority = "high";
    } else if (daysUntilMaintenance <= 14) {
      priority = "medium";
    }

    const maintenanceSchedule = {
      equipmentId,
      equipmentName,
      lastMaintenance: lastMaintenance.toISOString(),
      nextMaintenance: nextMaintenance.toISOString(),
      daysUntilMaintenance,
      priority,
      intervalDays,
    };

    const recommendedActions = [];
    if (daysUntilMaintenance < 0) {
      recommendedActions.push("Perawatan terlambat! Segera jadwalkan perawatan.");
    } else if (daysUntilMaintenance <= 7) {
      recommendedActions.push("Perawatan akan jatuh tempo dalam 7 hari. Hubungi teknisi.");
      recommendedActions.push("Persiapkan suku cadang yang diperlukan.");
    } else if (daysUntilMaintenance <= 14) {
      recommendedActions.push("Perawatan akan segera jatuh tempo. Rencanakan jadwal.");
    }

    const estimatedDowntime = calculateDowntime(equipmentName);
    recommendedActions.push(`Estimasi waktu perawatan: ${estimatedDowntime} jam`);

    return new Response(
      JSON.stringify({
        success: true,
        schedule: maintenanceSchedule,
        recommendedActions,
        estimatedDowntime,
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

function calculateDowntime(equipmentName: string): number {
  const downtimeMap: Record<string, number> = {
    ct: 4,
    mri: 6,
    xray: 2,
    ultrasound: 1,
    ventilator: 3,
    default: 2,
  };

  const key = Object.keys(downtimeMap).find((k) =>
    equipmentName.toLowerCase().includes(k)
  );
  return downtimeMap[key || "default"];
}
