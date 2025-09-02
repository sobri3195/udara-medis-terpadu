import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  userRole: string | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string, fullName?: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  isAdmin: boolean;
  canManage: (resource: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUserRole = async (userId: string) => {
    try {
      const { data } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId)
        .single();
      
      setUserRole(data?.role || null);
    } catch (error) {
      console.error('Error fetching user role:', error);
      setUserRole(null);
    }
  };

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          setTimeout(() => {
            fetchUserRole(session.user.id);
          }, 0);
        } else {
          setUserRole(null);
        }
        
        setIsLoading(false);
      }
    );

    // Check for existing session first
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session) {
        setSession(session);
        setUser(session?.user ?? null);
        if (session?.user) {
          fetchUserRole(session.user.id);
        }
        setIsLoading(false);
      } else {
        // Auto-login for development/testing - bypass login
        try {
          const { data: testUser, error } = await supabase.auth.signInWithPassword({
            email: 'admin@tni-au.mil.id',
            password: 'password123'
          });
          
          if (error) {
            // If test user doesn't exist, create one
            const { error: signUpError } = await supabase.auth.signUp({
              email: 'admin@tni-au.mil.id',
              password: 'password123',
              options: {
                emailRedirectTo: `${window.location.origin}/`,
                data: {
                  full_name: 'Administrator TNI AU'
                }
              }
            });
            
            if (!signUpError) {
              // Try to sign in again after signup
              await supabase.auth.signInWithPassword({
                email: 'admin@tni-au.mil.id',
                password: 'password123'
              });
            }
          }
        } catch (autoLoginError) {
          console.log('Auto-login failed:', autoLoginError);
        } finally {
          setIsLoading(false);
        }
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        toast.error(error.message);
      } else {
        toast.success('Berhasil masuk!');
      }
      
      return { error };
    } catch (error: any) {
      toast.error('Terjadi kesalahan saat masuk');
      return { error };
    }
  };

  const signUp = async (email: string, password: string, fullName?: string) => {
    try {
      const redirectUrl = `${window.location.origin}/`;
      
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            full_name: fullName,
          },
        },
      });
      
      if (error) {
        toast.error(error.message);
      } else {
        toast.success('Akun berhasil dibuat! Silakan cek email untuk verifikasi.');
      }
      
      return { error };
    } catch (error: any) {
      toast.error('Terjadi kesalahan saat mendaftar');
      return { error };
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      toast.success('Berhasil keluar!');
    } catch (error: any) {
      toast.error('Terjadi kesalahan saat keluar');
    }
  };

  const isAdmin = userRole ? ['superadmin', 'kapuskesau', 'wakapuskesau'].includes(userRole) : false;

  const canManage = (resource: string): boolean => {
    if (!userRole) return false;
    
    // Superadmin can manage everything
    if (userRole === 'superadmin') return true;
    
    // Role-based permissions
    switch (resource) {
      case 'hospitals':
      case 'personnel':
        return ['kapuskesau', 'wakapuskesau'].includes(userRole);
      case 'inventory':
      case 'distributions':
        return ['kapuskesau', 'wakapuskesau', 'karspau', 'kalakespra'].includes(userRole);
      case 'medical_services':
        return ['kapuskesau', 'wakapuskesau', 'karspau', 'kasubdis'].includes(userRole);
      case 'schedules':
        return ['kapuskesau', 'wakapuskesau'].includes(userRole);
      case 'users':
        return userRole === 'superadmin';
      default:
        return false;
    }
  };

  const value = {
    user,
    session,
    userRole,
    isLoading,
    signIn,
    signUp,
    signOut,
    isAdmin,
    canManage,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};