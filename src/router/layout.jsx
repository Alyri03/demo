import { AppSidebar } from "@/components/app-sidebar";
import { Toaster } from "@/components/ui/sonner"

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Outlet, useLocation } from "react-router-dom";

export default function Layout() {
  const location = useLocation();

  const routeTitles = {
    "/inicio": "Inicio",
    "/perfil": "Mi Perfil",
    "/ambientes": "Ambientes",
    "/disponibilidad": "Disponibilidad y Reservas",
    "/pagos": "Pagos e Historial",
  };

  const title = routeTitles[location.pathname] || "Módulo";

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <main>
          <SidebarTrigger />
          <div style={{ padding: 20 }}>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6 border-b pb-2">
              {title}
            </h1>
            <Outlet />
          </div>
        </main>
         <Toaster />
      </SidebarInset>
    </SidebarProvider>
  );
}
