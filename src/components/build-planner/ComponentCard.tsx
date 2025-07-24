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
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            <h4 className="font-semibold text-sm mb-1">{component.name}</h4>
            <p className="text-xs text-muted-foreground mb-2">{component.brand}</p>
            <div className="flex items-center gap-2 mb-2">
              {component.rating > 0 && (
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 text-yellow-500 fill-current" />
                  <span className="text-xs">{component.rating}</span>
                  <span className="text-xs text-muted-foreground">({component.reviewCount})</span>
                </div>
              )}
            </div>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-primary">${component.price}</div>
            {component.powerConsumption > 0 && (
              <Badge variant="outline" className="text-xs mt-1">
                <Zap className="w-3 h-3 mr-1" />
                {component.powerConsumption}W
              </Badge>
            )}
          </div>
        </div>

        <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
          {component.description}
        </p>

        <div className="flex gap-2">
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