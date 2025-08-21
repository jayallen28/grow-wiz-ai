import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calculator, Save, Share } from 'lucide-react';
import { Navigation } from '@/components/layout/Navigation';
import ComponentSelector from '@/components/build-planner/ComponentSelector';
import BuildSummary from '@/components/build-planner/BuildSummary';
import CategoryNavigation from '@/components/build-planner/CategoryNavigation';
import { BuildComponent, BuildConfiguration, ComponentCategory, BuildComponentWithQuantity } from '@/types/buildPlanner';
import { availableComponents } from '@/data/buildComponents';

const BuildPlanner = () => {
  const [selectedComponents, setSelectedComponents] = useState<{
    [category in ComponentCategory]?: BuildComponentWithQuantity[];
  }>({});
  const [selectedCategory, setSelectedCategory] = useState<ComponentCategory>('grow-tent');

  const addComponent = (component: BuildComponent) => {
    setSelectedComponents(prev => ({
      ...prev,
      [component.category]: [...(prev[component.category] || []), { ...component, quantity: 1 }]
    }));
  };

  const removeComponent = (componentId: string, category: ComponentCategory) => {
    setSelectedComponents(prev => ({
      ...prev,
      [category]: prev[category]?.filter(c => c.id !== componentId) || []
    }));
  };

  const updateComponentQuantity = (componentId: string, category: ComponentCategory, quantity: number) => {
    if (quantity <= 0) {
      removeComponent(componentId, category);
      return;
    }
    
    setSelectedComponents(prev => ({
      ...prev,
      [category]: prev[category]?.map(c => 
        c.id === componentId ? { ...c, quantity } : c
      ) || []
    }));
  };

  const getAllComponents = () => {
    return Object.values(selectedComponents).flat();
  };

  const getTotalCost = () => {
    return getAllComponents().reduce((sum, component) => sum + (component.price * component.quantity), 0);
  };

  const getTotalPower = () => {
    return getAllComponents().reduce((sum, component) => sum + (component.powerConsumption * component.quantity), 0);
  };

  const getComponentCounts = () => {
    const counts: Partial<Record<ComponentCategory, number>> = {};
    
    availableComponents.forEach(component => {
      counts[component.category] = (counts[component.category] || 0) + 1;
    });
    
    return counts;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Calculator className="w-8 h-8 text-primary" />
                <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  Build Planner
                </h1>
              </div>
              <p className="text-muted-foreground text-lg">
                Design your perfect grow setup with our component selector and cost calculator
              </p>
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" disabled={getAllComponents().length === 0}>
                <Share className="w-4 h-4 mr-2" />
                Share Build
              </Button>
              <Button disabled={getAllComponents().length === 0}>
                <Save className="w-4 h-4 mr-2" />
                Save Build
              </Button>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Category Navigation */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <CategoryNavigation
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                componentCounts={getComponentCounts()}
              />
            </div>
          </div>

          {/* Component Selection */}
          <div className="lg:col-span-2">
            <ComponentSelector 
              onAddComponent={addComponent}
              selectedComponents={selectedComponents}
              selectedCategory={selectedCategory}
            />
          </div>

          {/* Build Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <BuildSummary
                selectedComponents={selectedComponents}
                totalCost={getTotalCost()}
                totalPower={getTotalPower()}
                onRemoveComponent={removeComponent}
                onUpdateQuantity={updateComponentQuantity}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BuildPlanner;