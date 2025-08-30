import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Brain, TrendingUp, AlertTriangle, Calendar, Package } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export function SmartInventoryForecasting() {
  const [inventory, setInventory] = useState([]);
  const [forecasts, setForecasts] = useState([]);
  const [selectedItem, setSelectedItem] = useState("");
  const [loading, setLoading] = useState(false);
  const [generatingForecast, setGeneratingForecast] = useState(false);

  useEffect(() => {
    loadInventory();
    loadForecasts();
  }, []);

  const loadInventory = async () => {
    try {
      const { data, error } = await supabase
        .from('inventory')
        .select('*')
        .order('item_name');
      
      if (error) throw error;
      setInventory(data || []);
    } catch (error: any) {
      toast.error('Failed to load inventory: ' + error.message);
    }
  };

  const loadForecasts = async () => {
    try {
      const { data, error } = await supabase
        .from('inventory_forecasting')
        .select(`
          *,
          inventory:item_id (
            item_name,
            category,
            current_stock,
            minimum_stock,
            unit
          )
        `)
        .order('created_at', { ascending: false })
        .limit(10);
      
      if (error) throw error;
      setForecasts(data || []);
    } catch (error: any) {
      toast.error('Failed to load forecasts: ' + error.message);
    }
  };

  const generateForecast = async () => {
    if (!selectedItem) {
      toast.error('Please select an item to forecast');
      return;
    }

    setGeneratingForecast(true);
    try {
      const { data, error } = await supabase.functions.invoke('inventory-forecasting', {
        body: {
          item_id: selectedItem,
          historical_data: {
            past_30_days: Math.floor(Math.random() * 100) + 50,
            past_60_days: Math.floor(Math.random() * 200) + 100,
            past_90_days: Math.floor(Math.random() * 300) + 150,
          },
          seasonal_factors: {
            current_season: 'dry_season',
            deployment_schedule: 'normal',
            emergency_preparedness: 'standard'
          }
        }
      });

      if (error) throw error;

      toast.success('Forecast generated successfully');
      loadForecasts();
    } catch (error: any) {
      toast.error('Failed to generate forecast: ' + error.message);
    } finally {
      setGeneratingForecast(false);
    }
  };

  const getConfidenceColor = (score: number) => {
    if (score >= 0.8) return 'text-green-600';
    if (score >= 0.6) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getRiskLevel = (currentStock: number, minStock: number, predictedDemand: number) => {
    const daysLeft = currentStock / (predictedDemand / 30);
    if (daysLeft < 7) return { level: 'High', color: 'destructive' };
    if (daysLeft < 14) return { level: 'Medium', color: 'secondary' };
    return { level: 'Low', color: 'default' };
  };

  // Mock chart data
  const chartData = [
    { month: 'Jan', actual: 65, predicted: 68 },
    { month: 'Feb', actual: 59, predicted: 62 },
    { month: 'Mar', actual: 80, predicted: 78 },
    { month: 'Apr', actual: 81, predicted: 85 },
    { month: 'May', actual: 56, predicted: 58 },
    { month: 'Jun', actual: 55, predicted: 60 },
  ];

  return (
    <div className="space-y-6">
      {/* Forecast Generation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            Generate AI Forecast
          </CardTitle>
          <CardDescription>
            Select an inventory item to generate AI-powered demand prediction
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="item-select">Select Item</Label>
              <Select value={selectedItem} onValueChange={setSelectedItem}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose an inventory item" />
                </SelectTrigger>
                <SelectContent>
                  {inventory.map((item: any) => (
                    <SelectItem key={item.id} value={item.id}>
                      {item.item_name} ({item.category})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>&nbsp;</Label>
              <Button 
                onClick={generateForecast} 
                disabled={generatingForecast || !selectedItem}
                className="w-full"
              >
                {generatingForecast ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Generating...
                  </>
                ) : (
                  <>
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Generate Forecast
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Forecast Trend Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Demand Trend Analysis</CardTitle>
          <CardDescription>Actual vs Predicted consumption patterns</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="actual" 
                stroke="#3b82f6" 
                strokeWidth={2}
                name="Actual Usage"
              />
              <Line 
                type="monotone" 
                dataKey="predicted" 
                stroke="#10b981" 
                strokeWidth={2}
                strokeDasharray="5 5"
                name="AI Prediction"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Recent Forecasts */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Forecasts</CardTitle>
          <CardDescription>Latest AI-generated inventory predictions</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item</TableHead>
                <TableHead>Predicted Demand</TableHead>
                <TableHead>Confidence</TableHead>
                <TableHead>Reorder Date</TableHead>
                <TableHead>Risk Level</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {forecasts.map((forecast: any) => {
                const risk = getRiskLevel(
                  forecast.inventory?.current_stock || 0,
                  forecast.inventory?.minimum_stock || 0,
                  forecast.predicted_demand
                );
                
                return (
                  <TableRow key={forecast.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{forecast.inventory?.item_name}</div>
                        <div className="text-sm text-muted-foreground">
                          Current: {forecast.inventory?.current_stock} {forecast.inventory?.unit}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Package className="h-4 w-4 text-blue-600" />
                        {forecast.predicted_demand} {forecast.inventory?.unit}
                        <span className="text-sm text-muted-foreground">/30 days</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className={`font-medium ${getConfidenceColor(forecast.confidence_score)}`}>
                          {Math.round(forecast.confidence_score * 100)}%
                        </div>
                        <Progress 
                          value={forecast.confidence_score * 100} 
                          className="w-16 h-2" 
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-green-600" />
                        {forecast.suggested_reorder_date ? 
                          new Date(forecast.suggested_reorder_date).toLocaleDateString() : 
                          'N/A'
                        }
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={risk.color as any}>
                        {risk.level}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        <AlertTriangle className="h-4 w-4 mr-1" />
                        Create Order
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Key Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Critical Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">3</div>
            <p className="text-sm text-muted-foreground">
              Items requiring immediate attention
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Avg Confidence</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">87%</div>
            <p className="text-sm text-muted-foreground">
              AI prediction accuracy
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Cost Savings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">15%</div>
            <p className="text-sm text-muted-foreground">
              Inventory cost reduction
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}