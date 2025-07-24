import { Navigation } from '@/components/layout/Navigation';
import { Dashboard } from '@/components/dashboard/Dashboard';
import { GrowCycle, StrainProfile, GrowStage } from '@/types/grow';

// Mock data for development
const mockStrain: StrainProfile = {
  id: '1',
  name: 'Northern Lights',
  type: 'indica',
  floweringTime: 8,
  expectedYield: '400-500g/m²',
  thcContent: '18-22%',
  cbdContent: '<1%',
  growthPattern: 'compact',
  notes: 'Classic indica strain, great for beginners',
  createdAt: new Date(),
};

const mockGrowStage: GrowStage = {
  stage: 'flowering',
  startDate: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000), // 21 days ago
  expectedDuration: 56, // 8 weeks
  currentDay: 21,
};

const mockGrowCycle: GrowCycle = {
  id: '1',
  name: 'Northern Lights #1',
  strain: mockStrain,
  startDate: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000), // 90 days ago
  currentStage: mockGrowStage,
  plantCount: 4,
  medium: 'dwc',
  logs: [],
  status: 'active',
  notes: 'First DWC grow, learning the ropes',
};

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Grow Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            Monitor and manage your cannabis grow operation
          </p>
        </div>
        
        <Dashboard currentGrow={mockGrowCycle} />
      </main>
    </div>
  );
};

export default Index;
