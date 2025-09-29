import PaymentsIndicators from "./components/PaymentsIndicators";
import PaymentsToolbar from "./components/PaymentsToolbar";
import PaymentsTable from "./components/PaymentsTable";
import { CreditCard } from "lucide-react";

export default function PaymentsPage() {
  return (
    <div className="p-6 md:p-10 space-y-6">
      {/* Encabezado */}
      

      {/* Indicadores */}
      <PaymentsIndicators />

      {/* Filtros + exportaciones */}
      <PaymentsToolbar />

      {/* Tabla de pagos */}
      <PaymentsTable />
    </div>
  );
}
