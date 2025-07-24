import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

interface FeedingLogModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const FeedingLogModal = ({ open, onOpenChange }: FeedingLogModalProps) => {
  const [feedType, setFeedType] = useState('nutrients');
  const [phValue, setPhValue] = useState('');
  const [tdsValue, setTdsValue] = useState('');
  const [waterAmount, setWaterAmount] = useState('');
  const [nutrients, setNutrients] = useState('');
  const [notes, setNotes] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!phValue || !tdsValue) {
      toast({
        title: "Missing Information",
        description: "Please fill in pH and TDS values.",
        variant: "destructive",
      });
      return;
    }

    // Here you would submit the feeding log
    toast({
      title: "Feeding Logged",
      description: "Your feeding information has been recorded.",
    });

    // Reset form and close modal
    setPhValue('');
    setTdsValue('');
    setWaterAmount('');
    setNutrients('');
    setNotes('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Log Feeding</DialogTitle>
        </DialogHeader>
        
        <Tabs value={feedType} onValueChange={setFeedType} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="nutrients">Nutrients</TabsTrigger>
            <TabsTrigger value="water">Water Only</TabsTrigger>
            <TabsTrigger value="flush">Flush</TabsTrigger>
          </TabsList>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <TabsContent value="nutrients" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="ph">pH Level</Label>
                  <Input
                    id="ph"
                    type="number"
                    step="0.1"
                    value={phValue}
                    onChange={(e) => setPhValue(e.target.value)}
                    placeholder="6.5"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tds">TDS/EC (ppm)</Label>
                  <Input
                    id="tds"
                    type="number"
                    value={tdsValue}
                    onChange={(e) => setTdsValue(e.target.value)}
                    placeholder="1200"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="water-amount">Water Amount (gallons)</Label>
                <Input
                  id="water-amount"
                  type="number"
                  value={waterAmount}
                  onChange={(e) => setWaterAmount(e.target.value)}
                  placeholder="5"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="nutrients">Nutrients Used</Label>
                <Textarea
                  id="nutrients"
                  value={nutrients}
                  onChange={(e) => setNutrients(e.target.value)}
                  placeholder="e.g., General Hydroponics Flora Series, Cal-Mag"
                  rows={3}
                />
              </div>
            </TabsContent>

            <TabsContent value="water" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="ph-water">pH Level</Label>
                  <Input
                    id="ph-water"
                    type="number"
                    step="0.1"
                    value={phValue}
                    onChange={(e) => setPhValue(e.target.value)}
                    placeholder="6.5"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="water-amount-only">Water Amount (gallons)</Label>
                  <Input
                    id="water-amount-only"
                    type="number"
                    value={waterAmount}
                    onChange={(e) => setWaterAmount(e.target.value)}
                    placeholder="5"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="flush" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="flush-amount">Flush Amount (gallons)</Label>
                <Input
                  id="flush-amount"
                  type="number"
                  value={waterAmount}
                  onChange={(e) => setWaterAmount(e.target.value)}
                  placeholder="15"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="ph-flush">Final pH</Label>
                  <Input
                    id="ph-flush"
                    type="number"
                    step="0.1"
                    value={phValue}
                    onChange={(e) => setPhValue(e.target.value)}
                    placeholder="6.5"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tds-flush">Final TDS (ppm)</Label>
                  <Input
                    id="tds-flush"
                    type="number"
                    value={tdsValue}
                    onChange={(e) => setTdsValue(e.target.value)}
                    placeholder="50"
                  />
                </div>
              </div>
            </TabsContent>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes (Optional)</Label>
              <Textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Any additional observations..."
                rows={2}
              />
            </div>

            <div className="flex gap-2 pt-4">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
                Cancel
              </Button>
              <Button type="submit" className="flex-1">
                Log Feeding
              </Button>
            </div>
          </form>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};