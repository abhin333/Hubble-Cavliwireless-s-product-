import {
  Wifi,
  Factory,
  MapPin,
  Smartphone,
  Truck,
  Plane,
  Router,
  Tablet,
  Cloud,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";

const orbitIcons = [
  { Icon: Factory, className: "left-[6%] top-[2%]" },
  { Icon: MapPin, className: "right-[10%] top-0" },
  { Icon: Smartphone, className: "left-[-4%] top-[32%]" },
  { Icon: Truck, className: "right-[-4%] top-[28%]" },
  { Icon: Plane, className: "left-[2%] bottom-[6%]" },
  { Icon: Tablet, className: "left-1/2 -translate-x-1/2 bottom-[-4%]" },
  { Icon: Router, className: "right-[4%] bottom-[8%]" },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#0a1428]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(37,99,235,0.25),transparent_60%)]" />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 py-20 lg:grid-cols-2 lg:px-8 lg:py-28">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-medium text-slate-200">
            <Wifi size={14} className="text-blue-400" />
            IoT Connectivity Platform
          </span>

          <h1 className="mt-6 text-4xl font-bold leading-tight text-white sm:text-5xl">
            Connect. Manage. Scale.
            <br />
            Your <span className="text-cyan-400">IoT Ecosystem.</span>
          </h1>

          <p className="mt-6 max-w-lg text-base leading-relaxed text-slate-300">
            Hubble simplifies IoT connectivity and device management, helping
            businesses connect, monitor and manage their devices from a single
            powerful platform.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#products"
              className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-500"
            >
              Explore Products
              <ArrowRight size={16} />
            </a>
            <a
              href="#consult"
              className="inline-flex items-center rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              Consult Now
            </a>
          </div>
        </div>

        <div className="relative mx-auto aspect-square w-full max-w-md">
          <div className="relative h-full w-full">
            <Image
              src="/src/assets/hubbl.png"
              alt="Hubble Cloud"
              className="h-full w-full object-contain"
              width={1000}
              height={1000}
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
