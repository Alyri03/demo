// src/components/HeroClub.jsx
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function HeroClub({
  nombre = "Luis Enrique",
  badge = "Premium",
  imageSrc,                // ej: import heroImg from "@/assets/undraw_welcome_nk8k.svg"
  imageAlt = "Club Social",
  className,
}) {
  return (
    <section
      className={cn(
        "relative overflow-hidden rounded-3xl shadow-sm",
        "bg-gradient-to-r from-[#8b5cf6] via-[#5951e6] to-[#2563eb]",
        className
      )}
      aria-label="Bienvenida Club Social"
    >
      {/* Glow suave */}
      <div aria-hidden className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-2xl" />
      <div aria-hidden className="absolute -right-24 -bottom-24 h-72 w-72 rounded-full bg-white/10 blur-2xl" />

      <div className="relative z-10 grid md:grid-cols-2 items-center gap-6 px-6 py-6 md:px-10 md:py-8">
        {/* Lado izquierdo: badge, título, copy y CTAs */}
        <div className="text-white">
          <span className="inline-flex items-center rounded-full bg-white/25 px-3 py-1 text-xs font-semibold backdrop-blur">
            {badge}
          </span>

          <h1 className="mt-3 text-2xl md:text-4xl font-extrabold tracking-tight">
            Bienvenido, {nombre}
          </h1>

          <p className="mt-3 max-w-xl text-sm md:text-base text-white/90">
            Gestiona tus <b>reservas</b>, descubre <b>eventos</b> y lleva al día tu
            <b> membresía</b> del Club Social — todo desde un solo lugar.
          </p>

          <div className="mt-4 flex flex-wrap gap-3">
            <Link to="/disponibilidad">
              <Button size="sm" className="bg-white text-[#5951e6] hover:bg-white/90">
                Explorar eventos
              </Button>
            </Link>
            <Link to="/ambientes">
              <Button size="sm" variant="secondary" className="bg-white/20 text-white hover:bg-white/25">
                Reservar ambiente
              </Button>
            </Link>
          </div>
        </div>

        {/* Lado derecho: imagen con aros decorativos */}
        <div className="hidden md:flex justify-end">
          <div className="relative h-44 w-44 lg:h-52 lg:w-52">
            {/* Aros concéntricos */}
            <span className="absolute inset-0 rounded-full bg-white/10" />
            <span className="absolute inset-3 rounded-full bg-white/10" />
            <span className="absolute inset-6 rounded-full bg-white/10" />
            <span className="absolute inset-9 rounded-full bg-white/10" />
            {/* Imagen circular */}
            <div className="absolute inset-0 grid place-items-center">
              <div className="h-36 w-36 lg:h-44 lg:w-44 rounded-full bg-white/20 backdrop-blur p-2">
                <div className="h-full w-full rounded-full bg-white shadow-lg overflow-hidden">
                  {imageSrc && (
                    <img
                      src={imageSrc}
                      alt={imageAlt}
                      className="h-full w-full object-contain"
                      draggable="false"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
