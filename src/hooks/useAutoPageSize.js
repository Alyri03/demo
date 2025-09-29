import { useEffect, useState } from "react";

/**
 * Calcula un pageSize que llena el viewport.
 * Ajusta rowHeight si tus filas son más altas/bajas.
 */
export function useAutoPageSize({ rowHeight = 72, header = 220, footer = 84 } = {}) {
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    function calc() {
      const h = window.innerHeight;
      const usable = Math.max(320, h - header - footer);
      const rows = Math.max(5, Math.floor(usable / rowHeight));
      setPageSize(rows);
    }
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, [rowHeight, header, footer]);

  return pageSize;
}
