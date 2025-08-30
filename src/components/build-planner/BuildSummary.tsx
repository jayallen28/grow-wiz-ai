import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronUp, ChevronDown, Save, Zap, Home, X } from 'lucide-react';
import { BuildComponentWithQuantity, ComponentCategory } from '@/types/buildPlanner';
import BuildCategory from './BuildCategory';
import PowerCostCalculator from './PowerCostCalculator';
import { motion, AnimatePresence } from 'framer-motion';

interface BuildSummaryProps {
  selectedComponents: {
    [category in ComponentCategory]?: BuildComponentWithQuantity[];
  };
  totalCost: number;
  totalPower: number;
  onRemoveComponent: (componentId: string, category: ComponentCategory) => void;
  onUpdateQuantity: (componentId: string, category: ComponentCategory, quantity: number) => void;
}

const SIDEBAR_WIDTH = 480; // 150% width

const BuildSummary = ({
  selectedComponents,
  totalCost,
  totalPower,
  onRemoveComponent,
  onUpdateQuantity,
}: BuildSummaryProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showPowerCalc, setShowPowerCalc] = useState(false);
  const [collapsedCategories, setCollapsedCategories] = useState<{ [key: string]: boolean }>({});
  const sidebarRef = useRef<HTMLDivElement>(null);

  const categories = Object.keys(selectedComponents) as ComponentCategory[];
  const totalComponents = categories.reduce(
    (acc, cat) => acc + (selectedComponents[cat]?.length || 0),
    0
  );

  const toggleCategory = (category: ComponentCategory) => {
    setCollapsedCategories((prev) => ({ ...prev, [category]: !prev[category] }));
  };

  const anyProducts = totalComponents > 0;

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setSidebarOpen(false);
      }
    };
    if (sidebarOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [sidebarOpen]);

  return (
    <>
      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            ref={sidebarRef}
            initial={{ x: SIDEBAR_WIDTH }}
            animate={{ x: 0 }}
            exit={{ x: SIDEBAR_WIDTH }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 h-full bg-[#0B070D]/90 backdrop-blur-md border-l border-border shadow-lg z-40 w-[480px] flex flex-col"
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-border">
              <h2 className="text-lg font-bold">Build Summary</h2>
              <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="p-4 overflow-y-auto flex-1 space-y-6">
              {!showPowerCalc && anyProducts ? (
                <>
                  <div className="flex justify-end gap-3">
                    <Button size="sm" variant="outline" onClick={() => setCollapsedCategories({})}>
                      <ChevronDown className="w-4 h-4" /> Expand All
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        const allCollapsed: { [key: string]: boolean } = {};
                        categories.forEach((cat) => (allCollapsed[cat] = true));
                        setCollapsedCategories(allCollapsed);
                      }}
                    >
                      <ChevronUp className="w-4 h-4" /> Collapse All
                    </Button>
                  </div>

                  {categories.map((category) => {
                    const components = selectedComponents[category] || [];
                    if (components.length === 0) return null;
                    const collapsed = collapsedCategories[category];

                    return (
                      <BuildCategory
                        key={category}
                        category={category}
                        components={components}
                        collapsed={collapsed}
                        toggleCategory={() => toggleCategory(category)}
                        onRemoveComponent={onRemoveComponent}
                        onUpdateQuantity={onUpdateQuantity}
                      />
                    );
                  })}
                </>
              ) : !anyProducts ? (
                <p className="text-gray-400 text-center mt-4">Start adding products to your build!</p>
              ) : (
                showPowerCalc &&
                totalPower > 0 && (
                  <PowerCostCalculator
                    totalPower={totalPower}
                    productCount={totalComponents}
                    visible={showPowerCalc}
                    onClose={() => setShowPowerCalc(false)}
                  />
                )
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Build/Home Button */}
      <div
        className="fixed bottom-20 z-50 transition-all duration-300"
        style={{ right: sidebarOpen ? SIDEBAR_WIDTH + 16 : 16 }}
      >
        <Button
          size="lg"
          className="bg-green-600 text-white rounded-full w-16 h-16 flex items-center justify-center relative"
          onClick={() => setSidebarOpen((prev) => !prev)}
        >
          <Home className="w-6 h-6" />
          {anyProducts && (
            <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
              {totalComponents}
            </span>
          )}
        </Button>
      </div>

      {/* Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center">
        <div className="max-w-7xl w-full px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between bg-[#1A111F]/90 backdrop-blur-md border-t border-border shadow-lg px-6 py-3 text-lg font-bold rounded-t-lg">
            <div className="flex items-center gap-6 text-lg font-semibold min-w-0">
              <div className="flex flex-col items-start min-w-0">
                <span className="text-gray-400 text-xs">Total</span>
                <span className="text-green-500 truncate">${totalCost.toFixed(2)}</span>
              </div>
              <div className="flex flex-col items-start min-w-0">
                <span className="text-gray-400 text-xs">Power</span>
                <span className="flex items-center text-yellow-400">
                  <Zap className="w-4 h-4 mr-1" /> {totalPower}W
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {totalPower > 0 && (
                <Button
                  size="sm"
                  variant="outline"
                  className="flex items-center gap-2"
                  onClick={() => {
                    setShowPowerCalc((prev) => !prev);
                    setSidebarOpen(true);
                  }}
                >
                  <Zap className="w-4 h-4" /> Power Calculator
                </Button>
              )}
              <Button
                size="sm"
                variant="default"
                className="bg-green-600 text-white flex items-center gap-2"
                onClick={() => alert('Save Build')}
              >
                <Save className="w-4 h-4" /> Save
              </Button>
              <Button size="sm" variant="outline" onClick={() => alert('My Builds')}>
                My Builds
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BuildSummary;
