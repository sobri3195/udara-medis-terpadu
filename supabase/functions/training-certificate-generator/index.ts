import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface CertificateRequest {
  trainingId: string;
  trainingName: string;
  participantName: string;
  participantNrp: string;
  participantRank: string;
  completionDate: string;
  durationHours: number;
  instructor: string;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const {
      trainingId,
      trainingName,
      participantName,
      participantNrp,
      participantRank,
      completionDate,
      durationHours,
      instructor,
    }: CertificateRequest = await req.json();

    const certificateId = `CERT-${Date.now()}-${participantNrp}`;
    const issueDate = new Date(completionDate);
    const expiryDate = new Date(issueDate);
    expiryDate.setFullYear(issueDate.getFullYear() + 2);

    const certificateData = {
      certificateId,
      trainingId,
      trainingName,
      participant: {
        name: participantName,
        nrp: participantNrp,
        rank: participantRank,
      },
      completionDate: issueDate.toISOString(),
      expiryDate: expiryDate.toISOString(),
      durationHours,
      instructor,
      issuedBy: "TNI Angkatan Udara - Dinas Kesehatan",
      issuedDate: new Date().toISOString(),
    };

    const certificateText = generateCertificateText(certificateData);

    const verificationUrl = `https://verify.tni-au-medical.id/cert/${certificateId}`;

    return new Response(
      JSON.stringify({
        success: true,
        certificate: certificateData,
        certificateText,
        verificationUrl,
        message: "Sertifikat berhasil dibuat",
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

function generateCertificateText(data: any): string {
  return `
========================================
     SERTIFIKAT PELATIHAN
     TNI ANGKATAN UDARA
     DINAS KESEHATAN
========================================

Nomor Sertifikat: ${data.certificateId}

Diberikan kepada:
${data.participant.rank} ${data.participant.name}
NRP: ${data.participant.nrp}

Telah menyelesaikan pelatihan:
${data.trainingName}

Durasi: ${data.durationHours} jam
Instruktur: ${data.instructor}
Tanggal Selesai: ${new Date(data.completionDate).toLocaleDateString("id-ID")}

Berlaku hingga: ${new Date(data.expiryDate).toLocaleDateString("id-ID")}

Diterbitkan oleh: ${data.issuedBy}
Tanggal Terbit: ${new Date(data.issuedDate).toLocaleDateString("id-ID")}

========================================
  `;
}
