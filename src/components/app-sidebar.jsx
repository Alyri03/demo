import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavProjects } from "./nav-projects";
import { MoreVertical } from "lucide-react";
export function AppSidebar() {
  return (
    <Sidebar collapsible="icon" className="group border-r">
      <SidebarHeader className="px-4 pt-4">
        <div className="flex h-12 items-center justify-between">
          <span className="text-xs font-semibold tracking-wider text-muted-foreground">
            LOGOTIPO
          </span>
          <button className="p-2 rounded-md hover:bg-muted/50">
            <MoreVertical className="h-4 w-4" />
          </button>
        </div>
      </SidebarHeader>

      {/* ¡Sin padding lateral en colapsado! */}
      <SidebarContent className="px-3 group-data-[collapsible=icon]:px-0">
        <NavProjects />
      </SidebarContent>

      <SidebarRail topClass="top-14" />
    </Sidebar>
  );
}
