
import Link from "next/link";
import { ShieldCheck, Zap, Settings, Headphones, ArrowRight } from "lucide-react";
 
const highlights = [
  {
    icon: ShieldCheck,
    title: "Secure & Reliable",
    description: "Enterprise-grade security for your data and devices.",
  },
  {
    icon: Zap,
    title: "Scalable Infrastructure",
    description: "Grows with your business needs.",
  },
  {
    icon: Settings,
    title: "Easy Integration",
    description: "Seamless integration with your existing systems.",
  },
  {
    icon: Headphones,
    title: "Expert Support",
    description: "Get help when you need it, from our dedicated team.",
  },
];
 
export default function WhyHubble() {
  return (
    <section className="bg-[#f0f7fe] py-20 lg:py-24">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <div>
          <span className="text-sm font-semibold text-blue-600">
            Why Hubble
          </span>
          <h2 className="mt-3 text-3xl font-bold leading-tight text-black sm:text-4xl">
            Built for Performance.
            <br />
            Designed for Possibilities.
          </h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-black">
            Hubble combines reliable connectivity, intelligent management and
            powerful analytics to help businesses unlock the full potential
            of their IoT ecosystem.
          </p>
          <Link
            href="/about"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-500"
          >
            Learn More About Us
            <ArrowRight size={16} />
          </Link>
        </div>
 
        {/* Right: highlights grid */}
        <div className="grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2">
          {highlights.map(({ icon: Icon, title, description }) => (
            <div key={title} className="flex gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-100">
                <Icon size={20} className="text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-black">{title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-black">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
 
