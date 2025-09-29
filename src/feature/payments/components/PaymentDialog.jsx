import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CreditCard, QrCode, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

/**
 * props:
 * - open: boolean
 * - onClose: (open:boolean)=>void
 * - pago?: { tipo: string, descripcion?: string, fecha?: string, monto?: number }
 * - onConfirm?: ({ method: 'card'|'qr', total: number, cardId?: string }) => void
 */
export default function PaymentDialog({ open, onClose, pago, onConfirm }) {
  const [accordionOpen, setAccordionOpen] = useState("tarjeta");
  const [selectedMethod, setSelectedMethod] = useState("tarjeta");
  const [selectedCard, setSelectedCard] = useState("c1");

  // helpers
  const onlyDigits = (v) => (v || "").replace(/\D/g, "");
  const group4 = (s) => (s || "").replace(/(.{4})/g, "$1 ").trim();
  const maskExceptLast4 = (digits) => (digits || "").replace(/\d(?=\d{4}$)/g, "*");
  const detectBrand = (digits) => {
    if (/^4/.test(digits)) return "Visa";
    if (/^(5[1-5]|2(2[2-9]\d|[3-6]\d{2}|7[01]\d|720))/.test(digits)) return "Mastercard";
    if (/^3[47]/.test(digits)) return "Amex";
    return "Tarjeta";
  };

  // tarjetas mock
  const [cards] = useState([
    { id: "c1", brand: "Visa", number: "4111111111111234", expMonth: "12", expYear: "26", cvv: "123" },
    { id: "c2", brand: "Mastercard", number: "5555555555555678", expMonth: "08", expYear: "28", cvv: "123" },
  ]);

  // Pago con fallbacks si no llega "pago"
  const pg = pago ?? { tipo: "Reserva", descripcion: "", fecha: "—", monto: 0 };

  const SelectedPill = ({ children }) => (
    <span className="ml-2 inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-700">
      <CheckCircle2 className="h-3.5 w-3.5" />
      {children}
    </span>
  );

  const cardBase =
    "relative cursor-pointer rounded-lg border bg-white transition hover:shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-300 focus-visible:outline-offset-2";
  const selectedStyles = "border-emerald-300 bg-emerald-50 shadow-sm";
  const SelectedAccent = () => (
    <span aria-hidden className="absolute left-0 top-0 h-full w-1.5 rounded-l-lg bg-emerald-500/80" />
  );

  const renderCard = (card) => {
    const isSelected = selectedCard === card.id;
    const digits = onlyDigits(card.number);
    const maskedDisplay = group4(maskExceptLast4(digits));
    const brandForView = detectBrand(digits);

    return (
      <div
        key={card.id}
        role="button"
        tabIndex={0}
        onClick={() => setSelectedCard(card.id)}
        className={cn(cardBase, "space-y-4 p-4", isSelected && selectedStyles)}
      >
        {isSelected && <SelectedAccent />}

        <div className="flex items-center gap-3">
          <div className="rounded-md bg-indigo-50 p-2">
            <CreditCard className="h-6 w-6 text-indigo-600" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-slate-900">
              {card.brand} terminada en {digits.slice(-4)}
            </h4>
            <p className="text-xs text-slate-500">Tarjeta registrada</p>
          </div>
          {isSelected && <CheckCircle2 className="ml-auto h-5 w-5 text-emerald-600" />}
        </div>

        <div className="grid grid-cols-2 gap-y-2 text-sm">
          <span className="font-medium text-slate-700">Número:</span>
          <span className="font-mono tracking-widest text-slate-800">{maskedDisplay}</span>

          <span className="font-medium text-slate-700">Vencimiento:</span>
          <span className="text-slate-800">{card.expMonth}/{card.expYear}</span>

          <span className="font-medium text-slate-700">CVV:</span>
          <span className="text-slate-800">{"*".repeat(brandForView === "Amex" ? 4 : 3)}</span>
        </div>
      </div>
    );
  };

  const handlePay = () => {
    const method = selectedMethod === "qr" ? "qr" : "card";
    onConfirm?.({ method, total: pg.monto, cardId: method === "card" ? selectedCard : undefined });
    onClose(false);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Realizar Pago</DialogTitle>
          <DialogDescription>
            Estás pagando <strong>{pg.tipo}</strong>
            <br />
            <span className="text-sm text-muted-foreground">{pg.descripcion}</span>
          </DialogDescription>
        </DialogHeader>

        <div className="my-4 rounded-md border border-slate-200 bg-muted/30 p-4">
          <div className="flex justify-between text-sm">
            <span className="font-medium text-slate-700">Fecha:</span>
            <span className="text-slate-800">{pg.fecha}</span>
          </div>
          <div className="mt-1 flex justify-between text-sm">
            <span className="font-medium text-slate-700">Monto:</span>
            <span className="font-bold text-emerald-700">S/ {pg.monto}</span>
          </div>
        </div>

        <Accordion
          type="single"
          collapsible
          value={accordionOpen}
          onValueChange={(val) => setAccordionOpen(val)}
          className="w-full"
        >
          <AccordionItem value="tarjeta">
            <AccordionTrigger onClick={() => setSelectedMethod("tarjeta")} className="text-left">
              <div className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-indigo-600" />
                <span className="text-slate-800">Tarjeta de crédito o débito</span>
                {selectedMethod === "tarjeta" && <SelectedPill>Seleccionado</SelectedPill>}
              </div>
            </AccordionTrigger>
            <AccordionContent>
              {cards.map((c, idx) => (
                <div key={c.id} className={idx === 0 ? "mb-3" : ""}>
                  {renderCard(c)}
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="qr">
            <AccordionTrigger onClick={() => setSelectedMethod("qr")} className="text-left">
              <div className="flex items-center gap-2">
                <QrCode className="h-5 w-5 text-indigo-600" />
                <span className="text-slate-800">Yape o Plin (QR)</span>
                {selectedMethod === "qr" && <SelectedPill>Seleccionado</SelectedPill>}
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="mt-3 flex justify-center">
                <div className="flex h-32 w-32 items-center justify-center rounded-md border border-slate-200 bg-muted">
                  <span className="text-xs text-slate-500">[ QR ]</span>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onClose(false)} // cerrar explícito
            className="border-slate-200 hover:bg-slate-50"
          >
            Cancelar
          </Button>
          <Button className="bg-emerald-600 hover:bg-emerald-700" onClick={handlePay}>
            {selectedMethod === "qr" ? "Escanear y confirmar" : "Pagar ahora"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
