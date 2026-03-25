import { ReactNode } from "react";
import { Home, Calculator, BookOpen, BarChart3, Crown, ClipboardList, LogIn, LogOut } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger, useSidebar,
} from "@/components/ui/sidebar";

const navItems = [
  { title: "Home", url: "/", icon: Home },
  { title: "SAT Math", url: "/math", icon: Calculator },
  { title: "SAT English", url: "/english", icon: BookOpen },
  { title: "Full Tests", url: "/full-tests", icon: ClipboardList },
  { title: "Progress", url: "/progress", icon: BarChart3 },
  { title: "Premium", url: "/premium", icon: Crown },
];

function AppSidebarContent() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const { user, signOut } = useAuth();

  return (
    <Sidebar collapsible="icon" className="border-r-0">
      <SidebarContent className="pt-4">
        {!collapsed && (
          <div className="px-4 pb-4">
            <h2 className="text-lg font-serif font-bold text-foreground">NextStep</h2>
            <p className="text-xs text-muted-foreground">SAT Prep</p>
          </div>
        )}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.url === "/"}
                      className="hover:bg-muted/50"
                      activeClassName="bg-primary/10 text-primary font-medium"
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  {user ? (
                    <button onClick={signOut} className="flex items-center w-full hover:bg-muted/50 px-2 py-1.5 rounded-md text-sm">
                      <LogOut className="mr-2 h-4 w-4" />
                      {!collapsed && <span>Sign Out</span>}
                    </button>
                  ) : (
                    <NavLink to="/auth" className="hover:bg-muted/50" activeClassName="bg-primary/10 text-primary font-medium">
                      <LogIn className="mr-2 h-4 w-4" />
                      {!collapsed && <span>Sign In</span>}
                    </NavLink>
                  )}
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebarContent />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-12 flex items-center border-b px-4 bg-card sticky top-0 z-10">
            <SidebarTrigger className="mr-3" />
            <span className="font-serif font-bold text-primary text-sm">NextStep SAT Prep</span>
          </header>
          <main className="flex-1 p-4 md:p-6 overflow-auto">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
