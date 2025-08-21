import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Camera, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useGrowLogs } from '@/hooks/useGrowLogs';
import { useGrowCycles } from '@/hooks/useGrowCycles';

interface AddJournalEntryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  growCycleId?: string;
  onEntryAdded?: () => void;
}

export const AddJournalEntryModal = ({ open, onOpenChange, growCycleId, onEntryAdded }: AddJournalEntryModalProps) => {
  const [notes, setNotes] = useState('');
  const [growStage, setGrowStage] = useState('');
  const [dayInStage, setDayInStage] = useState('1');
  const [actions, setActions] = useState<string[]>([]);
  const [newAction, setNewAction] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { toast } = useToast();
  const { addGrowLog } = useGrowLogs();
  const { growCycles, currentGrow } = useGrowCycles();
  
  const selectedGrow = growCycles.find(g => g.id === growCycleId) || currentGrow;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!notes || !growStage || !growCycleId) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      await addGrowLog({
        grow_cycle_id: growCycleId,
        date: new Date().toISOString().split('T')[0],
        grow_stage: growStage as 'seedling' | 'vegetative' | 'flowering' | 'harvest' | 'drying' | 'curing',
        day_in_stage: parseInt(dayInStage),
        notes,
        actions: actions.length > 0 ? actions : null,
        issues: null,
        photos: null,
        height: null,
      });

      toast({
        title: "Entry Added",
        description: "Your journal entry has been saved successfully.",
      });

      // Reset form and close modal
      setNotes('');
      setGrowStage('');
      setDayInStage('1');
      setActions([]);
      setNewAction('');
      onOpenChange(false);
      onEntryAdded?.();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to save journal entry.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const addAction = () => {
    if (newAction && !actions.includes(newAction)) {
      setActions([...actions, newAction]);
      setNewAction('');
    }
  };

  const removeAction = (actionToRemove: string) => {
    setActions(actions.filter(action => action !== actionToRemove));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add Journal Entry</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {selectedGrow && (
            <div className="p-3 bg-muted/50 rounded-lg">
              <p className="text-sm font-medium">Adding entry to: {selectedGrow.name}</p>
              <p className="text-xs text-muted-foreground">Day {selectedGrow.current_day} - {selectedGrow.current_stage}</p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="growStage">Growth Stage *</Label>
              <Select value={growStage} onValueChange={setGrowStage}>
                <SelectTrigger>
                  <SelectValue placeholder="Select stage" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="seedling">Seedling</SelectItem>
                  <SelectItem value="vegetative">Vegetative</SelectItem>
                  <SelectItem value="flowering">Flowering</SelectItem>
                  <SelectItem value="harvest">Harvest</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dayInStage">Day in Stage *</Label>
              <Input
                id="dayInStage"
                type="number"
                min="1"
                value={dayInStage}
                onChange={(e) => setDayInStage(e.target.value)}
                placeholder="e.g., 1"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes *</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Describe what happened today..."
              rows={4}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="actions">Actions Taken</Label>
            <div className="flex gap-2">
              <Input
                id="actions"
                value={newAction}
                onChange={(e) => setNewAction(e.target.value)}
                placeholder="e.g., Watered, Fed nutrients..."
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addAction())}
              />
              <Button type="button" onClick={addAction} variant="outline" size="sm">
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {actions.map((action, index) => (
                <Badge key={index} variant="secondary" className="gap-1">
                  {action}
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => removeAction(action)}
                  />
                </Badge>
              ))}
            </div>
          </div>

          <Button type="button" variant="outline" className="w-full">
            <Camera className="h-4 w-4 mr-2" />
            Add Photos
          </Button>

          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="flex-1" disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" className="flex-1" disabled={loading}>
              {loading ? 'Saving...' : 'Save Entry'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};