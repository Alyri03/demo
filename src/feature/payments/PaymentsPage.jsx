import PaymentsIndicators from "./components/PaymentsIndicators";
import PaymentsToolbar from "./components/PaymentsToolbar";
import PaymentsTable from "./components/PaymentsTable";

export default function PaymentsPage() {
  return (
    <div className="p-6 md:p-10">
      

      {/* Indicadores */}
      <PaymentsIndicators />

      {/* Filtros + exportaciones */}
      <PaymentsToolbar />

      {/* Tabla de pagos */}
      <PaymentsTable />
    </div>
  );
}
