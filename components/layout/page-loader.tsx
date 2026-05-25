import { cn } from "@/lib/utils";

interface PageLoaderProps {
  label?: string;
  className?: string;
  variant?: "page" | "fullscreen" | "compact";
}

export function PageLoader({
  label = "Chargement en cours...",
  className,
  variant = "page",
}: PageLoaderProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      className={cn(
        "flex flex-col items-center justify-center gap-5",
        variant === "fullscreen" && "fixed inset-0 z-[100] bg-background/95 backdrop-blur-sm",
        variant === "page" && "min-h-[50vh] w-full py-16",
        variant === "compact" && "py-12",
        className
      )}
    >
      <div className="relative flex h-16 w-16 items-center justify-center">
        <span className="absolute inset-0 rounded-full bg-gradient-to-tr from-orange-500/20 via-amber-500/30 to-yellow-500/20 animate-ping" />
        <span className="absolute inset-1 rounded-full border-2 border-primary/20" />
        <span className="absolute inset-1 rounded-full border-2 border-transparent border-t-primary border-r-amber-500 animate-spin" />
        <span className="relative h-3 w-3 rounded-full bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 shadow-glow" />
      </div>

      <div className="flex flex-col items-center gap-2 text-center px-4">
        <p className="text-sm font-medium text-foreground">{label}</p>
        <div className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]" />
          <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-bounce [animation-delay:-0.15s]" />
          <span className="h-1.5 w-1.5 rounded-full bg-yellow-500 animate-bounce" />
        </div>
      </div>
    </div>
  );
}
