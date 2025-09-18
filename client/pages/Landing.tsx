import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Rocket from "../components/animation/Rocket";

export default function Landing() {
  const navigate = useNavigate();
  const [launching, setLaunching] = useState(false);

  function handleStart() {
    setLaunching(true);
    // duration should match CSS animation (3500ms)
    setTimeout(() => {
      navigate("/explore");
    }, 3600);
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-neutral-900 text-white flex flex-col justify-center items-center">
      <div className="absolute bg-cover bg-center" style={{ backgroundImage: `url('https://cdn.builder.io/api/v1/image/assets%2Fc89b2bcccff34daeac7e499342800fef%2F3e31cf1789d041498125515b5b796a5b?format=webp&width=1600')`, bottom: "0px", left: "8927px", position: "absolute", right: "0px", top: "11299px" }} />

      <div className="absolute bg-gradient-to-b from-black/30 via-black/40 to-black/80" style={{ bottom: "0px", left: "344px", position: "absolute", right: "0px", top: "887px" }} />

      <header className="relative z-10">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-primary/90 shadow-[0_0_20px_rgba(57,208,193,0.2)]" />
            <div className="text-sm font-semibold">NASA <span className="text-primary">TERRA</span></div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => navigate('/explore')} className="text-sm text-muted-foreground hover:text-white">Explore</button>
            <button onClick={() => navigate('/dashboard')} className="rounded-full bg-white/5 px-3 py-1 text-xs">Dashboard</button>
          </div>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-5xl px-6 py-28 text-center">
        <h1 className="font-display text-4xl md:text-5xl text-cyan-400 tracking-tight">Terra: Uneviling Earth's Interncanected Systems</h1>
        <p className="mt-4 text-sm md:text-base text-muted-foreground max-w-3xl mx-auto">Monitoring our atmosphere — Earth's vital signs with unparalleled precision for over decades.</p>

        <div className="mt-8 flex justify-center gap-4">
          <button onClick={handleStart} className="rounded-md bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg hover:brightness-105 disabled:opacity-60">
            Start Exploring
          </button>
          <button onClick={() => navigate('/dashboard')} className="rounded-md border border-white/20 bg-white/5 px-6 py-3 text-sm text-white">
            Learn About the Mission
          </button>
        </div>

        <div className="mt-12">
          <p className="text-sm text-muted-foreground">Scroll to Discover More</p>
        </div>
      </main>

      {/* Rocket absolute container */}
      <div className="pointer-events-none absolute inset-0 z-20 flex items-end justify-center pb-20">
        <Rocket launching={launching} />
      </div>
    </div>
  );
}
