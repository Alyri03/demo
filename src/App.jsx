// src/App.jsx
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./router/layout";
import FacilitiesPage from "@/feature/facilities/FacilitiesPage";
import DisponibilityPage from "@/feature/disponibility/DisponibilityPage";
import PaymentsPage from "@/feature/payments/PaymentsPage"; 

function InicioPage() {
  return <div>Contenido de Inicio</div>;
}
function PerfilPage() {
  return <div>Contenido de Perfil</div>;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "inicio", element: <InicioPage /> },
      { path: "perfil", element: <PerfilPage /> },
      { path: "ambientes", element: <FacilitiesPage /> },
      { path: "disponibilidad", element: <DisponibilityPage /> },
      { path: "pagos", element: <PaymentsPage /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
