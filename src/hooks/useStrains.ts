import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export interface DatabaseStrain {
  id: string;
  user_id: string;
  name: string;
  type: 'indica' | 'sativa' | 'hybrid';
  flowering_time?: number;
  expected_yield?: string;
  thc_content?: string;
  cbd_content?: string;
  growth_pattern?: 'compact' | 'stretchy' | 'medium';
  notes?: string;
  created_at: string;
  updated_at: string;
}

export function useStrains() {
  const { user } = useAuth();
  const [strains, setStrains] = useState<DatabaseStrain[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStrains = async () => {
    if (!user) {
      setStrains([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('strains')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setStrains((data || []) as DatabaseStrain[]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const addStrain = async (strain: Omit<DatabaseStrain, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
    if (!user) throw new Error('User not authenticated');

    try {
      const { data, error } = await supabase
        .from('strains')
        .insert([{ ...strain, user_id: user.id }])
        .select()
        .single();

      if (error) throw error;
      setStrains(prev => [data as DatabaseStrain, ...prev]);
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add strain');
      throw err;
    }
  };

  const updateStrain = async (id: string, updates: Partial<DatabaseStrain>) => {
    if (!user) throw new Error('User not authenticated');

    try {
      const { data, error } = await supabase
        .from('strains')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      setStrains(prev => prev.map(strain => strain.id === id ? data as DatabaseStrain : strain));
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update strain');
      throw err;
    }
  };

  const deleteStrain = async (id: string) => {
    if (!user) throw new Error('User not authenticated');

    try {
      const { error } = await supabase
        .from('strains')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setStrains(prev => prev.filter(strain => strain.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete strain');
      throw err;
    }
  };

  useEffect(() => {
    fetchStrains();
  }, [user]);

  return {
    strains,
    loading,
    error,
    addStrain,
    updateStrain,
    deleteStrain,
    refetch: fetchStrains,
  };
}