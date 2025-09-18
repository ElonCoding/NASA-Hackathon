import { useEffect, useState } from "react";
import Globe from "../components/terra/Globe";

export default function Dashboard() {
  const [user, setUser] = useState<string | null>(null);
  const [prefs, setPrefs] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("terra:prefs") || "null") || {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    const name = localStorage.getItem("terra:user");
    if (name) setUser(name);
  }, []);

  const savePrefs = (next: any) => {
    const merged = { ...prefs, ...next };
    setPrefs(merged);
    localStorage.setItem("terra:prefs", JSON.stringify(merged));
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <h2 className="font-display text-2xl mb-2">Welcome back{user ? `, ${user}` : ""}.</h2>
      <p className="text-muted-foreground mb-6">This is your personalized dashboard prototype. Your preferences are saved locally.</p>

      <section className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="text-sm text-muted-foreground">Profile</div>
          <div className="mt-3">
            <div className="text-xs text-muted-foreground">Name</div>
            <div className="font-semibold">{user || "Guest"}</div>
          </div>
          <div className="mt-4">
            <button
              onClick={() => {
                const n = window.prompt("Enter your name:");
                if (n) {
                  localStorage.setItem("terra:user", n);
                  setUser(n);
                }
              }}
              className="rounded-lg border border-primary/40 bg-primary/10 px-3 py-2 text-sm text-primary"
            >
              Edit Profile
            </button>
          </div>
        </div>

        <div className="col-span-1 md:col-span-2 rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="text-sm text-muted-foreground">Quick Globe</div>
          <div className="mt-3">
            <Globe autoRotate={true} />
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="text-sm text-muted-foreground">Preferences</div>
          <div className="mt-3 space-y-2">
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={!!prefs.showClouds} onChange={(e) => savePrefs({ showClouds: e.target.checked })} />
              <span className="text-sm">Show cloud overlay</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={!!prefs.autoRotate} onChange={(e) => savePrefs({ autoRotate: e.target.checked })} />
              <span className="text-sm">Auto-rotate globe</span>
            </label>
          </div>
        </div>
      </section>
    </div>
  );
}
