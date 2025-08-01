import { Navigation } from '@/components/layout/Navigation';
import { Dashboard as DashboardComponent } from '@/components/dashboard/Dashboard';
import { useAuth } from '@/hooks/useAuth';
import { useGrowCycles } from '@/hooks/useGrowCycles';
import { useEnvironmentData } from '@/hooks/useEnvironmentData';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user, loading: authLoading } = useAuth();
  const { currentGrow, loading: growLoading } = useGrowCycles();
  const { latestReading } = useEnvironmentData(currentGrow?.id);
  const navigate = useNavigate();

  if (authLoading || growLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold">Welcome to GrowTracker</h1>
          <p className="text-muted-foreground">Please sign in to access your dashboard</p>
          <Button onClick={() => navigate('/auth')}>Sign In</Button>
        </div>
      </div>
    );
  }

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
        
        <DashboardComponent 
          currentGrow={currentGrow} 
          latestEnvironmentData={latestReading}
        />
      </main>
    </div>
  );
};

export default Dashboard;
