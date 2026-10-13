"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { IMAGES } from "@/lib/data";
import { MapPin, Compass, Map, ShieldCheck } from "lucide-react";

export const VillageHero = () => {
  const { t } = useLanguage();

  return (
    <section className="relative w-full min-h-[580px] lg:min-h-[640px] flex items-center justify-center overflow-hidden">
      {/* Visual Background with dark agricultural green atmospheric overlay */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('${IMAGES.stitchHero}')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/75 to-primary/40 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-r from-on-surface/80 via-transparent to-on-surface/80" />
      </div>

      {/* Hero Content Body */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-36 pb-16 flex flex-col items-center text-center">
        {/* Geographic & Administrative Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-bright/15 backdrop-blur-md text-surface-bright text-xs sm:text-sm font-semibold mb-6 shadow-sm border border-surface-bright/20">
          <MapPin className="text-tertiary-fixed-dim w-4 h-4" />
          <span>{t.hero.badge}</span>
        </div>

        {/* Main Bilingual Headings */}
        <h1 className="font-headline text-3xl sm:text-5xl lg:text-6xl text-surface-bright font-extrabold max-w-4xl tracking-tight leading-tight mb-3 drop-shadow-sm">
          {t.hero.title}
        </h1>
        <p className="font-headline text-lg sm:text-2xl text-primary-fixed-dim font-medium mb-4">
          {t.hero.subtitle}
        </p>

        {/* Clear Descriptive Purpose */}
        <p className="text-sm sm:text-lg text-surface-container-low max-w-2xl mb-8 leading-relaxed font-normal">
          {t.hero.description}
        </p>

        {/* Key Action CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/about"
            className="px-6 py-3.5 rounded-lg bg-surface-bright text-primary text-xs sm:text-sm font-bold shadow-md hover:bg-surface-container transition-all flex items-center gap-2"
          >
            <Compass className="w-4 h-4 text-primary" />
            <span>{t.hero.exploreBtn}</span>
          </Link>
          <a
            href="#village-map"
            className="px-6 py-3.5 rounded-lg bg-primary-container text-surface-bright text-xs sm:text-sm font-bold hover:bg-primary transition-all flex items-center gap-2 border border-surface-bright/20"
          >
            <Map className="w-4 h-4" />
            <span>{t.hero.mapBtn}</span>
          </a>
        </div>

        {/* Photo Attribution Notice */}
        <div className="mt-12 text-surface-variant text-xs flex items-center gap-1.5 opacity-90">
          <ShieldCheck className="w-3.5 h-3.5 text-primary-fixed" />
          <span>{t.hero.photoCredit}</span>
        </div>
      </div>
    </section>
  );
};
