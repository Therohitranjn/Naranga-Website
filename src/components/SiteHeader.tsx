"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { IMAGES } from "@/lib/data";
import { 
  Home,
  Info,
  Landmark,
  GraduationCap,
  Hospital,
  Sprout,
  MapPin,
  ClipboardList,
  Newspaper,
  Phone,
  Briefcase,
  Search,
  Languages,
  ShieldCheck,
  Menu,
  X,
  ChevronDown
} from "lucide-react";

export const SiteHeader = () => {
  const { locale, toggleLocale, t } = useLanguage();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close "More" dropdown when clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setMoreDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Primary navigation links with relevant Lucide icons
  const primaryNavLinks = [
    { href: "/", label: t.common.home, icon: Home },
    { href: "/about", label: t.common.about, icon: Info },
    { href: "/panchayat", label: t.common.panchayat, icon: Landmark },
    { href: "/education", label: t.common.education, icon: GraduationCap },
    { href: "/health", label: t.common.health, icon: Hospital },
    { href: "/agriculture", label: t.common.agriculture, icon: Sprout },
    { href: "/places", label: t.common.places, icon: MapPin },
    { href: "/schemes", label: t.common.schemes, icon: ClipboardList },
    { href: "/news", label: t.common.news, icon: Newspaper },
    { href: "/contact", label: t.common.contact, icon: Phone },
  ];

  // Secondary items cleanly placed under "अधिक / More" dropdown
  const secondaryNavLinks = [
    { href: "/services", label: t.common.services, icon: Briefcase },
  ];

  // All links combined for mobile navigation drawer
  const allNavLinks = [...primaryNavLinks, ...secondaryNavLinks];

  return (
    <header className="fixed top-0 w-full z-50 bg-white shadow-[0_2px_12px_rgba(0,0,0,0.06)] border-b border-[#e5e0d3]">
      <div className="flex flex-col w-full">
        {/* ROW 1: Top Brand & Utility Bar */}
        <div className="h-16 bg-white px-4 sm:px-6 lg:px-8 flex items-center justify-between border-b border-[#f0ece1]">
          {/* Prominent Village Logo & Branding (Left) */}
          <div className="flex items-center gap-3">
            <Link 
              href="/" 
              className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg py-1 px-1 transition-transform"
            >
              {/* Emblem / Village Icon Container with forest-green border & gold accent */}
              <div className="relative w-11 h-11 rounded-xl bg-surface-container-low border border-[#003629]/20 p-1 flex items-center justify-center shadow-xs group-hover:border-primary transition-colors flex-shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={IMAGES.logo}
                  alt="Naranga Village Emblem"
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    // Fallback to landmark icon if image fails
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>

              {/* Village Title & Subtitle */}
              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-1.5">
                  <span className="text-xl sm:text-2xl font-headline font-extrabold text-[#003629] leading-tight tracking-tight">
                    {t.common.siteTitle}
                  </span>
                  {/* Subtle Saffron/Gold Accent dot */}
                  <span className="w-2 h-2 rounded-full bg-[#E06D14] inline-block" title="Official Village Portal" />
                </div>
                <div className="text-xs sm:text-[13px] text-[#5f5f58] font-medium leading-none mt-0.5 flex items-center gap-1">
                  <span>{t.common.subtitle}</span>
                  <span className="text-gray-300">•</span>
                  <span className="text-[11px] text-gray-400">PIN 843324</span>
                </div>
              </div>
            </Link>
          </div>

          {/* Right Header Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Input for Desktop */}
            <div className="relative hidden xl:block">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.common.searchPlaceholder}
                className="bg-[#f8f9ff] text-[#121c2a] text-xs pl-8 pr-3 py-1.5 rounded-lg border border-[#c0c9c3] outline-none w-56 lg:w-64 focus:border-primary focus:bg-white transition-all placeholder:text-gray-400"
              />
              <Search className="absolute left-2.5 top-2 text-[#707974] w-3.5 h-3.5" />
            </div>

            {/* Language Switcher */}
            <button
              type="button"
              onClick={toggleLocale}
              className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg bg-[#eff4ff] text-[#003629] border border-[#d0dbed] hover:bg-[#dee9fc] hover:border-primary transition-all shadow-2xs"
              title="Toggle Language / भाषा बदलें"
              aria-label="Language Selector"
            >
              <Languages className="w-3.5 h-3.5 text-[#E06D14]" />
              <span className="tracking-wide">{t.common.langSwitch}</span>
            </button>

            {/* Admin Portal Link */}
            <Link
              href="/admin/login"
              className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-[#003629] text-white hover:bg-[#1b4d3e] transition-colors shadow-xs"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#ffb68c]" />
              <span className="hidden sm:inline">{t.common.adminLogin}</span>
            </Link>

            {/* Mobile Hamburger Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-[#121c2a] hover:bg-[#f0ece1] transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-[#ba1a1a]" /> : <Menu className="w-6 h-6 text-[#003629]" />}
            </button>
          </div>
        </div>

        {/* ROW 2: Main Navigation Bar with Centered Links and Icons (Desktop) */}
        <nav 
          aria-label="Main Navigation" 
          className="hidden lg:flex h-12 bg-white px-4 sm:px-6 lg:px-8 items-center justify-center border-b border-[#e5e0d3] shadow-[0_1px_3px_rgba(0,0,0,0.02)]"
        >
          <div className="flex items-center gap-1 xl:gap-2">
            {primaryNavLinks.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-[13px] font-bold rounded-lg transition-all duration-150 ${
                    isActive
                      ? "bg-[#003629] text-white shadow-xs"
                      : "text-[#27313f] hover:bg-[#f2f7f4] hover:text-[#003629]"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-[#ffb68c]" : "text-[#1b4d3e]"}`} />
                  <span className="whitespace-nowrap tracking-normal">{item.label}</span>
                </Link>
              );
            })}

            {/* "अधिक / More" Dropdown for additional routes */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
                className={`flex items-center gap-1 px-2.5 py-1.5 text-[13px] font-bold rounded-lg transition-all ${
                  moreDropdownOpen || secondaryNavLinks.some((l) => pathname === l.href)
                    ? "bg-[#f2f7f4] text-[#003629]"
                    : "text-[#27313f] hover:bg-[#f2f7f4] hover:text-[#003629]"
                }`}
                aria-expanded={moreDropdownOpen}
              >
                <span>{t.common.more || (locale === "hi" ? "अधिक" : "More")}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${moreDropdownOpen ? "rotate-180" : ""}`} />
              </button>

              {moreDropdownOpen && (
                <div className="absolute right-0 mt-1 w-48 bg-white rounded-xl shadow-lg border border-[#e5e0d3] py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                  {secondaryNavLinks.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMoreDropdownOpen(false)}
                        className={`flex items-center gap-2 px-3 py-2 text-xs font-bold transition-colors ${
                          isActive
                            ? "bg-[#003629] text-white"
                            : "text-[#27313f] hover:bg-[#f2f7f4] hover:text-[#003629]"
                        }`}
                      >
                        <Icon className={`w-4 h-4 ${isActive ? "text-[#ffb68c]" : "text-[#1b4d3e]"}`} />
                        <span>{item.label}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </nav>

        {/* Mobile Dropdown Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-[#e5e0d3] px-4 py-4 shadow-xl max-h-[80vh] overflow-y-auto animate-in slide-in-from-top duration-200">
            {/* Search Input for Mobile */}
            <div className="mb-3">
              <div className="relative">
                <input
                  type="text"
                  placeholder={t.common.searchPlaceholder}
                  className="w-full bg-[#f8f9ff] text-[#121c2a] text-xs pl-8 pr-3 py-2 rounded-lg border border-[#c0c9c3] outline-none focus:border-primary"
                />
                <Search className="absolute left-2.5 top-2.5 text-[#707974] w-3.5 h-3.5" />
              </div>
            </div>

            {/* Navigation Links with Icons */}
            <div className="flex flex-col gap-1">
              {allNavLinks.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-2.5 px-3 py-2.5 text-xs font-bold rounded-lg transition-colors ${
                      isActive
                        ? "bg-[#003629] text-white shadow-xs"
                        : "text-[#121c2a] hover:bg-[#f2f7f4] hover:text-[#003629]"
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? "text-[#ffb68c]" : "text-[#003629]"}`} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}

              {/* Mobile Language Switcher */}
              <button
                type="button"
                onClick={() => {
                  toggleLocale();
                  setMobileMenuOpen(false);
                }}
                className="mt-2 px-3 py-2.5 text-xs font-bold rounded-lg bg-[#eff4ff] text-[#003629] border border-[#d0dbed] flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <Languages className="w-4 h-4 text-[#E06D14]" />
                  <span>{locale === "hi" ? "भाषा बदलें" : "Change Language"}</span>
                </div>
                <span className="bg-white px-2 py-0.5 rounded text-[11px] font-extrabold shadow-2xs">
                  {t.common.langSwitch}
                </span>
              </button>

              {/* Mobile Admin Link */}
              <Link
                href="/admin/login"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-1 px-3 py-2.5 text-xs font-bold rounded-lg bg-[#003629] text-white flex items-center gap-2 shadow-xs"
              >
                <ShieldCheck className="w-4 h-4 text-[#ffb68c]" />
                <span>{t.common.adminLogin}</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
