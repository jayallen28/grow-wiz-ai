import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Camera, Edit, Save, X, Sprout } from 'lucide-react';
import { usePlants, DatabasePlant } from '@/hooks/usePlants';
import { useStrains } from '@/hooks/useStrains';
import { toast } from 'sonner';

interface PlantManagementProps {
  growCycleId: string;
}

export function PlantManagement({ growCycleId }: PlantManagementProps) {
  const { plants, updatePlant, loading } = usePlants(growCycleId);
  const { strains } = useStrains();
  const [editingPlant, setEditingPlant] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<DatabasePlant>>({});

  const handleEditStart = (plant: DatabasePlant) => {
    setEditingPlant(plant.id);
    setEditData({
      name: plant.name,
      strain_id: plant.strain_id || '',
      notes: plant.notes || ''
    });
  };

  const handleEditCancel = () => {
    setEditingPlant(null);
    setEditData({});
  };

  const handleEditSave = async (plantId: string) => {
    try {
      await updatePlant(plantId, {
        name: editData.name,
        strain_id: editData.strain_id === '' ? null : editData.strain_id,
        notes: editData.notes
      });
      toast.success('Plant updated successfully!');
      setEditingPlant(null);
      setEditData({});
    } catch (error) {
      toast.error('Failed to update plant');
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sprout className="h-5 w-5" />
            Plants
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4">Loading plants...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sprout className="h-5 w-5" />
          Plants ({plants.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {plants.map((plant) => (
            <div key={plant.id} className="p-4 border border-border rounded-lg">
              {editingPlant === plant.id ? (
                <div className="space-y-3">
                  <div>
                    <Label htmlFor={`name-${plant.id}`}>Plant Name</Label>
                    <Input
                      id={`name-${plant.id}`}
                      value={editData.name || ''}
                      onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor={`strain-${plant.id}`}>Strain</Label>
                    <Select 
                      value={editData.strain_id || ''} 
                      onValueChange={(value) => setEditData({ ...editData, strain_id: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a strain" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">No strain selected</SelectItem>
                        {strains.map((strain) => (
                          <SelectItem key={strain.id} value={strain.id}>
                            {strain.name} ({strain.type})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor={`notes-${plant.id}`}>Notes</Label>
                    <Textarea
                      id={`notes-${plant.id}`}
                      placeholder="Plant-specific notes..."
                      value={editData.notes || ''}
                      onChange={(e) => setEditData({ ...editData, notes: e.target.value })}
                      className="min-h-[60px]"
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => handleEditSave(plant.id)}>
                      <Save className="h-3 w-3 mr-1" />
                      Save
                    </Button>
                    <Button size="sm" variant="outline" onClick={handleEditCancel}>
                      <X className="h-3 w-3 mr-1" />
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">{plant.name}</h4>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleEditStart(plant)}
                    >
                      <Edit className="h-3 w-3" />
                    </Button>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">Strain:</span>
                      {plant.strains ? (
                        <Badge variant="secondary" className="text-xs">
                          {plant.strains.name} ({plant.strains.type})
                        </Badge>
                      ) : (
                        <span className="text-xs text-muted-foreground">No strain assigned</span>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">Status:</span>
                      <Badge 
                        variant={plant.status === 'active' ? 'default' : 'secondary'} 
                        className="text-xs"
                      >
                        {plant.status}
                      </Badge>
                    </div>

                    {plant.notes && (
                      <div className="mt-2">
                        <p className="text-xs text-muted-foreground">{plant.notes}</p>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2 mt-3">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Camera className="h-3 w-3 mr-1" />
                      Photo
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}