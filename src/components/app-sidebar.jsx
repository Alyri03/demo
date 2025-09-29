// app-sidebar.jsx
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavProjects } from "./nav-projects";
import { NavUser } from "./nav-user";
import { MoreVertical } from "lucide-react";
import ClubLogo from "@/assets/club-logo.svg";



export function AppSidebar() {
  return (
    <Sidebar collapsible="icon" className="group border-r">
      <SidebarHeader className="px-4">
        <div
          className="
            flex h-12 items-center justify-between
            group-data-[collapsible=icon]:justify-center
          "
        >
          {/* Marca: ícono + texto; el texto se oculta en colapsado */}
          <div className="flex items-center gap-2">
            <img
              src={ClubLogo}
              alt="Club Social"
              className="h-6 w-6 select-none"
              draggable="false"
            />
            <span className="text-sm font-semibold tracking-wide text-foreground group-data-[collapsible=icon]:hidden">
              Club Social
            </span>
          </div>

          {/* Botón de opciones: oculto en colapsado */}
          <button className="p-2 rounded-md hover:bg-muted/50 group-data-[collapsible=icon]:hidden">
            <MoreVertical className="h-4 w-4" />
          </button>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-3 group-data-[collapsible=icon]:px-0">
        <NavProjects />
      </SidebarContent>

      <SidebarFooter className="mt-auto border-t p-2 group-data-[collapsible=icon]:p-2">
        {/* Cambiar modo (si está colapsado, solo queda el ícono) */}
        
        <div className="pt-2">
          <NavUser />
        </div>
      </SidebarFooter>

      {/* Alineado con h-12 del header */}
      <SidebarRail topClass="top-12" />
    </Sidebar>
  );
}
