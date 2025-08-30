import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Camera, X } from 'lucide-react';
import { useGrowLogs } from '@/hooks/useGrowLogs';
import { usePlants } from '@/hooks/usePlants';
import { toast } from 'sonner';

interface AddJournalEntryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  growCycleId?: string;
  onEntryAdded?: () => void;
}

export const AddJournalEntryModal = ({ open, onOpenChange, growCycleId, onEntryAdded }: AddJournalEntryModalProps) => {
  const [date, setDate] = useState(new Date());
  const [growStage, setGrowStage] = useState('vegetative');
  const [dayInStage, setDayInStage] = useState(1);
  const [notes, setNotes] = useState('');
  const [actions, setActions] = useState<string[]>([]);
  const [issues, setIssues] = useState<string[]>([]);
  const [newAction, setNewAction] = useState('');
  const [newIssue, setNewIssue] = useState('');
  const [height, setHeight] = useState('');
  const [selectedPlantId, setSelectedPlantId] = useState<string>('all');
  const [appliesToAll, setAppliesToAll] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { addGrowLog } = useGrowLogs();
  const { plants } = usePlants(growCycleId);

  useEffect(() => {
    if (open) {
      setDate(new Date());
      setGrowStage('vegetative');
      setDayInStage(1);
      setNotes('');
      setActions([]);
      setIssues([]);
      setNewAction('');
      setNewIssue('');
      setHeight('');
      setSelectedPlantId('all');
      setAppliesToAll(true);
      setIsSubmitting(false);
    }
  }, [open]);

  useEffect(() => {
    setAppliesToAll(selectedPlantId === 'all');
  }, [selectedPlantId]);

  const addAction = () => {
    if (newAction.trim() && !actions.includes(newAction.trim())) {
      setActions([...actions, newAction.trim()]);
      setNewAction('');
    }
  };

  const removeAction = (actionToRemove: string) => {
    setActions(actions.filter(action => action !== actionToRemove));
  };

  const addIssue = () => {
    if (newIssue.trim() && !issues.includes(newIssue.trim())) {
      setIssues([...issues, newIssue.trim()]);
      setNewIssue('');
    }
  };

  const removeIssue = (issueToRemove: string) => {
    setIssues(issues.filter(issue => issue !== issueToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!notes.trim() || !growStage || !growCycleId) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    try {
      const logData = {
        grow_cycle_id: growCycleId,
        date: date.toISOString().split('T')[0],
        grow_stage: growStage as any,
        day_in_stage: dayInStage,
        height: height ? parseFloat(height) : undefined,
        notes: notes.trim(),
        actions: actions.length > 0 ? actions : undefined,
        issues: issues.length > 0 ? issues : undefined,
        plant_id: appliesToAll ? null : selectedPlantId,
        applies_to_all: appliesToAll,
      };

      await addGrowLog(logData);
      
      toast.success('Journal entry added successfully!');
      onEntryAdded?.();
      onOpenChange(false);
    } catch (error: any) {
      toast.error(error.message || 'Failed to add journal entry');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Journal Entry</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={date.toISOString().split('T')[0]}
                onChange={(e) => setDate(new Date(e.target.value))}
                required
              />
            </div>
            <div>
              <Label htmlFor="day-in-stage">Day in Stage</Label>
              <Input
                id="day-in-stage"
                type="number"
                min="1"
                value={dayInStage}
                onChange={(e) => setDayInStage(parseInt(e.target.value) || 1)}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="plant-selection">Apply To</Label>
            <Select value={selectedPlantId} onValueChange={setSelectedPlantId}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Plants</SelectItem>
                {plants.map((plant) => (
                  <SelectItem key={plant.id} value={plant.id}>
                    {plant.name} {plant.strains && `(${plant.strains.name})`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground mt-1">
              Choose whether this entry applies to all plants or a specific plant
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="grow-stage">Grow Stage</Label>
              <Select value={growStage} onValueChange={setGrowStage}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="seedling">Seedling</SelectItem>
                  <SelectItem value="vegetative">Vegetative</SelectItem>
                  <SelectItem value="flowering">Flowering</SelectItem>
                  <SelectItem value="harvest">Harvest</SelectItem>
                  <SelectItem value="drying">Drying</SelectItem>
                  <SelectItem value="curing">Curing</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="height">Height (inches, optional)</Label>
              <Input
                id="height"
                type="number"
                step="0.1"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder="e.g., 12.5"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              placeholder="What happened today? Any observations, changes, or activities..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="min-h-[100px]"
              required
            />
          </div>

          <div>
            <Label>Actions Taken</Label>
            <div className="flex gap-2 mb-2">
              <Input
                placeholder="e.g., Watered, Fed nutrients, Pruned..."
                value={newAction}
                onChange={(e) => setNewAction(e.target.value)}
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

          <div>
            <Label>Issues/Problems</Label>
            <div className="flex gap-2 mb-2">
              <Input
                placeholder="e.g., Yellowing leaves, Pest spotted..."
                value={newIssue}
                onChange={(e) => setNewIssue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addIssue())}
              />
              <Button type="button" onClick={addIssue} variant="outline" size="sm">
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {issues.map((issue, index) => (
                <Badge key={index} variant="destructive" className="gap-1">
                  {issue}
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => removeIssue(issue)}
                  />
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting || !notes.trim()}>
              {isSubmitting ? 'Saving...' : 'Save Entry'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};