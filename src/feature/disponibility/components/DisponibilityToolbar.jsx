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

/* —— Estilos morados reutilizables —— */
const PURPLE_SOLID =
  "bg-[#5951e6] text-white hover:bg-[#544be4] focus-visible:ring-[#5951e6]";
const PURPLE_OUTLINE =
  "border-[#5951e6] text-[#5951e6] hover:bg-[#eef2ff] focus-visible:ring-[#5951e6]";
const SELECT_PURPLE =
  "border-[#5951e6] hover:bg-[#eef2ff] focus-visible:ring-[#5951e6] " +
  "text-[#5951e6] [&>span]:text-[#5951e6] [&>svg]:text-[#5951e6]";

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
        {/* Estado (morado) */}
        <Select
          value={valueEstado || "all"}
          onValueChange={(v) => onChangeEstado?.(v === "all" ? "" : v)}
        >
          <SelectTrigger className={cn("w-[180px]", SELECT_PURPLE)}>
            <SelectValue placeholder="Estado" />
          </SelectTrigger>
          <SelectContent>
            {["Todos:all","Reservado:Reservado","Pendiente:Pendiente","Cancelado:Cancelado","Finalizado:Finalizado"]
              .map((opt)=> {
                const [label,val]=opt.split(":");
                return (
                  <SelectItem
                    key={val}
                    value={val}
                    className="data-[highlighted]:bg-[#eef2ff] data-[highlighted]:text-[#5951e6] data-[state=checked]:bg-[#eef2ff] data-[state=checked]:text-[#5951e6]"
                  >
                    {label}
                  </SelectItem>
                );
              })}
          </SelectContent>
        </Select>

        {/* Fecha (single) — botón morado outline */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-[200px] justify-start text-left font-normal",
                !selected && "text-muted-foreground",
                PURPLE_OUTLINE
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {selected ? formatDateEs(selected) : <span>Seleccionar fecha</span>}
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

      {/* Exportaciones — morado sólido */}
      <div className="flex gap-2 justify-end">
        <Button
          onClick={onExportPdf}
          className={cn("flex items-center gap-2", PURPLE_SOLID)}
        >
          <FileDown className="h-4 w-4 text-white" />
          Exportar PDF
        </Button>
        <Button
          onClick={onExportExcel}
          className={cn("flex items-center gap-2", PURPLE_SOLID)}
        >
          <FileSpreadsheet className="h-4 w-4 text-white" />
          Exportar Excel
        </Button>
      </div>
    </div>
  );
}
