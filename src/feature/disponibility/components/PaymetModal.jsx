import { useMemo, useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"

// Utils: calcula diferencia de horas "HH:MM"
function diffHours(hIni, hFin) {
  const [h1, m1] = hIni.split(":").map(Number)
  const [h2, m2] = hFin.split(":").map(Number)
  return Math.max(0, (h2 * 60 + m2 - (h1 * 60 + m1)) / 60)
}

/**
 * PaymentModal
 * open: boolean
 * onClose: (open:boolean)=>void
 * reserva: { nombre, fecha, horaInicio, horaFin }
 * onConfirm: (payload)=>void
 */
export default function PaymentModal({ open, onClose, reserva, onConfirm }) {
  const [method, setMethod] = useState("card")

  // Tarifa por ambiente (mock). Puedes traerla de backend.
  const rateMap = {
    "Salón Elegance": 60,
    "Cancha Fútbol 1": 40,
    "Jardín Primavera": 75,
    "Sala de Conferencias": 90,
  }
  const rate = rateMap[reserva?.nombre] ?? 50

  const total = useMemo(() => {
    if (!reserva) return 0
    const hours = diffHours(reserva.horaInicio, reserva.horaFin)
    return Math.max(0, Math.round(hours * rate))
  }, [reserva, rate])

  const handlePay = () => {
    // Aquí integrarías tu gateway (Stripe/Culqi/etc.)
    // En este ejemplo devolvemos un payload mínimo
    onConfirm?.({
      method,
      total,
      rate,
    })
  }

  if (!reserva) return null

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Pagar reserva</DialogTitle>
          <DialogDescription>
            Revisa los datos y elige tu método de pago para confirmar.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="rounded-lg border p-3">
            <p className="font-semibold">{reserva.nombre}</p>
            <p className="text-sm text-muted-foreground">
              {reserva.fecha} • {reserva.horaInicio} - {reserva.horaFin}
            </p>
          </div>

          <div className="rounded-lg border p-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Tarifa por hora</span>
              <span className="font-medium">S/ {rate}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Total</span>
              <span className="text-lg font-semibold">S/ {total}</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-sm">Método de pago</Label>
            <RadioGroup
              value={method}
              onValueChange={setMethod}
              className="grid gap-2"
            >
              <Label
                htmlFor="card"
                className="flex items-center gap-3 rounded-lg border p-3 cursor-pointer"
              >
                <RadioGroupItem id="card" value="card" />
                💳 Tarjeta (crédito/débito)
              </Label>

              <Label
                htmlFor="yape"
                className="flex items-center gap-3 rounded-lg border p-3 cursor-pointer"
              >
                <RadioGroupItem id="yape" value="yape" />
                📱 Yape / Plin (QR)
              </Label>

              <Label
                htmlFor="cash"
                className="flex items-center gap-3 rounded-lg border p-3 cursor-pointer"
              >
                <RadioGroupItem id="cash" value="cash" />
                🏦 Pago en ventanilla
              </Label>
            </RadioGroup>
          </div>

          <Separator />

          <div className="text-xs text-muted-foreground">
            * Al confirmar, se registrará tu pago y tu reserva pasará a estado{" "}
            <b>Reservado</b>.
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onClose(false)}>
            Cancelar
          </Button>
          <Button
            className="bg-emerald-600 hover:bg-emerald-700 text-white"
            onClick={handlePay}
          >
            Pagar ahora
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
