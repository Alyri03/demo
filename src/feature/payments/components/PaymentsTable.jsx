// src/feature/disponibility/components/PaymentsTable.jsx
import { useState, useMemo, useEffect } from "react";
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
  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  const pageData = useMemo(() => {
    const start = (page - 1) * pageSize;
    return pagos.slice(start, start + pageSize);
  }, [pagos, page]);

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

  // Badges por estado con variantes dark
  const getBadgeClass = (estado) => {
    switch (estado) {
      case "Pagado":
        return "bg-emerald-100 text-emerald-800 ring-1 ring-inset ring-emerald-200/60 dark:bg-emerald-500/15 dark:text-emerald-300 dark:ring-emerald-400/30";
      case "Pendiente":
        return "bg-amber-100 text-amber-900 ring-1 ring-inset ring-amber-200/60 dark:bg-amber-500/15 dark:text-amber-200 dark:ring-amber-400/30";
      default:
        return "bg-muted text-muted-foreground ring-1 ring-inset ring-border";
    }
  };

  const getIconByTipo = (tipo) => {
    switch (tipo) {
      case "Membresía":
        return (
          <div className="rounded-md p-2 bg-emerald-100 dark:bg-emerald-500/15">
            <CreditCard className="h-5 w-5 text-emerald-600 dark:text-emerald-300" />
          </div>
        );
      case "Reserva":
        return (
          <div className="rounded-md p-2 bg-indigo-100 dark:bg-indigo-500/15">
            <CalendarDays className="h-5 w-5 text-indigo-600 dark:text-indigo-300" />
          </div>
        );
      default:
        return (
          <div className="rounded-md p-2 bg-muted">
            <FileText className="h-5 w-5 text-muted-foreground" />
          </div>
        );
    }
  };

  const onAction = (key, pago) => {
    const base = `“${pago.descripcion}” (${pago.fecha})`;
    if (key === "ver") return toast.info(`Detalle: ${base}`);
    if (key === "pagar") {
      setSelectedPago(pago);
      return setOpenDialog(true);
    }
    if (key === "comprobante")
      return toast.success(`Mostrar comprobante de ${base}`);
    toast(`Acción: ${key}`);
  };

  return (
    <>
      <div className="mt-6 overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm">
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
              <TableRow
                key={pago.id}
                className="transition-colors hover:bg-muted/20"
              >
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
                <TableCell className="whitespace-nowrap text-sm font-medium">
                  {pago.fecha}
                </TableCell>

                {/* MÉTODO */}
                <TableCell className="text-center text-sm">
                  {pago.metodoPago}
                </TableCell>

                {/* REFERENCIA */}
                <TableCell className="text-sm">{pago.referencia}</TableCell>

                {/* MONTO */}
                <TableCell className="whitespace-nowrap text-right font-bold">
                  S/ {pago.monto}
                </TableCell>

                {/* ESTADO */}
                <TableCell className="text-center">
                  <Badge
                    className={`rounded-full px-3 py-1.5 text-xs font-medium ${getBadgeClass(
                      pago.estado
                    )}`}
                  >
                    {pago.estado}
                  </Badge>
                </TableCell>

                {/* ACCIONES */}
                <TableCell className="text-center">
                  <div className="flex justify-center gap-2">
                    <TooltipProvider>
                      {/* Ver Detalle */}
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            size="icon"
                            variant="outline"
                            className="h-8 w-8 rounded-lg border-border hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring"
                            onClick={() => onAction("ver", pago)}
                            aria-label="Ver detalle"
                          >
                            <Eye className="h-4 w-4 text-muted-foreground" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Ver detalle</TooltipContent>
                      </Tooltip>

                      {/* Pagar ahora */}
                      {pago.estado === "Pendiente" && (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              size="icon"
                              className="h-8 w-8 rounded-lg bg-emerald-600 text-emerald-50 hover:bg-emerald-700 focus-visible:ring-2 focus-visible:ring-emerald-400"
                              onClick={() => onAction("pagar", pago)}
                              aria-label="Pagar ahora"
                            >
                              <CreditCard className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Pagar ahora</TooltipContent>
                        </Tooltip>
                      )}

                      {/* Ver Comprobante */}
                      {pago.estado === "Pagado" && (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              size="icon"
                              variant="outline"
                              className="h-8 w-8 rounded-lg border-sky-300/60 hover:bg-sky-500/10 focus-visible:ring-2 focus-visible:ring-sky-400 dark:border-sky-400/40"
                              onClick={() => onAction("comprobante", pago)}
                              aria-label="Ver comprobante"
                            >
                              <FileText className="h-4 w-4 text-sky-700 dark:text-sky-300" />
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
        <div className="flex items-center justify-between gap-4 border-t px-4 py-3 bg-card">
          <p className="text-xs text-muted-foreground">
            Mostrando{" "}
            <span className="font-medium">
              {(page - 1) * pageSize + 1}–
              {Math.min(page * pageSize, pagos.length)}
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
                  className={
                    page === totalPages ? "pointer-events-none opacity-40" : ""
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>

      {/* Dialog de pago */}
      <PaymentDialog
        open={openDialog}
        onClose={setOpenDialog}
        pago={selectedPago}
      />
    </>
  );
}
