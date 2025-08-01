import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export interface DatabaseGrowLog {
  id: string;
  user_id: string;
  grow_cycle_id: string;
  date: string;
  grow_stage: 'seedling' | 'vegetative' | 'flowering' | 'harvest' | 'drying' | 'curing';
  day_in_stage: number;
  height?: number;
  notes: string;
  actions?: string[];
  issues?: string[];
  photos?: string[];
  created_at: string;
  updated_at: string;
}

export function useGrowLogs(growCycleId?: string) {
  const { user } = useAuth();
  const [growLogs, setGrowLogs] = useState<DatabaseGrowLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchGrowLogs = async () => {
    if (!user) {
      setGrowLogs([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      let query = supabase
        .from('grow_logs')
        .select('*')
        .order('date', { ascending: false });

      if (growCycleId) {
        query = query.eq('grow_cycle_id', growCycleId);
      }

      const { data, error } = await query;

      if (error) throw error;
      setGrowLogs((data || []) as DatabaseGrowLog[]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const addGrowLog = async (log: Omit<DatabaseGrowLog, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
    if (!user) throw new Error('User not authenticated');

    try {
      const { data, error } = await supabase
        .from('grow_logs')
        .insert([{ ...log, user_id: user.id }])
        .select()
        .single();

      if (error) throw error;
      
      setGrowLogs(prev => [data as DatabaseGrowLog, ...prev]);
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add grow log');
      throw err;
    }
  };

  const updateGrowLog = async (id: string, updates: Partial<DatabaseGrowLog>) => {
    if (!user) throw new Error('User not authenticated');

    try {
      const { data, error } = await supabase
        .from('grow_logs')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      
      setGrowLogs(prev => prev.map(log => log.id === id ? data as DatabaseGrowLog : log));
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update grow log');
      throw err;
    }
  };

  useEffect(() => {
    fetchGrowLogs();
  }, [user, growCycleId]);

  return {
    growLogs,
    loading,
    error,
    addGrowLog,
    updateGrowLog,
    refetch: fetchGrowLogs,
  };
}