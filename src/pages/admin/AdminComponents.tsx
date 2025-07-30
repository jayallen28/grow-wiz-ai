import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye,
  Filter,
  Download,
  DollarSign
} from "lucide-react";

export default function AdminComponents() {
  const [searchTerm, setSearchTerm] = useState("");

  const components = [
    {
      id: 1,
      name: "Mars Hydro TS 1000",
      category: "led-light",
      brand: "Mars Hydro",
      price: 149.99,
      power: 150,
      rating: 4.5,
      reviews: 234,
      status: "active",
      lastUpdated: "2024-01-15"
    },
    {
      id: 2,
      name: "AC Infinity Cloudline T4",
      category: "ventilation",
      brand: "AC Infinity",
      price: 109.95,
      power: 32,
      rating: 4.8,
      reviews: 456,
      status: "active",
      lastUpdated: "2024-01-14"
    },
    {
      id: 3,
      name: "VIVOSUN 2x2 Grow Tent",
      category: "grow-tent",
      brand: "VIVOSUN",
      price: 79.99,
      power: 0,
      rating: 4.2,
      reviews: 189,
      status: "discontinued",
      lastUpdated: "2024-01-10"
    },
    {
      id: 4,
      name: "General Hydroponics Flora Series",
      category: "nutrients",
      brand: "General Hydroponics",
      price: 24.99,
      power: 0,
      rating: 4.6,
      reviews: 678,
      status: "active",
      lastUpdated: "2024-01-12"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="default">Active</Badge>;
      case 'discontinued':
        return <Badge variant="secondary">Discontinued</Badge>;
      case 'out-of-stock':
        return <Badge variant="destructive">Out of Stock</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getCategoryDisplay = (category: string) => {
    return category.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  const filteredComponents = components.filter(component =>
    component.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    component.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
    component.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Build Components</h1>
          <p className="text-muted-foreground">Manage grow equipment catalog</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Component
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Components</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">+8 this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">142</div>
            <p className="text-xs text-muted-foreground">91% available</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Equipment types</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Avg. Rating</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.3</div>
            <p className="text-xs text-muted-foreground">Based on reviews</p>
          </CardContent>
        </Card>
      </div>

      {/* Components Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>All Components</CardTitle>
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
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search components..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Brand</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Power (W)</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredComponents.map((component) => (
                <TableRow key={component.id}>
                  <TableCell>
                    <div>
                      <span className="font-medium">{component.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{getCategoryDisplay(component.category)}</TableCell>
                  <TableCell>{component.brand}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-3 w-3" />
                      {component.price.toFixed(2)}
                    </div>
                  </TableCell>
                  <TableCell>{component.power || 'N/A'}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <span>{component.rating}</span>
                      <span className="text-yellow-500">★</span>
                      <span className="text-muted-foreground text-sm">
                        ({component.reviews})
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(component.status)}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}