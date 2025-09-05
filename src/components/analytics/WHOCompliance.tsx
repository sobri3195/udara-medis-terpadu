import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Shield, Globe, TrendingUp, AlertCircle, CheckCircle, Calendar, Settings } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

interface WHOReport {
  report_id: string;
  report_type: string;
  reporting_period: {
    start_date: string;
    end_date: string;
  };
  compliance_score: number;
  findings: Array<{
    category: string;
    description: string;
    severity: string;
    recommendation: string;
  }>;
  status: string;
}

interface ComplianceMetrics {
  drug_safety_compliance: number;
  cold_chain_compliance: number;
  inventory_accuracy: number;
  adverse_event_reporting: number;
  overall_score: number;
}

const WHOCompliance = () => {
  const [loading, setLoading] = useState(false);
  const [metrics, setMetrics] = useState<ComplianceMetrics | null>(null);
  const [currentReport, setCurrentReport] = useState<WHOReport | null>(null);
  const [reportParams, setReportParams] = useState({
    report_type: 'quality_audit',
    start_date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    end_date: new Date().toISOString().split('T')[0]
  });
  const [autoReportSettings, setAutoReportSettings] = useState({
    frequency_days: 30,
    report_types: ['adverse_events', 'quality_audits'],
    auto_submit: false,
    notification_email: 'compliance@tni-au.mil.id'
  });
  const { toast } = useToast();

  const generateWHOReport = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('who-standards-compliance', {
        body: { 
          action: 'generate_who_report',
          ...reportParams
        }
      });

      if (error) throw error;

      setCurrentReport(data.report);
      toast({
        title: "Laporan WHO Dibuat",
        description: "Laporan compliance WHO berhasil dibuat"
      });
    } catch (error) {
      console.error('WHO report error:', error);
      toast({
        title: "Error",
        description: "Gagal membuat laporan WHO",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const loadComplianceMetrics = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('who-standards-compliance', {
        body: { action: 'get_compliance_metrics' }
      });

      if (error) throw error;
      setMetrics(data.metrics);
    } catch (error) {
      console.error('Load metrics error:', error);
    }
  };

  const scheduleAutoReporting = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('who-standards-compliance', {
        body: { 
          action: 'schedule_auto_reporting',
          ...autoReportSettings
        }
      });

      if (error) throw error;

      toast({
        title: "Pelaporan Otomatis Dijadwalkan",
        description: `Laporan WHO akan dibuat otomatis setiap ${autoReportSettings.frequency_days} hari`
      });
    } catch (error) {
      console.error('Schedule reporting error:', error);
      toast({
        title: "Error",
        description: "Gagal menjadwalkan pelaporan otomatis",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadComplianceMetrics();
  }, []);

  const getSeverityBadge = (severity: string) => {
    const variants = {
      low: 'default' as const,
      medium: 'secondary' as const,
      high: 'destructive' as const,
      critical: 'destructive' as const
    };
    return <Badge variant={variants[severity as keyof typeof variants] || 'default'}>{severity.toUpperCase()}</Badge>;
  };

  const getComplianceColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 75) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getComplianceIcon = (score: number) => {
    if (score >= 90) return <CheckCircle className="h-4 w-4 text-green-600" />;
    if (score >= 75) return <AlertCircle className="h-4 w-4 text-yellow-600" />;
    return <AlertCircle className="h-4 w-4 text-red-600" />;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            WHO Standards Compliance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="metrics" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="metrics">Metrik Compliance</TabsTrigger>
              <TabsTrigger value="reports">Laporan WHO</TabsTrigger>
              <TabsTrigger value="findings">Temuan Audit</TabsTrigger>
              <TabsTrigger value="settings">Pengaturan Auto</TabsTrigger>
            </TabsList>

            <TabsContent value="metrics" className="space-y-6">
              <Alert>
                <Shield className="h-4 w-4" />
                <AlertDescription>
                  Monitoring compliance terhadap standar WHO dalam real-time
                </AlertDescription>
              </Alert>

              {metrics && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-sm font-medium">Drug Safety</h3>
                        {getComplianceIcon(metrics.drug_safety_compliance)}
                      </div>
                      <div className="space-y-2">
                        <div className={`text-2xl font-bold ${getComplianceColor(metrics.drug_safety_compliance)}`}>
                          {Math.round(metrics.drug_safety_compliance)}%
                        </div>
                        <Progress value={metrics.drug_safety_compliance} />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-sm font-medium">Cold Chain</h3>
                        {getComplianceIcon(metrics.cold_chain_compliance)}
                      </div>
                      <div className="space-y-2">
                        <div className={`text-2xl font-bold ${getComplianceColor(metrics.cold_chain_compliance)}`}>
                          {Math.round(metrics.cold_chain_compliance)}%
                        </div>
                        <Progress value={metrics.cold_chain_compliance} />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-sm font-medium">Inventory Accuracy</h3>
                        {getComplianceIcon(metrics.inventory_accuracy)}
                      </div>
                      <div className="space-y-2">
                        <div className={`text-2xl font-bold ${getComplianceColor(metrics.inventory_accuracy)}`}>
                          {Math.round(metrics.inventory_accuracy)}%
                        </div>
                        <Progress value={metrics.inventory_accuracy} />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-sm font-medium">Adverse Event Reporting</h3>
                        {getComplianceIcon(metrics.adverse_event_reporting)}
                      </div>
                      <div className="space-y-2">
                        <div className={`text-2xl font-bold ${getComplianceColor(metrics.adverse_event_reporting)}`}>
                          {Math.round(metrics.adverse_event_reporting)}%
                        </div>
                        <Progress value={metrics.adverse_event_reporting} />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="md:col-span-2">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-sm font-medium">Overall Compliance Score</h3>
                        <TrendingUp className="h-4 w-4 text-blue-600" />
                      </div>
                      <div className="space-y-2">
                        <div className={`text-3xl font-bold ${getComplianceColor(metrics.overall_score)}`}>
                          {Math.round(metrics.overall_score)}%
                        </div>
                        <Progress value={metrics.overall_score} className="h-3" />
                        <p className="text-sm text-muted-foreground">
                          {metrics.overall_score >= 90 ? 'Excellent compliance' : 
                           metrics.overall_score >= 75 ? 'Good compliance, minor improvements needed' : 
                           'Compliance improvements required'}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              <Button onClick={loadComplianceMetrics} variant="outline">
                <TrendingUp className="h-4 w-4 mr-2" />
                Refresh Metrics
              </Button>
            </TabsContent>

            <TabsContent value="reports" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Generate WHO Report</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="report_type">Jenis Laporan</Label>
                      <Select 
                        value={reportParams.report_type} 
                        onValueChange={(value) => setReportParams(prev => ({ ...prev, report_type: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="drug_safety">Drug Safety</SelectItem>
                          <SelectItem value="adverse_events">Adverse Events</SelectItem>
                          <SelectItem value="quality_audit">Quality Audit</SelectItem>
                          <SelectItem value="cold_chain">Cold Chain</SelectItem>
                          <SelectItem value="inventory_management">Inventory Management</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="start_date">Tanggal Mulai</Label>
                      <Input
                        type="date"
                        value={reportParams.start_date}
                        onChange={(e) => setReportParams(prev => ({ ...prev, start_date: e.target.value }))}
                      />
                    </div>

                    <div>
                      <Label htmlFor="end_date">Tanggal Akhir</Label>
                      <Input
                        type="date"
                        value={reportParams.end_date}
                        onChange={(e) => setReportParams(prev => ({ ...prev, end_date: e.target.value }))}
                      />
                    </div>
                  </div>

                  <Button onClick={generateWHOReport} disabled={loading} className="w-full">
                    <FileText className="h-4 w-4 mr-2" />
                    Generate WHO Report
                  </Button>
                </CardContent>
              </Card>

              {currentReport && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      WHO Report: {currentReport.report_type}
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{currentReport.status}</Badge>
                      <span className="text-sm text-muted-foreground">
                        Period: {currentReport.reporting_period.start_date} - {currentReport.reporting_period.end_date}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="text-3xl font-bold text-blue-600">
                          {currentReport.compliance_score}%
                        </div>
                        <div>
                          <p className="font-medium">Overall Compliance Score</p>
                          <p className="text-sm text-muted-foreground">Report ID: {currentReport.report_id}</p>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2">Key Findings:</h4>
                        <div className="space-y-2">
                          {currentReport.findings.map((finding, index) => (
                            <div key={index} className="border rounded-lg p-3">
                              <div className="flex items-center justify-between mb-2">
                                <h5 className="font-medium">{finding.category}</h5>
                                {getSeverityBadge(finding.severity)}
                              </div>
                              <p className="text-sm text-muted-foreground mb-2">{finding.description}</p>
                              <p className="text-sm"><strong>Recommendation:</strong> {finding.recommendation}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="findings" className="space-y-4">
              <Alert>
                <FileText className="h-4 w-4" />
                <AlertDescription>
                  Temuan audit dan rekomendasi compliance WHO
                </AlertDescription>
              </Alert>

              {currentReport?.findings && (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Kategori</TableHead>
                      <TableHead>Deskripsi</TableHead>
                      <TableHead>Tingkat Keparahan</TableHead>
                      <TableHead>Rekomendasi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentReport.findings.map((finding, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{finding.category}</TableCell>
                        <TableCell>{finding.description}</TableCell>
                        <TableCell>{getSeverityBadge(finding.severity)}</TableCell>
                        <TableCell className="max-w-md">{finding.recommendation}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    Automatic WHO Reporting Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="frequency_days">Frekuensi Laporan (hari)</Label>
                      <Input
                        type="number"
                        value={autoReportSettings.frequency_days}
                        onChange={(e) => setAutoReportSettings(prev => ({ ...prev, frequency_days: Number(e.target.value) }))}
                      />
                    </div>

                    <div>
                      <Label htmlFor="notification_email">Email Notifikasi</Label>
                      <Input
                        type="email"
                        value={autoReportSettings.notification_email}
                        onChange={(e) => setAutoReportSettings(prev => ({ ...prev, notification_email: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="auto_submit"
                      checked={autoReportSettings.auto_submit}
                      onChange={(e) => setAutoReportSettings(prev => ({ ...prev, auto_submit: e.target.checked }))}
                    />
                    <Label htmlFor="auto_submit">Submit laporan secara otomatis ke WHO</Label>
                  </div>

                  <Button onClick={scheduleAutoReporting} disabled={loading} className="w-full">
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule Automatic Reporting
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default WHOCompliance;