// src/components/DisponibilityModal.jsx
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function DisponibilityModal({ open, onClose, facility }) {
  if (!facility) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Disponibilidad de {facility.title}
          </DialogTitle>
          <DialogDescription>
            Aquí podrás ver la disponibilidad y hacer tu reserva.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4 space-y-2">
          <img
            src={facility.image}
            alt={facility.title}
            className="w-full h-40 object-cover rounded-md"
          />
          <div className="text-sm text-gray-700">
            <p><strong>Capacidad:</strong> {facility.capacity} personas</p>
            <p><strong>Precio:</strong> S/ {facility.price} por hora</p>
            {facility.discountSocio && (
              <p className="text-blue-600">{facility.discountSocio}</p>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cerrar
          </Button>
          <Button>Reservar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
