import { Calendar, Clock, Play, Search, Layers } from "lucide-react";

const LAYERS = [
  { id: "atmosphere", label: "Atmosphere" },
  { id: "clouds", label: "Cloud Cover" },
  { id: "land", label: "Land" },
  { id: "cryosphere", label: "Cryosphere" },
  { id: "vegetation", label: "Vegetation" },
];

type Props = {
  selected: string[];
  onToggleLayer: (id: string) => void;
  onToggleAnimate: () => void;
};

export default function LeftPanel({ selected, onToggleLayer, onToggleAnimate }: Props) {
  return (
    <aside className="w-full md:w-80 lg:w-96 space-y-4">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
        <div className="mb-3 flex items-center gap-2 text-sm text-muted-foreground">
          <Layers className="h-4 w-4" />
          DATA LAYERS
        </div>
        <div className="space-y-2">
          {LAYERS.map((l) => (
            <label key={l.id} className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm hover:border-primary/40">
              <span className="text-foreground/90">{l.label}</span>
              <input
                type="checkbox"
                checked={selected.includes(l.id)}
                onChange={() => onToggleLayer(l.id)}
                className="h-4 w-4 accent-[hsl(var(--primary))]"
              />
            </label>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
        <div className="mb-3 flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          TIME SELECTOR
        </div>
        <div className="flex items-center gap-2">
          <button className="flex-1 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-foreground/80 hover:bg-white/10">
            Last 7 Days
          </button>
          <button
            onClick={onToggleAnimate}
            className="inline-flex items-center gap-2 rounded-lg border border-primary/40 bg-primary/20 px-3 py-2 text-sm text-primary hover:bg-primary/25">
            <Play className="h-4 w-4" />
            Animate
          </button>
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
        <div className="mb-3 flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          REGION SELECTOR
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            placeholder="Search"
            className="w-full rounded-lg border border-white/10 bg-white/5 py-2 pl-9 pr-3 text-sm outline-none placeholder:text-muted-foreground/80 focus:border-primary/50"
          />
        </div>
        <div className="mt-3 grid grid-cols-6 gap-2 text-center text-xs text-muted-foreground">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="aspect-square rounded-md border border-white/10 bg-white/5" />
          ))}
        </div>
      </div>
    </aside>
  );
}
