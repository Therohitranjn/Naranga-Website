"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { PLACES_DATA } from "@/lib/data";
import { 
  ChevronLeft, 
  ChevronRight, 
  MapPin, 
  Landmark, 
  Church, 
  Moon, 
  GraduationCap 
} from "lucide-react";

export const PlacesCarousel = () => {
  const { locale, t } = useLanguage();
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (trackRef.current) {
      const offset = direction === "left" ? -340 : 340;
      trackRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  const getPlaceholderIcon = (iconName?: string) => {
    switch (iconName) {
      case "temple":
        return <Landmark className="w-12 h-12 text-secondary mb-2" />;
      case "church":
        return <Church className="w-12 h-12 text-secondary mb-2" />;
      case "mosque":
        return <Moon className="w-12 h-12 text-secondary mb-2" />;
      case "school":
        return <GraduationCap className="w-12 h-12 text-secondary mb-2" />;
      default:
        return <Landmark className="w-12 h-12 text-secondary mb-2" />;
    }
  };

  return (
    <section className="w-full bg-surface-container-lowest py-10 sm:py-14 border-b border-surface-container">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header and Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-wider mb-1">
              <MapPin className="w-4 h-4 text-primary" />
              <span>{t.placesCarousel.tag}</span>
            </div>
            <h2 className="font-headline text-2xl sm:text-3xl text-on-surface font-bold">
              {t.placesCarousel.title}
            </h2>
            <p className="text-xs sm:text-sm text-on-surface-variant mt-1">
              {t.placesCarousel.subtitle}
            </p>
          </div>

          {/* Carousel Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => scroll("left")}
              aria-label="Previous Slide"
              className="w-10 h-10 rounded-full bg-surface-container-high text-on-surface flex items-center justify-center hover:bg-primary hover:text-on-primary transition-colors focus:ring-2 focus:ring-primary outline-none"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              aria-label="Next Slide"
              className="w-10 h-10 rounded-full bg-surface-container-high text-on-surface flex items-center justify-center hover:bg-primary hover:text-on-primary transition-colors focus:ring-2 focus:ring-primary outline-none"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 5-Card Scrollable Track */}
        <div
          ref={trackRef}
          tabIndex={0}
          aria-label="Places Carousel"
          className="flex gap-6 overflow-x-auto scroll-smooth pb-4 no-scrollbar snap-x snap-mandatory focus:outline-none"
        >
          {PLACES_DATA.map((place, idx) => (
            <div
              key={place.id}
              className="snap-start min-w-[280px] sm:min-w-[340px] max-w-[350px] flex-shrink-0 bg-surface-container-low rounded-xl overflow-hidden shadow-sm flex flex-col justify-between border border-surface-container hover:shadow-md transition-shadow"
            >
              <div>
                {place.hasRealPhoto && place.photoUrl ? (
                  <div
                    className="relative h-48 w-full bg-cover bg-center"
                    style={{ backgroundImage: `url('${place.photoUrl}')` }}
                  >
                    <div className="absolute top-3 left-3 px-2 py-1 bg-primary/80 backdrop-blur-sm rounded text-on-primary text-[11px] font-semibold">
                      {place.badge}
                    </div>
                  </div>
                ) : (
                  <div className="relative h-48 w-full bg-surface-container-highest flex flex-col items-center justify-center p-4 text-center">
                    {getPlaceholderIcon(place.icon)}
                    <div className="px-2.5 py-1 bg-tertiary-fixed text-on-tertiary-fixed rounded text-[11px] font-semibold border border-tertiary/20">
                      {place.badge}
                    </div>
                  </div>
                )}

                <div className="p-4">
                  <div className="text-[11px] font-bold text-primary">
                    स्थान ०{idx + 1} / Landmark 0{idx + 1}
                  </div>
                  <h3 className="font-headline text-base sm:text-lg text-on-surface font-bold mt-1 leading-snug">
                    {locale === "hi" ? place.nameHi : place.nameEn}
                  </h3>
                  <p className="text-xs text-on-surface-variant mt-2 leading-relaxed">
                    {locale === "hi" ? place.descHi : place.descEn}
                  </p>
                </div>
              </div>

              <div className="p-4 pt-0 flex items-center justify-between border-t border-surface-container/50 mt-2">
                <span className="text-[11px] text-secondary font-medium">
                  {place.statusText}
                </span>
                <Link
                  href="/places"
                  className="px-3 py-1.5 rounded bg-surface-container-high text-primary hover:bg-primary hover:text-on-primary transition-colors text-xs font-semibold"
                >
                  {t.common.viewDetails}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
