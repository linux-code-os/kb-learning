import { cn } from "@/lib/utils";

/**
 * Текстовый бренд (без SVG-логотипа).
 * Используется в header и footer.
 */
export function BrandLogo({
  className,
  withText = true,
}: {
  className?: string;
  withText?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-lg px-2 py-1 font-bold tracking-tight",
        className,
      )}
    >
      <span className="text-gradient-brand text-base">KB Learning</span>
      {withText && (
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
          learn crypto
        </span>
      )}
    </span>
  );
}
