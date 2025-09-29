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
import {
  Calendar as CalendarIcon,
  FileDown,
  FileSpreadsheet,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { es } from "date-fns/locale";

function formatDateEs(date) {
  if (!date) return "";
  return date.toLocaleDateString("es-PE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export default function DisponibilityToolbar({
  valueEstado = "",
  onChangeEstado,
  valueDate = [],
  onChangeDate,
  onExportPdf,
  onExportExcel,
  className,
}) {
  const selected = valueDate?.[0];

  return (
    <div
      className={cn(
        "flex flex-col md:flex-row md:items-center md:justify-between gap-4 mt-6",
        className
      )}
    >
      {/* Filtros */}
      <div className="flex flex-col md:flex-row gap-3">
        {/* Estado */}
        <Select
          value={valueEstado || "all"}
          onValueChange={(v) => onChangeEstado?.(v === "all" ? "" : v)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="Reservado">Reservado</SelectItem>
            <SelectItem value="Pendiente">Pendiente</SelectItem>
            <SelectItem value="Cancelado">Cancelado</SelectItem>
            <SelectItem value="Finalizado">Finalizado</SelectItem>
          </SelectContent>
        </Select>

        {/* Fecha (single) */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-[200px] justify-start text-left font-normal",
                !selected && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {selected ? (
                formatDateEs(selected)
              ) : (
                <span>Seleccionar fecha</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-0" align="start">
            <Calendar
              mode="single"
              selected={valueDate}
              onSelect={(d) => onChangeDate?.(d ? [d] : [])}
              locale={es}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Exportaciones */}
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
