"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { BAZAAR_CATEGORIES } from "@/lib/data";
import { Store, PlusCircle, ShoppingBag, Pill, Laptop, Sprout, Smartphone, Mail } from "lucide-react";

export default function ServicesPage() {
  const { locale } = useLanguage();

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "ShoppingBag":
        return <ShoppingBag className="w-8 h-8 text-primary mb-3" />;
      case "Pill":
        return <Pill className="w-8 h-8 text-primary mb-3" />;
      case "Laptop":
        return <Laptop className="w-8 h-8 text-primary mb-3" />;
      case "Sprout":
        return <Sprout className="w-8 h-8 text-primary mb-3" />;
      case "Smartphone":
        return <Smartphone className="w-8 h-8 text-primary mb-3" />;
      case "Mail":
        return <Mail className="w-8 h-8 text-primary mb-3" />;
      default:
        return <Store className="w-8 h-8 text-primary mb-3" />;
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      <div className="mb-10 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-surface-container text-primary text-xs font-bold mb-3 border border-surface-container-high">
          <Store className="w-3.5 h-3.5" />
          <span>{locale === "hi" ? "स्थानीय हाट, बाजार एवं नागरिक सेवाएँ" : "Local Bazaar & Civic Services"}</span>
        </div>
        <h1 className="font-headline text-3xl sm:text-4xl font-extrabold text-on-surface">
          {locale === "hi" ? "दुकानें एवं व्यावसायिक प्रतिष्ठान संदर्शिका" : "Shops & Commercial Directory"}
        </h1>
        <p className="text-sm text-on-surface-variant mt-2">
          Naranga Bazaar Merchants, Digital Service Points & Agricultural Outlets
        </p>
      </div>

      <div className="flex justify-end mb-6">
        <Link
          href="/contact?type=business"
          className="px-4 py-2 bg-primary text-on-primary rounded text-xs font-bold hover:bg-primary-container transition-colors inline-flex items-center gap-2 shadow-sm"
        >
          <PlusCircle className="w-4 h-4" />
          <span>अपना व्यावसायिक प्रतिष्ठान जोड़ें / Add Business</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {BAZAAR_CATEGORIES.map((cat) => (
          <div
            key={cat.id}
            className="p-6 rounded-2xl bg-surface-container-lowest shadow-sm border border-surface-container flex flex-col justify-between"
          >
            <div>
              {getIcon(cat.icon)}
              <h2 className="font-headline text-lg font-bold text-on-surface">
                {locale === "hi" ? cat.titleHi : cat.titleEn}
              </h2>
              <span className="inline-block px-2 py-0.5 rounded bg-surface-container text-xs text-primary font-semibold mt-1 mb-3">
                {cat.tag}
              </span>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                {locale === "hi" ? cat.descHi : cat.descEn}
              </p>
            </div>

            <div className="pt-4 border-t border-surface-container mt-4 flex items-center justify-between text-xs">
              <span className="text-secondary">स्थान: नारंगा मुख्य बाजार</span>
              <Link
                href={`/contact?type=business&cat=${cat.id}`}
                className="text-primary font-bold hover:underline"
              >
                सूचीबद्ध कराएं →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
