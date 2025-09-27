// src/feature/disponibility/components/ReprogramModal.jsx
import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Clock } from "lucide-react"

export default function ReprogramModal({ open, onClose, reserva, onConfirm }) {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [startHour, setStartHour] = useState("")
  const [endHour, setEndHour] = useState("")
  const [error, setError] = useState("")

  if (!reserva) return null

  const hours = [
    "08:00","09:00","10:00","11:00","12:00",
    "13:00","14:00","15:00","16:00","17:00","18:00",
  ]

  const validEndHours = startHour
    ? hours.filter((h) => hours.indexOf(h) > hours.indexOf(startHour))
    : hours

  const handleStartHourChange = (value) => {
    setStartHour(value)
    if (endHour && hours.indexOf(value) >= hours.indexOf(endHour)) {
      setEndHour("")
    }
  }

  const handleConfirm = () => {
    if (!startHour || !endHour) {
      setError("Debes seleccionar hora inicio y fin válidas")
      return
    }
    setError("")
    onConfirm?.({
      fecha: format(selectedDate, "dd/MM/yyyy"),
      horaInicio: startHour,
      horaFin: endHour,
    })
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg w-full p-6">
        <DialogHeader>
          <DialogTitle>Reprogramar reserva</DialogTitle>
          <DialogDescription>
            Modifica la fecha y el horario de tu reserva.
          </DialogDescription>
        </DialogHeader>

        {/* Bloque: reserva actual */}
        <div className="rounded-lg border p-3 mb-4">
          <p className="font-semibold">{reserva.nombre}</p>
          <p className="text-sm text-muted-foreground">
            Actual: {reserva.fecha} • {reserva.horaInicio} - {reserva.horaFin}
          </p>
        </div>

        {/* Bloque: calendario */}
        <div className="flex flex-col items-center mb-4">
          <p className="text-sm text-gray-600 mb-2">Nueva fecha</p>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            disabled={{ before: new Date() }}
          />
        </div>

        {/* Bloque: selección de horas */}
        <div className="grid grid-cols-2 gap-4 mb-2">
          <div>
            <label className="text-sm font-medium">Hora inicio</label>
            <div className="flex items-center gap-2 mt-1">
              <Clock className="w-4 h-4 text-gray-500" />
              <Select onValueChange={handleStartHourChange} value={startHour}>
                <SelectTrigger className="h-12 w-full">
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

          <div>
            <label className="text-sm font-medium">Hora fin</label>
            <div className="flex items-center gap-2 mt-1">
              <Clock className="w-4 h-4 text-gray-500" />
              <Select onValueChange={setEndHour} value={endHour}>
                <SelectTrigger className="h-12 w-full">
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

        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}

        <DialogFooter className="pt-6 justify-center">
          <Button variant="outline" onClick={() => onClose(false)}>
            Cancelar
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={!startHour || !endHour}
            className="bg-blue-600 text-white hover:bg-blue-700"
          >
            Confirmar cambio
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
