import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Index";
import Journal from "./pages/Journal";
import Environment from "./pages/Environment";
import Nutrients from "./pages/Nutrients";
import Strains from "./pages/Strains";
import Settings from "./pages/Settings";
import BuildPlanner from "./pages/BuildPlanner";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/build-planner" element={<BuildPlanner />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/environment" element={<Environment />} />
          <Route path="/nutrients" element={<Nutrients />} />
          <Route path="/strains" element={<Strains />} />
          <Route path="/settings" element={<Settings />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
