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
    <div
      className="
        rounded-xl border bg-card text-card-foreground
        shadow-sm hover:shadow-md transition
        overflow-hidden relative flex flex-col
      "
    >
      {/* --- Imagen --- */}
      <div
        className="relative h-52 w-full bg-muted flex items-center justify-center"
        style={{
          backgroundImage: image ? `url(${image})` : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {!image && (
          <span className="text-sm text-muted-foreground">Imagen</span>
        )}

        {/* Corazón favorito */}
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className={`
            absolute top-3 left-3 rounded-full p-2
            bg-background/80 backdrop-blur-sm border border-border
            ${isFavorite ? "text-red-500" : "text-muted-foreground"}
          `}
        >
          <Heart
            className="w-5 h-5"
            fill={isFavorite ? "currentColor" : "none"}
          />
        </button>

        {/* Tags */}
        {availableToday ? (
          <Badge className="absolute top-3 right-3 flex items-center gap-1 bg-emerald-600 text-white dark:bg-emerald-500 dark:text-emerald-950">
            <CalendarCheck className="w-3 h-3" />
            Disponible Hoy
          </Badge>
        ) : nextAvailability ? (
          <Badge className="absolute top-3 right-3 flex items-center gap-1 bg-orange-600 text-white dark:bg-orange-500 dark:text-orange-950">
            <Clock className="w-3 h-3" />
            Próx.: {nextAvailability}
          </Badge>
        ) : null}

        <Badge
          variant="outline"
          className="
            absolute bottom-3 right-3 flex items-center gap-1
            bg-background/80 backdrop-blur-sm text-foreground/80
            border border-border
          "
        >
          <MapPin className="w-3 h-3" />
          {outdoor ? "Exterior" : "Interior"}
        </Badge>

        {discountSocio && (
          <Badge className="absolute bottom-3 left-3 bg-indigo-600 text-white dark:bg-indigo-500 dark:text-indigo-950">
            {discountSocio}
          </Badge>
        )}
      </div>

      {/* --- Contenido inferior --- */}
      <div className="p-4 flex flex-col justify-between flex-1">
        <div>
          <h3 className="font-semibold text-lg">{title}</h3>

          <div className="flex flex-wrap gap-2 mt-2 min-h-[48px]">
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
            <span className="text-xl font-bold">S/ {price}</span>
            {oldPrice && (
              <span className="text-sm text-muted-foreground line-through">
                S/ {oldPrice}
              </span>
            )}
            <span className="text-xs text-muted-foreground">por hora</span>
          </div>
        </div>

        {/* Botón abre modal */}
        <Button
          onClick={onOpenModal}
          className="w-full mt-4 bg-[#5951e6] text-white hover:bg-[#544be4] focus-visible:ring-[#7c74f1]"
        >
          <Calendar className="w-4 h-4" />
          Ver Disponibilidad
        </Button>
      </div>
    </div>
  );
}
