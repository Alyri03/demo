// src/components/nav-projects.jsx
import {
  Home,
  User,
  Building,
  Calendar,
  CreditCard,
  Shield,
  Users, // 👈 nuevo icono para "Socios"
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

export function NavProjects() {
  const location = useLocation();

  // 👇 lee el rol desde localStorage (lo guarda el Login)
  const role =
    (typeof window !== "undefined" && localStorage.getItem("role")) || "SOCIO";

  const socioItems = [
    { key: "inicio", name: "Inicio", url: "/inicio", icon: Home },
    { key: "perfil", name: "Mi Perfil", url: "/perfil", icon: User },
    { key: "ambientes", name: "Ambientes", url: "/ambientes", icon: Building },
    {
      key: "disponibilidad",
      name: "Disponibilidad y Reservas",
      url: "/disponibilidad",
      icon: Calendar,
    },
    {
      key: "pagos",
      name: "Pagos e Historial",
      url: "/pagos",
      icon: CreditCard,
    },
  ];

  // 👇 ADMIN: Dashboard + Socios, Ambientes, Pagos, Reservas
  const adminItems = [
    { key: "dashboard", name: "Dashboard", url: "/admin", icon: Shield },
    { key: "socios", name: "Socios", url: "/admin/socios", icon: Users },
    {
      key: "ambientes",
      name: "Ambientes",
      url: "/admin/ambientes",
      icon: Building,
    },
    { key: "pagos", name: "Pagos", url: "/admin/pagos", icon: CreditCard },
    {
      key: "reservas",
      name: "Reservas",
      url: "/admin/reservas",
      icon: Calendar,
    },
  ];

  const items = role === "ADMIN" ? adminItems : socioItems;
  const label = role === "ADMIN" ? "ADMIN" : "INICIO";

  const isActive = (url) =>
    location.pathname === url || location.pathname.startsWith(url + "/");

  return (
    <SidebarGroup className="p-2 group-data-[collapsible=icon]:!p-0">
      <SidebarGroupLabel className="px-2 text-xs uppercase tracking-wide text-[#5951e6] group-data-[collapsible=icon]:hidden">
        {label}
      </SidebarGroupLabel>

      <SidebarMenu className="mt-2 space-y-1 group-data-[collapsible=icon]:mt-1">
        {items.map((item) => {
          const active = isActive(item.url);
          const Icon = item.icon;

          return (
            <SidebarMenuItem key={item.key}>
              <SidebarMenuButton
                asChild
                className={[
                  "flex h-11 w-full items-center gap-2 rounded-md px-2 transition-colors",
                  active
                    ? "bg-[#eef2ff] text-[#5951e6]"
                    : "text-muted-foreground hover:bg-[#eef2ff] hover:text-[#5951e6]",
                  "group-data-[collapsible=icon]:!h-10 group-data-[collapsible=icon]:!w-10",
                  "group-data-[collapsible=icon]:!p-0 group-data-[collapsible=icon]:!gap-0",
                  "group-data-[collapsible=icon]:mx-auto group-data-[collapsible=icon]:justify-center",
                ].join(" ")}
              >
                <NavLink
                  to={item.url}
                  className="flex h-full w-full items-center group-data-[collapsible=icon]:justify-center"
                >
                  <span className="flex h-5 w-5 items-center justify-center">
                    <Icon className="h-4 w-4 shrink-0" />
                  </span>
                  <span className="truncate group-data-[collapsible=icon]:hidden">
                    {item.name}
                  </span>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
