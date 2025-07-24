import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calculator, Zap, DollarSign, Clock } from 'lucide-react';

const BuildPlannerPreview = () => {
  const sampleBuild = {
    components: [
      { name: "4x4 AC Infinity Grow Tent", price: 149, power: 0 },
      { name: "Mars Hydro TSW-2000 LED", price: 299, power: 300 },
      { name: "6\" AC Infinity Inline Fan", price: 89, power: 45 },
      { name: "Phresh Carbon Filter", price: 75, power: 0 },
      { name: "pH Meter & Calibration Kit", price: 45, power: 5 },
    ],
    totalCost: 657,
    totalPower: 350,
    monthlyCost: 25.20
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-accent/50 to-accent/20 border-border/50">
      <div className="flex items-center gap-3 mb-6">
        <Calculator className="w-6 h-6 text-cannabis-primary" />
        <div>
          <h3 className="text-xl font-semibold">Build Planner Preview</h3>
          <p className="text-sm text-muted-foreground">4x4 Complete Setup</p>
        </div>
      </div>

      <div className="space-y-3 mb-6">
        {sampleBuild.components.map((component, index) => (
          <div key={index} className="flex justify-between items-center p-3 bg-background/50 rounded-lg">
            <span className="text-sm font-medium">{component.name}</span>
            <div className="flex items-center gap-2">
              {component.power > 0 && (
                <Badge variant="outline" className="text-xs">
                  <Zap className="w-3 h-3 mr-1" />
                  {component.power}W
                </Badge>
              )}
              <span className="text-cannabis-primary font-semibold">${component.price}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-background/30 rounded-lg">
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 text-lg font-bold text-cannabis-primary">
            <DollarSign className="w-4 h-4" />
            {sampleBuild.totalCost}
          </div>
          <p className="text-xs text-muted-foreground">Total Setup Cost</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 text-lg font-bold text-cannabis-primary">
            <Clock className="w-4 h-4" />
            ${sampleBuild.monthlyCost}
          </div>
          <p className="text-xs text-muted-foreground">Monthly Power Cost</p>
        </div>
      </div>

      <div className="space-y-3">
        <Button variant="outline" className="w-full" disabled>
          <Calculator className="w-4 h-4 mr-2" />
          Try Build Planner (Coming Soon)
        </Button>
        <p className="text-xs text-center text-muted-foreground">
          Full configurator launches with early access
        </p>
      </div>
    </Card>
  );
};

export default BuildPlannerPreview;