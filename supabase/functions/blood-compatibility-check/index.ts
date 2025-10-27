import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface BloodCompatibilityRequest {
  donorType: string;
  recipientType: string;
}

const bloodCompatibilityMatrix: Record<string, string[]> = {
  "O-": ["O-", "O+", "A-", "A+", "B-", "B+", "AB-", "AB+"],
  "O+": ["O+", "A+", "B+", "AB+"],
  "A-": ["A-", "A+", "AB-", "AB+"],
  "A+": ["A+", "AB+"],
  "B-": ["B-", "B+", "AB-", "AB+"],
  "B+": ["B+", "AB+"],
  "AB-": ["AB-", "AB+"],
  "AB+": ["AB+"],
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { donorType, recipientType }: BloodCompatibilityRequest = await req.json();

    const compatibleRecipients = bloodCompatibilityMatrix[donorType] || [];
    const isCompatible = compatibleRecipients.includes(recipientType);

    const universalDonor = donorType === "O-";
    const universalRecipient = recipientType === "AB+";

    let recommendation = "";
    if (isCompatible) {
      recommendation = `Darah ${donorType} kompatibel untuk transfusi ke ${recipientType}`;
    } else {
      recommendation = `PERINGATAN: Darah ${donorType} TIDAK kompatibel untuk ${recipientType}. Jangan lakukan transfusi!`;
    }

    if (universalDonor) {
      recommendation += " | Pendonor Universal (O-) dapat memberikan ke semua golongan.";
    }

    if (universalRecipient) {
      recommendation += " | Penerima Universal (AB+) dapat menerima dari semua golongan.";
    }

    return new Response(
      JSON.stringify({
        compatible: isCompatible,
        donorType,
        recipientType,
        compatibleRecipients,
        universalDonor,
        universalRecipient,
        recommendation,
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
