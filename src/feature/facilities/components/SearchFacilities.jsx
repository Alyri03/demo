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
            {categories.map(({ name, icon: Icon }) => (
              <Badge
                key={name}
                onClick={() => setFilters({ ...filters, category: name })}
                className={`cursor-pointer px-4 py-2 flex items-center gap-1 rounded-full ${
                  filters.category === name
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-primary/10"
                }`}
              >
                <Icon className="w-4 h-4" />
                {name}
              </Badge>
            ))}
          </div>
        </div>

        {/* Botón filtros avanzados */}
        <div className="flex items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Filtros avanzados
              </Button>
            </PopoverTrigger>
            <PopoverContent
              align="end"
              sideOffset={8}
              className="w-80 p-4 space-y-4"
            >
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
                />
                <div className="text-xs text-muted-foreground">
                  Hasta S/ {filters.price}
                </div>
              </div>

              {/* Capacidad */}
              <div>
                <h4 className="text-sm font-medium mb-1">
                  Capacidad máxima (personas)
                </h4>
                <Slider
                  value={[filters.capacity]}
                  onValueChange={(v) =>
                    setFilters({ ...filters, capacity: v[0] })
                  }
                  min={0}
                  max={100}
                  step={5}
                />
                <div className="text-xs text-muted-foreground">
                  Hasta {filters.capacity} personas
                </div>
              </div>

              {/* Tipo de ambiente */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Tipo de ambiente</h4>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={filters.interior}
                    onCheckedChange={(v) =>
                      setFilters({ ...filters, interior: v })
                    }
                  />
                  <span className="text-sm">Interior</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={filters.exterior}
                    onCheckedChange={(v) =>
                      setFilters({ ...filters, exterior: v })
                    }
                  />
                  <span className="text-sm">Exterior</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={filters.availableToday}
                    onCheckedChange={(v) =>
                      setFilters({ ...filters, availableToday: v })
                    }
                  />
                  <span className="text-sm">Solo disponibles hoy</span>
                </div>
              </div>

              {hasFilters && (
                <Button
                  variant="ghost"
                  className="text-muted-foreground w-full mt-2"
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
        <div className="bg-blue-50 border border-blue-100 rounded-md px-4 py-2 text-sm text-blue-700">
          Filtros activos: Hasta S/ {filters.price} | Hasta {filters.capacity}{" "}
          personas {filters.interior && "| Interior"}{" "}
          {filters.exterior && "| Exterior"}{" "}
          {filters.availableToday && "| Disponibles hoy"}
        </div>
      )}
    </div>
  );
}
