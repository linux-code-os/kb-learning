/**
 * Тонкий декоративный разделитель между секциями.
 * Градиентная линия с точкой-акцентом в центре.
 */
export function SectionDivider({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div
      className={`pointer-events-none mx-auto flex max-w-3xl items-center justify-center gap-3 ${className}`}
      aria-hidden="true"
    >
      <span className="h-px flex-1 bg-gradient-to-r from-transparent to-border/60" />
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500/40" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
      </span>
      <span className="h-px flex-1 bg-gradient-to-l from-transparent to-border/60" />
    </div>
  );
}
