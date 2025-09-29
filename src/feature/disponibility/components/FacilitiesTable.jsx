// src/feature/disponibility/components/FacilitiesTable.jsx
import { useState, useMemo, useEffect, forwardRef } from "react";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Pagination, PaginationContent, PaginationEllipsis, PaginationItem,
  PaginationLink, PaginationNext, PaginationPrevious,
} from "@/components/ui/pagination";
import { GripVertical } from "lucide-react";

/* utils */
const toISO = (ddmmyyyy) => {
  const [d, m, y] = ddmmyyyy.split("/");
  return `${y}-${m}-${d}`;
};
const startMin = (hi) => {
  const [h, m] = hi.split(":").map(Number);
  return h * 60 + m;
};

const FacilitiesTable = forwardRef(function FacilitiesTable(
  { query = "", estado = "", pageSize = 5, onRowClick, rows, className, onRowDragStart, onRowDragEnd },
  ref
) {
  // Imágenes demo
  const IMG_FUTBOL = "https://v0-ui-redesign-pearl.vercel.app/soccer-field-outdoor-grass.jpg";
  const IMG_ELEGANCE = "https://v0-ui-redesign-pearl.vercel.app/elegant-event-hall-interior.jpg";
  const IMG_JARDIN = "https://v0-ui-redesign-pearl.vercel.app/beautiful-garden-outdoor-event-space.jpg";
  const IMG_PARRILLAS = "https://v0-ui-redesign-pearl.vercel.app/outdoor-barbecue-grill-area.jpg";
  const IMG_CONFERENCIAS = "https://v0-ui-redesign-pearl.vercel.app/modern-conference-room-interior.jpg";
  const IMG_TENIS = "https://v0-ui-redesign-pearl.vercel.app/outdoor-tennis-court.png";

  const [reservas, setReservas] = useState(
    rows ?? [
      { id: 1, nombre: "Salón Elegance", fecha: "26/09/2025", horaInicio: "15:00", horaFin: "17:00", estado: "Reservado", img: IMG_ELEGANCE },
      { id: 2, nombre: "Cancha Fútbol 1", fecha: "27/09/2025", horaInicio: "10:00", horaFin: "12:00", estado: "Pendiente", img: IMG_FUTBOL },
      { id: 3, nombre: "Jardín Primavera", fecha: "28/09/2025", horaInicio: "18:00", horaFin: "20:00", estado: "Cancelado", img: IMG_JARDIN },
      { id: 4, nombre: "Zona Parrillas", fecha: "29/09/2025", horaInicio: "13:00", horaFin: "16:00", estado: "Pendiente", img: IMG_PARRILLAS },
      { id: 5, nombre: "Sala de Conferencias", fecha: "30/09/2025", horaInicio: "09:00", horaFin: "11:00", estado: "Finalizado", img: IMG_CONFERENCIAS },
      { id: 6, nombre: "Cancha de Tenis", fecha: "01/10/2025", horaInicio: "17:00", horaFin: "18:30", estado: "Reservado", img: IMG_TENIS },
    ]
  );

  useEffect(() => { if (rows) setReservas(rows); }, [rows]);

  /* Filtro + orden */
  const q = query.trim().toLowerCase();
  const filtered = useMemo(
    () => reservas.filter((r) => {
      const byQ = !q || r.nombre.toLowerCase().includes(q);
      const byEstado = !estado || r.estado === estado;
      return byQ && byEstado;
    }),
    [reservas, q, estado]
  );

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      const fa = toISO(a.fecha), fb = toISO(b.fecha);
      if (fa !== fb) return fa < fb ? -1 : 1;
      return startMin(a.horaInicio) - startMin(b.horaInicio);
    });
  }, [filtered]);

  /* Paginación */
  const [page, setPage] = useState(1);
  const total = sorted.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  useEffect(() => setPage(1), [q, estado, pageSize]);
  useEffect(() => setPage((p) => Math.min(p, totalPages)), [totalPages]);

  const pageData = useMemo(() => {
    const start = (page - 1) * pageSize;
    return sorted.slice(start, start + pageSize);
  }, [sorted, page, pageSize]);

  const pageNumbers = useMemo(() => {
    const nums = [];
    if (totalPages <= 6) {
      for (let i = 1; i <= totalPages; i++) nums.push(i);
      return nums;
    }
    nums.push(1);
    if (page > 3) nums.push("…L");
    for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) nums.push(i);
    if (page < totalPages - 2) nums.push("…R");
    nums.push(totalPages);
    return nums;
  }, [page, totalPages]);

  /* Badges por estado — con variantes dark */
  const getBadgeClass = (estado) =>
    estado === "Reservado"
      ? "bg-emerald-100 text-emerald-800 ring-1 ring-inset ring-emerald-200/60 dark:bg-emerald-500/15 dark:text-emerald-300 dark:ring-emerald-400/30"
      : estado === "Pendiente"
      ? "bg-amber-100 text-amber-900 ring-1 ring-inset ring-amber-200/60 dark:bg-amber-500/15 dark:text-amber-200 dark:ring-amber-400/30"
      : estado === "Cancelado"
      ? "bg-rose-100 text-rose-800 ring-1 ring-inset ring-rose-200/60 dark:bg-rose-500/15 dark:text-rose-300 dark:ring-rose-400/30"
      : estado === "Finalizado"
      ? "bg-sky-100 text-sky-800 ring-1 ring-inset ring-sky-200/60 dark:bg-sky-500/15 dark:text-sky-300 dark:ring-sky-400/30"
      : "bg-muted text-muted-foreground ring-1 ring-inset ring-border";

  /* DnD — handle */
  const startDrag = (e, row) => {
    e.stopPropagation();
    try {
      e.dataTransfer.setData("application/json", JSON.stringify(row));
      e.dataTransfer.setData("text/plain", row.nombre);
    } catch {}
    e.dataTransfer.effectAllowed = "copy";
    onRowDragStart?.(row);
  };
  const endDrag = () => onRowDragEnd?.();

  return (
    <div
      ref={ref}
      className={`overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm ${className || ""}`}
    >
      <Table>
        <TableHeader>
          <TableRow className="border-b bg-muted/40 dark:bg-muted/30">
            <TableHead className="py-3 text-xs font-bold uppercase tracking-wide text-muted-foreground">Ambiente</TableHead>
            <TableHead className="py-3 text-xs font-bold uppercase tracking-wide text-muted-foreground">Fecha</TableHead>
            <TableHead className="py-3 text-xs font-bold uppercase tracking-wide text-muted-foreground">Horario</TableHead>
            <TableHead className="py-3 text-xs font-bold uppercase tracking-wide text-muted-foreground">Estado</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {pageData.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="py-8 text-center text-sm text-muted-foreground">
                No hay registros para mostrar.
              </TableCell>
            </TableRow>
          ) : (
            pageData.map((row) => (
              <TableRow
                key={row.id}
                className="transition-colors hover:bg-muted/20 cursor-pointer"
                onClick={() => onRowClick?.(row)}
              >
                <TableCell className="flex items-center gap-3 py-4">
                  {/* HANDLE de arrastre */}
                  <button
                    aria-label="Arrastrar para ver detalle"
                    className="p-1 rounded hover:bg-muted/50 cursor-grab active:cursor-grabbing"
                    draggable
                    onDragStart={(e) => startDrag(e, row)}
                    onDragEnd={endDrag}
                    onClick={(e) => e.stopPropagation()}
                    title="Arrástrame al panel derecho"
                  >
                    <GripVertical className="h-4 w-4 text-muted-foreground" />
                  </button>

                  {row.img ? (
                    <img
                      src={row.img}
                      alt={row.nombre}
                      className="h-12 w-12 rounded-md border object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="h-12 w-12 rounded-md bg-muted" />
                  )}
                  <span className="font-medium">{row.nombre}</span>
                </TableCell>

                <TableCell className="whitespace-nowrap text-sm font-medium">
                  {row.fecha}
                </TableCell>
                <TableCell className="whitespace-nowrap text-sm">
                  {row.horaInicio} - {row.horaFin}
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  <Badge className={`rounded-full px-3 py-1.5 text-xs font-medium ${getBadgeClass(row.estado)}`}>
                    {row.estado}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {/* Footer de paginación */}
      <div className="flex items-center justify-between gap-4 border-t px-4 py-3 bg-card">
        <p className="text-xs text-muted-foreground">
          Mostrando{" "}
          <span className="font-medium">
            {total === 0 ? 0 : (page - 1) * pageSize + 1}–{Math.min(page * pageSize, total)}
          </span>{" "}
          de <span className="font-medium">{total}</span> registros
        </p>

        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => { e.preventDefault(); if (page > 1) setPage(page - 1); }}
                className={page === 1 ? "pointer-events-none opacity-40" : ""}
              />
            </PaginationItem>

            {pageNumbers.map((n, idx) =>
              typeof n === "number" ? (
                <PaginationItem key={idx}>
                  <PaginationLink
                    href="#"
                    isActive={n === page}
                    onClick={(e) => { e.preventDefault(); setPage(n); }}
                  >
                    {n}
                  </PaginationLink>
                </PaginationItem>
              ) : (
                <PaginationItem key={idx}>
                  <PaginationEllipsis />
                </PaginationItem>
              )
            )}

            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => { e.preventDefault(); if (page < totalPages) setPage(page + 1); }}
                className={page === totalPages ? "pointer-events-none opacity-40" : ""}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
});

export default FacilitiesTable;
