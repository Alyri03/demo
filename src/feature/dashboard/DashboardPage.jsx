// src/feature/dashboard/DashboardPage.jsx
// 4 KPIs con el MISMO estilo y colores que PaymentsIndicators
import { Card, CardContent } from "@/components/ui/card";
import {
  Calendar as CalendarIcon,
  CheckCircle2,
  CreditCard,
} from "lucide-react";
import DashboardChart from "./components/DashboardChart";

export default function DashboardPage() {
  // Datos demo centrados en reservas
  const ocupacionHoy = 78; // % bloques reservados hoy
  const ocupacion7d = 64; // % promedio próximos 7 días
  const reservasHoy = 22; // confirmadas con fecha de uso hoy
  const pagosPendientes72h = 7; // reservas futuras ≤72h con pago pendiente

  // Tema idéntico al de PaymentsIndicators
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

  // KPIs con esquema de color asignado
  const kpis = [
    {
      title: "Ocupación hoy",
      value: `${ocupacionHoy}%`,
      icon: CalendarIcon,
      scheme: "indigo",
      valueClass: "text-2xl font-semibold",
      hint: "% de bloques reservados hoy",
    },
    {
      title: "Ocupación próximos 7 días",
      value: `${ocupacion7d}%`,
      icon: CalendarIcon,
      scheme: "sky",
      valueClass: "text-2xl font-semibold",
      hint: "Promedio proyectado",
    },
    {
      title: "Reservas hoy (confirmadas)",
      value: reservasHoy,
      icon: CheckCircle2,
      scheme: "violet",
      valueClass: "text-2xl font-semibold",
    },
    {
      title: "Pagos pendientes (≤72h)",
      value: pagosPendientes72h,
      icon: CreditCard,
      scheme: "amber",
      valueClass: "text-2xl font-semibold",
    },
  ];

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-semibold tracking-tight">Dashboard</h2>
        <p className="text-sm text-muted-foreground">
          Resumen rápido de la operación de reservas.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 my-6 md:grid-cols-2 lg:grid-cols-4">
        {kpis.map((item, idx) => {
          const t = theme[item.scheme];
          const Icon = item.icon;
          return (
            <Card
              key={idx}
              className={`relative overflow-hidden rounded-xl border shadow-sm ${t.card}`}
            >
              <CardContent className="relative z-10 p-5">
                <div className="mb-2 flex items-center gap-2">
                  <Icon className={`h-5 w-5 ${t.icon}`} />
                  <span className={`text-sm font-medium ${t.title}`}>
                    {item.title}
                  </span>
                </div>
                <p className={`${item.valueClass} ${t.value}`}>{item.value}</p>
                {item.hint && (
                  <p className={`mt-1 text-xs ${t.title}`}>{item.hint}</p>
                )}
              </CardContent>
              <Icon
                className={`pointer-events-none absolute bottom-3 right-4 h-20 w-20 ${t.bgIcon}`}
              />
            </Card>
          );
        })}
      </div>
      <DashboardChart />
    </div>
  );
}
