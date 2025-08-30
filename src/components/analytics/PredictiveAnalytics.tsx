import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { TrendingUp, Brain } from "lucide-react";

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

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            AI Predictive Analytics
          </CardTitle>
          <CardDescription>Generate insights and predictions</CardDescription>
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
          
          {results && (
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <h4 className="font-semibold">Analysis Results</h4>
                  <div className="text-sm text-muted-foreground">
                    Analysis completed for: {results.analysis_type}
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <pre className="text-sm overflow-auto max-h-40">
                      {JSON.stringify(results.analytics, null, 2)}
                    </pre>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
}