import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Clock,
  GripVertical,
} from "lucide-react";
import { toast } from "sonner";

/* ----------------------------- Configuración ----------------------------- */
const START_HOUR = 8; // 08:00
const END_HOUR = 18; // 18:00
const SLOT_MIN = 30; // tamaño del bloque
const CELL_H = 28; // alto px por bloque de 30 min
const LEFT_COL_W = 64; // ancho de columna de horas
const COL_GAP = 8; // separación entre días
const MIN_DURATION = 30; // duración mínima (minutos)

const estadoToClass = {
  Reservado: "border-emerald-300 bg-emerald-100/70 text-emerald-900",
  Pendiente: "border-amber-300 bg-amber-100/70 text-amber-900",
  Cancelado: "border-rose-300 bg-rose-100/70 text-rose-900",
  Finalizado: "border-sky-300 bg-sky-100/70 text-sky-900",
};

const diaCorto = ["lun", "mar", "mié", "jue", "vie", "sáb", "dom"];

/* ------------------------------ Utilidades ------------------------------- */
function ymd(d) {
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${m}-${dd}`;
}
function startOfWeek(date) {
  const d = new Date(date);
  const day = (d.getDay() + 6) % 7; // lunes=0
  d.setDate(d.getDate() - day);
  d.setHours(0, 0, 0, 0);
  return d;
}
function addDays(date, n) {
  const d = new Date(date);
  d.setDate(d.getDate() + n);
  return d;
}
function startOfMonthGrid(date) {
  const first = new Date(date.getFullYear(), date.getMonth(), 1);
  return startOfWeek(first);
}
function hhmmToMin(t) {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
}
function minToHHMM(m) {
  const hh = Math.floor(m / 60);
  const mm = m % 60;
  return `${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}`;
}
function clamp(v, min, max) {
  return Math.max(min, Math.min(max, v));
}
function roundToSlot(mins) {
  const base = START_HOUR * 60;
  const rel = mins - base;
  const slots = Math.round(rel / SLOT_MIN);
  return base + slots * SLOT_MIN;
}

/* ------------------------------ Datos de demo ---------------------------- */
const DEMO = [
  {
    id: 1,
    ambienteId: 1,
    ambiente: "Salón Elegance",
    fechaISO: "2025-09-26",
    inicio: "15:00",
    fin: "17:00",
    estado: "Reservado",
  },
  {
    id: 2,
    ambienteId: 2,
    ambiente: "Cancha Fútbol 1",
    fechaISO: "2025-09-27",
    inicio: "10:00",
    fin: "12:00",
    estado: "Pendiente",
  },
  {
    id: 3,
    ambienteId: 3,
    ambiente: "Jardín Primavera",
    fechaISO: "2025-09-28",
    inicio: "13:00",
    fin: "15:00",
    estado: "Cancelado",
  },
  {
    id: 4,
    ambienteId: 4,
    ambiente: "Sala de Conf.",
    fechaISO: "2025-09-30",
    inicio: "09:00",
    fin: "11:00",
    estado: "Finalizado",
  },
  {
    id: 5,
    ambienteId: 2,
    ambiente: "Cancha Fútbol 1",
    fechaISO: "2025-09-27",
    inicio: "12:30",
    fin: "13:30",
    estado: "Reservado",
  },
];

/* -------------------------------- Componente ----------------------------- */
export default function ReservasCalendarLite() {
  const [vista, setVista] = useState("semana"); // "semana" | "mes"
  const [cursor, setCursor] = useState(new Date("2025-09-26"));
  const [items, setItems] = useState(DEMO);
  const [detalle, setDetalle] = useState(null);

  const todayISO = ymd(new Date()); // ← para resaltar hoy

  const gridRef = useRef(null);
  const [colWidth, setColWidth] = useState(120);

  // drag/resize
  const [activeId, setActiveId] = useState(null);
  const [mode, setMode] = useState(null); // "move" | "resize-start" | "resize-end"
  const [dragOffset, setDragOffset] = useState(0);
  const [dragDur, setDragDur] = useState(0);
  const beforeEditRef = useRef(null);
  const [invalid, setInvalid] = useState(false);

  const wkStart = useMemo(() => startOfWeek(cursor), [cursor]);
  const days = useMemo(
    () => Array.from({ length: 7 }, (_, i) => addDays(wkStart, i)),
    [wkStart]
  );

  const titulo = useMemo(() => {
    if (vista === "mes") {
      return cursor.toLocaleString("es-PE", { month: "long", year: "numeric" });
    }
    const end = addDays(wkStart, 6);
    const fmt = (d) =>
      d.toLocaleDateString("es-PE", { day: "numeric", month: "short" });
    return `${fmt(wkStart)} – ${fmt(end)} ${cursor.getFullYear()}`;
  }, [vista, wkStart, cursor]);

  const altoGrid = (((END_HOUR - START_HOUR) * 60) / SLOT_MIN) * CELL_H;

  // medir ancho
  useEffect(() => {
    function measure() {
      if (!gridRef.current) return;
      const width = gridRef.current.clientWidth - LEFT_COL_W;
      const w = (width - COL_GAP * 6) / 7;
      setColWidth(w);
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  /* ----------------------------- Nav ----------------------------- */
  const prev = () =>
    setCursor(vista === "mes" ? addDays(cursor, -28) : addDays(cursor, -7));
  const next = () =>
    setCursor(vista === "mes" ? addDays(cursor, 28) : addDays(cursor, 7));
  const today = () => setCursor(new Date());

  /* ----------------------- Choques por ambiente ------------------- */
  function conflict(r, diaISO, iniMin, finMin) {
    return items.some((it) => {
      if (it.id === r.id) return false;
      if (it.ambienteId !== r.ambienteId) return false;
      if (it.fechaISO !== diaISO) return false;
      const s = hhmmToMin(it.inicio),
        e = hhmmToMin(it.fin);
      return iniMin < e && s < finMin;
    });
  }

  /* ----------------------- Drag & Resize -------------------------- */
  function startMove(e, r) {
    if (vista !== "semana" || !gridRef.current) return;
    const rect = gridRef.current.getBoundingClientRect();
    const y = e.clientY - rect.top;
    const startMin = hhmmToMin(r.inicio);
    const topPx = ((startMin - START_HOUR * 60) / SLOT_MIN) * CELL_H;

    beforeEditRef.current = items;
    setActiveId(r.id);
    setMode("move");
    setDragOffset(y - topPx);
    setDragDur(hhmmToMin(r.fin) - startMin);
    setInvalid(false);
    e.preventDefault();
  }
  function startResize(e, r, edge) {
    if (vista !== "semana" || !gridRef.current) return;
    beforeEditRef.current = items;
    setActiveId(r.id);
    setMode(edge);
    setDragDur(hhmmToMin(r.fin) - hhmmToMin(r.inicio));
    setInvalid(false);
    e.preventDefault();
    e.stopPropagation();
  }

  useEffect(() => {
    function onMove(e) {
      if (!activeId || !gridRef.current || !mode) return;

      const rect = gridRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const target = items.find((i) => i.id === activeId);
      if (!target) return;

      // índice de día (centros de columna)
      const step = colWidth + COL_GAP;
      let dayIdx = Math.round((x - LEFT_COL_W - colWidth / 2) / step);
      dayIdx = clamp(dayIdx, 0, 6);
      const newDay = ymd(days[dayIdx]);

      // posición vertical → minutos snapeados
      const rawMin =
        START_HOUR * 60 +
        Math.round((y - (mode === "move" ? dragOffset : 0)) / CELL_H) *
          SLOT_MIN;
      const snappedMin = clamp(
        roundToSlot(rawMin),
        START_HOUR * 60,
        END_HOUR * 60
      );

      setItems((prev) =>
        prev.map((it) => {
          if (it.id !== activeId) return it;

          let newStart = hhmmToMin(it.inicio);
          let newEnd = hhmmToMin(it.fin);

          if (mode === "move") {
            newStart = clamp(
              snappedMin,
              START_HOUR * 60,
              END_HOUR * 60 - dragDur
            );
            newEnd = newStart + dragDur;
          } else if (mode === "resize-start") {
            const maxStart = newEnd - MIN_DURATION;
            newStart = clamp(snappedMin, START_HOUR * 60, maxStart);
          } else if (mode === "resize-end") {
            const minEnd = newStart + MIN_DURATION;
            const yEndRaw = START_HOUR * 60 + Math.round(y / CELL_H) * SLOT_MIN;
            newEnd = clamp(roundToSlot(yEndRaw), minEnd, END_HOUR * 60);
          }

          const hasConflict = conflict(it, newDay, newStart, newEnd);
          setInvalid(hasConflict);

          return {
            ...it,
            fechaISO: newDay,
            inicio: minToHHMM(newStart),
            fin: minToHHMM(newEnd),
          };
        })
      );
    }

    function onUp() {
      if (!activeId || !mode) return;
      if (invalid) {
        setItems(beforeEditRef.current || DEMO);
        toast.error("Conflicto con otra reserva del mismo ambiente");
      } else {
        toast.success(
          mode === "move"
            ? "Reserva reprogramada (demo)"
            : "Duración actualizada (demo)"
        );
      }
      setActiveId(null);
      setMode(null);
      setInvalid(false);
    }

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, [activeId, mode, dragOffset, dragDur, items, days, colWidth, invalid]);

  /* ------------------------------ Week View ------------------------------- */
  function WeekView() {
    // ¿hoy está visible?
    const todayIdx = days.findIndex((d) => ymd(d) === todayISO);

    return (
      <div className="border rounded-2xl overflow-hidden">
        {/* Head de días */}
        <div className="grid grid-cols-[64px_1fr]">
          <div className="bg-muted/40 p-2 text-xs font-medium border-b">
            Todo el día
          </div>
          <div className="grid grid-cols-7">
            {days.map((d, i) => (
              <div
                key={i}
                className={`bg-muted/40 border-b p-2 text-xs font-semibold text-center ${
                  ymd(d) === todayISO ? "text-amber-700" : ""
                }`}
              >
                {diaCorto[i]} {String(d.getDate()).padStart(2, "0")}/
                {d.getMonth() + 1}
              </div>
            ))}
          </div>
        </div>

        {/* Cuerpo */}
        <div
          ref={gridRef}
          className="relative bg-background"
          style={{ height: altoGrid }}
        >
          {/* ✅ Overlay de HOY (debajo de todo, no captura eventos) */}
          {todayIdx >= 0 && (
            <div
              className="absolute top-0 bottom-0 pointer-events-none bg-amber-50/60"
              style={{
                left: LEFT_COL_W + todayIdx * (colWidth + COL_GAP),
                width: colWidth,
                zIndex: 0,
              }}
              aria-hidden
            />
          )}

          {/* Horas a la izquierda */}
          <div
            className="absolute left-0 top-0 w-16 h-full border-r bg-background z-10"
            aria-hidden
          >
            {Array.from(
              { length: END_HOUR - START_HOUR + 1 },
              (_, i) => START_HOUR + i
            ).map((h, i) => (
              <div
                key={i}
                className="absolute left-0 w-16 text-[11px] text-muted-foreground pl-2 -translate-y-1/2"
                style={{ top: i * (CELL_H * 2) }}
              >
                {String(h).padStart(2, "0")}:00
              </div>
            ))}
          </div>

          {/* Verticales de días */}
          {Array.from({ length: 8 }, (_, i) => (
            <div
              key={i}
              className="absolute top-0 bottom-0 border-l"
              style={{
                left:
                  i === 0
                    ? LEFT_COL_W
                    : LEFT_COL_W + i * colWidth + (i - 1) * COL_GAP,
              }}
              aria-hidden
            />
          ))}

          {/* Horizontales por slot */}
          {Array.from(
            { length: ((END_HOUR - START_HOUR) * 60) / SLOT_MIN + 1 },
            (_, r) => r
          ).map((r) => (
            <div
              key={r}
              className={`absolute left-16 right-0 ${
                r % 2 === 0 ? "border-t" : "border-t border-muted/60"
              }`}
              style={{ top: r * CELL_H }}
              aria-hidden
            />
          ))}

          {/* Eventos */}
          {items.map((r) => {
            const dIdx = days.findIndex((d) => ymd(d) === r.fechaISO);
            if (dIdx < 0) return null;

            const startMin = hhmmToMin(r.inicio);
            const endMin = hhmmToMin(r.fin);
            const top = ((startMin - START_HOUR * 60) / SLOT_MIN) * CELL_H;
            const height = ((endMin - startMin) / SLOT_MIN) * CELL_H;
            const left = LEFT_COL_W + dIdx * (colWidth + COL_GAP);
            const width = colWidth;
            const isActive = activeId === r.id;

            return (
              <div
                key={r.id}
                className={`group absolute rounded-xl border shadow-sm px-2 py-1 text-xs ${
                  estadoToClass[r.estado]
                } ${isActive && mode ? "ring-2 ring-primary/50" : ""} ${
                  isActive && invalid ? "ring-2 ring-rose-400" : ""
                } cursor-grab active:cursor-grabbing`}
                style={{ top, left, width, height, zIndex: 1 }} // encima del overlay
                onMouseDown={(e) => startMove(e, r)}
                onDoubleClick={() => setDetalle(r)}
                role="button"
                tabIndex={0}
              >
                <div className="flex items-center gap-1">
                  <GripVertical className="size-3 opacity-60" />
                  <span className="font-medium truncate">{r.ambiente}</span>
                </div>
                <div className="flex items-center gap-1 text-[11px] mt-1 opacity-80">
                  <Clock className="size-3" />
                  <span>
                    {r.inicio} – {r.fin}
                  </span>
                </div>

                {/* handlers de resize ocultos */}
                <div
                  className="absolute left-1 right-1 top-0 h-2 opacity-0 cursor-ns-resize"
                  onMouseDown={(e) => startResize(e, r, "resize-start")}
                  aria-label="Reducir desde inicio"
                />
                <div
                  className="absolute left-1 right-1 bottom-0 h-2 opacity-0 cursor-ns-resize"
                  onMouseDown={(e) => startResize(e, r, "resize-end")}
                  aria-label="Extender desde fin"
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  /* ------------------------------ Month View ------------------------------ */
  function MonthView() {
    const gridStart = startOfMonthGrid(cursor);
    const cells = Array.from({ length: 42 }, (_, i) => addDays(gridStart, i)); // 6 semanas

    return (
      <div className="border rounded-2xl overflow-hidden">
        {/* Días de semana */}
        <div className="grid grid-cols-7 bg-muted/40 border-b">
          {diaCorto.map((d) => (
            <div key={d} className="p-2 text-xs font-semibold text-center">
              {d}
            </div>
          ))}
        </div>

        {/* Celdas */}
        <div className="grid grid-cols-7 gap-px bg-border">
          {cells.map((d, i) => {
            const isThisMonth = d.getMonth() === cursor.getMonth();
            const diaISO = ymd(d);
            const dayItems = items.filter((r) => r.fechaISO === diaISO);
            const isToday = diaISO === todayISO;

            return (
              <div
                key={i}
                className={`min-h-28 p-2 ${
                  isThisMonth ? "bg-background" : "bg-background/70 opacity-60"
                } ${isToday ? "bg-amber-50/70" : ""}`}
              >
                <div className="text-xs text-muted-foreground mb-2">
                  {d.getDate()}
                </div>
                <div className="space-y-1">
                  {dayItems.slice(0, 2).map((r) => (
                    <div
                      key={r.id}
                      className={`rounded-md border px-2 py-1 text-[11px] cursor-pointer hover:opacity-90 ${
                        estadoToClass[r.estado]
                      }`}
                      onClick={() => setDetalle(r)}
                    >
                      <div className="font-medium truncate">{r.ambiente}</div>
                      <div className="opacity-80">
                        {r.inicio}–{r.fin}
                      </div>
                    </div>
                  ))}
                  {dayItems.length > 2 && (
                    <div className="text-[11px] text-muted-foreground">
                      +{dayItems.length - 2} más
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  /* --------------------------------- UI ---------------------------------- */
  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={prev}
            aria-label="Anterior"
          >
            <ChevronLeft className="size-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={next}
            aria-label="Siguiente"
          >
            <ChevronRight className="size-4" />
          </Button>
          <Button variant="outline" onClick={today} className="gap-2">
            <CalendarIcon className="size-4" /> Hoy
          </Button>
          <span className="ml-2 text-base md:text-lg font-semibold">
            {titulo}
          </span>
        </div>

        {/* Botones Mes / Semana */}
        <div className="inline-flex p-1 rounded-xl border bg-card">
          <Button
            type="button"
            variant={vista === "mes" ? "default" : "ghost"}
            onClick={() => setVista("mes")}
            className="h-8"
          >
            Mes
          </Button>
          <Button
            type="button"
            variant={vista === "semana" ? "default" : "ghost"}
            onClick={() => setVista("semana")}
            className="h-8"
          >
            Semana
          </Button>
        </div>
      </div>

      {/* Calendario */}
      {vista === "semana" ? <WeekView /> : <MonthView />}

      {/* Leyenda */}
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="text-muted-foreground mr-1">Estados:</span>
        <Badge variant="outline" className={estadoToClass.Reservado}>
          Reservado
        </Badge>
        <Badge variant="outline" className={estadoToClass.Pendiente}>
          Pendiente
        </Badge>
        <Badge variant="outline" className={estadoToClass.Cancelado}>
          Cancelado
        </Badge>
        <Badge variant="outline" className={estadoToClass.Finalizado}>
          Finalizado
        </Badge>
      </div>

      {/* Dialog de detalle */}
      <Dialog open={!!detalle} onOpenChange={(o) => !o && setDetalle(null)}>
        <DialogContent>
          {detalle && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <GripVertical className="size-4 opacity-60" />
                  {detalle.ambiente}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className={estadoToClass[detalle.estado]}
                  >
                    {detalle.estado}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="size-4" />
                  <span>
                    {detalle.fechaISO} · {detalle.inicio} – {detalle.fin}
                  </span>
                </div>
                <p className="text-muted-foreground">
                  (Demo) Aquí podrías mostrar políticas del ambiente, ubicación,
                  responsable, etc.
                </p>
              </div>
              <DialogFooter className="gap-2">
                <Button
                  variant="outline"
                  onClick={() => toast.message("Ver comprobante (demo)")}
                >
                  Ver comprobante
                </Button>
                <Button
                  onClick={() => toast.success("Acción principal (demo)")}
                >
                  Acción principal
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
