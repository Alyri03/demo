import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { FileDown, FileSpreadsheet, CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export default function PaymentsToolbar() {
  // ahora la fecha es un array en v10 (inicia vacío)
  const [date, setDate] = React.useState([]);

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mt-6">
      {/* Filtros a la izquierda */}
      <div className="flex flex-col md:flex-row gap-3">
        {/* Estado */}
        <Select>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="pagado">Pagado</SelectItem>
            <SelectItem value="pendiente">Pendiente</SelectItem>
          </SelectContent>
        </Select>

        {/* Tipo */}
        <Select>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="membresia">Membresía</SelectItem>
            <SelectItem value="reserva">Reserva</SelectItem>
          </SelectContent>
        </Select>

        {/* Fecha con Calendar (v10) */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-[180px] justify-start text-left font-normal",
                date.length === 0 && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date.length > 0 ? (
                date[0].toLocaleDateString("es-PE", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })
              ) : (
                <span>Seleccionar fecha</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-0" align="center">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(d) => setDate(d ? [d] : [])}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Exportaciones a la derecha */}
      <div className="flex gap-2 justify-end">
        <Button variant="outline" className="flex items-center gap-2">
          <FileDown className="h-4 w-4 text-red-500" />
          Exportar PDF
        </Button>
        <Button variant="outline" className="flex items-center gap-2">
          <FileSpreadsheet className="h-4 w-4 text-emerald-500" />
          Exportar Excel
        </Button>
      </div>
    </div>
  );
}
