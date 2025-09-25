import { Home, User, Building, Calendar, CreditCard } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

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

export function NavProjects() {
  const location = useLocation();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>INICIO</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          const active = location.pathname === item.url;

          return (
            <SidebarMenuItem
              key={item.key}
              className={active ? "bg-muted" : ""}
            >
              <SidebarMenuButton asChild tooltip={item.name}>
                <NavLink
                  to={item.url}
                  className={({ isActive }) =>
                    (isActive
                      ? "text-primary font-medium "
                      : "text-muted-foreground ") + "flex items-center"
                  }
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  <span>{item.name}</span>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
