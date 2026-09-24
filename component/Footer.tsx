// components/Footer.tsx
// Server component — fetches live exhibitor data for the footer list.

import Link from "next/link";
// import { Linkedin, Twitter, Youtube, Github } from "react-icons";
import { getExhibitors } from "@/lib/exhibitor";
import { FaLinkedin } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa6";

export default async function Footer() {
  const exhibitors = await getExhibitors();
  const featured = exhibitors.slice(0, 5);

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
            <li><Link href="/products" className="hover:text-white">Products</Link></li>
            <li><Link href="/about" className="hover:text-white">About</Link></li>
            <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
          </ul>
        </div>

        {/* Live Exhibitors */}
        <div>
          <h3 className="text-sm font-semibold text-white">
            Live Exhibitors{" "}
            <span className="text-slate-500">({exhibitors.length})</span>
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            {featured.map((exhibitor) => (
              <li key={exhibitor.id}>
                <Link
                  href={`/exhibitors/${exhibitor.id}`}
                  className="hover:text-white"
                >
                  {exhibitor.name}
                </Link>
              </li>
            ))}
          </ul>
          {exhibitors.length > featured.length && (
            <Link
              href="/exhibitors"
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