
import React from 'react';
import { Bell, Settings, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Header = () => {
  
  return (
    <header className="bg-tniau-blue text-white py-2 px-4 md:px-6 flex justify-between items-center shadow-md">
      <div className="flex items-center">
        <img src="/placeholder.svg" alt="Logo TNI AU" className="h-10 w-10 mr-3" />
        <div>
          <h1 className="text-xl font-bold">MedTrack AU</h1>
          <p className="text-xs text-gray-300">Dashboard Komando Terintegrasi RS TNI AU</p>
        </div>
      </div>
      
      <div className="flex items-center space-x-3">
        <Button variant="ghost" size="icon" className="text-white hover:bg-tniau-lightblue relative">
          <Bell className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
            3
          </span>
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="text-white hover:bg-tniau-lightblue">
              <Settings className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuGroup>
              <DropdownMenuItem>
                Pengaturan Profil
              </DropdownMenuItem>
              <DropdownMenuItem>
                Preferensi Notifikasi
              </DropdownMenuItem>
              <DropdownMenuItem>
                Konfigurasi Dashboard
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center space-x-2 text-white hover:bg-tniau-lightblue px-3">
              <User className="h-5 w-5" />
              <span className="hidden md:inline">Admin</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuGroup>
              <DropdownMenuItem>
                Profil Saya
              </DropdownMenuItem>
              <DropdownMenuItem>
                Ganti Password
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
