import { Camera, Droplets, Thermometer, Sprout, Settings, Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface QuickActionsProps {
  onAction: (action: string) => void;
}

export function QuickActions({ onAction }: QuickActionsProps) {
  const actions = [
    {
      id: 'add-log',
      label: 'Add Log Entry',
      icon: Plus,
      variant: 'cannabis' as const,
    },
    {
      id: 'take-photo',
      label: 'Take Photo',
      icon: Camera,
      variant: 'outline' as const,
    },
    {
      id: 'water-plants',
      label: 'Water/Feed',
      icon: Droplets,
      variant: 'outline' as const,
    },
    {
      id: 'check-environment',
      label: 'Environment',
      icon: Thermometer,
      variant: 'outline' as const,
    },
    {
      id: 'plant-training',
      label: 'Training',
      icon: Sprout,
      variant: 'outline' as const,
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      variant: 'outline' as const,
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {actions.map((action) => {
            const Icon = action.icon;
            return (
              <Button
                key={action.id}
                variant={action.variant}
                size="sm"
                className="h-auto p-3 flex flex-col gap-2"
                onClick={() => onAction(action.id)}
              >
                <Icon className="h-5 w-5" />
                <span className="text-xs">{action.label}</span>
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}