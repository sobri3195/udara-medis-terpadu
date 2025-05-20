
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CircleDashed, AlertTriangle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { 
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';
import { cn } from '@/lib/utils';

const inventoryData = [
  { name: 'Jan', obat: 65, alkes: 78, bahan: 45 },
  { name: 'Feb', obat: 59, alkes: 75, bahan: 50 },
  { name: 'Mar', obat: 70, alkes: 77, bahan: 46 },
  { name: 'Apr', obat: 74, alkes: 70, bahan: 60 },
  { name: 'Mei', obat: 80, alkes: 69, bahan: 55 },
  { name: 'Jun', obat: 85, alkes: 68, bahan: 70 },
  { name: 'Jul', obat: 81, alkes: 70, bahan: 75 },
];

const lowStockItems = [
  { id: 1, name: 'Cairan Infus RL', category: 'Obat', stock: '15 Box', status: 'critical' },
  { id: 2, name: 'O2 Portable', category: 'Alkes', stock: '7 Unit', status: 'warning' },
  { id: 3, name: 'Sarung Tangan Steril', category: 'Bahan', stock: '23 Box', status: 'warning' },
  { id: 4, name: 'Antibiotik Amoxicillin', category: 'Obat', stock: '12 Strip', status: 'critical' },
];

const InventorySummary = () => {
  return (
    <div className="grid grid-cols-1 gap-4">
      <Card className="overflow-hidden">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg">Trend Stok Logistik</CardTitle>
            <Badge className="font-normal" variant="outline">6 Bulan Terakhir</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[180px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={inventoryData}>
                <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis 
                  tickFormatter={(value) => `${value}%`}
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="obat"
                  stroke="#003D79"
                  activeDot={{ r: 6 }}
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="alkes"
                  stroke="#0074D9"
                  activeDot={{ r: 6 }}
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="bahan"
                  stroke="#7FDBFF"
                  activeDot={{ r: 6 }}
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      <Card className="overflow-hidden">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg flex items-center">
              <AlertTriangle className="h-4 w-4 mr-2 text-tniau-orange" />
              Item Stok Menipis
            </CardTitle>
            <Badge className="font-normal bg-tniau-orange">4 Items</Badge>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-auto max-h-[200px]">
            <table className="w-full">
              <thead className="sticky top-0 bg-background">
                <tr className="border-b">
                  <th className="px-4 py-2 text-left text-sm font-medium text-muted-foreground">Item</th>
                  <th className="px-4 py-2 text-center text-sm font-medium text-muted-foreground">Kategori</th>
                  <th className="px-4 py-2 text-center text-sm font-medium text-muted-foreground">Stok</th>
                  <th className="px-4 py-2 text-center text-sm font-medium text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {lowStockItems.map((item) => (
                  <tr key={item.id} className="border-b hover:bg-muted/50">
                    <td className="px-4 py-2 text-sm">{item.name}</td>
                    <td className="px-4 py-2 text-sm text-center">{item.category}</td>
                    <td className="px-4 py-2 text-sm text-center">{item.stock}</td>
                    <td className="px-4 py-2 text-sm text-center">
                      <div className="flex items-center justify-center">
                        <div className={cn(
                          "status-indicator mr-2",
                          item.status === 'critical' ? 'critical' : 'warning'
                        )}></div>
                        <span>
                          {item.status === 'critical' ? 'Kritis' : 'Perlu Perhatian'}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InventorySummary;
