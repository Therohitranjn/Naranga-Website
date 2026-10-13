"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { HeartPulse, PhoneCall, Stethoscope, Pill, Building } from "lucide-react";

export const HealthcarePreview = () => {
  const { t } = useLanguage();

  return (
    <section className="w-full bg-surface py-10 sm:py-14 border-b border-surface-container">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-wider mb-1">
            <HeartPulse className="w-4 h-4 text-primary" />
            <span>{t.health.tag}</span>
          </div>
          <h2 className="font-headline text-2xl sm:text-3xl text-on-surface font-bold">
            {t.health.title}
          </h2>
          <div className="mt-2 p-3 bg-surface-container-low rounded-lg text-xs text-on-surface-variant leading-relaxed border border-surface-container">
            <strong>प्रशासनिक संदर्भ: </strong>
            {t.health.disclaimer}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Emergency Ambulance 108/102 */}
          <div className="p-4 rounded-xl bg-error-container text-on-error-container shadow-sm flex flex-col justify-between border border-error/20">
            <div>
              <div className="flex items-center justify-between mb-2">
                <PhoneCall className="w-6 h-6 text-error" />
                <span className="px-2 py-0.5 rounded bg-error text-on-error text-[11px] font-bold">
                  24x7 निःशुल्क
                </span>
              </div>
              <h3 className="font-headline text-base sm:text-lg font-bold">
                {t.health.ambulanceTitle}
              </h3>
              <p className="text-xs mt-2 opacity-90 leading-relaxed">
                {t.health.ambulanceDesc}
              </p>
            </div>
            <div className="pt-4 mt-2">
              <a
                href="tel:108"
                className="inline-flex items-center gap-2 px-3 py-2 bg-error text-on-error rounded text-xs font-bold shadow-sm hover:opacity-90 transition-opacity"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>डायल 108 / 102</span>
              </a>
            </div>
          </div>

          {/* Health Sub-Centre */}
          <div className="p-4 rounded-xl bg-surface-container-low shadow-sm flex flex-col justify-between border border-surface-container">
            <div>
              <Stethoscope className="w-6 h-6 text-primary mb-2" />
              <h3 className="font-headline text-base text-on-surface font-bold">
                {t.health.subCentreTitle}
              </h3>
              <p className="text-[11px] text-secondary mb-2">Primary Sub-Centre</p>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                {t.health.subCentreDesc}
              </p>
            </div>
            <div className="pt-4 border-t border-surface-container mt-2">
              <span className="text-[11px] text-outline">Awaiting Live Duty Roster</span>
            </div>
          </div>

          {/* Local Medical Stores */}
          <div className="p-4 rounded-xl bg-surface-container-low shadow-sm flex flex-col justify-between border border-surface-container">
            <div>
              <Pill className="w-6 h-6 text-primary mb-2" />
              <h3 className="font-headline text-base text-on-surface font-bold">
                {t.health.pharmacyTitle}
              </h3>
              <p className="text-[11px] text-secondary mb-2">Naranga Bazaar Pharmacies</p>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                {t.health.pharmacyDesc}
              </p>
            </div>
            <div className="pt-4 border-t border-surface-container mt-2">
              <Link href="/services" className="text-[11px] text-primary font-bold hover:underline">
                View Stores Directory →
              </Link>
            </div>
          </div>

          {/* Referral Hospital */}
          <div className="p-4 rounded-xl bg-surface-container-low shadow-sm flex flex-col justify-between border border-surface-container">
            <div>
              <Building className="w-6 h-6 text-primary mb-2" />
              <h3 className="font-headline text-base text-on-surface font-bold">
                {t.health.referralTitle}
              </h3>
              <p className="text-[11px] text-secondary mb-2">Block Referral Hospital, Parihar</p>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                {t.health.referralDesc}
              </p>
            </div>
            <div className="pt-4 border-t border-surface-container mt-2">
              <span className="text-[11px] text-outline">Approx. 7-10 km from Naranga</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
