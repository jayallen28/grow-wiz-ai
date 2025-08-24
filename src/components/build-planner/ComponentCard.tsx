import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Zap, Star, ExternalLink } from 'lucide-react';
import { BuildComponent } from '@/types/buildPlanner';

interface ComponentCardProps {
  component: BuildComponent;
  isSelected: boolean;
  onAdd: () => void;
}

const ComponentCard = ({ component, isSelected, onAdd }: ComponentCardProps) => {
  return (
    <Card className="hover:shadow-md transition-shadow h-full flex flex-col">
      {/* Image always on top */}
      {component.imageUrl && (
        <div className="w-full aspect-[4/3] overflow-hidden rounded-t-lg">
          <img
            src={component.imageUrl}
            alt={component.name}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <CardContent className="p-4 flex flex-col flex-1">
        {/* Title, brand, rating */}
        <div className="mb-3">
          <h4 className="font-semibold text-sm mb-1">{component.name}</h4>
          <p className="text-xs text-muted-foreground mb-2">{component.brand}</p>
          {component.rating > 0 && (
            <div className="flex items-center gap-1 mb-2">
              <Star className="w-3 h-3 text-yellow-500 fill-current" />
              <span className="text-xs">{component.rating}</span>
              <span className="text-xs text-muted-foreground">({component.reviewCount})</span>
            </div>
          )}
        </div>

        {/* Price + power */}
        <div className="mb-3">
          <div className="text-lg font-bold text-primary">${component.price}</div>
          {component.powerConsumption > 0 && (
            <Badge variant="outline" className="text-xs mt-1">
              <Zap className="w-3 h-3 mr-1" />
              {component.powerConsumption}W
            </Badge>
          )}
        </div>

        {/* Description */}
        <p className="text-xs text-muted-foreground mb-3 line-clamp-2 flex-1">
          {component.description}
        </p>

        {/* Buttons */}
        <div className="flex gap-2 mt-auto">
          <Button
            size="sm"
            onClick={onAdd}
            disabled={isSelected}
            className="flex-1"
          >
            <Plus className="w-3 h-3 mr-1" />
            {isSelected ? 'Added' : 'Add to Build'}
          </Button>
          {component.affiliateUrl && (
            <Button size="sm" variant="outline" asChild>
              <a href={component.affiliateUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-3 h-3" />
              </a>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ComponentCard;
