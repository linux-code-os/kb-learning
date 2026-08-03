import { cn } from "@/lib/utils";

export function BrandLogo({
  className,
  withText = true,
}: {
  className?: string;
  withText?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span className="relative inline-flex h-9 w-9 items-center justify-center">
        <svg
          viewBox="0 0 64 64"
          className="h-9 w-9"
          aria-hidden="true"
          fill="none"
        >
          <defs>
            <linearGradient
              id="kb-logo-grad"
              x1="0"
              y1="0"
              x2="64"
              y2="64"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#10b981" />
              <stop offset="1" stopColor="#f59e0b" />
            </linearGradient>
          </defs>
          <rect width="64" height="64" rx="16" fill="#0a0f0d" />
          <path
            d="M20 16h14a10 10 0 0 1 4 19.2L42 48H33l-4-11h-1v11h-8V16zm8 7v8h5a4 4 0 0 0 0-8h-5z"
            fill="url(#kb-logo-grad)"
          />
          <circle cx="48" cy="18" r="3" fill="#f59e0b" />
        </svg>
        <span className="absolute inset-0 -z-10 rounded-2xl bg-emerald-500/20 blur-md" />
      </span>
      {withText && (
        <span className="flex flex-col leading-none">
          <span className="text-base font-bold tracking-tight">
            KB Learning
          </span>
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
            crypto ecosystem
          </span>
        </span>
      )}
    </span>
  );
}
