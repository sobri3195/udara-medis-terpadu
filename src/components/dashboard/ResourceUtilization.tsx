
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const resourceData = [
  { name: 'Dokter Spesialis', value: 85, color: '#003D79' },
  { name: 'Dokter Umum', value: 70, color: '#0074D9' },
  { name: 'Perawat', value: 65, color: '#7FDBFF' },
  { name: 'Tenaga Penunjang', value: 75, color: '#B10DC9' },
];

const COLORS = ['#003D79', '#0074D9', '#7FDBFF', '#B10DC9'];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 shadow-md border rounded-md">
        <p className="font-medium">{`${payload[0].name}`}</p>
        <p className="text-sm">{`Penggunaan: ${payload[0].value}%`}</p>
      </div>
    );
  }

  return null;
};

const ResourceUtilization = () => {
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">Pemanfaatan SDM</CardTitle>
          <Badge variant="outline" className="font-normal">Bulan Mei 2025</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={resourceData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
                label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {resourceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend layout="vertical" verticalAlign="middle" align="right" />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-2 gap-2 mt-4">
          <div className="bg-gray-50 p-2 rounded-md">
            <div className="text-sm text-gray-500">Total Personel Aktif</div>
            <div className="text-xl font-semibold">432</div>
          </div>
          <div className="bg-gray-50 p-2 rounded-md">
            <div className="text-sm text-gray-500">Rata-rata Utilisasi</div>
            <div className="text-xl font-semibold">73.75%</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResourceUtilization;
