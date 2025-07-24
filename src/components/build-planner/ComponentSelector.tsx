import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Plus } from 'lucide-react';
import { BuildComponent, ComponentCategory, BuildComponentWithQuantity } from '@/types/buildPlanner';
import { availableComponents } from '@/data/buildComponents';
import ComponentCard from './ComponentCard';
import CustomComponentForm from './CustomComponentForm';

interface ComponentSelectorProps {
  onAddComponent: (component: BuildComponent) => void;
  selectedComponents: {
    [category in ComponentCategory]?: BuildComponentWithQuantity[];
  };
}

const ComponentSelector = ({ onAddComponent, selectedComponents }: ComponentSelectorProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ComponentCategory>('grow-tent');

  const categories: { key: ComponentCategory; label: string }[] = [
    { key: 'grow-tent', label: 'Grow Tents' },
    { key: 'led-light', label: 'LED Lights' },
    { key: 'ventilation', label: 'Ventilation' },
    { key: 'carbon-filter', label: 'Carbon Filters' },
    { key: 'nutrients', label: 'Nutrients' },
    { key: 'ph-meter', label: 'pH Meters' },
    { key: 'accessories', label: 'Accessories' },
  ];

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
        <CardTitle className="flex items-center gap-2">
          <Search className="w-5 h-5" />
          Component Selection
        </CardTitle>
        <div className="flex gap-4">
          <Input
            placeholder="Search components..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
          <CustomComponentForm onAddComponent={onAddComponent} />
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={selectedCategory} onValueChange={(value) => setSelectedCategory(value as ComponentCategory)}>
          <TabsList className="grid grid-cols-4 lg:grid-cols-7 mb-6">
            {categories.map(category => (
              <TabsTrigger key={category.key} value={category.key} className="text-xs">
                {category.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map(category => (
            <TabsContent key={category.key} value={category.key}>
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
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ComponentSelector;