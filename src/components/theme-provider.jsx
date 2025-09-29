// src/components/theme-provider.jsx
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const ThemeProviderContext = createContext({
  theme: "system",
  setTheme: () => {},
});

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
}) {
  // lee localStorage una sola vez (evita FOUC)
  const [theme, setThemeState] = useState(() => {
    const saved = localStorage.getItem(storageKey);
    return saved || defaultTheme;
  });

  // aplica la clase en <html>
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");

    const apply = (t) => {
      if (t === "system") {
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        root.classList.add(prefersDark ? "dark" : "light");
      } else {
        root.classList.add(t);
      }
    };

    apply(theme);

    // si está en "system", escucha cambios del SO
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => theme === "system" && apply("system");
    mql.addEventListener?.("change", onChange);
    return () => mql.removeEventListener?.("change", onChange);
  }, [theme]);

  const setTheme = (t) => {
    localStorage.setItem(storageKey, t);
    setThemeState(t);
  };

  const value = useMemo(() => ({ theme, setTheme }), [theme]);

  return (
    <ThemeProviderContext.Provider value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeProviderContext);
