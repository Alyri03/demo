// src/LoginPage.jsx
import { useState } from "react";
import { Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

import clubLogo from "@/assets/club-logo.svg";
import signupSvg from "@/assets/undraw_sign-up_z2ku.svg";

export default function LoginPage() {
  const [email, setEmail] = useState("");

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    console.log("Login con correo:", email);
  };

  const handleGithub = () => {
    console.log("Login con GitHub");
  };

  return (
    <div className="min-h-screen bg-white grid lg:grid-cols-2">
      {/* Panel ilustración (izquierda) */}
      <aside className="relative hidden lg:flex flex-col bg-gradient-to-br from-violet-700 via-violet-600 to-fuchsia-600 text-white">
        <div className="flex items-center gap-3 p-6">
          <img src={clubLogo} alt="Logo" className="h-7 w-7" />
          <span className="text-sm font-semibold tracking-wide">Acme Inc</span>
        </div>

        <div className="flex-1 grid place-items-center px-8">
          <img
            src={signupSvg}
            alt="Ilustración registro"
            className="w-full max-w-[560px] drop-shadow-2xl"
            loading="eager"
          />
        </div>

        <div className="px-8 pb-8">
          <p className="max-w-xl text-sm/6 text-white/90">
            “Esta plataforma me ahorra horas y me permite entregar experiencias
            increíbles a mis usuarios.” — <span className="font-medium">Sofía Davis</span>
          </p>
        </div>

        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(600px_200px_at_20%_-10%,rgba(255,255,255,0.25),transparent)]" />
      </aside>

      {/* Panel formulario (derecha) */}
      <main className="flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-sm">
          <div className="mb-8">
            <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
              Crea tu cuenta
            </h1>
            <p className="text-sm text-muted-foreground">
              Ingresa tu correo para continuar
            </p>
          </div>

          <form onSubmit={handleEmailSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Correo electrónico</Label>
              <Input
                id="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                // 💜 foco morado en el input
                className="focus-visible:ring-violet-500"
              />
            </div>

            {/* 💜 Botón principal morado */}
            <Button
              type="submit"
              className="w-full bg-violet-600 hover:bg-violet-700 text-white focus-visible:ring-violet-500"
            >
              Continuar con correo
            </Button>
          </form>

          <div className="my-6">
            {/* línea separadora con tinte morado suave */}
            <Separator className="bg-violet-100" />
            <div className="relative text-center">
              <span className="bg-white px-3 text-xs text-muted-foreground absolute -top-3 left-1/2 -translate-x-1/2">
                O CONTINUAR CON
              </span>
            </div>
          </div>

          {/* 💜 Botón GitHub con borde morado */}
          <Button
            type="button"
            variant="outline"
            onClick={handleGithub}
            className="w-full border-violet-300 text-violet-700 hover:bg-violet-50 focus-visible:ring-violet-500"
          >
            <Github className="mr-2 h-4 w-4" />
            GitHub
          </Button>

          <p className="mt-6 text-xs text-muted-foreground">
            Al continuar, aceptas nuestros{" "}
            <a href="#" className="underline underline-offset-4">
              Términos de Servicio
            </a>{" "}
            y{" "}
            <a href="#" className="underline underline-offset-4">
              Política de Privacidad
            </a>
            .
          </p>
        </div>
      </main>
    </div>
  );
}
