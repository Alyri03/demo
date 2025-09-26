import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./router/layout";
import FacilitiesPage from "@/feature/facilities/FacilitiesPage";
import DisponibilityPage from "@/feature/disponibility/DisponibilityPage"; 

function InicioPage() { 
  return <div>Contenido de Inicio</div>; 
}
function PerfilPage() { 
  return <div>Contenido de Perfil</div>; 
}
function PagosPage() { 
  return <div>Contenido de Pagos e Historial</div>; 
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
      { path: "pagos", element: <PagosPage /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
