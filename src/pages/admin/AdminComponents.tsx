import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
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
  DollarSign,
  Upload,
  Globe,
  Link
} from "lucide-react";
import { useBuildComponents } from '@/hooks/useBuildComponents';
import AddComponentModal from '@/components/admin/AddComponentModal';
import { ComponentCategory } from '@/types/buildPlanner';
import Papa from 'papaparse';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export default function AdminComponents() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [csvDialogOpen, setCsvDialogOpen] = useState(false);
  const [scrapingDialogOpen, setScrapingDialogOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [scrapeUrl, setScrapeUrl] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { components, loading, createComponent, deleteComponent, getStats } = useBuildComponents();

  const stats = getStats();

  const getStatusBadge = (isCustom: boolean) => {
    return isCustom ? 
      <Badge variant="secondary">Custom</Badge> : 
      <Badge variant="default">Active</Badge>;
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

  const handleDeleteComponent = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this component?')) {
      await deleteComponent(id);
    }
  };

  const handleCsvUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    
    try {
      Papa.parse(file, {
        header: true,
        complete: async (results) => {
          const validComponents = results.data.filter((row: any) => 
            row.name && row.brand && row.category && row.price
          );

          if (validComponents.length === 0) {
            throw new Error('No valid components found in CSV. Required fields: name, brand, category, price');
          }

          const componentsData = validComponents.map((row: any) => ({
            name: row.name,
            brand: row.brand,
            category: row.category as ComponentCategory,
            price: parseFloat(row.price) || 0,
            powerConsumption: parseInt(row.power_consumption) || 0,
            description: row.description || '',
            imageUrl: row.image_url || null,
            affiliateUrl: row.affiliate_url || null,
            specifications: row.specifications ? JSON.parse(row.specifications) : {},
            compatibility: row.compatibility ? row.compatibility.split(',') : [],
            dimensions: row.dimensions ? JSON.parse(row.dimensions) : { length: 0, width: 0, height: 0 },
            weight: parseFloat(row.weight) || 0,
            rating: parseFloat(row.rating) || 0,
            reviewCount: parseInt(row.review_count) || 0,
            isCustom: false
          }));

          for (const componentData of componentsData) {
            await createComponent(componentData);
          }

          toast.success(`Imported ${validComponents.length} components from CSV`);
          setCsvDialogOpen(false);
        },
        error: (error) => {
          throw new Error(`CSV parsing error: ${error.message}`);
        }
      });
    } catch (error) {
      console.error('Error uploading CSV:', error);
      toast.error(error instanceof Error ? error.message : "Failed to upload CSV");
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleWebScraping = async () => {
    if (!scrapeUrl.trim()) return;

    setUploading(true);
    try {
      const { data, error } = await supabase.functions.invoke('scrape-product', {
        body: { url: scrapeUrl.trim() }
      });

      if (error) throw error;

      if (data.success && data.component) {
        await createComponent(data.component);
        toast.success('Product scraped and added successfully!');
        setScrapingDialogOpen(false);
        setScrapeUrl('');
      } else {
        throw new Error(data.error || 'Failed to scrape product data');
      }
    } catch (error) {
      console.error('Error scraping product:', error);
      toast.error(error instanceof Error ? error.message : "Failed to scrape product");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Build Components</h1>
          <p className="text-muted-foreground">Manage grow equipment catalog</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={scrapingDialogOpen} onOpenChange={setScrapingDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Globe className="h-4 w-4" />
                Scrape Product
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Scrape Product Data</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Product URL</Label>
                  <Input
                    placeholder="https://acinfinity.com/product-page or Amazon URL"
                    value={scrapeUrl}
                    onChange={(e) => setScrapeUrl(e.target.value)}
                    disabled={uploading}
                  />
                </div>
                <div className="text-sm text-muted-foreground">
                  <p className="font-medium mb-2">Supported Sites:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>AC Infinity product pages</li>
                    <li>Amazon product pages</li>
                  </ul>
                </div>
                {uploading && (
                  <div className="flex items-center justify-center py-4">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                    <span className="ml-2">Scraping product data...</span>
                  </div>
                )}
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setScrapingDialogOpen(false)} disabled={uploading}>
                    Cancel
                  </Button>
                  <Button onClick={handleWebScraping} disabled={uploading || !scrapeUrl.trim()}>
                    <Link className="h-4 w-4 mr-2" />
                    Scrape Product
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          <Dialog open={csvDialogOpen} onOpenChange={setCsvDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Upload className="h-4 w-4" />
                Import CSV
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Import Components from CSV</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>CSV File</Label>
                  <Input
                    ref={fileInputRef}
                    type="file"
                    accept=".csv"
                    onChange={handleCsvUpload}
                    disabled={uploading}
                  />
                </div>
                <div className="text-sm text-muted-foreground">
                  <p className="font-medium mb-2">CSV Format Requirements:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li><strong>name</strong> (required): Product name</li>
                    <li><strong>brand</strong> (required): Brand name</li>
                    <li><strong>category</strong> (required): grow-tent, led-light, etc.</li>
                    <li><strong>price</strong> (required): Price in USD</li>
                    <li><strong>power_consumption</strong> (optional): Watts</li>
                    <li><strong>description</strong> (optional): Product description</li>
                    <li><strong>image_url</strong> (optional): Product image URL</li>
                    <li><strong>specifications</strong> (optional): JSON object</li>
                    <li><strong>dimensions</strong> (optional): JSON with length, width, height</li>
                    <li><strong>rating, review_count, weight</strong> (optional)</li>
                  </ul>
                </div>
                {uploading && (
                  <div className="flex items-center justify-center py-4">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                    <span className="ml-2">Importing components...</span>
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>
          <Button className="gap-2" onClick={() => setShowAddModal(true)}>
            <Plus className="h-4 w-4" />
            Add Component
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Components</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">Total products</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.active}</div>
            <p className="text-xs text-muted-foreground">Non-custom items</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.categories}</div>
            <p className="text-xs text-muted-foreground">Equipment types</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Avg. Rating</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.avgRating.toFixed(1)}</div>
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
              {loading ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8">
                    Loading components...
                  </TableCell>
                </TableRow>
              ) : filteredComponents.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8">
                    No components found
                  </TableCell>
                </TableRow>
              ) : (
                filteredComponents.map((component) => (
                  <TableRow key={component.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        {component.imageUrl && (
                          <img 
                            src={component.imageUrl} 
                            alt={component.name}
                            className="w-10 h-10 object-cover rounded"
                          />
                        )}
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
                    <TableCell>{component.powerConsumption || 'N/A'}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <span>{component.rating}</span>
                        <span className="text-yellow-500">★</span>
                        <span className="text-muted-foreground text-sm">
                          ({component.reviewCount})
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(component.isCustom || false)}</TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleDeleteComponent(component.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <AddComponentModal
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={async (componentData) => {
          await createComponent(componentData);
        }}
      />
    </div>
  );
}