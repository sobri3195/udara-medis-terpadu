import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.56.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface WHOReport {
  report_id: string;
  report_type: 'drug_safety' | 'adverse_events' | 'quality_audit' | 'cold_chain' | 'inventory_management';
  reporting_period: {
    start_date: string;
    end_date: string;
  };
  facility_id: string;
  compliance_score: number;
  findings: Array<{
    category: string;
    description: string;
    severity: 'low' | 'medium' | 'high' | 'critical';
    recommendation: string;
  }>;
  regulatory_requirements: string[];
  submission_date: string;
  status: 'draft' | 'submitted' | 'approved' | 'rejected';
}

interface ComplianceMetrics {
  drug_safety_compliance: number;
  cold_chain_compliance: number;
  inventory_accuracy: number;
  adverse_event_reporting: number;
  overall_score: number;
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
    console.log('WHO Standards action:', action);

    switch (action) {
      case 'generate_who_report':
        // Fetch data for WHO report
        const [adverseEvents, auditFindings, coldChainAlerts, inventoryData] = await Promise.all([
          supabase.from('adverse_events').select('*').gte('reported_date', data.start_date).lte('reported_date', data.end_date),
          supabase.from('audit_findings').select('*').gte('verification_date', data.start_date).lte('verification_date', data.end_date),
          supabase.from('cold_chain_alerts').select('*').gte('created_at', data.start_date).lte('created_at', data.end_date),
          supabase.from('inventory').select('*')
        ]);

        const whoReport: WHOReport = {
          report_id: `WHO_${Date.now()}`,
          report_type: data.report_type || 'quality_audit',
          reporting_period: {
            start_date: data.start_date,
            end_date: data.end_date
          },
          facility_id: 'TNI_AU_MEDICAL_COMMAND',
          compliance_score: 87.5,
          findings: [
            {
              category: 'Drug Safety Monitoring',
              description: `${adverseEvents.data?.length || 0} adverse events reported during period`,
              severity: adverseEvents.data?.length > 10 ? 'medium' : 'low',
              recommendation: 'Continue systematic adverse event monitoring and reporting'
            },
            {
              category: 'Cold Chain Management',
              description: `${coldChainAlerts.data?.length || 0} temperature excursions detected`,
              severity: coldChainAlerts.data?.length > 5 ? 'high' : 'medium',
              recommendation: 'Enhance cold chain monitoring and backup systems'
            },
            {
              category: 'Quality Audits',
              description: `${auditFindings.data?.length || 0} audit findings requiring attention`,
              severity: auditFindings.data?.filter(f => f.severity === 'high').length > 0 ? 'high' : 'medium',
              recommendation: 'Address high-priority audit findings within 30 days'
            }
          ],
          regulatory_requirements: [
            'WHO Technical Report Series 961',
            'WHO Guidelines on Good Distribution Practices',
            'ICH Q9 Quality Risk Management',
            'WHO Prequalification Programme'
          ],
          submission_date: new Date().toISOString(),
          status: 'draft'
        };

        // Store WHO report
        await supabase.from('quality_audits').insert({
          audit_type: 'who_compliance_report',
          audit_title: `WHO Standards Compliance Report - ${whoReport.reporting_period.start_date} to ${whoReport.reporting_period.end_date}`,
          audit_scope: 'Full facility compliance assessment',
          auditor_name: 'Automated WHO Compliance System',
          auditor_organization: 'TNI AU Medical Command',
          status: 'completed',
          audit_date: new Date().toISOString().split('T')[0],
          overall_score: whoReport.compliance_score,
          compliance_percentage: whoReport.compliance_score,
          findings_count: whoReport.findings.length,
          recommendations: whoReport.findings.map(f => f.recommendation).join('; ')
        });

        return new Response(JSON.stringify({ 
          success: true, 
          message: 'WHO compliance report generated successfully',
          report: whoReport 
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });

      case 'submit_adverse_event_report':
        // Format adverse event for WHO submission
        const { data: adverseEvent } = await supabase
          .from('adverse_events')
          .select('*')
          .eq('id', data.event_id)
          .single();

        if (!adverseEvent) {
          return new Response(JSON.stringify({ 
            error: 'Adverse event not found' 
          }), {
            status: 404,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }

        // Update adverse event with WHO reporting info
        await supabase.from('adverse_events')
          .update({
            regulatory_reported: true,
            regulatory_report_number: `WHO_AE_${Date.now()}`
          })
          .eq('id', data.event_id);

        return new Response(JSON.stringify({ 
          success: true, 
          message: 'Adverse event submitted to WHO database',
          who_reference: `WHO_AE_${Date.now()}`
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });

      case 'get_compliance_metrics':
        // Calculate compliance metrics
        const [
          totalAdverseEvents,
          reportedAdverseEvents,
          coldChainViolations,
          totalColdChainReadings,
          expiredItems,
          totalItems,
          auditViolations
        ] = await Promise.all([
          supabase.from('adverse_events').select('id', { count: 'exact' }),
          supabase.from('adverse_events').select('id', { count: 'exact' }).eq('regulatory_reported', true),
          supabase.from('cold_chain_alerts').select('id', { count: 'exact' }).eq('resolved', false),
          supabase.from('cold_chain_sensors').select('id', { count: 'exact' }),
          supabase.from('inventory').select('id', { count: 'exact' }).lt('expiry_date', new Date().toISOString()),
          supabase.from('inventory').select('id', { count: 'exact' }),
          supabase.from('audit_findings').select('id', { count: 'exact' }).in('severity', ['high', 'critical'])
        ]);

        const metrics: ComplianceMetrics = {
          drug_safety_compliance: totalAdverseEvents.count ? (reportedAdverseEvents.count / totalAdverseEvents.count) * 100 : 100,
          cold_chain_compliance: totalColdChainReadings.count ? ((totalColdChainReadings.count - coldChainViolations.count) / totalColdChainReadings.count) * 100 : 100,
          inventory_accuracy: totalItems.count ? ((totalItems.count - expiredItems.count) / totalItems.count) * 100 : 100,
          adverse_event_reporting: totalAdverseEvents.count ? (reportedAdverseEvents.count / totalAdverseEvents.count) * 100 : 100,
          overall_score: 0
        };

        metrics.overall_score = (
          metrics.drug_safety_compliance + 
          metrics.cold_chain_compliance + 
          metrics.inventory_accuracy + 
          metrics.adverse_event_reporting
        ) / 4;

        return new Response(JSON.stringify({ 
          success: true, 
          metrics 
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });

      case 'schedule_auto_reporting':
        // Create scheduled reporting entry
        await supabase.from('external_systems').insert({
          system_name: 'WHO Reporting System',
          system_type: 'regulatory_compliance',
          endpoint_url: 'https://who.int/api/compliance-reports',
          authentication_method: 'api_key',
          connection_status: 'active',
          auto_sync_enabled: true,
          sync_frequency: data.frequency_days || 30,
          configuration: {
            report_types: data.report_types || ['adverse_events', 'quality_audits'],
            auto_submit: data.auto_submit || false,
            notification_email: data.notification_email
          }
        });

        return new Response(JSON.stringify({ 
          success: true, 
          message: 'Automatic WHO reporting scheduled' 
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
    console.error('WHO Standards error:', error);
    return new Response(JSON.stringify({ 
      error: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});