import { useState } from 'react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Mail, Trash2, Download, Search, Users } from 'lucide-react';
import { useEmailSubscriptions } from '@/hooks/useEmailSubscriptions';
import { format } from 'date-fns';

const AdminSubscriptions = () => {
  const { subscriptions, loading, updateSubscription, deleteSubscription } = useEmailSubscriptions();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSubscriptions = subscriptions.filter(sub =>
    sub.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const activeSubscriptions = subscriptions.filter(sub => sub.is_active);

  const handleToggleActive = async (id: string, currentStatus: boolean) => {
    await updateSubscription(id, { is_active: !currentStatus });
  };

  const handleDelete = async (id: string) => {
    await deleteSubscription(id);
  };

  const exportToCSV = () => {
    const csvContent = [
      ['Email', 'Subscribed At', 'Status', 'User Agent'].join(','),
      ...filteredSubscriptions.map(sub => [
        sub.email,
        format(new Date(sub.subscribed_at), 'yyyy-MM-dd HH:mm:ss'),
        sub.is_active ? 'Active' : 'Inactive',
        `"${sub.user_agent || ''}"`
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `email-subscriptions-${format(new Date(), 'yyyy-MM-dd')}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-muted rounded w-1/4"></div>
          <div className="h-32 bg-muted rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Email Subscriptions</h1>
            <p className="text-muted-foreground">
              Manage newsletter and early access subscriptions
            </p>
          </div>
          <Button onClick={exportToCSV} variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Export CSV
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Subscriptions</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{subscriptions.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Subscribers</CardTitle>
              <Mail className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeSubscriptions.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Growth Rate</CardTitle>
              <Mail className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {subscriptions.length > 0 ? 
                  Math.round((activeSubscriptions.length / subscriptions.length) * 100) : 0}%
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardHeader>
            <CardTitle>Subscription Management</CardTitle>
            <CardDescription>
              View and manage all email subscriptions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>

            {/* Subscriptions Table */}
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Email</TableHead>
                    <TableHead>Subscribed</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>User Agent</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSubscriptions.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                        {searchTerm ? 'No subscriptions found matching your search.' : 'No subscriptions yet.'}
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredSubscriptions.map((subscription) => (
                      <TableRow key={subscription.id}>
                        <TableCell className="font-medium">
                          {subscription.email}
                        </TableCell>
                        <TableCell>
                          {format(new Date(subscription.subscribed_at), 'MMM dd, yyyy HH:mm')}
                        </TableCell>
                        <TableCell>
                          <Badge variant={subscription.is_active ? "default" : "secondary"}>
                            {subscription.is_active ? 'Active' : 'Inactive'}
                          </Badge>
                        </TableCell>
                        <TableCell className="max-w-xs truncate text-sm text-muted-foreground">
                          {subscription.user_agent || 'N/A'}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Switch
                              checked={subscription.is_active}
                              onCheckedChange={() => handleToggleActive(subscription.id, subscription.is_active)}
                            />
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Delete Subscription</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to delete the subscription for {subscription.email}? 
                                    This action cannot be undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction 
                                    onClick={() => handleDelete(subscription.id)}
                                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                  >
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
  );
};

export default AdminSubscriptions;