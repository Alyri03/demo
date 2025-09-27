import FacilitiesTable from "./components/FacilitiesTable"

export default function DisponibilityPage() {
  return (
    <div className="p-0 md:p-5">
      <div className="px-0 md:px-14 mx-auto my-0 md:my-2">
       
        <p className="text-gray-600 mt-2">
          Aquí puedes ver todas tus reservas de ambientes realizadas.
        </p>

        {/* Tabla de reservas */}
        <FacilitiesTable />
      </div>
    </div>
  )
}
