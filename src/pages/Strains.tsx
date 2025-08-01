import { useState } from 'react';
import { Navigation } from '@/components/layout/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Sprout, Clock, TrendingUp } from 'lucide-react';
import { AddStrainModal } from '@/components/modals/AddStrainModal';
import { useStrains } from '@/hooks/useStrains';
import { useGrowCycles } from '@/hooks/useGrowCycles';

const Strains = () => {
  const [showAddStrainModal, setShowAddStrainModal] = useState(false);
  const { strains, loading } = useStrains();
  const { growCycles } = useGrowCycles();

  // Get strains that are currently being grown
  const activeStrainIds = growCycles
    .filter(cycle => cycle.status === 'active')
    .map(cycle => cycle.strain_id)
    .filter(Boolean);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'indica':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'sativa':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'hybrid':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default:
        return 'bg-muted/20 text-muted-foreground border-muted/30';
    }
  };

  const getDifficultyColor = (floweringTime?: number) => {
    if (!floweringTime) return 'bg-muted/20 text-muted-foreground border-muted/30';
    if (floweringTime <= 8) return 'bg-success/20 text-success border-success/30'; // Easy
    if (floweringTime <= 10) return 'bg-warning/20 text-warning border-warning/30'; // Medium
    return 'bg-destructive/20 text-destructive border-destructive/30'; // Hard
  };

  const getDifficultyLabel = (floweringTime?: number) => {
    if (!floweringTime) return 'Unknown';
    if (floweringTime <= 8) return 'Beginner';
    if (floweringTime <= 10) return 'Intermediate';
    return 'Advanced';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Strain Library
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage your cannabis strain collection and grow data
            </p>
          </div>
          <Button variant="cannabis" onClick={() => setShowAddStrainModal(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Strain
          </Button>
        </div>

        <div className="space-y-6">
          {/* Active Grow */}
          <Card className="bg-gradient-card border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sprout className="h-5 w-5 text-primary" />
                Currently Growing
              </CardTitle>
            </CardHeader>
            <CardContent>
              {strains
                .filter(strain => activeStrainIds.includes(strain.id))
                .map(strain => {
                  const activeCycle = growCycles.find(
                    cycle => cycle.strain_id === strain.id && cycle.status === 'active'
                  );
                  return (
                    <div key={strain.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div>
                          <h3 className="font-semibold">{strain.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            Day {activeCycle?.current_day || 0} of {activeCycle?.current_stage || 'unknown'} stage
                          </p>
                        </div>
                        <Badge className={getTypeColor(strain.type)}>
                          {strain.type}
                        </Badge>
                      </div>
                      <Button variant="outline" size="sm">
                        View Progress
                      </Button>
                    </div>
                  );
                })}
            </CardContent>
          </Card>

          {/* Strain Collection */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {strains.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <Sprout className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-medium mb-2">No strains yet</h3>
                <p className="text-muted-foreground mb-4">Add your first strain to get started</p>
                <Button onClick={() => setShowAddStrainModal(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Your First Strain
                </Button>
              </div>
            ) : (
              strains.map((strain) => {
                const isActive = activeStrainIds.includes(strain.id);
                return (
                  <Card key={strain.id} className="hover:shadow-card transition-smooth">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>{strain.name}</span>
                        {isActive && (
                          <Badge className="bg-success/20 text-success border-success/30">
                            Active
                          </Badge>
                        )}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-2">
                        <Badge className={getTypeColor(strain.type)}>
                          {strain.type}
                        </Badge>
                        <Badge className={getDifficultyColor(strain.flowering_time)}>
                          {getDifficultyLabel(strain.flowering_time)}
                        </Badge>
                      </div>

                      <div className="space-y-2 text-sm">
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            Flowering Time
                          </span>
                          <span className="font-medium">
                            {strain.flowering_time ? `${strain.flowering_time} weeks` : 'Unknown'}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground flex items-center gap-1">
                            <TrendingUp className="h-3 w-3" />
                            THC Content
                          </span>
                          <span className="font-medium">{strain.thc_content || 'Unknown'}</span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          View Details
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          Start Grow
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            )}
          </div>

          {/* Growing Tips */}
          <Card>
            <CardHeader>
              <CardTitle>Growing Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-2">Indica Strains</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Shorter flowering time (7-9 weeks)</li>
                    <li>• Compact growth pattern</li>
                    <li>• Lower temperature tolerance</li>
                    <li>• Higher humidity tolerance during flower</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Sativa Strains</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Longer flowering time (9-12 weeks)</li>
                    <li>• Tall, stretchy growth</li>
                    <li>• Higher temperature preference</li>
                    <li>• More sensitive to nutrients</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <AddStrainModal 
        open={showAddStrainModal} 
        onOpenChange={setShowAddStrainModal} 
      />
    </div>
  );
};

export default Strains;