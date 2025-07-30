import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Search, 
  Eye, 
  CheckCircle, 
  XCircle, 
  Flag,
  Filter,
  Download,
  MessageSquare,
  BookOpen,
  Leaf
} from "lucide-react";

export default function AdminUserContent() {
  const [searchTerm, setSearchTerm] = useState("");

  const journalEntries = [
    {
      id: 1,
      title: "Week 4 - Flowering Started",
      user: "GrowMaster420",
      strain: "Blue Dream",
      dateCreated: "2024-01-15",
      status: "approved",
      flags: 0,
      views: 156
    },
    {
      id: 2,
      title: "First Time Grower - Need Help",
      user: "Newbie2024",
      strain: "White Widow",
      dateCreated: "2024-01-14",
      status: "pending",
      flags: 2,
      views: 89
    },
    {
      id: 3,
      title: "Harvest Results - Amazing Yield!",
      user: "ProGrower",
      strain: "Gorilla Glue",
      dateCreated: "2024-01-12",
      status: "flagged",
      flags: 5,
      views: 234
    }
  ];

  const buildConfigs = [
    {
      id: 1,
      name: "Budget 2x2 Setup",
      user: "BudgetGrower",
      totalCost: 450,
      components: 8,
      dateCreated: "2024-01-15",
      status: "public",
      likes: 23,
      saves: 12
    },
    {
      id: 2,
      name: "Premium 4x4 Build",
      user: "TechGrower",
      totalCost: 1200,
      components: 15,
      dateCreated: "2024-01-13",
      status: "private",
      likes: 45,
      saves: 28
    }
  ];

  const userStrains = [
    {
      id: 1,
      name: "Custom Purple Haze",
      user: "BreederJoe",
      genetics: "Purple Haze x Unknown",
      dateAdded: "2024-01-14",
      status: "pending",
      reports: 0
    },
    {
      id: 2,
      name: "Homegrown Special",
      user: "LocalGrower",
      genetics: "Bag Seed",
      dateAdded: "2024-01-10",
      status: "approved",
      reports: 1
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
      case 'public':
        return <Badge variant="default">Approved</Badge>;
      case 'pending':
        return <Badge variant="secondary">Pending</Badge>;
      case 'flagged':
        return <Badge variant="destructive">Flagged</Badge>;
      case 'private':
        return <Badge variant="outline">Private</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">User Content Management</h1>
        <p className="text-muted-foreground">Moderate and manage user-generated content</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Submissions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">342</div>
            <p className="text-xs text-muted-foreground">+15 this week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Need attention</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Flagged Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Require moderation</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
      </div>

      {/* Content Tabs */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>User Content</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <Download className="h-4 w-4" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="journal" className="space-y-4">
            <TabsList>
              <TabsTrigger value="journal" className="gap-2">
                <BookOpen className="h-4 w-4" />
                Journal Entries
              </TabsTrigger>
              <TabsTrigger value="builds" className="gap-2">
                <MessageSquare className="h-4 w-4" />
                Build Configs
              </TabsTrigger>
              <TabsTrigger value="strains" className="gap-2">
                <Leaf className="h-4 w-4" />
                User Strains
              </TabsTrigger>
            </TabsList>

            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search content..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <TabsContent value="journal">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Strain</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Flags</TableHead>
                    <TableHead>Views</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {journalEntries.map((entry) => (
                    <TableRow key={entry.id}>
                      <TableCell className="font-medium">{entry.title}</TableCell>
                      <TableCell>{entry.user}</TableCell>
                      <TableCell>{entry.strain}</TableCell>
                      <TableCell>{entry.dateCreated}</TableCell>
                      <TableCell>{getStatusBadge(entry.status)}</TableCell>
                      <TableCell>
                        {entry.flags > 0 && (
                          <div className="flex items-center gap-1 text-red-500">
                            <Flag className="h-3 w-3" />
                            {entry.flags}
                          </div>
                        )}
                      </TableCell>
                      <TableCell>{entry.views}</TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <XCircle className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="builds">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Build Name</TableHead>
                    <TableHead>Creator</TableHead>
                    <TableHead>Total Cost</TableHead>
                    <TableHead>Components</TableHead>
                    <TableHead>Date Created</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Engagement</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {buildConfigs.map((build) => (
                    <TableRow key={build.id}>
                      <TableCell className="font-medium">{build.name}</TableCell>
                      <TableCell>{build.user}</TableCell>
                      <TableCell>${build.totalCost}</TableCell>
                      <TableCell>{build.components} items</TableCell>
                      <TableCell>{build.dateCreated}</TableCell>
                      <TableCell>{getStatusBadge(build.status)}</TableCell>
                      <TableCell>
                        <div className="text-sm text-muted-foreground">
                          {build.likes} likes, {build.saves} saves
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <XCircle className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="strains">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Strain Name</TableHead>
                    <TableHead>Contributor</TableHead>
                    <TableHead>Genetics</TableHead>
                    <TableHead>Date Added</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Reports</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {userStrains.map((strain) => (
                    <TableRow key={strain.id}>
                      <TableCell className="font-medium">{strain.name}</TableCell>
                      <TableCell>{strain.user}</TableCell>
                      <TableCell>{strain.genetics}</TableCell>
                      <TableCell>{strain.dateAdded}</TableCell>
                      <TableCell>{getStatusBadge(strain.status)}</TableCell>
                      <TableCell>
                        {strain.reports > 0 && (
                          <div className="flex items-center gap-1 text-red-500">
                            <Flag className="h-3 w-3" />
                            {strain.reports}
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <XCircle className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}