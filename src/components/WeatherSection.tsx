"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Cloud, Sun, CloudRain, Snowflake } from "lucide-react";

export const WeatherSection = () => {
  const { t } = useLanguage();

  return (
    <section className="w-full bg-surface-container-lowest py-10 sm:py-14 border-b border-surface-container">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-wider mb-1">
              <Cloud className="w-4 h-4 text-primary" />
              <span>{t.weather.tag}</span>
            </div>
            <h2 className="font-headline text-2xl sm:text-3xl text-on-surface font-bold">
              {t.weather.title}
            </h2>
            <p className="text-xs sm:text-sm text-on-surface-variant mt-1">
              Naranga, Parihar Block, Sitamarhi District, Bihar
            </p>
          </div>
          <div className="px-3 py-1.5 rounded bg-surface-container text-on-surface-variant text-xs flex items-center gap-2 border border-surface-container-high">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            <span>{t.weather.unconnected}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Summer */}
          <div className="p-4 rounded-xl bg-surface-container-low shadow-sm border border-surface-container">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-headline text-base text-on-surface font-bold">
                ग्रीष्म ऋतु / Summer
              </h3>
              <Sun className="w-7 h-7 text-amber-500" />
            </div>
            <div className="font-headline text-2xl text-primary font-bold mb-1">
              32°C – 40°C
            </div>
            <div className="text-[11px] text-secondary mb-3 font-medium">अवधि: मार्च – जून</div>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              उष्ण एवं शुष्क मौसम। स्थानीय काल बैसाखी (Nor&apos;wester) बौछारें, गरमा मक्का व मूंग की बुआई हेतु महत्वपूर्ण।
            </p>
          </div>

          {/* Monsoon */}
          <div className="p-4 rounded-xl bg-surface-container-low shadow-sm border border-surface-container">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-headline text-base text-on-surface font-bold">
                वर्षा ऋतु / Monsoon (Kharif)
              </h3>
              <CloudRain className="w-7 h-7 text-primary" />
            </div>
            <div className="font-headline text-2xl text-primary font-bold mb-1">
              26°C – 33°C
            </div>
            <div className="text-[11px] text-secondary mb-3 font-medium">अवधि: जुलाई – सितम्बर</div>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              वार्षिक वर्षा का 80% हिस्सा इसी ऋतु में होता है। धान की रोपनी के लिए अत्यधिक अनुकूल व जीवनदायिनी अवधि।
            </p>
          </div>

          {/* Winter */}
          <div className="p-4 rounded-xl bg-surface-container-low shadow-sm border border-surface-container">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-headline text-base text-on-surface font-bold">
                शीत ऋतु / Winter (Rabi)
              </h3>
              <Snowflake className="w-7 h-7 text-sky-600" />
            </div>
            <div className="font-headline text-2xl text-primary font-bold mb-1">
              10°C – 22°C
            </div>
            <div className="text-[11px] text-secondary mb-3 font-medium">अवधि: नवम्बर – फ़रवरी</div>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              सुखद एवं शीतल मौसम। गेहूँ, सरसों, चना, मसूर एवं सब्जियों के उत्पादन हेतु सबसे उपयुक्त चक्र।
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
