"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { Bell, CalendarX, ShieldCheck } from "lucide-react";

export const VillageNotices = () => {
  const { t } = useLanguage();

  return (
    <section className="w-full bg-surface-container-lowest py-10 sm:py-14 border-b border-surface-container">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-wider mb-1">
              <Bell className="w-4 h-4 text-primary" />
              <span>{t.notices.tag}</span>
            </div>
            <h2 className="font-headline text-2xl sm:text-3xl text-on-surface font-bold">
              {t.notices.title}
            </h2>
            <p className="text-xs sm:text-sm text-on-surface-variant mt-1">
              {t.notices.subtitle}
            </p>
          </div>
          <div className="px-3 py-1.5 rounded bg-surface-container text-on-surface-variant text-xs flex items-center gap-2 border border-surface-container-high">
            <ShieldCheck className="w-4 h-4 text-primary" />
            <span>Official Bulletin Live Channel</span>
          </div>
        </div>

        {/* State: No verified live notices published today */}
        <div className="p-6 rounded-xl bg-surface-container-low shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 border border-surface-container">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-primary flex-shrink-0">
              <CalendarX className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-headline text-base sm:text-lg text-on-surface font-bold">
                {t.notices.noNotices}
              </h3>
              <p className="text-xs sm:text-sm text-on-surface-variant mt-1 leading-relaxed">
                {t.notices.noNoticesDesc}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <Link
              href="/news"
              className="px-4 py-2 bg-surface-container-high text-primary rounded text-xs font-semibold hover:bg-surface-container-highest transition-colors shadow-sm"
            >
              {t.notices.archiveBtn}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
