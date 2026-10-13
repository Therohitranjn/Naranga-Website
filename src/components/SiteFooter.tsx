"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import {
  Mail,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";

export const SiteFooter = () => {
  const { locale, t } = useLanguage();
  const tf = t.footer;
  const currentYear = new Date().getFullYear();
  const [isDisclaimerExpanded, setIsDisclaimerExpanded] = useState(false);

  return (
    <footer className="w-full bg-surface-container-low border-t border-surface-container mt-12 text-on-surface">
      {/* 1. Scrolling Warning Message / Announcement Bar */}
      <div
        className="w-full bg-amber-500/10 border-b border-amber-500/25 text-amber-950 dark:text-amber-200 py-2.5 px-3 overflow-hidden relative ticker-container select-none"
        role="region"
        aria-label={locale === "hi" ? "महत्वपूर्ण सूचना पट्टी" : "Important Announcement Bar"}
      >
        <div className="max-w-7xl mx-auto flex items-center">
          <div className="hidden sm:flex items-center gap-1.5 bg-amber-500/20 text-amber-950 dark:text-amber-200 px-2.5 py-0.5 rounded-full text-[11px] font-bold flex-shrink-0 mr-3 border border-amber-500/30">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400 flex-shrink-0" />
            <span>{tf.scrollingWarningPrefix.replace("⚠️", "").trim()}</span>
          </div>

          {/* Marquee ticker track */}
          <div className="overflow-hidden flex-1 relative">
            <div className="ticker-track flex items-center">
              <span className="inline-flex items-center gap-1.5 mx-6 text-xs sm:text-sm font-medium">
                <span className="font-bold sm:hidden">{tf.scrollingWarningPrefix}</span>
                <span>{tf.scrollingWarningText}</span>
                <a
                  href={`mailto:${tf.email}`}
                  className="font-bold underline text-primary hover:text-primary-container px-1 py-0.5 rounded transition-colors focus:outline-none focus:ring-1 focus:ring-primary inline-flex items-center gap-1"
                >
                  <Mail className="w-3.5 h-3.5 inline-block" />
                  <span>{tf.email}</span>
                </a>
                <span>{tf.scrollingWarningSuffix}</span>
              </span>

              {/* Duplicate track for continuous loop */}
              <span
                className="inline-flex items-center gap-1.5 mx-6 text-xs sm:text-sm font-medium"
                aria-hidden="true"
              >
                <span className="font-bold sm:hidden">{tf.scrollingWarningPrefix}</span>
                <span>{tf.scrollingWarningText}</span>
                <a
                  href={`mailto:${tf.email}`}
                  className="font-bold underline text-primary hover:text-primary-container px-1 py-0.5 rounded transition-colors focus:outline-none focus:ring-1 focus:ring-primary inline-flex items-center gap-1"
                >
                  <Mail className="w-3.5 h-3.5 inline-block" />
                  <span>{tf.email}</span>
                </a>
                <span>{tf.scrollingWarningSuffix}</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-10 border-b border-surface-container">
          {/* Section 1: Website Branding & Overview (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <div className="font-headline text-lg sm:text-xl text-primary font-bold tracking-tight">
              {tf.title}
            </div>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              {tf.tagline}
            </p>
            <div className="pt-1">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-surface-container text-primary text-[11px] font-semibold border border-surface-container-high">
                <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                <span>{tf.panchayatCode}</span>
              </span>
            </div>
            <p className="text-[11px] text-on-surface-variant/80 pt-1">
              {locale === "hi"
                ? "प्रखंड परिहार, जिला सीतामढ़ी, बिहार 843324"
                : "Parihar Block, Sitamarhi District, Bihar 843324"}
            </p>
          </div>

          {/* Section 2: उपयोगी लिंक / Useful Links (3 cols) */}
          <div className="lg:col-span-3 space-y-2.5">
            <div className="font-headline text-sm font-bold text-on-surface">
              {tf.quickLinks}
            </div>
            <div className="grid grid-cols-2 gap-x-2 gap-y-1.5 text-xs text-on-surface-variant">
              <Link href="/" className="hover:text-primary transition-colors">
                {t.common.home}
              </Link>
              <Link href="/about" className="hover:text-primary transition-colors">
                {t.common.about}
              </Link>
              <Link href="/panchayat" className="hover:text-primary transition-colors">
                {t.common.panchayat}
              </Link>
              <Link href="/education" className="hover:text-primary transition-colors">
                {t.common.education}
              </Link>
              <Link href="/health" className="hover:text-primary transition-colors">
                {t.common.health}
              </Link>
              <Link href="/agriculture" className="hover:text-primary transition-colors">
                {t.common.agriculture}
              </Link>
              <Link href="/places-to-visit" className="hover:text-primary transition-colors">
                {t.common.places}
              </Link>
              <Link href="/schemes" className="hover:text-primary transition-colors">
                {t.common.schemes}
              </Link>
              <Link href="/services" className="hover:text-primary transition-colors">
                {t.common.services}
              </Link>
              <Link href="/news" className="hover:text-primary transition-colors">
                {t.common.news}
              </Link>
              <Link href="/contact" className="hover:text-primary transition-colors col-span-2">
                {t.common.contact}
              </Link>
            </div>
          </div>

          {/* Section 3: संपर्क करें & डेटा सुधार/हटाने के अनुरोध (3 cols) */}
          <div className="lg:col-span-3 space-y-2.5">
            <div className="font-headline text-sm font-bold text-on-surface flex items-center gap-1.5">
              <Mail className="w-4 h-4 text-primary" />
              <span>{tf.contactHeading}</span>
            </div>

            <div className="space-y-1.5 text-xs text-on-surface-variant">
              <div>
                <span className="font-semibold text-on-surface">{tf.contactEmailLabel} </span>
                <a
                  href={`mailto:${tf.email}`}
                  className="font-bold text-primary hover:underline hover:text-primary-container transition-colors break-all inline-flex items-center gap-1"
                >
                  <span>{tf.email}</span>
                  <ExternalLink className="w-3 h-3 flex-shrink-0" />
                </a>
              </div>
              <p className="text-[11px] leading-relaxed text-on-surface-variant">
                {tf.contactInvite}
              </p>

              {/* Data Correction & Removal bullet points */}
              <div className="mt-2 p-2.5 rounded-xl bg-surface-container text-[11px] space-y-1 border border-surface-container-high">
                <span className="font-bold text-on-surface block">
                  {locale === "hi" ? "सुधार एवं डेटा संशोधन अनुरोध:" : "Correction & Data Requests:"}
                </span>
                <ul className="space-y-0.5 text-on-surface-variant">
                  {tf.correctionPoints.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-1">
                      <span className="text-primary mt-0.5">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-[10px] text-tertiary font-medium pt-1 border-t border-surface-container-high">
                  * {tf.correctionNotice}
                </p>
              </div>
            </div>
          </div>

          {/* Section 4: महत्वपूर्ण सूचना एवं अस्वीकरण (3 cols) */}
          <div className="lg:col-span-3 space-y-2.5">
            <div className="font-headline text-sm font-bold text-on-surface flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>{tf.disclaimerHeading}</span>
            </div>

            <div className="space-y-2 text-xs text-on-surface-variant leading-relaxed">
              <p className="text-[11px]">
                {tf.disclaimerFullP1}
              </p>

              {/* Expandable full disclaimer content */}
              {isDisclaimerExpanded && (
                <div className="space-y-2 text-[11px] pt-1 text-on-surface-variant animate-in fade-in duration-200">
                  <p>{tf.disclaimerFullP2}</p>
                  <p>{tf.disclaimerFullP3}</p>
                </div>
              )}

              <button
                type="button"
                onClick={() => setIsDisclaimerExpanded(!isDisclaimerExpanded)}
                className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:text-primary-container transition-colors py-1 focus:outline-none focus:underline"
              >
                <span>
                  {isDisclaimerExpanded ? tf.hideDisclaimer : tf.readFullDisclaimer}
                </span>
                {isDisclaimerExpanded ? (
                  <ChevronUp className="w-3.5 h-3.5" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Website Information */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-on-surface-variant">
          <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-3 text-center sm:text-left">
            <p className="font-semibold text-on-surface">
              © {currentYear} {tf.copyrightText}
            </p>
            <span className="hidden sm:inline text-outline">•</span>
            <p className="text-primary font-bold">
              {tf.websiteLabel}
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <Link href="/privacy" className="hover:text-primary transition-colors">
              {tf.privacy}
            </Link>
            <span className="text-outline">•</span>
            <Link href="/privacy" className="hover:text-primary transition-colors">
              {tf.terms}
            </Link>
            <span className="text-outline">•</span>
            <button
              type="button"
              onClick={() => setIsDisclaimerExpanded(true)}
              className="hover:text-primary transition-colors underline cursor-pointer text-left"
            >
              {tf.disclaimer}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
