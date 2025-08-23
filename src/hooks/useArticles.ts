import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export interface Article {
  id: string;
  title: string;
  content: string;
  excerpt?: string;
  category: string;
  tags?: string[];
  featured_image_url?: string;
  author_id?: string;
  is_published: boolean;
  published_at?: string;
  reading_time?: number;
  view_count: number;
  created_at: string;
  updated_at: string;
}

export interface CreateArticleData {
  title: string;
  content: string;
  excerpt?: string;
  category: string;
  tags?: string[];
  featured_image_url?: string;
  is_published?: boolean;
  reading_time?: number;
}

export function useArticles() {
  const { user } = useAuth();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setArticles(data || []);
    } catch (error) {
      console.error('Error fetching articles:', error);
      setError(error instanceof Error ? error.message : 'Failed to fetch articles');
    } finally {
      setLoading(false);
    }
  };

  const fetchPublishedArticles = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('is_published', true)
        .order('published_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching published articles:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getArticleById = async (id: string) => {
    try {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching article:', error);
      throw error;
    }
  };

  const createArticle = async (articleData: CreateArticleData) => {
    if (!user) throw new Error('User must be authenticated');

    try {
      const { data, error } = await supabase
        .from('articles')
        .insert({
          ...articleData,
          author_id: user.id,
          published_at: articleData.is_published ? new Date().toISOString() : null,
        })
        .select()
        .single();

      if (error) throw error;
      
      await fetchArticles(); // Refresh the list
      return data;
    } catch (error) {
      console.error('Error creating article:', error);
      throw error;
    }
  };

  const updateArticle = async (id: string, articleData: Partial<CreateArticleData>) => {
    try {
      const { data, error } = await supabase
        .from('articles')
        .update({
          ...articleData,
          published_at: articleData.is_published ? new Date().toISOString() : null,
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      
      await fetchArticles(); // Refresh the list
      return data;
    } catch (error) {
      console.error('Error updating article:', error);
      throw error;
    }
  };

  const deleteArticle = async (id: string) => {
    try {
      const { error } = await supabase
        .from('articles')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      await fetchArticles(); // Refresh the list
    } catch (error) {
      console.error('Error deleting article:', error);
      throw error;
    }
  };

  const updateViewCount = async (id: string) => {
    try {
      // Get current article first
      const { data: currentArticle, error: fetchError } = await supabase
        .from('articles')
        .select('view_count')
        .eq('id', id)
        .single();

      if (fetchError) throw fetchError;

      // Update with incremented view count
      const { error } = await supabase
        .from('articles')
        .update({ view_count: (currentArticle.view_count || 0) + 1 })
        .eq('id', id);

      if (error) throw error;
    } catch (error) {
      console.error('Error updating view count:', error);
    }
  };

  return {
    articles,
    loading,
    error,
    createArticle,
    updateArticle,
    deleteArticle,
    getArticleById,
    fetchPublishedArticles,
    updateViewCount,
    refetch: fetchArticles,
  };
}