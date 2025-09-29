// src/App.jsx
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import Layout from "./router/layout";
import MainPage from "@/feature/main/MainPage";
import FacilitiesPage from "@/feature/facilities/FacilitiesPage";
import DisponibilityPage from "@/feature/disponibility/DisponibilityPage";
import PaymentsPage from "@/feature/payments/PaymentsPage";
import LoginPage from "./feature/LoginPage";

function PerfilPage() {
  return <div>Contenido de Perfil</div>;
}

const router = createBrowserRouter([
  // 📌 Login SIN layout (pantalla completa)
  { path: "/login", element: <LoginPage /> },

  // 📌 Resto de la app CON layout (sidebar, etc.)
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Navigate to="/inicio" replace /> },
      { path: "inicio", element: <MainPage /> },
      { path: "perfil", element: <PerfilPage /> },
      { path: "ambientes", element: <FacilitiesPage /> },
      { path: "disponibilidad", element: <DisponibilityPage /> },
      { path: "pagos", element: <PaymentsPage /> },
    ],
  },

  // (Opcional) 404 simple
  { path: "*", element: <Navigate to="/inicio" replace /> },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
