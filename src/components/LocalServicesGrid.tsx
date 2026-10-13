"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { BAZAAR_CATEGORIES } from "@/lib/data";
import { 
  Store, 
  PlusCircle, 
  FileEdit, 
  ShoppingBag, 
  Pill, 
  Laptop, 
  Sprout, 
  Smartphone, 
  Mail 
} from "lucide-react";

export const LocalServicesGrid = () => {
  const { locale, t } = useLanguage();

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "ShoppingBag":
        return <ShoppingBag className="w-8 h-8 text-primary mb-2" />;
      case "Pill":
        return <Pill className="w-8 h-8 text-primary mb-2" />;
      case "Laptop":
        return <Laptop className="w-8 h-8 text-primary mb-2" />;
      case "Sprout":
        return <Sprout className="w-8 h-8 text-primary mb-2" />;
      case "Smartphone":
        return <Smartphone className="w-8 h-8 text-primary mb-2" />;
      case "Mail":
        return <Mail className="w-8 h-8 text-primary mb-2" />;
      default:
        return <Store className="w-8 h-8 text-primary mb-2" />;
    }
  };

  return (
    <section className="w-full bg-surface py-10 sm:py-14 border-b border-surface-container">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-wider mb-1">
              <Store className="w-4 h-4 text-primary" />
              <span>{t.services.tag}</span>
            </div>
            <h2 className="font-headline text-2xl sm:text-3xl text-on-surface font-bold">
              {t.services.title}
            </h2>
            <p className="text-xs sm:text-sm text-on-surface-variant mt-1">
              {t.services.subtitle}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/contact?type=business"
              className="px-4 py-2 bg-primary text-on-primary rounded text-xs font-semibold hover:bg-primary-container transition-colors inline-flex items-center gap-1.5 shadow-sm"
            >
              <PlusCircle className="w-4 h-4" />
              <span>{t.services.suggestBtn}</span>
            </Link>
            <Link
              href="/contact?type=correction"
              className="px-3 py-2 bg-surface-container-high text-on-surface rounded text-xs font-semibold hover:bg-surface-container-highest transition-colors inline-flex items-center gap-1.5"
            >
              <FileEdit className="w-4 h-4" />
              <span>{t.services.reportBtn}</span>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {BAZAAR_CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              className="p-4 rounded-xl bg-surface-container-lowest shadow-sm text-center flex flex-col items-center justify-between border border-surface-container hover:border-primary/50 transition-colors"
            >
              <div className="flex flex-col items-center">
                {getIcon(cat.icon)}
                <h4 className="font-headline text-sm font-bold text-on-surface mt-1">
                  {locale === "hi" ? cat.titleHi : cat.titleEn}
                </h4>
                <p className="text-[11px] text-secondary mt-1 font-medium">
                  {cat.descEn.split(" ")[0]} Hub
                </p>
              </div>
              <span className="mt-3 px-2 py-0.5 rounded bg-surface-container text-[10px] font-semibold text-on-surface-variant">
                {cat.tag}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
