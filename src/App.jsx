// src/App.jsx
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import Layout from "./router/layout";
import MainPage from "@/feature/main/MainPage";
import FacilitiesPage from "@/feature/facilities/FacilitiesPage";
import DisponibilityPage from "@/feature/disponibility/DisponibilityPage";
import PaymentsPage from "@/feature/payments/PaymentsPage";
import LoginPage from "./feature/LoginPage";
import DashboardPage from "@/feature/dashboard/DashboardPage"; 

// helpers de rol
const getRole = () =>
  (typeof window !== "undefined" && localStorage.getItem("role")) || null;

function RequireRole({ allow = [], children }) {
  const role = getRole();
  if (!role) return <Navigate to="/login" replace />;
  if (allow.length && !allow.includes(role)) {
    return <Navigate to={role === "ADMIN" ? "/admin" : "/inicio"} replace />;
  }
  return children;
}

function PerfilPage() {
  return <div>Contenido de Perfil</div>;
}

function FallbackRedirect() {
  const role = getRole();
  return <Navigate to={role === "ADMIN" ? "/admin" : "/inicio"} replace />;
}

const router = createBrowserRouter([
  { path: "/login", element: <LoginPage /> },

  // SOCIO
  {
    path: "/",
    element: (
      <RequireRole allow={["SOCIO"]}>
        <Layout />
      </RequireRole>
    ),
    children: [
      { index: true, element: <Navigate to="/inicio" replace /> },
      { path: "inicio", element: <MainPage /> },
      { path: "perfil", element: <PerfilPage /> },
      { path: "ambientes", element: <FacilitiesPage /> },
      { path: "disponibilidad", element: <DisponibilityPage /> },
      { path: "pagos", element: <PaymentsPage /> },
    ],
  },

  // ADMIN (Dashboard)
  {
    path: "/admin",
    element: (
      <RequireRole allow={["ADMIN"]}>
        <Layout />
      </RequireRole>
    ),
    children: [
      { index: true, element: <DashboardPage /> }, // 👈 usa la página nueva
    ],
  },

  { path: "*", element: <FallbackRedirect /> },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
