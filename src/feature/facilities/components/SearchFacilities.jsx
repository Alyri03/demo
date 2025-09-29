import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Filter, Grid, Building2, Trees, Dumbbell, Flame } from "lucide-react";

/* —— Estilos morados reutilizables —— */
const PURPLE_SOLID =
  "bg-[#5951e6] text-white hover:bg-[#544be4] focus-visible:ring-[#5951e6]";
const PURPLE_OUTLINE =
  "border-[#5951e6] text-[#5951e6] hover:bg-[#eef2ff] focus-visible:ring-[#5951e6]";
const PURPLE_CHIP_ACTIVE = "bg-[#5951e6] text-white";
const PURPLE_CHIP_IDLE =
  "bg-muted text-muted-foreground hover:bg-[#eef2ff] hover:text-[#5951e6]";

export default function SearchFacilities({ filters, setFilters }) {
  const categories = [
    { name: "Todos", icon: Grid },
    { name: "Salones", icon: Building2 },
    { name: "Jardines", icon: Trees },
    { name: "Canchas", icon: Dumbbell },
    { name: "Parrillas", icon: Flame },
  ];

  const hasFilters =
    filters.price !== 200 ||
    filters.capacity !== 100 ||
    filters.interior ||
    filters.exterior ||
    filters.availableToday;

  const clearFilters = () => {
    setFilters({
      ...filters,
      price: 200,
      capacity: 100,
      interior: false,
      exterior: false,
      availableToday: false,
    });
  };

  return (
    <div className="w-full space-y-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Categorías */}
        <div className="overflow-x-auto flex-1">
          <div className="flex flex-nowrap md:flex-wrap gap-2">
            {categories.map(({ name, icon: Icon }) => {
              const active = filters.category === name;
              return (
                <Badge
                  key={name}
                  onClick={() => setFilters({ ...filters, category: name })}
                  className={[
                    "cursor-pointer px-4 py-2 flex items-center gap-1 rounded-full",
                    active ? PURPLE_CHIP_ACTIVE : PURPLE_CHIP_IDLE,
                  ].join(" ")}
                >
                  <Icon className="w-4 h-4" />
                  {name}
                </Badge>
              );
            })}
          </div>
        </div>

        {/* Botón filtros avanzados */}
        <div className="flex items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className={["flex items-center gap-2", PURPLE_OUTLINE].join(" ")}>
                <Filter className="w-4 h-4" />
                Filtros avanzados
              </Button>
            </PopoverTrigger>

            <PopoverContent align="end" sideOffset={8} className="w-80 p-4 space-y-4">
              <h3 className="font-semibold">Filtros avanzados</h3>

              {/* Precio */}
              <div>
                <h4 className="text-sm font-medium mb-1">Precio máximo (S/)</h4>
                <Slider
                  value={[filters.price]}
                  onValueChange={(v) => setFilters({ ...filters, price: v[0] })}
                  min={0}
                  max={200}
                  step={5}
                  /* tinte morado para el range y el thumb */
                  className="[&_.bg-primary]:bg-[#5951e6] [&_[role=slider]]:border-[#5951e6]"
                />
                <div className="text-xs text-muted-foreground">Hasta S/ {filters.price}</div>
              </div>

              {/* Capacidad */}
              <div>
                <h4 className="text-sm font-medium mb-1">Capacidad máxima (personas)</h4>
                <Slider
                  value={[filters.capacity]}
                  onValueChange={(v) => setFilters({ ...filters, capacity: v[0] })}
                  min={0}
                  max={100}
                  step={5}
                  className="[&_.bg-primary]:bg-[#5951e6] [&_[role=slider]]:border-[#5951e6]"
                />
                <div className="text-xs text-muted-foreground">Hasta {filters.capacity} personas</div>
              </div>

              {/* Tipo de ambiente */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Tipo de ambiente</h4>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={filters.interior}
                    onCheckedChange={(v) => setFilters({ ...filters, interior: v })}
                    className="data-[state=checked]:bg-[#5951e6] data-[state=checked]:border-[#5951e6] data-[state=checked]:text-white"
                  />
                  <span className="text-sm">Interior</span>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={filters.exterior}
                    onCheckedChange={(v) => setFilters({ ...filters, exterior: v })}
                    className="data-[state=checked]:bg-[#5951e6] data-[state=checked]:border-[#5951e6] data-[state=checked]:text-white"
                  />
                  <span className="text-sm">Exterior</span>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={filters.availableToday}
                    onCheckedChange={(v) => setFilters({ ...filters, availableToday: v })}
                    className="data-[state=checked]:bg-[#5951e6] data-[state=checked]:border-[#5951e6] data-[state=checked]:text-white"
                  />
                  <span className="text-sm">Solo disponibles hoy</span>
                </div>
              </div>

              {hasFilters && (
                <Button
                  variant="ghost"
                  className="w-full mt-2 text-[#5951e6] hover:bg-[#eef2ff]"
                  onClick={clearFilters}
                >
                  Limpiar filtros
                </Button>
              )}
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {hasFilters && (
        <div className="rounded-md px-4 py-2 text-sm bg-[#EEF2FF] border border-[#D9DCFF] text-[#4A45D8]">
          Filtros activos: Hasta S/ {filters.price} | Hasta {filters.capacity} personas{" "}
          {filters.interior && "| Interior"} {filters.exterior && "| Exterior"}{" "}
          {filters.availableToday && "| Disponibles hoy"}
        </div>
      )}
    </div>
  );
}
