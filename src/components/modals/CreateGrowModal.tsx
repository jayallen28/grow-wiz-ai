import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { format } from 'date-fns';
import { useGrowCycles } from '@/hooks/useGrowCycles';
import { usePlants } from '@/hooks/usePlants';
import { toast } from 'sonner';

interface CreateGrowModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onGrowCreated?: () => void;
}

export const CreateGrowModal = ({ open, onOpenChange, onGrowCreated }: CreateGrowModalProps) => {
  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [currentStage, setCurrentStage] = useState('seedling');
  const [plantCount, setPlantCount] = useState(1);
  const [medium, setMedium] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { addGrowCycle } = useGrowCycles();
  const { createPlantsForGrowCycle } = usePlants();

  useEffect(() => {
    if (open) {
      setName('');
      setStartDate(new Date());
      setCurrentStage('seedling');
      setPlantCount(1);
      setMedium('');
      setNotes('');
      setIsSubmitting(false);
    }
  }, [open]);

  const getExpectedDuration = (stage: string) => {
    switch (stage) {
      case 'seedling':
        return 14;
      case 'vegetative':
        return 28;
      case 'flowering':
        return 56;
      case 'harvest':
        return 7;
      case 'drying':
        return 7;
      case 'curing':
        return 14;
      default:
        return 14;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !medium) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    try {
      const growData = {
        name: name.trim(),
        start_date: startDate.toISOString().split('T')[0],
        stage_start_date: startDate.toISOString().split('T')[0],
        current_stage: currentStage as any,
        expected_stage_duration: getExpectedDuration(currentStage as any),
        current_day: 1,
        plant_count: plantCount,
        medium: medium as any,
        status: 'active' as const,
        notes: notes.trim() || undefined
      };

      console.log('Creating grow cycle with data:', growData);
      
      const result = await addGrowCycle(growData);
      console.log('Grow cycle created:', result);

      // Create individual plants for this grow cycle
      if (result?.id) {
        console.log('Creating plants for grow cycle:', result.id);
        await createPlantsForGrowCycle(result.id, plantCount);
        console.log('Plants created successfully');
      }
      
      toast.success('Grow cycle created successfully!');
      onGrowCreated?.();
      onOpenChange(false);
    } catch (error: any) {
      console.error('Error creating grow cycle:', error);
      toast.error(error.message || 'Failed to create grow cycle');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New Grow Cycle</DialogTitle>
          <DialogDescription>
            Set up a new grow cycle to start tracking your cannabis cultivation journey.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Grow Name</Label>
            <Input
              id="name"
              placeholder="e.g., Spring 2024 Grow"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="start-date">Start Date</Label>
            <Input
              id="start-date"
              type="date"
              value={format(startDate, 'yyyy-MM-dd')}
              onChange={(e) => setStartDate(new Date(e.target.value))}
              required
            />
          </div>

          <div>
            <Label htmlFor="plant-count">Number of Plants</Label>
            <Input
              id="plant-count"
              type="number"
              min="1"
              max="50"
              value={plantCount}
              onChange={(e) => setPlantCount(parseInt(e.target.value) || 1)}
              required
            />
            <p className="text-xs text-muted-foreground mt-1">
              Individual plants will be created automatically. You can assign strains to each plant after creation.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="current-stage">Current Stage</Label>
              <Select value={currentStage} onValueChange={setCurrentStage}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="seedling">Seedling</SelectItem>
                  <SelectItem value="vegetative">Vegetative</SelectItem>
                  <SelectItem value="flowering">Flowering</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="medium">Growing Medium</Label>
              <Select value={medium} onValueChange={setMedium}>
                <SelectTrigger>
                  <SelectValue placeholder="Select growing medium" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dwc">Deep Water Culture (DWC)</SelectItem>
                  <SelectItem value="soil">Soil</SelectItem>
                  <SelectItem value="coco">Coco Coir</SelectItem>
                  <SelectItem value="rockwool">Rockwool</SelectItem>
                  <SelectItem value="perlite">Perlite</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="notes">Notes (Optional)</Label>
            <Textarea
              id="notes"
              placeholder="Any additional notes about this grow cycle..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="min-h-[80px]"
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting || !name.trim() || !medium}>
              {isSubmitting ? 'Creating...' : 'Create Grow Cycle'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};