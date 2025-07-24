import { Navigation } from '@/components/layout/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MetricCard } from '@/components/dashboard/MetricCard';
import { Button } from '@/components/ui/button';
import { Beaker, Droplets, Activity, Plus, Calendar } from 'lucide-react';

const Nutrients = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Nutrient Management
            </h1>
            <p className="text-muted-foreground mt-1">
              Track pH, nutrients, and feeding schedules
            </p>
          </div>
          <Button variant="cannabis">
            <Plus className="h-4 w-4 mr-2" />
            Log Feeding
          </Button>
        </div>

        <div className="space-y-6">
          {/* Current Readings */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <MetricCard
              title="pH Level"
              value={6.8}
              icon={<Beaker className="h-4 w-4" />}
              status="warning"
              trend="up"
              trendValue="+0.3"
            />
            <MetricCard
              title="TDS/EC"
              value={1200}
              unit="ppm"
              icon={<Activity className="h-4 w-4" />}
              status="good"
              trend="stable"
              trendValue="±50"
            />
            <MetricCard
              title="Water Temp"
              value={68}
              unit="°F"
              icon={<Droplets className="h-4 w-4" />}
              status="good"
              trend="stable"
              trendValue="±2°F"
            />
            <MetricCard
              title="Reservoir Level"
              value={85}
              unit="%"
              icon={<Droplets className="h-4 w-4" />}
              status="normal"
              trend="down"
              trendValue="-15%"
            />
          </div>

          {/* Feeding Schedule & History */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Feeding Schedule
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 border border-border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Next Feeding</span>
                      <span className="text-sm text-warning">Due in 2 hours</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Bloom nutrients + Cal-Mag
                    </p>
                    <div className="mt-2 text-xs text-muted-foreground">
                      Target: 1300 ppm | pH: 6.2-6.5
                    </div>
                  </div>
                  
                  <div className="p-3 border border-border rounded-lg opacity-60">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Water Change</span>
                      <span className="text-sm text-muted-foreground">In 3 days</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Full reservoir change scheduled
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Feeding History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between py-2 border-b border-border/50">
                    <div>
                      <p className="text-sm font-medium">Bloom Feed</p>
                      <p className="text-xs text-muted-foreground">
                        1200 ppm, pH 6.5
                      </p>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      2 hours ago
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between py-2 border-b border-border/50">
                    <div>
                      <p className="text-sm font-medium">pH Adjustment</p>
                      <p className="text-xs text-muted-foreground">
                        7.2 → 6.5
                      </p>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      4 hours ago
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <p className="text-sm font-medium">Water Change</p>
                      <p className="text-xs text-muted-foreground">
                        Fresh nutrients added
                      </p>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      3 days ago
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Nutrient Chart */}
          <Card>
            <CardHeader>
              <CardTitle>pH & TDS Trends (7 days)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center text-muted-foreground">
                📊 pH & Nutrient Monitoring Chart
                <br />
                <span className="text-sm">(Chart integration coming soon)</span>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Quick pH Adjustment</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-center">
                  <span className="text-2xl font-bold">6.8</span>
                  <p className="text-sm text-muted-foreground">Current pH</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    pH Down
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    pH Up
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Nutrient Calculator</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-center">
                  <span className="text-2xl font-bold">1200</span>
                  <p className="text-sm text-muted-foreground">Current TDS (ppm)</p>
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  Calculate Feed
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Reservoir Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-center">
                  <span className="text-2xl font-bold">85%</span>
                  <p className="text-sm text-muted-foreground">Water Level</p>
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  Top Off Water
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Nutrients;