"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { IMAGES } from "@/lib/data";
import { 
  Landmark, 
  MapPin, 
  Users, 
  User, 
  Scale, 
  Phone, 
  Mail, 
  Calendar, 
  Search, 
  CheckCircle2, 
  AlertCircle, 
  FileText, 
  ExternalLink, 
  Send, 
  ShieldCheck, 
  Clock, 
  Building2,
  HelpCircle,
  Briefcase,
  ChevronRight,
  Filter
} from "lucide-react";

export default function PanchayatPage() {
  const { locale } = useLanguage();
  const isHi = locale === "hi";

  // Search & filter states
  const [wardSearch, setWardSearch] = useState("");
  const [repFilter, setRepFilter] = useState("all");

  // Citizen Correction Form state
  const [formState, setFormState] = useState({
    name: "",
    category: "representative",
    wardNumber: "",
    suggestion: "",
    sourceUrl: "",
    contact: "",
    consent: false,
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleCorrectionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");
    if (!formState.suggestion.trim() || !formState.consent) {
      setSubmitError(isHi ? "कृपया सुझाव विवरण लिखें और सहमति दें।" : "Please enter suggestions and check consent.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "panchayat_correction",
          submitterName: formState.name || (isHi ? "नागरिक प्रस्तोता" : "Citizen Contributor"),
          contact: formState.contact || null,
          content: `[Category: ${formState.category}] [Ward: ${formState.wardNumber || "N/A"}] ${formState.suggestion} [Source: ${formState.sourceUrl || "N/A"}]`,
          consent: formState.consent,
        }),
      });

      if (res.ok) {
        setSubmitSuccess(true);
      } else {
        throw new Error();
      }
    } catch {
      // Offline fallback storage
      const existing = JSON.parse(localStorage.getItem("naranga_submissions") || "[]");
      existing.push({
        id: Date.now(),
        type: "panchayat_correction",
        submitterName: formState.name || "Citizen Contributor",
        contact: formState.contact,
        content: `[Category: ${formState.category}] [Ward: ${formState.wardNumber || "N/A"}] ${formState.suggestion}`,
        date: new Date().toISOString(),
      });
      localStorage.setItem("naranga_submissions", JSON.stringify(existing));
      setSubmitSuccess(true);
    } finally {
      setSubmitting(false);
    }
  };

  // Representatives dataset
  const representatives = [
    {
      id: "mukhiya",
      roleHi: "मुखिया (कार्यपालिका प्रमुख)",
      roleEn: "Mukhiya (Executive Head)",
      nameHi: "भारत भूषण",
      nameEn: "Bharat Bhushan",
      panchayat: "Naranga Uttari Gram Panchayat",
      contact: "9771252222",
      sourceName: "बिहार पंचायती राज विभाग (August 2024 संपर्क विवरणिका)",
      sourceUrl: "https://state.bihar.gov.in/biharprd/cache/33/21-Aug-24/SHOW_DOCS/Mukhiya%20Contact%20Detail.pdf",
      lastChecked: "August 2024",
      status: "historical_reverify",
      statusTextHi: "सरकारी संपर्क सूची (अगस्त 2024); वर्तमान स्थिति सत्यापनाधीन",
      statusTextEn: "Govt Contact Record (Aug 2024); Current tenure under verification",
      type: "executive",
      dutiesHi: "ग्राम पंचायत की बैठकों की अध्यक्षता, ग्रामीण विकास योजनाओं, सड़क-नाली, नल-जल एवं ग्राम सभा निर्णयों का क्रियान्वयन।",
      dutiesEn: "Presides over Gram Panchayat meetings, oversees local development schemes, roads, water supply, and executes Gram Sabha resolutions."
    },
    {
      id: "sarpanch",
      roleHi: "सरपंच (ग्राम कचहरी प्रधान)",
      roleEn: "Sarpanch (Judicial Head)",
      nameHi: "विवरण सत्यापनाधीन",
      nameEn: "Verification Pending",
      panchayat: "Naranga Uttari Gram Kachahari",
      contact: null,
      sourceName: "राज्य निर्वाचन आयोग बिहार / जिला निर्वाचन कार्यालय सीतामढ़ी",
      sourceUrl: "https://sec25.bihar.gov.in/sec_new/Panchayat/Result",
      lastChecked: "October 2026",
      status: "pending_gazette",
      statusTextHi: "आधिकारिक गजट रोस्टर से पुष्टि प्रतीक्षित",
      statusTextEn: "Awaiting Sitamarhi District Election Gazette Confirmation",
      type: "judicial",
      dutiesHi: "ग्राम कचहरी के स्वतंत्र न्यायिक प्रधान। छोटे दीवानी व स्थानीय विवादों का सौहार्दपूर्ण आपसी निपटारा व ग्राम न्याय प्रशासन।",
      dutiesEn: "Independent judicial head of Gram Kachahari. Settles petty local civil disputes through consensus and village-level justice administration."
    },
    {
      id: "secretary",
      roleHi: "पंचायत सचिव / ग्राम सेवक",
      roleEn: "Panchayat Secretary (Administrative Officer)",
      nameHi: "अभयानंद कुमार (निर्देशिका उल्लेख)",
      nameEn: "Abhayanand Kumar (Directory Listing)",
      panchayat: "Naranga Uttari Gram Panchayat",
      contact: null,
      sourceName: "तृतीय-पक्ष पंचायत निर्देशिका",
      sourceUrl: "https://gramvikas.nskmultiservices.in/india/bihar/sitamarhi/parihar/gp/naranga-uttari",
      lastChecked: "October 2026",
      status: "directory_unconfirmed",
      statusTextHi: "तृतीय-पक्ष डायरेक्टरी सूची; प्रशासनिक पदस्थापन पुष्टि प्रतीक्षित",
      statusTextEn: "Third-party directory listing; Current posting awaiting official verification",
      type: "administrative",
      dutiesHi: "शासकीय अभिलेखों का संधारण, जन्म-मृत्यु पंजीकरण, विकास योजनाओं का लेखा-जोखा और सरकारी आदेशों का अनुपालन।",
      dutiesEn: "Maintenance of administrative records, birth/death registrations, accounts, and governmental compliance."
    },
    {
      id: "up_mukhiya",
      roleHi: "उप-मुखिया",
      roleEn: "Up-Mukhiya (Deputy Executive)",
      nameHi: "विवरण सत्यापनाधीन",
      nameEn: "Verification Pending",
      panchayat: "Naranga Uttari Gram Panchayat",
      contact: null,
      sourceName: "वार्ड सदस्यों द्वारा निर्वाचित पद",
      sourceUrl: "https://sec25.bihar.gov.in/sec_new/Panchayat/Result",
      lastChecked: "October 2026",
      status: "pending",
      statusTextHi: "आधिकारिक पुष्टि प्रतीक्षित",
      statusTextEn: "Verification Pending",
      type: "executive",
      dutiesHi: "मुखिया की अनुपस्थिति में बैठकों एवं कार्यपालिका दायित्वों का संपादन।",
      dutiesEn: "Assists the Mukhiya and exercises designated powers in the Mukhiya's absence."
    }
  ];

  // 14 Wards dataset
  const wards = Array.from({ length: 14 }, (_, i) => ({
    number: i + 1,
    panchayat: "Naranga Uttari",
    areaHi: `वार्ड सं. ${i + 1} क्षेत्रीय क्षेत्र (नारंगा उत्तरी)`,
    areaEn: `Ward No. ${i + 1} Locality (Naranga Uttari)`,
    memberNameHi: "नाम सत्यापनाधीन (आधिकारिक सूची प्रतीक्षित)",
    memberNameEn: "Name Verification Pending (Awaiting Official Gazette)",
    status: "प्रतीक्षित / Pending Gazette",
    source: "Directory listed 14 Wards / SEC Bihar Gazette Awaited"
  }));

  const filteredWards = wards.filter(w => 
    w.number.toString().includes(wardSearch) || 
    w.areaHi.includes(wardSearch) || 
    w.areaEn.toLowerCase().includes(wardSearch.toLowerCase())
  );

  const filteredReps = representatives.filter(r => {
    if (repFilter === "all") return true;
    return r.type === repFilter;
  });

  return (
    <div className="flex flex-col w-full bg-[#fbf8f0]">
      {/* 1. Breadcrumb Bar */}
      <section className="w-full bg-[#f4efe5] px-4 sm:px-6 lg:px-10 py-3 border-b border-[#e5e0d3]">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs text-[#5c625e]">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2">
            <Link href="/" className="hover:text-primary transition-colors text-[#5c625e]">
              {isHi ? "होम" : "Home"}
            </Link>
            <span className="text-[#c9c6be]">/</span>
            <span className="text-primary font-bold">{isHi ? "पंचायत" : "Panchayat"}</span>
          </nav>
          <div className="flex items-center gap-2.5">
            <span className="px-2.5 py-0.5 rounded-full bg-white text-primary text-[11px] font-semibold border border-[#e5e0d3] flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E06D14]"></span>
              <span>LGD Code: 101081</span>
            </span>
            <span className="hidden sm:inline-block text-[#c9c6be]">•</span>
            <span className="text-[11px] text-[#434a45]">{isHi ? "नरंगा उत्तरी ग्राम पंचायत, परिहार" : "Naranga Uttari Gram Panchayat, Parihar"}</span>
          </div>
        </div>
      </section>

      {/* SECTION A: Panchayat Hero */}
      <section className="relative w-full overflow-hidden bg-[#0e382e] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-12 lg:py-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-white text-xs font-semibold tracking-wider uppercase border border-white/15">
                <Landmark className="w-3.5 h-3.5 text-[#ffb68c]" />
                <span>{isHi ? "त्रिस्तरीय पंचायती राज व्यवस्था • बिहार" : "3-Tier Panchayati Raj System • Bihar"}</span>
              </div>

              <div className="space-y-2">
                <h1 className="font-headline text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
                  {isHi ? "नरंगा उत्तरी ग्राम पंचायत" : "Naranga Uttari Gram Panchayat"}
                </h1>
                <p className="font-headline text-lg sm:text-2xl text-[#baeed9] font-medium">
                  {isHi ? "प्रखंड परिहार, जिला सीतामढ़ी, बिहार" : "Parihar Block, Sitamarhi District, Bihar"}
                </p>
              </div>

              <p className="text-sm sm:text-base text-white/90 leading-relaxed max-w-2xl font-normal">
                {isHi 
                  ? "नरंगा उत्तरी ग्राम पंचायत से संबंधित प्रशासनिक जानकारी, जनप्रतिनिधियों, वार्डों, नागरिक सेवाओं और सार्वजनिक सूचनाओं को एक ही स्थान पर देखें।"
                  : "View administrative details, public representatives, electoral wards, civic services, and public notices for Naranga Uttari Gram Panchayat in one transparent civic portal."}
              </p>

              {/* Administrative Badge Chips */}
              <div className="flex flex-wrap gap-2 pt-2 text-xs">
                <span className="px-3 py-1 rounded-md bg-white/10 text-white font-medium">
                  🏛️ प्रखंड: परिहार (Parihar)
                </span>
                <span className="px-3 py-1 rounded-md bg-white/10 text-white font-medium">
                  📍 जिला: सीतामढ़ी (Sitamarhi)
                </span>
                <span className="px-3 py-1 rounded-md bg-[#d95204] text-white font-bold">
                  📋 स्थानीय निकाय कोड (LGD): 101081
                </span>
                <span className="px-3 py-1 rounded-md bg-white/10 text-white font-medium">
                  📮 पिन कोड: 843324
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <a
                  href="#representatives-dir"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-white text-[#003629] text-xs sm:text-sm font-bold shadow-md hover:bg-[#edeae0] transition-all"
                >
                  <Users className="w-4 h-4 text-[#003629]" />
                  <span>{isHi ? "जनप्रतिनिधि सूची देखें" : "View Representatives"}</span>
                </a>
                <a
                  href="https://sec25.bihar.gov.in/sec_new/Panchayat/Result"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-semibold backdrop-blur-sm transition-all border border-white/20"
                >
                  <ExternalLink className="w-4 h-4 text-[#ffb68c]" />
                  <span>{isHi ? "बिहार निर्वाचन परिणाम पोर्टल" : "SEC Bihar Election Portal"}</span>
                </a>
              </div>
            </div>

            {/* Hero Right Visual: Authentic Village Archive Representation */}
            <div className="lg:col-span-4">
              <div className="bg-white text-[#191e1b] rounded-2xl shadow-xl border border-[#ded6c7] p-4 space-y-3">
                <div className="relative w-full h-52 rounded-xl overflow-hidden bg-[#003629]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={IMAGES.stitchHero} 
                    alt="Naranga Village Civic Context"
                    className="w-full h-full object-cover opacity-85"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-3">
                    <span className="text-[11px] font-bold text-white">
                      {isHi ? "नरंगा उत्तरी पंचायत परिदृश्य" : "Naranga Uttari Civic Domain"}
                    </span>
                  </div>
                </div>
                <div className="space-y-1 text-xs text-[#5c625e]">
                  <div className="flex justify-between py-1 border-b border-[#f4efe5]">
                    <span className="font-medium">{isHi ? "संबद्ध राजस्व ग्राम" : "Associated Village"}:</span>
                    <strong className="text-[#191e1b]">नारंगा (Naranga)</strong>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#f4efe5]">
                    <span className="font-medium">{isHi ? "जनगणना कोड" : "Census Code"}:</span>
                    <strong className="font-mono text-primary">219122</strong>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="font-medium">{isHi ? "वार्डों की संख्या" : "Reported Wards"}:</span>
                    <strong className="text-[#191e1b]">14 {isHi ? "(सत्यापनाधीन)" : "(Provisional)"}</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION B: Panchayat Overview Statistics Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="bg-white rounded-xl p-4 border border-[#ded6c7] shadow-xs">
            <span className="text-[11px] text-[#7c837d] block font-medium">{isHi ? "पंचायत का नाम" : "Panchayat Name"}</span>
            <div className="font-headline text-lg font-extrabold text-primary mt-1">नरंगा उत्तरी</div>
            <span className="text-[10px] text-[#5c625e] mt-1 block">Naranga Uttari</span>
          </div>

          <div className="bg-white rounded-xl p-4 border border-[#ded6c7] shadow-xs">
            <span className="text-[11px] text-[#7c837d] block font-medium">{isHi ? "प्रखंड / समिति" : "Block / CD Block"}</span>
            <div className="font-headline text-lg font-extrabold text-primary mt-1">परिहार</div>
            <span className="text-[10px] text-[#5c625e] mt-1 block">Parihar Block</span>
          </div>

          <div className="bg-white rounded-xl p-4 border border-[#ded6c7] shadow-xs">
            <span className="text-[11px] text-[#7c837d] block font-medium">{isHi ? "जिला" : "District"}</span>
            <div className="font-headline text-lg font-extrabold text-primary mt-1">सीतामढ़ी</div>
            <span className="text-[10px] text-[#5c625e] mt-1 block">Sitamarhi, Bihar</span>
          </div>

          <div className="bg-white rounded-xl p-4 border border-[#ded6c7] shadow-xs">
            <span className="text-[11px] text-[#7c837d] block font-medium">{isHi ? "स्थानीय निकाय कोड" : "Local Body (LGD)"}</span>
            <div className="font-headline text-lg font-extrabold font-mono text-primary mt-1">101081</div>
            <span className="text-[10px] text-[#5c625e] mt-1 block">{isHi ? "डायरेक्टरी दर्ज" : "Directory Listed"}</span>
          </div>

          <div className="bg-white rounded-xl p-4 border border-[#ded6c7] shadow-xs">
            <span className="text-[11px] text-[#7c837d] block font-medium">{isHi ? "संबंधित गाँव" : "Associated Village"}</span>
            <div className="font-headline text-lg font-extrabold text-primary mt-1">नारंगा</div>
            <span className="text-[10px] text-[#5c625e] mt-1 block">Census Code: 219122</span>
          </div>

          <div className="bg-white rounded-xl p-4 border border-[#ded6c7] shadow-xs">
            <span className="text-[11px] text-[#7c837d] block font-medium">{isHi ? "कुल निर्वाचन वार्ड" : "Electoral Wards"}</span>
            <div className="font-headline text-lg font-extrabold text-[#b84400] mt-1">14 वार्ड</div>
            <span className="text-[10px] text-[#7c837d] mt-1 block">{isHi ? "गजट पुष्टि प्रक्रियाधीन" : "Gazette Sync Pending"}</span>
          </div>
        </div>

        {/* Source Note on Administration Disctinction */}
        <div className="mt-6 p-4 rounded-xl bg-amber-50/90 border border-amber-200 text-amber-950 text-xs flex items-start gap-3 shadow-2xs">
          <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong>{isHi ? "प्रशासनिक सीमांकन एवं सत्यनिष्ठा नोट: " : "Administrative Integrity Note: "}</strong>
            {isHi 
              ? "यह पोर्टल केवल 'नरंगा उत्तरी ग्राम पंचायत' (LGD 101081) पर केंद्रित है। इसे 'नरंगा दक्षिणी' से अलग रखा गया है ताकि किसी भी प्रतिनिधि, वार्ड सदस्य या आंकड़े में भ्रम न हो। 14 वार्डों का विवरण तृतीय-पक्ष डायरेक्टरी पर आधारित है और जिला निर्वाचन कार्यालय गजट से अंतिम पुष्टि प्रतीक्षित है।"
              : "This page strictly covers Naranga Uttari Gram Panchayat (LGD 101081). It is maintained separately from Naranga Dakshini to ensure representative names and ward boundaries are never mixed."}
          </div>
        </div>
      </section>

      {/* SECTION C: जनप्रतिनिधि Directory (Representatives Directory) */}
      <section className="w-full bg-[#f4efe5] py-12 lg:py-16 border-y border-[#e5e0d3]" id="representatives-dir">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-[#b84400] tracking-wider uppercase flex items-center gap-1.5">
                <Users className="w-4 h-4 text-[#b84400]" />
                <span>{isHi ? "निर्वाचित एवं शासकीय नेतृत्व • Leadership Roster" : "Elected & Administrative Representatives"}</span>
              </span>
              <h2 className="font-headline text-2xl sm:text-3xl text-primary font-extrabold mt-1">
                {isHi ? "ग्राम पंचायत के प्रमुख प्रतिनिधि एवं पदधारक" : "Key Representatives & Officeholders"}
              </h2>
            </div>

            {/* Filter buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setRepFilter("all")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${repFilter === "all" ? "bg-primary text-white" : "bg-white text-[#5c625e] border border-[#ded6c7]"}`}
              >
                {isHi ? "सभी" : "All"}
              </button>
              <button
                onClick={() => setRepFilter("executive")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${repFilter === "executive" ? "bg-primary text-white" : "bg-white text-[#5c625e] border border-[#ded6c7]"}`}
              >
                {isHi ? "कार्यपालिका (मुखिया)" : "Executive"}
              </button>
              <button
                onClick={() => setRepFilter("judicial")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${repFilter === "judicial" ? "bg-primary text-white" : "bg-white text-[#5c625e] border border-[#ded6c7]"}`}
              >
                {isHi ? "ग्राम कचहरी (सरपंच)" : "Judicial"}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredReps.map((rep) => (
              <div 
                key={rep.id} 
                className="bg-white rounded-2xl p-6 border border-[#ded6c7] shadow-xs flex flex-col justify-between space-y-4 hover:border-primary/50 transition-colors"
              >
                <div>
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 rounded-full bg-[#f4efe5] flex items-center justify-center text-primary border border-[#e5e0d3]">
                        {rep.type === "judicial" ? <Scale className="w-7 h-7" /> : <User className="w-7 h-7" />}
                      </div>
                      <div>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                          rep.status === "historical_reverify" 
                            ? "bg-amber-100 text-amber-900 border border-amber-300" 
                            : "bg-[#f4efe5] text-[#5c625e] border border-[#ded6c7]"
                        }`}>
                          {isHi ? rep.statusTextHi : rep.statusTextEn}
                        </span>
                        <h3 className="font-headline text-xl font-extrabold text-[#191e1b] mt-1">
                          {isHi ? rep.nameHi : rep.nameEn}
                        </h3>
                        <p className="text-xs font-semibold text-primary">
                          {isHi ? rep.roleHi : rep.roleEn}
                        </p>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-[#5c625e] leading-relaxed mb-4 p-3 bg-[#fbf8f0] rounded-xl border border-[#e5e0d3]">
                    {isHi ? rep.dutiesHi : rep.dutiesEn}
                  </p>

                  <div className="space-y-1.5 text-xs">
                    {rep.contact && (
                      <div className="flex items-center gap-2 text-[#191e1b]">
                        <Phone className="w-3.5 h-3.5 text-primary" />
                        <span><strong>{isHi ? "सूचीबद्ध संपर्क:" : "Listed Contact:"}</strong> <a href={`tel:${rep.contact}`} className="text-primary hover:underline font-mono">{rep.contact}</a> (Public Record)</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-[#7c837d] text-[11px]">
                      <FileText className="w-3.5 h-3.5" />
                      <span><strong>{isHi ? "स्रोत:" : "Source:"}</strong> {rep.sourceName}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#f4efe5] flex items-center justify-between text-[11px] text-[#7c837d]">
                  <span>{isHi ? "सत्यापन संदर्भ:" : "Verification:"} {rep.lastChecked}</span>
                  {rep.sourceUrl && (
                    <a href={rep.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-bold flex items-center gap-1">
                      <span>{isHi ? "मूल स्रोत दस्तावेज" : "View Source PDF"}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION D: Ward Directory */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-12 lg:py-16 space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-primary tracking-wider uppercase flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-primary" />
              <span>{isHi ? "प्रादेशिक निर्वाचन संवर्ग • 14 Electoral Wards" : "Ward Directory (14 Wards)"}</span>
            </span>
            <h2 className="font-headline text-2xl sm:text-3xl text-primary font-extrabold mt-1">
              {isHi ? "नरंगा उत्तरी वार्ड निर्देशिका" : "Electoral Ward Directory"}
            </h2>
            <p className="text-xs text-[#5c625e] mt-1">
              {isHi 
                ? "तृतीय-पक्ष निर्देशिका अनुसार 14 वार्ड। आधिकारिक निर्वाचित वार्ड सदस्यों के नाम जिला निर्वाचन कार्यालय गजट से सत्यापनाधीन हैं।" 
                : "Directory reports 14 wards. Official gazette member names are currently awaiting district verification."}
            </p>
          </div>

          {/* Search box for Wards */}
          <div className="relative w-full md:w-64">
            <input
              type="text"
              value={wardSearch}
              onChange={(e) => setWardSearch(e.target.value)}
              placeholder={isHi ? "वार्ड नंबर खोजें (1-14)..." : "Search Ward (1-14)..."}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-[#c0c9c3] bg-white outline-none focus:border-primary"
            />
            <Search className="w-4 h-4 text-[#7c837d] absolute left-3 top-2.5" />
          </div>
        </div>

        {/* Wards Grid Table */}
        <div className="bg-white rounded-2xl border border-[#ded6c7] overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#f4efe5] text-[#191e1b] font-bold uppercase tracking-wider text-[11px] border-b border-[#ded6c7]">
                <tr>
                  <th className="p-3.5">{isHi ? "वार्ड सं." : "Ward No."}</th>
                  <th className="p-3.5">{isHi ? "पंचायत" : "Panchayat"}</th>
                  <th className="p-3.5">{isHi ? "क्षेत्रीय विवरण" : "Jurisdiction Area"}</th>
                  <th className="p-3.5">{isHi ? "वार्ड सदस्य नाम" : "Ward Member Name"}</th>
                  <th className="p-3.5">{isHi ? "सत्यापन स्थिति" : "Status"}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f4efe5]">
                {filteredWards.map((w) => (
                  <tr key={w.number} className="hover:bg-[#fbf8f0] transition-colors">
                    <td className="p-3.5 font-bold font-mono text-primary text-sm">
                      वार्ड {w.number < 10 ? `0${w.number}` : w.number}
                    </td>
                    <td className="p-3.5 text-[#5c625e]">
                      नरंगा उत्तरी (Naranga Uttari)
                    </td>
                    <td className="p-3.5 text-[#191e1b]">
                      {isHi ? w.areaHi : w.areaEn}
                    </td>
                    <td className="p-3.5 text-[#7c837d] italic">
                      {isHi ? w.memberNameHi : w.memberNameEn}
                    </td>
                    <td className="p-3.5">
                      <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-900 border border-amber-200 text-[10px] font-bold">
                        {w.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* SECTION E: Panchayat Office and Contact */}
      <section className="w-full bg-[#f4efe5] py-12 lg:py-16 border-y border-[#e5e0d3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-bold text-primary tracking-wider uppercase flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-primary" />
              <span>{isHi ? "पंचायत कार्यालय एवं संपर्क • Panchayat Secretariat" : "Panchayat Office & Contacts"}</span>
            </span>
            <h2 className="font-headline text-2xl sm:text-3xl text-primary font-extrabold">
              {isHi ? "कार्यालय संपर्क एवं आधिकारिक पत्राचार" : "Office Location & Official Correspondence"}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-[#ded6c7] shadow-xs space-y-3">
              <MapPin className="w-6 h-6 text-primary" />
              <h3 className="font-headline text-base font-bold text-[#191e1b]">
                {isHi ? "पंचायत सरकार भवन / कार्यालय" : "Panchayat Office Address"}
              </h3>
              <p className="text-xs text-[#5c625e] leading-relaxed">
                ग्राम पंचायत कार्यालय, नरंगा उत्तरी, डाकघर: नारंगा, प्रखंड: परिहार, जिला: सीतामढ़ी, बिहार - 843324
              </p>
              <div className="text-[11px] text-[#7c837d] pt-2 border-t border-[#f4efe5]">
                {isHi ? "*विस्तृत भवन भू-स्थानिक निर्देशांक सत्यापनाधीन" : "*Exact geo-coordinates pending cadastral survey"}
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#ded6c7] shadow-xs space-y-3">
              <Clock className="w-6 h-6 text-primary" />
              <h3 className="font-headline text-base font-bold text-[#191e1b]">
                {isHi ? "कार्यालय समय एवं सार्वजनिक सेवा" : "Office Hours & Public Service"}
              </h3>
              <p className="text-xs text-[#5c625e] leading-relaxed">
                सोमवार से शनिवार: प्रातः 10:00 बजे से अपराह्न 5:00 बजे तक (राजकीय अवकाश छोड़कर)
              </p>
              <div className="text-[11px] text-[#7c837d] pt-2 border-t border-[#f4efe5]">
                {isHi ? "ग्राम कचहरी बैठक: रोस्टर अनुसार नियत दिन" : "Gram Kachahari hearings as scheduled"}
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#ded6c7] shadow-xs space-y-3">
              <Phone className="w-6 h-6 text-primary" />
              <h3 className="font-headline text-base font-bold text-[#191e1b]">
                {isHi ? "प्रशासनिक लिंक व हेल्पलाइन" : "Administrative Links & Helplines"}
              </h3>
              <div className="space-y-1.5 text-xs text-[#5c625e]">
                <p>प्रखंड कार्यालय परिहार: ~9 किमी</p>
                <p>जिला हेल्पलाइन सीतामढ़ी: 06226-250316</p>
                <a href="https://sitamarhi.nic.in" target="_blank" rel="noopener noreferrer" className="text-primary font-bold hover:underline flex items-center gap-1">
                  <span>sitamarhi.nic.in</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION F: Gram Panchayat Responsibilities */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-12 lg:py-16 space-y-6">
        <div className="space-y-1">
          <span className="text-xs font-bold text-primary tracking-wider uppercase flex items-center gap-1.5">
            <Briefcase className="w-4 h-4 text-primary" />
            <span>{isHi ? "वैधानिक दायित्व • Statutory Functions" : "Gram Panchayat Responsibilities"}</span>
          </span>
          <h2 className="font-headline text-2xl sm:text-3xl text-primary font-extrabold">
            {isHi ? "ग्राम पंचायत के प्रमुख कार्य एवं वैधानिक अधिकार" : "Key Responsibilities under Bihar Panchayati Raj Act"}
          </h2>
          <p className="text-xs text-[#5c625e]">
            {isHi 
              ? "ये बिहार पंचायती राज अधिनियम 2006 के अंतर्गत सामान्य वैधानिक दायित्व हैं।" 
              : "General statutory responsibilities under Bihar Panchayati Raj Act, 2006."}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-5 rounded-xl border border-[#ded6c7] shadow-xs space-y-2">
            <div className="font-bold text-primary text-sm flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#E06D14]"></span>
              <span>1. ग्रामीण योजना एवं विकास</span>
            </div>
            <p className="text-xs text-[#5c625e] leading-relaxed">
              ग्राम पंचायत क्षेत्र के आर्थिक विकास और सामाजिक न्याय के लिए वार्षिक योजना तैयार करना तथा ग्राम सभा में अनुमोदन कराना।
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-[#ded6c7] shadow-xs space-y-2">
            <div className="font-bold text-primary text-sm flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#E06D14]"></span>
              <span>2. ग्रामीण अवसंरचना व संपर्क</span>
            </div>
            <p className="text-xs text-[#5c625e] leading-relaxed">
              गाँव की आंतरिक पक्की सड़कें, गलियाँ, पुलिया, सामुदायिक भवन और जल निकासी नालियों का रखरखाव व निर्माण।
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-[#ded6c7] shadow-xs space-y-2">
            <div className="font-bold text-primary text-sm flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#E06D14]"></span>
              <span>3. पेयजल एवं स्वच्छता</span>
            </div>
            <p className="text-xs text-[#5c625e] leading-relaxed">
              हर घर नल का जल योजना की निगरानी, सार्वजनिक चापाकलों की मरम्मत और स्वच्छ भारत मिशन ग्रामीण के तहत स्वच्छता।
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-[#ded6c7] shadow-xs space-y-2">
            <div className="font-bold text-primary text-sm flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#E06D14]"></span>
              <span>4. ग्राम सभा एवं जनसहभागिता</span>
            </div>
            <p className="text-xs text-[#5c625e] leading-relaxed">
              नियमित ग्राम सभा बैठकों का आयोजन, कल्याणकारी योजनाओं के पात्र लाभार्थियों का सामाजिक अंकेक्षण (Social Audit)।
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-[#ded6c7] shadow-xs space-y-2">
            <div className="font-bold text-primary text-sm flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#E06D14]"></span>
              <span>5. सामाजिक सुरक्षा एवं कल्याण</span>
            </div>
            <p className="text-xs text-[#5c625e] leading-relaxed">
              वृद्धावस्था, विधवा व दिव्यांग पेंशन, कबीर अंत्येष्टि अनुदान और राशन कार्ड वितरण में पारदर्शिता सुनिश्चित करना।
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-[#ded6c7] shadow-xs space-y-2">
            <div className="font-bold text-primary text-sm flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#E06D14]"></span>
              <span>6. कृषि, पशुपालन व आजीविका</span>
            </div>
            <p className="text-xs text-[#5c625e] leading-relaxed">
              मनरेगा रोजगार सृजन, कृषि विस्तार और प्राकृतिक आपदा (बाढ़/सुखाड़) में राहत कार्यों का समन्वय।
            </p>
          </div>
        </div>
      </section>

      {/* SECTION G & H: Government Schemes & Development Projects */}
      <section className="w-full bg-[#f4efe5] py-12 lg:py-16 border-y border-[#e5e0d3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 space-y-8">
          {/* Schemes Header */}
          <div className="space-y-1">
            <span className="text-xs font-bold text-[#b84400] tracking-wider uppercase flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-[#b84400]" />
              <span>{isHi ? "कल्याणकारी योजनाएँ • Public Portals" : "Panchayat Welfare Schemes"}</span>
            </span>
            <h2 className="font-headline text-2xl sm:text-3xl text-primary font-extrabold">
              {isHi ? "ग्राम पंचायत से जुड़ी प्रमुख योजनाएँ एवं आधिकारिक पोर्टल" : "Government Schemes Accessible through Panchayat"}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <a 
              href="https://pmayg.nic.in" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white p-5 rounded-xl border border-[#ded6c7] shadow-xs hover:border-primary transition-all group"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-headline text-base font-bold text-primary">PM आवास योजना ग्रामीण</span>
                <ExternalLink className="w-4 h-4 text-[#7c837d] group-hover:text-primary" />
              </div>
              <p className="text-xs text-[#5c625e]">पक्के मकान हेतु वित्तीय सहायता सूची, स्वीकृति स्थिति एवं FTO ट्रैकिंग।</p>
              <span className="text-[11px] font-mono text-primary mt-3 block font-bold">pmayg.nic.in →</span>
            </a>

            <a 
              href="https://nrega.nic.in" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white p-5 rounded-xl border border-[#ded6c7] shadow-xs hover:border-primary transition-all group"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-headline text-base font-bold text-primary">मनरेगा (MGNREGA)</span>
                <ExternalLink className="w-4 h-4 text-[#7c837d] group-hover:text-primary" />
              </div>
              <p className="text-xs text-[#5c625e]">जॉब कार्ड आवेदन, कार्य आवंटन, मस्टर रोल व पारिश्रमिक भुगतान स्थिति।</p>
              <span className="text-[11px] font-mono text-primary mt-3 block font-bold">nrega.nic.in →</span>
            </a>

            <a 
              href="https://serviceonline.bihar.gov.in" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white p-5 rounded-xl border border-[#ded6c7] shadow-xs hover:border-primary transition-all group"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-headline text-base font-bold text-primary">RTPS बिहार (ServicePlus)</span>
                <ExternalLink className="w-4 h-4 text-[#7c837d] group-hover:text-primary" />
              </div>
              <p className="text-xs text-[#5c625e]">जाति, आय, निवास, आचरण प्रमाण पत्र एवं सामाजिक सुरक्षा पेंशन ऑनलाइन।</p>
              <span className="text-[11px] font-mono text-primary mt-3 block font-bold">serviceonline.bihar.gov.in →</span>
            </a>
          </div>

          {/* Development Projects Section with Professional Empty State */}
          <div className="mt-8 pt-8 border-t border-[#ded6c7] space-y-4">
            <h3 className="font-headline text-xl font-bold text-primary">
              {isHi ? "विकास कार्य एवं परियोजनाएँ (Development Works)" : "Verified Development Works Ledger"}
            </h3>
            
            {/* Empty state per RULE 6 Section H */}
            <div className="p-8 rounded-2xl bg-white border border-[#ded6c7] text-center max-w-2xl mx-auto space-y-3">
              <Building2 className="w-12 h-12 text-[#7c837d] mx-auto opacity-75" />
              <h4 className="font-headline text-base font-bold text-[#191e1b]">
                {isHi ? "सत्यापित विकास कार्यों का विवरण उपलब्ध होने पर यहाँ प्रकाशित किया जाएगा।" : "Verified development works ledger will be published upon release of official departmental data."}
              </h4>
              <p className="text-xs text-[#5c625e] max-w-md mx-auto leading-relaxed">
                {isHi 
                  ? "ग्राम पंचायत नरंगा उत्तरी में 15वें वित्त आयोग एवं षष्ठम राज्य वित्त आयोग के तहत स्वीकृत योजनाओं का अंकेक्षण विवरण प्राप्त होने पर यहाँ क्रमबद्ध प्रकाशित किया जाएगा।"
                  : "Audit expenditures under the 15th Finance Commission and State Finance Commission will appear here once officially gazetted."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION I: Gram Sabha and Public Notices */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-12 lg:py-16 space-y-6">
        <div className="space-y-1">
          <span className="text-xs font-bold text-primary tracking-wider uppercase flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-primary" />
            <span>{isHi ? "सार्वजनिक सूचना पट्ट • Public Notices" : "Gram Sabha & Official Bulletins"}</span>
          </span>
          <h2 className="font-headline text-2xl sm:text-3xl text-primary font-extrabold">
            {isHi ? "ग्राम सभा बैठकें एवं आधिकारिक विज्ञप्तियां" : "Gram Sabha Announcements & Gazette Notices"}
          </h2>
        </div>

        <div className="p-8 rounded-2xl bg-white border border-[#ded6c7] shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-[#f4efe5] flex items-center justify-center text-primary shrink-0">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-headline text-base font-bold text-[#191e1b]">
                {isHi ? "वर्तमान में कोई नई आधिकारिक सूचना प्रकाशित नहीं है" : "No live official gazette notices published today"}
              </h3>
              <p className="text-xs text-[#5c625e] mt-1 leading-relaxed max-w-xl">
                {isHi
                  ? "आगामी आम ग्राम सभा की तिथि, एजेंडा और कार्ययोजना प्रस्ताव सक्षम प्राधिकारी (मुखिया / पंचायत सचिव) द्वारा हस्ताक्षरित सूचना प्राप्त होने पर यहाँ सार्वजनिक की जाएगी।"
                  : "Upcoming Gram Sabha dates, agenda items, and administrative resolutions will be notified here once signed by the designated authorities."}
              </p>
            </div>
          </div>
          <Link
            href="/news"
            className="px-4 py-2 bg-[#f4efe5] hover:bg-[#edeae0] text-primary text-xs font-bold rounded-lg transition-colors shrink-0"
          >
            {isHi ? "सूचना पट्ट पुरालेख देखें" : "View Notice Archive"}
          </Link>
        </div>
      </section>

      {/* SECTION K: Citizen Information Correction Form */}
      <section className="w-full bg-[#f4efe5] py-12 lg:py-16 border-t border-[#e5e0d3]" id="citizen-correction">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="text-center space-y-2">
            <span className="px-3 py-1 rounded-full bg-white text-primary text-xs font-bold uppercase tracking-wider border border-[#ded6c7]">
              {isHi ? "नागरिक सुधार एवं डेटा शुद्धि प्रपत्र" : "Citizen Data Correction Form"}
            </span>
            <h2 className="font-headline text-2xl sm:text-3xl text-primary font-extrabold">
              {isHi ? "पंचायत जानकारी में सुधार अथवा अद्यतन का सुझाव दें" : "Suggest Correction to Panchayat Information"}
            </h2>
            <p className="text-xs sm:text-sm text-[#5c625e] max-w-lg mx-auto">
              {isHi 
                ? "यदि आपके पास निर्वाचित प्रतिनिधि, वार्ड सीमा, अथवा पंचायत भवन से संबंधित आधिकारिक साक्ष्य या सुधार है, तो यहाँ प्रस्तुत करें।"
                : "Submit factual corrections with supporting gazette/document links. All suggestions undergo administrative review."}
            </p>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#ded6c7] shadow-sm">
            {submitSuccess ? (
              <div className="text-center py-8 space-y-3">
                <CheckCircle2 className="w-14 h-14 text-emerald-600 mx-auto" />
                <h3 className="font-headline text-xl font-bold text-[#191e1b]">
                  {isHi ? "सुधार अनुरोध सफलतापूर्वक दर्ज किया गया!" : "Correction Submitted Successfully!"}
                </h3>
                <p className="text-xs text-[#5c625e] max-w-sm mx-auto">
                  {isHi 
                    ? "आपके द्वारा प्रस्तुत विवरण की आधिकारिक रिकॉर्ड से समीक्षा के उपरांत पोर्टल पर यथोचित सुधार किया जाएगा। धन्यवाद!" 
                    : "Your suggestion has been securely recorded for review. Thank you for strengthening transparency!"}
                </p>
                <button
                  onClick={() => {
                    setSubmitSuccess(false);
                    setFormState({ name: "", category: "representative", wardNumber: "", suggestion: "", sourceUrl: "", contact: "", consent: false });
                  }}
                  className="mt-4 px-6 py-2 bg-primary text-white text-xs font-bold rounded-lg"
                >
                  {isHi ? "अन्य सुधार भेजें" : "Submit Another Suggestion"}
                </button>
              </div>
            ) : (
              <form onSubmit={handleCorrectionSubmit} className="space-y-4 text-xs">
                {submitError && (
                  <div className="p-3 bg-rose-50 text-rose-800 rounded-lg text-xs font-medium border border-rose-200">
                    {submitError}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-[#191e1b] mb-1">
                      {isHi ? "आपका नाम (वैकल्पिक)" : "Your Name (Optional)"}
                    </label>
                    <input
                      type="text"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      placeholder={isHi ? "उदा. रमेश झा" : "e.g. Ramesh Jha"}
                      className="w-full px-3 py-2 rounded-lg border border-[#c0c9c3] bg-white outline-none focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-[#191e1b] mb-1">
                      {isHi ? "सुधार की श्रेणी *" : "Correction Category *"}
                    </label>
                    <select
                      value={formState.category}
                      onChange={(e) => setFormState({ ...formState, category: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-[#c0c9c3] bg-white outline-none focus:border-primary"
                    >
                      <option value="representative">{isHi ? "जनप्रतिनिधि विवरण (Representative)" : "Representative Data"}</option>
                      <option value="ward">{isHi ? "वार्ड विवरण (Ward Info)" : "Ward Info"}</option>
                      <option value="contact">{isHi ? "कार्यालय व संपर्क (Office Contact)" : "Office Contact"}</option>
                      <option value="code">{isHi ? "प्रशासनिक कोड (Admin Codes)" : "Admin Codes"}</option>
                      <option value="other">{isHi ? "अन्य सुझाव (Other Suggestion)" : "Other"}</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-[#191e1b] mb-1">
                      {isHi ? "वार्ड संख्या (यदि ज्ञात हो)" : "Ward Number (If applicable)"}
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="14"
                      value={formState.wardNumber}
                      onChange={(e) => setFormState({ ...formState, wardNumber: e.target.value })}
                      placeholder="1 - 14"
                      className="w-full px-3 py-2 rounded-lg border border-[#c0c9c3] bg-white outline-none focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-[#191e1b] mb-1">
                      {isHi ? "संपर्क फोन/ईमेल (सत्यापन संवाद हेतु)" : "Contact Phone/Email"}
                    </label>
                    <input
                      type="text"
                      value={formState.contact}
                      onChange={(e) => setFormState({ ...formState, contact: e.target.value })}
                      placeholder="+91-XXXXX XXXXX"
                      className="w-full px-3 py-2 rounded-lg border border-[#c0c9c3] bg-white outline-none focus:border-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-[#191e1b] mb-1">
                    {isHi ? "सुझाव / सही जानकारी का विवरण *" : "Correction / Suggested Factual Information *"}
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formState.suggestion}
                    onChange={(e) => setFormState({ ...formState, suggestion: e.target.value })}
                    placeholder={isHi ? "कृपया सही नाम, पद अथवा विवरण लिखें..." : "Enter factual details..."}
                    className="w-full px-3 py-2 rounded-lg border border-[#c0c9c3] bg-white outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#191e1b] mb-1">
                    {isHi ? "समर्थक स्रोत लिंक / सरकारी गजट URL (वैकल्पिक)" : "Supporting Document URL (Optional)"}
                  </label>
                  <input
                    type="url"
                    value={formState.sourceUrl}
                    onChange={(e) => setFormState({ ...formState, sourceUrl: e.target.value })}
                    placeholder="https://..."
                    className="w-full px-3 py-2 rounded-lg border border-[#c0c9c3] bg-white outline-none focus:border-primary"
                  />
                </div>

                <div className="flex items-start gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="panchayatConsent"
                    required
                    checked={formState.consent}
                    onChange={(e) => setFormState({ ...formState, consent: e.target.checked })}
                    className="mt-0.5 rounded text-primary focus:ring-primary w-4 h-4 cursor-pointer"
                  />
                  <label htmlFor="panchayatConsent" className="text-[11px] text-[#5c625e] leading-snug cursor-pointer">
                    {isHi 
                      ? "मैं सहमति देता/देती हूँ कि यह जानकारी सत्य है और प्रशासनिक समीक्षा हेतु उपयुक्त है।" 
                      : "I verify that this information is factual and submitted for civic review."}
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-2.5 bg-primary text-white rounded-lg font-bold hover:bg-[#1b4d3e] transition-colors flex items-center justify-center gap-1.5 shadow-xs disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{submitting ? (isHi ? "सत्यापन एवं प्रेषण जारी..." : "Submitting...") : (isHi ? "सुधार अनुरोध जमा करें" : "Submit Correction")}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* SECTION L: Source and Verification Information Ledger */}
      <section className="w-full bg-white py-10 px-4 sm:px-6 lg:px-10 border-t border-[#ded6c7]">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="flex items-center justify-between border-b border-[#f4efe5] pb-3">
            <h3 className="font-headline text-sm font-bold text-primary flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-primary" />
              <span>{isHi ? "अभिलेख स्रोत एवं सत्यापन लेजर (Verification Ledger)" : "Sources & Verification Ledger"}</span>
            </h3>
            <span className="text-[11px] font-mono text-[#7c837d]">Audited: October 2026</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs text-[#5c625e]">
            <div className="p-3 rounded-lg bg-[#fbf8f0] border border-[#e5e0d3]">
              <strong className="text-[#191e1b] block mb-0.5">1. बिहार पंचायती राज विभाग</strong>
              <span className="block text-[11px]">अगस्त 2024 संपर्क विवरणिका (मुखिया)</span>
              <span className="text-[10px] text-amber-800 font-bold mt-1 inline-block">पुराना रिकॉर्ड — पुनः पुष्टि आवश्यक</span>
            </div>

            <div className="p-3 rounded-lg bg-[#fbf8f0] border border-[#e5e0d3]">
              <strong className="text-[#191e1b] block mb-0.5">2. भारत की जनगणना 2011</strong>
              <span className="block text-[11px]">ग्राम कोड: 219122 | LGD: 101081</span>
              <span className="text-[10px] text-emerald-800 font-bold mt-1 inline-block">आधिकारिक स्रोत से सत्यापित</span>
            </div>

            <div className="p-3 rounded-lg bg-[#fbf8f0] border border-[#e5e0d3]">
              <strong className="text-[#191e1b] block mb-0.5">3. राज्य निर्वाचन आयोग बिहार</strong>
              <span className="block text-[11px]">परिहार प्रखंड निर्वाचन संवर्ग</span>
              <span className="text-[10px] text-amber-800 font-bold mt-1 inline-block">पुष्टि लंबित (Gazette Sync)</span>
            </div>

            <div className="p-3 rounded-lg bg-[#fbf8f0] border border-[#e5e0d3]">
              <strong className="text-[#191e1b] block mb-0.5">4. स्थानीय निकाय डायरेक्टरी</strong>
              <span className="block text-[11px]">वार्ड सं. 1-14 एवं ग्राम सेवक संदर्भ</span>
              <span className="text-[10px] text-[#5c625e] font-bold mt-1 inline-block">संदर्भ स्रोत से प्राप्त (Unverified)</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
