import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';

interface EnvironmentSettingsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const EnvironmentSettingsModal = ({ open, onOpenChange }: EnvironmentSettingsModalProps) => {
  const [tempMin, setTempMin] = useState('75');
  const [tempMax, setTempMax] = useState('77');
  const [humidityMin, setHumidityMin] = useState('60');
  const [humidityMax, setHumidityMax] = useState('65');
  const [co2Target, setCo2Target] = useState('1200');
  const [lightSchedule, setLightSchedule] = useState('12/12');
  const [alertsEnabled, setAlertsEnabled] = useState(true);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would save the settings
    toast({
      title: "Settings Updated",
      description: "Environment control settings have been saved.",
    });

    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Environment Settings</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="climate" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="climate">Climate</TabsTrigger>
            <TabsTrigger value="co2">CO₂</TabsTrigger>
            <TabsTrigger value="lighting">Lighting</TabsTrigger>
          </TabsList>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <TabsContent value="climate" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="temp-min">Min Temperature (°F)</Label>
                  <Input
                    id="temp-min"
                    type="number"
                    value={tempMin}
                    onChange={(e) => setTempMin(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="temp-max">Max Temperature (°F)</Label>
                  <Input
                    id="temp-max"
                    type="number"
                    value={tempMax}
                    onChange={(e) => setTempMax(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="humidity-min">Min Humidity (%)</Label>
                  <Input
                    id="humidity-min"
                    type="number"
                    value={humidityMin}
                    onChange={(e) => setHumidityMin(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="humidity-max">Max Humidity (%)</Label>
                  <Input
                    id="humidity-max"
                    type="number"
                    value={humidityMax}
                    onChange={(e) => setHumidityMax(e.target.value)}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="co2" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="co2-target">Target CO₂ Level (ppm)</Label>
                <Input
                  id="co2-target"
                  type="number"
                  value={co2Target}
                  onChange={(e) => setCo2Target(e.target.value)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="co2-alerts">CO₂ Alerts</Label>
                <Switch
                  id="co2-alerts"
                  checked={alertsEnabled}
                  onCheckedChange={setAlertsEnabled}
                />
              </div>
            </TabsContent>

            <TabsContent value="lighting" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="light-schedule">Light Schedule</Label>
                <select 
                  id="light-schedule"
                  value={lightSchedule}
                  onChange={(e) => setLightSchedule(e.target.value)}
                  className="w-full px-3 py-2 border border-input bg-background rounded-md"
                >
                  <option value="18/6">18/6 (Vegetative)</option>
                  <option value="12/12">12/12 (Flowering)</option>
                  <option value="24/0">24/0 (Seedling)</option>
                  <option value="custom">Custom</option>
                </select>
              </div>
            </TabsContent>

            <div className="flex gap-2 pt-4">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
                Cancel
              </Button>
              <Button type="submit" className="flex-1">
                Save Settings
              </Button>
            </div>
          </form>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};