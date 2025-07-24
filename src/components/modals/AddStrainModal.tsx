import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

interface AddStrainModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AddStrainModal = ({ open, onOpenChange }: AddStrainModalProps) => {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [genetics, setGenetics] = useState('');
  const [floweringTime, setFloweringTime] = useState('');
  const [thcContent, setThcContent] = useState('');
  const [cbdContent, setCbdContent] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [yield_, setYield] = useState('');
  const [description, setDescription] = useState('');
  const [growTips, setGrowTips] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !type || !floweringTime || !difficulty) {
      toast({
        title: "Missing Information",
        description: "Please fill in the required fields (name, type, flowering time, and difficulty).",
        variant: "destructive",
      });
      return;
    }

    // Here you would submit the strain data
    toast({
      title: "Strain Added",
      description: `${name} has been added to your strain library.`,
    });

    // Reset form and close modal
    setName('');
    setType('');
    setGenetics('');
    setFloweringTime('');
    setThcContent('');
    setCbdContent('');
    setDifficulty('');
    setYield('');
    setDescription('');
    setGrowTips('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Strain</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Strain Name *</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Blue Dream"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="type">Type *</Label>
              <select 
                id="type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full px-3 py-2 border border-input bg-background rounded-md"
              >
                <option value="">Select type</option>
                <option value="indica">Indica</option>
                <option value="sativa">Sativa</option>
                <option value="hybrid">Hybrid</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="difficulty">Difficulty *</Label>
              <select 
                id="difficulty"
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="w-full px-3 py-2 border border-input bg-background rounded-md"
              >
                <option value="">Select difficulty</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="genetics">Genetics/Lineage</Label>
            <Input
              id="genetics"
              value={genetics}
              onChange={(e) => setGenetics(e.target.value)}
              placeholder="e.g., Blueberry × Haze"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="flowering-time">Flowering Time (weeks) *</Label>
              <Input
                id="flowering-time"
                type="number"
                value={floweringTime}
                onChange={(e) => setFloweringTime(e.target.value)}
                placeholder="8-10"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="yield">Expected Yield</Label>
              <Input
                id="yield"
                value={yield_}
                onChange={(e) => setYield(e.target.value)}
                placeholder="e.g., High, 500g/m²"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="thc">THC Content (%)</Label>
              <Input
                id="thc"
                value={thcContent}
                onChange={(e) => setThcContent(e.target.value)}
                placeholder="e.g., 18-22%"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cbd">CBD Content (%)</Label>
              <Input
                id="cbd"
                value={cbdContent}
                onChange={(e) => setCbdContent(e.target.value)}
                placeholder="e.g., <1%"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the strain's characteristics, effects, flavor profile..."
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="grow-tips">Growing Tips</Label>
            <Textarea
              id="grow-tips"
              value={growTips}
              onChange={(e) => setGrowTips(e.target.value)}
              placeholder="Any specific growing advice for this strain..."
              rows={3}
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              Add Strain
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};