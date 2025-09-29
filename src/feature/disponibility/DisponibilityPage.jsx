import { useEffect, useRef, useState, lazy, Suspense } from "react";
import FacilitiesTable from "./components/FacilitiesTable";
import ReservaDetailPanel from "./components/ReservaDetailPanel";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Calendar as CalendarIcon, Table as TableIcon } from "lucide-react";
import { useAutoPageSize } from "@/hooks/useAutoPageSize";
import { useElementHeight } from "@/hooks/useElementHeight";

const ReservasCalendarLite = lazy(() =>
  import("./components/ReservasCalendarLite")
);

const FACILITY_CATALOG = {
  "Salón Elegance": {
    image: "/salon-elegance.jpg",
    services: {
      wifi: true,
      parking: true,
      catering: true,
      projector: true,
      airConditioning: true,
      indoor: true,
    },
  },
  "Cancha Fútbol 1": {
    image: "/cancha-futbol.jpg",
    services: { parking: true, outdoor: true, soundSystem: true, locker: true },
  },
  "Jardín Primavera": {
    image: "/jardin-primavera.jpg",
    services: { wifi: true, catering: true, bbqArea: true, outdoor: true },
  },
  "Parrilla Familiar": {
    image: "/parrilla-familiar.jpg",
    services: {
      parking: true,
      bbqArea: true,
      soundSystem: true,
      outdoor: true,
    },
  },
  "Salón Ejecutivo": {
    image: "/salon-ejecutivo.jpg",
    services: {
      wifi: true,
      catering: true,
      projector: true,
      airConditioning: true,
      indoor: true,
    },
  },
  "Cancha Tenis Club": {
    image: "/cancha-tenis.jpg",
    services: { parking: true, locker: true, outdoor: true },
  },
  "Zona BBQ Deluxe": {
    image: "/zona-bbq.jpg",
    services: {
      parking: true,
      bbqArea: true,
      soundSystem: true,
      outdoor: true,
    },
  },
  "Jardín de Eventos": {
    image: "/jardin-eventos.jpg",
    services: {
      wifi: true,
      catering: true,
      projector: true,
      soundSystem: true,
      airConditioning: true,
      outdoor: true,
    },
  },
};

export default function DisponibilityPage() {
  const [tab, setTab] = useState(
    () => localStorage.getItem("reservas_tab") ?? "tabla"
  );
  useEffect(() => localStorage.setItem("reservas_tab", tab), [tab]);

  const [selected, setSelected] = useState(null);
  const [dragging, setDragging] = useState(false);

  const pageSize = useAutoPageSize({ rowHeight: 72, header: 240, footer: 72 });

  // Medimos la altura del card de la tabla para igualarla en el panel
  const tableCardRef = useRef(null);
  const tableHeight = useElementHeight(tableCardRef);

  return (
    <div className="p-0 md:p-5">
      <div className="px-0 md:px-14 mx-auto my-0 md:my-2">
        <Tabs value={tab} onValueChange={setTab} className="mt-4 space-y-4">
          <TabsList>
            <TabsTrigger value="tabla" className="gap-2">
              <TableIcon className="size-4" /> Tabla
            </TabsTrigger>
            <TabsTrigger value="calendario" className="gap-2">
              <CalendarIcon className="size-4" /> Calendario
            </TabsTrigger>
          </TabsList>

          <TabsContent value="tabla">
            <div
              className={`grid grid-cols-1 md:grid-cols-[1fr_360px] gap-4 items-start ${
                dragging ? "select-none" : ""
              }`}
            >
              <FacilitiesTable
                ref={tableCardRef}
                pageSize={pageSize}
                onRowClick={(row) => setSelected(row)}
                onRowDragStart={() => setDragging(true)}
                onRowDragEnd={() => setDragging(false)}
              />

              <div className="hidden md:block">
                <ReservaDetailPanel
                  height={tableHeight}
                  data={selected}
                  catalog={FACILITY_CATALOG}
                  onClear={() => setSelected(null)}
                  onDropItem={(row) => setSelected(row)} // ← aquí aterriza el DnD
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="calendario">
            <Suspense
              fallback={
                <div className="h-[60vh] border rounded-2xl bg-muted/30 animate-pulse" />
              }
            >
              <ReservasCalendarLite />
            </Suspense>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
