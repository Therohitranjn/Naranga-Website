"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { FileCheck2, ExternalLink } from "lucide-react";

export default function SchemesPage() {
  const { locale } = useLanguage();

  const schemes = [
    {
      title: "राशन कार्ड सेवाएँ (EPDS बिहार)",
      dept: "खाद्य एवं उपभोक्ता संरक्षण विभाग, बिहार सरकार",
      desc: "नया राशन कार्ड (RC) ऑनलाइन आवेदन, परिवार के सदस्यों का नाम जोड़ना, ब्लॉक/डीलर वार राशन कार्ड सूची और मासिक खाद्यान्न आवंटन स्थिति जांच।",
      link: "http://epds.bihar.gov.in",
    },
    {
      title: "RTPS बिहार — लोक सेवाओं का अधिकार",
      dept: "सामान्य प्रशासन विभाग, बिहार",
      desc: "जाति प्रमाण पत्र, आय प्रमाण पत्र, निवास प्रमाण पत्र, नॉन-क्रीमी लेयर (OBC/EBC) एवं ईडब्ल्यूएस प्रमाण पत्र का ऑनलाइन निर्गमन एवं डाउनलोड।",
      link: "https://serviceonline.bihar.gov.in",
    },
    {
      title: "प्रधानमंत्री आवास योजना (ग्रामीण)",
      dept: "ग्रामीण विकास मंत्रालय, भारत सरकार",
      desc: "गरीब एवं बेघर परिवारों को पक्का मकान निर्माण हेतु ₹1,20,000 की वित्तीय सहायता। स्वीकृति सूची एवं FTO राशि ट्रैकिंग।",
      link: "https://pmayg.nic.in",
    },
    {
      title: "प्रधानमंत्री किसान सम्मान निधि (PM-KISAN)",
      dept: "कृषि एवं किसान कल्याण मंत्रालय",
      desc: "पात्र कृषक परिवारों को ₹2,000 की 3 समान किस्तों में प्रतिवर्ष ₹6,000 की आर्थिक सहायता। ई-केवाईसी एवं लाभार्थी बैंक खाता स्थिति।",
      link: "https://pmkisan.gov.in",
    },
    {
      title: "सामाजिक सुरक्षा पेंशन (e-Labharthi बिहार)",
      dept: "समाज कल्याण विभाग, बिहार",
      desc: "मुख्यमंत्री वृद्धजन पेंशन योजना, इंदिरा गांधी राष्ट्रीय वृद्धावस्था, विधवा एवं दिव्यांग पेंशन का डीबीटी भुगतान एवं वार्षिक जीवन प्रमाणीकरण।",
      link: "https://elabharthi.bih.nic.in",
    },
    {
      title: "आयुष्मान भारत — प्रधानमंत्री जन आरोग्य योजना (PM-JAY)",
      dept: "राष्ट्रीय स्वास्थ्य प्राधिकरण (NHA)",
      desc: "पात्र परिवारों को प्रतिवर्ष ₹5,00,000 तक का निःशुल्क कैशलेस अस्पताल उपचार। आयुष्मान गोल्डन कार्ड डाउनलोड एवं संबद्ध अस्पतालों की सूची।",
      link: "https://pmjay.gov.in",
    },
    {
      title: "मनरेगा (MGNREGA) जॉब कार्ड",
      dept: "ग्रामीण विकास मंत्रालय",
      desc: "ग्रामीण परिवारों के वयस्क सदस्यों को वर्ष में 100 दिनों का अकुशल रोजगार गारंटी एवं मजदूरी भुगतान विवरण।",
      link: "https://nrega.nic.in",
    },
    {
      title: "स्टूडेंट क्रेडिट कार्ड योजना",
      dept: "शिक्षा विभाग, बिहार (7 निश्चय)",
      desc: "12वीं पास छात्र-छात्राओं को उच्च शिक्षा (इंजीनियरिंग, मेडिकल, सामान्य डिग्री) हेतु ₹4 लाख तक का रियायती ब्याज दर पर शिक्षा ऋण।",
      link: "https://www.7nishchay-yuvaupmission.bihar.gov.in",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      <div className="mb-10 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-surface-container text-primary text-xs font-bold mb-3 border border-surface-container-high">
          <FileCheck2 className="w-3.5 h-3.5" />
          <span>{locale === "hi" ? "कल्याणकारी योजनाएँ एवं नागरिक अधिकार" : "Welfare Schemes & Citizen Rights"}</span>
        </div>
        <h1 className="font-headline text-3xl sm:text-4xl font-extrabold text-on-surface">
          {locale === "hi" ? "सरकारी योजनाएँ एवं आधिकारिक पोर्टल" : "Government Schemes & Portals"}
        </h1>
        <p className="text-sm text-on-surface-variant mt-2">
          Direct Official Government Portals for Certificates, Housing, Pensions & Student Aid
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {schemes.map((s, idx) => (
          <div
            key={idx}
            className="p-6 rounded-2xl bg-surface-container-lowest shadow-sm border border-surface-container flex flex-col justify-between"
          >
            <div>
              <span className="text-[11px] font-semibold text-secondary block mb-1">
                {s.dept}
              </span>
              <h2 className="font-headline text-lg font-bold text-on-surface mb-2">
                {s.title}
              </h2>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                {s.desc}
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-surface-container flex items-center justify-between">
              <span className="text-[11px] text-outline">आधिकारिक पोर्टल</span>
              <a
                href={s.link}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-1.5 bg-primary text-on-primary rounded text-xs font-bold hover:bg-primary-container transition-colors inline-flex items-center gap-1.5 shadow-sm"
              >
                <span>पोर्टल खोलें</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
