import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronUp, ChevronDown, Save, Zap } from 'lucide-react';
import { BuildComponentWithQuantity, ComponentCategory } from '@/types/buildPlanner';
import BuildCategory from './BuildCategory';
import PowerCostCalculator from './PowerCostCalculator';

interface BuildSummaryProps {
  selectedComponents: {
    [category in ComponentCategory]?: BuildComponentWithQuantity[];
  };
  totalCost: number;
  totalPower: number;
  onRemoveComponent: (componentId: string, category: ComponentCategory) => void;
  onUpdateQuantity: (componentId: string, category: ComponentCategory, quantity: number) => void;
}

const BuildSummary = ({
  selectedComponents,
  totalCost,
  totalPower,
  onRemoveComponent,
  onUpdateQuantity,
}: BuildSummaryProps) => {
  const [expanded, setExpanded] = useState(false);
  const [showPowerCalc, setShowPowerCalc] = useState(false);
  const [collapsedCategories, setCollapsedCategories] = useState<{ [key: string]: boolean }>({});

  const categories = Object.keys(selectedComponents) as ComponentCategory[];

  const toggleCategory = (category: ComponentCategory) => {
    setCollapsedCategories((prev) => ({ ...prev, [category]: !prev[category] }));
  };

  const totalComponents = categories.reduce(
    (acc, cat) => acc + (selectedComponents[cat]?.length || 0),
    0
  );

  return (
    <div className="fixed bottom-0 left-0 w-full z-50">
      {/* Expanded Section */}
      {expanded && (
        <div className="animate-in slide-in-from-bottom-2 max-h-[70vh] overflow-y-auto backdrop-blur-md bg-[#0B070D]/80 shadow-lg px-6 pt-4 pb-2 space-y-6">
          {/* Expand/Collapse All Controls */}
          {!showPowerCalc && (
            <div className="flex justify-end gap-3">
              <Button size="sm" variant="outline" onClick={() => setCollapsedCategories({})}>
                <ChevronDown className="w-4 h-4" /> Expand All
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  const allCollapsed: { [key: string]: boolean } = {};
                  categories.forEach((cat) => (allCollapsed[cat] = true));
                  setCollapsedCategories(allCollapsed);
                }}
              >
                <ChevronUp className="w-4 h-4" /> Collapse All
              </Button>
            </div>
          )}

          {/* Categories */}
          {!showPowerCalc &&
            categories.map((category) => {
              const components = selectedComponents[category] || [];
              if (components.length === 0) return null;
              const collapsed = collapsedCategories[category];

              return (
                <BuildCategory
                  key={category}
                  category={category}
                  components={components}
                  collapsed={collapsed}
                  toggleCategory={() => toggleCategory(category)}
                  onRemoveComponent={onRemoveComponent}
                  onUpdateQuantity={onUpdateQuantity}
                />
              );
            })}

          {/* Power Cost Calculator */}
          {showPowerCalc && totalPower > 0 && (
            <PowerCostCalculator
              totalPower={totalPower}
              productCount={totalComponents}
              visible={showPowerCalc}
              onClose={() => setShowPowerCalc(false)}
            />
          )}
        </div>
      )}

      {/* Collapsed / Bottom Bar (click anywhere to toggle) */}
      <div
        className="flex items-center justify-between bg-[#1A111F]/90 border-t shadow-lg px-4 py-3 text-lg font-bold relative cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        {/* Left: Total (stacked labels) + Components pill */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-6 text-lg font-semibold">
            <div className="flex flex-col items-start">
              <span className="text-gray-400 text-xs">Total</span>
              <span className="text-green-500">${totalCost.toFixed(2)}</span>
            </div>
            <div className="flex flex-col items-start">
              <span className="text-gray-400 text-xs">Power</span>
              <span className="flex items-center text-yellow-400">
                <Zap className="w-4 h-4 mr-1" /> {totalPower}W
              </span>
            </div>
          </div>
          <Badge variant="secondary" className="text-sm px-2 py-0.5">
            {totalComponents} Components
          </Badge>
        </div>

        {/* Right: Buttons (don’t toggle the bar when clicking these) */}
        <div
          className="flex items-center gap-3"
          onClick={(e) => e.stopPropagation()}
        >
          {totalPower > 0 && (
            <Button
              size="sm"
              variant="outline"
              className="flex items-center gap-2"
              onClick={() => setShowPowerCalc((prev) => !prev)}
            >
              <Zap className="w-4 h-4" /> Calculator
            </Button>
          )}
          <Button
            size="sm"
            variant="default"
            className="bg-green-600 text-white flex items-center gap-2"
            onClick={() => alert('Save Build')}
          >
            <Save className="w-4 h-4" /> Save
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={(e) => {
              e.stopPropagation();
              setExpanded((prev) => !prev);
            }}
          >
            {expanded ? <ChevronDown className="w-5 h-5" /> : <ChevronUp className="w-5 h-5" />}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BuildSummary;
