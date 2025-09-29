// src/App.jsx
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import Layout from "./router/layout";
import MainPage from "@/feature/main/MainPage";              // ⬅️ importa tu dashboard
import FacilitiesPage from "@/feature/facilities/FacilitiesPage";
import DisponibilityPage from "@/feature/disponibility/DisponibilityPage";
import PaymentsPage from "@/feature/payments/PaymentsPage";

function PerfilPage() {
  return <div>Contenido de Perfil</div>;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Navigate to="/inicio" replace /> }, // ⬅️ default
      { path: "inicio", element: <MainPage /> },                   // ⬅️ usa MainPage
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
