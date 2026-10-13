"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { 
  FileCheck2, 
  ExternalLink, 
  CreditCard, 
  Award, 
  Home, 
  Sprout, 
  Heart, 
  ShieldAlert 
} from "lucide-react";

export const GovernmentSchemes = () => {
  const { t } = useLanguage();

  const schemes = [
    {
      icon: CreditCard,
      title: "राशन कार्ड सेवाएँ (EPDS)",
      authority: "खाद्य एवं उपभोक्ता संरक्षण विभाग, बिहार",
      desc: "नया राशन कार्ड आवेदन, सूची में नाम देखें और डीलर आवंटन स्थिति चेक करें।",
      link: "http://epds.bihar.gov.in",
      domain: "epds.bihar.gov.in",
    },
    {
      icon: Award,
      title: "RTPS बिहार (ServicePlus)",
      authority: "लोक सेवाओं का अधिकार",
      desc: "जाति, आय, निवास प्रमाण पत्र, चरित्र प्रमाण पत्र और ओबीसी (NCL) ऑनलाइन बनवाएँ।",
      link: "https://serviceonline.bihar.gov.in",
      domain: "serviceonline.bihar.gov.in",
    },
    {
      icon: Home,
      title: "PM आवास योजना ग्रामीण",
      authority: "ग्रामीण विकास मंत्रालय",
      desc: "पक्के मकान हेतु वित्तीय सहायता सूची, स्वीकृति स्थिति एवं FTO ट्रैकिंग।",
      link: "https://pmayg.nic.in",
      domain: "pmayg.nic.in",
    },
    {
      icon: Sprout,
      title: "PM किसान सम्मान निधि",
      authority: "कृषि एवं किसान कल्याण मंत्रालय",
      desc: "₹6,000 वार्षिक सहायता किस्त, e-KYC एवं लाभार्थी स्थिति की ऑनलाइन जाँच।",
      link: "https://pmkisan.gov.in",
      domain: "pmkisan.gov.in",
    },
    {
      icon: Heart,
      title: "सामाजिक सुरक्षा पेंशन (e-Labharthi)",
      authority: "समाज कल्याण विभाग बिहार",
      desc: "वृद्धावस्था पेंशन, विधवा पेंशन, दिव्यांग पेंशन भुगतान और जीवन प्रमाणीकरण।",
      link: "https://elabharthi.bih.nic.in",
      domain: "elabharthi.bih.nic.in",
    },
    {
      icon: ShieldAlert,
      title: "आयुष्मान भारत (PM-JAY)",
      authority: "राष्ट्रीय स्वास्थ्य प्राधिकरण",
      desc: "₹5 लाख तक निःशुल्क वार्षिक स्वास्थ्य बीमा कार्ड एवं संबद्ध अस्पतालों की सूची।",
      link: "https://pmjay.gov.in",
      domain: "pmjay.gov.in",
    },
  ];

  return (
    <section className="w-full bg-surface-container-lowest py-10 sm:py-14 border-b border-surface-container">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-wider mb-1">
            <FileCheck2 className="w-4 h-4 text-primary" />
            <span>{t?.schemes?.tag || "सरकारी योजनाएँ"}</span>
          </div>
          <h2 className="font-headline text-2xl sm:text-3xl text-on-surface font-bold">
            {t?.schemes?.title || "सरकारी योजनाएँ | Government Schemes"}
          </h2>
          <p className="text-xs sm:text-sm text-on-surface-variant mt-1">
            {t?.schemes?.subtitle || "सीधे आधिकारिक पोर्टलों से जुड़ें और योजनाओं का लाभ लें"}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {schemes.map((s, idx) => {
            const Icon = s.icon;
            return (
              <a
                key={idx}
                href={s.link}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors shadow-sm flex flex-col justify-between border border-surface-container group"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Icon className="w-7 h-7 text-primary" />
                    <ExternalLink className="w-4 h-4 text-outline group-hover:text-primary transition-colors" />
                  </div>
                  <h3 className="font-headline text-base text-on-surface font-bold">
                    {s.title}
                  </h3>
                  <p className="text-[11px] text-secondary mb-1 font-medium">
                    {s.authority}
                  </p>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    {s.desc}
                  </p>
                </div>
                <div className="pt-4 text-xs font-bold text-primary group-hover:underline">
                  {s.domain} →
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};
