import { useState } from "react";
import {
  Wifi, Car, UtensilsCrossed, Projector, Snowflake, Home, Sun,
  Flame, Music, Lock, MapPin,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function ReservaDetailPanel({ height, data, catalog, onClear, onDropItem }) {
  const [over, setOver] = useState(false);

  const nombre = data?.nombre || data?.ambiente;
  const meta = catalog?.[nombre] || {};
  const image = data?.img || meta.image;

  const horario =
    data?.horario ??
    `${data?.horaInicio ?? ""}${data?.horaInicio ? " - " : ""}${data?.horaFin ?? ""}`;

  const svc = meta.services || {};
  const services = [
    svc.wifi && { key: "wifi", label: "Wi-Fi", icon: Wifi },
    svc.parking && { key: "parking", label: "Estacionamiento", icon: Car },
    svc.catering && { key: "catering", label: "Catering", icon: UtensilsCrossed },
    svc.projector && { key: "projector", label: "Proyector", icon: Projector },
    svc.airConditioning && { key: "ac", label: "A/C", icon: Snowflake },
    svc.indoor && { key: "indoor", label: "Interior", icon: Home },
    svc.outdoor && { key: "outdoor", label: "Exterior", icon: Sun },
    svc.bbqArea && { key: "bbq", label: "Zona BBQ", icon: Flame },
    svc.soundSystem && { key: "sound", label: "Sonido", icon: Music },
    svc.locker && { key: "locker", label: "Locker", icon: Lock },
  ].filter(Boolean);

  const estado = data?.estado ?? "Reservado";

  const handle = (action) => {
    const base = `“${nombre}” — ${data?.fecha ?? ""} ${horario}`;
    if (action === "pagar") toast.success(`Pagar ahora · ${base}`);
    if (action === "reprogramar") toast.message(`Reprogramar · ${base}`);
    if (action === "cancelar") toast.error(`Cancelar · ${base}`);
    if (action === "comprobante") toast.message(`Ver comprobante · ${base}`);
    if (action === "reservar") toast.success(`Reservar nuevamente · ${base}`);
  };

  /* DnD: permitir soltar filas aquí */
  const dragProps = {
    onDragOver: (e) => { e.preventDefault(); e.dataTransfer.dropEffect = "copy"; setOver(true); },
    onDragLeave: () => setOver(false),
    onDrop: (e) => {
      e.preventDefault(); setOver(false);
      const json = e.dataTransfer.getData("application/json");
      if (json) {
        try { const row = JSON.parse(json); onDropItem?.(row); }
        catch {}
      }
    },
  };

  return (
    <div
      {...dragProps}
      className={`border rounded-2xl overflow-hidden bg-card flex flex-col transition-all ${
        over ? "ring-2 ring-emerald-400 border-emerald-300 bg-emerald-50/40" : ""
      }`}
      style={{ height: height || undefined }}
    >
      {!data ? (
        <div className="h-full p-6 text-sm text-muted-foreground flex items-center justify-center">
          Arrastra una reserva aquí o selecciónala en la tabla.
        </div>
      ) : (
        <>
          {image && (
            <div className="relative w-full aspect-[4/3] flex-none overflow-hidden">
              <img src={image} alt={nombre} className="h-full w-full object-cover" />
              <Badge className="absolute left-3 top-3 bg-background/80 backdrop-blur border">{estado}</Badge>
            </div>
          )}

          <div className="flex-1 overflow-auto p-4 space-y-4">
            <div className="flex items-start justify-between">
              <div className="font-semibold">{nombre}</div>
              {data?.ubicacion && (
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin className="size-3.5" /> {data.ubicacion}
                </div>
              )}
            </div>

            <div className="text-sm text-muted-foreground">
              {data?.fecha && (<div><span className="font-medium text-foreground">Fecha:</span> {data.fecha}</div>)}
              {horario && (<div><span className="font-medium text-foreground">Horario:</span> {horario}</div>)}
            </div>

            {services.length > 0 && (
              <div>
                <div className="text-xs font-medium mb-2 text-muted-foreground">Servicios incluidos</div>
                <div className="grid grid-cols-2 gap-2">
                  {services.map(({ key, label, icon: Icon }) => (
                    <div key={key} className="flex items-center gap-2 rounded-lg border px-2 py-1.5 text-xs">
                      <Icon className="size-4 text-muted-foreground" />
                      <span>{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Acciones por estado */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              {estado === "Pendiente" && (
                <>
                  <Button size="sm" onClick={() => handle("pagar")}>Pagar ahora</Button>
                  <Button variant="outline" size="sm" onClick={() => handle("reprogramar")}>Reprogramar</Button>
                  <Button variant="outline" size="sm" onClick={() => handle("cancelar")}>Cancelar</Button>
                </>
              )}

              {estado === "Reservado" && (
                <Button variant="outline" size="sm" onClick={() => handle("cancelar")}>Cancelar</Button>
              )}

              {estado === "Cancelado" && (
                <Button variant="outline" size="sm" onClick={() => handle("comprobante")}>Ver comprobante</Button>
              )}

              {estado === "Finalizado" && (
                <>
                  <Button variant="outline" size="sm" onClick={() => handle("comprobante")}>Ver comprobante</Button>
                  <Button size="sm" onClick={() => handle("reservar")}>Reservar nuevamente</Button>
                </>
              )}

              <Button variant="outline" size="sm" onClick={onClear}>Cerrar</Button>
            </div>

            <p className="text-xs text-muted-foreground">
              Nota: También puedes soltar aquí otra reserva desde la tabla.
            </p>
          </div>
        </>
      )}
    </div>
  );
}
