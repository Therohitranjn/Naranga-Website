"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { Users, UserPlus, UserCheck } from "lucide-react";

export const PeoplePreview = () => {
  const { t } = useLanguage();

  return (
    <section className="w-full bg-surface-container-low py-10 sm:py-14 border-b border-surface-container">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="flex items-center justify-center gap-1.5 text-primary text-xs font-bold uppercase tracking-wider mb-2">
            <Users className="w-4 h-4 text-primary" />
            <span>{t.people.tag}</span>
          </div>
          <h2 className="font-headline text-2xl sm:text-3xl text-on-surface font-bold">
            {t.people.title}
          </h2>
          <p className="text-xs sm:text-sm text-on-surface-variant mt-2 leading-relaxed">
            {t.people.description}
          </p>
        </div>

        {/* Nomination Callout Box */}
        <div className="max-w-2xl mx-auto p-6 sm:p-8 rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col items-center text-center border border-surface-container">
          <div className="w-14 h-14 rounded-full bg-surface-container flex items-center justify-center text-primary mb-4">
            <UserCheck className="w-8 h-8" />
          </div>
          <h3 className="font-headline text-lg sm:text-xl text-on-surface font-bold">
            {t.people.nominateTitle}
          </h3>
          <p className="text-xs sm:text-sm text-on-surface-variant max-w-lg mt-2 mb-6 leading-relaxed">
            {t.people.nominateDesc}
          </p>
          <Link
            href="/contact?type=nomination"
            className="px-6 py-3 bg-primary text-on-primary text-xs sm:text-sm font-bold rounded-lg hover:bg-primary-container transition-colors inline-flex items-center gap-2 shadow-sm"
          >
            <UserPlus className="w-4 h-4" />
            <span>{t.people.nominateBtn}</span>
          </Link>
        </div>
      </div>
    </section>
  );
};
