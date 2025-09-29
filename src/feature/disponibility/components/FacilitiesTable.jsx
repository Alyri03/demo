import { useState, useMemo, useEffect, forwardRef } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Eye,
  MoreHorizontal,
  CreditCard,
  CalendarClock,
  XCircle,
  FileText,
  GripVertical,
} from "lucide-react";
import CancelModal from "./CancelModal";
import PaymentModal from "./PaymetModal";
import ReprogramModal from "./ReprogramModal";
import DetailModal from "./DetailModal";
import { toast } from "sonner";

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
  {
    query = "",
    estado = "",
    pageSize = 5,
    onRowClick,
    rows,
    className,
    /* NUEVO: callbacks opcionales para drag */
    onRowDragStart,
    onRowDragEnd,
  },
  ref
) {
  // Imágenes demo
  const IMG_FUTBOL =
    "https://v0-ui-redesign-pearl.vercel.app/soccer-field-outdoor-grass.jpg";
  const IMG_ELEGANCE =
    "https://v0-ui-redesign-pearl.vercel.app/elegant-event-hall-interior.jpg";
  const IMG_JARDIN =
    "https://v0-ui-redesign-pearl.vercel.app/beautiful-garden-outdoor-event-space.jpg";
  const IMG_PARRILLAS =
    "https://v0-ui-redesign-pearl.vercel.app/outdoor-barbecue-grill-area.jpg";
  const IMG_CONFERENCIAS =
    "https://v0-ui-redesign-pearl.vercel.app/modern-conference-room-interior.jpg";
  const IMG_TENIS =
    "https://v0-ui-redesign-pearl.vercel.app/outdoor-tennis-court.png";

  const [reservas, setReservas] = useState(
    rows ?? [
      {
        id: 1,
        nombre: "Salón Elegance",
        fecha: "26/09/2025",
        horaInicio: "15:00",
        horaFin: "17:00",
        estado: "Reservado",
        img: IMG_ELEGANCE,
      },
      {
        id: 2,
        nombre: "Cancha Fútbol 1",
        fecha: "27/09/2025",
        horaInicio: "10:00",
        horaFin: "12:00",
        estado: "Pendiente",
        img: IMG_FUTBOL,
      },
      {
        id: 3,
        nombre: "Jardín Primavera",
        fecha: "28/09/2025",
        horaInicio: "18:00",
        horaFin: "20:00",
        estado: "Cancelado",
        img: IMG_JARDIN,
      },
      {
        id: 4,
        nombre: "Zona Parrillas",
        fecha: "29/09/2025",
        horaInicio: "13:00",
        horaFin: "16:00",
        estado: "Pendiente",
        img: IMG_PARRILLAS,
      },
      {
        id: 5,
        nombre: "Sala de Conferencias",
        fecha: "30/09/2025",
        horaInicio: "09:00",
        horaFin: "11:00",
        estado: "Finalizado",
        img: IMG_CONFERENCIAS,
      },
      {
        id: 6,
        nombre: "Cancha de Tenis",
        fecha: "01/10/2025",
        horaInicio: "17:00",
        horaFin: "18:30",
        estado: "Reservado",
        img: IMG_TENIS,
      },
    ]
  );
  useEffect(() => {
    if (rows) setReservas(rows);
  }, [rows]);

  /* Filtro + orden */
  const q = query.trim().toLowerCase();
  const filtered = useMemo(
    () =>
      reservas.filter((r) => {
        const byQ = !q || r.nombre.toLowerCase().includes(q);
        const byEstado = !estado || r.estado === estado;
        return byQ && byEstado;
      }),
    [reservas, q, estado]
  );

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      const fa = toISO(a.fecha),
        fb = toISO(b.fecha);
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
    for (
      let i = Math.max(2, page - 1);
      i <= Math.min(totalPages - 1, page + 1);
      i++
    )
      nums.push(i);
    if (page < totalPages - 2) nums.push("…R");
    nums.push(totalPages);
    return nums;
  }, [page, totalPages]);

  /* UI / modales */
  const [openCancel, setOpenCancel] = useState(false);
  const [openPayment, setOpenPayment] = useState(false);
  const [openReprogram, setOpenReprogram] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const [selected, setSelected] = useState(null);

  const getBadgeClass = (estado) =>
    estado === "Reservado"
      ? "bg-green-100 text-green-800"
      : estado === "Pendiente"
      ? "bg-yellow-100 text-yellow-800"
      : estado === "Cancelado"
      ? "bg-red-100 text-red-800"
      : estado === "Finalizado"
      ? "bg-blue-100 text-blue-800"
      : "bg-gray-100 text-gray-800";

  const intents = {
    default: {
      iconWrap: "bg-muted text-foreground/70",
      label: "text-foreground",
      item: "hover:bg-muted focus:bg-muted",
    },
    primary: {
      iconWrap: "bg-emerald-50 text-emerald-600",
      label: "text-emerald-700",
      item: "hover:bg-emerald-50 focus:bg-emerald-50",
    },
    destructive: {
      iconWrap: "bg-red-50 text-red-600",
      label: "text-red-600",
      item: "hover:bg-red-50 focus:bg-red-50",
    },
  };

  const menuItemsByState = (estado) => {
    switch (estado) {
      case "Pendiente":
        return [
          {
            key: "pagar",
            label: "Pagar ahora",
            icon: CreditCard,
            intent: "primary",
          },
          {
            key: "reprogramar",
            label: "Reprogramar",
            icon: CalendarClock,
            intent: "default",
          },
          { type: "sep" },
          {
            key: "cancelar",
            label: "Cancelar",
            icon: XCircle,
            intent: "destructive",
          },
        ];
      case "Reservado":
        return [
          {
            key: "cancelar",
            label: "Cancelar",
            icon: XCircle,
            intent: "destructive",
          },
        ];
      case "Cancelado":
        return [
          {
            key: "comprobante",
            label: "Ver comprobante",
            icon: FileText,
            intent: "default",
          },
        ];
      case "Finalizado":
        return [
          {
            key: "comprobante",
            label: "Ver comprobante",
            icon: FileText,
            intent: "default",
          },
          {
            key: "reprogramar",
            label: "Reservar nuevamente",
            icon: CalendarClock,
            intent: "default",
          },
        ];
      default:
        return [];
    }
  };

  const messageForAction = (key, row) => {
    const base = `“${row.nombre}” (${row.fecha} ${row.horaInicio}-${row.horaFin})`;
    switch (key) {
      case "pagar":
        return `Ir a pagar ${base}`;
      case "reprogramar":
        return `Abrir reprogramación para ${base}`;
      case "comprobante":
        return `Mostrar comprobante de ${base}`;
      case "ver":
        return `Ver detalle de ${base}`;
      default:
        return "Acción ejecutada.";
    }
  };

  const onAction = (actionKey, row) => {
    if (actionKey === "cancelar") {
      setSelected(row);
      setOpenCancel(true);
      return;
    }
    if (actionKey === "pagar") {
      setSelected(row);
      setOpenPayment(true);
      return;
    }
    if (actionKey === "reprogramar") {
      setSelected(row);
      setOpenReprogram(true);
      return;
    }
    if (actionKey === "ver") {
      setSelected(row);
      setOpenDetail(true);
      return;
    }
    toast(messageForAction(actionKey, row));
  };

  /* Confirmaciones demo */
  const confirmCancel = () => {
    if (!selected) return;
    setReservas((prev) =>
      prev.map((r) =>
        r.id === selected.id ? { ...r, estado: "Cancelado" } : r
      )
    );
    toast.success("Reserva cancelada correctamente.");
    setOpenCancel(false);
    setSelected(null);
  };
  const confirmPayment = ({ method, total }) => {
    if (!selected) return;
    setReservas((prev) =>
      prev.map((r) =>
        r.id === selected.id ? { ...r, estado: "Reservado" } : r
      )
    );
    toast.success(
      `Pago ${
        method === "card" ? "con tarjeta" : method
      } realizado. Total: S/ ${total}`
    );
    setOpenPayment(false);
    setSelected(null);
  };
  const confirmReprogram = ({ fecha, horaInicio, horaFin }) => {
    if (!selected) return;
    setReservas((prev) =>
      prev.map((r) =>
        r.id === selected.id
          ? { ...r, fecha, horaInicio, horaFin, estado: "Reservado" }
          : r
      )
    );
    toast.success("Reserva reprogramada correctamente.");
    setOpenReprogram(false);
    setSelected(null);
  };

  const handleCancelOpenChange = (open) => {
    setOpenCancel(open);
    if (!open) setSelected(null);
  };
  const handlePaymentOpenChange = (open) => {
    setOpenPayment(open);
    if (!open) setSelected(null);
  };
  const handleReprogramOpenChange = (open) => {
    setOpenReprogram(open);
    if (!open) setSelected(null);
  };
  const handleDetailOpenChange = (open) => {
    setOpenDetail(open);
    if (!open) setSelected(null);
  };

  /* DnD — manejadores para el handle */
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
    <>
      {/* Card sin mt-6, referenciable para igualar altura */}
      <div
        ref={ref}
        className={`overflow-hidden rounded-xl border bg-white shadow-sm ${
          className || ""
        }`}
      >
        <Table>
          <TableHeader>
            <TableRow className="border-b bg-muted/40">
              <TableHead className="py-3 text-xs font-bold uppercase tracking-wide text-muted-foreground">
                Ambiente
              </TableHead>
              <TableHead className="py-3 text-xs font-bold uppercase tracking-wide text-muted-foreground">
                Fecha
              </TableHead>
              <TableHead className="py-3 text-xs font-bold uppercase tracking-wide text-muted-foreground">
                Horario
              </TableHead>
              <TableHead className="py-3 text-xs font-bold uppercase tracking-wide text-muted-foreground">
                Estado
              </TableHead>
              <TableHead className="py-3 text-right text-xs font-bold uppercase tracking-wide text-muted-foreground">
                Acciones
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {pageData.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="py-8 text-center text-sm text-muted-foreground"
                >
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
                      <div className="h-12 w-12 rounded-md bg-gray-200" />
                    )}
                    <span className="font-medium">{row.nombre}</span>
                  </TableCell>

                  <TableCell className="whitespace-nowrap text-sm font-medium text-gray-700">
                    {row.fecha}
                  </TableCell>
                  <TableCell className="whitespace-nowrap text-sm">
                    {row.horaInicio} - {row.horaFin}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    <Badge
                      className={`rounded-full px-3 py-1.5 text-xs font-medium ${getBadgeClass(
                        row.estado
                      )}`}
                    >
                      {row.estado}
                    </Badge>
                  </TableCell>

                  <TableCell
                    className="text-right"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="inline-flex items-center gap-1">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-8 w-8"
                              onClick={() => onAction("ver", row)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Ver detalle</TooltipContent>
                        </Tooltip>

                        <DropdownMenu modal={false}>
                          <DropdownMenuTrigger asChild>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-8 w-8"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-56">
                            <DropdownMenuLabel className="text-xs text-muted-foreground">
                              Acciones
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            {menuItemsByState(row.estado).map((item, idx) => {
                              if (item.type === "sep")
                                return (
                                  <DropdownMenuSeparator key={`sep-${idx}`} />
                                );
                              const Icon = item.icon;
                              const theme = intents[item.intent ?? "default"];
                              return (
                                <DropdownMenuItem
                                  key={item.key}
                                  onClick={() => onAction(item.key, row)}
                                  className={`group cursor-pointer rounded-md px-2 py-2 ${theme.item}`}
                                >
                                  <span
                                    className={`mr-2 inline-flex h-7 w-7 items-center justify-center rounded-md border ${theme.iconWrap}`}
                                  >
                                    <Icon className="h-4 w-4" />
                                  </span>
                                  <span
                                    className={`font-medium ${theme.label}`}
                                  >
                                    {item.label}
                                  </span>
                                </DropdownMenuItem>
                              );
                            })}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TooltipProvider>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        {/* Footer de paginación */}
        <div className="flex items-center justify-between gap-4 border-t px-4 py-3">
          <p className="text-xs text-muted-foreground">
            Mostrando{" "}
            <span className="font-medium">
              {total === 0 ? 0 : (page - 1) * pageSize + 1}–
              {Math.min(page * pageSize, total)}
            </span>{" "}
            de <span className="font-medium">{total}</span> registros
          </p>

          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (page > 1) setPage(page - 1);
                  }}
                  className={page === 1 ? "pointer-events-none opacity-40" : ""}
                />
              </PaginationItem>

              {pageNumbers.map((n, idx) =>
                typeof n === "number" ? (
                  <PaginationItem key={idx}>
                    <PaginationLink
                      href="#"
                      isActive={n === page}
                      onClick={(e) => {
                        e.preventDefault();
                        setPage(n);
                      }}
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
                  onClick={(e) => {
                    e.preventDefault();
                    if (page < totalPages) setPage(page + 1);
                  }}
                  className={
                    page === totalPages ? "pointer-events-none opacity-40" : ""
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>

      {/* Modales */}
      <CancelModal
        open={openCancel}
        onClose={handleCancelOpenChange}
        reserva={selected}
        onConfirm={confirmCancel}
      />
      <PaymentModal
        open={openPayment}
        onClose={handlePaymentOpenChange}
        reserva={selected}
        onConfirm={confirmPayment}
      />
      <ReprogramModal
        open={openReprogram}
        onClose={handleReprogramOpenChange}
        reserva={selected}
        onConfirm={confirmReprogram}
      />
      <DetailModal
        open={openDetail}
        onClose={handleDetailOpenChange}
        reserva={selected}
      />
    </>
  );
});

export default FacilitiesTable;
