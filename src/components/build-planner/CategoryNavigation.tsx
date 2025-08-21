import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  Home, 
  Lightbulb, 
  Wind, 
  Filter, 
  Beaker, 
  DropletIcon, 
  Settings,
  Zap
} from 'lucide-react';
import { ComponentCategory } from '@/types/buildPlanner';

const categoryConfig: Record<ComponentCategory, { label: string; icon: any; description: string }> = {
  'grow-tent': { 
    label: 'Grow Tents', 
    icon: Home,
    description: 'Complete growing environments'
  },
  'led-light': { 
    label: 'LED Lights', 
    icon: Lightbulb,
    description: 'Full spectrum grow lights'
  },
  'ventilation': { 
    label: 'Ventilation', 
    icon: Wind,
    description: 'Fans and air circulation'
  },
  'carbon-filter': { 
    label: 'Carbon Filters', 
    icon: Filter,
    description: 'Odor control systems'
  },
  'ph-meter': { 
    label: 'pH Meters', 
    icon: Beaker,
    description: 'Testing and monitoring'
  },
  'nutrients': { 
    label: 'Nutrients', 
    icon: DropletIcon,
    description: 'Plant feeding solutions'
  },
  'accessories': { 
    label: 'Accessories', 
    icon: Settings,
    description: 'Timers, tools & extras'
  },
  'tds-meter': { label: 'TDS Meters', icon: Beaker, description: 'Water quality testing' },
  'timer': { label: 'Timers', icon: Settings, description: 'Automation timers' },
  'thermometer': { label: 'Thermometers', icon: Settings, description: 'Temperature monitoring' },
  'hygrometer': { label: 'Hygrometers', icon: Settings, description: 'Humidity monitoring' },
  'co2-controller': { label: 'CO2 Controllers', icon: Settings, description: 'CO2 management' },
  'grow-medium': { label: 'Growing Medium', icon: Settings, description: 'Soil and substrates' },
  'pots': { label: 'Pots & Containers', icon: Settings, description: 'Plant containers' },
  'ducting': { label: 'Ducting', icon: Wind, description: 'Air flow ducting' },
  'oscillating-fan': { label: 'Oscillating Fans', icon: Wind, description: 'Air circulation' },
  'dehumidifier': { label: 'Dehumidifiers', icon: Wind, description: 'Humidity control' },
  'humidifier': { label: 'Humidifiers', icon: Wind, description: 'Add humidity' },
  'arduino-kit': { label: 'Arduino Kits', icon: Zap, description: 'DIY automation' },
  'sensors': { label: 'Sensors', icon: Beaker, description: 'Environmental sensors' }
};

interface CategoryNavigationProps {
  selectedCategory: ComponentCategory;
  onCategoryChange: (category: ComponentCategory) => void;
  componentCounts: Partial<Record<ComponentCategory, number>>;
}

export default function CategoryNavigation({ 
  selectedCategory, 
  onCategoryChange, 
  componentCounts 
}: CategoryNavigationProps) {
  return (
    <Card className="p-4">
      <div className="space-y-2">
        <h3 className="font-semibold text-lg mb-4">Component Categories</h3>
        {Object.entries(categoryConfig)
          .filter(([category]) => componentCounts[category as ComponentCategory] > 0)
          .map(([category, config]) => {
            const Icon = config.icon;
            const count = componentCounts[category as ComponentCategory] || 0;
            const isSelected = selectedCategory === category;
            
            return (
              <Button
                key={category}
                variant={isSelected ? "default" : "ghost"}
                className={`w-full justify-start h-auto p-4 ${
                  isSelected 
                    ? 'bg-primary text-primary-foreground' 
                    : 'hover:bg-muted/50'
                }`}
                onClick={() => onCategoryChange(category as ComponentCategory)}
              >
                <div className="flex items-center gap-3 w-full">
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  <div className="flex-1 text-left">
                    <div className="font-medium">{config.label}</div>
                    <div className={`text-xs ${
                      isSelected 
                        ? 'text-primary-foreground/70' 
                        : 'text-muted-foreground'
                    }`}>
                      {config.description}
                    </div>
                  </div>
                  {count > 0 && (
                    <div className={`text-xs px-2 py-1 rounded-full ${
                      isSelected 
                        ? 'bg-primary-foreground/20 text-primary-foreground' 
                        : 'bg-primary/20 text-primary'
                    }`}>
                      {count}
                    </div>
                  )}
                </div>
              </Button>
            );
          })}
      </div>
    </Card>
  );
}