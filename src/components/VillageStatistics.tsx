"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { CENSUS_STATS } from "@/lib/data";
import { BarChart3, Info } from "lucide-react";

export const VillageStatistics = () => {
  const { locale, t } = useLanguage();

  return (
    <section className="w-full bg-surface py-10 sm:py-14 border-b border-surface-container">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="flex items-center justify-center gap-1.5 text-primary text-xs font-bold uppercase tracking-wider mb-2">
            <BarChart3 className="w-4 h-4 text-primary" />
            <span>{t.statistics.tag}</span>
          </div>
          <h2 className="font-headline text-2xl sm:text-3xl text-on-surface font-bold">
            {t.statistics.title}
          </h2>
        </div>

        {/* Source Disclosure Banner */}
        <div className="p-4 rounded-lg bg-surface-container-low flex items-start gap-3 mb-8 shadow-sm border border-surface-container">
          <Info className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
            <strong className="text-on-surface">{t.statistics.disclaimerTitle} </strong>
            {t.statistics.disclaimerText}
          </div>
        </div>

        {/* 6-Card High Contrast Dashboard Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {CENSUS_STATS.map((stat) => (
            <div
              key={stat.id}
              className="p-4 rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between border border-surface-container hover:border-primary/40 transition-colors"
            >
              <div className="text-on-surface-variant text-[11px] font-semibold leading-tight">
                {locale === "hi" ? stat.labelHi : stat.labelEn}
              </div>

              <div className="my-3">
                {stat.isCodes ? (
                  <div className="space-y-1">
                    <div className="text-xs">
                      <strong className="text-on-surface">Census: </strong>
                      <span className="font-bold text-primary">{stat.censusCode}</span>
                    </div>
                    <div className="text-xs">
                      <strong className="text-on-surface">LGD: </strong>
                      <span className="font-bold text-primary">{stat.lgdCode}</span>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="font-headline text-2xl sm:text-3xl font-extrabold text-primary">
                      {stat.value}
                    </div>
                    <div className="text-[11px] text-secondary mt-0.5 font-medium">
                      {locale === "hi" ? stat.subHi : stat.subEn}
                    </div>
                  </>
                )}
              </div>

              <div className="px-2 py-0.5 bg-surface-container-low rounded text-on-surface-variant text-[10px] font-semibold w-fit">
                {stat.source}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
