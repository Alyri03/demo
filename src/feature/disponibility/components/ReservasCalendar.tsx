// src/feature/disponibility/components/ReservasCalendar.tsx
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import esLocale from "@fullcalendar/core/locales/es";

// (opcional pero recomendado) estilos base de FullCalendar
// import "@fullcalendar/daygrid/index.css";
// import "@fullcalendar/timegrid/index.css";

export default function ReservasCalendar() {
  // eventos demo (ISO estricto)
  const events = [
    { id: "1", title: "Salón Elegance", start: "2025-09-26T15:00:00", end: "2025-09-26T17:00:00" },
    { id: "2", title: "Cancha Fútbol 1", start: "2025-09-27T10:00:00", end: "2025-09-27T12:00:00" },
  ];

  return (
    <div className="border rounded-2xl overflow-hidden">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        headerToolbar={{ left: "prev,next today", center: "title", right: "dayGridMonth,timeGridWeek,timeGridDay" }}
        initialView="timeGridWeek"
        height="auto"
        locale={esLocale}
        editable
        events={events}
      />
    </div>
  );
}
