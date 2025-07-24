export interface BuildComponent {
  id: string;
  name: string;
  brand: string;
  category: ComponentCategory;
  price: number;
  powerConsumption: number; // watts
  description: string;
  imageUrl?: string;
  affiliateUrl?: string;
  specifications: Record<string, string | number>;
  compatibility: string[]; // Compatible component IDs or categories
  dimensions: {
    length: number;
    width: number;
    height: number;
  };
  weight: number; // kg
  rating: number; // 1-5 stars
  reviewCount: number;
}

export type ComponentCategory = 
  | 'grow-tent'
  | 'led-light' 
  | 'ventilation'
  | 'carbon-filter'
  | 'nutrients'
  | 'ph-meter'
  | 'tds-meter'
  | 'timer'
  | 'thermometer'
  | 'hygrometer'
  | 'co2-controller'
  | 'grow-medium'
  | 'pots'
  | 'ducting'
  | 'oscillating-fan'
  | 'dehumidifier'
  | 'humidifier'
  | 'arduino-kit'
  | 'sensors'
  | 'accessories';

export interface BuildConfiguration {
  id: string;
  name: string;
  description?: string;
  components: {
    [category in ComponentCategory]?: BuildComponent[];
  };
  totalCost: number;
  totalPowerConsumption: number;
  estimatedMonthlyCost: number; // Based on local electricity rates
  spaceRequirements: {
    length: number;
    width: number;
    height: number;
  };
  createdAt: Date;
  updatedAt: Date;
  isPublic: boolean;
  tags: string[];
}

export interface PowerCostCalculation {
  dailyConsumption: number; // kWh
  monthlyConsumption: number; // kWh
  dailyCost: number; // USD
  monthlyCost: number; // USD
  annualCost: number; // USD
  electricityRate: number; // USD per kWh
}

export interface CompatibilityCheck {
  isCompatible: boolean;
  issues: string[];
  suggestions: string[];
}