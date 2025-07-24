import { Navigation } from '@/components/layout/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Settings as SettingsIcon, 
  Wifi, 
  Bell, 
  Shield, 
  Download,
  Upload,
  Trash2
} from 'lucide-react';

const Settings = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Settings
          </h1>
          <p className="text-muted-foreground mt-1">
            Configure your grow tracking preferences and integrations
          </p>
        </div>

        <div className="space-y-6">
          {/* Device Integrations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wifi className="h-5 w-5" />
                Device Integrations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                <div>
                  <h4 className="font-medium">Arduino Sensor Kit</h4>
                  <p className="text-sm text-muted-foreground">
                    Temperature, humidity, pH sensors
                  </p>
                </div>
                <Badge className="bg-destructive/20 text-destructive border-destructive/30">
                  Disconnected
                </Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                <div>
                  <h4 className="font-medium">CO₂ Controller</h4>
                  <p className="text-sm text-muted-foreground">
                    Automated CO₂ regulation
                  </p>
                </div>
                <Badge className="bg-warning/20 text-warning border-warning/30">
                  Setup Required
                </Badge>
              </div>
              
              <Button variant="outline" className="w-full">
                Add New Device
              </Button>
            </CardContent>
          </Card>

          {/* Alerts & Notifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Alerts & Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">pH Drift Alerts</h4>
                  <p className="text-sm text-muted-foreground">
                    Notify when pH goes outside target range
                  </p>
                </div>
                <Badge className="bg-success/20 text-success border-success/30">
                  Enabled
                </Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Temperature Alerts</h4>
                  <p className="text-sm text-muted-foreground">
                    Alert for temperature extremes
                  </p>
                </div>
                <Badge className="bg-success/20 text-success border-success/30">
                  Enabled
                </Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Feeding Reminders</h4>
                  <p className="text-sm text-muted-foreground">
                    Scheduled feeding notifications
                  </p>
                </div>
                <Badge className="bg-muted/20 text-muted-foreground border-muted/30">
                  Disabled
                </Badge>
              </div>
              
              <Button variant="outline" className="w-full">
                Configure Alerts
              </Button>
            </CardContent>
          </Card>

          {/* Data Management */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Data Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button variant="outline" className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Export Grow Data
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <Upload className="h-4 w-4" />
                  Import Data
                </Button>
              </div>
              
              <div className="p-3 border border-destructive/30 bg-destructive/5 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-destructive">Danger Zone</h4>
                    <p className="text-sm text-muted-foreground">
                      Permanently delete all grow data
                    </p>
                  </div>
                  <Button variant="destructive" size="sm">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete All Data
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Target Ranges */}
          <Card>
            <CardHeader>
              <CardTitle>Environmental Target Ranges</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-medium">Vegetative Stage</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Temperature:</span>
                      <span>75-80°F</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Humidity:</span>
                      <span>65-70%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">pH Range:</span>
                      <span>5.5-6.5</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">CO₂:</span>
                      <span>1000-1200 ppm</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-medium">Flowering Stage</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Temperature:</span>
                      <span>65-75°F</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Humidity:</span>
                      <span>50-60%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">pH Range:</span>
                      <span>6.0-6.8</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">CO₂:</span>
                      <span>1200-1500 ppm</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <Button variant="outline" className="w-full">
                Customize Ranges
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Settings;