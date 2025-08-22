import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { supabase } from '@/integrations/supabase/client';

export type UserRole = 'admin' | 'moderator' | 'user';

export function useAdminAuth() {
  const { user, loading: authLoading } = useAuth();
  const [role, setRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUserRole() {
      if (!user) {
        setRole(null);
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .rpc('get_user_role', { _user_id: user.id });

        if (error) throw error;
        setRole(data);
      } catch (error) {
        console.error('Error fetching user role:', error);
        setRole(null);
      } finally {
        setLoading(false);
      }
    }

    if (!authLoading) {
      fetchUserRole();
    }
  }, [user, authLoading]);

  const isAdmin = role === 'admin';
  const isModerator = role === 'moderator' || isAdmin;

  return {
    user,
    role,
    isAdmin,
    isModerator,
    loading: authLoading || loading,
    isAuthenticated: !!user,
  };
}