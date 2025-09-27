import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function CancelModal({ open, onClose, onConfirm, reserva }) {
  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Cancelar reserva</AlertDialogTitle>
          <AlertDialogDescription>
            {reserva ? (
              <>
                ¿Seguro que deseas <b>cancelar</b> la reserva de{" "}
                <b>{reserva.nombre}</b> para el día{" "}
                <b>{reserva.fecha}</b> de{" "}
                <b>
                  {reserva.horaInicio} a {reserva.horaFin}
                </b>
                ? Esta acción no se puede deshacer.
              </>
            ) : (
              "¿Seguro que deseas cancelar esta reserva?"
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Volver</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-600 hover:bg-red-700 text-white"
            onClick={onConfirm}
          >
            Sí, cancelar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
