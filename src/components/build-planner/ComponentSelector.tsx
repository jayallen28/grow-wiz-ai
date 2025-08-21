import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import ComponentCard from './ComponentCard';
import { BuildComponent, ComponentCategory, BuildComponentWithQuantity } from '@/types/buildPlanner';
import { availableComponents } from '@/data/buildComponents';

interface ComponentSelectorProps {
  onAddComponent: (component: BuildComponent) => void;
  selectedComponents: {
    [category in ComponentCategory]?: BuildComponentWithQuantity[];
  };
  selectedCategory: ComponentCategory;
}

const ComponentSelector = ({ onAddComponent, selectedComponents, selectedCategory }: ComponentSelectorProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const categoryLabels: Partial<Record<ComponentCategory, string>> = {
    'grow-tent': 'Grow Tents',
    'led-light': 'LED Lights',
    'ventilation': 'Ventilation',
    'carbon-filter': 'Carbon Filters',
    'ph-meter': 'pH Meters',
    'nutrients': 'Nutrients',
    'accessories': 'Accessories'
  };

  const filteredComponents = availableComponents
    .filter(component => component.category === selectedCategory)
    .filter(component => 
      component.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      component.brand.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const isComponentSelected = (component: BuildComponent) => {
    return selectedComponents[component.category]?.some(c => c.id === component.id) || false;
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{categoryLabels[selectedCategory] || selectedCategory}</CardTitle>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search components..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-4">
          {filteredComponents.map(component => (
            <ComponentCard
              key={component.id}
              component={component}
              isSelected={isComponentSelected(component)}
              onAdd={() => onAddComponent(component)}
            />
          ))}
        </div>
        {filteredComponents.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No components found matching your search.
          </div>
        )}
        
      </CardContent>
    </Card>
  );
};

export default ComponentSelector;