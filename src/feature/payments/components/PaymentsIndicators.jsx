import { Card, CardContent } from "@/components/ui/card";
import { Wallet, Clock, CreditCard, Calendar as CalendarIcon } from "lucide-react";

export default function PaymentsIndicators() {
  const totalPagado = 300;
  const totalPendiente = 120;
  const ultimoPago = "01/09/2025";
  const proximoPago = "20/09/2025";

  const theme = {
    indigo: {
      card: "bg-indigo-50 border-indigo-100",
      title: "text-indigo-700",
      value: "text-indigo-900",
      icon: "text-indigo-700",
      bgIcon: "text-indigo-200/70",
    },
    amber: {
      card: "bg-amber-50 border-amber-100",
      title: "text-amber-700",
      value: "text-amber-900",
      icon: "text-amber-700",
      bgIcon: "text-amber-200/70",
    },
    sky: {
      card: "bg-sky-50 border-sky-100",
      title: "text-sky-700",
      value: "text-sky-900",
      icon: "text-sky-700",
      bgIcon: "text-sky-200/70",
    },
    violet: {
      card: "bg-violet-50 border-violet-100",
      title: "text-violet-700",
      value: "text-violet-900",
      icon: "text-violet-700",
      bgIcon: "text-violet-200/70",
    },
  };

  const indicators = [
    { title: "Total Pagado", value: `S/ ${totalPagado}`, icon: Wallet, scheme: "indigo", valueClass: "text-2xl font-semibold" },
    { title: "Pendiente de Pago", value: `S/ ${totalPendiente}`, icon: Clock, scheme: "amber", valueClass: "text-2xl font-semibold" },
    { title: "Último Pago", value: ultimoPago, icon: CreditCard, scheme: "sky", valueClass: "text-xl font-medium" },
    { title: "Próximo Pago", value: proximoPago, icon: CalendarIcon, scheme: "violet", valueClass: "text-xl font-medium" },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 my-6 md:grid-cols-2 lg:grid-cols-4">
      {indicators.map((item, idx) => {
        const t = theme[item.scheme];
        return (
          <Card key={idx} className={`relative overflow-hidden rounded-xl border shadow-sm ${t.card}`}>
            <CardContent className="relative z-10 p-5">
              <div className="mb-2 flex items-center gap-2">
                <item.icon className={`h-5 w-5 ${t.icon}`} />
                <span className={`text-sm font-medium ${t.title}`}>{item.title}</span>
              </div>
              <p className={`${item.valueClass} ${t.value}`}>{item.value}</p>
            </CardContent>
            <item.icon className={`pointer-events-none absolute bottom-3 right-4 h-20 w-20 ${t.bgIcon}`} />
          </Card>
        );
      })}
    </div>
  );
}
