import { useState } from 'react';
import { Thermometer, Droplets, Beaker, Wind, Sun, Activity } from 'lucide-react';
import { MetricCard } from './MetricCard';
import { AlertPanel } from './AlertPanel';
import { QuickActions } from './QuickActions';
import BuildPlannerCard from './BuildPlannerCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, GrowCycle } from '@/types/grow';

interface DashboardProps {
  currentGrow?: GrowCycle;
}

export function Dashboard({ currentGrow }: DashboardProps) {
  // Mock data - in real app this would come from props/context
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: '1',
      type: 'warning',
      title: 'pH Drift Detected',
      message: 'pH has risen to 6.8, consider adjusting',
      timestamp: new Date(),
      isRead: false,
      action: 'Adjust pH'
    },
    {
      id: '2',
      type: 'info',
      title: 'Feeding Schedule',
      message: 'Next feeding due in 2 hours',
      timestamp: new Date(),
      isRead: false,
    },
  ]);

  const mockEnvironmentData = {
    temperature: 76,
    humidity: 65,
    pH: 6.8,
    tds: 1200,
    waterTemp: 68,
    co2: 1200,
  };

  const handleDismissAlert = (alertId: string) => {
    setAlerts(alerts.map(alert => 
      alert.id === alertId ? { ...alert, isRead: true } : alert
    ));
  };

  const handleQuickAction = (action: string) => {
    console.log('Quick action:', action);
    // Handle quick actions - navigate to appropriate page or open modal
  };

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'seedling':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'vegetative':
        return 'bg-primary/20 text-primary border-primary/30';
      case 'flowering':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'harvest':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default:
        return 'bg-muted/20 text-muted-foreground border-muted/30';
    }
  };

  return (
    <div className="space-y-6">
      {/* Current Grow Info */}
      {currentGrow && (
        <Card className="bg-gradient-card border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Current Grow: {currentGrow.name}</span>
              <Badge className={getStageColor(currentGrow.currentStage.stage)}>
                {currentGrow.currentStage.stage.charAt(0).toUpperCase() + 
                 currentGrow.currentStage.stage.slice(1)}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Strain</p>
                <p className="font-medium">{currentGrow.strain.name}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Day in Stage</p>
                <p className="font-medium">{currentGrow.currentStage.currentDay}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Plant Count</p>
                <p className="font-medium">{currentGrow.plantCount}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Medium</p>
                <p className="font-medium">{currentGrow.medium.toUpperCase()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Environmental Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <MetricCard
          title="Temperature"
          value={mockEnvironmentData.temperature}
          unit="°F"
          icon={<Thermometer className="h-4 w-4" />}
          status="normal"
          trend="stable"
          trendValue="±1°F"
        />
        <MetricCard
          title="Humidity"
          value={mockEnvironmentData.humidity}
          unit="%"
          icon={<Droplets className="h-4 w-4" />}
          status="normal"
          trend="stable"
          trendValue="±2%"
        />
        <MetricCard
          title="pH Level"
          value={mockEnvironmentData.pH}
          icon={<Beaker className="h-4 w-4" />}
          status="warning"
          trend="up"
          trendValue="+0.3"
        />
        <MetricCard
          title="TDS"
          value={mockEnvironmentData.tds}
          unit="ppm"
          icon={<Activity className="h-4 w-4" />}
          status="good"
          trend="stable"
          trendValue="±50 ppm"
        />
        <MetricCard
          title="Water Temp"
          value={mockEnvironmentData.waterTemp}
          unit="°F"
          icon={<Thermometer className="h-4 w-4" />}
          status="good"
          trend="stable"
          trendValue="±2°F"
        />
        <MetricCard
          title="CO₂"
          value={mockEnvironmentData.co2}
          unit="ppm"
          icon={<Wind className="h-4 w-4" />}
          status="normal"
          trend="stable"
          trendValue="±100 ppm"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Alerts Panel */}
        <div className="lg:col-span-2">
          <AlertPanel alerts={alerts} onDismiss={handleDismissAlert} />
        </div>

        {/* Right Panel */}
        <div className="space-y-6">
          <QuickActions onAction={handleQuickAction} />
          <BuildPlannerCard />
        </div>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b border-border/50">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-sm">Fed plants with bloom nutrients</span>
              </div>
              <span className="text-xs text-muted-foreground">2 hours ago</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-border/50">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-warning rounded-full"></div>
                <span className="text-sm">pH adjusted from 7.2 to 6.5</span>
              </div>
              <span className="text-xs text-muted-foreground">4 hours ago</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span className="text-sm">Defoliation completed</span>
              </div>
              <span className="text-xs text-muted-foreground">1 day ago</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}