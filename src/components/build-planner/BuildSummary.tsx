import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Trash2, DollarSign, Zap, Calculator } from 'lucide-react';
import { BuildComponent, ComponentCategory, PowerCostCalculation, BuildComponentWithQuantity } from '@/types/buildPlanner';
import { useState } from 'react';

interface BuildSummaryProps {
  selectedComponents: {
    [category in ComponentCategory]?: BuildComponentWithQuantity[];
  };
  totalCost: number;
  totalPower: number;
  onRemoveComponent: (componentId: string, category: ComponentCategory) => void;
  onUpdateQuantity: (componentId: string, category: ComponentCategory, quantity: number) => void;
}

const BuildSummary = ({ selectedComponents, totalCost, totalPower, onRemoveComponent, onUpdateQuantity }: BuildSummaryProps) => {
  const [electricityRate, setElectricityRate] = useState(0.12); // Default to $0.12/kWh
  const [hoursPerDay, setHoursPerDay] = useState(18); // Default to 18 hours for vegetative stage

  const allComponents = Object.entries(selectedComponents).flatMap(([category, components]) =>
    components?.map(component => ({ ...component, category: category as ComponentCategory })) || []
  );

  const calculatePowerCost = (): PowerCostCalculation => {
    const dailyConsumption = (totalPower * hoursPerDay) / 1000; // Convert to kWh
    const monthlyConsumption = dailyConsumption * 30;
    const dailyCost = dailyConsumption * electricityRate;
    const monthlyCost = monthlyConsumption * electricityRate;
    const annualCost = monthlyCost * 12;

    return {
      dailyConsumption,
      monthlyConsumption,
      dailyCost,
      monthlyCost,
      annualCost,
      electricityRate
    };
  };

  const powerCost = calculatePowerCost();

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="w-5 h-5" />
          Build Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Selected Components */}
        <div>
          <h4 className="font-semibold mb-3">Selected Components ({allComponents.length})</h4>
          {allComponents.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">
              No components selected yet
            </p>
          ) : (
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {allComponents.map((component) => (
                <div key={component.id} className="flex items-center justify-between p-2 bg-accent/20 rounded-lg">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      {component.name}
                      {component.isCustom && <Badge variant="secondary" className="ml-2 text-xs">Custom</Badge>}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-primary font-semibold">
                        ${component.price.toFixed(2)} {component.quantity > 1 && `x${component.quantity} = $${(component.price * component.quantity).toFixed(2)}`}
                      </span>
                      {component.powerConsumption > 0 && (
                        <Badge variant="outline" className="text-xs">
                          <Zap className="w-2 h-2 mr-1" />
                          {component.powerConsumption}W{component.quantity > 1 && ` x${component.quantity}`}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="flex items-center">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => onUpdateQuantity(component.id, component.category, component.quantity - 1)}
                        className="h-6 w-6 p-0"
                      >
                        -
                      </Button>
                      <span className="text-xs font-medium w-6 text-center">{component.quantity}</span>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => onUpdateQuantity(component.id, component.category, component.quantity + 1)}
                        className="h-6 w-6 p-0"
                      >
                        +
                      </Button>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onRemoveComponent(component.id, component.category)}
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <Separator />

        {/* Cost Summary */}
        <div>
          <h4 className="font-semibold mb-3">Cost Summary</h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm">Equipment Total:</span>
              <span className="font-semibold text-primary">${totalCost.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Total Power:</span>
              <span className="font-semibold">{totalPower}W</span>
            </div>
          </div>
        </div>

        <Separator />

        {/* Power Cost Calculator */}
        <div>
          <h4 className="font-semibold mb-3">Power Cost Calculator</h4>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="electricity-rate" className="text-xs">
                  Electricity Rate ($/kWh)
                </Label>
                <Input
                  id="electricity-rate"
                  type="number"
                  step="0.01"
                  value={electricityRate}
                  onChange={(e) => setElectricityRate(parseFloat(e.target.value) || 0)}
                  className="h-8 text-sm"
                />
              </div>
              <div>
                <Label htmlFor="hours-per-day" className="text-xs">
                  Hours/Day
                </Label>
                <Input
                  id="hours-per-day"
                  type="number"
                  value={hoursPerDay}
                  onChange={(e) => setHoursPerDay(parseInt(e.target.value) || 0)}
                  className="h-8 text-sm"
                />
              </div>
            </div>

            {totalPower > 0 && (
              <div className="space-y-2 p-3 bg-accent/10 rounded-lg">
                <div className="flex justify-between text-sm">
                  <span>Daily Cost:</span>
                  <span className="font-semibold">${powerCost.dailyCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Monthly Cost:</span>
                  <span className="font-semibold text-primary">${powerCost.monthlyCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Annual Cost:</span>
                  <span className="font-semibold">${powerCost.annualCost.toFixed(2)}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        <Separator />

        {/* Actions */}
        <div className="space-y-2">
          <Button className="w-full" disabled={allComponents.length === 0}>
            <DollarSign className="w-4 h-4 mr-2" />
            Save Build Configuration
          </Button>
          <Button variant="outline" className="w-full" disabled={allComponents.length === 0}>
            Share Build
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BuildSummary;