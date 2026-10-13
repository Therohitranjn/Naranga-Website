"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { IMAGES } from "@/lib/data";
import { 
  Sprout, 
  ExternalLink, 
  Calendar, 
  Droplets, 
  Receipt, 
  Headphones 
} from "lucide-react";

export const AgriculturePreview = () => {
  const { t } = useLanguage();

  return (
    <section className="w-full bg-surface py-10 sm:py-14 border-b border-surface-container">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-wider mb-1">
              <Sprout className="w-4 h-4 text-primary" />
              <span>{t.agriculture.tag}</span>
            </div>
            <h2 className="font-headline text-2xl sm:text-3xl text-on-surface font-bold">
              {t.agriculture.title}
            </h2>
            <p className="text-xs sm:text-sm text-on-surface-variant mt-1">
              {t.agriculture.subtitle}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="https://dbtagriculture.bihar.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-primary text-on-primary rounded text-xs font-semibold hover:bg-primary-container transition-colors inline-flex items-center gap-1.5 shadow-sm"
            >
              <ExternalLink className="w-4 h-4" />
              <span>{t.agriculture.portalBtn}</span>
            </a>
          </div>
        </div>

        {/* Agricultural Hero Banner with real documentary photo */}
        <div className="relative w-full min-h-[320px] rounded-2xl overflow-hidden shadow-md mb-8">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${IMAGES.stitchAgri}')` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-on-surface/90 via-on-surface/60 to-transparent" />
          </div>

          <div className="relative z-10 h-full p-6 sm:p-8 flex flex-col justify-between max-w-2xl text-surface-bright">
            <div>
              <span className="px-3 py-1 rounded bg-primary-container text-surface-bright text-xs font-semibold">
                {t.agriculture.bannerTag}
              </span>
              <h3 className="font-headline text-2xl sm:text-3xl font-bold text-surface-bright mt-3">
                {t.agriculture.bannerTitle}
              </h3>
              <p className="text-xs sm:text-sm text-surface-container-low mt-2 leading-relaxed">
                {t.agriculture.bannerText}
              </p>
            </div>

            {/* Real Recorded Land Usage Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-6">
              <div className="p-2.5 rounded bg-surface/20 backdrop-blur-sm border border-white/10">
                <div className="text-[11px] text-surface-variant">{t.agriculture.netSown}</div>
                <div className="font-headline text-base sm:text-lg font-bold text-surface-bright">
                  1,397 Ha
                </div>
              </div>
              <div className="p-2.5 rounded bg-surface/20 backdrop-blur-sm border border-white/10">
                <div className="text-[11px] text-surface-variant">{t.agriculture.irrigated}</div>
                <div className="font-headline text-base sm:text-lg font-bold text-surface-bright">
                  51.4 Ha
                </div>
              </div>
              <div className="p-2.5 rounded bg-surface/20 backdrop-blur-sm border border-white/10">
                <div className="text-[11px] text-surface-variant">{t.agriculture.unirrigated}</div>
                <div className="font-headline text-base sm:text-lg font-bold text-surface-bright">
                  1,345.6 Ha
                </div>
              </div>
              <div className="p-2.5 rounded bg-surface/20 backdrop-blur-sm border border-white/10">
                <div className="text-[11px] text-surface-variant">{t.agriculture.mainCrop}</div>
                <div className="font-headline text-base sm:text-lg font-bold text-surface-bright">
                  Paddy (धान)
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 5 Agriculture Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* 1. Crop Info */}
          <div className="p-4 rounded-xl bg-surface-container-low shadow-sm flex flex-col justify-between border border-surface-container">
            <div>
              <Calendar className="w-6 h-6 text-primary mb-2" />
              <h4 className="font-headline text-base text-on-surface font-bold">फसल जानकारी</h4>
              <p className="text-[11px] text-secondary mb-2">Crop Management Cycles</p>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                खरीफ (धान), रबी (गेहूँ, मक्का, सरसों, मसूर) और गरमा फसलों हेतु सामयिक सलाह व रोग प्रबंधन।
              </p>
            </div>
            <Link href="/agriculture" className="mt-4 text-xs font-bold text-primary hover:underline">
              फसल कैलेंडर देखें →
            </Link>
          </div>

          {/* 2. Seeds & Fertilizers */}
          <div className="p-4 rounded-xl bg-surface-container-low shadow-sm flex flex-col justify-between border border-surface-container">
            <div>
              <Sprout className="w-6 h-6 text-primary mb-2" />
              <h4 className="font-headline text-base text-on-surface font-bold">बीज और खाद</h4>
              <p className="text-[11px] text-secondary mb-2">Seeds & Fertilizers</p>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                प्रमाणित खाद (यूरिया, डीएपी) एवं उन्नत बीजों हेतु परिहार प्रखंड व नारंगा बाजार विक्रय केंद्र संदर्शिका।
              </p>
            </div>
            <Link href="/services" className="mt-4 text-xs font-bold text-primary hover:underline">
              डीलर निर्देशिका →
            </Link>
          </div>

          {/* 3. Irrigation */}
          <div className="p-4 rounded-xl bg-surface-container-low shadow-sm flex flex-col justify-between border border-surface-container">
            <div>
              <Droplets className="w-6 h-6 text-primary mb-2" />
              <h4 className="font-headline text-base text-on-surface font-bold">सिंचाई और पानी</h4>
              <p className="text-[11px] text-secondary mb-2">Irrigation & Canal Advisory</p>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                निजी व राजकीय नलकूप, बोरिंग पंप एवं वर्षा जल संचयन हेतु दिशानिर्देश व अनुदान विवरण।
              </p>
            </div>
            <Link href="/agriculture" className="mt-4 text-xs font-bold text-primary hover:underline">
              सिंचाई सुविधाएँ →
            </Link>
          </div>

          {/* 4. Schemes */}
          <div className="p-4 rounded-xl bg-surface-container-low shadow-sm flex flex-col justify-between border border-surface-container">
            <div>
              <Receipt className="w-6 h-6 text-primary mb-2" />
              <h4 className="font-headline text-base text-on-surface font-bold">कृषि योजनाएँ</h4>
              <p className="text-[11px] text-secondary mb-2">Govt Farming Schemes</p>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                PM-KISAN सम्मान निधि, फसल सहायता (फसल बीमा) एवं कृषि यंत्रीकरण सब्सिडी आवेदन।
              </p>
            </div>
            <a
              href="https://pmkisan.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 text-xs font-bold text-primary hover:underline"
            >
              योजना पोर्टल →
            </a>
          </div>

          {/* 5. Support */}
          <div className="p-4 rounded-xl bg-surface-container-low shadow-sm flex flex-col justify-between border border-surface-container">
            <div>
              <Headphones className="w-6 h-6 text-primary mb-2" />
              <h4 className="font-headline text-base text-on-surface font-bold">किसान सहायता</h4>
              <p className="text-[11px] text-secondary mb-2">Helpline & Block Office</p>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                किसान कॉल सेंटर टोल-फ्री: <strong className="text-on-surface">1551</strong>। प्रखंड कृषि पदाधिकारी, परिहार संपर्क केंद्र।
              </p>
            </div>
            <Link href="/contact" className="mt-4 text-xs font-bold text-primary hover:underline">
              सहायता नंबर →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
