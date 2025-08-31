import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import ResetPassword from "./pages/ResetPassword";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
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
import AdminArticleEditor from "./pages/admin/AdminArticleEditor";
import AdminComponents from "./pages/admin/AdminComponents";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminStrains from "./pages/admin/AdminStrains";
import AdminAnalytics from "./pages/admin/AdminAnalytics";
import AdminProtectedRoute from "./components/admin/AdminProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/build-planner" element={<BuildPlanner />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/learn/article/:id" element={<Learn />} />
          <Route path="/learn/sample" element={<Learn />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/environment" element={<Environment />} />
          <Route path="/nutrients" element={<Nutrients />} />
          <Route path="/strains" element={<Strains />} />
          <Route path="/settings" element={<Settings />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminProtectedRoute><AdminLayout /></AdminProtectedRoute>}>
            <Route index element={<AdminDashboard />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="articles" element={<AdminArticles />} />
            <Route path="articles/new" element={<AdminArticleEditor />} />
            <Route path="articles/edit/:id" element={<AdminArticleEditor />} />
            <Route path="components" element={<AdminComponents />} />
            <Route path="strains" element={<AdminStrains />} />
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
