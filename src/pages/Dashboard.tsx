
import React from 'react';
import { Activity, Users, Package, TruckIcon } from 'lucide-react';

import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import StatCard from '@/components/dashboard/StatCard';
import HospitalStatus from '@/components/dashboard/HospitalStatus';
import InventorySummary from '@/components/dashboard/InventorySummary';
import AlertsNotifications from '@/components/dashboard/AlertsNotifications';
import ResourceUtilization from '@/components/dashboard/ResourceUtilization';

// Mock data for hospitals
const hospitalData = [
  {
    id: '1',
    name: 'RSPAU Hardjolukito',
    bedStatus: {
      total: 150,
      occupied: 118,
      available: 32
    },
    emergencyStatus: 'normal' as const,
    operatingRooms: {
      total: 5,
      inUse: 3
    },
    ambulance: {
      total: 7,
      available: 5
    }
  },
  {
    id: '2',
    name: 'RS Lanud Halim',
    bedStatus: {
      total: 120,
      occupied: 102,
      available: 18
    },
    emergencyStatus: 'busy' as const,
    operatingRooms: {
      total: 4,
      inUse: 2
    },
    ambulance: {
      total: 5,
      available: 3
    }
  },
  {
    id: '3',
    name: 'RS Lanud Adisutjipto',
    bedStatus: {
      total: 80,
      occupied: 72,
      available: 8
    },
    emergencyStatus: 'critical' as const,
    operatingRooms: {
      total: 3,
      inUse: 3
    },
    ambulance: {
      total: 4,
      available: 1
    }
  },
  {
    id: '4',
    name: 'RS Lanud Husein S.',
    bedStatus: {
      total: 75,
      occupied: 50,
      available: 25
    },
    emergencyStatus: 'normal' as const,
    operatingRooms: {
      total: 2,
      inUse: 1
    },
    ambulance: {
      total: 3,
      available: 2
    }
  },
  {
    id: '5',
    name: 'RS Lanud Hasanuddin',
    bedStatus: {
      total: 85,
      occupied: 60,
      available: 25
    },
    emergencyStatus: 'normal' as const,
    operatingRooms: {
      total: 2,
      inUse: 0
    },
    ambulance: {
      total: 3,
      available: 3
    }
  }
];

const Dashboard = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-auto bg-gray-50 p-4">
          <div className="max-w-7xl mx-auto">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold mb-1">Dashboard Komando Terintegrasi</h1>
                <p className="text-muted-foreground">Sistem medis TNI AU dengan role-based access control aktif</p>
              </div>
              <div className="text-sm bg-green-100 text-green-800 px-3 py-1 rounded-full">
                Keamanan: Aktif ✓
              </div>
            </div>

            {/* Statistics Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <StatCard
                title="Total Pasien Aktif"
                value="402"
                trend={{ value: 12, isPositive: true }}
                icon={<Users className="h-5 w-5 text-primary" />}
              />
              <StatCard
                title="Stok Obat dan Alkes"
                value="75%"
                trend={{ value: 5, isPositive: false }}
                icon={<Package className="h-5 w-5 text-primary" />}
              />
              <StatCard
                title="Kapasitas RS"
                value="82%"
                trend={{ value: 3, isPositive: false }}
                icon={<Activity className="h-5 w-5 text-primary" />}
              />
              <StatCard
                title="Distribusi Logistik"
                value="23"
                trend={{ value: 8, isPositive: true }}
                icon={<TruckIcon className="h-5 w-5 text-primary" />}
              />
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - 2/3 width */}
              <div className="lg:col-span-2 space-y-6">
                {/* Hospital Status */}
                <HospitalStatus hospitals={hospitalData} />
                
                {/* Resource Utilization */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <ResourceUtilization />
                  <InventorySummary />
                </div>
              </div>

              {/* Right Column - 1/3 width */}
              <div className="lg:col-span-1">
                <AlertsNotifications />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
