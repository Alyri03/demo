import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import {
  Wifi,
  Car,
  Utensils,
  Snowflake,
  Monitor,
  Users,
  Clock,
} from "lucide-react";

export default function DisponibilityModal({ open, onClose, facility }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [startHour, setStartHour] = useState("");
  const [endHour, setEndHour] = useState("");
  const [error, setError] = useState("");

  if (!facility) return null;

  const hours = [
    "08:00","09:00","10:00","11:00","12:00",
    "13:00","14:00","15:00","16:00","17:00","18:00",
  ];

  const today = new Date();
  let disabledDays = { before: today };
  if (facility?.nextAvailability) {
    const [day, month] = facility.nextAvailability.split("/");
    const year = today.getFullYear();
    const dateNext = new Date(year, month - 1, day);
    disabledDays = { before: dateNext };
  }

  const getTotalPrice = () => {
    if (!startHour || !endHour) return 0;
    const startIndex = hours.indexOf(startHour);
    const endIndex = hours.indexOf(endHour);
    const hoursCount = endIndex - startIndex;
    if (hoursCount <= 0) return 0;
    return hoursCount * (facility.price || 0);
  };

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
    if (!startHour || !endHour) {
      setError("Debes seleccionar hora inicio y fin válidas");
      return;
    }
    setError("");

    // Toast pro al reservar
    toast.success("Reserva confirmada", {
      description: `${facility.title} el ${format(
        selectedDate,
        "dd/MM/yyyy"
      )} de ${startHour} a ${endHour}. Paga en la sección Pagos e Historial.`,
      duration: 5000,
    });

    onClose();
  };

  const badgeClasses = "flex items-center gap-1 h-6 px-2 py-0 text-xs";

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="!max-w-[750px] w-[750px] p-6">
        <DialogHeader>
          <DialogTitle className="text-center mb-6">
            Disponibilidad de {facility?.title}
          </DialogTitle>
        </DialogHeader>

        {/* Menos separación entre columnas y calendario centrado */}
        <div className="grid grid-cols-[380px_min-content] gap-4">
          {/* IZQUIERDA: imagen + info */}
          <div className="flex flex-col">
            <div className="bg-gray-200 rounded-lg w-full h-[220px] flex items-center justify-center">
              {facility.image ? (
                <img
                  src={facility.image}
                  alt={facility.title}
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <span className="text-gray-500">[ Imagen aquí ]</span>
              )}
            </div>

            <div className="mt-3 w-full">
              <p className="font-semibold text-lg">{facility.title}</p>

              <div className="flex flex-wrap gap-1 mt-2 text-gray-700">
                <Badge variant="secondary" className={badgeClasses}>
                  <Users className="w-3 h-3" /> Hasta {facility.capacity}
                </Badge>
                {facility.wifi && (
                  <Badge variant="secondary" className={badgeClasses}>
                    <Wifi className="w-3 h-3" /> Wifi
                  </Badge>
                )}
                {facility.parking && (
                  <Badge variant="secondary" className={badgeClasses}>
                    <Car className="w-3 h-3" /> Parking
                  </Badge>
                )}
                {facility.catering && (
                  <Badge variant="secondary" className={badgeClasses}>
                    <Utensils className="w-3 h-3" /> Catering
                  </Badge>
                )}
                {facility.airConditioning && (
                  <Badge variant="secondary" className={badgeClasses}>
                    <Snowflake className="w-3 h-3" /> Aire Acond.
                  </Badge>
                )}
                {facility.projector && (
                  <Badge variant="secondary" className={badgeClasses}>
                    <Monitor className="w-3 h-3" /> Proyector
                  </Badge>
                )}
              </div>
            </div>
          </div>

          {/* DERECHA: calendario centrado */}
          <div className="flex flex-col items-center w-[300px]">
            <p className="text-sm text-gray-600 font-medium mb-2 text-center">
              Selecciona una fecha
            </p>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              disabled={disabledDays}
              className="mx-auto"
            />
          </div>
        </div>

        {/* ABAJO: horas + total */}
        <div className="mt-6 flex flex-col items-center">
          <div className="grid grid-cols-2 gap-8 w-full max-w-md">
            <div className="space-y-1">
              <label className="text-sm font-medium">Hora inicio</label>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-500" />
                <Select onValueChange={handleStartHourChange} value={startHour}>
                  <SelectTrigger className="h-12 w-32 text-base">
                    <SelectValue placeholder="Selecciona" />
                  </SelectTrigger>
                  <SelectContent>
                    {hours.map((h) => (
                      <SelectItem key={h} value={h}>
                        {h}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium">Hora fin</label>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-500" />
                <Select onValueChange={setEndHour} value={endHour}>
                  <SelectTrigger className="h-12 w-32 text-base">
                    <SelectValue placeholder="Selecciona" />
                  </SelectTrigger>
                  <SelectContent>
                    {validEndHours.map((h) => (
                      <SelectItem key={h} value={h}>
                        {h}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <p className="text-sm font-medium mt-4">
            Total:{" "}
            <span className="text-lg font-bold text-primary">
              S/ {getTotalPrice()}
            </span>
          </p>
          {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>

        <DialogFooter className="pt-6 justify-center">
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
