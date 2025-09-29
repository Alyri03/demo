// src/LoginPage.jsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";

import clubLogo from "@/assets/club-logo.svg";
import signupSvg from "@/assets/undraw_saving-notes_wp71.svg";

// Íconos inline (Google / Microsoft)
const GoogleIcon = (props) => (
  <svg viewBox="0 0 533.5 544.3" width="16" height="16" aria-hidden="true" {...props}>
    <path fill="#EA4335" d="M533.5 278.4c0-18.5-1.7-36.4-5-53.6H272.1v101.5h147c-6.3 34.1-25 62.9-53.3 82.3v68h86.2c50.4-46.4 81.5-114.8 81.5-198.2z"/>
    <path fill="#34A853" d="M272.1 544.3c72.8 0 134-24.1 178.7-65.7l-86.2-68c-24 16.1-54.7 25.6-92.5 25.6-71 0-131.2-47.9-152.7-112.2H30.7v70.5c44.4 88 135.7 149.8 241.4 149.8z"/>
    <path fill="#4A90E2" d="M119.4 323.9c-10.4-30.9-10.4-64.6 0-95.6V157.8H30.7c-40.6 80.9-40.6 176.2 0 257.1l88.7-91z"/>
    <path fill="#FBBC05" d="M272.1 106.2c39.6-.6 77.6 14 106.6 41.4l79.6-79.6C404.5 23.1 340.7-.1 272.1 0 166.4 0 75.1 61.8 30.7 149.8l88.7 70.5C140.9 155.9 201.1 108 272.1 108z"/>
  </svg>
);

const MicrosoftIcon = (props) => (
  <svg viewBox="0 0 23 23" width="16" height="16" aria-hidden="true" {...props}>
    <rect width="10" height="10" x="1"  y="1"  fill="#F35325" />
    <rect width="10" height="10" x="12" y="1"  fill="#81BC06" />
    <rect width="10" height="10" x="1"  y="12" fill="#05A6F0" />
    <rect width="10" height="10" x="12" y="12" fill="#FFBA08" />
  </svg>
);

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    const eLower = email.trim().toLowerCase();

    // Demo simple
    if (eLower === "admin@gmail.com" && password.length >= 0) {
      localStorage.setItem("role", "ADMIN");
      navigate("/admin", { replace: true });
      return;
    }
    if (eLower === "socio@gmail.com" && password.length >= 0) {
      localStorage.setItem("role", "SOCIO");
      navigate("/inicio", { replace: true });
      return;
    }
    alert("Credenciales de demo: admin@gmail.com o socio@gmail.com (cualquier contraseña).");
  };

  const handleGoogle = () => {
    console.log("Login con Google");
  };

  const handleMicrosoft = () => {
    console.log("Login con Microsoft");
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-background text-foreground">
      {/* Panel ilustración (izquierda) */}
      <aside className="relative hidden lg:flex flex-col bg-gradient-to-br from-violet-700 via-violet-600 to-fuchsia-600 text-white">
        <div className="flex items-center gap-3 p-6">
          <img src={clubLogo} alt="Logo Club Social" className="h-7 w-7" />
          <span className="text-sm font-semibold tracking-wide">Club Social</span>
        </div>

        <div className="flex-1 grid place-items-center px-8">
          <img
            src={signupSvg}
            alt="Ilustración acceso"
            className="w-full max-w-[560px] drop-shadow-2xl"
            loading="eager"
          />
        </div>

        <div className="px-8 pb-8">
          <p className="max-w-xl text-sm/6 text-white/90">
            “Esta plataforma me ahorra horas y me permite entregar experiencias increíbles a mis usuarios.” —{" "}
            <span className="font-medium">Sofía Davis</span>
          </p>
        </div>

        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(600px_200px_at_20%_-10%,rgba(255,255,255,0.25),transparent)]" />
      </aside>

      {/* Panel formulario (derecha) */}
      <main className="flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-sm">
          <div className="mb-8">
            <h1 className="text-2xl font-semibold tracking-tight">Inicia sesión</h1>
            <p className="text-sm text-muted-foreground">Ingresa tu correo para continuar</p>
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
                className="focus-visible:ring-violet-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                autoComplete="current-password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="focus-visible:ring-violet-500"
              />
              <p className="text-xs text-muted-foreground">
                Demo: usa <code>admin@gmail.com</code> o <code>socio@gmail.com</code> con cualquier contraseña.
              </p>
            </div>

            <Button
              type="submit"
              className="w-full bg-violet-600 hover:bg-violet-700 text-white focus-visible:ring-violet-500"
            >
              Ingresar
            </Button>
          </form>

          <div className="my-6 relative">
            <Separator className="bg-border" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="px-3 text-xs text-muted-foreground bg-background">O CONTINUAR CON</span>
            </div>
          </div>

          {/* Botones sociales: Google / Microsoft */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleGoogle}
              className="w-full border-violet-400/70 text-violet-700 hover:bg-violet-500/10 focus-visible:ring-violet-500 dark:text-violet-300"
            >
              <GoogleIcon className="mr-2 h-4 w-4" />
              Google
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={handleMicrosoft}
              className="w-full border-violet-400/70 text-violet-700 hover:bg-violet-500/10 focus-visible:ring-violet-500 dark:text-violet-300"
            >
              <MicrosoftIcon className="mr-2 h-4 w-4" />
              Microsoft
            </Button>
          </div>

          <p className="mt-6 text-xs text-muted-foreground">
            Al continuar, aceptas nuestros{" "}
            <a href="#" className="underline underline-offset-4">Términos de Servicio</a> y{" "}
            <a href="#" className="underline underline-offset-4">Política de Privacidad</a>.
          </p>
        </div>
      </main>
    </div>
  );
}
