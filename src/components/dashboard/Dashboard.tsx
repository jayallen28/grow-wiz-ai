import { AlertPanel } from './AlertPanel';
import { QuickActions } from './QuickActions';
import BuildPlannerCard from './BuildPlannerCard';
import { DatabaseGrowCycle } from '@/hooks/useGrowCycles';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CalendarDays, Sprout, BookOpen, Calculator, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

interface DashboardProps {
  currentGrow: DatabaseGrowCycle | null;
  alerts: any[];
  environmentData: any;
}

export function Dashboard({ currentGrow, alerts, environmentData }: DashboardProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 bg-gradient-primary bg-clip-text text-transparent">
          Welcome Back
        </h1>
        <p className="text-xl text-muted-foreground">
          Manage your grows, plan builds, and track your journey
        </p>
      </div>

      {alerts.length > 0 && (
        <div className="mb-8">
          <AlertPanel alerts={alerts} onDismiss={() => {}} />
        </div>
      )}

      {/* Current Grow Overview */}
      {currentGrow ? (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sprout className="h-5 w-5 text-primary" />
              Current Grow: {currentGrow.name}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">Day {currentGrow.current_day || 1}</p>
                <p className="text-sm text-muted-foreground">Current Day</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">{currentGrow.current_stage}</p>
                <p className="text-sm text-muted-foreground">Growth Stage</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">{currentGrow.plant_count}</p>
                <p className="text-sm text-muted-foreground">Plants</p>
              </div>
              <div className="flex items-center justify-center">
                <Button asChild>
                  <Link to="/journal">View Journal</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="mb-8 border-dashed">
          <CardContent className="py-8 text-center">
            <Sprout className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Active Grows</h3>
            <p className="text-muted-foreground mb-4">Start tracking your first grow cycle</p>
            <Button asChild>
              <Link to="/journal">
                <Plus className="h-4 w-4 mr-2" />
                Start New Grow
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Quick Access Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <Link to="/build-planner">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Calculator className="h-5 w-5 text-primary" />
                Build Planner
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Design your perfect grow setup with our component builder
              </p>
              <Button variant="outline" className="w-full">
                Plan Build →
              </Button>
            </CardContent>
          </Link>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <Link to="/journal">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <BookOpen className="h-5 w-5 text-primary" />
                Grow Journal
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Track your grow cycles and log daily observations
              </p>
              <Button variant="outline" className="w-full">
                Open Journal →
              </Button>
            </CardContent>
          </Link>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <Link to="/strains">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Sprout className="h-5 w-5 text-primary" />
                Strain Library
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Manage your strain collection and track genetics
              </p>
              <Button variant="outline" className="w-full">
                View Strains →
              </Button>
            </CardContent>
          </Link>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <BuildPlannerCard />
        </div>
        <div>
          <QuickActions onAction={() => {}} />
        </div>
      </div>
    </div>
  );
}