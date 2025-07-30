import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Users, 
  Wrench, 
  TrendingUp,
  Activity,
  AlertTriangle,
  CheckCircle
} from "lucide-react";

export default function AdminDashboard() {
  const stats = [
    {
      title: "Total Articles",
      value: "24",
      change: "+2 this week",
      icon: FileText,
      trend: "up"
    },
    {
      title: "Active Users",
      value: "1,284",
      change: "+12% this month",
      icon: Users,
      trend: "up"
    },
    {
      title: "Build Components",
      value: "156",
      change: "+8 new items",
      icon: Wrench,
      trend: "up"
    },
    {
      title: "Page Views",
      value: "12,345",
      change: "+5.2% vs last week",
      icon: TrendingUp,
      trend: "up"
    }
  ];

  const recentActivity = [
    { action: "New article published", item: "LED Growing Guide", time: "2 hours ago", type: "success" },
    { action: "Build component added", item: "Mars Hydro TS 1000", time: "4 hours ago", type: "info" },
    { action: "User content flagged", item: "Grow journal entry", time: "6 hours ago", type: "warning" },
    { action: "Strain database updated", item: "Blue Dream genetics", time: "1 day ago", type: "success" },
  ];

  const pendingTasks = [
    { task: "Review 3 pending articles", priority: "high" },
    { task: "Moderate 5 user submissions", priority: "medium" },
    { task: "Update component prices", priority: "low" },
    { task: "Export analytics report", priority: "medium" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
        <p className="text-muted-foreground">Manage your grow platform and monitor performance</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${
                  activity.type === 'success' ? 'bg-green-500' :
                  activity.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                }`} />
                <div className="flex-1">
                  <p className="text-sm font-medium">{activity.action}</p>
                  <p className="text-xs text-muted-foreground">{activity.item}</p>
                </div>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Pending Tasks */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              Pending Tasks
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {pendingTasks.map((task, index) => (
              <div key={index} className="flex items-center justify-between">
                <p className="text-sm">{task.task}</p>
                <Badge variant={
                  task.priority === 'high' ? 'destructive' :
                  task.priority === 'medium' ? 'secondary' : 'outline'
                }>
                  {task.priority}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
              <FileText className="h-8 w-8 text-primary mb-2" />
              <h3 className="font-medium">Create Article</h3>
              <p className="text-sm text-muted-foreground">Add new educational content</p>
            </div>
            <div className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
              <Wrench className="h-8 w-8 text-primary mb-2" />
              <h3 className="font-medium">Add Component</h3>
              <p className="text-sm text-muted-foreground">Expand build catalog</p>
            </div>
            <div className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
              <TrendingUp className="h-8 w-8 text-primary mb-2" />
              <h3 className="font-medium">View Analytics</h3>
              <p className="text-sm text-muted-foreground">Check performance metrics</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}