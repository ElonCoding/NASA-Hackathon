import { Search, Bell, User } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const nav = [
  { label: "Home", href: "/" },
  { label: "Data Explorer", href: "/" },
  { label: "Science & Instruments", href: "/" },
  { label: "News & Updates", href: "/" },
  { label: "About Terra", href: "/" },
];

export default function SiteHeader() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    const name = localStorage.getItem("terra:user");
    if (name) setUser(name);
  }, []);

  function handleAuth() {
    if (user) {
      // sign out
      localStorage.removeItem("terra:user");
      setUser(null);
      return;
    }
    const n = window.prompt("Sign in — enter your name:");
    if (n) {
      localStorage.setItem("terra:user", n);
      setUser(n);
      navigate("/dashboard");
    }
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-[radial-gradient(1200px_600px_at_50%_-100px,rgba(23,213,197,0.08),transparent),linear-gradient(to_bottom,rgba(8,12,24,0.9),rgba(8,12,24,0.7))] backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center gap-4">
        <Link to="/" className="flex items-center gap-2 select-none">
          <span className="relative grid h-7 w-7 place-items-center">
            <span className="absolute inset-0 rounded-full bg-primary/20 blur-sm" />
            <span className="relative h-5 w-5 rounded-full bg-primary shadow-[0_0_20px_theme(colors.primary.DEFAULT/.8)]" />
          </span>
          <div className="leading-tight">
            <div className="font-display text-lg tracking-wider">NASA <span className="text-primary">TERRA</span></div>
            <div className="text-xs text-muted-foreground">Earth Observing System</div>
          </div>
        </Link>
        <nav className="hidden md:flex items-center gap-1 ml-6">
          {nav.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className={`rounded-md px-3 py-2 text-sm transition-colors hover:text-primary ${pathname===item.href?"text-primary":"text-foreground/80"}`}
            >
              {item.label}
            </Link>
          ))}
          <Link to="/dashboard" className={`rounded-md px-3 py-2 text-sm transition-colors hover:text-primary ${pathname=="/dashboard"?"text-primary":"text-foreground/80"}`}>
            Dashboard
          </Link>
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <button className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-white/10 bg-white/5 text-foreground/80 hover:text-primary hover:bg-white/10">
            <Search className="h-4 w-4" />
          </button>
          <button className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-white/10 bg-white/5 text-foreground/80 hover:text-primary hover:bg-white/10">
            <Bell className="h-4 w-4" />
          </button>
          <button onClick={handleAuth} title={user?"Sign out":"Sign in"} className="inline-flex h-9 items-center justify-center rounded-full border border-white/10 bg-white/5 px-3 text-xs text-foreground/80 hover:text-primary hover:bg-white/10">
            {user ? <span className="font-semibold">{user.charAt(0).toUpperCase()}</span> : <User className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </header>
  );
}
