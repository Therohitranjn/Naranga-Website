"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { Users, UserPlus, Award } from "lucide-react";

export default function PeoplePage() {
  const { locale } = useLanguage();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      <div className="mb-10 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-surface-container text-primary text-xs font-bold mb-3 border border-surface-container-high">
          <Users className="w-3.5 h-3.5" />
          <span>{locale === "hi" ? "सामुदायिक पहचान एवं जनशक्ति" : "Community Identity & Achievers"}</span>
        </div>
        <h1 className="font-headline text-3xl sm:text-4xl font-extrabold text-on-surface">
          {locale === "hi" ? "हमारे लोग, हमारी पहचान" : "People of Naranga"}
        </h1>
        <p className="text-sm text-on-surface-variant mt-2 max-w-xl mx-auto">
          Honoring Teachers, Progressive Farmers, Academic Achievers and Public Servants
        </p>
      </div>

      <div className="p-8 rounded-2xl bg-surface-container-lowest shadow-sm border border-surface-container text-center max-w-2xl mx-auto mb-10">
        <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center text-primary mx-auto mb-4">
          <Award className="w-8 h-8" />
        </div>
        <h2 className="font-headline text-xl font-bold text-on-surface">
          सामुदायिक सम्मान व प्रेरणा संकलन
        </h2>
        <p className="text-xs sm:text-sm text-on-surface-variant mt-2 mb-6 leading-relaxed">
          यहाँ किसी भी अनाम या अप्रमाणित व्यक्ति का दावा नहीं किया गया है। क्या आपके पास नारंगा के किसी शिक्षक, स्वतंत्रता सेनानी, सेवानिवृत्त सैनिक या मेधावी छात्र का प्रामाणिक विवरण है? सहमति एवं दस्तावेजी प्रमाण के साथ नामांकित करें।
        </p>
        <Link
          href="/contact?type=nomination"
          className="px-6 py-3 bg-primary text-on-primary rounded-xl font-bold text-xs sm:text-sm hover:bg-primary-container transition-colors inline-flex items-center gap-2 shadow-sm"
        >
          <UserPlus className="w-4 h-4" />
          <span>किसी प्रेरक व्यक्ति का नाम प्रस्तावित करें</span>
        </Link>
      </div>
    </div>
  );
}
