import { useEffect, useState } from "react";

/**
 * Mide el alto total de un elemento (incluye bordes) y se actualiza
 * cuando cambia el tamaño del elemento o la ventana.
 */
export function useElementHeight(ref) {
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (!ref.current) return;

    const measure = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      setHeight(Math.max(0, Math.round(rect.height)));
    };

    measure();

    const ro = new ResizeObserver(measure);
    ro.observe(ref.current);

    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [ref]);

  return height;
}
