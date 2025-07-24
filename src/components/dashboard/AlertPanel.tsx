import { AlertTriangle, CheckCircle, Info, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert as AlertType } from '@/types/grow';
import { cn } from '@/lib/utils';

interface AlertPanelProps {
  alerts: AlertType[];
  onDismiss: (alertId: string) => void;
}

export function AlertPanel({ alerts, onDismiss }: AlertPanelProps) {
  const getAlertIcon = (type: AlertType['type']) => {
    switch (type) {
      case 'error':
        return <AlertTriangle className="h-4 w-4" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4" />;
      case 'info':
        return <Info className="h-4 w-4" />;
      default:
        return <CheckCircle className="h-4 w-4" />;
    }
  };

  const getAlertColor = (type: AlertType['type']) => {
    switch (type) {
      case 'error':
        return 'border-destructive/30 bg-destructive/5 text-destructive';
      case 'warning':
        return 'border-warning/30 bg-warning/5 text-warning';
      case 'info':
        return 'border-primary/30 bg-primary/5 text-primary';
      default:
        return 'border-border bg-card text-foreground';
    }
  };

  const activeAlerts = alerts.filter(alert => !alert.isRead);

  if (activeAlerts.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-success" />
            System Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-success flex items-center gap-2">
            <CheckCircle className="h-4 w-4" />
            All systems normal
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-warning" />
            Active Alerts
          </span>
          <Badge variant="outline" className="text-warning">
            {activeAlerts.length}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {activeAlerts.slice(0, 5).map((alert) => (
          <div
            key={alert.id}
            className={cn(
              "p-3 rounded-lg border transition-smooth",
              getAlertColor(alert.type)
            )}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-2">
                {getAlertIcon(alert.type)}
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm">{alert.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {alert.message}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {alert.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 shrink-0"
                onClick={() => onDismiss(alert.id)}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
            {alert.action && (
              <Button
                variant="outline"
                size="sm"
                className="mt-2 text-xs"
              >
                {alert.action}
              </Button>
            )}
          </div>
        ))}
        {activeAlerts.length > 5 && (
          <p className="text-xs text-muted-foreground text-center">
            +{activeAlerts.length - 5} more alerts
          </p>
        )}
      </CardContent>
    </Card>
  );
}