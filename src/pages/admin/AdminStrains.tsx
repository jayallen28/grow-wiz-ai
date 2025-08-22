import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { Search, Plus, Leaf, BarChart3, Clock, TrendingUp, Edit, Trash2, Upload } from 'lucide-react';

interface Strain {
  id: string;
  name: string;
  type: string;
  flowering_time: number | null;
  expected_yield: string | null;
  thc_content: string | null;
  cbd_content: string | null;
  growth_pattern: string | null;
  notes: string | null;
  created_at: string;
}

export default function AdminStrains() {
  const [strains, setStrains] = useState<Strain[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingStrain, setEditingStrain] = useState<Strain | null>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    type: 'indica',
    flowering_time: '',
    expected_yield: '',
    thc_content: '',
    cbd_content: '',
    growth_pattern: '',
    notes: '',
  });

  useEffect(() => {
    fetchStrains();
  }, []);

  const fetchStrains = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('strains')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setStrains(data || []);
    } catch (error) {
      console.error('Error fetching strains:', error);
      toast({
        title: "Error",
        description: "Failed to fetch strains",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No authenticated user');

      const strainData = {
        name: formData.name,
        type: formData.type,
        flowering_time: formData.flowering_time ? parseInt(formData.flowering_time) : null,
        expected_yield: formData.expected_yield || null,
        thc_content: formData.thc_content || null,
        cbd_content: formData.cbd_content || null,
        growth_pattern: formData.growth_pattern || null,
        notes: formData.notes || null,
        user_id: user.id,
      };

      if (editingStrain) {
        const { error } = await supabase
          .from('strains')
          .update(strainData)
          .eq('id', editingStrain.id);
        
        if (error) throw error;
        
        toast({
          title: "Success",
          description: "Strain updated successfully",
        });
      } else {
        const { error } = await supabase
          .from('strains')
          .insert([strainData]);
        
        if (error) throw error;
        
        toast({
          title: "Success",
          description: "Strain created successfully",
        });
      }

      resetForm();
      setDialogOpen(false);
      fetchStrains();
    } catch (error) {
      console.error('Error saving strain:', error);
      toast({
        title: "Error",
        description: "Failed to save strain",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (strain: Strain) => {
    setEditingStrain(strain);
    setFormData({
      name: strain.name,
      type: strain.type,
      flowering_time: strain.flowering_time?.toString() || '',
      expected_yield: strain.expected_yield || '',
      thc_content: strain.thc_content || '',
      cbd_content: strain.cbd_content || '',
      growth_pattern: strain.growth_pattern || '',
      notes: strain.notes || '',
    });
    setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this strain?')) return;

    try {
      const { error } = await supabase
        .from('strains')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Strain deleted successfully",
      });

      fetchStrains();
    } catch (error) {
      console.error('Error deleting strain:', error);
      toast({
        title: "Error",
        description: "Failed to delete strain",
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setEditingStrain(null);
    setFormData({
      name: '',
      type: 'indica',
      flowering_time: '',
      expected_yield: '',
      thc_content: '',
      cbd_content: '',
      growth_pattern: '',
      notes: '',
    });
  };

  const filteredStrains = strains.filter(strain =>
    strain.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    strain.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getTypeBadgeVariant = (type: string) => {
    switch (type.toLowerCase()) {
      case 'indica': return 'destructive';
      case 'sativa': return 'default';
      case 'hybrid': return 'secondary';
      default: return 'outline';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Strain Management</h1>
          <p className="text-muted-foreground">Manage cannabis strains for users' grow journals</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            Import CSV
          </Button>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm}>
                <Plus className="h-4 w-4 mr-2" />
                Add Strain
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>{editingStrain ? 'Edit Strain' : 'Add New Strain'}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Strain Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="type">Type</Label>
                    <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="indica">Indica</SelectItem>
                        <SelectItem value="sativa">Sativa</SelectItem>
                        <SelectItem value="hybrid">Hybrid</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="flowering_time">Flowering Time (days)</Label>
                    <Input
                      id="flowering_time"
                      type="number"
                      value={formData.flowering_time}
                      onChange={(e) => setFormData({ ...formData, flowering_time: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="expected_yield">Expected Yield</Label>
                    <Input
                      id="expected_yield"
                      value={formData.expected_yield}
                      onChange={(e) => setFormData({ ...formData, expected_yield: e.target.value })}
                      placeholder="e.g., 400-500g/m²"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="thc_content">THC Content</Label>
                    <Input
                      id="thc_content"
                      value={formData.thc_content}
                      onChange={(e) => setFormData({ ...formData, thc_content: e.target.value })}
                      placeholder="e.g., 18-22%"
                    />
                  </div>
                  <div>
                    <Label htmlFor="cbd_content">CBD Content</Label>
                    <Input
                      id="cbd_content"
                      value={formData.cbd_content}
                      onChange={(e) => setFormData({ ...formData, cbd_content: e.target.value })}
                      placeholder="e.g., <1%"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="growth_pattern">Growth Pattern</Label>
                  <Input
                    id="growth_pattern"
                    value={formData.growth_pattern}
                    onChange={(e) => setFormData({ ...formData, growth_pattern: e.target.value })}
                    placeholder="e.g., Compact, Tall, Bushy"
                  />
                </div>
                <div>
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Additional information about this strain..."
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    {editingStrain ? 'Update' : 'Create'} Strain
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <Leaf className="h-8 w-8 text-green-500" />
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Strains</p>
              <p className="text-2xl font-bold">{strains.length}</p>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <BarChart3 className="h-8 w-8 text-red-500" />
            <div>
              <p className="text-sm font-medium text-muted-foreground">Indica</p>
              <p className="text-2xl font-bold">{strains.filter(s => s.type === 'indica').length}</p>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <TrendingUp className="h-8 w-8 text-blue-500" />
            <div>
              <p className="text-sm font-medium text-muted-foreground">Sativa</p>
              <p className="text-2xl font-bold">{strains.filter(s => s.type === 'sativa').length}</p>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <Clock className="h-8 w-8 text-yellow-500" />
            <div>
              <p className="text-sm font-medium text-muted-foreground">Hybrid</p>
              <p className="text-2xl font-bold">{strains.filter(s => s.type === 'hybrid').length}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Strains Table */}
      <Card>
        <div className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search strains..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Flowering Time</TableHead>
                  <TableHead>THC</TableHead>
                  <TableHead>CBD</TableHead>
                  <TableHead>Yield</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStrains.map((strain) => (
                  <TableRow key={strain.id}>
                    <TableCell className="font-medium">{strain.name}</TableCell>
                    <TableCell>
                      <Badge variant={getTypeBadgeVariant(strain.type)}>
                        {strain.type}
                      </Badge>
                    </TableCell>
                    <TableCell>{strain.flowering_time ? `${strain.flowering_time} days` : 'N/A'}</TableCell>
                    <TableCell>{strain.thc_content || 'N/A'}</TableCell>
                    <TableCell>{strain.cbd_content || 'N/A'}</TableCell>
                    <TableCell>{strain.expected_yield || 'N/A'}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(strain)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDelete(strain.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </Card>
    </div>
  );
}