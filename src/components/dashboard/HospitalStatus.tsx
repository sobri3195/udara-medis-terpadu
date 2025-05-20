
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

type HospitalStatusProps = {
  hospitals: Array<{
    id: string;
    name: string;
    bedStatus: {
      total: number;
      occupied: number;
      available: number;
    };
    emergencyStatus: 'normal' | 'busy' | 'critical';
    operatingRooms: {
      total: number;
      inUse: number;
    };
    ambulance: {
      total: number;
      available: number;
    };
  }>;
};

const getStatusClass = (status: 'normal' | 'busy' | 'critical') => {
  switch (status) {
    case 'normal':
      return 'bg-tniau-green text-white';
    case 'busy':
      return 'bg-tniau-yellow text-black';
    case 'critical':
      return 'bg-tniau-red text-white';
    default:
      return 'bg-gray-500 text-white';
  }
};

const getOccupancyRate = (occupied: number, total: number) => {
  return Math.round((occupied / total) * 100);
};

const HospitalStatus = ({ hospitals }: HospitalStatusProps) => {
  return (
    <Card className="h-full overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">Status Rumah Sakit TNI AU</CardTitle>
          <Badge variant="outline" className="font-normal">Pembaruan Terakhir: 14:30</Badge>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-auto max-h-[400px]">
          <table className="w-full">
            <thead className="sticky top-0 bg-background">
              <tr className="border-b">
                <th className="px-4 py-2 text-left text-sm font-medium text-muted-foreground">RS</th>
                <th className="px-4 py-2 text-center text-sm font-medium text-muted-foreground">
                  <div className="flex flex-col">
                    <span>Tempat Tidur</span>
                    <span className="font-normal text-xs">(Tersedia / Total)</span>
                  </div>
                </th>
                <th className="px-4 py-2 text-center text-sm font-medium text-muted-foreground">Status IGD</th>
                <th className="px-4 py-2 text-center text-sm font-medium text-muted-foreground">
                  <div className="flex flex-col">
                    <span>Ruang Operasi</span>
                    <span className="font-normal text-xs">(Dipakai / Total)</span>
                  </div>
                </th>
                <th className="px-4 py-2 text-center text-sm font-medium text-muted-foreground">
                  <div className="flex flex-col">
                    <span>Ambulans</span>
                    <span className="font-normal text-xs">(Siap / Total)</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {hospitals.map((hospital) => (
                <tr key={hospital.id} className="border-b hover:bg-muted/50">
                  <td className="px-4 py-3 text-sm font-medium">{hospital.name}</td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex flex-col items-center">
                      <div className="text-sm">
                        <span className="font-medium">{hospital.bedStatus.available}</span>
                        <span className="text-muted-foreground"> / {hospital.bedStatus.total}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                        <div 
                          className={cn(
                            "h-1.5 rounded-full",
                            getOccupancyRate(hospital.bedStatus.occupied, hospital.bedStatus.total) > 80
                              ? "bg-tniau-red"
                              : getOccupancyRate(hospital.bedStatus.occupied, hospital.bedStatus.total) > 60
                                ? "bg-tniau-yellow"
                                : "bg-tniau-green"
                          )}
                          style={{
                            width: `${getOccupancyRate(hospital.bedStatus.occupied, hospital.bedStatus.total)}%`
                          }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <Badge className={cn("font-normal", getStatusClass(hospital.emergencyStatus))}>
                      {hospital.emergencyStatus === 'normal' 
                        ? 'Normal' 
                        : hospital.emergencyStatus === 'busy' 
                          ? 'Sibuk' 
                          : 'Kritis'}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="font-medium">{hospital.operatingRooms.inUse}</span>
                    <span className="text-muted-foreground"> / {hospital.operatingRooms.total}</span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="font-medium">{hospital.ambulance.available}</span>
                    <span className="text-muted-foreground"> / {hospital.ambulance.total}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default HospitalStatus;
