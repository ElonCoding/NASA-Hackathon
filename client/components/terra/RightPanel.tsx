import { LineChart, Line, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";
import { Download } from "lucide-react";

function downloadCSV(data: { t: string; v: number }[], filename = "terra-data.csv") {
  const header = "time,value\n";
  const rows = data.map((d) => `${d.t},${d.v}`).join("\n");
  const csv = header + rows;
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export default function RightPanel({ layer = "clouds" }: { layer?: string }) {
  const data = Array.from({ length: 24 }).map((_, i) => ({
    t: `${i}:00`,
    v: Math.round(40 + Math.sin(i / 3) * 25 + (Math.random() - 0.5) * 8),
  }));

  const current = data[data.length - 1].v;
  const avg = Math.round(data.reduce((a, b) => a + b.v, 0) / data.length);

  return (
    <aside className="w-full md:w-80 lg:w-96 space-y-4">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
        <div className="mb-3 text-sm text-muted-foreground">DATA INSIGHTS & TOOLS</div>
        <div className="h-40">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="g" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.9} />
                  <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
              <XAxis dataKey="t" tick={{ fill: "rgba(255,255,255,0.6)", fontSize: 10 }} tickLine={false} axisLine={false} interval={3} />
              <YAxis tick={{ fill: "rgba(255,255,255,0.6)", fontSize: 10 }} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ background: "rgba(20,28,46,0.8)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, color: "white" }} />
              <Line type="monotone" dataKey="v" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-3 grid grid-cols-3 gap-3 text-center">
          <div className="rounded-lg border border-white/10 bg-white/5 p-3">
            <div className="text-xs text-muted-foreground">Current</div>
            <div className="font-semibold text-primary">{current}%</div>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/5 p-3">
            <div className="text-xs text-muted-foreground">Average</div>
            <div className="font-semibold">{avg}%</div>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/5 p-3">
            <div className="text-xs text-muted-foreground">Unit</div>
            <div className="font-semibold">%</div>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2">
          <button onClick={() => downloadCSV(data)} className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-primary/40 bg-primary/20 px-3 py-2 text-sm text-primary hover:bg-primary/25">
            <Download className="h-4 w-4" />
            Download Data
          </button>
        </div>
      </div>
    </aside>
  );
}
