/** Dekoratif çizgi yaprak dalı. Referanstaki ince turkuaz botanik
    detayının kod karşılığı; ayrı bir görsel dosyası yüklenmez. */

const LEAF = "M0 0C11-13 32-15 46 0 32 15 11 13 0 0Z";
const RIB = "M4 0H42";

/** Sapa değme noktası, açı (derece) ve ölçek. */
const LEAVES: [number, number, number, number][] = [
  [34, 196, -54, 0.82],
  [34, 196, -150, 0.66],
  [52, 156, -46, 0.94],
  [52, 156, -144, 0.74],
  [74, 116, -40, 1],
  [74, 116, -138, 0.78],
  [100, 76, -34, 0.92],
  [100, 76, -132, 0.7],
  [128, 42, -30, 0.82],
  [150, 16, -26, 0.66],
];

export function LeafSprig({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 190 240"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20 236C40 180 62 120 96 70 118 38 140 20 164 10" />
      {LEAVES.map(([x, y, angle, scale]) => (
        <g
          key={`${x}-${y}-${angle}`}
          transform={`translate(${x} ${y}) rotate(${angle}) scale(${scale})`}
        >
          <path d={LEAF} />
          <path d={RIB} />
        </g>
      ))}
    </svg>
  );
}
