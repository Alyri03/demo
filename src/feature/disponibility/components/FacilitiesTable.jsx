// src/feature/disponibility/components/FacilitiesTable.jsx
import { useState } from "react";
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
  Eye,
  MoreHorizontal,
  CreditCard,
  CalendarClock,
  XCircle,
  FileText,
} from "lucide-react";
import CancelModal from "./CancelModal";
import PaymentModal from "./PaymetModal";
import ReprogramModal from "./ReprogramModal"; 
import { toast } from "sonner";

export default function FacilitiesTable() {
  const [reservas, setReservas] = useState([
    {
      id: 1,
      nombre: "Salón Elegance",
      fecha: "26/09/2025",
      horaInicio: "15:00",
      horaFin: "17:00",
      estado: "Reservado",
    },
    {
      id: 2,
      nombre: "Cancha Fútbol 1",
      fecha: "27/09/2025",
      horaInicio: "10:00",
      horaFin: "12:00",
      estado: "Pendiente",
    },
    {
      id: 3,
      nombre: "Jardín Primavera",
      fecha: "28/09/2025",
      horaInicio: "18:00",
      horaFin: "20:00",
      estado: "Cancelado",
    },
    {
      id: 4,
      nombre: "Sala de Conferencias",
      fecha: "20/09/2025",
      horaInicio: "09:00",
      horaFin: "11:00",
      estado: "Finalizado",
    },
  ]);

  const [openCancel, setOpenCancel] = useState(false);
  const [openPayment, setOpenPayment] = useState(false);
  const [openReprogram, setOpenReprogram] = useState(false); // ⬅️ nuevo
  const [selected, setSelected] = useState(null);

  const getBadgeClass = (estado) => {
    switch (estado) {
      case "Reservado":
        return "bg-green-100 text-green-800";
      case "Pendiente":
        return "bg-yellow-100 text-yellow-800";
      case "Cancelado":
        return "bg-red-100 text-red-800";
      case "Finalizado":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

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
    toast(messageForAction(actionKey, row));
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

  // Confirmaciones
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

  // Handlers de cierre
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

  return (
    <div className="mt-6 border rounded-lg shadow-sm overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Ambiente</TableHead>
            <TableHead>Fecha</TableHead>
            <TableHead>Horario</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {reservas.map((row) => (
            <TableRow key={row.id}>
              <TableCell className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gray-200 rounded-md" />
                <span className="font-medium">{row.nombre}</span>
              </TableCell>
              <TableCell>
                <span className="text-gray-800 font-medium">{row.fecha}</span>
              </TableCell>
              <TableCell>
                {row.horaInicio} - {row.horaFin}
              </TableCell>
              <TableCell>
                <Badge className={getBadgeClass(row.estado)}>
                  {row.estado}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
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
                  </TooltipProvider>

                  <DropdownMenu modal={false}>
                    <DropdownMenuTrigger asChild>
                      <Button size="icon" variant="ghost" className="h-8 w-8">
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
                          return <DropdownMenuSeparator key={`sep-${idx}`} />;
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
                            <span className={`font-medium ${theme.label}`}>
                              {item.label}
                            </span>
                          </DropdownMenuItem>
                        );
                      })}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

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
    </div>
  );
}
