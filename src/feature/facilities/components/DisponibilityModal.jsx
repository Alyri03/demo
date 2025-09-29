import { useMemo, useState } from "react";
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
  const [durationH, setDurationH] = useState(0);
  const [error, setError] = useState("");

  // hooks siempre presentes
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

  const today = new Date();
  let disabledDays = { before: today };
  if (facility?.nextAvailability) {
    const [day, month] = facility.nextAvailability.split("/");
    const year = today.getFullYear();
    const dateNext = new Date(year, month - 1, day);
    disabledDays = { before: dateNext };
  }

  const quickDates = useMemo(() => {
    const f = (d) =>
      new Date(d.getFullYear(), d.getMonth(), d.getDate(), 12, 0, 0, 0);
    const t = f(new Date());
    const tomorrow = new Date(t);
    tomorrow.setDate(t.getDate() + 1);
    const nextSat = new Date(t);
    nextSat.setDate(t.getDate() + ((6 - t.getDay() + 7) % 7 || 7));
    return [
      { label: "Hoy", date: t },
      { label: "Mañana", date: tomorrow },
      { label: "Próx. sábado", date: nextSat },
    ];
  }, []);

  const hoursCount = useMemo(() => {
    if (!startHour || !endHour) return 0;
    const startIndex = hours.indexOf(startHour);
    const endIndex = hours.indexOf(endHour);
    const diff = endIndex - startIndex;
    return diff > 0 ? diff : 0;
  }, [startHour, endHour, hours]);

  const getTotalPrice = () =>
    hoursCount > 0 ? hoursCount * (facility?.price || 0) : 0;

  const validEndHours = startHour
    ? hours.filter((h) => hours.indexOf(h) > hours.indexOf(startHour))
    : hours;

  const handleStartHourChange = (value) => {
    setStartHour(value);
    setError("");
    if (durationH > 0) {
      const startIndex = hours.indexOf(value);
      const endIndex = startIndex + durationH;
      if (endIndex < hours.length) setEndHour(hours[endIndex]);
      else {
        setEndHour("");
        setError("La duración excede el horario disponible.");
      }
    } else if (endHour && hours.indexOf(value) >= hours.indexOf(endHour)) {
      setEndHour("");
    }
  };

  const handleDuration = (h) => {
    setDurationH(h);
    setError("");
    if (!startHour || h === 0) return;
    const startIndex = hours.indexOf(startHour);
    const endIndex = startIndex + h;
    if (endIndex < hours.length) setEndHour(hours[endIndex]);
    else {
      setEndHour("");
      setError("La duración excede el horario disponible.");
    }
  };

  const handleReserve = () => {
    if (!startHour || !endHour) {
      setError("Debes seleccionar hora inicio y fin válidas");
      return;
    }
    setError("");
    toast.success("Reserva confirmada", {
      description: `${facility.title} el ${format(
        selectedDate,
        "dd/MM/yyyy"
      )} de ${startHour} a ${endHour}.`,
      duration: 5000,
    });
    onClose();
  };

  if (!facility) return null;

  const badgeClasses = "flex items-center gap-1 h-6 px-2 py-0 text-xs";
  const primaryPurple =
    "bg-[#5951e6] text-white hover:bg-[#544be4] focus-visible:ring-[#5951e6]";
  const outlinePurple =
    "border-[#5951e6] text-[#5951e6] hover:bg-[#eef2ff] focus-visible:ring-[#5951e6]";

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="!max-w-[920px] w-[920px] p-6">
        <DialogHeader>
          <DialogTitle className="text-center">
            Disponibilidad de {facility.title}
          </DialogTitle>
        </DialogHeader>

        {/* NUEVO ORDEN: IZQ (Calendario + horarios) | DER (Imagen + detalle + resumen) */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* IZQUIERDA */}
          <div className="flex flex-col gap-4">
            {/* Accesos rápidos */}
            <div className="flex items-center gap-2 flex-wrap">
              {quickDates.map((q) => (
                <Button
                  key={q.label}
                  variant="outline"
                  className={outlinePurple + " h-8 px-3"}
                  onClick={() => setSelectedDate(q.date)}
                >
                  {q.label}
                </Button>
              ))}
            </div>

            {/* Calendario */}
            <div className="rounded-lg border p-3">
              <p className="text-sm text-gray-600 font-medium mb-2 text-center">
                Selecciona una fecha
              </p>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(d) => d && setSelectedDate(d)}
                disabled={disabledDays}
                className="mx-auto"
              />
            </div>

            {/* Horarios compactos */}
            <div className="rounded-lg border p-3">
              <p className="font-semibold mb-2">Horario</p>

              <div className="mb-3">
                <p className="text-xs text-muted-foreground mb-1">
                  Duración rápida
                </p>
                <div className="inline-flex gap-1 rounded-lg border p-1">
                  {[0, 1, 2, 3].map((h) => (
                    <button
                      key={h}
                      type="button"
                      onClick={() => handleDuration(h)}
                      className={[
                        "h-8 px-3 rounded-md text-sm transition",
                        h === durationH
                          ? "bg-[#5951e6] text-white"
                          : "hover:bg-muted",
                      ].join(" ")}
                      title={h === 0 ? "Libre" : `${h} hora(s)`}
                    >
                      {h === 0 ? "Libre" : `${h} h`}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-sm font-medium">Hora inicio</label>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <Select
                      onValueChange={handleStartHourChange}
                      value={startHour}
                    >
                      <SelectTrigger className="h-10 w-36">
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
                      <SelectTrigger className="h-10 w-36">
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

              {error && <p className="text-red-500 text-xs mt-3">{error}</p>}
            </div>
          </div>

          {/* DERECHA */}
          <div className="flex flex-col gap-4">
            {/* Imagen + tags */}
            <div className="bg-gray-100 rounded-lg w-full h-[220px] overflow-hidden">
              {facility.image ? (
                <img
                  src={facility.image}
                  alt={facility.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full grid place-items-center text-gray-500">
                  [ Imagen aquí ]
                </div>
              )}
            </div>

            {/* Título + features */}
            <div>
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

            {/* Resumen limpio */}
            <div className="rounded-lg border p-4 bg-muted/20">
              <p className="font-semibold mb-2">Resumen</p>
              <div className="text-sm space-y-1">
                <div className="flex justify-between">
                  <span>Fecha</span>
                  <span>{format(selectedDate, "dd/MM/yyyy")}</span>
                </div>
                <div className="flex justify-between">
                  <span>Horario</span>
                  <span>
                    {startHour && endHour ? `${startHour} – ${endHour}` : "—"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Duración</span>
                  <span>{hoursCount > 0 ? `${hoursCount} h` : "—"}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tarifa</span>
                  <span>S/ {facility.price || 0} / h</span>
                </div>
                <hr className="my-2" />
                <div
                  className="flex justify-between font-semibold"
                  aria-live="polite"
                >
                  <span>Total</span>
                  <span className="text-[#5951e6]">S/ {getTotalPrice()}</span>
                </div>
                {hoursCount > 0 && (
                  <div className="text-xs text-muted-foreground text-right">{`S/ ${
                    facility.price || 0
                  } × ${hoursCount} h`}</div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer con Total + CTA */}
        <DialogFooter className="pt-4 gap-3 sm:justify-between">
          <div className="text-sm sm:text-base">
            <span className="text-muted-foreground mr-2">Total:</span>
            <span className="font-semibold text-[#5951e6]">
              S/ {getTotalPrice()}
            </span>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose}>
              Cerrar
            </Button>
            <Button
              className={primaryPurple}
              disabled={!startHour || !endHour || getTotalPrice() <= 0}
              onClick={handleReserve}
            >
              Reservar
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
