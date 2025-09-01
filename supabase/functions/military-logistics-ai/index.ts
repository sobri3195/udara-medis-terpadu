import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const { analysisType, data } = await req.json();

    console.log('Military Logistics AI Analysis Request:', { analysisType, dataLength: data?.length });

    let analysisResult;

    switch (analysisType) {
      case 'combat_zone_optimization':
        analysisResult = await analyzeCombatZoneLogistics(data);
        break;
      case 'airdrop_planning':
        analysisResult = await optimizeAirdropOperations(data);
        break;
      case 'field_hospital_deployment':
        analysisResult = await planFieldHospitalDeployment(data);
        break;
      case 'evacuation_routing':
        analysisResult = await optimizeEvacuationRoutes(data);
        break;
      case 'theater_resource_allocation':
        analysisResult = await analyzeTheaterResources(data);
        break;
      case 'risk_assessment':
        analysisResult = await performRiskAssessment(data);
        break;
      default:
        throw new Error(`Unknown analysis type: ${analysisType}`);
    }

    // Store analysis result in database
    const { error: insertError } = await supabase
      .from('strategic_plans')
      .insert({
        plan_code: `AI_${analysisType.toUpperCase()}_${Date.now()}`,
        plan_name: `AI Generated ${analysisType.replace('_', ' ')} Analysis`,
        plan_type: 'ai_analysis',
        objectives: [analysisResult.recommendations],
        resource_requirements: analysisResult.resources || {},
        success_metrics: analysisResult.metrics || {},
        approval_status: 'draft'
      });

    if (insertError) {
      console.error('Error storing analysis result:', insertError);
    }

    return new Response(JSON.stringify({
      success: true,
      analysis: analysisResult,
      timestamp: new Date().toISOString()
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in military-logistics-ai function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      success: false 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

async function analyzeCombatZoneLogistics(data: any) {
  const analysisPrompt = `Analyze combat zone logistics requirements for TNI AU medical operations:
  
  Data: ${JSON.stringify(data)}
  
  Provide tactical logistics analysis including:
  1. Supply route security assessment
  2. Resupply frequency optimization
  3. Critical item prioritization
  4. Medical evacuation coordination
  5. Personnel safety protocols
  
  Format as JSON with actionable recommendations.`;

  return await callOpenAI(analysisPrompt);
}

async function optimizeAirdropOperations(data: any) {
  const analysisPrompt = `Optimize airdrop operations for TNI AU medical supply delivery:
  
  Data: ${JSON.stringify(data)}
  
  Analyze and provide:
  1. Optimal drop zones based on weather and terrain
  2. Cargo weight and volume optimization
  3. Aircraft selection recommendations
  4. Timing for maximum success rates
  5. Ground recovery procedures
  
  Format as JSON with specific operational parameters.`;

  return await callOpenAI(analysisPrompt);
}

async function planFieldHospitalDeployment(data: any) {
  const analysisPrompt = `Plan field hospital deployment for TNI AU operations:
  
  Data: ${JSON.stringify(data)}
  
  Provide deployment strategy including:
  1. Site selection criteria and recommendations
  2. Equipment and supply requirements
  3. Personnel deployment schedule
  4. Logistics support infrastructure
  5. Contingency and evacuation plans
  
  Format as JSON with detailed deployment timeline.`;

  return await callOpenAI(analysisPrompt);
}

async function optimizeEvacuationRoutes(data: any) {
  const analysisPrompt = `Optimize medical evacuation routes for TNI AU operations:
  
  Data: ${JSON.stringify(data)}
  
  Analyze and recommend:
  1. Primary and secondary evacuation routes
  2. Transportation mode selection (air/ground)
  3. Medical facility capacity planning
  4. Time-critical patient prioritization
  5. Resource allocation for evacuation assets
  
  Format as JSON with route optimization details.`;

  return await callOpenAI(analysisPrompt);
}

async function analyzeTheaterResources(data: any) {
  const analysisPrompt = `Analyze theater-wide resource allocation for TNI AU medical operations:
  
  Data: ${JSON.stringify(data)}
  
  Provide strategic analysis of:
  1. Resource distribution across operational areas
  2. Inter-theater transfer optimization
  3. Strategic reserve management
  4. Budget allocation recommendations
  5. Long-term sustainability planning
  
  Format as JSON with strategic recommendations.`;

  return await callOpenAI(analysisPrompt);
}

async function performRiskAssessment(data: any) {
  const analysisPrompt = `Perform comprehensive risk assessment for TNI AU medical logistics:
  
  Data: ${JSON.stringify(data)}
  
  Assess risks in:
  1. Supply chain vulnerabilities
  2. Operational security threats
  3. Environmental and weather impacts
  4. Personnel and equipment safety
  5. Mission-critical failure points
  
  Format as JSON with risk mitigation strategies.`;

  return await callOpenAI(analysisPrompt);
}

async function callOpenAI(prompt: string) {
  if (!openAIApiKey) {
    throw new Error('OpenAI API key not configured');
  }

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${openAIApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4.1-2025-04-14',
      messages: [
        { 
          role: 'system', 
          content: 'You are a military logistics AI specialist for TNI AU (Indonesian Air Force) medical operations. Provide precise, actionable analysis for military medical logistics scenarios. Always respond in valid JSON format.' 
        },
        { role: 'user', content: prompt }
      ],
      max_completion_tokens: 2000,
    }),
  });

  if (!response.ok) {
    throw new Error(`OpenAI API error: ${response.statusText}`);
  }

  const aiResponse = await response.json();
  const content = aiResponse.choices[0].message.content;
  
  try {
    return JSON.parse(content);
  } catch (parseError) {
    console.error('Failed to parse OpenAI response as JSON:', content);
    return {
      recommendations: content,
      metrics: {},
      resources: {}
    };
  }
}