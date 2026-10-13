"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { IMAGES } from "@/lib/data";
import { Map, ExternalLink } from "lucide-react";

export const VillageMap = () => {
  const { t } = useLanguage();

  return (
    <section className="w-full bg-surface py-10 sm:py-14 border-b border-surface-container" id="village-map">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-wider mb-1">
              <Map className="w-4 h-4 text-primary" />
              <span>{t.map.tag}</span>
            </div>
            <h2 className="font-headline text-2xl sm:text-3xl text-on-surface font-bold">
              {t.map.title}
            </h2>
            <p className="text-xs sm:text-sm text-on-surface-variant mt-1">
              {t.map.subtitle}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="https://maps.google.com/?q=Naranga,Parihar,Sitamarhi,Bihar"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-primary text-on-primary rounded text-xs font-semibold hover:bg-primary-container transition-colors inline-flex items-center gap-1.5 shadow-sm"
            >
              <ExternalLink className="w-4 h-4" />
              <span>{t.map.openGoogleBtn}</span>
            </a>
          </div>
        </div>

        <div className="rounded-2xl overflow-hidden shadow-sm bg-surface-container-lowest p-4 border border-surface-container">
          {/* Interactive Map Visual Element */}
          <div
            className="w-full h-80 bg-cover bg-center rounded-xl shadow-inner flex flex-col justify-end p-4 sm:p-6"
            style={{ backgroundImage: `url('${IMAGES.mapBg}')` }}
          >
            <div className="bg-surface/95 backdrop-blur-md p-4 rounded-lg max-w-md shadow-md border border-surface-container">
              <div className="font-headline text-base sm:text-lg text-on-surface font-bold">
                नारंगा उत्तरी (Naranga Uttari)
              </div>
              <div className="text-xs text-on-surface-variant mt-1 leading-relaxed">
                प्रखंड: परिहार (Parihar) | जिला: सीतामढ़ी (Sitamarhi) | भारत-नेपाल सीमा सामीप्य
              </div>
              <div className="mt-2 text-outline text-[11px]">
                {t.map.disclaimer}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
            <div className="p-3 rounded-lg bg-surface-container-low text-xs text-on-surface-variant border border-surface-container">
              <strong>प्रखंड मुख्यालय: </strong> परिहार (Parihar Block HQ) ~ 8-10 km
            </div>
            <div className="p-3 rounded-lg bg-surface-container-low text-xs text-on-surface-variant border border-surface-container">
              <strong>जिला मुख्यालय: </strong> सीतामढ़ी सदर (Sitamarhi) ~ 28-32 km
            </div>
            <div className="p-3 rounded-lg bg-surface-container-low text-xs text-on-surface-variant border border-surface-container">
              <strong>अंतर्राष्ट्रीय सीमा: </strong> भारत-नेपाल सीमा क्षेत्र सन्निकट
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
