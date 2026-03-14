import { Button } from "@/components/ui/button";
import { useLocation } from "@tanstack/react-router";
import { ArrowLeft, Home } from "lucide-react";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-background overflow-hidden noise-bg">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/5 blur-[120px] animate-glow-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-accent/5 blur-[100px] animate-glow-pulse" style={{ animationDelay: "1.5s" }} />
      
      {/* Dot pattern */}
      <div className="absolute inset-0 dot-pattern opacity-30" />

      <div className="relative z-10 text-center px-6 max-w-lg">
        {/* Large 404 number */}
        <h1 className="text-[10rem] sm:text-[12rem] font-extrabold leading-none gradient-text select-none tracking-tighter">
          404
        </h1>

        {/* Glowing divider */}
        <div className="mx-auto mb-8 h-px w-32 bg-gradient-to-r from-transparent via-primary to-transparent" />

        <p className="text-2xl font-semibold text-foreground mb-3">
          Page not found
        </p>
        <p className="text-muted-foreground mb-10 text-balance">
          The page <span className="font-mono text-sm text-primary/80 bg-primary/10 px-2 py-0.5 rounded">{location.pathname}</span> doesn't exist or has been moved.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button asChild size="lg">
            <a href="/">
              <Home className="mr-2 h-4 w-4" />
              Back to Home
            </a>
          </Button>
          <Button asChild variant="outline" size="lg" onClick={() => window.history.back()}>
            <button type="button" onClick={() => window.history.back()}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </button>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
