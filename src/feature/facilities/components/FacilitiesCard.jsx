// src/components/FacilitiesCard.jsx
import { useState } from "react";
import {
  Calendar,
  Heart,
  Wifi,
  Car,
  Users,
  MapPin,
  CalendarCheck,
  Clock,
  Utensils,
  Snowflake,
  Monitor,
  Flame,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function FacilitiesCard({
  image,
  title,
  capacity,
  wifi,
  parking,
  catering,
  airConditioning,
  projector,
  bbqArea,
  outdoor,
  price,
  oldPrice,
  availableToday,
  nextAvailability,
  discountSocio,
  onOpenModal, 
}) {
  const [isFavorite, setIsFavorite] = useState(false);

  const badgeClasses = "flex items-center gap-1 h-6 px-2 py-0 text-xs";

  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden relative flex flex-col">
      {/* --- Imagen --- */}
      <div
        className="relative h-52 w-full bg-gray-200 flex items-center justify-center"
        style={{
          backgroundImage: image ? `url(${image})` : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {!image && <span className="text-gray-400 text-sm">Imagen</span>}

        {/* Corazón favorito */}
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className={`absolute top-3 left-3 rounded-full p-2 bg-white shadow ${
            isFavorite ? "text-red-500" : "text-gray-700"
          }`}
        >
          <Heart
            className="w-5 h-5"
            fill={isFavorite ? "currentColor" : "none"}
          />
        </button>

        {/* Tags */}
        {availableToday ? (
          <Badge className="absolute top-3 right-3 bg-green-500 text-white flex items-center gap-1">
            <CalendarCheck className="w-3 h-3" />
            Disponible Hoy
          </Badge>
        ) : nextAvailability ? (
          <Badge className="absolute top-3 right-3 bg-orange-500 text-white flex items-center gap-1">
            <Clock className="w-3 h-3" />
            Próx.: {nextAvailability}
          </Badge>
        ) : null}

        <Badge
          variant="outline"
          className="absolute bottom-3 right-3 bg-white/80 backdrop-blur-sm text-gray-700 flex items-center gap-1"
        >
          <MapPin className="w-3 h-3" />
          {outdoor ? "Exterior" : "Interior"}
        </Badge>

        {discountSocio && (
          <Badge className="absolute bottom-3 left-3 bg-blue-600 text-white flex items-center gap-1">
            {discountSocio}
          </Badge>
        )}
      </div>

      {/* --- Contenido inferior --- */}
      <div className="p-4 flex flex-col justify-between flex-1">
        <div>
          <h3 className="font-semibold text-lg">{title}</h3>

          <div className="flex flex-wrap gap-2 text-gray-700 mt-2 min-h-[48px]">
            <Badge variant="secondary" className={badgeClasses}>
              <Users className="w-3 h-3" /> Hasta {capacity}
            </Badge>
            {wifi && (
              <Badge variant="secondary" className={badgeClasses}>
                <Wifi className="w-3 h-3" /> Wifi
              </Badge>
            )}
            {parking && (
              <Badge variant="secondary" className={badgeClasses}>
                <Car className="w-3 h-3" /> Parking
              </Badge>
            )}
            {catering && (
              <Badge variant="secondary" className={badgeClasses}>
                <Utensils className="w-3 h-3" /> Catering
              </Badge>
            )}
            {airConditioning && (
              <Badge variant="secondary" className={badgeClasses}>
                <Snowflake className="w-3 h-3" /> Aire Acond.
              </Badge>
            )}
            {projector && (
              <Badge variant="secondary" className={badgeClasses}>
                <Monitor className="w-3 h-3" /> Proyector
              </Badge>
            )}
            {bbqArea && (
              <Badge variant="secondary" className={badgeClasses}>
                <Flame className="w-3 h-3" /> BBQ
              </Badge>
            )}
          </div>

          <div className="flex items-center gap-2 mt-2">
            <span className="text-xl font-bold text-gray-900">S/ {price}</span>
            {oldPrice && (
              <span className="text-sm text-gray-400 line-through">
                S/ {oldPrice}
              </span>
            )}
            <span className="text-xs text-gray-500">por hora</span>
          </div>
        </div>

        {/* Botón que abre modal */}
        <Button
          className="w-full flex items-center gap-2 mt-4"
          onClick={onOpenModal}
        >
          <Calendar className="w-4 h-4" />
          Ver Disponibilidad
        </Button>
      </div>
    </div>
  );
}
