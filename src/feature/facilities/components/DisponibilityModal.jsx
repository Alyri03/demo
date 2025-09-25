import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

// Importar Calendar de shadcn
import { Calendar } from "@/components/ui/calendar";

// Importar componentes Select de shadcn
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function DisponibilityModal({ open, onClose, facility }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [startHour, setStartHour] = useState("");
  const [endHour, setEndHour] = useState("");

  // Mock de horarios ocupados
  const busyHours = ["10:00", "15:00"];

  // Horarios posibles del día
  const hours = [
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
  ];

  // Bloquear días anteriores a hoy o simular días bloqueados según nextAvailability
  const today = new Date();
  let disabledDays = { before: today };
  if (facility?.nextAvailability) {
    const [day, month] = facility.nextAvailability.split("/");
    const year = today.getFullYear();
    const dateNext = new Date(year, month - 1, day);
    disabledDays = { before: dateNext };
  }

  // Calcular total según rango horario
  const getTotalPrice = () => {
    if (!startHour || !endHour) return 0;
    const startIndex = hours.indexOf(startHour);
    const endIndex = hours.indexOf(endHour);
    const hoursCount = endIndex - startIndex;
    if (hoursCount <= 0) return 0;
    return hoursCount * (facility.price || 0);
  };

  // Filtrar horas fin para que sean mayores a la hora inicio
  const validEndHours = startHour
    ? hours.filter((h) => hours.indexOf(h) > hours.indexOf(startHour))
    : hours;

  const handleStartHourChange = (value) => {
    setStartHour(value);
    if (endHour && hours.indexOf(value) >= hours.indexOf(endHour)) {
      setEndHour("");
    }
  };

  const handleReserve = () => {
    if (startHour && endHour) {
      alert(
        `Reservado ${facility.title} el ${format(
          selectedDate,
          "dd/MM/yyyy"
        )} desde ${startHour} hasta ${endHour}`
      );
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="uppercase text-center">
            Disponibilidad de {facility?.title}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <p className="text-sm text-gray-500 text-center">
            Selecciona un día y luego tu rango horario disponible para reservar.
          </p>

          {/* Calendario pequeño en español */}
          <div className="flex justify-center">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              disabled={disabledDays}
            />
          </div>

          {/* Selects para rango horario con shadcn */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium">Hora inicio</label>
              <Select onValueChange={handleStartHourChange} value={startHour}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecciona" />
                </SelectTrigger>
                <SelectContent>
                  {hours.map((h) => {
                    const isBusy = busyHours.includes(h);
                    return (
                      <SelectItem
                        key={h}
                        value={h}
                        disabled={isBusy}
                        className={isBusy ? "text-red-500" : ""}
                      >
                        {h} {isBusy && "(Ocupado)"}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium">Hora fin</label>
              <Select onValueChange={setEndHour} value={endHour}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecciona" />
                </SelectTrigger>
                <SelectContent>
                  {validEndHours.map((h) => {
                    const isBusy = busyHours.includes(h);
                    return (
                      <SelectItem
                        key={h}
                        value={h}
                        disabled={isBusy}
                        className={isBusy ? "text-red-500" : ""}
                      >
                        {h} {isBusy && "(Ocupado)"}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Precio total */}
          <div className="text-center text-sm font-medium mt-2">
            Total: S/ {getTotalPrice()}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cerrar
          </Button>
          <Button
            disabled={!startHour || !endHour || getTotalPrice() <= 0}
            onClick={handleReserve}
          >
            Reservar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
