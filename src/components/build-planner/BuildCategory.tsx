// BuildCategory.tsx
import { BuildComponentWithQuantity, ComponentCategory } from '@/types/buildPlanner';
import BuildComponentCard from './BuildComponentCard';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface BuildCategoryProps {
  category: ComponentCategory;
  components: BuildComponentWithQuantity[];
  collapsed: boolean;
  toggleCategory: () => void;
  onRemoveComponent: (componentId: string, category: ComponentCategory) => void;
  onUpdateQuantity: (componentId: string, category: ComponentCategory, quantity: number) => void;
}

const BuildCategory = ({
  category,
  components,
  collapsed,
  toggleCategory,
  onRemoveComponent,
  onUpdateQuantity,
}: BuildCategoryProps) => {
  // Capitalize and clean category name
  const categoryLabel = category
    .split('-')
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(' ');

  return (
    <div className="space-y-2">
      {/* Header */}
      <div className="flex items-center justify-between cursor-pointer" onClick={toggleCategory}>
        <div className="flex items-center gap-3">
          <h5 className="text-xl font-bold text-muted-foreground">{categoryLabel}</h5>
          <Badge variant="secondary" className="text-sm px-2 py-1">
            {components.length} Items
          </Badge>
        </div>
        <Button size="sm" variant="outline" className="flex items-center gap-1">
          {collapsed ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
        </Button>
      </div>

      {/* Component List */}
      {!collapsed && (
        <div
          className="
            grid grid-cols-1 md:grid-cols-2 gap-6
            max-h-[40vh] overflow-y-auto pr-2
            [@media(max-width:1250px)]:grid-cols-1
          "
        >
          {components.map((component) => (
            <BuildComponentCard
              key={component.id}
              component={component}
              onRemove={() => onRemoveComponent(component.id, category)}
              onUpdateQuantity={(quantity) => onUpdateQuantity(component.id, category, quantity)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default BuildCategory;
