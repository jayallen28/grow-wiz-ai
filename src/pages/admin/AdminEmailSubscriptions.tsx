import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useEmailSubscriptions } from '@/hooks/useEmailSubscriptions';
import { format } from 'date-fns';
import { Mail, Users, Calendar, Download } from 'lucide-react';

interface EmailSubscription {
  id: string;
  email: string;
  subscribed_at: string;
  is_active: boolean;
  user_agent?: string;
}

export default function AdminEmailSubscriptions() {
  const [subscriptions, setSubscriptions] = useState<EmailSubscription[]>([]);
  const [loading, setLoading] = useState(true);
  const { getSubscriptions, updateSubscription } = useEmailSubscriptions();

  const loadSubscriptions = async () => {
    setLoading(true);
    const data = await getSubscriptions();
    setSubscriptions(data);
    setLoading(false);
  };

  useEffect(() => {
    loadSubscriptions();
  }, []);

  const handleToggleActive = async (id: string, isActive: boolean) => {
    const success = await updateSubscription(id, { is_active: isActive });
    if (success) {
      setSubscriptions(prev => 
        prev.map(sub => 
          sub.id === id ? { ...sub, is_active: isActive } : sub
        )
      );
    }
  };

  const exportToCsv = () => {
    const csvContent = [
      ['Email', 'Subscribed At', 'Status'],
      ...subscriptions.map(sub => [
        sub.email,
        format(new Date(sub.subscribed_at), 'yyyy-MM-dd HH:mm:ss'),
        sub.is_active ? 'Active' : 'Inactive'
      ])
    ]
      .map(row => row.map(cell => `"${cell}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `email_subscriptions_${format(new Date(), 'yyyy-MM-dd')}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const stats = {
    total: subscriptions.length,
    active: subscriptions.filter(sub => sub.is_active).length,
    inactive: subscriptions.filter(sub => !sub.is_active).length,
    thisWeek: subscriptions.filter(sub => {
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return new Date(sub.subscribed_at) > weekAgo;
    }).length
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Email Subscriptions</h1>
        </div>
        <div className="grid gap-4 md:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-16 bg-muted rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Email Subscriptions</h1>
          <p className="text-muted-foreground">Manage newsletter and early access subscriptions</p>
        </div>
        <Button onClick={exportToCsv} variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Export CSV
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Users className="w-8 h-8 text-primary" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Subscribers</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Mail className="w-8 h-8 text-green-600" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active</p>
                <p className="text-2xl font-bold">{stats.active}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Mail className="w-8 h-8 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Inactive</p>
                <p className="text-2xl font-bold">{stats.inactive}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Calendar className="w-8 h-8 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">This Week</p>
                <p className="text-2xl font-bold">{stats.thisWeek}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Subscriptions Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Subscriptions</CardTitle>
          <CardDescription>
            View and manage all email subscriptions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {subscriptions.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No email subscriptions yet.
              </div>
            ) : (
              <div className="space-y-2">
                {subscriptions.map((subscription) => (
                  <div
                    key={subscription.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50"
                  >
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <p className="font-medium">{subscription.email}</p>
                        <Badge variant={subscription.is_active ? "default" : "secondary"}>
                          {subscription.is_active ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Subscribed {format(new Date(subscription.subscribed_at), 'MMM d, yyyy')} at{' '}
                        {format(new Date(subscription.subscribed_at), 'h:mm a')}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={subscription.is_active}
                        onCheckedChange={(checked) => handleToggleActive(subscription.id, checked)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}