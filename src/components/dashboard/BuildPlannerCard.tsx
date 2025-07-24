import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calculator, DollarSign, Zap, Plus, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

interface SavedBuild {
  id: string;
  name: string;
  totalCost: number;
  totalPower: number;
  componentCount: number;
  createdAt: Date;
}

// Mock saved builds - in real app this would come from localStorage/API
const mockSavedBuilds: SavedBuild[] = [
  {
    id: '1',
    name: '4x4 Beginner Setup',
    totalCost: 1247,
    totalPower: 345,
    componentCount: 8,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
  },
  {
    id: '2', 
    name: 'Premium DWC Build',
    totalCost: 2156,
    totalPower: 520,
    componentCount: 12,
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  }
];

const BuildPlannerCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5" />
          Build Planner
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Link to="/build-planner" className="flex-1">
            <Button className="w-full">
              <Plus className="w-4 h-4 mr-2" />
              New Build
            </Button>
          </Link>
        </div>

        {mockSavedBuilds.length > 0 && (
          <div>
            <h4 className="text-sm font-medium mb-2">Saved Builds</h4>
            <div className="space-y-2">
              {mockSavedBuilds.map((build) => (
                <div key={build.id} className="p-3 bg-accent/20 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-medium text-sm">{build.name}</h5>
                    <Link to={`/build-planner?load=${build.id}`}>
                      <Button size="sm" variant="ghost">
                        <Eye className="w-3 h-3" />
                      </Button>
                    </Link>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <DollarSign className="w-3 h-3" />
                      ${build.totalCost}
                    </div>
                    <div className="flex items-center gap-1">
                      <Zap className="w-3 h-3" />
                      {build.totalPower}W
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {build.componentCount} items
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="pt-2 border-t border-border/50">
          <p className="text-xs text-muted-foreground">
            Plan your perfect grow setup with cost tracking and power calculations
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default BuildPlannerCard;