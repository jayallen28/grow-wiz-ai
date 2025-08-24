// BuildComponentCard.tsx
import { BuildComponentWithQuantity } from '@/types/buildPlanner';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trash2, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface BuildComponentCardProps {
  component: BuildComponentWithQuantity;
  onRemove: () => void;
  onUpdateQuantity: (quantity: number) => void;
}

const BuildComponentCard = ({ component, onRemove, onUpdateQuantity }: BuildComponentCardProps) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className="flex items-center p-3 bg-[rgba(11,7,13,0.6)] backdrop-blur-md rounded-lg gap-3 shadow-sm"
    >
      {component.imageUrl && (
        <img
          src={component.imageUrl}
          alt={component.name}
          className="w-16 h-16 object-cover rounded-md flex-shrink-0"
        />
      )}

      <div className="flex-1 min-w-0">
        <p className="text-lg font-semibold truncate">
          {component.name}
          {component.isCustom && <Badge variant="secondary" className="ml-2 text-sm">Custom</Badge>}
        </p>

        <div className="flex items-center gap-4 mt-2">
          <div className="flex items-center gap-1">
            <span className="text-sm text-gray-400">Total</span>
            <span className="text-2xl font-bold text-green-600">${(component.price * component.quantity).toFixed(2)}</span>
          </div>

          {component.powerConsumption > 0 && (
            <div className="flex items-center gap-1">
              <span className="text-sm text-gray-400">Power</span>
              <span className="text-2xl font-bold text-yellow-500 flex items-center gap-1">
                <Zap className="w-5 h-5" />
                {component.powerConsumption * component.quantity}W
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center gap-2">
        <div className="flex items-center">
          <Button
            size="lg"
            variant="ghost"
            onClick={() => onUpdateQuantity(component.quantity - 1)}
            className="h-10 w-10 p-0 text-2xl"
          >
            -
          </Button>
          <AnimatePresence mode="popLayout">
            <motion.span
              key={component.quantity}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="text-xl font-medium w-10 text-center"
            >
              {component.quantity}
            </motion.span>
          </AnimatePresence>
          <Button
            size="lg"
            variant="ghost"
            onClick={() => onUpdateQuantity(component.quantity + 1)}
            className="h-10 w-10 p-0 text-2xl"
          >
            +
          </Button>
        </div>

        <Button size="lg" variant="ghost" onClick={onRemove}>
          <Trash2 className="w-6 h-6 text-red-600" />
        </Button>
      </div>
    </motion.div>
  );
};

export default BuildComponentCard;
