// src/feature/disponibility/components/DetailModal.jsx
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, User } from "lucide-react"

export default function DetailModal({ open, onClose, reserva }) {
  if (!reserva) return null

  const getBadgeClass = (estado) => {
    switch (estado) {
      case "Reservado":
        return "bg-green-100 text-green-800"
      case "Pendiente":
        return "bg-yellow-100 text-yellow-800"
      case "Cancelado":
        return "bg-red-100 text-red-800"
      case "Finalizado":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg w-full p-6">
        <DialogHeader>
          <DialogTitle>Detalle de reserva</DialogTitle>
          <DialogDescription>
            Información completa de tu reserva seleccionada.
          </DialogDescription>
        </DialogHeader>

        {/* Bloque principal */}
        <div className="space-y-4">
          {/* Imagen placeholder */}
          <div className="w-full h-40 bg-gray-200 rounded-md flex items-center justify-center">
            <span className="text-gray-500">[ Imagen del ambiente ]</span>
          </div>

          {/* Info */}
          <div className="space-y-2">
            <p className="text-lg font-semibold">{reserva.nombre}</p>
            <Badge className={getBadgeClass(reserva.estado)}>
              {reserva.estado}
            </Badge>
          </div>

          {/* Detalles en formato "ficha" */}
          <div className="grid grid-cols-1 gap-3 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-500" />
              <span>
                <strong>Fecha:</strong> {reserva.fecha}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-500" />
              <span>
                <strong>Horario:</strong> {reserva.horaInicio} - {reserva.horaFin}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gray-500" />
              <span>
                <strong>Ubicación:</strong> Salón principal (ejemplo)
              </span>
            </div>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-gray-500" />
              <span>
                <strong>Reservado por:</strong> Juan Pérez (ejemplo)
              </span>
            </div>
          </div>
        </div>

        <DialogFooter className="pt-6">
          <Button variant="outline" onClick={() => onClose(false)}>
            Cerrar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
