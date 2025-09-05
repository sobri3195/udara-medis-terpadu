import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { RefreshCw, TrendingUp, AlertTriangle, Database, Activity } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

interface PredictionData {
  region: string;
  medication_type: string;
  predicted_demand: number;
  confidence_score: number;
  seasonal_factor: number;
  historical_usage: number[];
}

interface SatuSehatData {
  facility_id: string;
  patient_count: number;
  disease_trends: Array<{
    disease_code: string;
    case_count: number;
    trend: 'increasing' | 'stable' | 'decreasing';
  }>;
}

const BPJSIntegration = () => {
  const [loading, setLoading] = useState(false);
  const [predictions, setPredictions] = useState<PredictionData[]>([]);
  const [satuSehatData, setSatuSehatData] = useState<SatuSehatData | null>(null);
  const [lastSync, setLastSync] = useState<string>('');
  const { toast } = useToast();

  const syncBPJSData = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('bpjs-satusehat-integration', {
        body: { action: 'sync_bpjs_data' }
      });

      if (error) throw error;

      setPredictions(data.predictions);
      setLastSync(new Date().toLocaleString('id-ID'));
      toast({
        title: "Berhasil",
        description: "Data BPJS berhasil disinkronisasi"
      });
    } catch (error) {
      console.error('BPJS sync error:', error);
      toast({
        title: "Error",
        description: "Gagal menyinkronkan data BPJS",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const syncSatuSehatData = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('bpjs-satusehat-integration', {
        body: { action: 'sync_satusehat_data' }
      });

      if (error) throw error;

      setSatuSehatData(data.data);
      setLastSync(new Date().toLocaleString('id-ID'));
      toast({
        title: "Berhasil",
        description: "Data SatuSehat berhasil disinkronisasi"
      });
    } catch (error) {
      console.error('SatuSehat sync error:', error);
      toast({
        title: "Error",
        description: "Gagal menyinkronkan data SatuSehat",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const loadPredictions = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('bpjs-satusehat-integration', {
        body: { action: 'get_demand_predictions' }
      });

      if (error) throw error;
      setPredictions(data.predictions);
    } catch (error) {
      console.error('Load predictions error:', error);
    }
  };

  useEffect(() => {
    loadPredictions();
  }, []);

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'increasing':
        return <TrendingUp className="h-4 w-4 text-red-500" />;
      case 'decreasing':
        return <TrendingUp className="h-4 w-4 text-green-500 rotate-180" />;
      default:
        return <Activity className="h-4 w-4 text-blue-500" />;
    }
  };

  const getTrendBadge = (trend: string) => {
    const variants = {
      increasing: 'destructive' as const,
      stable: 'secondary' as const,
      decreasing: 'default' as const
    };
    return <Badge variant={variants[trend as keyof typeof variants]}>{trend}</Badge>;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Integrasi BPJS & SatuSehat
          </CardTitle>
          {lastSync && (
            <p className="text-sm text-muted-foreground">
              Terakhir disinkronkan: {lastSync}
            </p>
          )}
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <Button onClick={syncBPJSData} disabled={loading}>
              <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Sinkronisasi BPJS
            </Button>
            <Button onClick={syncSatuSehatData} disabled={loading} variant="outline">
              <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Sinkronisasi SatuSehat
            </Button>
          </div>

          <Tabs defaultValue="predictions" className="w-full">
            <TabsList>
              <TabsTrigger value="predictions">Prediksi Kebutuhan</TabsTrigger>
              <TabsTrigger value="trends">Tren Penyakit</TabsTrigger>
            </TabsList>

            <TabsContent value="predictions" className="space-y-4">
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  Data prediksi berdasarkan analisis pola penggunaan obat dari sistem BPJS
                </AlertDescription>
              </Alert>

              {predictions.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Region</TableHead>
                      <TableHead>Jenis Obat</TableHead>
                      <TableHead>Prediksi Kebutuhan</TableHead>
                      <TableHead>Tingkat Kepercayaan</TableHead>
                      <TableHead>Faktor Musiman</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {predictions.map((prediction, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{prediction.region}</TableCell>
                        <TableCell>{prediction.medication_type}</TableCell>
                        <TableCell>{prediction.predicted_demand}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Progress value={prediction.confidence_score * 100} className="w-16" />
                            <span className="text-sm">{Math.round(prediction.confidence_score * 100)}%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={prediction.seasonal_factor > 1 ? 'destructive' : 'default'}>
                            {prediction.seasonal_factor}x
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <p className="text-center text-muted-foreground py-8">
                  Belum ada data prediksi. Klik "Sinkronisasi BPJS" untuk memuat data.
                </p>
              )}
            </TabsContent>

            <TabsContent value="trends" className="space-y-4">
              <Alert>
                <Activity className="h-4 w-4" />
                <AlertDescription>
                  Data tren penyakit dari SatuSehat untuk prediksi kebutuhan obat
                </AlertDescription>
              </Alert>

              {satuSehatData ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-2xl font-bold">{satuSehatData.patient_count}</div>
                        <p className="text-sm text-muted-foreground">Total Pasien</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-2xl font-bold">{satuSehatData.disease_trends.length}</div>
                        <p className="text-sm text-muted-foreground">Jenis Penyakit Trending</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-2xl font-bold text-green-600">Aktif</div>
                        <p className="text-sm text-muted-foreground">Status Integrasi</p>
                      </CardContent>
                    </Card>
                  </div>

                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Kode Penyakit</TableHead>
                        <TableHead>Jumlah Kasus</TableHead>
                        <TableHead>Tren</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {satuSehatData.disease_trends.map((trend, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{trend.disease_code}</TableCell>
                          <TableCell>{trend.case_count}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {getTrendIcon(trend.trend)}
                              {trend.trend}
                            </div>
                          </TableCell>
                          <TableCell>{getTrendBadge(trend.trend)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-8">
                  Belum ada data tren penyakit. Klik "Sinkronisasi SatuSehat" untuk memuat data.
                </p>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default BPJSIntegration;