import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

import { NavLink, useLocation } from "react-router-dom";
import {
  MoreVertical,
  Eye,
  Home,
  User,
  Building,
  Calendar,
  CreditCard,
  Settings,
  ChevronDown,
} from "lucide-react";

const items = [
  { key: "inicio", name: "Inicio", url: "/inicio", icon: Home },
  { key: "perfil", name: "Mi Perfil", url: "/perfil", icon: User },
  { key: "ambientes", name: "Ambientes", url: "/ambientes", icon: Building },
  {
    key: "disponibilidad",
    name: "Disponibilidad y Reservas",
    url: "/disponibilidad",
    icon: Calendar,
  },
  { key: "pagos", name: "Pagos e Historial", url: "/pagos", icon: CreditCard },
];

export function AppSidebar() {
  const location = useLocation();

  return (
    <Sidebar>
      {/* HEADER */}
      <SidebarHeader className="px-4 pt-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold tracking-wider text-muted-foreground">
            LOGOTIPO
          </span>
          <button className="p-2 rounded-md hover:bg-muted/50">
            <MoreVertical className="h-4 w-4" />
          </button>
        </div>

      </SidebarHeader>

      {/* CONTENT */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>INICIO</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const active = location.pathname === item.url;
                return (
                  <SidebarMenuItem key={item.key}>
                    <SidebarMenuButton asChild>
                      <NavLink
                        to={item.url}
                        className={
                          "flex items-center gap-2 " +
                          (active
                            ? "font-semibold text-foreground"
                            : "text-muted-foreground")
                        }
                      >
                        <item.icon className="h-4 w-4" />
                        <span>{item.name}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

    
    </Sidebar>
  );
}
