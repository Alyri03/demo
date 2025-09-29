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
import { FileDown, FileSpreadsheet, Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const PURPLE_SOLID =
  "bg-[#5951e6] text-white hover:bg-[#544be4] focus-visible:ring-[#5951e6]";
const PURPLE_OUTLINE =
  "border-[#5951e6] text-[#5951e6] hover:bg-[#eef2ff] focus-visible:ring-[#5951e6]";
// Para colorear el texto/chevron del SelectTrigger y también el placeholder
const SELECT_PURPLE =
  "border-[#5951e6] hover:bg-[#eef2ff] focus-visible:ring-[#5951e6] " +
  "text-[#5951e6] [&>span]:text-[#5951e6] [&>svg]:text-[#5951e6]";

export default function PaymentsToolbar() {
  // ahora la fecha es un array en v10 (inicia vacío)
  const [date, setDate] = React.useState([]);

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mt-6">
      {/* Filtros a la izquierda */}
      <div className="flex flex-col md:flex-row gap-3">
        {/* Estado - morado */}
        <Select>
          <SelectTrigger className={cn("w-[150px]", SELECT_PURPLE)}>
            <SelectValue placeholder="Estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem
              value="all"
              className="data-[highlighted]:bg-[#eef2ff] data-[highlighted]:text-[#5951e6] data-[state=checked]:bg-[#eef2ff] data-[state=checked]:text-[#5951e6]"
            >
              Todos
            </SelectItem>
            <SelectItem
              value="pagado"
              className="data-[highlighted]:bg-[#eef2ff] data-[highlighted]:text-[#5951e6] data-[state=checked]:bg-[#eef2ff] data-[state=checked]:text-[#5951e6]"
            >
              Pagado
            </SelectItem>
            <SelectItem
              value="pendiente"
              className="data-[highlighted]:bg-[#eef2ff] data-[highlighted]:text-[#5951e6] data-[state=checked]:bg-[#eef2ff] data-[state=checked]:text-[#5951e6]"
            >
              Pendiente
            </SelectItem>
          </SelectContent>
        </Select>

        {/* Tipo - morado */}
        <Select>
          <SelectTrigger className={cn("w-[150px]", SELECT_PURPLE)}>
            <SelectValue placeholder="Tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem
              value="all"
              className="data-[highlighted]:bg-[#eef2ff] data-[highlighted]:text-[#5951e6] data-[state=checked]:bg-[#eef2ff] data-[state=checked]:text-[#5951e6]"
            >
              Todos
            </SelectItem>
            <SelectItem
              value="membresia"
              className="data-[highlighted]:bg-[#eef2ff] data-[highlighted]:text-[#5951e6] data-[state=checked]:bg-[#eef2ff] data-[state=checked]:text-[#5951e6]"
            >
              Membresía
            </SelectItem>
            <SelectItem
              value="reserva"
              className="data-[highlighted]:bg-[#eef2ff] data-[highlighted]:text-[#5951e6] data-[state=checked]:bg-[#eef2ff] data-[state=checked]:text-[#5951e6]"
            >
              Reserva
            </SelectItem>
          </SelectContent>
        </Select>

        {/* Fecha con Calendar (v10) - morado */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-[180px] justify-start text-left font-normal",
                date.length === 0 && "text-muted-foreground",
                PURPLE_OUTLINE
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

      {/* Exportaciones a la derecha - morado */}
      <div className="flex gap-2 justify-end">
        <Button className={cn("flex items-center gap-2", PURPLE_SOLID)}>
          <FileDown className="h-4 w-4 text-white" />
          Exportar PDF
        </Button>
        <Button className={cn("flex items-center gap-2", PURPLE_SOLID)}>
          <FileSpreadsheet className="h-4 w-4 text-white" />
          Exportar Excel
        </Button>
      </div>
    </div>
  );
}
