import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { NavProjects } from "./nav-projects";
import { MoreVertical, Eye, Settings, ChevronDown } from "lucide-react";

export function AppSidebar() {
  return (
    <Sidebar>
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

      <SidebarContent>
        <NavProjects />
      </SidebarContent>

      
    </Sidebar>
  );
}
