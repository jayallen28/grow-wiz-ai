import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export interface DatabasePlant {
  id: string;
  user_id: string;
  grow_cycle_id: string;
  name: string;
  strain_id?: string;
  plant_number: number;
  photos?: string[];
  notes?: string;
  status: 'active' | 'harvested' | 'failed';
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

export function usePlants(growCycleId?: string) {
  const { user } = useAuth();
  const [plants, setPlants] = useState<DatabasePlant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPlants = async () => {
    if (!user || !growCycleId) {
      setPlants([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('plants')
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
        .eq('grow_cycle_id', growCycleId)
        .order('plant_number', { ascending: true });

      if (error) throw error;
      setPlants((data || []) as any);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const addPlant = async (plant: Omit<DatabasePlant, 'id' | 'user_id' | 'created_at' | 'updated_at' | 'strains'>) => {
    if (!user) throw new Error('User not authenticated');

    try {
      const { data, error } = await supabase
        .from('plants')
        .insert([{ ...plant, user_id: user.id }])
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
      
      setPlants(prev => [...prev, data as any].sort((a, b) => a.plant_number - b.plant_number));
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add plant');
      throw err;
    }
  };

  const updatePlant = async (id: string, updates: Partial<DatabasePlant>) => {
    if (!user) throw new Error('User not authenticated');

    try {
      const { data, error } = await supabase
        .from('plants')
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
      
      setPlants(prev => prev.map(plant => plant.id === id ? data as any : plant));
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update plant');
      throw err;
    }
  };

  const deletePlant = async (id: string) => {
    if (!user) throw new Error('User not authenticated');

    try {
      const { error } = await supabase
        .from('plants')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      setPlants(prev => prev.filter(plant => plant.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete plant');
      throw err;
    }
  };

  const createPlantsForGrowCycle = async (growCycleId: string, plantCount: number) => {
    if (!user) throw new Error('User not authenticated');

    const plants = Array.from({ length: plantCount }, (_, i) => ({
      grow_cycle_id: growCycleId,
      name: `Plant ${i + 1}`,
      plant_number: i + 1,
      status: 'active' as const,
      user_id: user.id
    }));

    try {
      const { data, error } = await supabase
        .from('plants')
        .insert(plants)
        .select();

      if (error) throw error;
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create plants');
      throw err;
    }
  };

  useEffect(() => {
    fetchPlants();
  }, [user, growCycleId]);

  return {
    plants,
    loading,
    error,
    addPlant,
    updatePlant,
    deletePlant,
    createPlantsForGrowCycle,
    refetch: fetchPlants,
  };
}