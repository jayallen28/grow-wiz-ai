import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useGrowCycles } from '@/hooks/useGrowCycles';
import { useStrains } from '@/hooks/useStrains';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface CreateGrowModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onGrowCreated?: () => void;
}

export function CreateGrowModal({ open, onOpenChange, onGrowCreated }: CreateGrowModalProps) {
  console.log('CreateGrowModal: Rendering with props:', { open, onGrowCreated: !!onGrowCreated });
  const [name, setName] = useState('');
  const [strainId, setStrainId] = useState('');
  const [plantCount, setPlantCount] = useState('1');
  const [medium, setMedium] = useState('soil');
  const [currentStage, setCurrentStage] = useState('seedling');
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);

  const { toast } = useToast();
  const { addGrowCycle } = useGrowCycles();
  const { strains } = useStrains();

  useEffect(() => {
    if (!open) {
      // Reset form when modal closes
      setName('');
      setStrainId('');
      setPlantCount('1');
      setMedium('soil');
      setCurrentStage('seedling');
      setStartDate(new Date());
      setNotes('');
    }
  }, [open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('CreateGrowModal: Form submission started', { name, strainId, plantCount, medium, currentStage, startDate });
    
    if (!name.trim()) {
      toast({
        title: "Name Required",
        description: "Please enter a name for your grow cycle.",
        variant: "destructive",
      });
      return;
    }

    if (!startDate) {
      toast({
        title: "Start Date Required",
        description: "Please select a start date for your grow cycle.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const expectedDuration = getExpectedDuration(currentStage);
      
      const growData = {
        name: name.trim(),
        strain_id: strainId || null,
        start_date: startDate.toISOString().split('T')[0],
        stage_start_date: startDate.toISOString().split('T')[0],
        current_stage: currentStage as any,
        expected_stage_duration: expectedDuration,
        current_day: 1,
        plant_count: parseInt(plantCount),
        medium: medium as any,
        notes: notes.trim() || null,
        status: 'active' as const,
      };
      
      console.log('CreateGrowModal: About to call addGrowCycle with data:', growData);
      
      const result = await addGrowCycle(growData);
      
      console.log('CreateGrowModal: addGrowCycle result:', result);

      toast({
        title: "Grow Created",
        description: "Your new grow cycle has been created successfully.",
      });

      onOpenChange(false);
      onGrowCreated?.();
    } catch (error: any) {
      console.error('CreateGrowModal: Error creating grow:', error);
      toast({
        title: "Error creating grow",
        description: error.message || "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getExpectedDuration = (stage: string) => {
    switch (stage) {
      case 'seedling':
        return 14;
      case 'vegetative':
        return 28;
      case 'flowering':
        return 63;
      default:
        return 14;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New Grow Cycle</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Grow Name *</Label>
            <Input
              id="name"
              placeholder="e.g., Northern Lights Summer 2024"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="strain">Strain</Label>
            <Select value={strainId} onValueChange={setStrainId}>
              <SelectTrigger>
                <SelectValue placeholder="Select a strain (optional)" />
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

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="plantCount">Plant Count *</Label>
              <Input
                id="plantCount"
                type="number"
                min="1"
                max="100"
                value={plantCount}
                onChange={(e) => setPlantCount(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="medium">Growing Medium *</Label>
              <Select value={medium} onValueChange={setMedium}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="soil">Soil</SelectItem>
                  <SelectItem value="coco">Coco Coir</SelectItem>
                  <SelectItem value="dwc">Deep Water Culture (DWC)</SelectItem>
                  <SelectItem value="rockwool">Rockwool</SelectItem>
                  <SelectItem value="perlite">Perlite</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="stage">Starting Stage *</Label>
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

            <div className="space-y-2">
              <Label>Start Date *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !startDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDate ? format(startDate, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              placeholder="Optional notes about this grow cycle..."
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Creating...' : 'Create Grow'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}