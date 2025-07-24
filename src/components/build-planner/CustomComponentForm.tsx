import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus } from 'lucide-react';
import { BuildComponent, ComponentCategory } from '@/types/buildPlanner';

interface CustomComponentFormProps {
  onAddComponent: (component: BuildComponent) => void;
}

const categories: { key: ComponentCategory; label: string }[] = [
  { key: 'grow-tent', label: 'Grow Tent' },
  { key: 'led-light', label: 'LED Light' },
  { key: 'ventilation', label: 'Ventilation' },
  { key: 'carbon-filter', label: 'Carbon Filter' },
  { key: 'nutrients', label: 'Nutrients' },
  { key: 'ph-meter', label: 'pH Meter' },
  { key: 'accessories', label: 'Accessories' },
];

const CustomComponentForm = ({ onAddComponent }: CustomComponentFormProps) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    category: 'accessories' as ComponentCategory,
    price: '',
    powerConsumption: '',
    description: '',
    length: '',
    width: '',
    height: '',
    weight: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const component: BuildComponent = {
      id: `custom-${Date.now()}`,
      name: formData.name,
      brand: formData.brand,
      category: formData.category,
      price: parseFloat(formData.price) || 0,
      powerConsumption: parseFloat(formData.powerConsumption) || 0,
      description: formData.description,
      specifications: {},
      compatibility: [],
      dimensions: {
        length: parseFloat(formData.length) || 0,
        width: parseFloat(formData.width) || 0,
        height: parseFloat(formData.height) || 0
      },
      weight: parseFloat(formData.weight) || 0,
      rating: 0,
      reviewCount: 0,
      isCustom: true
    };

    onAddComponent(component);
    setOpen(false);
    setFormData({
      name: '',
      brand: '',
      category: 'accessories',
      price: '',
      powerConsumption: '',
      description: '',
      length: '',
      width: '',
      height: '',
      weight: ''
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          <Plus className="w-4 h-4 mr-2" />
          Add Custom Component
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Custom Component</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Component Name*</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                required
              />
            </div>
            <div>
              <Label htmlFor="brand">Brand</Label>
              <Input
                id="brand"
                value={formData.brand}
                onChange={(e) => setFormData(prev => ({ ...prev, brand: e.target.value }))}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="category">Category*</Label>
            <Select 
              value={formData.category} 
              onValueChange={(value) => setFormData(prev => ({ ...prev, category: value as ComponentCategory }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map(cat => (
                  <SelectItem key={cat.key} value={cat.key}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="price">Price ($)</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="power">Power Consumption (W)</Label>
              <Input
                id="power"
                type="number"
                value={formData.powerConsumption}
                onChange={(e) => setFormData(prev => ({ ...prev, powerConsumption: e.target.value }))}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
            />
          </div>

          <div className="grid grid-cols-4 gap-2">
            <div>
              <Label htmlFor="length">Length (cm)</Label>
              <Input
                id="length"
                type="number"
                value={formData.length}
                onChange={(e) => setFormData(prev => ({ ...prev, length: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="width">Width (cm)</Label>
              <Input
                id="width"
                type="number"
                value={formData.width}
                onChange={(e) => setFormData(prev => ({ ...prev, width: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="height">Height (cm)</Label>
              <Input
                id="height"
                type="number"
                value={formData.height}
                onChange={(e) => setFormData(prev => ({ ...prev, height: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="weight">Weight (kg)</Label>
              <Input
                id="weight"
                type="number"
                step="0.1"
                value={formData.weight}
                onChange={(e) => setFormData(prev => ({ ...prev, weight: e.target.value }))}
              />
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" className="flex-1">
              Add Component
            </Button>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CustomComponentForm;