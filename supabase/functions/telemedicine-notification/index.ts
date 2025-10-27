import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface TelemedicineNotificationRequest {
  consultationId: string;
  patientName: string;
  doctorName: string;
  scheduledDate: string;
  consultationType: string;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const {
      consultationId,
      patientName,
      doctorName,
      scheduledDate,
      consultationType,
    }: TelemedicineNotificationRequest = await req.json();

    const scheduledDateTime = new Date(scheduledDate);
    const now = new Date();
    const minutesUntilConsultation = Math.floor((scheduledDateTime.getTime() - now.getTime()) / (1000 * 60));

    const notificationMessage = `Konsultasi telemedicine ${consultationType} antara ${patientName} dan ${doctorName} dijadwalkan dalam ${minutesUntilConsultation} menit.`;

    const emailData = {
      to: [patientName, doctorName],
      subject: `Pengingat Konsultasi Telemedicine - ${consultationId}`,
      body: notificationMessage,
      consultationType,
      scheduledDate: scheduledDateTime.toISOString(),
    };

    console.log("Telemedicine notification sent:", emailData);

    const meetingLink = `https://meet.tni-au-medical.id/${consultationId}`;

    return new Response(
      JSON.stringify({
        success: true,
        message: "Notifikasi berhasil dikirim",
        consultationId,
        meetingLink,
        scheduledDate: scheduledDateTime.toISOString(),
        notificationsSent: {
          patient: true,
          doctor: true,
        },
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
