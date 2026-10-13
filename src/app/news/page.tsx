"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Bell, CalendarX, FileText } from "lucide-react";

export default function NewsPage() {
  const { locale } = useLanguage();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      <div className="mb-10 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-surface-container text-primary text-xs font-bold mb-3 border border-surface-container-high">
          <Bell className="w-3.5 h-3.5" />
          <span>{locale === "hi" ? "आधिकारिक सूचना पट्ट एवं समाचार" : "Official Notice Board & Updates"}</span>
        </div>
        <h1 className="font-headline text-3xl sm:text-4xl font-extrabold text-on-surface">
          {locale === "hi" ? "ग्राम पंचायत सूचना पट्ट" : "Village Notice Board"}
        </h1>
        <p className="text-sm text-on-surface-variant mt-2">
          Official Administrative Bulletins, Gram Sabha Dates & Community Announcements
        </p>
      </div>

      {/* Current Live State */}
      <div className="p-8 rounded-2xl bg-surface-container-lowest shadow-sm border border-surface-container flex flex-col items-center text-center max-w-2xl mx-auto mb-10">
        <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center text-primary mb-4">
          <CalendarX className="w-8 h-8" />
        </div>
        <h2 className="font-headline text-xl font-bold text-on-surface">
          कोई नई सूचना उपलब्ध नहीं (No verified live notices published today)
        </h2>
        <p className="text-xs sm:text-sm text-on-surface-variant max-w-md mt-2 leading-relaxed">
          वर्तमान में ग्राम पंचायत द्वारा कोई आपातकालीन या नई सार्वजनिक सूचना जारी नहीं की गई है। आगामी ग्राम सभा एवं विकास योजनाओं की तिथियां यहाँ प्रकाशित की जाएंगी।
        </p>
      </div>

      {/* Notice Archive Reference */}
      <div className="p-6 rounded-2xl bg-surface-container-low border border-surface-container">
        <div className="flex items-center gap-2 mb-3">
          <FileText className="w-5 h-5 text-primary" />
          <h3 className="font-headline text-base font-bold text-on-surface">
            सूचना अभिलेखागार (Official Notice Archive Guidelines)
          </h3>
        </div>
        <p className="text-xs text-on-surface-variant leading-relaxed">
          नारंगा ग्राम पंचायत द्वारा जारी प्रत्येक आधिकारिक विज्ञप्ति जारीकर्ता प्राधिकारी के हस्ताक्षर, पत्रांक एवं निर्गमन तिथि के सत्यापन के उपरांत ही इस डिजिटल पटल पर प्रकाशित की जाती है।
        </p>
      </div>
    </div>
  );
}
