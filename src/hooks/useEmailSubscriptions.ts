import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface EmailSubscription {
  id: string;
  email: string;
  subscribed_at: string;
  ip_address?: string;
  user_agent?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export function useEmailSubscriptions() {
  const [subscriptions, setSubscriptions] = useState<EmailSubscription[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchSubscriptions = async () => {
    try {
      const { data, error } = await supabase
        .from('email_subscriptions')
        .select('*')
        .order('subscribed_at', { ascending: false });

      if (error) throw error;
      setSubscriptions(data || []);
    } catch (error) {
      console.error('Error fetching email subscriptions:', error);
      toast({
        title: "Error",
        description: "Failed to fetch email subscriptions",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const addSubscription = async (email: string) => {
    try {
      const { error } = await supabase
        .from('email_subscriptions')
        .insert({
          email,
          ip_address: null, // Could be enhanced to capture real IP
          user_agent: navigator.userAgent,
        });

      if (error) {
        if (error.code === '23505') { // Unique constraint violation
          throw new Error('This email is already subscribed');
        }
        throw error;
      }

      toast({
        title: "Success!",
        description: "Thank you for subscribing to early access!",
      });

      fetchSubscriptions();
      return true;
    } catch (error: any) {
      console.error('Error adding subscription:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to subscribe",
        variant: "destructive",
      });
      return false;
    }
  };

  const updateSubscription = async (id: string, updates: Partial<EmailSubscription>) => {
    try {
      const { error } = await supabase
        .from('email_subscriptions')
        .update(updates)
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Subscription updated successfully",
      });

      fetchSubscriptions();
    } catch (error) {
      console.error('Error updating subscription:', error);
      toast({
        title: "Error",
        description: "Failed to update subscription",
        variant: "destructive",
      });
    }
  };

  const deleteSubscription = async (id: string) => {
    try {
      const { error } = await supabase
        .from('email_subscriptions')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Subscription deleted successfully",
      });

      fetchSubscriptions();
    } catch (error) {
      console.error('Error deleting subscription:', error);
      toast({
        title: "Error",
        description: "Failed to delete subscription",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  return {
    subscriptions,
    loading,
    addSubscription,
    updateSubscription,
    deleteSubscription,
    refetch: fetchSubscriptions,
  };
}