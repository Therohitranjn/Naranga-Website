"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Sparkles, SunMedium, PartyPopper, Palette, HeartHandshake } from "lucide-react";

export const CultureSection = () => {
  const { t } = useLanguage();

  return (
    <section className="w-full bg-surface py-10 sm:py-14 border-b border-surface-container">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4 text-primary" />
            <span>{t.culture.tag}</span>
          </div>
          <h2 className="font-headline text-2xl sm:text-3xl text-on-surface font-bold">
            {t.culture.title}
          </h2>
          <p className="text-xs sm:text-sm text-on-surface-variant mt-1">
            {t.culture.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Chhath Puja */}
          <div className="p-4 rounded-xl bg-surface-container-low shadow-sm flex flex-col justify-between border border-surface-container">
            <div>
              <SunMedium className="w-7 h-7 text-amber-500 mb-2" />
              <h3 className="font-headline text-base text-on-surface font-bold">
                छठ महापर्व (Chhath Puja)
              </h3>
              <p className="text-[11px] text-secondary mb-2">कार्तिक एवं चैत्र षष्ठी</p>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                गाँव के पारंपरिक पोखरों एवं जलस्रोतों पर अस्ताचलगामी और उदीयमान भगवान भास्कर को अर्घ्य अर्पण। गाँव का सबसे पवित्र लोक अनुष्ठान।
              </p>
            </div>
            <div className="pt-4 border-t border-surface-container mt-2">
              <span className="text-[11px] text-outline font-medium">Community Harmony</span>
            </div>
          </div>

          {/* Durga Puja */}
          <div className="p-4 rounded-xl bg-surface-container-low shadow-sm flex flex-col justify-between border border-surface-container">
            <div>
              <PartyPopper className="w-7 h-7 text-primary mb-2" />
              <h3 className="font-headline text-base text-on-surface font-bold">
                दुर्गा पूजा एवं मेला
              </h3>
              <p className="text-[11px] text-secondary mb-2">नारंगा बाजार वार्षिक मेला</p>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                शारदीय नवरात्र में नारंगा बाजार का भव्य मेला, लोक संगीत, सांस्कृतिक कार्यक्रम और आस-पास के दर्जनों गाँवों का समागम।
              </p>
            </div>
            <div className="pt-4 border-t border-surface-container mt-2">
              <span className="text-[11px] text-outline font-medium">Annual Fair</span>
            </div>
          </div>

          {/* Holi */}
          <div className="p-4 rounded-xl bg-surface-container-low shadow-sm flex flex-col justify-between border border-surface-container">
            <div>
              <Palette className="w-7 h-7 text-amber-600 mb-2" />
              <h3 className="font-headline text-base text-on-surface font-bold">
                होली (फगुआ) व दीपावली
              </h3>
              <p className="text-[11px] text-secondary mb-2">पारंपरिक रंग व दीप उत्सव</p>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                फाल्गुन मास में पारंपरिक जोगिरा, ढोलक-झाल की गूँज और कार्तिक में घर-घर दीपमाला का उल्लास।
              </p>
            </div>
            <div className="pt-4 border-t border-surface-container mt-2">
              <span className="text-[11px] text-outline font-medium">Folk Heritage</span>
            </div>
          </div>

          {/* Eid & Harmony */}
          <div className="p-4 rounded-xl bg-surface-container-low shadow-sm flex flex-col justify-between border border-surface-container">
            <div>
              <HeartHandshake className="w-7 h-7 text-primary mb-2" />
              <h3 className="font-headline text-base text-on-surface font-bold">
                ईद व सामाजिक सौहार्द
              </h3>
              <p className="text-[11px] text-secondary mb-2">ईद-उल-फितर एवं ईद-उल-अजहा</p>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                आपसी भाईचारे और साझी गंगा-जमुनी तहजीब की परंपरा। मिलन, सेवइयां और सामुदायिक सौहार्द का प्रतीक।
              </p>
            </div>
            <div className="pt-4 border-t border-surface-container mt-2">
              <span className="text-[11px] text-outline font-medium">Unity & Brotherhood</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
