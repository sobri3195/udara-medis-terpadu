import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { TrendingUp, Brain, AlertTriangle, CheckCircle, Info, Activity } from "lucide-react";

export function PredictiveAnalytics() {
  const [analysisType, setAnalysisType] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any>(null);

  const runAnalysis = async () => {
    if (!analysisType) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('predictive-analytics', {
        body: {
          analysis_type: analysisType,
          data_range: '30 days',
          parameters: {}
        }
      });

      if (error) throw error;
      setResults(data);
      toast.success('Analysis completed successfully');
    } catch (error: any) {
      toast.error('Analysis failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk?.toLowerCase()) {
      case 'high': return 'bg-red-100 text-red-800 border-red-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'low': return 'bg-green-100 text-green-800 border-green-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            AI Predictive Analytics
          </CardTitle>
          <CardDescription>Generate AI-powered insights and predictions using GPT-5</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Select value={analysisType} onValueChange={setAnalysisType}>
              <SelectTrigger>
                <SelectValue placeholder="Select analysis type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="disease_outbreak">Disease Outbreak Prediction</SelectItem>
                <SelectItem value="resource_demand">Resource Demand Forecasting</SelectItem>
                <SelectItem value="personnel_workload">Personnel Workload Analysis</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={runAnalysis} disabled={loading || !analysisType}>
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Analyzing...
                </>
              ) : (
                <>
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Run Analysis
                </>
              )}
            </Button>
          </div>
          
          {results && results.analytics && (
            <div className="space-y-4 mt-6">
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Activity className="h-5 w-5 text-blue-600" />
                    Analysis Results
                  </CardTitle>
                  <CardDescription>
                    Generated at: {new Date(results.generated_at).toLocaleString()}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Risk Assessment */}
                  {results.analytics.risk_assessment && (
                    <div className="space-y-3">
                      <h4 className="font-semibold flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4" />
                        Risk Assessment
                      </h4>
                      <div className={`p-4 border rounded-lg ${getRiskColor(results.analytics.risk_assessment.level || results.analytics.risk_assessment)}`}>
                        <div className="font-semibold mb-2">
                          Risk Level: {results.analytics.risk_assessment.level || results.analytics.risk_assessment}
                        </div>
                        {results.analytics.risk_assessment.factors && (
                          <ul className="list-disc list-inside text-sm space-y-1">
                            {results.analytics.risk_assessment.factors.map((factor: string, idx: number) => (
                              <li key={idx}>{factor}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Predictions */}
                  {results.analytics.predictions && Array.isArray(results.analytics.predictions) && (
                    <div className="space-y-3">
                      <h4 className="font-semibold flex items-center gap-2">
                        <TrendingUp className="h-4 w-4" />
                        Predictions
                      </h4>
                      <div className="space-y-2">
                        {results.analytics.predictions.slice(0, 5).map((pred: any, idx: number) => (
                          <div key={idx} className="p-3 bg-muted rounded-lg">
                            <div className="flex justify-between items-center mb-2">
                              <span className="font-medium">{pred.date || `Day ${idx + 1}`}</span>
                              <Badge variant="outline">
                                Confidence: {pred.confidence || pred.probability || 'N/A'}%
                              </Badge>
                            </div>
                            {pred.probability && (
                              <Progress value={pred.probability} className="h-2" />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Recommended Actions */}
                  {results.analytics.recommended_actions && Array.isArray(results.analytics.recommended_actions) && (
                    <div className="space-y-3">
                      <h4 className="font-semibold flex items-center gap-2">
                        <CheckCircle className="h-4 w-4" />
                        Recommended Actions
                      </h4>
                      <ul className="space-y-2">
                        {results.analytics.recommended_actions.map((action: any, idx: number) => (
                          <li key={idx} className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg">
                            <CheckCircle className="h-4 w-4 text-blue-600 mt-1 flex-shrink-0" />
                            <span className="text-sm">
                              {typeof action === 'string' ? action : action.description || action.action}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Timeline Forecast */}
                  {results.analytics.timeline_forecast && (
                    <div className="space-y-3">
                      <h4 className="font-semibold flex items-center gap-2">
                        <Info className="h-4 w-4" />
                        Timeline Forecast
                      </h4>
                      <div className="grid grid-cols-3 gap-3">
                        {Object.entries(results.analytics.timeline_forecast).map(([key, value]) => (
                          <div key={key} className="p-3 border rounded-lg">
                            <div className="text-sm text-muted-foreground">{key}</div>
                            <div className="font-semibold mt-1">{String(value)}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Confidence Metrics */}
                  {results.analytics.confidence_metrics && (
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold mb-2">Overall Confidence</h4>
                      <div className="text-2xl font-bold text-blue-600">
                        {typeof results.analytics.confidence_metrics === 'object' 
                          ? results.analytics.confidence_metrics.overall || 'High'
                          : results.analytics.confidence_metrics}
                      </div>
                    </div>
                  )}

                  {/* Raw Data Toggle */}
                  <details className="mt-4">
                    <summary className="cursor-pointer font-semibold text-sm text-muted-foreground hover:text-foreground">
                      View Raw Analysis Data
                    </summary>
                    <div className="mt-2 p-4 bg-muted rounded-lg">
                      <pre className="text-xs overflow-auto max-h-60">
                        {JSON.stringify(results.analytics, null, 2)}
                      </pre>
                    </div>
                  </details>
                </CardContent>
              </Card>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}