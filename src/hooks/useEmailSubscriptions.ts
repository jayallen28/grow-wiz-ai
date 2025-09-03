import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export function useEmailSubscriptions() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const subscribe = async (email: string) => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('email_subscriptions')
        .insert([
          {
            email,
            ip_address: null, // Could be populated with IP detection if needed
            user_agent: navigator.userAgent
          }
        ]);

      if (error) {
        if (error.code === '23505') {
          toast({
            title: "Already subscribed",
            description: "This email is already subscribed to our updates.",
            variant: "default"
          });
          return false;
        }
        throw error;
      }

      toast({
        title: "Successfully subscribed!",
        description: "Thank you for subscribing to early access updates.",
        variant: "default"
      });
      
      return true;
    } catch (error) {
      console.error('Error subscribing email:', error);
      toast({
        title: "Error",
        description: "Failed to subscribe. Please try again.",
        variant: "destructive"
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const getSubscriptions = async () => {
    const { data, error } = await supabase
      .from('email_subscriptions')
      .select('*')
      .order('subscribed_at', { ascending: false });

    if (error) {
      console.error('Error fetching subscriptions:', error);
      return [];
    }

    return data || [];
  };

  const updateSubscription = async (id: string, updates: { is_active?: boolean }) => {
    const { error } = await supabase
      .from('email_subscriptions')
      .update(updates)
      .eq('id', id);

    if (error) {
      console.error('Error updating subscription:', error);
      toast({
        title: "Error",
        description: "Failed to update subscription.",
        variant: "destructive"
      });
      return false;
    }

    toast({
      title: "Updated",
      description: "Subscription status updated successfully.",
      variant: "default"
    });
    
    return true;
  };

  return {
    subscribe,
    getSubscriptions,
    updateSubscription,
    loading
  };
}