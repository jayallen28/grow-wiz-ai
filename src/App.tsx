import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Index";
import Journal from "./pages/Journal";
import Environment from "./pages/Environment";
import Nutrients from "./pages/Nutrients";
import Strains from "./pages/Strains";
import Settings from "./pages/Settings";
import BuildPlanner from "./pages/BuildPlanner";
import Learn from "./pages/Learn";
import NotFound from "./pages/NotFound";
import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboard from "./components/admin/AdminDashboard";
import AdminArticles from "./pages/admin/AdminArticles";
import AdminComponents from "./pages/admin/AdminComponents";
import AdminUserContent from "./pages/admin/AdminUserContent";
import AdminAnalytics from "./pages/admin/AdminAnalytics";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/build-planner" element={<BuildPlanner />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/environment" element={<Environment />} />
          <Route path="/nutrients" element={<Nutrients />} />
          <Route path="/strains" element={<Strains />} />
          <Route path="/settings" element={<Settings />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="articles" element={<AdminArticles />} />
            <Route path="components" element={<AdminComponents />} />
            <Route path="user-content" element={<AdminUserContent />} />
            <Route path="analytics" element={<AdminAnalytics />} />
          </Route>
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
