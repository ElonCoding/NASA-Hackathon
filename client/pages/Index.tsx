import { useState } from "react";
import Globe from "../components/terra/Globe";
import LeftPanel from "../components/terra/LeftPanel";
import RightPanel from "../components/terra/RightPanel";

export default function Index() {
  const [autoRotate, setAutoRotate] = useState(() => {
    try {
      const s = localStorage.getItem("terra:autoRotate");
      return s ? JSON.parse(s) : true;
    } catch {
      return true;
    }
  });

  const [selectedLayers, setSelectedLayers] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem("terra:layers") || "null") || ["clouds"];
    } catch {
      return ["clouds"];
    }
  });

  function onToggleLayer(id: string) {
    setSelectedLayers((s) => {
      const next = s.includes(id) ? s.filter((i) => i !== id) : [...s, id];
      localStorage.setItem("terra:layers", JSON.stringify(next));
      return next;
    });
  }

  function onToggleAnimate() {
    setAutoRotate((s) => {
      const next = !s;
      localStorage.setItem("terra:autoRotate", JSON.stringify(next));
      return next;
    });
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(1200px_600px_at_50%_-200px,rgba(57,208,193,0.15),transparent),linear-gradient(180deg,hsl(var(--background)),#060b17)] text-foreground">
      <main className="mx-auto max-w-7xl px-4 py-6 md:py-10">
        <div className="mb-6 flex flex-col items-start justify-between gap-3 md:mb-8 md:flex-row md:items-center">
          <div>
            <h1 className="font-display text-3xl tracking-wide md:text-4xl">
              Terra Data Explorer
            </h1>
            <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
              Explore near-real-time global observations from NASA’s Terra satellite—visualize layers, analyze trends, and download data.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="rounded-full border border-primary/40 bg-primary/20 px-3 py-1 text-xs text-primary">Cloud Cover</span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-foreground/70">AMSR / MODIS</span>
          </div>
        </div>

        <section className="grid grid-cols-1 items-start gap-4 md:grid-cols-[auto,1fr,auto] lg:gap-6">
          <LeftPanel selected={selectedLayers} onToggleLayer={onToggleLayer} onToggleAnimate={onToggleAnimate} />

          <div className="relative order-first rounded-2xl border border-white/10 bg-[radial-gradient(800px_400px_at_50%_-100px,rgba(57,208,193,0.08),transparent)] p-2 md:order-none md:p-4">
            <div className="absolute inset-0 -z-10 rounded-2xl bg-[url('https://cdn.builder.io/api/v1/image/assets%2Fc89b2bcccff34daeac7e499342800fef%2F82d7d9f733b44b269c364136c5db28b5?format=webp&width=1600')] bg-cover bg-center opacity-12" />
            <Globe autoRotate={autoRotate} layers={selectedLayers} />
            <div className="pointer-events-none absolute inset-x-0 bottom-2 flex justify-center">
              <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-muted-foreground">
                Auto-rotate: {autoRotate ? "On" : "Off"}
              </div>
            </div>
          </div>

          <RightPanel />
        </section>
      </main>
    </div>
  );
}
