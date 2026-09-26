import Link from "next/link";
import { getExhibitorLocations } from "@/lib/exhibitor";
import { FaLinkedin } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa6";

export default async function Footer() {
  const exhibitors = await getExhibitorLocations();
  const featured = exhibitors.slice(0, 7);

  return (
    <footer className="bg-[#0a1428] pt-16 text-slate-300">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 pb-12 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-blue-500">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
              <path d="M8 12a4 4 0 0 1 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M16 12a4 4 0 0 1-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <span className="text-lg font-semibold text-white">Hubble</span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-400">
            Empowering businesses with reliable IoT connectivity, intelligent
            management and data-driven insights.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-sm font-semibold text-white">Quick Links</h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link href="/" className="hover:text-white">Home</Link></li>
            <li><Link href="#products" className="hover:text-white">Products</Link></li>
            <li><Link href="#about" className="hover:text-white">About</Link></li>
            <li><Link href="#contact" className="hover:text-white">Contact</Link></li>
          </ul>
        </div>

        {/* Live Exhibitors */}
        <div>
          <h3 className="text-sm font-semibold text-white">
            Live Exhibitors{" "}
            <span className="text-slate-500">({exhibitors.length})</span>
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            {featured.map((exhibitor) => {
              const location = [
                exhibitor.hall_no && `Hall ${exhibitor.hall_no}`,
                exhibitor.booth_no && `Booth ${exhibitor.booth_no}`,
              ]
                .filter(Boolean)
                .join(" · ");

              return (
                <li key={exhibitor.location_id ?? exhibitor.exhibitor_id}>
                  <Link
                    href={`/exhibitors/${exhibitor.exhibitor_id}`}
                    className="flex items-baseline justify-between gap-2 hover:text-white"
                  >
                    <span className="truncate">{exhibitor.exhibitor_name}</span>
                    {location && (
                      <span className="shrink-0 text-xs text-slate-500">{location}</span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
          {exhibitors.length > featured.length && (
            <Link
              href="#"
              className="mt-3 inline-block text-sm font-medium text-blue-400 hover:text-blue-300"
            >
              View all {exhibitors.length} →
            </Link>
          )}
        </div>

        {/* Social */}
        <div>
          <h3 className="text-sm font-semibold text-white">Follow Us</h3>
          <div className="mt-4 flex gap-3">
            {[FaLinkedin, FaSquareXTwitter, FaYoutube, FaGithub].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 px-6 py-6 text-xs text-slate-500 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 sm:flex-row">
          <span>© 2025 Hubble. All rights reserved.</span>
          <span>Powered by Cavil Wireless</span>
        </div>
      </div>
    </footer>
  );
}