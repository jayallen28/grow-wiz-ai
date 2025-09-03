import { useState } from "react";
import { Outlet, NavLink, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  FileText, 
  Wrench, 
  Users, 
  BookOpen,
  Leaf,
  BarChart3,
  Settings,
  Menu,
  X,
  Mail
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const adminNavItems = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Users", href: "/admin/users", icon: Users },
  { name: "Articles", href: "/admin/articles", icon: FileText },
  { name: "Build Components", href: "/admin/components", icon: Wrench },
  { name: "Strains", href: "/admin/strains", icon: Leaf },
  { name: "Email Subscriptions", href: "/admin/subscriptions", icon: Mail },
  { name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-72 transform bg-card border-r transition-transform duration-200 ease-in-out md:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex h-16 items-center justify-between px-6 border-b">
            <h1 className="text-xl font-bold text-primary">Admin Panel</h1>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 p-4">
            {adminNavItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <NavLink
                  key={item.href}
                  to={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className="h-4 w-4" />
                  {item.name}
                </NavLink>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="md:pl-72">
        {/* Top bar */}
        <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b bg-background px-6">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-lg font-semibold">Admin Dashboard</h1>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}