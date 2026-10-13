"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { GraduationCap, Baby, BookOpen } from "lucide-react";

export const EducationPreview = () => {
  const { t } = useLanguage();

  return (
    <section className="w-full bg-surface-container-lowest py-10 sm:py-14 border-b border-surface-container">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-wider mb-1">
            <GraduationCap className="w-4 h-4 text-primary" />
            <span>{t.education.tag}</span>
          </div>
          <h2 className="font-headline text-2xl sm:text-3xl text-on-surface font-bold">
            {t.education.title}
          </h2>
          <div className="mt-2 p-3 bg-surface-container rounded-lg text-xs text-on-surface-variant leading-relaxed border border-surface-container-high">
            <strong>अभिलेख संदर्भ: </strong>
            {t.education.disclaimer}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Candidate Registered School */}
          <div className="p-4 rounded-xl bg-surface-container-low shadow-sm flex flex-col justify-between md:col-span-2 border border-surface-container">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="px-2 py-0.5 rounded bg-primary text-on-primary text-[11px] font-semibold">
                  {t.education.schoolCandidate}
                </span>
                <span className="text-[11px] text-secondary">शासकीय विद्यालय</span>
              </div>
              <h3 className="font-headline text-lg text-on-surface font-bold">
                {t.education.schoolName}
              </h3>
              <p className="text-xs text-on-surface-variant mt-2 leading-relaxed">
                {t.education.schoolDesc}
              </p>
            </div>
            <div className="pt-4 flex items-center justify-between border-t border-surface-container mt-3">
              <span className="text-[11px] text-outline">UDISE Code pending verification</span>
              <Link
                href="/education"
                className="px-3 py-1 bg-surface-container-high rounded text-primary text-xs font-semibold hover:bg-primary hover:text-on-primary transition-colors"
              >
                सत्यापन विवरण
              </Link>
            </div>
          </div>

          {/* Primary Schools */}
          <div className="p-4 rounded-xl bg-surface-container-low shadow-sm flex flex-col justify-between border border-surface-container">
            <div>
              <Baby className="w-6 h-6 text-primary mb-2" />
              <h3 className="font-headline text-base text-on-surface font-bold">प्राथमिक विद्यालय</h3>
              <p className="text-[11px] text-secondary mb-2">Primary Schools (Wards 1-14)</p>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                कक्षा १ से ५ तक की प्राथमिक शिक्षा इकाइयाँ एवं आंगनवाड़ी पोषण केंद्र।
              </p>
            </div>
            <div className="pt-4 border-t border-surface-container mt-3">
              <span className="text-[11px] text-outline block font-medium">
                6 Recorded in Historical File
              </span>
            </div>
          </div>

          {/* Secondary & Guidance */}
          <div className="p-4 rounded-xl bg-surface-container-low shadow-sm flex flex-col justify-between border border-surface-container">
            <div>
              <BookOpen className="w-6 h-6 text-primary mb-2" />
              <h3 className="font-headline text-base text-on-surface font-bold">माध्यमिक व उच्च शिक्षा</h3>
              <p className="text-[11px] text-secondary mb-2">Secondary & Higher Guidance</p>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                हाई स्कूल, इंटर कॉलेज (परिहार / सुरसंड मार्ग) और प्रतियोगी परीक्षा मार्गदर्शन।
              </p>
            </div>
            <div className="pt-4 border-t border-surface-container mt-3">
              <span className="text-[11px] text-outline block font-medium">
                State Board Affiliated
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
