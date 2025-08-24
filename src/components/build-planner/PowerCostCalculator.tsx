import { useState, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { BuildComponentWithQuantity, PowerCostCalculation } from '@/types/buildPlanner';

interface PowerCostCalculatorProps {
  totalPower: number;
  productCount: number;
  visible: boolean;
  onClose: () => void;
}

const PowerCostCalculator = ({ totalPower, productCount, visible, onClose }: PowerCostCalculatorProps) => {
  const [electricityRate, setElectricityRate] = useState(0.12); // $/kWh default
  const [hoursPerDay, setHoursPerDay] = useState(18); // default 18 hours/day
  const sectionRef = useRef<HTMLDivElement | null>(null);

  const calculatePowerCost = (): PowerCostCalculation => {
    const dailyConsumption = (totalPower * hoursPerDay) / 1000; // kWh
    const monthlyConsumption = dailyConsumption * 30;
    const dailyCost = dailyConsumption * electricityRate;
    const monthlyCost = monthlyConsumption * electricityRate;
    const annualCost = monthlyCost * 12;

    return { dailyConsumption, monthlyConsumption, dailyCost, monthlyCost, annualCost, electricityRate };
  };

  const powerCost = calculatePowerCost();

  // Auto-scroll when visible
  useEffect(() => {
    if (visible && sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      ref={sectionRef}
      className="space-y-4 p-4 bg-[#0B070D]/70 backdrop-blur-md rounded-lg shadow-lg"
    >
      {/* Header */}
      <div className="flex justify-between items-center">
        <h4 className="text-xl font-semibold text-gray-200">Power Cost Calculator</h4>
        <button
          onClick={onClose}
          className="text-gray-300 hover:text-gray-100 transition"
        >
          ✕
        </button>
      </div>

      {/* Build Summary */}
      <div className="grid grid-cols-2 gap-4 bg-[#1A111F]/60 rounded-lg p-3 text-gray-200">
        <div className="flex flex-col items-center">
          <span className="text-sm text-gray-400">Total Products</span>
          <span className="text-lg font-bold">{productCount}</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-sm text-gray-400">Total Watts</span>
          <span className="text-lg font-bold">{totalPower}W</span>
        </div>
      </div>

      {/* Inputs */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="electricity-rate" className="text-sm text-gray-300">
            Electricity Rate ($/kWh)
          </Label>
          <Input
            id="electricity-rate"
            type="number"
            step="0.01"
            value={electricityRate}
            onChange={(e) => setElectricityRate(parseFloat(e.target.value) || 0)}
            className="h-10 text-base"
          />
        </div>
        <div>
          <Label htmlFor="hours-per-day" className="text-sm text-gray-300">
            Hours/Day
          </Label>
          <Input
            id="hours-per-day"
            type="number"
            value={hoursPerDay}
            onChange={(e) => setHoursPerDay(parseInt(e.target.value) || 0)}
            className="h-10 text-base"
          />
        </div>
      </div>

      {/* Results */}
      <div className="space-y-2 p-3 bg-[#1A111F]/60 rounded-lg text-gray-200">
        <div className="flex justify-between font-semibold">
          <span>Daily Cost:</span>
          <span>${powerCost.dailyCost.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-semibold">
          <span>Monthly Cost:</span>
          <span>${powerCost.monthlyCost.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-semibold">
          <span>Annual Cost:</span>
          <span>${powerCost.annualCost.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default PowerCostCalculator;
