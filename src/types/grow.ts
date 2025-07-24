// Core data models for cannabis grow management

export interface StrainProfile {
  id: string;
  name: string;
  type: 'indica' | 'sativa' | 'hybrid';
  floweringTime: number; // weeks
  expectedYield: string;
  thcContent?: string;
  cbdContent?: string;
  growthPattern: 'compact' | 'stretchy' | 'medium';
  notes?: string;
  createdAt: Date;
}

export interface GrowStage {
  stage: 'seedling' | 'vegetative' | 'flowering' | 'harvest' | 'drying' | 'curing';
  startDate: Date;
  expectedDuration: number; // days
  currentDay: number;
}

export interface EnvironmentData {
  id: string;
  timestamp: Date;
  temperature: number; // °F
  humidity: number; // %
  pH: number;
  tds: number; // ppm
  waterTemp: number; // °F
  co2: number; // ppm
  lightIntensity?: number; // PPFD
  isManualEntry: boolean;
}

export interface NutrientLog {
  id: string;
  date: Date;
  nutrientType: string;
  amount: number;
  unit: 'ml' | 'grams' | 'tsp' | 'tbsp';
  targetPPM: number;
  actualPPM?: number;
  phBefore: number;
  phAfter: number;
  notes?: string;
}

export interface GrowLog {
  id: string;
  date: Date;
  growStage: GrowStage['stage'];
  dayInStage: number;
  photos: string[]; // URLs
  height?: number; // inches
  notes: string;
  environmentData?: EnvironmentData;
  nutrients?: NutrientLog[];
  actions: string[]; // ['watered', 'trained', 'defoliated', etc.]
  issues?: string[];
}

export interface GrowCycle {
  id: string;
  name: string;
  strain: StrainProfile;
  startDate: Date;
  endDate?: Date;
  currentStage: GrowStage;
  plantCount: number;
  medium: 'dwc' | 'soil' | 'coco' | 'rockwool' | 'perlite' | 'other';
  logs: GrowLog[];
  totalYield?: number;
  status: 'active' | 'completed' | 'failed';
  notes?: string;
}

export interface Alert {
  id: string;
  type: 'warning' | 'error' | 'info';
  title: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
  action?: string;
}

export interface AutomationSettings {
  co2Target: {
    vegetative: number;
    flowering: number;
  };
  temperatureRange: {
    min: number;
    max: number;
  };
  humidityRange: {
    vegetative: { min: number; max: number };
    flowering: { min: number; max: number };
  };
  phRange: {
    min: number;
    max: number;
  };
  lightSchedule: {
    vegetative: { on: string; off: string };
    flowering: { on: string; off: string };
  };
}