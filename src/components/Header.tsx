
import React from 'react';
import { Bell, Settings, User, LogOut, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

const Header = () => {
  const { user, userRole, signOut } = useAuth();
  
  const getRoleDisplayName = (role: string) => {
    const roleNames = {
      'superadmin': 'Super Admin',
      'kapuskesau': 'Kapuskesau',
      'wakapuskesau': 'Wakapuskesau',
      'karspau': 'KaRSPAU',
      'kalakespra': 'Kalakespra',
      'kasubdis': 'Kasubdis'
    };
    return roleNames[role as keyof typeof roleNames] || role;
  };

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
        {/* User Role Badge */}
        {userRole && (
          <Badge variant="secondary" className="flex items-center gap-1 bg-white/20 text-white hover:bg-white/30">
            <Shield className="h-3 w-3" />
            {getRoleDisplayName(userRole)}
          </Badge>
        )}
        
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
              <span className="hidden md:inline">{user?.email?.split('@')[0] || 'User'}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <div className="px-3 py-2 border-b">
              <p className="text-sm font-medium">{user?.email}</p>
              {userRole && (
                <p className="text-xs text-muted-foreground">{getRoleDisplayName(userRole)}</p>
              )}
            </div>
            <DropdownMenuGroup>
              <DropdownMenuItem>
                Profil Saya
              </DropdownMenuItem>
              <DropdownMenuItem>
                Ganti Password
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={signOut} className="text-red-500 focus:text-red-500">
              <LogOut className="h-4 w-4 mr-2" />
              Keluar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
