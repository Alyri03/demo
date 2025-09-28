import { useState, useMemo } from "react";
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
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { CreditCard, CalendarDays, FileText, Eye } from "lucide-react";
import { toast } from "sonner";
import PaymentDialog from "./PaymentDialog";

export default function PaymentsTable() {
  const [selectedPago, setSelectedPago] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const [pagos] = useState([
    {
      id: 1,
      tipo: "Membresía",
      descripcion: "Cuota mensual - Septiembre 2025",
      fecha: "01/09/2025",
      monto: 150,
      estado: "Pagado",
      metodoPago: "Tarjeta Visa",
      referencia: "TRX-000123",
      notas: "Pagado automáticamente",
    },
    {
      id: 2,
      tipo: "Reserva",
      descripcion: "Salón Elegance (26/09/2025 • 15:00-17:00)",
      fecha: "20/09/2025",
      monto: 120,
      estado: "Pendiente",
      metodoPago: "Pendiente",
      referencia: "-",
      notas: "Debe confirmarse antes del evento",
    },
    {
      id: 3,
      tipo: "Membresía",
      descripcion: "Cuota mensual - Agosto 2025",
      fecha: "01/08/2025",
      monto: 150,
      estado: "Pagado",
      metodoPago: "Tarjeta Visa",
      referencia: "TRX-000456",
      notas: "Pagado con descuento",
    },
    {
      id: 4,
      tipo: "Reserva",
      descripcion: "Cancha Fútbol 1 (27/09/2025 • 10:00-12:00)",
      fecha: "22/09/2025",
      monto: 80,
      estado: "Pendiente",
      metodoPago: "Pendiente",
      referencia: "-",
      notas: "Pago requerido antes del día de la reserva",
    },
    {
      id: 5,
      tipo: "Membresía",
      descripcion: "Cuota mensual - Julio 2025",
      fecha: "01/07/2025",
      monto: 150,
      estado: "Pagado",
      metodoPago: "Tarjeta Mastercard",
      referencia: "TRX-000789",
      notas: "Pagado en ventanilla bancaria",
    },
    {
      id: 6,
      tipo: "Reserva",
      descripcion: "Jardín Primavera (28/09/2025 • 18:00-20:00)",
      fecha: "15/09/2025",
      monto: 200,
      estado: "Pagado",
      metodoPago: "Yape",
      referencia: "TRX-000999",
      notas: "Pago confirmado por Yape",
    },
    {
      id: 7,
      tipo: "Membresía",
      descripcion: "Cuota mensual - Junio 2025",
      fecha: "01/06/2025",
      monto: 150,
      estado: "Pagado",
      metodoPago: "Tarjeta Mastercard",
      referencia: "TRX-001111",
      notas: "Pago realizado con tarjeta guardada",
    },
  ]);

  // --- Paginación (5 por página) ---
  const pageSize = 5;
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(pagos.length / pageSize));

  // Corrige página si cambia el total (por si en el futuro hay filtros)
  if (page > totalPages) setPage(totalPages);

  const pageData = useMemo(() => {
    const start = (page - 1) * pageSize;
    return pagos.slice(start, start + pageSize);
  }, [pagos, page]);

  // Genera los números a mostrar con elipsis (1 … p-1 p p+1 … N)
  const pageNumbers = useMemo(() => {
    const nums = [];
    if (totalPages <= 6) {
      for (let i = 1; i <= totalPages; i++) nums.push(i);
      return nums;
    }
    nums.push(1);
    if (page > 3) nums.push("ellipsis-left");
    for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) {
      nums.push(i);
    }
    if (page < totalPages - 2) nums.push("ellipsis-right");
    nums.push(totalPages);
    return nums;
  }, [page, totalPages]);

  // Colores de estado
  const getBadgeClass = (estado) => {
    switch (estado) {
      case "Pagado":
        return "bg-emerald-100 text-emerald-700";
      case "Pendiente":
        return "bg-amber-100 text-amber-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // Íconos según tipo
  const getIconByTipo = (tipo) => {
    switch (tipo) {
      case "Membresía":
        return (
          <div className="rounded-md bg-emerald-100 p-2">
            <CreditCard className="h-5 w-5 text-emerald-600" />
          </div>
        );
      case "Reserva":
        return (
          <div className="rounded-md bg-indigo-100 p-2">
            <CalendarDays className="h-5 w-5 text-indigo-600" />
          </div>
        );
      default:
        return (
          <div className="rounded-md bg-gray-100 p-2">
            <FileText className="h-5 w-5 text-gray-600" />
          </div>
        );
    }
  };

  // Acciones
  const onAction = (key, pago) => {
    const base = `“${pago.descripcion}” (${pago.fecha})`;
    switch (key) {
      case "ver":
        toast.info(`Detalle: ${base}`);
        break;
      case "pagar":
        setSelectedPago(pago);
        setOpenDialog(true);
        break;
      case "comprobante":
        toast.success(`Mostrar comprobante de ${base}`);
        break;
      default:
        toast(`Acción: ${key}`);
    }
  };

  return (
    <>
      <div className="mt-6 overflow-hidden rounded-xl border bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="border-b bg-muted/40">
              <TableHead className="py-3 text-xs font-bold uppercase tracking-wide text-muted-foreground">
                Detalle
              </TableHead>
              <TableHead className="py-3 text-xs font-bold uppercase tracking-wide text-muted-foreground">
                Fecha
              </TableHead>
              <TableHead className="py-3 text-center text-xs font-bold uppercase tracking-wide text-muted-foreground">
                Método
              </TableHead>
              <TableHead className="py-3 text-xs font-bold uppercase tracking-wide text-muted-foreground">
                Referencia
              </TableHead>
              <TableHead className="py-3 text-right text-xs font-bold uppercase tracking-wide text-muted-foreground">
                Monto
              </TableHead>
              <TableHead className="py-3 text-center text-xs font-bold uppercase tracking-wide text-muted-foreground">
                Estado
              </TableHead>
              <TableHead className="py-3 text-center text-xs font-bold uppercase tracking-wide text-muted-foreground">
                Acciones
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {pageData.map((pago) => (
              <TableRow key={pago.id} className="transition-colors hover:bg-muted/20">
                {/* DETALLE */}
                <TableCell className="flex items-start gap-3 py-4">
                  {getIconByTipo(pago.tipo)}
                  <div>
                    <div className="text-sm font-semibold">{pago.tipo}</div>
                    <div className="text-xs leading-snug text-muted-foreground">
                      {pago.descripcion}
                    </div>
                  </div>
                </TableCell>

                {/* FECHA */}
                <TableCell className="whitespace-nowrap text-sm font-medium text-gray-700">
                  {pago.fecha}
                </TableCell>

                {/* MÉTODO */}
                <TableCell className="text-center text-sm">
                  {pago.metodoPago}
                </TableCell>

                {/* REFERENCIA */}
                <TableCell className="text-sm text-gray-700">{pago.referencia}</TableCell>

                {/* MONTO */}
                <TableCell className="whitespace-nowrap text-right font-bold text-gray-900">
                  S/ {pago.monto}
                </TableCell>

                {/* ESTADO */}
                <TableCell className="text-center">
                  <Badge className={`rounded-full px-3 py-1.5 text-xs font-medium ${getBadgeClass(pago.estado)}`}>
                    {pago.estado}
                  </Badge>
                </TableCell>

                {/* ACCIONES (Opción A) */}
                <TableCell className="text-center">
                  <div className="flex justify-center gap-2">
                    <TooltipProvider>
                      {/* Ver Detalle — neutro */}
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            size="icon"
                            variant="outline"
                            className="h-8 w-8 rounded-lg border-slate-200 hover:bg-slate-50 focus-visible:ring-2 focus-visible:ring-slate-300"
                            onClick={() => onAction("ver", pago)}
                            aria-label="Ver detalle"
                          >
                            <Eye className="h-4 w-4 text-slate-600" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Ver detalle</TooltipContent>
                      </Tooltip>

                      {/* Pagar ahora — CTA sólido */}
                      {pago.estado === "Pendiente" && (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              size="icon"
                              className="h-8 w-8 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 focus-visible:ring-2 focus-visible:ring-emerald-400"
                              onClick={() => onAction("pagar", pago)}
                              aria-label="Pagar ahora"
                            >
                              <CreditCard className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Pagar ahora</TooltipContent>
                        </Tooltip>
                      )}

                      {/* Ver Comprobante — neutro con tinte */}
                      {pago.estado === "Pagado" && (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              size="icon"
                              variant="outline"
                              className="h-8 w-8 rounded-lg border-sky-200 hover:bg-sky-50 focus-visible:ring-2 focus-visible:ring-sky-300"
                              onClick={() => onAction("comprobante", pago)}
                              aria-label="Ver comprobante"
                            >
                              <FileText className="h-4 w-4 text-sky-700" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Ver comprobante</TooltipContent>
                        </Tooltip>
                      )}
                    </TooltipProvider>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Footer de paginación */}
        <div className="flex items-center justify-between gap-4 border-t px-4 py-3">
          <p className="text-xs text-muted-foreground">
            Mostrando{" "}
            <span className="font-medium">
              {(page - 1) * pageSize + 1}–{Math.min(page * pageSize, pagos.length)}
            </span>{" "}
            de <span className="font-medium">{pagos.length}</span> registros
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
                  className={page === totalPages ? "pointer-events-none opacity-40" : ""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>

      {/* Dialog de pago */}
      <PaymentDialog open={openDialog} onClose={setOpenDialog} pago={selectedPago} />
    </>
  );
}
