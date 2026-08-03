"use client";

/**
 * Мини-график спарклайн для отображения истории цены.
 * Рисует SVG-path по массиву значений, подсвечивает up/down цветом.
 */
export function Sparkline({
  data,
  width = 80,
  height = 28,
  positive,
  strokeWidth = 1.5,
}: {
  data: number[];
  width?: number;
  height?: number;
  positive?: boolean;
  strokeWidth?: number;
}) {
  if (data.length < 2) {
    return (
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        aria-hidden="true"
      >
        <line
          x1="0"
          y1={height / 2}
          x2={width}
          y2={height / 2}
          stroke="currentColor"
          strokeOpacity="0.2"
          strokeWidth={strokeWidth}
        />
      </svg>
    );
  }

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const step = width / (data.length - 1);

  const points = data.map((v, i) => {
    const x = i * step;
    const y = height - ((v - min) / range) * (height - 4) - 2;
    return [x, y] as const;
  });

  const linePath = points
    .map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(2)} ${y.toFixed(2)}`)
    .join(" ");

  const areaPath = `${linePath} L${width} ${height} L0 ${height} Z`;

  const gradId = `spark-${positive ? "up" : "down"}-${Math.random().toString(36).slice(2, 8)}`;
  const color = positive ? "#10b981" : "#f43f5e";
  const colorSoft = positive ? "#10b981" : "#f43f5e";

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className="overflow-visible"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={colorSoft} stopOpacity="0.35" />
          <stop offset="100%" stopColor={colorSoft} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaPath} fill={`url(#${gradId})`} />
      <path
        d={linePath}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx={points[points.length - 1][0]}
        cy={points[points.length - 1][1]}
        r={1.8}
        fill={color}
      />
    </svg>
  );
}
