// components/ExhibitorTicker.tsx
// Server component — fetches live exhibitor data on each request/ISR cycle
// and renders a thin strip above the main nav.

import { getExhibitors } from "@/lib/exhibitor";


export default async function ExhibitorTicker() {
  const exhibitors = await getExhibitors();

  // Duplicate the list so the CSS marquee loops seamlessly.
  const loop = [...exhibitors, ...exhibitors];

  return (
    <div className="w-full overflow-hidden border-b border-white/10 bg-[#06101f] py-2">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-6 lg:px-8">
        <span className="shrink-0 whitespace-nowrap text-xs font-semibold text-blue-400">
          {exhibitors.length} Exhibitors Live
        </span>

        <div className="relative flex-1 overflow-hidden">
          <div className="flex w-max animate-[exhibitor-scroll_30s_linear_infinite] gap-8">
            {loop.map((exhibitor, idx) => (
              <span
                key={`${exhibitor.id}-${idx}`}
                className="whitespace-nowrap text-xs font-medium text-slate-400"
              >
                {exhibitor.name}
                {exhibitor.boothNumber ? ` · Booth ${exhibitor.boothNumber}` : ""}
              </span>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes exhibitor-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}