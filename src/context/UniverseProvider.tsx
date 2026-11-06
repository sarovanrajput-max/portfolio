"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

export type RenderMode = "auto" | "3d" | "2d";

type UniverseState = {
  ready: boolean; // device checks finished (avoids hydration mismatch)
  reducedMotion: boolean;
  webglOk: boolean;
  renderMode: RenderMode;
  setRenderMode: (m: RenderMode) => void;
  /** Final decision: should we mount the 3D canvas? */
  use3D: boolean;
  hoveredPortal: string | null;
  setHoveredPortal: (id: string | null) => void;
};

const Ctx = createContext<UniverseState | null>(null);

function detectWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

export function UniverseProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [webglOk, setWebglOk] = useState(false);
  const [lowPower, setLowPower] = useState(false);
  const [renderMode, setRenderModeState] = useState<RenderMode>("auto");
  const [hoveredPortal, setHoveredPortal] = useState<string | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const nav = navigator as Navigator & { deviceMemory?: number };
    const onChange = () => setReducedMotion(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);

    setWebglOk(detectWebGL());
    setLowPower((nav.hardwareConcurrency ?? 8) <= 2 || (nav.deviceMemory ?? 8) <= 2);

    try {
      const saved = localStorage.getItem("universe:render-mode") as RenderMode | null;
      if (saved === "3d" || saved === "2d" || saved === "auto") setRenderModeState(saved);
    } catch {}
    setReady(true);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const setRenderMode = useCallback((m: RenderMode) => {
    setRenderModeState(m);
    try {
      localStorage.setItem("universe:render-mode", m);
    } catch {}
  }, []);

  const use3D = useMemo(() => {
    if (!ready || !webglOk) return false;
    if (renderMode === "2d") return false;
    if (renderMode === "3d") return true;
    return !lowPower && !reducedMotion; // auto
  }, [ready, webglOk, renderMode, lowPower, reducedMotion]);

  const value = useMemo(
    () => ({ ready, reducedMotion, webglOk, renderMode, setRenderMode, use3D, hoveredPortal, setHoveredPortal }),
    [ready, reducedMotion, webglOk, renderMode, setRenderMode, use3D, hoveredPortal]
  );
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useUniverse() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useUniverse must be used inside <UniverseProvider>");
  return v;
}
