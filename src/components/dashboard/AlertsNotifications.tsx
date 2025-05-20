
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

type Alert = {
  id: number;
  title: string;
  time: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  hospital: string;
};

const alerts: Alert[] = [
  {
    id: 1,
    title: 'Kebutuhan Darah Segera',
    time: '15 menit yang lalu',
    description: 'Kebutuhan darah golongan O- untuk kasus operasi darurat',
    priority: 'high',
    hospital: 'RSPAU Hardjolukito'
  },
  {
    id: 2,
    title: 'Ruang ICU Hampir Penuh',
    time: '45 menit yang lalu',
    description: 'Kapasitas ruang ICU tersisa 2 dari 10 tempat tidur',
    priority: 'medium',
    hospital: 'RS Lanud Halim'
  },
  {
    id: 3,
    title: 'Pengiriman Alkes Tiba',
    time: '1 jam yang lalu',
    description: 'Pengiriman alat kesehatan dari Depot Pusat telah tiba',
    priority: 'low',
    hospital: 'RS Lanud Adisutjipto'
  },
  {
    id: 4,
    title: 'Jadwal Pemeliharaan Alat',
    time: '3 jam yang lalu',
    description: 'Pengingat: Jadwal pemeliharaan X-Ray portable hari ini',
    priority: 'medium',
    hospital: 'RS Lanud Halim'
  }
];

const getPriorityClass = (priority: string) => {
  switch (priority) {
    case 'high':
      return 'bg-tniau-red text-white';
    case 'medium':
      return 'bg-tniau-orange text-white';
    case 'low':
      return 'bg-tniau-blue text-white';
    default:
      return 'bg-gray-500 text-white';
  }
};

const AlertsNotifications = () => {
  return (
    <Card className="h-full overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg flex items-center">
            <AlertCircle className="h-4 w-4 mr-2 text-tniau-red" />
            Notifikasi & Peringatan
          </CardTitle>
          <Badge className="font-normal bg-tniau-red">4 Baru</Badge>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-auto max-h-[420px]">
          <ul className="divide-y">
            {alerts.map((alert) => (
              <li key={alert.id} className="p-4 hover:bg-muted/50">
                <div className="flex items-start">
                  <Badge className={cn("mr-3 mt-0.5", getPriorityClass(alert.priority))}>
                    {alert.priority === 'high' ? 'Tinggi' : alert.priority === 'medium' ? 'Sedang' : 'Rendah'}
                  </Badge>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h4 className="font-medium">{alert.title}</h4>
                      <span className="text-xs text-muted-foreground">{alert.time}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{alert.description}</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs font-medium">{alert.hospital}</span>
                      <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                        <ArrowRight className="h-3 w-3 mr-1" />
                        Lihat Detail
                      </Button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="p-3 border-t">
          <Button variant="outline" size="sm" className="w-full">
            Lihat Semua Notifikasi
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AlertsNotifications;
