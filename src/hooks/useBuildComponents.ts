import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { BuildComponent, ComponentCategory } from '@/types/buildPlanner';
import { toast } from 'sonner';

export const useBuildComponents = () => {
  const [components, setComponents] = useState<BuildComponent[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchComponents = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('build_components')
        .select('*')
        .order('name');

      if (error) throw error;

      const mappedComponents: BuildComponent[] = data?.map(item => ({
        id: item.id,
        name: item.name,
        brand: item.brand,
        category: item.category as ComponentCategory,
        price: Number(item.price),
        powerConsumption: item.power_consumption || 0,
        description: item.description,
        imageUrl: item.image_url,
        affiliateUrl: item.affiliate_url,
        specifications: (typeof item.specifications === 'object' && item.specifications !== null) 
          ? item.specifications as Record<string, string | number>
          : {},
        compatibility: item.compatibility || [],
        dimensions: (typeof item.dimensions === 'object' && item.dimensions !== null)
          ? item.dimensions as { length: number; width: number; height: number }
          : { length: 0, width: 0, height: 0 },
        weight: Number(item.weight || 0),
        rating: Number(item.rating || 0),
        reviewCount: item.review_count || 0,
        isCustom: item.is_custom || false
      })) || [];

      setComponents(mappedComponents);
    } catch (error) {
      console.error('Error fetching components:', error);
      toast.error('Failed to load components');
    } finally {
      setLoading(false);
    }
  };

  const createComponent = async (componentData: Omit<BuildComponent, 'id'>) => {
    try {
      const { data, error } = await supabase
        .from('build_components')
        .insert([{
          name: componentData.name,
          brand: componentData.brand,
          category: componentData.category,
          price: componentData.price,
          power_consumption: componentData.powerConsumption,
          description: componentData.description,
          image_url: componentData.imageUrl,
          affiliate_url: componentData.affiliateUrl,
          specifications: componentData.specifications,
          compatibility: componentData.compatibility,
          dimensions: componentData.dimensions,
          weight: componentData.weight,
          rating: componentData.rating,
          review_count: componentData.reviewCount,
          is_custom: componentData.isCustom
        }])
        .select()
        .single();

      if (error) throw error;

      await fetchComponents();
      toast.success('Component created successfully');
      return data;
    } catch (error) {
      console.error('Error creating component:', error);
      toast.error('Failed to create component');
      throw error;
    }
  };

  const updateComponent = async (id: string, componentData: Partial<BuildComponent>) => {
    try {
      const { error } = await supabase
        .from('build_components')
        .update({
          name: componentData.name,
          brand: componentData.brand,
          category: componentData.category,
          price: componentData.price,
          power_consumption: componentData.powerConsumption,
          description: componentData.description,
          image_url: componentData.imageUrl,
          affiliate_url: componentData.affiliateUrl,
          specifications: componentData.specifications,
          compatibility: componentData.compatibility,
          dimensions: componentData.dimensions,
          weight: componentData.weight,
          rating: componentData.rating,
          review_count: componentData.reviewCount,
          is_custom: componentData.isCustom
        })
        .eq('id', id);

      if (error) throw error;

      await fetchComponents();
      toast.success('Component updated successfully');
    } catch (error) {
      console.error('Error updating component:', error);
      toast.error('Failed to update component');
      throw error;
    }
  };

  const deleteComponent = async (id: string) => {
    try {
      const { error } = await supabase
        .from('build_components')
        .delete()
        .eq('id', id);

      if (error) throw error;

      await fetchComponents();
      toast.success('Component deleted successfully');
    } catch (error) {
      console.error('Error deleting component:', error);
      toast.error('Failed to delete component');
      throw error;
    }
  };

  const getComponentsByCategory = (category: ComponentCategory) => {
    return components.filter(component => component.category === category);
  };

  const getCategories = () => {
    const categories = components.map(c => c.category);
    return Array.from(new Set(categories));
  };

  const getStats = () => {
    const total = components.length;
    const active = components.filter(c => !c.isCustom).length;
    const categories = getCategories().length;
    const avgRating = components.reduce((sum, c) => sum + c.rating, 0) / total;

    return {
      total,
      active,
      categories,
      avgRating: avgRating || 0
    };
  };

  useEffect(() => {
    fetchComponents();
  }, []);

  return {
    components,
    loading,
    createComponent,
    updateComponent,
    deleteComponent,
    getComponentsByCategory,
    getCategories,
    getStats,
    refetch: fetchComponents
  };
};