"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { IMAGES, CENSUS_STATS, PLACES_DATA } from "@/lib/data";
import { 
  MapPin, 
  BookOpen, 
  Landmark, 
  Sprout, 
  GraduationCap, 
  Hospital, 
  BarChart3, 
  Users, 
  Calendar, 
  Sun, 
  CloudRain, 
  Snowflake, 
  Sparkles, 
  Compass, 
  ExternalLink, 
  FileText, 
  CheckCircle2, 
  Info, 
  Award, 
  TrendingUp, 
  Send,
  Camera,
  Church,
  Moon
} from "lucide-react";

export default function AboutPage() {
  const { locale } = useLanguage();
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    category: "historical_info",
    details: "",
    consent: false,
  });

  const isHi = locale === "hi";

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.details || !formData.consent) {
      alert(isHi ? "कृपया सभी आवश्यक फ़ील्ड भरें एवं सहमति दें।" : "Please fill all required fields and accept consent.");
      return;
    }
    setSubmitting(true);
    try {
      await fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: formData.category,
          submitterName: formData.name,
          contact: formData.contact,
          content: formData.details,
          consent: formData.consent,
        }),
      });
      setSubmissionSuccess(true);
    } catch {
      // Local fallback
      const existing = JSON.parse(localStorage.getItem("naranga_submissions") || "[]");
      existing.push({
        id: Date.now(),
        type: formData.category,
        submitterName: formData.name,
        contact: formData.contact,
        content: formData.details,
        date: new Date().toISOString(),
      });
      localStorage.setItem("naranga_submissions", JSON.stringify(existing));
      setSubmissionSuccess(true);
    } finally {
      setSubmitting(false);
    }
  };

  const getPlaceIcon = (iconName?: string) => {
    switch (iconName) {
      case "temple":
        return <Landmark className="w-10 h-10 text-secondary mb-2" />;
      case "church":
        return <Church className="w-10 h-10 text-secondary mb-2" />;
      case "mosque":
        return <Moon className="w-10 h-10 text-secondary mb-2" />;
      case "school":
        return <GraduationCap className="w-10 h-10 text-secondary mb-2" />;
      default:
        return <Landmark className="w-10 h-10 text-secondary mb-2" />;
    }
  };

  return (
    <div className="flex flex-col w-full bg-[#fbf8f0]">
      {/* 1. Official Administrative Stamp & Breadcrumb Bar */}
      <section className="w-full bg-[#f4efe5] px-4 sm:px-6 lg:px-10 py-3 border-b border-[#e5e0d3]">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs text-[#5c625e]">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-1 hover:text-primary transition-colors text-[#5c625e]">
              <Compass className="w-3.5 h-3.5" />
              <span>{isHi ? "होम" : "Home"}</span>
            </Link>
            <span className="text-[#c9c6be]">/</span>
            <span className="text-primary font-bold">{isHi ? "गाँव के बारे में" : "About Village"}</span>
          </nav>
          <div className="flex items-center gap-2.5">
            <span className="px-2.5 py-0.5 rounded-full bg-white text-primary text-[11px] font-semibold tracking-wide flex items-center gap-1 border border-[#e5e0d3]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E06D14]"></span>
              <span>Census Code: 219122</span>
            </span>
            <span className="hidden sm:inline-block text-[#c9c6be]">•</span>
            <span className="text-[11px] text-[#434a45]">{isHi ? "सीतामढ़ी, बिहार (पिन: 843324)" : "Sitamarhi, Bihar (PIN 843324)"}</span>
          </div>
        </div>
      </section>

      {/* SECTION A: Village Hero Section */}
      <section className="relative w-full overflow-hidden bg-[#0e382e] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-12 lg:py-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Hero Left Content */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-white text-xs font-semibold tracking-wider uppercase border border-white/15">
                <span className="w-2 h-2 rounded-full bg-[#ffb68c]"></span>
                <span>{isHi ? "जनसांख्यिकी • इतिहास • भूगोल • जनजीवन" : "Demographics • History • Geography • Life"}</span>
              </div>

              <div className="space-y-2">
                <h1 className="font-headline text-3xl sm:text-5xl lg:text-6xl text-white font-extrabold tracking-tight leading-tight">
                  {isHi ? "हमारा नारंगा गाँव" : "Our Village Naranga"}
                </h1>
                <p className="font-headline text-lg sm:text-2xl text-[#baeed9] font-medium">
                  {isHi ? "अपनी मिट्टी, अपनी पहचान, अपनी संस्कृति" : "Our Land, Our Identity, Our Culture"}
                </p>
                <p className="text-xs sm:text-sm text-[#c1ebd9] flex items-center gap-1.5 pt-1">
                  <MapPin className="w-4 h-4 text-[#ffb68c] flex-shrink-0" />
                  <span>{isHi ? "नारंगा, प्रखंड परिहार, जिला सीतामढ़ी, बिहार" : "Naranga, Parihar Block, Sitamarhi District, Bihar"}</span>
                </p>
              </div>

              <p className="text-sm sm:text-base text-white/90 leading-relaxed max-w-2xl font-normal">
                {isHi
                  ? "बिहार के सीतामढ़ी जिले के परिहार प्रखंड में स्थित नारंगा की प्रामाणिक भौगोलिक स्थिति, जनसांख्यिकी, कृषि, संस्कृति और सार्वजनिक अभिलेखों की समग्र संदर्शिका।"
                  : "A comprehensive civic profile of Naranga Village located in Parihar Block of Sitamarhi District, Bihar. Documenting authentic geography, verified historical census records, agriculture, social infrastructure, and local heritage."}
              </p>

              {/* Geographic Chips */}
              <div className="flex flex-wrap gap-2 pt-2">
                <span className="px-3 py-1 rounded-md bg-white/10 text-xs font-medium">
                  📍 Naranga, Bihar
                </span>
                <span className="px-3 py-1 rounded-md bg-white/10 text-xs font-medium">
                  🏛️ परिहार प्रखंड (Parihar Block)
                </span>
                <span className="px-3 py-1 rounded-md bg-white/10 text-xs font-medium">
                  🌾 सीतामढ़ी जिला (Sitamarhi)
                </span>
                <span className="px-3 py-1 rounded-md bg-white/10 text-xs font-medium">
                  📮 PIN 843324
                </span>
                <span className="px-3 py-1 rounded-md bg-[#d95204] text-white text-xs font-bold">
                  📋 Census Code: 219122
                </span>
              </div>

              {/* Quick Jump Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <a
                  href="#village-map"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-white text-[#003629] text-xs sm:text-sm font-bold shadow-md hover:bg-[#edeae0] transition-all"
                >
                  <MapPin className="w-4 h-4 text-[#003629]" />
                  <span>{isHi ? "गाँव का नक्शा देखें" : "View Village Map"}</span>
                </a>
                <a
                  href="#demographics-glance"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-semibold backdrop-blur-sm transition-all border border-white/20"
                >
                  <BarChart3 className="w-4 h-4 text-[#ffb68c]" />
                  <span>{isHi ? "आँकड़े एवं जनगणना 2011" : "Census 2011 Data"}</span>
                </a>
              </div>
            </div>

            {/* Hero Right: Village Lane Photo Card */}
            <div className="lg:col-span-5">
              <div className="bg-white text-[#191e1b] rounded-2xl shadow-xl border border-[#ded6c7] overflow-hidden p-3 transition-transform hover:scale-[1.01] duration-300">
                <div className="relative w-full h-72 sm:h-80 rounded-xl overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={IMAGES.stitchHero}
                    alt="नारंगा गाँव की ग्रामीण पगडंडी और प्राकृतिक परिवेश"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 text-white">
                    <p className="text-xs font-bold tracking-wide text-[#baeed9]">
                      {isHi ? "ऐतिहासिक ग्रामीण दृश्य • परिहार सीमांचल" : "Rural Documentary • Parihar Border Region"}
                    </p>
                    <p className="text-xs text-white/90 mt-0.5">
                      {isHi ? "गाँव की पारंपरिक गलियाँ, घने नीम-आम के वृक्ष और उर्वर कृषि भूमि" : "Traditional village roads, peaceful groves, and rich agricultural horizons"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between px-2 pt-3 pb-1 text-[#5c625e] text-xs">
                  <span className="flex items-center gap-1.5 font-medium">
                    <Camera className="w-3.5 h-3.5 text-primary" />
                    <span>{isHi ? "पुरालेख संकलन / Village Archive" : "Documentary Archive"}</span>
                  </span>
                  <span className="font-mono text-[11px] bg-[#f4efe5] px-2 py-0.5 rounded text-[#154338] font-bold">
                    Geo-Tag: 26.83°N 85.52°E
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION B: गाँव का परिचय (Village Introduction & Administrative Attributes) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Visual: Agricultural Paddy Landscape */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white rounded-2xl p-3 shadow-sm border border-[#e5e0d3] overflow-hidden">
              <div className="relative w-full h-80 rounded-xl overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={IMAGES.stitchAgri}
                  alt="नारंगा के लहलहाते धान के खेत और किसान"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-white/90 backdrop-blur-sm text-primary text-xs font-bold shadow-sm">
                  {isHi ? "कृषि भूमि परिदृश्य" : "Agricultural Landscape"}
                </div>
              </div>
              <div className="p-3">
                <h4 className="font-headline text-base font-bold text-primary">
                  {isHi ? "हरित कृषि एवं तराई की उपजाऊ मिट्टी" : "Green Agriculture & Fertile Terai Soils"}
                </h4>
                <p className="text-xs text-[#5c625e] mt-1 leading-relaxed">
                  {isHi
                    ? "उत्तरी बिहार के लखनदेई और बागमती दोआब क्षेत्र में अवस्थित नारंगा की उपजाऊ जलोढ़ मिट्टी सदियों से समृद्ध धान और गेहूँ की उपज का आधार रही है।"
                    : "Located in the Lakhandei-Bagmati doab of northern Bihar, Naranga's alluvial soil supports robust paddy and wheat cultivation."}
                </p>
              </div>
            </div>

            {/* Archival Integrity Tag */}
            <div className="p-4 rounded-xl bg-white border border-[#e5e0d3] text-[#5c625e] flex items-start gap-3 shadow-2xs">
              <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div className="text-xs leading-relaxed">
                <strong className="text-[#191e1b]">{isHi ? "प्रशासनिक सत्यनिष्ठा: " : "Administrative Rigor: "}</strong>
                {isHi
                  ? "इस पोर्टल पर प्रदर्शित जनसांख्यिकीय डेटा भारत की आधिकारिक जनगणना (Census 2011) एवं राज्य निर्वाचन अभिलेखों पर आधारित है।"
                  : "All demographic metrics on this portal are drawn strictly from Census 2011 and official gazette publications."}
              </div>
            </div>
          </div>

          {/* Right: Detailed Introduction Prose */}
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 text-[#b84400] text-xs font-bold uppercase tracking-wider">
              <BookOpen className="w-4 h-4" />
              <span>{isHi ? "गाँव परिचय एवं भौगोलिक पृष्ठभूमि" : "Village Introduction & Geography"}</span>
            </div>

            <h2 className="font-headline text-2xl sm:text-3xl text-primary font-bold leading-tight">
              {isHi
                ? "सीतामढ़ी के सीमांचल में बसा गौरवशाली व कर्मठ ग्रामीण समाज"
                : "A Resilient Agricultural Community in Northern Bihar"}
            </h2>

            <div className="space-y-4 text-xs sm:text-sm text-[#191e1b] leading-relaxed">
              <p className="bg-white p-5 rounded-xl shadow-xs border border-[#e5e0d3]">
                <strong>{isHi ? "नारंगा (Naranga)" : "Naranga"}</strong>{" "}
                {isHi
                  ? "बिहार के सीतामढ़ी जिले के परिहार प्रखंड में स्थित एक ऐतिहासिक व वृहद गाँव है। यह पृष्ठ गाँव से जुड़ी भौगोलिक, जनसांख्यिकीय, कृषि, शैक्षणिक और सार्वजनिक सेवाओं की प्रामाणिक जानकारी एक मंच पर जनहित में उपलब्ध कराने के उद्देश्य से संकलित किया गया है।"
                  : "is a prominent rural village in Parihar Block of Sitamarhi District, Bihar. This civic repository unifies verified geographical, demographic, agricultural, and administrative records for residents, farmers, students, and citizens abroad."}
              </p>

              <p className="text-[#434a45]">
                {isHi
                  ? "यहाँ दी गई ऐतिहासिक जानकारी के साथ उसके स्रोत और संदर्भ वर्ष स्पष्ट रूप से अंकित किए गए हैं, ताकि पुराने अभिलेखों को वर्तमान स्थिति समझने का भ्रम न हो। 2011 की जनगणना के अनुसार, नारंगा परिहार प्रखंड के सबसे बड़े आबादी वाले ग्रामीण संकुलों में से एक है।"
                  : "All historical records are strictly dated to maintain transparency between foundational records and ongoing developments. Per Census 2011 records, Naranga is one of the most populous village jurisdictions in Parihar Block."}
              </p>

              <div className="bg-[#edeae0]/70 p-4 rounded-xl border border-[#ded6c7]">
                <p className="text-xs text-[#191e1b] font-medium italic leading-relaxed">
                  &ldquo;Naranga is a prominent rural community in Parihar Block of Sitamarhi District, Bihar (PIN 843324, Census Village Code 219122). Known for its hardworking farmers, rich cultural harmony, and traditional Mithila-Bajjika heritage.&rdquo;
                </p>
              </div>
            </div>

            {/* Quick Stats Summary Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1">
              <div className="bg-white p-3.5 rounded-xl border border-[#e5e0d3]">
                <span className="text-[11px] text-[#7c837d] block font-medium">{isHi ? "मुख्य भाषा" : "Primary Language"}</span>
                <span className="font-headline text-base font-bold text-primary">{isHi ? "बज्जिका / हिंदी" : "Bajjika / Hindi"}</span>
                <span className="text-[11px] text-[#5c625e] block mt-0.5">{isHi ? "उर्दू भाषी समुदाय भी" : "Urdu speakers also"}</span>
              </div>
              <div className="bg-white p-3.5 rounded-xl border border-[#e5e0d3]">
                <span className="text-[11px] text-[#7c837d] block font-medium">{isHi ? "भौगोलिक क्षेत्र" : "Geographic Area"}</span>
                <span className="font-headline text-base font-bold text-primary">1,963 Ha</span>
                <span className="text-[11px] text-[#5c625e] block mt-0.5">{isHi ? "~4,850 एकड़ विस्तार" : "~4,850 acres"}</span>
              </div>
              <div className="bg-white p-3.5 rounded-xl border border-[#e5e0d3] col-span-2 sm:col-span-1">
                <span className="text-[11px] text-[#7c837d] block font-medium">{isHi ? "अंतर्राष्ट्रीय सीमा" : "Border Proximity"}</span>
                <span className="font-headline text-base font-bold text-[#b84400]">~5 km</span>
                <span className="text-[11px] text-[#5c625e] block mt-0.5">{isHi ? "नेपाल सीमा सन्निकट" : "Near Indo-Nepal Border"}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION C: गाँव के प्रमुख आँकड़े (Census 2011 Verified Statistics Dashboard) */}
      <section className="w-full bg-[#f4efe5] py-12 lg:py-16 border-y border-[#e5e0d3]" id="demographics-glance">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-[#b84400] tracking-wider uppercase flex items-center gap-1.5">
                <BarChart3 className="w-4 h-4 text-[#b84400]" />
                <span>{isHi ? "आधिकारिक सांख्यिकी संक्षेप • Census 2011 Records" : "Census 2011 Verified Statistics"}</span>
              </span>
              <h2 className="font-headline text-2xl sm:text-3xl text-primary font-extrabold mt-1">
                {isHi ? "गाँव के मुख्य आँकड़े (जनगणना 2011 के अनुसार)" : "Key Historical Statistics (Per Census 2011)"}
              </h2>
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-white text-[#5c625e] text-xs font-medium flex items-center gap-2 border border-[#ded6c7] shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
              <span>{isHi ? "स्रोत: भारत की जनगणना 2011 (कार्यालय महापंजीयक)" : "Source: Office of the Registrar General, Census 2011"}</span>
            </div>
          </div>

          {/* 6 Metric Cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {CENSUS_STATS.map((stat) => (
              <div
                key={stat.id}
                className="bg-white rounded-xl p-4 shadow-xs border border-[#ded6c7] flex flex-col justify-between hover:border-primary transition-colors"
              >
                <div className="text-[11px] font-bold text-[#5c625e] leading-snug">
                  {isHi ? stat.labelHi : stat.labelEn}
                </div>
                <div className="my-3">
                  {stat.isCodes ? (
                    <div className="space-y-1">
                      <div className="text-xs">
                        <strong className="text-[#191e1b]">Census: </strong>
                        <span className="font-bold text-primary">{stat.censusCode}</span>
                      </div>
                      <div className="text-xs">
                        <strong className="text-[#191e1b]">LGD: </strong>
                        <span className="font-bold text-primary">{stat.lgdCode}</span>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="font-headline text-2xl sm:text-3xl font-extrabold text-primary">
                        {stat.value}
                      </div>
                      <div className="text-[11px] text-[#7c837d] mt-0.5 font-medium">
                        {isHi ? stat.subHi : stat.subEn}
                      </div>
                    </>
                  )}
                </div>
                <div className="px-2 py-0.5 bg-[#fbf8f0] rounded text-[#5c625e] text-[10px] font-semibold w-fit border border-[#e5e0d3]">
                  {stat.source}
                </div>
              </div>
            ))}
          </div>

          {/* Transparent Disclaimer Box */}
          <div className="bg-white rounded-xl p-5 border border-[#ded6c7] flex items-start gap-4 shadow-xs">
            <Info className="w-5 h-5 text-[#b84400] shrink-0 mt-0.5" />
            <div className="space-y-1 text-xs leading-relaxed text-[#434a45]">
              <strong className="text-[#191e1b]">
                {isHi ? "जनगणना 2011 के अनुसार ऐतिहासिक सांख्यिकी सूचना: " : "Census 2011 Historical Disclosure: "}
              </strong>
              {isHi
                ? "ये आँकड़े ऐतिहासिक जनगणना 2011 के अनुसार हैं। वर्तमान समय में स्वाभाविक वृद्धि के कारण जनसंख्या और परिवारों की संख्या में परिवर्तन स्वाभाविक है। बिना आधिकारिक गजट अधिसूचना के कोई भी काल्पनिक या अनुमानित 2026 आँकड़ा इस पोर्टल पर प्रकाशित नहीं किया गया है।"
                : "All figures represent historical Census 2011 data. Current village numbers may differ. In accordance with strict data integrity, no fabricated 2026 population projections are published."}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION D: गाँव का इतिहास और विकास (History & Progressive Development) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-12 lg:py-16">
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-wider">
            <Landmark className="w-4 h-4" />
            <span>{isHi ? "धरोहर एवं कालक्रम • History & Heritage" : "Heritage & Evolution"}</span>
          </div>

          <h2 className="font-headline text-2xl sm:text-3xl text-primary font-extrabold">
            {isHi ? "गाँव का इतिहास, विकास एवं सामुदायिक प्रयास" : "Village History & Development"}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-[#ded6c7] shadow-xs space-y-3">
              <span className="px-2.5 py-1 rounded bg-[#eff4ff] text-[#003629] text-[11px] font-bold">
                {isHi ? "ऐतिहासिक पृष्ठभूमि" : "Historical Context"}
              </span>
              <h3 className="font-headline text-base font-bold text-[#191e1b]">
                {isHi ? "सीमांचल का पारंपरिक कृषि समाज" : "Border Agricultural Society"}
              </h3>
              <p className="text-xs text-[#5c625e] leading-relaxed">
                {isHi
                  ? "नारंगा गाँव उत्तर बिहार के प्राचीन मिथिला क्षेत्र का हिस्सा रहा है। नेपाल सीमा के निकट स्थित होने के कारण यहाँ सदियों से पारंपरिक हाट, कृषि विनिमय और साझा लोक-संस्कृति फलती-फूलती रही है।"
                  : "Naranga forms part of the ancient Mithila agrarian belt in North Bihar. Its border location fostered centuries of rural trade, peaceful community life, and shared traditions."}
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#ded6c7] shadow-xs space-y-3">
              <span className="px-2.5 py-1 rounded bg-[#eff4ff] text-[#003629] text-[11px] font-bold">
                {isHi ? "शिक्षा व जन-सुविधाओं का विकास" : "Social & Educational Growth"}
              </span>
              <h3 className="font-headline text-base font-bold text-[#191e1b]">
                {isHi ? "शैक्षणिक संस्थानों का विस्तार" : "Schooling & Infrastructure"}
              </h3>
              <p className="text-xs text-[#5c625e] leading-relaxed">
                {isHi
                  ? "समय के साथ गाँव में प्राथमिक एवं मध्य विद्यालयों की स्थापना हुई। 'राजकीय मध्य विद्यालय' (M.S. Chandpura Urdu Middle School) सहित प्राथमिक शालाओं ने ग्रामीण साक्षरता के प्रसार में महत्वपूर्ण योगदान दिया।"
                  : "Over the decades, elementary and middle schooling expanded through institutions like M.S. Chandpura Urdu Middle School and primary clusters, improving rural literacy."}
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#ded6c7] shadow-xs space-y-3">
              <span className="px-2.5 py-1 rounded bg-[#eff4ff] text-[#003629] text-[11px] font-bold">
                {isHi ? "इतिहास संकलन स्थिति" : "Historical Archiving Status"}
              </span>
              <h3 className="font-headline text-base font-bold text-[#191e1b]">
                {isHi ? "प्रामाणिक इतिहास संकलन जारी" : "Authentic Documentation Ongoing"}
              </h3>
              <p className="text-xs text-[#5c625e] leading-relaxed">
                {isHi
                  ? "गाँव के विस्तृत प्राचीन इतिहास, स्वतंत्रता संग्राम सेनानियों और बुजुर्गों की मौखिक स्मृतियों को प्रामाणिक रूप से संकलित किया जा रहा है। यदि आपके पास प्रमाणित वंशावली या दस्तावेज हों, तो पोर्टल पर अवश्य साझा करें।"
                  : "Detailed oral histories and local freedom-fighter accounts are being gathered from elder residents. Factual submissions from community members are invited below."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION E: भौगोलिक स्थिति और आसपास का क्षेत्र (Location, Coordinates & Map) */}
      <section className="w-full bg-[#f4efe5] py-12 lg:py-16 border-y border-[#e5e0d3]" id="village-map">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-[#b84400] tracking-wider uppercase flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#b84400]" />
                <span>{isHi ? "स्थान मानचित्र • Village Cartography" : "Location Cartography"}</span>
              </span>
              <h2 className="font-headline text-2xl sm:text-3xl text-primary font-extrabold mt-1">
                {isHi ? "भौगोलिक अवस्थिति एवं प्रशासनिक संदर्भ" : "Geographical Coordinates & Distances"}
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <a
                href="https://maps.google.com/?q=Naranga,Parihar,Sitamarhi,Bihar"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white text-xs font-bold shadow-sm hover:bg-[#1b4d3e] transition-all"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Open in Google Maps</span>
              </a>
            </div>
          </div>

          <div className="bg-white rounded-2xl overflow-hidden shadow-xs border border-[#ded6c7]">
            <div
              className="w-full h-80 sm:h-96 bg-cover bg-center relative p-6 flex flex-col justify-end"
              style={{ backgroundImage: `url('${IMAGES.mapBg}')` }}
            >
              <div className="bg-white/95 backdrop-blur-md p-5 rounded-xl shadow-md max-w-md border border-[#ded6c7] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-primary flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-[#E06D14]" />
                    <span>{isHi ? "नारंगा ग्राम केंद्रबिंदु (Centroid)" : "Naranga Village Centroid"}</span>
                  </span>
                  <span className="px-2 py-0.5 rounded bg-[#f4efe5] text-[11px] font-mono text-[#5c625e] font-bold">
                    26.8° N, 85.5° E
                  </span>
                </div>
                <p className="text-xs text-[#5c625e] leading-relaxed">
                  {isHi
                    ? "सीतामढ़ी जिला मुख्यालय से लगभग 30 किमी उत्तर-पूर्व तथा परिहार प्रखंड मुख्यालय से लगभग 9 किमी की दूरी पर अवस्थित।"
                    : "Approx. 30 km north-east of Sitamarhi Sadar District HQ and approx. 9 km from Parihar Block HQ."}
                </p>
                <div className="grid grid-cols-3 gap-2 pt-1 text-center text-xs">
                  <div className="bg-[#fbf8f0] p-2 rounded">
                    <span className="block text-[10px] text-[#7c837d]">{isHi ? "प्रखंड HQ" : "Block HQ"}</span>
                    <span className="font-bold text-primary">~8-10 km</span>
                  </div>
                  <div className="bg-[#fbf8f0] p-2 rounded">
                    <span className="block text-[10px] text-[#7c837d]">{isHi ? "सीतामढ़ी" : "Sitamarhi"}</span>
                    <span className="font-bold text-primary">~28-32 km</span>
                  </div>
                  <div className="bg-[#fbf8f0] p-2 rounded">
                    <span className="block text-[10px] text-[#7c837d]">{isHi ? "नेपाल सीमा" : "Border"}</span>
                    <span className="font-bold text-[#b84400]">~4-6 km</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-3 bg-[#f4efe5] text-[#5c625e] text-[11px] flex items-center justify-between flex-wrap gap-2">
              <span>⚠️ <strong>{isHi ? "डिस्क्लेमर: " : "Disclaimer: "}</strong>{isHi ? "यह मानचित्र सांकेतिक ग्राम केंद्रबिंदु प्रदर्शित करता है; यह विधिक भू-अभिलेख सीमा नहीं है।" : "Display shows approximate centroid; not intended for cadastral or boundary settlement."}</span>
              <span className="font-mono text-[#7c837d]">Projection: WGS84</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION F: कृषि और ग्रामीण अर्थव्यवस्था (Agriculture & Land Use) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-12 lg:py-16 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-[#b84400] tracking-wider uppercase flex items-center gap-1.5">
              <Sprout className="w-4 h-4 text-[#b84400]" />
              <span>{isHi ? "आजीविका एवं कृषि भूमि • Agrarian Foundation" : "Agrarian Livelihood"}</span>
            </span>
            <h2 className="font-headline text-2xl sm:text-3xl text-primary font-extrabold mt-1">
              {isHi ? "कृषि, भूमि उपयोग एवं मुख्य फसलें" : "Agriculture & Land Use Records"}
            </h2>
          </div>
          <span className="text-xs text-[#5c625e] font-medium">
            {isHi ? "ऐतिहासिक राजस्व रिकॉर्ड अनुसार" : "Per Historical Revenue & Census Records"}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Proportional Land Breakdown */}
          <div className="lg:col-span-6 bg-white p-6 rounded-2xl border border-[#ded6c7] shadow-xs space-y-5">
            <h3 className="font-headline text-base font-bold text-primary">
              {isHi ? "अभिलेखित भूमि उपयोग आँकड़े (Recorded Land Use)" : "Recorded Historical Land Use"}
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-[#fbf8f0] border border-[#e5e0d3]">
                <span className="text-[11px] text-[#7c837d] block">{isHi ? "शुद्ध बोया गया क्षेत्र" : "Net Sown Area"}</span>
                <span className="font-headline text-2xl font-bold text-primary">1,397 Ha</span>
                <span className="text-[11px] text-[#5c625e]">{isHi ? "कुल भूमि का ~71.1%" : "~71.1% of Area"}</span>
              </div>
              <div className="p-4 rounded-xl bg-[#fbf8f0] border border-[#e5e0d3]">
                <span className="text-[11px] text-[#7c837d] block">{isHi ? "सिंचित क्षेत्र" : "Irrigated Area"}</span>
                <span className="font-headline text-2xl font-bold text-[#b84400]">51.4 Ha</span>
                <span className="text-[11px] text-[#5c625e]">{isHi ? "नहर / नलकूप साधन" : "Canal / Borewell"}</span>
              </div>
              <div className="p-4 rounded-xl bg-[#fbf8f0] border border-[#e5e0d3]">
                <span className="text-[11px] text-[#7c837d] block">{isHi ? "असिंचित क्षेत्र" : "Unirrigated Area"}</span>
                <span className="font-headline text-2xl font-bold text-[#191e1b]">1,345.6 Ha</span>
                <span className="text-[11px] text-[#5c625e]">{isHi ? "वर्षा आधारित" : "Rainfed"}</span>
              </div>
              <div className="p-4 rounded-xl bg-[#fbf8f0] border border-[#e5e0d3]">
                <span className="text-[11px] text-[#7c837d] block">{isHi ? "मुख्य दर्ज फसल" : "Principal Crop"}</span>
                <span className="font-headline text-xl font-bold text-emerald-800">धान / Paddy</span>
                <span className="text-[11px] text-[#5c625e]">{isHi ? "रबी में गेहूँ एवं दलहन" : "Rabi: Wheat, Pulses"}</span>
              </div>
            </div>

            {/* Visualizer Bar */}
            <div className="space-y-2 pt-2">
              <div className="flex justify-between text-xs text-[#5c625e] font-semibold">
                <span>{isHi ? "भूमि वितरण अनुपात" : "Land Distribution"}</span>
                <span>1,963 Ha Total</span>
              </div>
              <div className="w-full h-3 bg-[#edeae0] rounded-full overflow-hidden flex shadow-inner">
                <div className="bg-[#003629] h-full" style={{ width: "71.1%" }} title="Net Sown: 71.1%"></div>
                <div className="bg-[#E06D14] h-full" style={{ width: "2.6%" }} title="Irrigated: 2.6%"></div>
                <div className="bg-[#c9c6be] h-full" style={{ width: "26.3%" }} title="Settlement/Other: 26.3%"></div>
              </div>
            </div>
          </div>

          {/* Seasonal Advisory & Government Links */}
          <div className="lg:col-span-6 space-y-4">
            <div className="p-5 rounded-2xl bg-white border border-[#ded6c7] shadow-xs space-y-3">
              <h4 className="font-headline text-base font-bold text-primary">
                {isHi ? "कृषि फसल चक्र एवं मौसम" : "Agricultural Crop Cycles"}
              </h4>
              <p className="text-xs text-[#5c625e] leading-relaxed">
                {isHi
                  ? "नारंगा की अर्थव्यवस्था का मुख्य आधार धान (खरीफ) और गेहूँ (रबी) की खेती है। मानसून की वर्षा और भूजल स्तर फसल उत्पादन में महत्वपूर्ण भूमिका निभाते हैं।"
                  : "Agriculture constitutes the primary livelihood pillar. Paddy forms the primary Kharif crop, followed by Wheat, Maize, and Pulses during Rabi season."}
              </p>
              <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                <a
                  href="https://dbtagriculture.bihar.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg bg-[#fbf8f0] hover:bg-[#edeae0] text-primary font-bold flex items-center justify-between transition-colors border border-[#e5e0d3]"
                >
                  <span>DBT Krishi Bihar</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <a
                  href="https://pmkisan.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg bg-[#fbf8f0] hover:bg-[#edeae0] text-primary font-bold flex items-center justify-between transition-colors border border-[#e5e0d3]"
                >
                  <span>PM-KISAN Portal</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION G: संस्कृति, परंपरा और सामाजिक जीवन (Culture & Social Life) */}
      <section className="w-full bg-[#f4efe5] py-12 lg:py-16 border-y border-[#e5e0d3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-[#b84400] tracking-wider uppercase flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#b84400]" />
                <span>{isHi ? "लोक संस्कृति एवं परंपरा • Folk Heritage" : "Folk Traditions & Harmony"}</span>
              </span>
              <h2 className="font-headline text-2xl sm:text-3xl text-primary font-extrabold mt-1">
                {isHi ? "संस्कृति, लोक पर्व एवं सामाजिक सद्भाव" : "Culture, Festivals & Social Harmony"}
              </h2>
            </div>
            <p className="text-xs text-[#5c625e] max-w-md">
              {isHi
                ? "नारंगा का सामाजिक ताना-बाना मिथिला-बज्जिका संस्कृति और आपसी सद्भाव की अनूठी मिसाल है।"
                : "A culturally rich community knit together with Mithila-Bajjika folk traditions."}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl p-5 border border-[#ded6c7] shadow-xs space-y-2">
              <span className="text-xl">☀️</span>
              <h4 className="font-headline text-base font-bold text-[#191e1b]">छठ महापर्व</h4>
              <p className="text-xs text-[#5c625e] leading-relaxed">
                {isHi
                  ? "गाँव के पोखरों और नहर घाटों पर सूर्योपासना का चार दिवसीय पावन लोक अनुष्ठान।"
                  : "Four-day solar devotion celebrated at local village ponds and water banks."}
              </p>
            </div>
            <div className="bg-white rounded-xl p-5 border border-[#ded6c7] shadow-xs space-y-2">
              <span className="text-xl">🛕</span>
              <h4 className="font-headline text-base font-bold text-[#191e1b]">दुर्गा पूजा व मेला</h4>
              <p className="text-xs text-[#5c625e] leading-relaxed">
                {isHi
                  ? "नारंगा बाजार क्षेत्र में शारदीय नवरात्र के दौरान भव्य पूजा, झाँकियाँ एवं हाट मेला।"
                  : "Annual Shardiya Navratri festivities and bustling community bazaar fair."}
              </p>
            </div>
            <div className="bg-white rounded-xl p-5 border border-[#ded6c7] shadow-xs space-y-2">
              <span className="text-xl">🎨</span>
              <h4 className="font-headline text-base font-bold text-[#191e1b]">होली (फगुआ)</h4>
              <p className="text-xs text-[#5c625e] leading-relaxed">
                {isHi
                  ? "पारंपरिक बज्जिका जोगिरा, ढोल-मंजीरे की तान और रंगों का पावन भाईचारा।"
                  : "Traditional folk Jogira songs, dholak rhythms, and spring color celebrations."}
              </p>
            </div>
            <div className="bg-white rounded-xl p-5 border border-[#ded6c7] shadow-xs space-y-2">
              <span className="text-xl">🌙</span>
              <h4 className="font-headline text-base font-bold text-[#191e1b]">ईद व सामाजिक सौहार्द</h4>
              <p className="text-xs text-[#5c625e] leading-relaxed">
                {isHi
                  ? "गाँव की जामा मस्जिद और ईदगाह पर सामूहिक नमाज, सेवइयों की मिठास और पारस्परिक भाईचारा।"
                  : "Shared brotherhood, Friday and Eid prayers representing social solidarity."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION H: शिक्षा और स्वास्थ्य (Education & Healthcare) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-12 lg:py-16 space-y-8">
        <div className="space-y-2">
          <span className="text-xs font-bold text-primary tracking-wider uppercase flex items-center gap-1.5">
            <GraduationCap className="w-4 h-4 text-primary" />
            <span>{isHi ? "सामाजिक अवसंरचना • Social Infrastructure" : "Education & Health Facilities"}</span>
          </span>
          <h2 className="font-headline text-2xl sm:text-3xl text-primary font-extrabold">
            {isHi ? "शिक्षा एवं स्वास्थ्य सुविधाएँ" : "Education & Healthcare in Naranga"}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Education Box */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#ded6c7] shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <GraduationCap className="w-8 h-8 text-primary" />
              <span className="px-3 py-1 rounded-full bg-[#f4efe5] text-xs font-semibold text-primary">
                {isHi ? "शैक्षणिक संस्थान" : "Educational Institutions"}
              </span>
            </div>
            <h3 className="font-headline text-lg font-bold text-[#191e1b]">
              {isHi ? "विद्यालय एवं शैक्षणिक संकुल" : "Schools & Literacy Infrastructure"}
            </h3>
            <div className="space-y-3 text-xs text-[#5c625e] leading-relaxed">
              <div className="p-3.5 rounded-xl bg-[#fbf8f0] border border-[#e5e0d3]">
                <strong className="text-[#191e1b] block">{isHi ? "डायरेक्टरी-सूचीबद्ध मध्य विद्यालय:" : "Directory-Listed Institution:"}</strong>
                <span>M.S. Chandpura Urdu Middle School (कक्षा 1 से 8)</span>
              </div>
              <p>
                {isHi
                  ? "ऐतिहासिक अभिलेखों के अनुसार वृत्त क्षेत्र में 6 प्राथमिक एवं मध्य विद्यालय संकुल कार्यरत रहे हैं। छात्र-छात्राएं उच्च शिक्षा हेतु परिहार व सीतामढ़ी के महाविद्यालयों पर निर्भर हैं।"
                  : "Historical education directories register elementary clusters serving Wards 1 to 14. Students commute to Parihar or Sitamarhi Sadar for higher collegiate programs."}
              </p>
            </div>
            <Link href="/education" className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline pt-2">
              <span>{isHi ? "शिक्षा पृष्ठ विस्तार से देखें →" : "View Education Page →"}</span>
            </Link>
          </div>

          {/* Healthcare Box */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#ded6c7] shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <Hospital className="w-8 h-8 text-[#b84400]" />
              <span className="px-3 py-1 rounded-full bg-[#ffece2] text-xs font-semibold text-[#b84400]">
                {isHi ? "प्राथमिक स्वास्थ्य" : "Primary Healthcare"}
              </span>
            </div>
            <h3 className="font-headline text-lg font-bold text-[#191e1b]">
              {isHi ? "स्वास्थ्य उपकेंद्र एवं आपातकालीन चिकित्सा" : "Health Sub-Centre & Emergency Care"}
            </h3>
            <div className="space-y-3 text-xs text-[#5c625e] leading-relaxed">
              <div className="p-3.5 rounded-xl bg-[#fbf8f0] border border-[#e5e0d3]">
                <strong className="text-[#191e1b] block">{isHi ? "उपलब्ध सेवाएँ:" : "Services:"}</strong>
                <span>स्वास्थ्य उपकेंद्र (HSC), मातृ एवं बाल टीकाकरण, एएनएम व आशा नेटवर्क</span>
              </div>
              <p>
                {isHi
                  ? "गंभीर आपातकाल में परिहार प्रखंड प्राथमिक स्वास्थ्य केंद्र (PHC) तथा सीतामढ़ी सदर अस्पताल मुख्य रेफरल केंद्र हैं। 24x7 निःशुल्क एम्बुलेंस सेवा हेतु 108 या 102 डायल करें।"
                  : "Primary care is supported by local health sub-centres and ASHA workers. Referrals connect to Parihar PHC (~9 km) and Sitamarhi District Hospital. Dial 108/102 for emergency ambulance."}
              </p>
            </div>
            <Link href="/health" className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline pt-2">
              <span>{isHi ? "स्वास्थ्य पृष्ठ विस्तार से देखें →" : "View Health Page →"}</span>
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION I: गाँव के प्रमुख स्थान (Landmarks Gallery) */}
      <section className="w-full bg-[#f4efe5] py-12 lg:py-16 border-y border-[#e5e0d3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 space-y-8">
          <div className="space-y-2">
            <span className="text-xs font-bold text-primary tracking-wider uppercase flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-primary" />
              <span>{isHi ? "धरोहर एवं प्रमुख स्थल • Village Landmarks" : "Local Landmarks"}</span>
            </span>
            <h2 className="font-headline text-2xl sm:text-3xl text-primary font-extrabold">
              {isHi ? "नारंगा के प्रमुख दर्शनीय एवं ऐतिहासिक स्थल" : "Key Places & Heritage in Naranga"}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PLACES_DATA.slice(0, 4).map((place) => (
              <div
                key={place.id}
                className="bg-white rounded-2xl overflow-hidden shadow-xs border border-[#ded6c7] flex flex-col justify-between"
              >
                <div>
                  {place.hasRealPhoto && place.photoUrl ? (
                    <div
                      className="relative h-48 w-full bg-cover bg-center"
                      style={{ backgroundImage: `url('${place.photoUrl}')` }}
                    >
                      <span className="absolute top-3 left-3 px-2 py-0.5 rounded bg-emerald-800 text-white text-[10px] font-bold">
                        {place.badge}
                      </span>
                    </div>
                  ) : (
                    <div className="relative h-48 w-full bg-[#f4efe5] flex flex-col items-center justify-center p-4 text-center">
                      {getPlaceIcon(place.icon)}
                      <span className="px-2 py-0.5 rounded bg-[#ffece2] text-[#b84400] text-[10px] font-bold mt-2">
                        {place.badge}
                      </span>
                    </div>
                  )}

                  <div className="p-4 space-y-1">
                    <h4 className="font-headline text-sm font-bold text-[#191e1b]">
                      {isHi ? place.nameHi : place.nameEn}
                    </h4>
                    <p className="text-xs text-[#5c625e] leading-relaxed pt-1">
                      {isHi ? place.descHi : place.descEn}
                    </p>
                  </div>
                </div>

                <div className="p-4 pt-0 border-t border-[#f4efe5] mt-2 flex items-center justify-between text-[11px] text-[#7c837d]">
                  <span>{place.credit}</span>
                  <Link href="/places" className="text-primary font-bold hover:underline">
                    {isHi ? "विवरण देखें" : "View Details"}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION J: प्रमुख व्यक्ति और गाँव का योगदान (People & Achievers) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-12 lg:py-16">
        <div className="bg-white rounded-2xl p-6 sm:p-10 border border-[#ded6c7] shadow-xs space-y-6">
          <div className="max-w-3xl space-y-2">
            <span className="text-xs font-bold text-primary uppercase tracking-wider flex items-center gap-1.5">
              <Users className="w-4 h-4 text-primary" />
              <span>{isHi ? "सामुदायिक गौरव • Community Achievers" : "Community Achievers"}</span>
            </span>
            <h3 className="font-headline text-2xl font-bold text-[#191e1b]">
              {isHi ? "पारदर्शी नामांकन नीति: हमारे लोग, हमारी पहचान" : "People of Naranga: Community Nominees"}
            </h3>
            <p className="text-xs sm:text-sm text-[#5c625e] leading-relaxed">
              {isHi
                ? "यह पोर्टल बिना दस्तावेजी साक्ष्य या ग्राम समुदाय के सत्यापन के किसी भी काल्पनिक व्यक्तित्व का दावा नहीं करता है। नारंगा की वास्तविक प्रेरणा यहाँ के समर्पित शिक्षक, मेहनती किसान, होनहार छात्र और कर्मठ समाजसेवी हैं।"
                : "No fabricated names or AI portraits are published. Real teachers, progressive farmers, and young achievers are verified via community nominations."}
            </p>
          </div>

          <div className="p-5 rounded-xl bg-[#fbf8f0] border border-[#e5e0d3] text-center max-w-xl mx-auto space-y-3">
            <Award className="w-10 h-10 text-[#b84400] mx-auto" />
            <p className="text-xs sm:text-sm font-semibold text-[#191e1b]">
              {isHi
                ? "“नारंगा गाँव की प्रेरणादायक हस्तियों की जानकारी सत्यापन के बाद यहाँ जोड़ी जाएगी।”"
                : "“Profiles of inspiring residents of Naranga will be published here upon verification.”"}
            </p>
            <Link
              href="/contact?type=nomination"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-white text-xs font-bold shadow-xs hover:bg-[#1b4d3e] transition-all"
            >
              <span>{isHi ? "किसी प्रेरक व्यक्ति को नामांकित करें" : "Nominate an Achiever"}</span>
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION K: गाँव का विकास और भविष्य (Vision & Future Priorities) */}
      <section className="w-full bg-[#f4efe5] py-12 lg:py-16 border-y border-[#e5e0d3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold text-primary tracking-wider uppercase flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-primary" />
              <span>{isHi ? "भविष्य की दिशा • Development Priorities" : "Village Future Vision"}</span>
            </span>
            <h2 className="font-headline text-2xl sm:text-3xl text-primary font-extrabold">
              {isHi ? "गाँव का विकास, प्राथमिकताएँ और भविष्य" : "Development Goals & Community Vision"}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-xl border border-[#ded6c7] shadow-xs space-y-2">
              <span className="text-primary font-bold text-base">01. शिक्षा सुदृढ़ीकरण</span>
              <p className="text-xs text-[#5c625e] leading-relaxed">
                {isHi ? "प्राथमिक व मध्य विद्यालयों में डिजिटल साक्षरता और बालिकाओं के उच्चतर अध्ययन हेतु प्रोत्साहन।" : "Advancing digital literacy and supporting girl-child higher education."}
              </p>
            </div>
            <div className="bg-white p-5 rounded-xl border border-[#ded6c7] shadow-xs space-y-2">
              <span className="text-primary font-bold text-base">02. सिंचाई व कृषि आधुनिकीकरण</span>
              <p className="text-xs text-[#5c625e] leading-relaxed">
                {isHi ? "सौर ऊर्जा आधारित बोरिंग, समय पर खाद-बीज उपलब्धता और फसल बीमा सुरक्षा।" : "Solar borewells, timely seed distribution, and crop insurance coverage."}
              </p>
            </div>
            <div className="bg-white p-5 rounded-xl border border-[#ded6c7] shadow-xs space-y-2">
              <span className="text-primary font-bold text-base">03. सड़क व जल निकासी</span>
              <p className="text-xs text-[#5c625e] leading-relaxed">
                {isHi ? "गाँव की आंतरिक गलियों में पक्की सड़क एवं वर्षा जल निकासी हेतु सुदृढ़ नाली निर्माण।" : "Internal paved all-weather roads and improved monsoon drainage."}
              </p>
            </div>
            <div className="bg-white p-5 rounded-xl border border-[#ded6c7] shadow-xs space-y-2">
              <span className="text-primary font-bold text-base">04. डिजिटल पंचायत सेवाएँ</span>
              <p className="text-xs text-[#5c625e] leading-relaxed">
                {isHi ? "प्रमाण पत्रों एवं पेंशन योजनाओं हेतु पारदर्शी ग्राम सूचना केंद्र की उपलब्धता।" : "Transparent digital public certificate issuance and pension status tracking."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION L: योगदान दें / जानकारी अपडेट करें (Community Contribution Form) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-12 lg:py-16" id="community-contribution">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#ded6c7] shadow-md grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 space-y-4">
            <span className="px-3 py-1 rounded-full bg-[#f4efe5] text-primary text-xs font-bold uppercase tracking-wider">
              {isHi ? "सहयोगात्मक ग्राम संवर्धन" : "Collaborative Archiving"}
            </span>
            <h3 className="font-headline text-2xl font-bold text-[#191e1b] leading-tight">
              {isHi ? "पोर्टल को समृद्ध बनाएँ: अपनी जानकारी या सुझाव साझा करें" : "Contribute Verified Village Records"}
            </h3>
            <p className="text-xs sm:text-sm text-[#5c625e] leading-relaxed">
              {isHi
                ? "यदि आपके पास नारंगा गाँव के इतिहास, किसी ऐतिहासिक स्थल के प्रामाणिक फोटो, पुरानी वंशावली, स्वतंत्रता सेनानियों अथवा किसी उल्लेखनीय नागरिक की जानकारी है, तो कृपया नीचे दिए गए फॉर्म के माध्यम से साझा करें।"
                : "Submit authentic photographs, oral historical milestones, or corrections. All entries undergo editorial review before publication."}
            </p>
            <div className="p-4 rounded-xl bg-[#fbf8f0] text-xs text-[#5c625e] space-y-1 border border-[#e5e0d3]">
              <strong className="text-[#191e1b] block">{isHi ? "गोपनीयता एवं संपादकीय सुरक्षा:" : "Editorial Privacy:"}</strong>
              <span>{isHi ? "आपकी संपर्क जानकारी सार्वजनिक नहीं की जाएगी।" : "Private contact data is never exposed publicly."}</span>
            </div>
          </div>

          {/* Submission Form */}
          <div className="lg:col-span-7 bg-[#fbf8f0] p-6 rounded-2xl border border-[#ded6c7]">
            {submissionSuccess ? (
              <div className="text-center py-8 space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="font-headline text-lg font-bold text-[#191e1b]">
                  {isHi ? "प्रविष्टि सफलतापूर्वक प्राप्त हुई!" : "Submission Received!"}
                </h4>
                <p className="text-xs text-[#5c625e] max-w-sm mx-auto">
                  {isHi ? "समीक्षा और सत्यापन के उपरांत यह जानकारी पोर्टल पर जोड़ी जाएगी।" : "Your entry will be reviewed and published upon verification."}
                </p>
                <button
                  onClick={() => setSubmissionSuccess(false)}
                  className="px-4 py-2 bg-primary text-white rounded text-xs font-bold"
                >
                  {isHi ? "अन्य जानकारी भेजें" : "Submit Another Entry"}
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-[#191e1b] mb-1">
                    {isHi ? "आपका नाम / Your Name *" : "Your Name *"}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={isHi ? "उदा. विकास कुमार" : "e.g. Vikas Kumar"}
                    className="w-full px-3 py-2 rounded-lg border border-[#c0c9c3] bg-white outline-none focus:border-primary"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-[#191e1b] mb-1">
                      {isHi ? "संपर्क (मोबाइल / ईमेल)" : "Contact (Mobile / Email)"}
                    </label>
                    <input
                      type="text"
                      value={formData.contact}
                      onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                      placeholder="+91-XXXXX XXXXX"
                      className="w-full px-3 py-2 rounded-lg border border-[#c0c9c3] bg-white outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-[#191e1b] mb-1">
                      {isHi ? "श्रेणी / Category" : "Category"}
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-[#c0c9c3] bg-white outline-none focus:border-primary"
                    >
                      <option value="historical_info">{isHi ? "ऐतिहासिक जानकारी (History)" : "History"}</option>
                      <option value="photo">{isHi ? "गाँव की तस्वीर (Photo)" : "Photo"}</option>
                      <option value="place">{isHi ? "स्थानीय स्थल (Place)" : "Place"}</option>
                      <option value="nomination">{isHi ? "प्रेरक व्यक्ति नामांकन (Nomination)" : "Nomination"}</option>
                      <option value="correction">{isHi ? "डेटा सुधार (Correction)" : "Correction"}</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-[#191e1b] mb-1">
                    {isHi ? "विस्तृत विवरण एवं स्रोत *" : "Detailed Description & Source *"}
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.details}
                    onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                    placeholder={isHi ? "स्थान, घटना या सुधार का विवरण लिखें..." : "Enter details..."}
                    className="w-full px-3 py-2 rounded-lg border border-[#c0c9c3] bg-white outline-none focus:border-primary"
                  />
                </div>

                <div className="flex items-start gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="consentCheckbox"
                    required
                    checked={formData.consent}
                    onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                    className="mt-0.5 rounded text-primary focus:ring-primary w-4 h-4 cursor-pointer"
                  />
                  <label htmlFor="consentCheckbox" className="text-[11px] text-[#5c625e] leading-snug cursor-pointer">
                    {isHi
                      ? "मैं प्रमाणित करता हूँ कि यह जानकारी सत्य है और सार्वजनिक प्रकाशन हेतु मेरी सहमति है।"
                      : "I verify that this information is accurate and give consent for civic publication."}
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-2.5 bg-primary text-white rounded-lg font-bold hover:bg-[#1b4d3e] transition-colors flex items-center justify-center gap-1.5 shadow-xs disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{submitting ? (isHi ? "भेजा जा रहा है..." : "Submitting...") : (isHi ? "जानकारी जमा करें" : "Submit Information")}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* 16. Administrative Transparency Bottom Notice */}
      <section className="w-full bg-[#edeae0] py-4 px-4 sm:px-6 lg:px-10 border-t border-[#ded6c7]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-[#5c625e]">
          <p>
            {isHi
              ? "नारंगा सामुदायिक सूचना मंच • ग्राम पंचायत नारंगा उत्तरी, परिहार, सीतामढ़ी"
              : "Naranga Civic Repository • Naranga Uttari Gram Panchayat, Parihar, Sitamarhi"}
          </p>
          <div className="flex items-center gap-3 text-[11px]">
            <a href="#demographics-glance" className="hover:text-primary transition-colors">{isHi ? "जनसांख्यिकी" : "Demographics"}</a>
            <span>•</span>
            <a href="#village-map" className="hover:text-primary transition-colors">{isHi ? "मानचित्र" : "Map"}</a>
            <span>•</span>
            <a href="#community-contribution" className="hover:text-primary transition-colors">{isHi ? "योगदान करें" : "Contribute"}</a>
          </div>
        </div>
      </section>
    </div>
  );
}
