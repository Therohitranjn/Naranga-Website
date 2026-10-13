"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { IMAGES } from "@/lib/data";
import {
  Sprout,
  ExternalLink,
  ShieldCheck,
  MapPin,
  Wheat,
  Calendar,
  CloudSun,
  Headphones,
  CheckCircle2,
  AlertTriangle,
  Send,
  Building2,
  FileText,
  BadgePercent,
  TrendingUp,
  Droplets,
  Coins,
  History,
  Info,
  ChevronRight
} from "lucide-react";

export default function AgriculturePage() {
  const { locale, t } = useLanguage();
  const isHi = locale === "hi";

  // Form state for community agricultural contribution
  const [farmerName, setFarmerName] = useState("");
  const [farmerPhone, setFarmerPhone] = useState("");
  const [farmerWard, setFarmerWard] = useState("");
  const [infoType, setInfoType] = useState("crop-area");
  const [details, setDetails] = useState("");
  const [docLink, setDocLink] = useState("");
  const [consent, setConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");
    setSubmitSuccess(false);

    if (!farmerWard.trim() || !details.trim()) {
      setSubmitError(isHi ? "कृपया आवश्यक तारांकित (*) फ़ील्ड भरें।" : "Please fill in all required fields.");
      return;
    }

    if (!consent) {
      setSubmitError(isHi ? "कृपया सहमति बॉक्स पर टिक करें।" : "Please check the consent checkbox.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "agriculture_data_contribution",
          submitterName: farmerName.trim() || (isHi ? "किसान नागरिक" : "Farmer Contributor"),
          contact: farmerPhone.trim() || null,
          content: `[कृषि सूचना]: प्रकार: ${infoType} | टोला/वार्ड: ${farmerWard.trim()} | विवरण: ${details.trim()} | दस्तावेज: ${docLink.trim() || "कोई नहीं"}`,
          consent: true,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || (isHi ? "प्रविष्टि सहेजने में विफल" : "Failed to record submission"));
      }

      setSubmitSuccess(true);
      setFarmerName("");
      setFarmerPhone("");
      setFarmerWard("");
      setDetails("");
      setDocLink("");
      setConsent(false);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : (isHi ? "सर्वर से संपर्क करने में त्रुटि।" : "Server error.");
      setSubmitError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col w-full bg-background min-h-screen">
      {/* =========================================================================
          SECTION 1: BREADCRUMBS & ADMINISTRATIVE STRIP
          ========================================================================= */}
      <section className="bg-surface-container-low px-4 sm:px-6 lg:px-8 py-3 border-b border-outline-variant/60">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold text-secondary">
            <Link href="/" className="hover:text-primary transition-colors flex items-center gap-1">
              <span>{t.common.home}</span>
            </Link>
            <span className="text-outline-variant">/</span>
            <span className="text-primary font-bold">{t.common.agriculture}</span>
          </nav>
          <div className="flex items-center gap-2 bg-surface px-3 py-1.5 rounded-lg border border-outline-variant/60 text-on-surface-variant text-xs shadow-sm">
            <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
            <span className="truncate">
              {isHi
                ? "आधिकारिक कृषि एवं किसान कल्याण संदर्भ | प्रखंड: परिहार | जिला: सीतामढ़ी (PIN: 843324)"
                : "Official Agriculture & Farmer Welfare | Block: Parihar | District: Sitamarhi (PIN: 843324)"}
            </span>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: HERO SECTION — नारंगा की कृषि
          ========================================================================= */}
      <section className="relative bg-primary text-on-primary overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-overlay"
          style={{ backgroundImage: `url('${IMAGES.agriHero}')` }}
          role="img"
          aria-label={isHi ? "नारंगा के लहलहाते धान के खेत" : "Lush paddy fields in rural Bihar"}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 flex flex-col items-start gap-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 bg-surface-container-lowest/15 backdrop-blur-sm text-surface-bright text-xs font-semibold px-3 py-1 rounded-full border border-white/20">
              <MapPin className="w-3.5 h-3.5" />
              <span>{isHi ? "परिहार अंचल | सीतामढ़ी जिला" : "Parihar Block | Sitamarhi"}</span>
            </span>
            <span className="inline-flex items-center gap-1.5 bg-surface-container-lowest/15 backdrop-blur-sm text-surface-bright text-xs font-semibold px-3 py-1 rounded-full border border-white/20">
              <Droplets className="w-3.5 h-3.5" />
              <span>{isHi ? "गंगा-बागमती उप-बेसिन कृषि क्षेत्र" : "Ganga-Bagmati Agro-climatic Basin"}</span>
            </span>
          </div>

          <div className="max-w-3xl space-y-3">
            <h1 className="font-headline text-3xl sm:text-4xl lg:text-5xl text-surface-bright font-extrabold tracking-tight leading-tight">
              {t.agriculture.pageHeading}
            </h1>
            <p className="font-headline text-lg sm:text-xl text-on-primary-container font-semibold">
              {t.agriculture.pageSubtitle}
            </p>
            <p className="text-sm sm:text-base text-surface-container-high/90 max-w-2xl leading-relaxed">
              {t.agriculture.pageDescription}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href="#major-crops"
              className="inline-flex items-center gap-2 bg-surface-container-lowest text-primary font-bold text-xs sm:text-sm px-6 py-3 rounded-lg shadow-md hover:bg-surface-container-low transition-all"
            >
              <Sprout className="w-4 h-4" />
              <span>{t.agriculture.ctaCrops}</span>
            </a>
            <a
              href="#govt-schemes"
              className="inline-flex items-center gap-2 bg-primary-container text-surface-bright font-bold text-xs sm:text-sm px-6 py-3 rounded-lg shadow-md hover:bg-surface-tint transition-all border border-white/20"
            >
              <Coins className="w-4 h-4" />
              <span>{t.agriculture.ctaSchemes}</span>
            </a>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: QUICK ACCESS CARDS
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 z-10 w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1 */}
          <div className="bg-surface rounded-xl p-5 border border-outline-variant/60 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between gap-4">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                <Sprout className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-headline text-base font-bold text-on-surface">
                  {isHi ? "फसल की जानकारी" : "Crop Information"}
                </h3>
                <p className="text-xs text-secondary mt-1 leading-relaxed">
                  {isHi
                    ? "प्रमुख फसलें, बुवाई का समय, सिंचाई और कटाई की आवश्यक जानकारी।"
                    : "Profiles of principal crops, sowing cycles, irrigation, and harvesting."}
                </p>
              </div>
            </div>
            <a
              href="#major-crops"
              className="inline-flex items-center gap-1 text-xs text-primary hover:text-surface-tint font-bold"
            >
              <span>{isHi ? "फसलें देखें" : "View Crops"}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Card 2 */}
          <div className="bg-surface rounded-xl p-5 border border-outline-variant/60 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between gap-4">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                <Building2 className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-headline text-base font-bold text-on-surface">
                  {isHi ? "कृषि योजनाएँ" : "Agricultural Schemes"}
                </h3>
                <p className="text-xs text-secondary mt-1 leading-relaxed">
                  {isHi
                    ? "केंद्र और बिहार सरकार की प्रत्यक्ष लाभ अंतरण (DBT) किसान योजनाएँ।"
                    : "Central & State DBT welfare programs and input subsidies for farmers."}
                </p>
              </div>
            </div>
            <a
              href="#govt-schemes"
              className="inline-flex items-center gap-1 text-xs text-primary hover:text-surface-tint font-bold"
            >
              <span>{isHi ? "योजनाएँ देखें" : "View Schemes"}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Card 3 */}
          <div className="bg-surface rounded-xl p-5 border border-outline-variant/60 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between gap-4">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-headline text-base font-bold text-on-surface">
                  {isHi ? "खेती की तकनीक" : "Farming Techniques"}
                </h3>
                <p className="text-xs text-secondary mt-1 leading-relaxed">
                  {isHi
                    ? "मृदा स्वास्थ्य, संतुलित खाद-बीज प्रबंधन और आधुनिक सिंचाई विधियाँ।"
                    : "Soil testing, balanced fertilizer management, and micro-irrigation."}
                </p>
              </div>
            </div>
            <a
              href="#modern-techniques"
              className="inline-flex items-center gap-1 text-xs text-primary hover:text-surface-tint font-bold"
            >
              <span>{isHi ? "तकनीक जानें" : "Learn Techniques"}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Card 4 */}
          <div className="bg-surface rounded-xl p-5 border border-outline-variant/60 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between gap-4">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                <Headphones className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-headline text-base font-bold text-on-surface">
                  {isHi ? "किसान सहायता एवं संपर्क" : "Farmer Helpline & Support"}
                </h3>
                <p className="text-xs text-secondary mt-1 leading-relaxed">
                  {isHi
                    ? "कृषि समन्वयक, प्रखंड ई-किसान भवन और हेल्पलाइन नंबर।"
                    : "Parihar e-Kisan Bhawan, agricultural coordinators, and toll-free lines."}
                </p>
              </div>
            </div>
            <a
              href="#resources-directory"
              className="inline-flex items-center gap-1 text-xs text-primary hover:text-surface-tint font-bold"
            >
              <span>{isHi ? "सहायता केंद्र" : "Help Centres"}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: WEATHER & AGRICULTURAL ADVISORY STRIP
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="bg-surface-container p-6 rounded-2xl border border-outline-variant/60 shadow-sm flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2 flex-1">
            <div className="flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-wider">
              <CloudSun className="w-4 h-4 text-tertiary" />
              <span>
                {isHi
                  ? "मौसम पूर्वानुमान एवं सामयिक कृषि सलाह (मेघदूत / दामिनी ऐप संदर्भ)"
                  : "Weather Advisory & Agricultural Guidelines"}
              </span>
            </div>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              {isHi
                ? "सीतामढ़ी जिला कृषि विज्ञान केंद्र (KVK) एवं भारत मौसम विज्ञान विभाग (IMD) द्वारा जारी समसामयिक मौसम बुलेटिन अनुसार।"
                : "Compiled in accordance with Sitamarhi Krishi Vigyan Kendra (KVK) and IMD bulletins."}
            </p>
            <div className="p-3 bg-surface rounded-lg text-secondary text-xs border border-outline-variant/40 leading-relaxed">
              <strong className="text-on-surface">
                {isHi ? "सामान्य परामर्श: " : "General Advisory: "}
              </strong>
              {isHi
                ? "मौसम की जानकारी उपलब्ध होने पर यहाँ विस्तृत क्षेत्रीय पूर्वानुमान दिखाया जाएगा। खेतों में जलभराव न होने दें और कीटनाशक छिड़काव मौसम साफ रहने पर ही करें।"
                : "Detailed local weather metrics will appear here when verified. Avoid waterlogging and spray crop protections only in dry conditions."}
            </div>
          </div>
          <div className="shrink-0 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
            <div className="bg-primary text-on-primary px-5 py-3.5 rounded-xl text-center shadow-sm">
              <div className="text-[11px] uppercase font-bold text-on-primary-container tracking-wider">
                {isHi ? "किसान कॉल सेंटर (टोल-फ्री)" : "Kisan Call Centre (Toll-Free)"}
              </div>
              <div className="font-headline text-lg sm:text-xl font-extrabold tracking-wider mt-0.5 font-mono">
                1800-180-1551
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: CROP GALLERY (6 CROPS)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full" id="major-crops">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="font-headline text-2xl sm:text-3xl text-primary font-extrabold tracking-tight">
              {t.agriculture.cropsSectionTitle}
            </h2>
            <div className="inline-flex items-center gap-2 mt-2 px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container text-xs font-semibold border border-outline-variant/40">
              <Info className="w-3.5 h-3.5 text-primary" />
              <span>{t.agriculture.cropsSectionSubtitle}</span>
            </div>
          </div>
          <div className="text-xs text-secondary font-medium">
            {isHi ? "कुल 6 मुख्य फसल श्रेणियाँ" : "6 Major Crop Categories"}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Crop 1: धान */}
          <div className="bg-surface rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col border border-outline-variant/60">
            <div
              className="h-48 bg-cover bg-center relative"
              style={{ backgroundImage: `url('${IMAGES.agriPaddy}')` }}
              role="img"
              aria-label={isHi ? "धान की फसल" : "Paddy crop field"}
            >
              <span className="absolute top-3 right-3 bg-primary text-on-primary text-[11px] font-bold px-2.5 py-1 rounded-full shadow">
                {isHi ? "खरीफ फसल" : "Kharif Crop"}
              </span>
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <h3 className="font-headline text-lg font-bold text-on-surface">
                  {isHi ? "धान (Paddy / Rice)" : "Paddy (Rice)"}
                </h3>
                <p className="text-xs text-secondary mt-1.5 leading-relaxed">
                  {isHi
                    ? "खरीफ की मुख्य फसल। जून-जुलाई में रोपाई, अक्टूबर-नवंबर में कटाई। परिहार क्षेत्र की प्रमुख आजीविका।"
                    : "Primary Kharif crop. Sown in June-July and harvested in October-November."}
                </p>
              </div>
              <div className="pt-3 flex items-center justify-between text-xs text-on-surface-variant bg-surface-container-low p-2.5 rounded-lg border border-outline-variant/40">
                <span>{isHi ? "बुवाई: जून - जुलाई" : "Sowing: Jun - Jul"}</span>
                <span>{isHi ? "कटाई: अक्टूबर - नवंबर" : "Harvest: Oct - Nov"}</span>
              </div>
            </div>
          </div>

          {/* Crop 2: गेहूँ */}
          <div className="bg-surface rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col border border-outline-variant/60">
            <div
              className="h-48 bg-cover bg-center relative"
              style={{ backgroundImage: `url('${IMAGES.agriWheat}')` }}
              role="img"
              aria-label={isHi ? "गेहूँ की सुनहरी फसल" : "Golden wheat crop"}
            >
              <span className="absolute top-3 right-3 bg-tertiary-container text-on-primary text-[11px] font-bold px-2.5 py-1 rounded-full shadow">
                {isHi ? "रबी फसल" : "Rabi Crop"}
              </span>
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <h3 className="font-headline text-lg font-bold text-on-surface">
                  {isHi ? "गेहूँ (Wheat)" : "Wheat"}
                </h3>
                <p className="text-xs text-secondary mt-1.5 leading-relaxed">
                  {isHi
                    ? "रबी की प्रमुख खाद्यान्न फसल। नवंबर-दिसंबर में बुवाई, मार्च-अप्रैल में कटाई। सुनहरी बालियों की उन्नत किस्में।"
                    : "Principal Rabi staple. Sown in November-December and reaped in March-April."}
                </p>
              </div>
              <div className="pt-3 flex items-center justify-between text-xs text-on-surface-variant bg-surface-container-low p-2.5 rounded-lg border border-outline-variant/40">
                <span>{isHi ? "बुवाई: नवंबर - दिसंबर" : "Sowing: Nov - Dec"}</span>
                <span>{isHi ? "कटाई: मार्च - अप्रैल" : "Harvest: Mar - Apr"}</span>
              </div>
            </div>
          </div>

          {/* Crop 3: मक्का */}
          <div className="bg-surface rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col border border-outline-variant/60">
            <div
              className="h-48 bg-cover bg-center relative"
              style={{ backgroundImage: `url('${IMAGES.agriMaize}')` }}
              role="img"
              aria-label={isHi ? "मक्का की फसल" : "Maize corn crop"}
            >
              <span className="absolute top-3 right-3 bg-surface-tint text-on-primary text-[11px] font-bold px-2.5 py-1 rounded-full shadow">
                {isHi ? "बहुमौसमी" : "Multi-Season"}
              </span>
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <h3 className="font-headline text-lg font-bold text-on-surface">
                  {isHi ? "मक्का (Maize)" : "Maize (Corn)"}
                </h3>
                <p className="text-xs text-secondary mt-1.5 leading-relaxed">
                  {isHi
                    ? "खरीफ, रबी और गरमा तीनों मौसमों में उपयुक्त। कम पानी में अधिक उत्पादन एवं औद्योगिक मांग।"
                    : "Adaptable across Kharif, Rabi, and summer seasons with high industrial demand."}
                </p>
              </div>
              <div className="pt-3 flex items-center justify-between text-xs text-on-surface-variant bg-surface-container-low p-2.5 rounded-lg border border-outline-variant/40">
                <span>{isHi ? "बुवाई: वर्ष पर्यंत" : "Sowing: Multi-cycle"}</span>
                <span>{isHi ? "अवधि: 90 - 110 दिन" : "Duration: 90-110 days"}</span>
              </div>
            </div>
          </div>

          {/* Crop 4: दलहन */}
          <div className="bg-surface rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col border border-outline-variant/60">
            <div
              className="h-48 bg-cover bg-center relative"
              style={{ backgroundImage: `url('${IMAGES.agriPulse}')` }}
              role="img"
              aria-label={isHi ? "दलहन एवं दालों की फसल" : "Pulses and lentils"}
            >
              <span className="absolute top-3 right-3 bg-secondary text-on-primary text-[11px] font-bold px-2.5 py-1 rounded-full shadow">
                {isHi ? "दलहन" : "Pulses"}
              </span>
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <h3 className="font-headline text-lg font-bold text-on-surface">
                  {isHi ? "दलहन (Lentils & Pulses)" : "Pulses (Lentils & Gram)"}
                </h3>
                <p className="text-xs text-secondary mt-1.5 leading-relaxed">
                  {isHi
                    ? "मसूर, चना और अरहर। नाइट्रोजन स्थिरीकरण द्वारा मिट्टी की उर्वरता बढ़ाने में विशेष रूप से सहायक।"
                    : "Lentils, gram, and pigeon pea. Vital for biological nitrogen fixation."}
                </p>
              </div>
              <div className="pt-3 flex items-center justify-between text-xs text-on-surface-variant bg-surface-container-low p-2.5 rounded-lg border border-outline-variant/40">
                <span>{isHi ? "बुवाई: अक्टूबर - नवंबर" : "Sowing: Oct - Nov"}</span>
                <span>{isHi ? "कटाई: फरवरी - मार्च" : "Harvest: Feb - Mar"}</span>
              </div>
            </div>
          </div>

          {/* Crop 5: सरसों व तिलहन */}
          <div className="bg-surface rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col border border-outline-variant/60">
            <div
              className="h-48 bg-cover bg-center relative"
              style={{ backgroundImage: `url('${IMAGES.agriMustard}')` }}
              role="img"
              aria-label={isHi ? "पीली सरसों का खेत" : "Mustard farm field"}
            >
              <span className="absolute top-3 right-3 bg-tertiary-container text-on-primary text-[11px] font-bold px-2.5 py-1 rounded-full shadow">
                {isHi ? "तिलहन" : "Oilseed"}
              </span>
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <h3 className="font-headline text-lg font-bold text-on-surface">
                  {isHi ? "सरसों व तिलहन (Mustard)" : "Mustard & Oilseeds"}
                </h3>
                <p className="text-xs text-secondary mt-1.5 leading-relaxed">
                  {isHi
                    ? "पीली व काली सरसों। रबी मौसम की नकदी फसल, कम सिंचाई आवश्यकता एवं बाजार में निरंतर मांग।"
                    : "Yellow and black mustard. Cash crop with minimal irrigation requirements."}
                </p>
              </div>
              <div className="pt-3 flex items-center justify-between text-xs text-on-surface-variant bg-surface-container-low p-2.5 rounded-lg border border-outline-variant/40">
                <span>{isHi ? "बुवाई: अक्टूबर - नवंबर" : "Sowing: Oct - Nov"}</span>
                <span>{isHi ? "कटाई: फरवरी - मार्च" : "Harvest: Feb - Mar"}</span>
              </div>
            </div>
          </div>

          {/* Crop 6: सब्जियाँ एवं नकदी फसलें */}
          <div className="bg-surface rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col border border-outline-variant/60">
            <div
              className="h-48 bg-cover bg-center relative"
              style={{ backgroundImage: `url('${IMAGES.agriVegetables}')` }}
              role="img"
              aria-label={isHi ? "सब्जियों की खेती" : "Vegetable crops"}
            >
              <span className="absolute top-3 right-3 bg-primary text-on-primary text-[11px] font-bold px-2.5 py-1 rounded-full shadow">
                {isHi ? "सब्जियाँ" : "Vegetables"}
              </span>
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <h3 className="font-headline text-lg font-bold text-on-surface">
                  {isHi ? "सब्जियाँ एवं नकदी फसलें" : "Vegetables & Cash Crops"}
                </h3>
                <p className="text-xs text-secondary mt-1.5 leading-relaxed">
                  {isHi
                    ? "आलू, फूलगोभी, परवल एवं मौसमी हरी सब्जियाँ जो स्थानीय हाट-बाजारों में त्वरित आय का साधन बनती हैं।"
                    : "Potatoes, cauliflowers, pointed gourd, and seasonal vegetables for local haats."}
                </p>
              </div>
              <div className="pt-3 flex items-center justify-between text-xs text-on-surface-variant bg-surface-container-low p-2.5 rounded-lg border border-outline-variant/40">
                <span>{isHi ? "बुवाई: चक्रानुसार" : "Sowing: Seasonal"}</span>
                <span>{isHi ? "बाजार: स्थानीय हाट" : "Market: Local haats"}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 6: SEASONAL AGRICULTURAL CALENDAR
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full border-t border-outline-variant/60">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="font-headline text-2xl sm:text-3xl text-primary font-extrabold tracking-tight">
            {t.agriculture.calendarTitle}
          </h2>
          <p className="text-xs sm:text-sm text-secondary mt-2">
            {t.agriculture.calendarSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Kharif */}
          <div className="bg-surface rounded-xl p-6 border border-outline-variant/60 shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="bg-primary/10 text-primary text-[11px] font-bold px-2.5 py-1 rounded-full">
                  {isHi ? "1. वर्षा ऋतु चक्र" : "1. Monsoon Cycle"}
                </span>
                <span className="text-xs text-secondary font-semibold">
                  {isHi ? "जून से अक्टूबर" : "June to October"}
                </span>
              </div>
              <h3 className="font-headline text-xl font-bold text-on-surface">
                {isHi ? "खरीफ मौसम" : "Kharif Season"}
              </h3>
              <div className="space-y-1.5 text-xs">
                <div className="text-primary font-bold">{isHi ? "प्रमुख फसलें:" : "Crops:"}</div>
                <p className="text-secondary">{isHi ? "धान, मक्का, ज्वार, बाजरा, उड़द" : "Paddy, Maize, Millets, Black Gram"}</p>
              </div>
              <div className="space-y-1.5 text-xs">
                <div className="text-primary font-bold">{isHi ? "प्रमुख कार्य:" : "Key Operations:"}</div>
                <p className="text-secondary leading-relaxed">
                  {isHi
                    ? "मानसूनी बारिश के साथ खेत की जुताई, नर्सरी तैयार करना, धान की रोपाई, खरपतवार नियंत्रण।"
                    : "Nursery preparation, paddy transplantation, and weed management with monsoon onset."}
                </p>
              </div>
            </div>
            <div className="pt-3 bg-surface-container-low -mx-6 -mb-6 p-4 rounded-b-xl border-t border-outline-variant/40 text-xs text-on-surface-variant font-medium">
              {isHi ? "प्राथमिकता: रोपाई समयबद्धता" : "Priority: Timely Transplantation"}
            </div>
          </div>

          {/* Rabi */}
          <div className="bg-surface rounded-xl p-6 border border-outline-variant/60 shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="bg-tertiary-container/10 text-tertiary-container text-[11px] font-bold px-2.5 py-1 rounded-full">
                  {isHi ? "2. शीत ऋतु चक्र" : "2. Winter Cycle"}
                </span>
                <span className="text-xs text-secondary font-semibold">
                  {isHi ? "अक्टूबर से मार्च" : "October to March"}
                </span>
              </div>
              <h3 className="font-headline text-xl font-bold text-on-surface">
                {isHi ? "रबी मौसम" : "Rabi Season"}
              </h3>
              <div className="space-y-1.5 text-xs">
                <div className="text-primary font-bold">{isHi ? "प्रमुख फसलें:" : "Crops:"}</div>
                <p className="text-secondary">{isHi ? "गेहूँ, चना, मसूर, सरसों, मटर, आलू" : "Wheat, Gram, Lentils, Mustard, Potato"}</p>
              </div>
              <div className="space-y-1.5 text-xs">
                <div className="text-primary font-bold">{isHi ? "प्रमुख कार्य:" : "Key Operations:"}</div>
                <p className="text-secondary leading-relaxed">
                  {isHi
                    ? "नमी संरक्षण, शीतकालीन बुवाई, संतुलित उर्वरक (NPK) एवं समयानुसार क्रांतिक सिंचाई।"
                    : "Moisture conservation, winter sowing, balanced NPK application, and critical stage irrigation."}
                </p>
              </div>
            </div>
            <div className="pt-3 bg-surface-container-low -mx-6 -mb-6 p-4 rounded-b-xl border-t border-outline-variant/40 text-xs text-on-surface-variant font-medium">
              {isHi ? "प्राथमिकता: पहली सिंचाई (CRI स्टेज)" : "Priority: Crown Root Initiation Irrigation"}
            </div>
          </div>

          {/* Zaid */}
          <div className="bg-surface rounded-xl p-6 border border-outline-variant/60 shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="bg-secondary-container text-on-secondary-container text-[11px] font-bold px-2.5 py-1 rounded-full">
                  {isHi ? "3. ग्रीष्मकालीन चक्र" : "3. Summer Cycle"}
                </span>
                <span className="text-xs text-secondary font-semibold">
                  {isHi ? "मार्च से जून" : "March to June"}
                </span>
              </div>
              <h3 className="font-headline text-xl font-bold text-on-surface">
                {isHi ? "जायद / गरमा मौसम" : "Zaid / Summer Season"}
              </h3>
              <div className="space-y-1.5 text-xs">
                <div className="text-primary font-bold">{isHi ? "प्रमुख फसलें:" : "Crops:"}</div>
                <p className="text-secondary">{isHi ? "गरमा मक्का, खीरा, ककड़ी, तरबूज, मूंग, सब्जियाँ" : "Summer Maize, Melons, Moong Pulses, Cucumbers"}</p>
              </div>
              <div className="space-y-1.5 text-xs">
                <div className="text-primary font-bold">{isHi ? "प्रमुख कार्य:" : "Key Operations:"}</div>
                <p className="text-secondary leading-relaxed">
                  {isHi
                    ? "ग्रीष्मकालीन गहरी जुताई, त्वरित सिंचाई एवं जैविक मल्चिंग द्वारा नमी संरक्षण।"
                    : "Deep summer ploughing, prompt tube-well irrigation, and organic mulching."}
                </p>
              </div>
            </div>
            <div className="pt-3 bg-surface-container-low -mx-6 -mb-6 p-4 rounded-b-xl border-t border-outline-variant/40 text-xs text-on-surface-variant font-medium">
              {isHi ? "प्राथमिकता: मूंग द्वारा भूमि सुधार" : "Priority: Green Manuring via Moong"}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 7: GOVERNMENT AGRICULTURE SCHEMES (6 CARDS)
          ========================================================================= */}
      <section className="bg-surface-container-low py-12 border-t border-outline-variant/60" id="govt-schemes">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <h2 className="font-headline text-2xl sm:text-3xl text-primary font-extrabold tracking-tight">
                {t.agriculture.schemesTitle}
              </h2>
              <p className="text-xs sm:text-sm text-secondary mt-1">
                {t.agriculture.schemesSubtitle}
              </p>
            </div>
            <a
              href="https://dbtagriculture.bihar.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline"
            >
              <span>{isHi ? "प्रत्यक्ष लाभ अंतरण पोर्टल" : "Bihar DBT Agriculture Portal"}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Scheme 1: PM-KISAN */}
            <div className="bg-surface rounded-xl p-6 border border-outline-variant/60 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold bg-primary/10 text-primary px-2.5 py-1 rounded-full">
                    DBT सहायता
                  </span>
                  <span className="text-xs text-secondary font-mono">₹6,000 / वर्ष</span>
                </div>
                <h3 className="font-headline text-base font-bold text-on-surface">
                  {isHi ? "प्रधानमंत्री किसान सम्मान निधि (PM-KISAN)" : "Pradhan Mantri Kisan Samman Nidhi"}
                </h3>
                <p className="text-xs text-secondary leading-relaxed">
                  {isHi
                    ? "पात्र किसान परिवारों को प्रति वर्ष ₹6,000 की वित्तीय सहायता (₹2,000 की तीन समान किस्तों में सीधे बैंक खाते में DBT)।"
                    : "Direct income support of ₹6,000 annually in three equal tranches for eligible landholding farmers."}
                </p>
                <div className="text-[11px] bg-surface-container-low p-2.5 rounded-lg text-on-surface-variant font-medium border border-outline-variant/40">
                  {isHi ? "पात्रता: भूमिधारक किसान परिवार (e-KYC एवं आधार सीडिंग अनिवार्य)।" : "Eligibility: Landholding farmer families with active e-KYC."}
                </div>
              </div>
              <div className="pt-2">
                <a
                  href="https://pmkisan.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline"
                >
                  <span>pmkisan.gov.in</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Scheme 2: PMFBY */}
            <div className="bg-surface rounded-xl p-6 border border-outline-variant/60 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold bg-secondary-container text-on-secondary-container px-2.5 py-1 rounded-full">
                    {isHi ? "फसल बीमा" : "Crop Insurance"}
                  </span>
                  <span className="text-xs text-secondary font-mono">PMFBY</span>
                </div>
                <h3 className="font-headline text-base font-bold text-on-surface">
                  {isHi ? "प्रधानमंत्री फसल बीमा योजना (PMFBY)" : "PM Fasal Bima Yojana (PMFBY)"}
                </h3>
                <p className="text-xs text-secondary leading-relaxed">
                  {isHi
                    ? "प्राकृतिक आपदाओं, कीटों और रोगों से फसल क्षति पर वित्तीय सुरक्षा एवं न्यूनतम प्रीमियम दर पर व्यापक जोखिम कवरेज।"
                    : "Financial risk coverage and compensation against natural calamities, pests, and drought."}
                </p>
                <div className="text-[11px] bg-surface-container-low p-2.5 rounded-lg text-on-surface-variant font-medium border border-outline-variant/40">
                  {isHi ? "प्राकृतिक आपदाओं के समय किसानों की आय स्थिरता सुनिश्चित करने हेतु।" : "Ensures farmer income stability during adverse climatic conditions."}
                </div>
              </div>
              <div className="pt-2">
                <a
                  href="https://pmfby.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline"
                >
                  <span>pmfby.gov.in</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Scheme 3: KCC */}
            <div className="bg-surface rounded-xl p-6 border border-outline-variant/60 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold bg-primary-container text-on-primary px-2.5 py-1 rounded-full">
                    {isHi ? "ऋण सहायता" : "Credit Aid"}
                  </span>
                  <span className="text-xs text-secondary font-mono">4% Rate</span>
                </div>
                <h3 className="font-headline text-base font-bold text-on-surface">
                  {isHi ? "किसान क्रेडिट कार्ड (KCC)" : "Kisan Credit Card (KCC)"}
                </h3>
                <p className="text-xs text-secondary leading-relaxed">
                  {isHi
                    ? "खेती, खाद-बीज और संबंधित गतिविधियों के लिए 4% रियायती ब्याज दर पर आसान एवं सुलभ संस्थागत ऋण सुविधा।"
                    : "Subsidized institutional credit at 4% interest rate for agricultural inputs and livestock."}
                </p>
                <div className="text-[11px] bg-surface-container-low p-2.5 rounded-lg text-on-surface-variant font-medium border border-outline-variant/40">
                  {isHi ? "समय पर ऋण अदायगी पर 3% अतिरिक्त ब्याज अनुदान।" : "3% prompt-repayment incentive subsidy."}
                </div>
              </div>
              <div className="pt-2">
                <a
                  href="https://www.myscheme.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline"
                >
                  <span>myscheme.gov.in (KCC)</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Scheme 4: बिहार फसल सहायता */}
            <div className="bg-surface rounded-xl p-6 border border-outline-variant/60 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold bg-tertiary-container/10 text-tertiary-container px-2.5 py-1 rounded-full">
                    {isHi ? "बिहार राज्य" : "Bihar State"}
                  </span>
                  <span className="text-xs text-secondary font-mono">Free Aid</span>
                </div>
                <h3 className="font-headline text-base font-bold text-on-surface">
                  {isHi ? "बिहार राज्य फसल सहायता योजना" : "Bihar State Crop Assistance Scheme"}
                </h3>
                <p className="text-xs text-secondary leading-relaxed">
                  {isHi
                    ? "बिहार सरकार द्वारा प्राकृतिक आपदा या सूखे/बाढ़ से फसल क्षति पर प्रति हेक्टेयर निर्धारित आर्थिक सहायता राशि।"
                    : "Direct compensation from the Government of Bihar for flood and drought crop damages."}
                </p>
                <div className="text-[11px] bg-surface-container-low p-2.5 rounded-lg text-on-surface-variant font-medium border border-outline-variant/40">
                  {isHi ? "रैयत एवं गैर-रैयत दोनों प्रकार के किसान आवेदन के लिए पात्र।" : "Both landholding (raiyat) and tenant farmers eligible."}
                </div>
              </div>
              <div className="pt-2">
                <a
                  href="https://dbtagriculture.bihar.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline"
                >
                  <span>dbtagriculture.bihar.gov.in</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Scheme 5: बीज व डीजल अनुदान */}
            <div className="bg-surface rounded-xl p-6 border border-outline-variant/60 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold bg-secondary-container text-on-secondary-container px-2.5 py-1 rounded-full">
                    {isHi ? "इनपुट सब्सिडी" : "Input Subsidy"}
                  </span>
                  <span className="text-xs text-secondary font-mono">Seed & Diesel</span>
                </div>
                <h3 className="font-headline text-base font-bold text-on-surface">
                  {isHi ? "मुख्यमंत्री तीव्र बीज विस्तार एवं डीजल अनुदान" : "CM Seed Extension & Diesel Subsidy"}
                </h3>
                <p className="text-xs text-secondary leading-relaxed">
                  {isHi
                    ? "रियायती दर पर प्रमाणित बीजों का वितरण एवं अनियमित वर्षा की स्थिति में खरीफ फसलों की सिंचाई हेतु डीजल अनुदान।"
                    : "Subsidized certified seeds and diesel irrigation grant for erratic monsoon spells."}
                </p>
                <div className="text-[11px] bg-surface-container-low p-2.5 rounded-lg text-on-surface-variant font-medium border border-outline-variant/40">
                  {isHi ? "नारंगा पंचायत के पंजीकृत किसान ई-किसान भवन द्वारा लाभान्वित।" : "Processed through Parihar block e-Kisan Bhawan."}
                </div>
              </div>
              <div className="pt-2">
                <a
                  href="https://dbtagriculture.bihar.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline"
                >
                  <span>dbtagriculture.bihar.gov.in</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Scheme 6: कृषि यांत्रिकीकरण */}
            <div className="bg-surface rounded-xl p-6 border border-outline-variant/60 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold bg-primary/10 text-primary px-2.5 py-1 rounded-full">
                    {isHi ? "यंत्रीकरण" : "Mechanization"}
                  </span>
                  <span className="text-xs text-secondary font-mono">50% - 80% Subsidy</span>
                </div>
                <h3 className="font-headline text-base font-bold text-on-surface">
                  {isHi ? "कृषि यंत्र अनुदान योजना (OFMAS)" : "Farm Mechanization Subsidy (OFMAS)"}
                </h3>
                <p className="text-xs text-secondary leading-relaxed">
                  {isHi
                    ? "आधुनिक कृषि उपकरणों যেমন रोटावेटर, थ्रेशर, कल्टीवेटर, एवं कस्टम हायरिंग सेंटर की स्थापना पर सरकारी अनुदान।"
                    : "Subsidies on rotavators, threshers, seed drills, and custom hiring units."}
                </p>
                <div className="text-[11px] bg-surface-container-low p-2.5 rounded-lg text-on-surface-variant font-medium border border-outline-variant/40">
                  {isHi ? "ऑनलाइन लॉटरी एवं अनुमोदन प्रणाली द्वारा पारदर्शी वितरण।" : "Disbursed via transparent online lottery on OFMAS portal."}
                </div>
              </div>
              <div className="pt-2">
                <a
                  href="https://farmech.bih.nic.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline"
                >
                  <span>farmech.bih.nic.in (OFMAS)</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 8: SOIL, IRRIGATION & MODERN FARMING TECHNIQUES
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full" id="modern-techniques">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="font-headline text-2xl sm:text-3xl text-primary font-extrabold tracking-tight">
            {t.agriculture.techniquesTitle}
          </h2>
          <p className="text-xs sm:text-sm text-secondary mt-2">
            {t.agriculture.techniquesSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: मृदा स्वास्थ्य */}
          <div className="bg-surface rounded-xl overflow-hidden shadow-sm flex flex-col border border-outline-variant/60">
            <div
              className="h-52 bg-cover bg-center"
              style={{ backgroundImage: `url('${IMAGES.agriSoil}')` }}
              role="img"
              aria-label={isHi ? "मृदा स्वास्थ्य परीक्षण" : "Soil testing in agricultural field"}
            />
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <h3 className="font-headline text-base font-bold text-on-surface">
                  {isHi ? "मिट्टी की देखभाल एवं मृदा स्वास्थ्य" : "Soil Health & Testing"}
                </h3>
                <p className="text-xs text-secondary leading-relaxed">
                  {isHi
                    ? "खेत की मिट्टी की जाँच कराकर आवश्यकतानुसार संतुलित खाद (यूरिया, डीएपी, पोटाश) और गोबर की खाद का प्रयोग करें। मृदा स्वास्थ्य कार्ड योजना के तहत परीक्षण उपलब्ध है।"
                    : "Soil testing guides balanced application of urea, DAP, potash, and organic FYM compost."}
                </p>
              </div>
              <div className="bg-surface-container-low p-3 rounded-lg text-xs font-bold text-primary border border-outline-variant/40">
                {isHi ? "सलाह: मिट्टी में जीवांश कार्बन (Organic Carbon) बढ़ाएं।" : "Advisory: Increase organic carbon via green manuring."}
              </div>
            </div>
          </div>

          {/* Card 2: सिंचाई प्रबंधन */}
          <div className="bg-surface rounded-xl overflow-hidden shadow-sm flex flex-col border border-outline-variant/60">
            <div
              className="h-52 bg-cover bg-center"
              style={{ backgroundImage: `url('${IMAGES.agriIrrigation}')` }}
              role="img"
              aria-label={isHi ? "ड्रिप एवं आधुनिक सिंचाई" : "Drip and sprinkler irrigation"}
            />
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <h3 className="font-headline text-base font-bold text-on-surface">
                  {isHi ? "सिंचाई प्रबंधन एवं जल संरक्षण" : "Irrigation Management"}
                </h3>
                <p className="text-xs text-secondary leading-relaxed">
                  {isHi
                    ? "कम पानी में अधिक पैदावार के लिए ड्रिप एवं स्प्रिंकलर (टपक व फव्वारा) सिंचाई अपनाएँ। प्रधानमंत्री कृषि सिंचाई योजना (PMKSY) पर सरकारी अनुदान उपलब्ध है।"
                    : "Adopt micro-irrigation to maximize crop yield per water drop with PMKSY subsidies."}
                </p>
              </div>
              <div className="bg-surface-container-low p-3 rounded-lg text-xs font-bold text-primary border border-outline-variant/40">
                {isHi ? "सलाह: खेतों में समतलीकरण और वर्षा जल संचयन करें।" : "Advisory: Laser leveling and rainwater harvesting."}
              </div>
            </div>
          </div>

          {/* Card 3: कृषि यंत्र व CHC */}
          <div className="bg-surface rounded-xl overflow-hidden shadow-sm flex flex-col border border-outline-variant/60">
            <div
              className="h-52 bg-cover bg-center"
              style={{ backgroundImage: `url('${IMAGES.agriMachinery}')` }}
              role="img"
              aria-label={isHi ? "आधुनिक कृषि यंत्र" : "Modern agricultural machinery and tractors"}
            />
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <h3 className="font-headline text-base font-bold text-on-surface">
                  {isHi ? "आधुनिक कृषि यंत्र एवं कस्टम हायरिंग" : "Farm Mechanization & CHC"}
                </h3>
                <p className="text-xs text-secondary leading-relaxed">
                  {isHi
                    ? "ट्रैक्टर, रोटावेटर, जीरो टिलेज सीड ड्रिल और रीपर जैसी मशीनों से खेती की लागत घटाएं और समय बचाएं। 50% से 80% तक अनुदान मिलता है।"
                    : "Zero tillage seed drills, rotavators, and laser levelers minimize cost and turnaround."}
                </p>
              </div>
              <div className="bg-surface-container-low p-3 rounded-lg text-xs font-bold text-primary border border-outline-variant/40">
                {isHi ? "सलाह: स्थानीय कस्टम हायरिंग सेंटर (CHC) से उपकरण लें।" : "Advisory: Rent implements from local Custom Hiring Centres."}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 9: AGRICULTURAL PHOTO GALLERY (खेती की झलकियाँ)
          ========================================================================= */}
      <section className="bg-surface-container-low py-12 border-t border-outline-variant/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <h2 className="font-headline text-2xl sm:text-3xl text-primary font-extrabold tracking-tight">
                {t.agriculture.galleryTitle}
              </h2>
              <p className="text-xs sm:text-sm text-secondary mt-1">
                {t.agriculture.gallerySubtitle}
              </p>
            </div>
            <div className="text-xs bg-surface px-3 py-1.5 rounded-lg text-on-surface-variant font-medium border border-outline-variant/40 shadow-sm">
              {isHi ? "दस्तावेजी अभिलेखागार" : "Documentary Archive"}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="group relative rounded-xl overflow-hidden shadow-sm h-72 border border-outline-variant/60">
              <div
                className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-300"
                style={{ backgroundImage: `url('${IMAGES.agriLandscapePaddy}')` }}
                role="img"
                aria-label={isHi ? "मानसूनी धान रोपाई" : "Monsoon paddy transplantation in Bihar"}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/20 to-transparent flex items-end p-5">
                <p className="text-xs sm:text-sm text-surface-bright font-bold">
                  {isHi ? "नारंगा व परिहार अंचल में मानसूनी धान रोपाई" : "Monsoon Paddy Transplantation in Naranga-Parihar"}
                </p>
              </div>
            </div>

            <div className="group relative rounded-xl overflow-hidden shadow-sm h-72 border border-outline-variant/60">
              <div
                className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-300"
                style={{ backgroundImage: `url('${IMAGES.agriLandscapeWheat}')` }}
                role="img"
                aria-label={isHi ? "सुनहरी गेहूँ की फसल" : "Golden wheat crop in North Bihar"}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/20 to-transparent flex items-end p-5">
                <p className="text-xs sm:text-sm text-surface-bright font-bold">
                  {isHi ? "रबी मौसम में लहलहाती सुनहरी गेहूँ की फसल" : "Golden Wheat Fields in Rabi Season"}
                </p>
              </div>
            </div>

            <div className="group relative rounded-xl overflow-hidden shadow-sm h-72 border border-outline-variant/60">
              <div
                className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-300"
                style={{ backgroundImage: `url('${IMAGES.agriLandscapeSoilCheck}')` }}
                role="img"
                aria-label={isHi ? "मृदा स्वास्थ्य परीक्षण" : "Soil health examination"}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/20 to-transparent flex items-end p-5">
                <p className="text-xs sm:text-sm text-surface-bright font-bold">
                  {isHi ? "मृदा स्वास्थ्य परीक्षण एवं संतुलित पोषण प्रबंधन" : "Soil Testing and Balanced Crop Nutrition"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 10: FARMER RESOURCES & DIRECTORY
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full" id="resources-directory">
        <div className="max-w-2xl mb-8">
          <h2 className="font-headline text-2xl sm:text-3xl text-primary font-extrabold tracking-tight">
            {t.agriculture.resourcesTitle}
          </h2>
          <p className="text-xs sm:text-sm text-secondary mt-1">
            {t.agriculture.resourcesSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <a
            href="https://krishi.bihar.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-surface p-5 rounded-xl border border-outline-variant/60 shadow-sm hover:shadow-md transition-shadow flex items-start gap-4 group"
          >
            <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-on-primary transition-colors">
              <Sprout className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h4 className="text-xs font-bold text-on-surface group-hover:text-primary transition-colors">
                {isHi ? "कृषि विभाग, बिहार सरकार" : "Agriculture Dept, Govt of Bihar"}
              </h4>
              <p className="text-[11px] text-secondary font-mono">krishi.bihar.gov.in</p>
              <span className="inline-block text-[11px] text-primary font-bold pt-1">
                {isHi ? "विभागीय पोर्टल ↗" : "Department Portal ↗"}
              </span>
            </div>
          </a>

          <a
            href="https://dbtagriculture.bihar.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-surface p-5 rounded-xl border border-outline-variant/60 shadow-sm hover:shadow-md transition-shadow flex items-start gap-4 group"
          >
            <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-on-primary transition-colors">
              <FileText className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h4 className="text-xs font-bold text-on-surface group-hover:text-primary transition-colors">
                {isHi ? "डीबीटी कृषि पोर्टल (DBT Agriculture)" : "DBT Agriculture Portal"}
              </h4>
              <p className="text-[11px] text-secondary">
                {isHi ? "किसान पंजीकरण एवं अनुदान आवेदन" : "Farmer registration & subsidy applications"}
              </p>
              <span className="inline-block text-[11px] text-primary font-bold pt-1">
                {isHi ? "पंजीकरण पोर्टल ↗" : "Registration Portal ↗"}
              </span>
            </div>
          </a>

          <a
            href="https://kvk.icar.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-surface p-5 rounded-xl border border-outline-variant/60 shadow-sm hover:shadow-md transition-shadow flex items-start gap-4 group"
          >
            <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-on-primary transition-colors">
              <Building2 className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h4 className="text-xs font-bold text-on-surface group-hover:text-primary transition-colors">
                {isHi ? "कृषि विज्ञान केंद्र (KVK), सीतामढ़ी" : "Krishi Vigyan Kendra (KVK) Sitamarhi"}
              </h4>
              <p className="text-[11px] text-secondary">
                {isHi ? "तकनीकी प्रशिक्षण व उन्नत बीज सहायता" : "Technical training & certified seeds"}
              </p>
              <span className="inline-block text-[11px] text-primary font-bold pt-1">
                {isHi ? "केवीके विवरण ↗" : "KVK Details ↗"}
              </span>
            </div>
          </a>

          <a
            href="https://soilhealth.dac.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-surface p-5 rounded-xl border border-outline-variant/60 shadow-sm hover:shadow-md transition-shadow flex items-start gap-4 group"
          >
            <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-on-primary transition-colors">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h4 className="text-xs font-bold text-on-surface group-hover:text-primary transition-colors">
                {isHi ? "राष्ट्रीय मृदा स्वास्थ्य कार्ड पोर्टल" : "Soil Health Card Portal"}
              </h4>
              <p className="text-[11px] text-secondary font-mono">soilhealth.dac.gov.in</p>
              <span className="inline-block text-[11px] text-primary font-bold pt-1">
                {isHi ? "सॉइल टेस्ट ↗" : "Soil Testing ↗"}
              </span>
            </div>
          </a>

          <div className="bg-surface p-5 rounded-xl border border-outline-variant/60 shadow-sm flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0">
              <Coins className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h4 className="text-xs font-bold text-on-surface">
                {isHi ? "इफको (IFFCO) उर्वरक केंद्र" : "IFFCO Fertilizer Centre"}
              </h4>
              <p className="text-[11px] text-secondary">
                {isHi ? "उर्वरक उपलब्धता एवं नैनो यूरिया सहायता" : "Fertilizer & Nano Urea stock"}
              </p>
              <span className="inline-block text-[11px] text-secondary font-medium pt-1">
                {isHi ? "स्थानीय पैक्स / केंद्र" : "Local PACS / Hub"}
              </span>
            </div>
          </div>

          <div className="bg-surface p-5 rounded-xl border border-outline-variant/60 shadow-sm flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <Building2 className="w-5 h-5 text-primary" />
            </div>
            <div className="space-y-1">
              <h4 className="text-xs font-bold text-on-surface">
                {isHi ? "ई-किसान भवन, प्रखंड कार्यालय" : "e-Kisan Bhawan, Block Office"}
              </h4>
              <p className="text-[11px] text-secondary">
                {isHi ? "प्रखंड: परिहार, सीतामढ़ी" : "Block: Parihar, Sitamarhi"}
              </p>
              <span className="inline-block text-[11px] text-primary font-bold pt-1">
                {isHi ? "प्रखंड कृषि पदाधिकारी" : "Block Agriculture Officer"}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 11: COMMUNITY AGRICULTURAL CONTRIBUTION FORM
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full border-t border-outline-variant/60">
        <div className="bg-surface-container-low p-6 sm:p-10 rounded-2xl border border-outline-variant/60 shadow-sm max-w-4xl mx-auto">
          <div className="space-y-2 mb-8 text-center sm:text-left">
            <div className="inline-flex items-center gap-1.5 text-primary text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>{isHi ? "सामुदायिक सहभागिता एवं डेटा संवर्धन" : "Community Participation"}</span>
            </div>
            <h2 className="font-headline text-2xl sm:text-3xl text-primary font-extrabold tracking-tight">
              {t.agriculture.formTitle}
            </h2>
            <p className="text-xs sm:text-sm text-secondary leading-relaxed">
              {t.agriculture.formSubtitle}
            </p>
          </div>

          <form onSubmit={handleFormSubmit} className="space-y-5">
            {submitError && (
              <div className="p-3.5 rounded-lg bg-error-container text-on-error-container text-xs flex items-center gap-2 border border-error/30">
                <AlertTriangle className="w-4 h-4 text-error shrink-0" />
                <span>{submitError}</span>
              </div>
            )}

            {submitSuccess && (
              <div className="p-3.5 rounded-lg bg-primary/10 text-primary text-xs flex items-center gap-2 border border-primary/30">
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                <span>{t.agriculture.formSuccessMsg}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-on-surface">
                  {t.agriculture.formName}
                </label>
                <input
                  type="text"
                  value={farmerName}
                  onChange={(e) => setFarmerName(e.target.value)}
                  placeholder={isHi ? "अपना नाम दर्ज करें" : "Enter your name"}
                  className="w-full bg-surface text-on-surface text-xs px-3.5 py-2.5 rounded-lg border border-outline-variant/60 focus:outline-none focus:ring-1 focus:ring-primary shadow-sm placeholder:text-outline"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-on-surface">
                  {t.agriculture.formPhone}
                </label>
                <input
                  type="tel"
                  value={farmerPhone}
                  onChange={(e) => setFarmerPhone(e.target.value)}
                  placeholder={isHi ? "10 अंकों का मोबाइल नंबर" : "10-digit mobile number"}
                  className="w-full bg-surface text-on-surface text-xs px-3.5 py-2.5 rounded-lg border border-outline-variant/60 focus:outline-none focus:ring-1 focus:ring-primary shadow-sm placeholder:text-outline"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-on-surface">
                  {t.agriculture.formWard}
                </label>
                <input
                  type="text"
                  required
                  value={farmerWard}
                  onChange={(e) => setFarmerWard(e.target.value)}
                  placeholder={isHi ? "उदा. उत्तर टोला, वार्ड नं. 04" : "e.g. Ward No. 04, North Tola"}
                  className="w-full bg-surface text-on-surface text-xs px-3.5 py-2.5 rounded-lg border border-outline-variant/60 focus:outline-none focus:ring-1 focus:ring-primary shadow-sm placeholder:text-outline"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-on-surface">
                  {t.agriculture.formType}
                </label>
                <select
                  value={infoType}
                  onChange={(e) => setInfoType(e.target.value)}
                  className="w-full bg-surface text-on-surface text-xs px-3.5 py-2.5 rounded-lg border border-outline-variant/60 focus:outline-none focus:ring-1 focus:ring-primary shadow-sm"
                >
                  <option value="crop-area">{isHi ? "फसल रकबा एवं उत्पादन" : "Crop Acreage & Yield"}</option>
                  <option value="irrigation">{isHi ? "सिंचाई एवं नलकूप स्थिति" : "Tubewell & Irrigation Status"}</option>
                  <option value="fertilizer">{isHi ? "खाद-बीज उपलब्धता" : "Fertilizer & Seed Stock"}</option>
                  <option value="pest">{isHi ? "कीट-व्याधि या फसल क्षति" : "Pest Infestation or Crop Damage"}</option>
                  <option value="other">{isHi ? "अन्य कृषि सुझाव" : "Other Farming Suggestion"}</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-on-surface">
                {t.agriculture.formDetails}
              </label>
              <textarea
                required
                rows={4}
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder={isHi ? "फसल, रकबा या समस्या संबंधी संक्षिप्त एवं स्पष्ट जानकारी लिखें..." : "Enter clear details regarding crops, tubewells, or local feedback..."}
                className="w-full bg-surface text-on-surface text-xs px-3.5 py-2.5 rounded-lg border border-outline-variant/60 focus:outline-none focus:ring-1 focus:ring-primary shadow-sm placeholder:text-outline"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-on-surface">
                {t.agriculture.formDocLink}
              </label>
              <input
                type="url"
                value={docLink}
                onChange={(e) => setDocLink(e.target.value)}
                placeholder="https://..."
                className="w-full bg-surface text-on-surface text-xs px-3.5 py-2.5 rounded-lg border border-outline-variant/60 focus:outline-none focus:ring-1 focus:ring-primary shadow-sm placeholder:text-outline"
              />
            </div>

            <div className="flex items-start gap-2.5 pt-1">
              <input
                id="agriConsent"
                type="checkbox"
                required
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-1 h-4 w-4 rounded text-primary focus:ring-primary cursor-pointer"
              />
              <label htmlFor="agriConsent" className="text-xs text-secondary cursor-pointer leading-relaxed">
                {t.agriculture.formConsent}
              </label>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                type="submit"
                disabled={submitting}
                className="w-full sm:w-auto bg-primary text-on-primary font-bold text-xs px-6 py-3 rounded-lg shadow-md hover:bg-primary-container transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>{submitting ? (isHi ? "भेजा जा रहा है..." : "Submitting...") : t.agriculture.formSubmitBtn}</span>
              </button>
              <span className="text-[11px] text-secondary">
                {isHi ? "सत्यापन अवधि: 24–48 कार्य घंटे" : "Audit period: 24-48 hours"}
              </span>
            </div>
          </form>
        </div>
      </section>

      {/* =========================================================================
          AUDIT RECORD TIMESTAMP STRIP
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full text-center">
        <div className="inline-flex items-center gap-2 text-xs text-secondary bg-surface-container px-4 py-2 rounded-lg border border-outline-variant/40">
          <History className="w-4 h-4 text-primary shrink-0" />
          <span>
            {isHi
              ? "कृषि रिकॉर्ड अद्यतन: 24 अक्टूबर 2024 | स्रोत: कृषि विभाग बिहार व ग्राम सर्वेक्षण अभिलेख"
              : "Agricultural Record Last Updated: 24 October 2024 | Sources: Agriculture Dept Bihar & Village Survey"}
          </span>
        </div>
      </section>
    </div>
  );
}
