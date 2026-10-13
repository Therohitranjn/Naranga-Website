"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { ShieldCheck, Lock, FileText } from "lucide-react";

export default function PrivacyPage() {
  const { locale } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      <div className="mb-10 text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-surface-container text-primary text-xs font-bold mb-3 border border-surface-container-high">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>{locale === "hi" ? "नागरिक गोपनीयता एवं डेटा सुरक्षा" : "Privacy & Data Protection"}</span>
        </div>
        <h1 className="font-headline text-3xl sm:text-4xl font-extrabold text-on-surface">
          {locale === "hi" ? "गोपनीयता नीति एवं अस्वीकरण" : "Privacy Policy & Legal Disclaimer"}
        </h1>
        <p className="text-sm text-on-surface-variant mt-2">
          Official Community Terms of Naranga Uttari Gram Panchayat Portal
        </p>
      </div>

      <div className="space-y-6 text-xs sm:text-sm text-on-surface-variant leading-relaxed">
        <div className="p-6 rounded-2xl bg-surface-container-lowest shadow-sm border border-surface-container">
          <div className="flex items-center gap-2 text-primary font-bold mb-3">
            <Lock className="w-4 h-4" />
            <h2 className="font-headline text-base sm:text-lg text-on-surface font-bold">
              1. व्यक्तिगत डेटा संरक्षण (Personal Data Protection)
            </h2>
          </div>
          <p>
            मेरा नारंगा (My Naranga) पोर्टल समुदाय के सदस्यों, किसानों, विद्यार्थियों और नागरिकों की निजता का पूर्ण सम्मान करता है। नागरिक प्रपत्रों के माध्यम से प्राप्त नाम, संपर्क नंबर और ईमेल केवल सत्यापन और प्रत्यक्ष संवाद हेतु उपयोग किए जाते हैं। किसी भी नागरिक का व्यक्तिगत विवरण विज्ञापनदाताओं या अनधिकृत तृतीय पक्षों को नहीं बेचा जाता है।
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-surface-container-lowest shadow-sm border border-surface-container">
          <div className="flex items-center gap-2 text-primary font-bold mb-3">
            <FileText className="w-4 h-4" />
            <h2 className="font-headline text-base sm:text-lg text-on-surface font-bold">
              2. सार्वजनिक सांख्यिकी एवं ऐतिहासिक डेटा प्रकटीकरण (Census Disclosure)
            </h2>
          </div>
          <p>
            इस पोर्टल पर प्रदर्शित जनसंख्या, परिवार एवं भूमि आंकड़े ऐतिहासिक जनगणना 2011 तथा अधिकृत जिला गजट से लिए गए हैं। वर्तमान जनसंख्या व आंकड़े इनमें भिन्न हो सकते हैं। किसी भी कानूनी, राजस्व अथवा वैधानिक कार्य के लिए संबंधित प्रखंड अथवा जिला मजिस्ट्रेट कार्यालय से प्रमाणित प्रति प्राप्त करें।
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-surface-container-lowest shadow-sm border border-surface-container">
          <div className="flex items-center gap-2 text-primary font-bold mb-3">
            <ShieldCheck className="w-4 h-4" />
            <h2 className="font-headline text-base sm:text-lg text-on-surface font-bold">
              3. सामुदायिक तस्वीरें एवं योगदान (Community Uploads & Consent)
            </h2>
          </div>
          <p>
            गाँव के स्थलों, भवनों और कार्यक्रमों की तस्वीरें केवल दस्तावेजी पुरालेख एवं जन-जागरूकता के उद्देश्य से प्रकाशित की जाती हैं। यदि किसी निवासी को अपनी व्यक्तिगत संपत्ति अथवा छायाचित्र के प्रकाशन पर आपत्ति हो, तो वे तत्काल पोर्टल एडमिन से संपर्क कर सकते हैं, जिसे 24 घंटे के भीतर हटा दिया जाएगा।
          </p>
        </div>
      </div>
    </div>
  );
}
