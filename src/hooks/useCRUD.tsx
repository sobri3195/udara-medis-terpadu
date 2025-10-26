import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface CRUDOptions {
  table: string;
  select?: string;
  orderBy?: { column: string; ascending?: boolean };
  autoFetch?: boolean;
}

type CRUDRecord = Record<string, unknown>;

export const useCRUD = (options: CRUDOptions) => {
  const [data, setData] = useState<CRUDRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { table, select = '*', orderBy, autoFetch = true } = options;

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      let query = supabase.from(table).select(select);

      if (orderBy) {
        query = query.order(orderBy.column, { ascending: orderBy.ascending ?? true });
      }

      const { data: result, error } = await query;

      if (error) {
        throw error;
      }

      setData(result || []);
      return { data: result || [], error: null };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      toast.error(`Error loading ${table}: ${errorMessage}`);
      return { data: [], error: err };
    } finally {
      setLoading(false);
    }
  }, [table, select, orderBy]);

  const create = async (newItem: CRUDRecord) => {
    try {
      const { data: result, error } = await supabase
        .from(table)
        .insert([newItem])
        .select()
        .single();

      if (error) {
        throw error;
      }

      setData(prev => [...prev, result]);
      toast.success(`${table} berhasil ditambahkan`);
      return { data: result, error: null };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      toast.error(`Error creating ${table}: ${errorMessage}`);
      return { data: null, error: err };
    }
  };

  const update = async (id: string, updates: Partial<CRUDRecord>) => {
    try {
      const { data: result, error } = await supabase
        .from(table)
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
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      toast.error(`Error updating ${table}: ${errorMessage}`);
      return { data: null, error: err };
    }
  };

  const remove = async (id: string) => {
    try {
      const { error } = await supabase
        .from(table)
        .delete()
        .eq('id', id);

      if (error) {
        throw error;
      }

      setData(prev => prev.filter(item => item.id !== id));
      toast.success(`${table} berhasil dihapus`);
      return { error: null };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      toast.error(`Error deleting ${table}: ${errorMessage}`);
      return { error: err };
    }
  };

  const bulkCreate = async (items: CRUDRecord[]) => {
    try {
      const { data: result, error } = await supabase
        .from(table)
        .insert(items)
        .select();

      if (error) {
        throw error;
      }

      setData(prev => [...prev, ...(result || [])]);
      toast.success(`${items.length} items berhasil ditambahkan`);
      return { data: result, error: null };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      toast.error(`Error creating bulk items: ${errorMessage}`);
      return { data: null, error: err };
    }
  };

  const bulkDelete = async (ids: string[]) => {
    try {
      const { error } = await supabase
        .from(table)
        .delete()
        .in('id', ids);

      if (error) {
        throw error;
      }

      setData(prev => prev.filter(item => !ids.includes(item.id as string)));
      toast.success(`${ids.length} items berhasil dihapus`);
      return { error: null };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      toast.error(`Error deleting bulk items: ${errorMessage}`);
      return { error: err };
    }
  };

  useEffect(() => {
    if (autoFetch) {
      fetchData();
    }
  }, [fetchData, autoFetch]);

  return {
    data,
    loading,
    error,
    create,
    update,
    remove,
    bulkCreate,
    bulkDelete,
    refresh: fetchData,
  };
};