import { portals } from "@/lib/profile";

/** Pure-CSS stand-in for the 3D core (no WebGL, low-power devices, 2D mode). */
export function CoreFallback() {
  return (
    <div aria-hidden className="scene-in absolute inset-0 flex items-center justify-center overflow-hidden">
      <div className="relative aspect-square w-[min(90vw,34rem)]">
        <div className="orbit-spin absolute inset-[6%] rounded-full border border-glow-violet/40" />
        <div className="orbit-spin absolute inset-[22%] rounded-full border border-glow-cyan/50 [animation-direction:reverse]" />
        <div className="orbit-spin absolute inset-0">
          {portals.map((p, i) => {
            const a = (i / portals.length) * 360;
            return (
              <span
                key={p.id}
                className="absolute left-1/2 top-1/2 size-3 rounded-full"
                style={{
                  background: p.color,
                  boxShadow: `0 0 18px ${p.color}`,
                  transform: `rotate(${a}deg) translateY(-15.5rem) translate(-50%, -50%)`,
                }}
              />
            );
          })}
        </div>
        <div className="core-pulse absolute inset-[38%] rounded-full bg-[radial-gradient(circle,#7dd3fc_0%,#38bdf8_30%,#1e3a8a_70%,transparent_100%)] blur-[2px] shadow-[0_0_80px_20px_rgb(56_189_248/0.45)]" />
      </div>
    </div>
  );
}
