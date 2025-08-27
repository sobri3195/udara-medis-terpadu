import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

interface CRUDOptions {
  table: string;
  select?: string;
  orderBy?: { column: string; ascending?: boolean };
}

export const useCRUD = (options: CRUDOptions) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const { table, select = '*', orderBy } = options;

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      let query = supabase.from(table as any).select(select);

      if (orderBy) {
        query = query.order(orderBy.column, { ascending: orderBy.ascending ?? true });
      }

      const { data: result, error } = await query;

      if (error) {
        throw error;
      }

      setData(result || []);
    } catch (err: any) {
      setError(err.message);
      toast.error(`Error loading ${table}: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const create = async (newItem: any) => {
    try {
      const itemWithUser = {
        ...newItem,
        created_by: user?.id,
      };

      const { data: result, error } = await supabase
        .from(table as any)
        .insert([itemWithUser])
        .select()
        .single();

      if (error) {
        throw error;
      }

      setData(prev => [...prev, result]);
      toast.success(`${table} berhasil ditambahkan`);
      return { data: result, error: null };
    } catch (err: any) {
      toast.error(`Error creating ${table}: ${err.message}`);
      return { data: null, error: err };
    }
  };

  const update = async (id: string, updates: any) => {
    try {
      const { data: result, error } = await supabase
        .from(table as any)
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        throw error;
      }

      setData(prev => prev.map(item => item.id === id ? result : item));
      toast.success(`${table} berhasil diperbarui`);
      return { data: result, error: null };
    } catch (err: any) {
      toast.error(`Error updating ${table}: ${err.message}`);
      return { data: null, error: err };
    }
  };

  const remove = async (id: string) => {
    try {
      const { error } = await supabase
        .from(table as any)
        .delete()
        .eq('id', id);

      if (error) {
        throw error;
      }

      setData(prev => prev.filter(item => item.id !== id));
      toast.success(`${table} berhasil dihapus`);
      return { error: null };
    } catch (err: any) {
      toast.error(`Error deleting ${table}: ${err.message}`);
      return { error: err };
    }
  };

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user, table]);

  return {
    data,
    loading,
    error,
    create,
    update,
    remove,
    refresh: fetchData,
  };
};