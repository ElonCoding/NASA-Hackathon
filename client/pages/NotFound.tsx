import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-5xl font-display tracking-wider mb-2 text-primary">404</h1>
        <p className="text-sm text-muted-foreground mb-6">Oops! Page not found</p>
        <a href="/" className="inline-flex items-center justify-center rounded-lg border border-primary/40 bg-primary/20 px-4 py-2 text-sm text-primary hover:bg-primary/25">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
