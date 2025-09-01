import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { X, Plus } from 'lucide-react';
import { ComponentCategory, BuildComponent } from '@/types/buildPlanner';

interface AddComponentModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (componentData: Omit<BuildComponent, 'id'>) => Promise<void>;
}

const categoryOptions: { value: ComponentCategory; label: string }[] = [
  { value: 'grow-tent', label: 'Grow Tents' },
  { value: 'led-light', label: 'LED Lights' },
  { value: 'ventilation', label: 'Ventilation' },
  { value: 'carbon-filter', label: 'Carbon Filters' },
  { value: 'nutrients', label: 'Nutrients' },
  { value: 'ph-meter', label: 'pH Meters' },
  { value: 'tds-meter', label: 'TDS Meters' },
  { value: 'timer', label: 'Timers' },
  { value: 'thermometer', label: 'Thermometers' },
  { value: 'hygrometer', label: 'Hygrometers' },
  { value: 'co2-controller', label: 'CO2 Controllers' },
  { value: 'grow-medium', label: 'Grow Medium' },
  { value: 'pots', label: 'Pots' },
  { value: 'ducting', label: 'Ducting' },
  { value: 'oscillating-fan', label: 'Oscillating Fans' },
  { value: 'dehumidifier', label: 'Dehumidifiers' },
  { value: 'humidifier', label: 'Humidifiers' },
  { value: 'arduino-kit', label: 'Arduino Kits' },
  { value: 'sensors', label: 'Sensors' },
  { value: 'accessories', label: 'Accessories' }
];

export default function AddComponentModal({ open, onClose, onSubmit }: AddComponentModalProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    category: '' as ComponentCategory,
    price: '',
    powerConsumption: '',
    description: '',
    imageUrl: '',
    affiliateUrl: '',
    weight: '',
    rating: '',
    reviewCount: '',
    dimensions: {
      length: '',
      width: '',
      height: ''
    },
    specifications: {} as Record<string, string>,
    compatibility: [] as string[]
  });

  const [specKey, setSpecKey] = useState('');
  const [specValue, setSpecValue] = useState('');
  const [compatibilityInput, setCompatibilityInput] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.brand || !formData.category || !formData.price) {
      return;
    }

    setLoading(true);
    try {
      await onSubmit({
        name: formData.name,
        brand: formData.brand,
        category: formData.category,
        price: parseFloat(formData.price),
        powerConsumption: parseInt(formData.powerConsumption) || 0,
        description: formData.description,
        imageUrl: formData.imageUrl || undefined,
        affiliateUrl: formData.affiliateUrl || undefined,
        weight: parseFloat(formData.weight) || 0,
        rating: parseFloat(formData.rating) || 0,
        reviewCount: parseInt(formData.reviewCount) || 0,
        dimensions: {
          length: parseFloat(formData.dimensions.length) || 0,
          width: parseFloat(formData.dimensions.width) || 0,
          height: parseFloat(formData.dimensions.height) || 0
        },
        specifications: formData.specifications,
        compatibility: formData.compatibility,
        isCustom: false
      });
      
      // Reset form
      setFormData({
        name: '',
        brand: '',
        category: '' as ComponentCategory,
        price: '',
        powerConsumption: '',
        description: '',
        imageUrl: '',
        affiliateUrl: '',
        weight: '',
        rating: '',
        reviewCount: '',
        dimensions: { length: '', width: '', height: '' },
        specifications: {},
        compatibility: []
      });
      setSpecKey('');
      setSpecValue('');
      setCompatibilityInput('');
      onClose();
    } catch (error) {
      console.error('Error creating component:', error);
    } finally {
      setLoading(false);
    }
  };

  const addSpecification = () => {
    if (specKey && specValue) {
      setFormData(prev => ({
        ...prev,
        specifications: {
          ...prev.specifications,
          [specKey]: specValue
        }
      }));
      setSpecKey('');
      setSpecValue('');
    }
  };

  const removeSpecification = (key: string) => {
    setFormData(prev => ({
      ...prev,
      specifications: Object.fromEntries(
        Object.entries(prev.specifications).filter(([k]) => k !== key)
      )
    }));
  };

  const addCompatibility = () => {
    if (compatibilityInput && !formData.compatibility.includes(compatibilityInput)) {
      setFormData(prev => ({
        ...prev,
        compatibility: [...prev.compatibility, compatibilityInput]
      }));
      setCompatibilityInput('');
    }
  };

  const removeCompatibility = (item: string) => {
    setFormData(prev => ({
      ...prev,
      compatibility: prev.compatibility.filter(c => c !== item)
    }));
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Component</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Product Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                required
              />
            </div>
            <div>
              <Label htmlFor="brand">Brand *</Label>
              <Input
                id="brand"
                value={formData.brand}
                onChange={(e) => setFormData(prev => ({ ...prev, brand: e.target.value }))}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="category">Category *</Label>
              <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value as ComponentCategory }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categoryOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="price">Price ($) *</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="power">Power (W)</Label>
              <Input
                id="power"
                type="number"
                value={formData.powerConsumption}
                onChange={(e) => setFormData(prev => ({ ...prev, powerConsumption: e.target.value }))}
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
            <div>
              <Label htmlFor="rating">Rating (1-5)</Label>
              <Input
                id="rating"
                type="number"
                min="1"
                max="5"
                step="0.1"
                value={formData.rating}
                onChange={(e) => setFormData(prev => ({ ...prev, rating: e.target.value }))}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="imageUrl">Image URL</Label>
              <Input
                id="imageUrl"
                type="url"
                value={formData.imageUrl}
                onChange={(e) => setFormData(prev => ({ ...prev, imageUrl: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="affiliateUrl">Affiliate URL</Label>
              <Input
                id="affiliateUrl"
                type="url"
                value={formData.affiliateUrl}
                onChange={(e) => setFormData(prev => ({ ...prev, affiliateUrl: e.target.value }))}
              />
            </div>
          </div>

          <div>
            <Label>Dimensions (cm)</Label>
            <div className="grid grid-cols-3 gap-2">
              <Input
                placeholder="Length"
                type="number"
                value={formData.dimensions.length}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  dimensions: { ...prev.dimensions, length: e.target.value }
                }))}
              />
              <Input
                placeholder="Width"
                type="number"
                value={formData.dimensions.width}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  dimensions: { ...prev.dimensions, width: e.target.value }
                }))}
              />
              <Input
                placeholder="Height"
                type="number"
                value={formData.dimensions.height}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  dimensions: { ...prev.dimensions, height: e.target.value }
                }))}
              />
            </div>
          </div>

          <div>
            <Label>Specifications</Label>
            <div className="flex gap-2 mb-2">
              <Input
                placeholder="Key"
                value={specKey}
                onChange={(e) => setSpecKey(e.target.value)}
              />
              <Input
                placeholder="Value"
                value={specValue}
                onChange={(e) => setSpecValue(e.target.value)}
              />
              <Button type="button" onClick={addSpecification} size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {Object.entries(formData.specifications).map(([key, value]) => (
                <Badge key={key} variant="secondary" className="gap-1">
                  {key}: {value}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => removeSpecification(key)}
                  />
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <Label>Compatibility</Label>
            <div className="flex gap-2 mb-2">
              <Input
                placeholder="Compatible with..."
                value={compatibilityInput}
                onChange={(e) => setCompatibilityInput(e.target.value)}
              />
              <Button type="button" onClick={addCompatibility} size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.compatibility.map((item, index) => (
                <Badge key={index} variant="outline" className="gap-1">
                  {item}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => removeCompatibility(item)}
                  />
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Creating...' : 'Create Component'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}