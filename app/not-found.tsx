import Link from "next/link";
import { Home, ArrowLeft, SatelliteDish } from "lucide-react";

export default function NotFound() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0a1428] px-6">
      {/* Decorative glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[32rem] w-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/20 blur-3xl" />

      <div className="relative mx-auto max-w-lg text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
          <SatelliteDish size={28} className="text-blue-400" />
        </div>

        <p className="mt-8 text-sm font-semibold uppercase tracking-widest text-blue-400">
          Error 404
        </p>
        <h1 className="mt-3 text-6xl font-bold text-white sm:text-7xl">
         Not Found
        </h1>
        <p className="mt-4 text-base leading-relaxed text-slate-400">
          We couldn't find the page you're looking for. It may have been
          moved, renamed, or never existed in the first place.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-500"
          >
            <Home size={16} />
            Back to Home
          </Link>
         
        </div>
      </div>
    </section>
  );
}