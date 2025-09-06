
import React from 'react';
import { Home, Box, Users, Activity, Truck, Calendar, HelpCircle, BarChart4, Settings, Shield, Zap, Crosshair } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link, useLocation } from 'react-router-dom';

type SidebarItemProps = {
  icon: React.ReactNode;
  label: string;
  to: string;
  notificationCount?: number;
};

const SidebarItem = ({ icon, label, to, notificationCount }: SidebarItemProps) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <li className={cn(
      "flex items-center px-3 py-2 rounded-md cursor-pointer",
      isActive ? "bg-tniau-lightblue text-white" : "text-white/80 hover:text-white hover:bg-white/10"
    )}>
      <Link to={to} className="flex items-center w-full">
        <span className="mr-3">{icon}</span>
        <span>{label}</span>
        {notificationCount && (
          <span className="ml-auto bg-tniau-red text-white text-xs font-medium px-2 py-0.5 rounded-full">
            {notificationCount}
          </span>
        )}
      </Link>
    </li>
  );
};

const Sidebar = () => {
  return (
    <div className="h-full w-60 bg-tniau-navy flex flex-col flex-shrink-0">
      <div className="p-4 border-b border-white/10">
        <h2 className="text-white text-lg font-medium">Menu Utama</h2>
      </div>
      
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-2">
          <SidebarItem icon={<Home size={20} />} label="Dashboard" to="/dashboard" />
          <SidebarItem icon={<Box size={20} />} label="Logistik & Stok" to="/logistics" notificationCount={3} />
          <SidebarItem icon={<Zap size={20} />} label="Logistik Lanjutan" to="/advanced-logistics" />
          <SidebarItem icon={<Crosshair size={20} />} label="Operasi Militer" to="/military-operations" />
          <SidebarItem icon={<Activity size={20} />} label="Pelayanan Medis" to="/medical-services" />
          <SidebarItem icon={<Users size={20} />} label="SDM & Personel" to="/personnel" />
          <SidebarItem icon={<Truck size={20} />} label="Distribusi" to="/distribution" />
          <SidebarItem icon={<Calendar size={20} />} label="Jadwal & Tugas" to="/schedule" />
          <SidebarItem icon={<BarChart4 size={20} />} label="Laporan & Analitik" to="/reports" />
          <SidebarItem icon={<Settings size={20} />} label="Analytics & AI" to="/analytics" />
          <SidebarItem icon={<Shield size={20} />} label="Quality & Compliance" to="/quality-compliance" />
        </ul>
      </nav>
      
      <div className="p-4 border-t border-white/10">
        <div className="flex items-center text-white/80 hover:text-white cursor-pointer">
          <HelpCircle size={20} className="mr-3" />
          <span>Bantuan</span>
        </div>
        <div className="mt-4 text-xs text-white/60">
          <p>MedTrack AU v1.0.0</p>
          <p>© 2025 TNI AU</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
