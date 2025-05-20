
import React from 'react';
import { Home, Box, Users, Activity, Truck, Calendar, HelpCircle, BarChart4 } from 'lucide-react';
import { cn } from '@/lib/utils';

type SidebarItemProps = {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  notificationCount?: number;
};

const SidebarItem = ({ icon, label, active = false, notificationCount }: SidebarItemProps) => {
  return (
    <li className={cn(
      "flex items-center px-3 py-2 rounded-md cursor-pointer",
      active ? "bg-tniau-lightblue text-white" : "text-white/80 hover:text-white hover:bg-white/10"
    )}>
      <span className="mr-3">{icon}</span>
      <span>{label}</span>
      {notificationCount && (
        <span className="ml-auto bg-tniau-red text-white text-xs font-medium px-2 py-0.5 rounded-full">
          {notificationCount}
        </span>
      )}
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
          <SidebarItem icon={<Home size={20} />} label="Dashboard" active />
          <SidebarItem icon={<Box size={20} />} label="Logistik & Stok" notificationCount={3} />
          <SidebarItem icon={<Activity size={20} />} label="Pelayanan Medis" />
          <SidebarItem icon={<Users size={20} />} label="SDM & Personel" />
          <SidebarItem icon={<Truck size={20} />} label="Distribusi" />
          <SidebarItem icon={<Calendar size={20} />} label="Jadwal & Tugas" />
          <SidebarItem icon={<BarChart4 size={20} />} label="Laporan & Analitik" />
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
