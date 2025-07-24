import { useState } from 'react';
import { Navigation } from '@/components/layout/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MetricCard } from '@/components/dashboard/MetricCard';
import { Thermometer, Droplets, Wind, Sun, Activity, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { EnvironmentSettingsModal } from '@/components/modals/EnvironmentSettingsModal';

const Environment = () => {
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Environment Control
            </h1>
            <p className="text-muted-foreground mt-1">
              Monitor and control your grow environment
            </p>
          </div>
          <Button variant="outline" onClick={() => setShowSettingsModal(true)}>
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>

        <div className="space-y-6">
          {/* Current Readings */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <MetricCard
              title="Air Temperature"
              value={76}
              unit="°F"
              icon={<Thermometer className="h-4 w-4" />}
              status="normal"
              trend="stable"
              trendValue="±1°F"
            />
            <MetricCard
              title="Humidity"
              value={65}
              unit="%"
              icon={<Droplets className="h-4 w-4" />}
              status="normal"
              trend="down"
              trendValue="-2%"
            />
            <MetricCard
              title="CO₂ Level"
              value={1200}
              unit="ppm"
              icon={<Wind className="h-4 w-4" />}
              status="good"
              trend="stable"
              trendValue="±50 ppm"
            />
            <MetricCard
              title="Light Intensity"
              value={850}
              unit="PPFD"
              icon={<Sun className="h-4 w-4" />}
              status="good"
              trend="stable"
              trendValue="Schedule"
            />
            <MetricCard
              title="VPD"
              value={1.2}
              unit="kPa"
              icon={<Activity className="h-4 w-4" />}
              status="good"
              trend="stable"
              trendValue="Optimal"
            />
          </div>

          {/* Environment Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Temperature & Humidity (24h)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-muted-foreground">
                  📊 Temperature & Humidity Chart
                  <br />
                  <span className="text-sm">(Chart integration coming soon)</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>CO₂ Levels (24h)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-muted-foreground">
                  📈 CO₂ Monitoring Chart
                  <br />
                  <span className="text-sm">(Chart integration coming soon)</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Control Panels */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Climate Control</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Temperature Target</span>
                  <span className="text-sm font-medium">75-77°F</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Humidity Target</span>
                  <span className="text-sm font-medium">60-65%</span>
                </div>
                <Button variant="outline" className="w-full" onClick={() => setShowSettingsModal(true)}>
                  Adjust Settings
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>CO₂ Controller</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Target Level</span>
                  <span className="text-sm font-medium">1200 ppm</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Status</span>
                  <span className="text-sm font-medium text-success">Active</span>
                </div>
                <Button variant="outline" className="w-full" onClick={() => setShowSettingsModal(true)}>
                  Configure CO₂
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Light Schedule</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Current Schedule</span>
                  <span className="text-sm font-medium">12/12</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Next Change</span>
                  <span className="text-sm font-medium">6:00 PM</span>
                </div>
                <Button variant="outline" className="w-full" onClick={() => setShowSettingsModal(true)}>
                  Edit Schedule
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <EnvironmentSettingsModal 
        open={showSettingsModal} 
        onOpenChange={setShowSettingsModal} 
      />
    </div>
  );
};

export default Environment;