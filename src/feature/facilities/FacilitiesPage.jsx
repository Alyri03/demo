// src/components/FacilitiesPage.jsx
import { useState } from "react";
import SearchFacilities from "./components/SearchFacilities";
import FacilitiesCard from "./components/FacilitiesCard";
import DisponibilityModal from "./components/DisponibilityModal";

// ⬇️ Imágenes demo como constantes
const IMG_FUTBOL =
  "https://v0-ui-redesign-pearl.vercel.app/soccer-field-outdoor-grass.jpg";
const IMG_ELEGANCE =
  "https://v0-ui-redesign-pearl.vercel.app/elegant-event-hall-interior.jpg";
const IMG_JARDIN =
  "https://v0-ui-redesign-pearl.vercel.app/beautiful-garden-outdoor-event-space.jpg";
const IMG_PARRILLAS =
  "https://v0-ui-redesign-pearl.vercel.app/outdoor-barbecue-grill-area.jpg";
const IMG_CONFERENCIAS =
  "https://v0-ui-redesign-pearl.vercel.app/modern-conference-room-interior.jpg";
const IMG_TENIS =
  "https://v0-ui-redesign-pearl.vercel.app/outdoor-tennis-court.png";

export default function FacilitiesPage() {
  const [filters, setFilters] = useState({
    category: "Todos",
    price: 200,
    capacity: 100,
    interior: false,
    exterior: false,
    availableToday: false,
  });

  const [selectedFacility, setSelectedFacility] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const facilities = [
    {
      image: IMG_ELEGANCE,
      title: "Salón Elegance",
      category: "Salones",
      capacity: 40,
      wifi: true,
      parking: true,
      catering: true,
      projector: true,
      airConditioning: true,
      indoor: true,
      price: 60,
      oldPrice: 120,
      availableToday: true,
    },
    {
      image: IMG_FUTBOL,
      title: "Cancha Fútbol 1",
      category: "Canchas",
      capacity: 22,
      parking: true,
      outdoor: true,
      soundSystem: true,
      locker: true,
      price: 40,
      oldPrice: 80,
      availableToday: false,
      nextAvailability: "21/09",
    },
    {
      image: IMG_JARDIN,
      title: "Jardín Primavera",
      category: "Jardines",
      capacity: 60,
      wifi: true,
      catering: true,
      bbqArea: true,
      outdoor: true,
      price: 75,
      oldPrice: 150,
      availableToday: true,
    },
    {
      image: IMG_PARRILLAS,
      title: "Parrilla Familiar",
      category: "Parrillas",
      capacity: 15,
      parking: true,
      bbqArea: true,
      soundSystem: true,
      outdoor: true,
      price: 25,
      oldPrice: 50,
      availableToday: true,
    },
    {
      image: IMG_CONFERENCIAS,
      title: "Salón Ejecutivo",
      category: "Salones",
      capacity: 25,
      wifi: true,
      catering: true,
      projector: true,
      airConditioning: true,
      indoor: true,
      price: 45,
      oldPrice: 90,
      availableToday: false,
      nextAvailability: "22/09",
    },
    {
      image: IMG_TENIS,
      title: "Cancha Tenis Club",
      category: "Canchas",
      capacity: 4,
      parking: true,
      locker: true,
      outdoor: true,
      price: 30,
      oldPrice: 60,
      availableToday: true,
    },
    {
      image: IMG_PARRILLAS,
      title: "Zona BBQ Deluxe",
      category: "Parrillas",
      capacity: 20,
      parking: true,
      bbqArea: true,
      soundSystem: true,
      outdoor: true,
      price: 35,
      oldPrice: 70,
      availableToday: false,
      nextAvailability: "24/09",
    },
    {
      image: IMG_JARDIN,
      title: "Jardín de Eventos",
      category: "Jardines",
      capacity: 80,
      wifi: true,
      catering: true,
      projector: true,
      soundSystem: true,
      airConditioning: true,
      outdoor: true,
      price: 90,
      oldPrice: 180,
      availableToday: true,
    },
  ];

  const filteredFacilities = facilities.filter((item) => {
    if (filters.category !== "Todos" && item.category !== filters.category)
      return false;
    if (item.price > filters.price) return false;
    if (item.capacity > filters.capacity) return false;
    if (filters.interior && !item.indoor) return false;
    if (filters.exterior && !item.outdoor) return false;
    if (filters.availableToday && !item.availableToday) return false;
    return true;
  });

  const handleOpenModal = (facility) => {
    setSelectedFacility(facility);
    setModalOpen(true);
  };

  return (
    <div className="p-0 md:p-5">
      <div className="px-0 md:px-14 mx-auto my-0 md:my-2">
        <SearchFacilities filters={filters} setFilters={setFilters} />

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredFacilities.map((item, idx) => (
            <FacilitiesCard
              key={idx}
              {...item}
              onOpenModal={() => handleOpenModal(item)}
            />
          ))}
        </div>
      </div>

      <DisponibilityModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        facility={selectedFacility}
      />
    </div>
  );
}
