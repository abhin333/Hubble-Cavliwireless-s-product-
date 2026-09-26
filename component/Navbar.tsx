"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { Menu, X, Users, Globe, ChevronDown, Database, ArrowRight, Building2, MapPin } from "lucide-react";
import Image from "next/image";

interface Exhibitor {
  id?: number | string;
  name: string;
  country?: string;
  hall_no?: string;
  booth_no?: string;
}
const count = process.env.NEXT_PUBLIC_API_EXHIBITOR_LIMIT;
const navLinks = [
  { label: "Home", href: "/" },
  { label: "Products", href: "#products" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [stats, setStats] = useState({ total_exhibitors: 0, total_countries: 0 });
  const [exhibitorsList, setExhibitorsList] = useState<Exhibitor[]>([]);
  const [loading, setLoading] = useState(true);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fetch live stats & dynamic exhibitor list (with hall/booth) from FastAPI
  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch stats count
        const statsRes = await fetch("/api/live-stats");
        if (statsRes.ok) {
          const statsData = await statsRes.json();
          setStats(statsData);
        }

        
        const exhibitorsRes = await fetch(`/api/exhibitor-locations?limit=${count}`);
        if (exhibitorsRes.ok) {
          const exhibitorsData = await exhibitorsRes.json();
          const rows = Array.isArray(exhibitorsData)
            ? exhibitorsData
            : exhibitorsData.results ?? exhibitorsData.data ?? [];

       
          const normalized: Exhibitor[] = rows.map((row: any) => ({
            id: row.exhibitor_id ?? row.id,
            name: row.exhibitor_name ?? row.name,
            country: row.country,
            hall_no: row.hall_no,
            booth_no: row.booth_no,
          }));

          setExhibitorsList(normalized);
        }
      } catch (error) {
        console.error("Failed to load navbar data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0a1428]">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">

        <Link href="/" className="flex shrink-0 items-center gap-2">
          <Image
            src="/src/assets/hubble-logo.png"
            alt="Hubble Logo"
            width={120}
            height={120}
            className="text-blue-500"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-10 md:flex">
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors ${
                i === 0
                  ? "border-b-2 border-blue-500 pb-1 text-white"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Dynamic Dropdown Trigger */}
        <div className="relative hidden lg:block" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-3 border border-white/10 bg-white/5 hover:bg-white/10 px-3.5 py-1.5 text-xs rounded-full transition-all cursor-pointer"
          >
            <div className="flex items-center gap-1.5 text-slate-300">
              <Users size={14} className="text-blue-400" />
              <span>
                Exhibitors:{" "}
                <strong className="text-white">
                  {loading ? "..." : exhibitorsList.length}
                </strong>
              </span>
            </div>

            <div className="h-3 w-[1px] bg-white/20" />

            <div className="flex items-center gap-1.5 text-slate-300">
              <Globe size={14} className="text-blue-400" />
              <span>
                Countries:{" "}
                <strong className="text-white">
                  {loading ? "..." : exhibitorsList.length}
                </strong>
              </span>
            </div>

            <ChevronDown
              size={14}
              className={`text-slate-400 transition-transform duration-200 ${
                dropdownOpen ? "rotate-180 text-white" : ""
              }`}
            />
          </button>

          {/* Dynamic Data Dropdown Card */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-3 w-80 rounded-xl border border-white/10 bg-[#0d1b36] p-4 text-white shadow-2xl backdrop-blur-md">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <Database size={16} className="text-blue-400" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                    Live Database
                  </span>
                </div>
                <span className="flex items-center gap-1.5 text-[10px] font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  {stats.total_exhibitors} Total
                </span>
              </div>

              {/* Dynamic Exhibitors List */}
              <div className="mt-3 max-h-56 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
                {loading ? (
                  <p className="text-center text-xs text-slate-400 py-4">Loading dynamic data...</p>
                ) : exhibitorsList.length > 0 ? (
                  exhibitorsList.map((item, idx) => (
                    <div
                      key={item.id || idx}
                      className="flex flex-col gap-1 p-2 rounded-lg bg-white/5 border border-white/5 hover:border-blue-500/30 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 overflow-hidden">
                          <Building2 size={14} className="text-blue-400 shrink-0" />
                          <span className="text-xs font-medium text-slate-200 truncate">
                            {item.name}
                          </span>
                        </div>
                        {item.country && (
                          <span className="text-[10px] font-normal text-slate-400 bg-white/5 px-2 py-0.5 rounded border border-white/5 shrink-0 ml-2">
                            {item.country}
                          </span>
                        )}
                      </div>

                      {(item.hall_no || item.booth_no) && (
                        <div className="flex items-center gap-1.5 pl-[22px] text-[10px] text-blue-300/90">
                          <MapPin size={11} className="text-blue-400 shrink-0" />
                          <span>
                            {item.hall_no && <>Hall {item.hall_no}</>}
                            {item.hall_no && item.booth_no && " · "}
                            {item.booth_no && <>Booth {item.booth_no}</>}
                          </span>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-center text-xs text-slate-400 py-4">No records found.</p>
                )}
              </div>

              <Link
                href="https://mmiconnect.in/app/catalogue/exhibitors/ep-blr-2026?first=100"
                onClick={() => setDropdownOpen(false)}
                className="mt-3 flex items-center justify-center gap-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white py-2 text-xs font-medium transition-colors"
              >
                <span>View All Exhibitors</span>
                <ArrowRight size={12} />
              </Link>
            </div>
          )}
        </div>

        {/* Desktop CTA */}
        <Link
          href="#consult"
          className="hidden rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-500 md:inline-block"
        >
          Consult Now
        </Link>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="text-white md:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {open && (
        <div className="border-t border-white/10 px-6 pb-6 md:hidden">
          <div className="flex flex-col gap-4 pt-4">

            {/* Mobile Dynamic List Preview */}
            <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-white/10 mb-2">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-300">
                  Featured Exhibitors
                </span>
                <span className="text-[10px] text-blue-400 font-medium">
                  {stats.total_exhibitors} Live
                </span>
              </div>

              <div className="space-y-1.5 max-h-40 overflow-y-auto">
                {exhibitorsList.slice(0, 3).map((item, idx) => (
                  <div key={item.id || idx} className="flex justify-between items-center text-slate-300 text-[11px]">
                    <span className="truncate">{item.name}</span>
                    <span className="text-slate-500 text-[10px] shrink-0 ml-2">
                      {item.hall_no || item.booth_no
                        ? [item.hall_no && `Hall ${item.hall_no}`, item.booth_no && `Booth ${item.booth_no}`]
                            .filter(Boolean)
                            .join(" · ")
                        : item.country}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {navLinks.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium ${
                  i === 0 ? "text-white" : "text-slate-300"
                }`}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            <Link
              href="/consult"
              className="mt-2 rounded-full bg-blue-600 px-5 py-2.5 text-center text-sm font-semibold text-white"
              onClick={() => setOpen(false)}
            >
              Consult Now
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}