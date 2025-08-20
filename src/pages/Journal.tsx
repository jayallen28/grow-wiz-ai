import { useState, useEffect } from 'react';
import { Navigation } from '@/components/layout/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Camera, Plus, Calendar, Sprout, PlayCircle, PauseCircle } from 'lucide-react';
import { AddJournalEntryModal } from '@/components/modals/AddJournalEntryModal';
import { CreateGrowModal } from '@/components/modals/CreateGrowModal';
import { useGrowCycles } from '@/hooks/useGrowCycles';
import { useGrowLogs } from '@/hooks/useGrowLogs';
import { useAuth } from '@/hooks/useAuth';
import { format } from 'date-fns';

const Journal = () => {
  const [showAddEntryModal, setShowAddEntryModal] = useState(false);
  const [showCreateGrowModal, setShowCreateGrowModal] = useState(false);
  const [selectedGrowId, setSelectedGrowId] = useState<string>('');

  const { user } = useAuth();
  const { growCycles, currentGrow, refetch: refetchGrowCycles } = useGrowCycles();
  const { growLogs, refetch: refetchGrowLogs } = useGrowLogs();

  // Set selected grow to current grow by default
  useEffect(() => {
    if (currentGrow && !selectedGrowId) {
      setSelectedGrowId(currentGrow.id);
    }
  }, [currentGrow, selectedGrowId]);

  const selectedGrow = growCycles.find(g => g.id === selectedGrowId) || currentGrow;
  const selectedGrowLogs = growLogs.filter(log => log.grow_cycle_id === selectedGrowId);

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'seedling':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'vegetative':
        return 'bg-primary/20 text-primary border-primary/30';
      case 'flowering':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'harvest':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default:
        return 'bg-muted/20 text-muted-foreground border-muted/30';
    }
  };

  const handleGrowCreated = () => {
    refetchGrowCycles();
  };

  const handleEntryAdded = () => {
    refetchGrowLogs();
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Please sign in to access your journal</h1>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Grow Journal
          </h1>
          <p className="text-muted-foreground mt-1">
            Track daily progress and log important events
          </p>
        </div>

        {/* Grow Cycle Management */}
        <div className="mb-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Sprout className="h-5 w-5" />
                  Grow Cycles
                </span>
                <Button onClick={() => setShowCreateGrowModal(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  New Grow
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {growCycles.length > 0 ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <label className="text-sm font-medium">Select Grow Cycle:</label>
                      <Select value={selectedGrowId} onValueChange={setSelectedGrowId}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select a grow cycle" />
                        </SelectTrigger>
                        <SelectContent>
                          {growCycles.map((grow) => (
                            <SelectItem key={grow.id} value={grow.id}>
                              {grow.name} - {grow.current_stage} (Day {grow.current_day})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {selectedGrow && (
                    <div className="flex items-center justify-between p-4 bg-card/50 rounded-lg border">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 flex-1">
                        <div>
                          <p className="text-sm text-muted-foreground">Stage</p>
                          <Badge className={getStageColor(selectedGrow.current_stage)}>
                            {selectedGrow.current_stage}
                          </Badge>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Day</p>
                          <p className="font-medium">{selectedGrow.current_day}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Plants</p>
                          <p className="font-medium">{selectedGrow.plant_count}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Status</p>
                          <Badge variant={selectedGrow.status === 'active' ? 'default' : 'secondary'}>
                            {selectedGrow.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Sprout className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No Grow Cycles</h3>
                  <p className="text-muted-foreground mb-4">
                    Create your first grow cycle to start journaling
                  </p>
                  <Button onClick={() => setShowCreateGrowModal(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create First Grow
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Journal Entries
                    {selectedGrow && <span className="text-sm font-normal text-muted-foreground">({selectedGrow.name})</span>}
                  </span>
                  {selectedGrow && (
                    <Button 
                      size="sm" 
                      onClick={() => setShowAddEntryModal(true)}
                      disabled={!selectedGrow}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Entry
                    </Button>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {selectedGrowLogs.length > 0 ? (
                    selectedGrowLogs.map((log) => (
                      <div key={log.id} className="p-4 border border-border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">
                            Day {log.day_in_stage} - {log.grow_stage}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            {format(new Date(log.date), 'MMM d, yyyy')}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          {log.notes}
                        </p>
                        {log.actions && log.actions.length > 0 && (
                          <div className="flex gap-2">
                            {log.actions.map((action, index) => (
                              <span key={index} className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">
                                {action}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    ))
                  ) : selectedGrow ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>No journal entries yet for this grow cycle.</p>
                      <p className="text-sm">Start logging your progress!</p>
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>Select a grow cycle to view journal entries</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Quick Log</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    disabled={!selectedGrow}
                    onClick={() => setShowAddEntryModal(true)}
                  >
                    <Camera className="h-4 w-4 mr-2" />
                    Take Photo
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    disabled={!selectedGrow}
                    onClick={() => setShowAddEntryModal(true)}
                  >
                    Water/Feed Plants
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    disabled={!selectedGrow}
                    onClick={() => setShowAddEntryModal(true)}
                  >
                    Check Environment
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    disabled={!selectedGrow}
                    onClick={() => setShowAddEntryModal(true)}
                  >
                    Plant Training
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <AddJournalEntryModal 
        open={showAddEntryModal} 
        onOpenChange={setShowAddEntryModal}
        growCycleId={selectedGrowId}
        onEntryAdded={handleEntryAdded}
      />
      
      <CreateGrowModal
        open={showCreateGrowModal}
        onOpenChange={setShowCreateGrowModal}
        onGrowCreated={handleGrowCreated}
      />
    </div>
  );
};

export default Journal;