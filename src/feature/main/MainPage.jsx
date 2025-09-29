// src/feature/main/MainPage.jsx
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Calendar as CalendarIcon,
  Clock3,
  MapPin,
  Megaphone,
  Users,
  Ticket,
  Wrench,
  Gift,
  PartyPopper,
  Info,
  Paperclip,
  ExternalLink,
} from "lucide-react";

import HeroClub from "./components/HeroClub";
import heroImg from "@/assets/undraw_welcome_nk8k.svg";

export default function MainPage() {
  // ====== MOCK (reemplaza por tu API) ======
  const eventos = [
    {
      id: 1,
      nombre: "Noche de Trivia",
      fecha: "04/10/2025",
      hora: "19:00",
      lugar: "Salón Central",
      modalidad: "Gratis",
      cuposTotales: 30,
      cuposDisponibles: 8,
    },
    {
      id: 2,
      nombre: "Torneo Relámpago",
      fecha: "06/10/2025",
      hora: "10:00",
      lugar: "Cancha 1",
      modalidad: "Pago",
      cuposTotales: 16,
      cuposDisponibles: 4,
    },
  ];

  const reservas = [
    {
      id: 101,
      titulo: "Salón Elegance",
      fecha: "30/09/2025",
      hora: "18:00–20:00",
      estado: "Confirmada",
    },
    {
      id: 102,
      titulo: "Cancha Fútbol 1",
      fecha: "01/10/2025",
      hora: "10:00–12:00",
      estado: "Pendiente",
    },
    {
      id: 103,
      titulo: "Sala Reuniones B",
      fecha: "03/10/2025",
      hora: "09:00–10:30",
      estado: "Confirmada",
    },
  ];

  // ====== ANUNCIOS DETALLADOS ======
  const anuncios = [
    {
      id: 1,
      tipo: "Mantenimiento",
      tone: "warning",
      titulo: "Piscina cerrada",
      detalle: "Limpieza y control de pH programado.",
      fecha: "jue 03/10/2025",
      hora: "3:00–5:00 p.m.",
      lugar: "Zona de piscinas",
      enlace: "/disponibilidad",
      adjuntos: [{ name: "Plan de mantenimiento.pdf" }],
    },
    {
      id: 2,
      tipo: "Beneficio",
      tone: "success",
      titulo: "Nuevo convenio con gimnasio",
      detalle: "10% de descuento para socios presentando el carnet.",
      fecha: "vie 04/10/2025",
      hora: "Todo el día",
      lugar: "Gimnasio Partner",
      enlace: "/pagos",
      adjuntos: [],
    },
    {
      id: 3,
      tipo: "Actividad",
      tone: "info",
      titulo: "Taller de Ajedrez — inscripciones abiertas",
      detalle: "Cupos limitados. Nivel inicial e intermedio.",
      fecha: "sáb 05/10/2025",
      hora: "6:00–8:00 p.m.",
      lugar: "Sala 2",
      enlace: "/disponibilidad",
      adjuntos: [{ name: "Programa_Taller.pdf" }, { name: "Reglamento.pdf" }],
    },
  ];

  // helpers
  const toneBadge = (tone) =>
    tone === "warning"
      ? "bg-amber-500/15 text-amber-700"
      : tone === "success"
      ? "bg-emerald-500/15 text-emerald-700"
      : "bg-sky-500/15 text-sky-700";

  const tipoIcon = (tipo) => {
    if (tipo === "Mantenimiento") return <Wrench className="h-4 w-4" />;
    if (tipo === "Beneficio") return <Gift className="h-4 w-4" />;
    if (tipo === "Actividad") return <PartyPopper className="h-4 w-4" />;
    return <Info className="h-4 w-4" />;
  };

  return (
    <div className="p-6 md:p-8 space-y-6">
      <HeroClub nombre="Luis Enrique" badge="Premium" imageSrc={heroImg} />

      {/* ===== 3 CARDS ALTAS ===== */}
      <div className="grid gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-3 items-stretch">
        {/* ========= EVENTOS ========= */}
        <Card className="h-full min-h-[420px] flex flex-col">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <span className="grid h-8 w-8 place-items-center rounded-xl bg-[#5951e6]/10">
                <CalendarIcon className="h-4 w-4 text-[#5951e6]" />
              </span>
              Eventos del club social
            </CardTitle>
          </CardHeader>

          <CardContent className="flex-1 space-y-4 overflow-auto">
            {eventos.map((e) => {
              const pct = Math.max(
                0,
                Math.min(
                  100,
                  Math.round((e.cuposDisponibles / e.cuposTotales) * 100)
                )
              );
              return (
                <div
                  key={e.id}
                  className="rounded-lg border p-4 hover:bg-muted/40 transition"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="font-semibold">{e.nombre}</div>
                      <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                        <span className="inline-flex items-center gap-1">
                          <CalendarIcon className="h-3.5 w-3.5" />
                          {e.fecha}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <Clock3 className="h-3.5 w-3.5" />
                          {e.hora}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <MapPin className="h-3.5 w-3.5" />
                          {e.lugar}
                        </span>
                      </div>
                    </div>

                    <Badge
                      variant="secondary"
                      className="shrink-0 inline-flex items-center gap-1"
                    >
                      <Ticket className="h-3.5 w-3.5" />
                      {e.modalidad}
                    </Badge>
                  </div>

                  {/* Cupos */}
                  <div className="mt-3">
                    <div className="h-1.5 w-full rounded-full bg-muted">
                      <div
                        className="h-1.5 rounded-full bg-[#5951e6]"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <div className="mt-1 flex items-center justify-between text-[11px] text-muted-foreground">
                      <span>
                        {e.cuposDisponibles} de {e.cuposTotales} cupos
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Users className="h-3.5 w-3.5" />
                        {pct}% libre
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </CardContent>

          <CardFooter className="justify-end gap-2 pt-0">
            <Link to="/disponibilidad">
              <Button variant="outline" size="sm">
                Explorar eventos
              </Button>
            </Link>
            <Link to="/disponibilidad">
              <Button size="sm">Ver calendario</Button>
            </Link>
          </CardFooter>
        </Card>

        {/* ======== RESERVAS (timeline) ======== */}
        <Card className="h-full min-h-[420px] flex flex-col">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <span className="grid h-8 w-8 place-items-center rounded-xl bg-[#5951e6]/10">
                <Clock3 className="h-4 w-4 text-[#5951e6]" />
              </span>
              Próximas reservas
            </CardTitle>
          </CardHeader>

          {/* ← PR más ancho para que el badge no se “pegue” */}
          <CardContent className="flex-1 overflow-auto pr-3">
            {reservas.length === 0 && (
              <div className="text-sm text-muted-foreground">
                No tienes reservas próximas.
              </div>
            )}

            {reservas.length > 0 && (
              <div className="relative">
                {/* Línea vertical */}
                <div className="absolute left-3 top-0 bottom-0 w-px bg-border" />
                <div className="space-y-5">
                  {reservas.map((r) => (
                    <div key={r.id} className="relative pl-8">
                      {/* Punto */}
                      <span
                        className={[
                          "absolute left-2 top-1.5 h-3 w-3 rounded-full ring-2 ring-background",
                          r.estado === "Confirmada"
                            ? "bg-emerald-500"
                            : "bg-amber-500",
                        ].join(" ")}
                      />
                      {/* Fila sin justify-between; badge empujado con ml-auto */}
                      <div className="flex items-start gap-3 pr-2">
                        <div className="min-w-0">
                          <div className="font-medium truncate">{r.titulo}</div>
                          <div className="text-xs text-muted-foreground">
                            {r.fecha} • {r.hora}
                          </div>
                        </div>
                        <Badge
                          variant="secondary"
                          className={[
                            "ml-auto shrink-0 self-start",
                            r.estado === "Confirmada"
                              ? "bg-emerald-500/15 text-emerald-700"
                              : "bg-amber-500/15 text-amber-700",
                          ].join(" ")}
                        >
                          {r.estado}
                        </Badge>
                      </div>
                      <div className="mt-2 flex gap-2 pr-2">
                        <Button variant="outline" size="sm">
                          Detalles
                        </Button>
                        <Button variant="ghost" size="sm">
                          Cancelar
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>

          <CardFooter className="justify-end pt-0">
            <Link to="/disponibilidad">
              <Button variant="outline" size="sm">
                Ver reservas
              </Button>
            </Link>
          </CardFooter>
        </Card>

        {/* ========== ANUNCIOS (alto fijo + scroll interno) ========== */}
        <Card className="h-[420px] md:h-[460px] flex flex-col">
          <CardHeader className="pb-3 sticky top-0 z-10 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
            <CardTitle className="flex items-center gap-2">
              <span className="grid h-8 w-8 place-items-center rounded-xl bg-[#5951e6]/10">
                <Megaphone className="h-4 w-4 text-[#5951e6]" />
              </span>
              Anuncios
            </CardTitle>
          </CardHeader>

          <CardContent className="flex-1 overflow-y-auto pr-2 space-y-3">
            {anuncios.length === 0 && (
              <div className="text-sm text-muted-foreground">Sin anuncios.</div>
            )}

            {anuncios.map((a) => (
              <div key={a.id} className="rounded-lg border p-4 bg-card/50">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className={[
                        "grid h-7 w-7 place-items-center rounded-full",
                        a.tone === "warning"
                          ? "bg-amber-500/15 text-amber-700"
                          : a.tone === "success"
                          ? "bg-emerald-500/15 text-emerald-700"
                          : "bg-sky-500/15 text-sky-700",
                      ].join(" ")}
                    >
                      {a.tipo === "Mantenimiento" ? (
                        <Wrench className="h-4 w-4" />
                      ) : a.tipo === "Beneficio" ? (
                        <Gift className="h-4 w-4" />
                      ) : a.tipo === "Actividad" ? (
                        <PartyPopper className="h-4 w-4" />
                      ) : (
                        <Info className="h-4 w-4" />
                      )}
                    </span>
                    <div className="font-medium">{a.titulo}</div>
                  </div>
                  <Badge variant="secondary" className={toneBadge(a.tone)}>
                    {a.tipo}
                  </Badge>
                </div>

                <p className="mt-2 text-sm text-muted-foreground">
                  {a.detalle}
                </p>

                <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <CalendarIcon className="h-3.5 w-3.5" /> {a.fecha}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Clock3 className="h-3.5 w-3.5" /> {a.hora}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" /> {a.lugar}
                  </span>
                </div>

                {a.adjuntos?.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {a.adjuntos.map((f, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1 rounded-md border bg-background px-2 py-1 text-xs"
                      >
                        <Paperclip className="h-3.5 w-3.5" />
                        {f.name}
                      </span>
                    ))}
                  </div>
                )}

                <div className="mt-3 flex justify-end">
                  <Link to={a.enlace}>
                    <Button variant="ghost" size="sm" className="gap-2">
                      Ver
                      <ExternalLink className="h-3.5 w-3.5" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </CardContent>

          <CardFooter className="justify-end pt-2 sticky bottom-0 z-10 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
            <Link to="/disponibilidad">
              <Button variant="outline" size="sm">
                Ver todos
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
