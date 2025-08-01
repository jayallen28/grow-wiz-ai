import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export interface DatabaseAlert {
  id: string;
  user_id: string;
  type: 'warning' | 'error' | 'info';
  title: string;
  message: string;
  timestamp: string;
  is_read: boolean;
  action?: string;
  created_at: string;
}

export function useAlerts() {
  const { user } = useAuth();
  const [alerts, setAlerts] = useState<DatabaseAlert[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAlerts = async () => {
    if (!user) {
      setAlerts([]);
      setUnreadCount(0);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('alerts')
        .select('*')
        .order('timestamp', { ascending: false })
        .limit(50);

      if (error) throw error;
      
      const alertsData = (data || []) as DatabaseAlert[];
      setAlerts(alertsData);
      setUnreadCount(alertsData.filter(alert => !alert.is_read).length);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (alertId: string) => {
    if (!user) throw new Error('User not authenticated');

    try {
      const { data, error } = await supabase
        .from('alerts')
        .update({ is_read: true })
        .eq('id', alertId)
        .select()
        .single();

      if (error) throw error;
      
      setAlerts(prev => prev.map(alert => 
        alert.id === alertId ? { ...alert, is_read: true } : alert
      ));
      setUnreadCount(prev => Math.max(0, prev - 1));
      
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to mark alert as read');
      throw err;
    }
  };

  const addAlert = async (alert: Omit<DatabaseAlert, 'id' | 'user_id' | 'created_at'>) => {
    if (!user) throw new Error('User not authenticated');

    try {
      const { data, error } = await supabase
        .from('alerts')
        .insert([{ ...alert, user_id: user.id }])
        .select()
        .single();

      if (error) throw error;
      
      setAlerts(prev => [data as DatabaseAlert, ...prev.slice(0, 49)]);
      if (!data.is_read) {
        setUnreadCount(prev => prev + 1);
      }
      
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add alert');
      throw err;
    }
  };

  const deleteAlert = async (alertId: string) => {
    if (!user) throw new Error('User not authenticated');

    try {
      const alertToDelete = alerts.find(alert => alert.id === alertId);
      
      const { error } = await supabase
        .from('alerts')
        .delete()
        .eq('id', alertId);

      if (error) throw error;
      
      setAlerts(prev => prev.filter(alert => alert.id !== alertId));
      
      if (alertToDelete && !alertToDelete.is_read) {
        setUnreadCount(prev => Math.max(0, prev - 1));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete alert');
      throw err;
    }
  };

  useEffect(() => {
    fetchAlerts();
  }, [user]);

  return {
    alerts,
    unreadCount,
    loading,
    error,
    markAsRead,
    addAlert,
    deleteAlert,
    refetch: fetchAlerts,
  };
}