"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Box, Layers, Menu, X } from "lucide-react";
import { portals, profile } from "@/lib/profile";
import { useUniverse } from "@/context/UniverseProvider";

export function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { use3D, webglOk, setRenderMode, setHoveredPortal } = useUniverse();

  const toggleLabel = use3D ? "Switch to lightweight 2D view" : "Switch to 3D view";

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <nav aria-label="Main" className="glass mx-3 mt-3 flex max-w-6xl items-center justify-between rounded-full px-4 py-2 sm:px-6 lg:mx-auto">
        <Link href="/" className="font-display text-sm tracking-wide text-mist focus-ring rounded-full px-2 py-1">
          {profile.name}
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {portals.map((p) => {
            const active = pathname === p.href;
            return (
              <li key={p.id}>
                <Link
                  href={p.href}
                  aria-current={active ? "page" : undefined}
                  onMouseEnter={() => setHoveredPortal(p.id)}
                  onMouseLeave={() => setHoveredPortal(null)}
                  onFocus={() => setHoveredPortal(p.id)}
                  onBlur={() => setHoveredPortal(null)}
                  className={`focus-ring rounded-full px-3 py-1.5 text-sm transition-colors ${
                    active ? "bg-white/10 text-white" : "text-mist/70 hover:text-white"
                  }`}
                >
                  {p.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-1">
          {webglOk && (
            <button
              type="button"
              onClick={() => setRenderMode(use3D ? "2d" : "3d")}
              aria-label={toggleLabel}
              title={toggleLabel}
              className="focus-ring rounded-full p-2 text-mist/70 transition-colors hover:text-white"
            >
              {use3D ? <Layers size={18} aria-hidden /> : <Box size={18} aria-hidden />}
            </button>
          )}
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="focus-ring rounded-full p-2 text-mist md:hidden"
          >
            {open ? <X size={20} aria-hidden /> : <Menu size={20} aria-hidden />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.ul
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="glass mx-3 mt-2 flex flex-col gap-1 rounded-3xl p-3 md:hidden"
          >
            {portals.map((p) => (
              <li key={p.id}>
                <Link
                  href={p.href}
                  onClick={() => setOpen(false)}
                  aria-current={pathname === p.href ? "page" : undefined}
                  className="focus-ring block rounded-2xl px-4 py-3 text-mist hover:bg-white/5"
                >
                  {p.label}
                </Link>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  );
}
