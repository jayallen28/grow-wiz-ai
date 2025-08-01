import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export interface DatabaseGrowCycle {
  id: string;
  user_id: string;
  name: string;
  strain_id?: string;
  start_date: string;
  end_date?: string;
  current_stage: 'seedling' | 'vegetative' | 'flowering' | 'harvest' | 'drying' | 'curing';
  stage_start_date: string;
  expected_stage_duration: number;
  current_day: number;
  plant_count: number;
  medium: 'dwc' | 'soil' | 'coco' | 'rockwool' | 'perlite' | 'other';
  total_yield?: number;
  status: 'active' | 'completed' | 'failed';
  notes?: string;
  created_at: string;
  updated_at: string;
  strains?: {
    id: string;
    name: string;
    type: 'indica' | 'sativa' | 'hybrid';
    flowering_time?: number;
    expected_yield?: string;
    thc_content?: string;
    cbd_content?: string;
    growth_pattern?: 'compact' | 'stretchy' | 'medium';
  };
}

export function useGrowCycles() {
  const { user } = useAuth();
  const [growCycles, setGrowCycles] = useState<DatabaseGrowCycle[]>([]);
  const [currentGrow, setCurrentGrow] = useState<DatabaseGrowCycle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchGrowCycles = async () => {
    if (!user) {
      setGrowCycles([]);
      setCurrentGrow(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('grow_cycles')
        .select(`
          *,
          strains (
            id,
            name,
            type,
            flowering_time,
            expected_yield,
            thc_content,
            cbd_content,
            growth_pattern
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      const cycles = (data || []) as DatabaseGrowCycle[];
      setGrowCycles(cycles);
      
      // Set the current active grow
      const activeCycle = cycles.find(cycle => cycle.status === 'active');
      setCurrentGrow(activeCycle || null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const addGrowCycle = async (cycle: Omit<DatabaseGrowCycle, 'id' | 'user_id' | 'created_at' | 'updated_at' | 'strains'>) => {
    if (!user) throw new Error('User not authenticated');

    try {
      const { data, error } = await supabase
        .from('grow_cycles')
        .insert([{ ...cycle, user_id: user.id }])
        .select(`
          *,
          strains (
            id,
            name,
            type,
            flowering_time,
            expected_yield,
            thc_content,
            cbd_content,
            growth_pattern
          )
        `)
        .single();

      if (error) throw error;
      
      setGrowCycles(prev => [data as DatabaseGrowCycle, ...prev]);
      
      // If this is the first active cycle, set it as current
      if (data.status === 'active' && !currentGrow) {
        setCurrentGrow(data as DatabaseGrowCycle);
      }
      
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add grow cycle');
      throw err;
    }
  };

  const updateGrowCycle = async (id: string, updates: Partial<DatabaseGrowCycle>) => {
    if (!user) throw new Error('User not authenticated');

    try {
      const { data, error } = await supabase
        .from('grow_cycles')
        .update(updates)
        .eq('id', id)
        .select(`
          *,
          strains (
            id,
            name,
            type,
            flowering_time,
            expected_yield,
            thc_content,
            cbd_content,
            growth_pattern
          )
        `)
        .single();

      if (error) throw error;
      
      setGrowCycles(prev => prev.map(cycle => cycle.id === id ? data as DatabaseGrowCycle : cycle));
      
      // Update current grow if it's the one being updated
      if (currentGrow?.id === id) {
        setCurrentGrow(data as DatabaseGrowCycle);
      }
      
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update grow cycle');
      throw err;
    }
  };

  useEffect(() => {
    fetchGrowCycles();
  }, [user]);

  return {
    growCycles,
    currentGrow,
    loading,
    error,
    addGrowCycle,
    updateGrowCycle,
    refetch: fetchGrowCycles,
  };
}