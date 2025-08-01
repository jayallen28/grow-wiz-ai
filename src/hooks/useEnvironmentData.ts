import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export interface DatabaseEnvironmentData {
  id: string;
  user_id: string;
  grow_cycle_id?: string;
  grow_log_id?: string;
  timestamp: string;
  temperature: number;
  humidity: number;
  ph?: number;
  tds?: number;
  water_temp?: number;
  co2?: number;
  light_intensity?: number;
  is_manual_entry: boolean;
  created_at: string;
}

export function useEnvironmentData(growCycleId?: string) {
  const { user } = useAuth();
  const [environmentData, setEnvironmentData] = useState<DatabaseEnvironmentData[]>([]);
  const [latestReading, setLatestReading] = useState<DatabaseEnvironmentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEnvironmentData = async () => {
    if (!user) {
      setEnvironmentData([]);
      setLatestReading(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      let query = supabase
        .from('environment_data')
        .select('*')
        .order('timestamp', { ascending: false });

      if (growCycleId) {
        query = query.eq('grow_cycle_id', growCycleId);
      }

      const { data, error } = await query.limit(100);

      if (error) throw error;
      
      const readings = (data || []) as DatabaseEnvironmentData[];
      setEnvironmentData(readings);
      setLatestReading(readings[0] || null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const addEnvironmentReading = async (reading: Omit<DatabaseEnvironmentData, 'id' | 'user_id' | 'created_at'>) => {
    if (!user) throw new Error('User not authenticated');

    try {
      const { data, error } = await supabase
        .from('environment_data')
        .insert([{ ...reading, user_id: user.id }])
        .select()
        .single();

      if (error) throw error;
      
      setEnvironmentData(prev => [data as DatabaseEnvironmentData, ...prev.slice(0, 99)]);
      setLatestReading(data as DatabaseEnvironmentData);
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add environment reading');
      throw err;
    }
  };

  useEffect(() => {
    fetchEnvironmentData();
  }, [user, growCycleId]);

  return {
    environmentData,
    latestReading,
    loading,
    error,
    addEnvironmentReading,
    refetch: fetchEnvironmentData,
  };
}