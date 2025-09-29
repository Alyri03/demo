"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// ──────────────────────────────────────────────────────────────────────────────
// Data: GANANCIAS por "membresías" y "reservas" (JSX, no TypeScript)
// ──────────────────────────────────────────────────────────────────────────────
const baseData = [
  { date: "2024-04-01", membresias: 520, reservas: 340 },
  { date: "2024-04-02", membresias: 390, reservas: 360 },
  { date: "2024-04-03", membresias: 480, reservas: 300 },
  { date: "2024-04-04", membresias: 610, reservas: 650 },
  { date: "2024-04-05", membresias: 820, reservas: 720 },
  { date: "2024-04-06", membresias: 690, reservas: 780 },
  { date: "2024-04-07", membresias: 560, reservas: 390 },
  { date: "2024-04-08", membresias: 910, reservas: 720 },
  { date: "2024-04-09", membresias: 220, reservas: 250 },
  { date: "2024-04-10", membresias: 580, reservas: 430 },
  { date: "2024-04-11", membresias: 720, reservas: 780 },
  { date: "2024-04-12", membresias: 640, reservas: 460 },
  { date: "2024-04-13", membresias: 760, reservas: 860 },
  { date: "2024-04-14", membresias: 320, reservas: 480 },
  { date: "2024-04-15", membresias: 300, reservas: 370 },
  { date: "2024-04-16", membresias: 350, reservas: 420 },
  { date: "2024-04-17", membresias: 980, reservas: 820 },
  { date: "2024-04-18", membresias: 780, reservas: 900 },
  { date: "2024-04-19", membresias: 540, reservas: 390 },
  { date: "2024-04-20", membresias: 260, reservas: 330 },
  { date: "2024-04-21", membresias: 320, reservas: 520 },
  { date: "2024-04-22", membresias: 520, reservas: 410 },
  { date: "2024-04-23", membresias: 350, reservas: 560 },
  { date: "2024-04-24", membresias: 880, reservas: 720 },
  { date: "2024-04-25", membresias: 520, reservas: 610 },
  { date: "2024-04-26", membresias: 190, reservas: 320 },
  { date: "2024-04-27", membresias: 870, reservas: 960 },
  { date: "2024-04-28", membresias: 300, reservas: 430 },
  { date: "2024-04-29", membresias: 720, reservas: 570 },
  { date: "2024-04-30", membresias: 1040, reservas: 900 },
  { date: "2024-05-01", membresias: 380, reservas: 520 },
  { date: "2024-05-02", membresias: 680, reservas: 740 },
  { date: "2024-05-03", membresias: 570, reservas: 460 },
  { date: "2024-05-04", membresias: 860, reservas: 960 },
  { date: "2024-05-05", membresias: 1080, reservas: 890 },
  { date: "2024-05-06", membresias: 1120, reservas: 1180 },
  { date: "2024-05-07", membresias: 870, reservas: 680 },
  { date: "2024-05-08", membresias: 340, reservas: 480 },
  { date: "2024-05-09", membresias: 520, reservas: 430 },
  { date: "2024-05-10", membresias: 680, reservas: 780 },
  { date: "2024-05-11", membresias: 780, reservas: 640 },
  { date: "2024-05-12", membresias: 460, reservas: 560 },
  { date: "2024-05-13", membresias: 460, reservas: 370 },
  { date: "2024-05-14", membresias: 1040, reservas: 1140 },
  { date: "2024-05-15", membresias: 1100, reservas: 900 },
  { date: "2024-05-16", membresias: 780, reservas: 960 },
  { date: "2024-05-17", membresias: 1120, reservas: 960 },
  { date: "2024-05-18", membresias: 720, reservas: 800 },
  { date: "2024-05-19", membresias: 540, reservas: 420 },
  { date: "2024-05-20", membresias: 400, reservas: 520 },
  { date: "2024-05-21", membresias: 220, reservas: 320 },
  { date: "2024-05-22", membresias: 210, reservas: 280 },
  { date: "2024-05-23", membresias: 590, reservas: 670 },
  { date: "2024-05-24", membresias: 690, reservas: 510 },
  { date: "2024-05-25", membresias: 480, reservas: 610 },
  { date: "2024-05-26", membresias: 510, reservas: 420 },
  { date: "2024-05-27", membresias: 980, reservas: 1060 },
  { date: "2024-05-28", membresias: 540, reservas: 420 },
  { date: "2024-05-29", membresias: 180, reservas: 320 },
  { date: "2024-05-30", membresias: 780, reservas: 640 },
  { date: "2024-05-31", membresias: 420, reservas: 520 },
  { date: "2024-06-01", membresias: 420, reservas: 460 },
  { date: "2024-06-02", membresias: 1100, reservas: 960 },
  { date: "2024-06-03", membresias: 260, reservas: 370 },
  { date: "2024-06-04", membresias: 1030, reservas: 900 },
  { date: "2024-06-05", membresias: 210, reservas: 320 },
  { date: "2024-06-06", membresias: 690, reservas: 580 },
  { date: "2024-06-07", membresias: 760, reservas: 860 },
  { date: "2024-06-08", membresias: 860, reservas: 740 },
  { date: "2024-06-09", membresias: 980, reservas: 1120 },
  { date: "2024-06-10", membresias: 350, reservas: 460 },
  { date: "2024-06-11", membresias: 210, reservas: 350 },
  { date: "2024-06-12", membresias: 1100, reservas: 960 },
  { date: "2024-06-13", membresias: 210, reservas: 300 },
  { date: "2024-06-14", membresias: 960, reservas: 860 },
  { date: "2024-06-15", membresias: 690, reservas: 800 },
  { date: "2024-06-16", membresias: 820, reservas: 690 },
  { date: "2024-06-17", membresias: 1080, reservas: 1180 },
  { date: "2024-06-18", membresias: 240, reservas: 390 },
  { date: "2024-06-19", membresias: 780, reservas: 670 },
  { date: "2024-06-20", membresias: 930, reservas: 1020 },
  { date: "2024-06-21", membresias: 380, reservas: 480 },
  { date: "2024-06-22", membresias: 720, reservas: 640 },
  { date: "2024-06-23", membresias: 1080, reservas: 1190 },
  { date: "2024-06-24", membresias: 300, reservas: 430 },
  { date: "2024-06-25", membresias: 320, reservas: 450 },
  { date: "2024-06-26", membresias: 980, reservas: 860 },
  { date: "2024-06-27", membresias: 1010, reservas: 1110 },
  { date: "2024-06-28", membresias: 340, reservas: 460 },
  { date: "2024-06-29", membresias: 260, reservas: 390 },
  { date: "2024-06-30", membresias: 1020, reservas: 920 },
];

// En JSX no usamos `satisfies ChartConfig` (solo TS). Puedes dejarlo sin tipo
// o usar JSDoc para autocompletado:
/** @type {import("@/components/ui/chart").ChartConfig} */
const chartConfig = {
  membresias: {
    label: "Membresías",
    color: "var(--chart-1)",
  },
  reservas: {
    label: "Reservas",
    color: "var(--chart-2)",
  },
};

export default function DashboardChart() {
  const [timeRange, setTimeRange] = React.useState("90d");

  const filteredData = React.useMemo(() => {
    const referenceDate = new Date("2024-06-30");
    let daysToSubtract = 90;
    if (timeRange === "30d") daysToSubtract = 30;
    if (timeRange === "7d") daysToSubtract = 7;
    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);
    return baseData.filter((item) => new Date(item.date) >= startDate);
  }, [timeRange]);

  const money = (n) => `S/ ${Number(n).toLocaleString("es-PE")}`;

  return (
    <Card className="pt-0">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle>Ganancias — Interactivo</CardTitle>
          <CardDescription>Mostrando membresías y reservas para el rango seleccionado</CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="hidden w-[180px] rounded-lg sm:ml-auto sm:flex" aria-label="Seleccionar rango">
            <SelectValue placeholder="Últimos 3 meses" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d" className="rounded-lg">Últimos 3 meses</SelectItem>
            <SelectItem value="30d" className="rounded-lg">Últimos 30 días</SelectItem>
            <SelectItem value="7d" className="rounded-lg">Últimos 7 días</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillMembresias" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-membresias)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-membresias)" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="fillReservas" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-reservas)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-reservas)" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => new Date(value).toLocaleDateString("es-PE", { month: "short", day: "numeric" })}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => new Date(value).toLocaleDateString("es-PE", { month: "short", day: "numeric" })}
                  indicator="dot"
                  valueFormatter={(v) => money(v)}
                />
              }
            />
            <Area dataKey="reservas" name="Reservas" type="natural" fill="url(#fillReservas)" stroke="var(--color-reservas)" stackId="a" />
            <Area dataKey="membresias" name="Membresías" type="natural" fill="url(#fillMembresias)" stroke="var(--color-membresias)" stackId="a" />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
