import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calculator } from 'lucide-react';
import { Link } from 'react-router-dom';
import ComponentSelector from '@/components/build-planner/ComponentSelector';
import BuildSummary from '@/components/build-planner/BuildSummary';
import { BuildComponent, BuildConfiguration, ComponentCategory, BuildComponentWithQuantity } from '@/types/buildPlanner';

const BuildPlanner = () => {
  const [selectedComponents, setSelectedComponents] = useState<{
    [category in ComponentCategory]?: BuildComponentWithQuantity[];
  }>({});

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/10">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link to="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <div className="flex items-center gap-3 mb-2">
            <Calculator className="w-8 h-8 text-primary" />
            <h1 className="text-4xl font-bold">Build Planner</h1>
          </div>
          <p className="text-muted-foreground text-lg">
            Design your perfect grow setup with our component selector and cost calculator
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Component Selection */}
          <div className="lg:col-span-2">
            <ComponentSelector 
              onAddComponent={addComponent}
              selectedComponents={selectedComponents}
            />
          </div>

          {/* Build Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
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
      </div>
    </div>
  );
};

export default BuildPlanner;