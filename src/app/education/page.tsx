"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { 
  SCHOOL_RECORDS, 
  SCHOLARSHIP_SCHEMES, 
  STUDENT_PARENT_RESOURCES,
  SchoolRecord 
} from "@/lib/educationData";
import {
  GraduationCap,
  School,
  BookOpen,
  Search,
  Filter,
  X,
  ExternalLink,
  ShieldCheck,
  AlertTriangle,
  MapPin,
  Building2,
  Calendar,
  Send,
  CheckCircle2,
  HelpCircle,
  FileText,
  Users,
  Compass,
  Award,
  ChevronRight,
  Info,
  Clock,
  Briefcase
} from "lucide-react";

export default function EducationPage() {
  const { locale, t } = useLanguage();
  const isHi = locale === "hi";

  // Filter & Search state
  const [searchQuery, setSearchQuery] = useState("");
  const [levelFilter, setLevelFilter] = useState("all");
  const [panchayatFilter, setPanchayatFilter] = useState("all");
  const [selectedSchool, setSelectedSchool] = useState<SchoolRecord | null>(null);

  // Form submission state
  const [formSchoolName, setFormSchoolName] = useState("");
  const [formUdise, setFormUdise] = useState("");
  const [formLocation, setFormLocation] = useState("");
  const [formCorrection, setFormCorrection] = useState("");
  const [formSourceUrl, setFormSourceUrl] = useState("");
  const [formSubmitter, setFormSubmitter] = useState("");
  const [formContact, setFormContact] = useState("");
  const [formConsent, setFormConsent] = useState(false);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [formError, setFormError] = useState("");

  // Filter logic
  const filteredSchools = useMemo(() => {
    return SCHOOL_RECORDS.filter((school) => {
      // Level filter
      if (levelFilter !== "all" && school.educationLevel !== levelFilter) {
        return false;
      }
      // Panchayat scope filter
      if (panchayatFilter !== "all" && school.panchayatScope !== panchayatFilter) {
        return false;
      }
      // Query search (name, nameHi, udiseCode, habitation, village)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = school.name.toLowerCase().includes(q);
        const matchesNameHi = school.nameHi.toLowerCase().includes(q);
        const matchesUdise = school.udiseCode.includes(q);
        const matchesHabitation = school.habitation.toLowerCase().includes(q);
        const matchesVillage = school.village.toLowerCase().includes(q);
        const matchesAddress = school.address.toLowerCase().includes(q);
        if (!matchesName && !matchesNameHi && !matchesUdise && !matchesHabitation && !matchesVillage && !matchesAddress) {
          return false;
        }
      }
      return true;
    });
  }, [searchQuery, levelFilter, panchayatFilter]);

  const clearAllFilters = () => {
    setSearchQuery("");
    setLevelFilter("all");
    setPanchayatFilter("all");
  };

  // Form handler
  const handleCorrectionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    setFormSuccess(false);

    if (!formSchoolName.trim() || !formLocation.trim() || !formCorrection.trim()) {
      setFormError(isHi ? "कृपया सभी आवश्यक तारांकित (*) फ़ील्ड भरें।" : "Please fill all required asterisk (*) fields.");
      return;
    }

    if (!formConsent) {
      setFormError(isHi ? "कृपया घोषणा सहमति पर टिक करें।" : "Please check the declaration consent checkbox.");
      return;
    }

    setFormSubmitting(true);
    try {
      const res = await fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "school_correction",
          submitterName: formSubmitter.trim() || (isHi ? "नागरिक प्रविष्टि (शिक्षा पोर्टल)" : "Citizen Contributor"),
          contact: formContact.trim() || null,
          content: `[विद्यालय सुधार प्रविष्टि]: ${formSchoolName.trim()} | यू-डायस: ${formUdise.trim() || "उल्लेखित नहीं"} | स्थान: ${formLocation.trim()} | विवरण: ${formCorrection.trim()} | संदर्भ लिंक: ${formSourceUrl.trim() || "कोई नहीं"}`,
          consent: true,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || (isHi ? "प्रविष्टि सहेजने में विफल" : "Failed to record submission"));
      }

      setFormSuccess(true);
      setFormSchoolName("");
      setFormUdise("");
      setFormLocation("");
      setFormCorrection("");
      setFormSourceUrl("");
      setFormSubmitter("");
      setFormContact("");
      setFormConsent(false);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : (isHi ? "सर्वर से संपर्क करने में त्रुटि।" : "Server connection error.");
      setFormError(msg);
    } finally {
      setFormSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col w-full bg-background min-h-screen">
      {/* =========================================================================
          SECTION A: EDUCATION HERO
          ========================================================================= */}
      <section className="w-full bg-surface-container-low border-b border-outline-variant/60 py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb & Civic Banner */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-8">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold text-secondary">
              <Link href="/" className="flex items-center gap-1 hover:text-primary transition-colors">
                <span>{t.common.home}</span>
              </Link>
              <span className="text-outline-variant">/</span>
              <span className="text-primary font-bold">{t.common.education}</span>
            </nav>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded bg-surface-container text-primary text-xs font-semibold flex items-center gap-1.5 shadow-sm border border-outline-variant/50">
                <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                <span>{isHi ? "आधिकारिक ग्राम निर्देशिका अनुभाग" : "Official Village Directory Section"}</span>
              </span>
              <span className="text-[11px] text-secondary font-mono">
                {isHi ? "संकुल: नारंगा | ब्लॉक: परिहार (01087)" : "Cluster: Naranga | Block: Parihar"}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 flex flex-col gap-4">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary w-fit border border-primary/20">
                <GraduationCap className="w-4 h-4 text-primary" />
                <span className="text-xs font-bold tracking-wide">{t.education.badgeCluster}</span>
              </div>
              
              <h1 className="font-headline text-3xl sm:text-4xl lg:text-5xl text-primary font-extrabold tracking-tight">
                {t.education.pageHeading}
              </h1>

              <p className="font-headline text-lg sm:text-xl text-tertiary font-semibold">
                {t.education.pageSubtitle}
              </p>

              <p className="text-sm sm:text-base text-on-surface-variant max-w-2xl leading-relaxed">
                {t.education.pageDescription}
              </p>

              {/* Geographic badge */}
              <div className="flex flex-wrap items-center gap-2.5 pt-1">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface text-on-surface text-xs font-medium border border-outline-variant/60 shadow-sm">
                  <MapPin className="w-3.5 h-3.5 text-primary" />
                  <span>{isHi ? "नारंगा, परिहार, सीतामढ़ी (पिन: 843324)" : "Naranga, Parihar, Sitamarhi (PIN: 843324)"}</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface text-on-surface text-xs font-medium border border-outline-variant/60 shadow-sm">
                  <Building2 className="w-3.5 h-3.5 text-secondary" />
                  <span>{t.education.locationParihar}</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-3">
                <a
                  href="#schools-directory"
                  className="px-5 py-3 rounded-lg bg-primary text-on-primary text-xs font-bold hover:bg-primary-container transition-all shadow-md flex items-center gap-2"
                >
                  <Search className="w-4 h-4" />
                  <span>{t.education.findSchoolBtn}</span>
                </a>
                <a
                  href="#scholarships-section"
                  className="px-5 py-3 rounded-lg bg-surface border border-primary/30 text-primary text-xs font-bold hover:bg-surface-container transition-all shadow-sm flex items-center gap-2"
                >
                  <Award className="w-4 h-4 text-tertiary" />
                  <span>{t.education.scholarshipBtn}</span>
                </a>
              </div>
            </div>

            {/* Hero Image Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden bg-surface-container shadow-xl border border-outline-variant/60">
                <div
                  className="w-full h-80 sm:h-96 bg-cover bg-center"
                  style={{
                    backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuC4_6XInMPY5QhzwU6EP0JsVkFTDc292zkize-un3aobP56Nog_5psmj-ATs0fBKMH3mlcTMJ6vV339fJfinCcFJSemLDesQ97DajRlL52T2NNZm-f67VX472fveShSiUWQYaurrruSqdTR-pqAiA2XYPxh5OpMtBkk2jG6FwrzwuGq0RuBkZUtu9FK8Qq_Lm7RIJ82H4_cmV-V37jHJNkH_XAK5wmu89r-SU-QKnHAklHFn_pbG9cHOQ')`,
                  }}
                  role="img"
                  aria-label={isHi ? "नारंगा विद्यालय संकुल परिसर" : "Rural school compound in Mithila region"}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-on-primary">
                  <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-primary-fixed mb-1">
                    <BookOpen className="w-4 h-4 text-primary-fixed" />
                    <span>{isHi ? "शिक्षा संकुल अवलोकन" : "Education Cluster Overview"}</span>
                  </div>
                  <h3 className="font-headline text-lg sm:text-xl font-bold text-white">
                    {isHi ? "प्राथमिक से लेकर उच्च माध्यमिक तक का सफर" : "Journey from Primary to Higher Secondary"}
                  </h3>
                  <p className="text-xs text-primary-fixed-dim mt-1">
                    {isHi ? "सर्व शिक्षा अभियान, पीएम पोषण एवं राष्ट्रीय डिजिटल शिक्षा अवसंरचना" : "Sarva Shiksha Abhiyan, PM POSHAN & National Digital Education"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION B: EDUCATION OVERVIEW (STAT CARDS)
          ========================================================================= */}
      <section className="w-full bg-surface py-10 px-4 sm:px-6 lg:px-8 border-b border-outline-variant/60">
        <div className="max-w-7xl mx-auto flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <span className="text-xs uppercase tracking-wider text-tertiary font-bold">
                {isHi ? "सार्वजनिक सांख्यिकी लेखा" : "Public Educational Ledger"}
              </span>
              <h2 className="font-headline text-2xl sm:text-3xl text-primary font-bold mt-0.5">
                {t.education.overviewHeading}
              </h2>
            </div>
            <span className="text-xs text-secondary flex items-center gap-1.5">
              <Info className="w-4 h-4 text-tertiary shrink-0" />
              <span>{t.education.overviewSubtitle}</span>
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Stat Card 1 */}
            <div className="bg-surface-container-lowest rounded-xl p-5 border border-outline-variant/60 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <span className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                  <School className="w-5 h-5 text-primary" />
                </span>
                <span className="px-2 py-0.5 rounded bg-surface-container text-secondary text-[11px] font-semibold">
                  {isHi ? "डायरेक्टरी" : "Directory"}
                </span>
              </div>
              <div className="mt-4">
                <div className="font-headline text-2xl sm:text-3xl text-primary font-extrabold">11</div>
                <p className="text-sm font-bold text-on-surface mt-1">{t.education.statsTotalTitle}</p>
                <p className="text-xs text-secondary mt-0.5 leading-relaxed">{t.education.statsTotalDesc}</p>
              </div>
              <div className="mt-4 pt-3 border-t border-outline-variant/40 flex items-center gap-1.5 text-xs text-tertiary font-medium">
                <Clock className="w-3.5 h-3.5" />
                <span>{isHi ? "UDISE+ संदर्भ संकलित" : "UDISE+ Cataloged"}</span>
              </div>
            </div>

            {/* Stat Card 2 */}
            <div className="bg-surface-container-lowest rounded-xl p-5 border border-outline-variant/60 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <span className="w-10 h-10 rounded-lg bg-surface-container text-primary flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-primary" />
                </span>
                <span className="px-2 py-0.5 rounded bg-surface-container text-primary text-[11px] font-semibold">
                  {isHi ? "कक्षा 1 - 8" : "Class 1 - 8"}
                </span>
              </div>
              <div className="mt-4">
                <div className="font-headline text-2xl sm:text-3xl text-primary font-extrabold">08</div>
                <p className="text-sm font-bold text-on-surface mt-1">{t.education.statsPrimaryTitle}</p>
                <p className="text-xs text-secondary mt-0.5 leading-relaxed">{t.education.statsPrimaryDesc}</p>
              </div>
              <div className="mt-4 pt-3 border-t border-outline-variant/40 flex items-center gap-1.5 text-xs text-primary font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{isHi ? "मध्याह्न भोजन (PM POSHAN) पात्र" : "PM POSHAN MDM Entitled"}</span>
              </div>
            </div>

            {/* Stat Card 3 */}
            <div className="bg-surface-container-lowest rounded-xl p-5 border border-outline-variant/60 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <span className="w-10 h-10 rounded-lg bg-surface-container text-tertiary flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-tertiary" />
                </span>
                <span className="px-2 py-0.5 rounded bg-surface-container text-secondary text-[11px] font-semibold">
                  {isHi ? "कक्षा 9 - 12" : "Class 9 - 12"}
                </span>
              </div>
              <div className="mt-4">
                <div className="font-headline text-2xl sm:text-3xl text-primary font-extrabold">03</div>
                <p className="text-sm font-bold text-on-surface mt-1">{t.education.statsSecondaryTitle}</p>
                <p className="text-xs text-secondary mt-0.5 leading-relaxed">{t.education.statsSecondaryDesc}</p>
              </div>
              <div className="mt-4 pt-3 border-t border-outline-variant/40 flex items-center gap-1.5 text-xs text-secondary font-medium">
                <FileText className="w-3.5 h-3.5" />
                <span>{isHi ? "BSEB बोर्ड परीक्षा संकुल" : "BSEB Board Centers"}</span>
              </div>
            </div>

            {/* Stat Card 4 */}
            <div className="bg-surface-container-lowest rounded-xl p-5 border border-outline-variant/60 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <span className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                  <Award className="w-5 h-5 text-primary" />
                </span>
                <span className="px-2 py-0.5 rounded bg-surface-container-high text-primary text-[11px] font-semibold">
                  {isHi ? "कल्याण" : "Welfare"}
                </span>
              </div>
              <div className="mt-4">
                <div className="font-headline text-2xl sm:text-3xl text-primary font-extrabold">06</div>
                <p className="text-sm font-bold text-on-surface mt-1">{t.education.statsSchemesTitle}</p>
                <p className="text-xs text-secondary mt-0.5 leading-relaxed">{t.education.statsSchemesDesc}</p>
              </div>
              <div className="mt-4 pt-3 border-t border-outline-variant/40 flex items-center gap-1.5 text-xs text-primary font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{isHi ? "DBT प्रत्यक्ष अंतरण सहायता" : "DBT Direct Transfer Aid"}</span>
              </div>
            </div>
          </div>

          {/* Disclaimer / Transparency Note */}
          <div className="p-4 rounded-xl bg-surface-container-low border-l-4 border-tertiary text-on-surface flex items-start gap-3 shadow-sm border border-outline-variant/40">
            <ShieldCheck className="w-5 h-5 text-tertiary shrink-0 mt-0.5" />
            <div className="flex flex-col gap-0.5">
              <span className="text-xs font-bold text-primary">
                {isHi ? "पारदर्शी घोषणा एवं डेटा सत्यापन स्थिति" : "Transparent Declaration & Data Audit Status"}
              </span>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                {isHi
                  ? "यह डेटा सार्वजनिक विद्यालय डायरेक्टरी अभिलेखों (UDISE+) पर आधारित है। संचालन स्थिति एवं आधिकारिक यू-डायस सत्यापन की प्रक्रिया निरंतर जारी है। किसी भी त्रुटि अथवा अद्यतन स्थिति की सूचना ग्राम वासी नीचे दिए गए नागरिक सहयोग प्रपत्र के माध्यम से दर्ज कर सकते हैं।"
                  : "This data is compiled from public directory records (UDISE+). Operational status re-verification is ongoing. Citizens can submit corrections through the verification form below."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION C & D: SCHOOL DIRECTORY WITH SEARCH & FILTERS
          ========================================================================= */}
      <section className="w-full bg-surface-container-low py-12 px-4 sm:px-6 lg:px-8 border-b border-outline-variant/60" id="schools-directory">
        <div className="max-w-7xl mx-auto flex flex-col gap-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <span className="text-xs uppercase tracking-wider text-tertiary font-bold">
                {isHi ? "सार्वजनिक निर्देशिका" : "Public Directory"}
              </span>
              <h2 className="font-headline text-2xl sm:text-3xl text-primary font-bold mt-0.5">
                {t.education.directoryHeading}
              </h2>
              <p className="text-xs sm:text-sm text-secondary mt-1">
                {t.education.directoryDescription}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-surface text-primary text-xs font-bold border border-outline-variant/60 shadow-sm">
                {isHi ? `प्रदर्शित: ${filteredSchools.length} संस्थान` : `Showing: ${filteredSchools.length} schools`}
              </span>
            </div>
          </div>

          {/* Search Bar & Reset */}
          <div className="bg-surface p-4 rounded-xl border border-outline-variant/60 shadow-sm flex flex-col md:flex-row gap-3 items-center">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-outline absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.education.searchPlaceholder}
                className="w-full bg-surface-container-low text-on-surface text-xs sm:text-sm pl-10 pr-4 py-2.5 rounded-lg border border-outline-variant/60 focus:border-primary focus:ring-1 focus:ring-primary outline-none placeholder:text-outline transition-all"
              />
            </div>
            <div className="flex items-center gap-2 w-full md:w-auto shrink-0">
              {(searchQuery || levelFilter !== "all" || panchayatFilter !== "all") && (
                <button
                  type="button"
                  onClick={clearAllFilters}
                  className="px-4 py-2.5 rounded-lg bg-surface-container text-secondary hover:text-primary text-xs font-bold transition-colors flex items-center gap-1.5 border border-outline-variant/60"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>{t.education.clearFilters}</span>
                </button>
              )}
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-col gap-3">
            {/* Level Filters */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-xs">
              <span className="text-secondary font-bold shrink-0 uppercase tracking-wider text-[11px]">
                {isHi ? "शिक्षा स्तर:" : "Level:"}
              </span>
              <button
                type="button"
                onClick={() => setLevelFilter("all")}
                className={`px-3 py-1.5 rounded-full font-bold shrink-0 transition-all ${
                  levelFilter === "all"
                    ? "bg-primary text-on-primary shadow-sm"
                    : "bg-surface text-on-surface hover:bg-surface-container border border-outline-variant/60"
                }`}
              >
                {t.education.allLevels}
              </button>
              <button
                type="button"
                onClick={() => setLevelFilter("primary")}
                className={`px-3 py-1.5 rounded-full font-bold shrink-0 transition-all ${
                  levelFilter === "primary"
                    ? "bg-primary text-on-primary shadow-sm"
                    : "bg-surface text-on-surface hover:bg-surface-container border border-outline-variant/60"
                }`}
              >
                {t.education.primaryLevel}
              </button>
              <button
                type="button"
                onClick={() => setLevelFilter("middle")}
                className={`px-3 py-1.5 rounded-full font-bold shrink-0 transition-all ${
                  levelFilter === "middle"
                    ? "bg-primary text-on-primary shadow-sm"
                    : "bg-surface text-on-surface hover:bg-surface-container border border-outline-variant/60"
                }`}
              >
                {t.education.middleLevel}
              </button>
              <button
                type="button"
                onClick={() => setLevelFilter("secondary")}
                className={`px-3 py-1.5 rounded-full font-bold shrink-0 transition-all ${
                  levelFilter === "secondary"
                    ? "bg-primary text-on-primary shadow-sm"
                    : "bg-surface text-on-surface hover:bg-surface-container border border-outline-variant/60"
                }`}
              >
                {t.education.secondaryLevel}
              </button>
              <button
                type="button"
                onClick={() => setLevelFilter("higher_secondary")}
                className={`px-3 py-1.5 rounded-full font-bold shrink-0 transition-all ${
                  levelFilter === "higher_secondary"
                    ? "bg-primary text-on-primary shadow-sm"
                    : "bg-surface text-on-surface hover:bg-surface-container border border-outline-variant/60"
                }`}
              >
                {t.education.higherSecondaryLevel}
              </button>
            </div>

            {/* Panchayat / Habitation Filters */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-xs">
              <span className="text-secondary font-bold shrink-0 uppercase tracking-wider text-[11px]">
                {isHi ? "प्रशासनिक क्षेत्र:" : "Jurisdiction:"}
              </span>
              <button
                type="button"
                onClick={() => setPanchayatFilter("all")}
                className={`px-3 py-1 rounded font-semibold shrink-0 transition-all ${
                  panchayatFilter === "all"
                    ? "bg-secondary text-white"
                    : "bg-surface text-secondary hover:bg-surface-container border border-outline-variant/60"
                }`}
              >
                {t.education.allPanchayats}
              </button>
              <button
                type="button"
                onClick={() => setPanchayatFilter("naranga_uttari")}
                className={`px-3 py-1 rounded font-semibold shrink-0 transition-all ${
                  panchayatFilter === "naranga_uttari"
                    ? "bg-secondary text-white"
                    : "bg-surface text-secondary hover:bg-surface-container border border-outline-variant/60"
                }`}
              >
                {t.education.panchayatUttari}
              </button>
              <button
                type="button"
                onClick={() => setPanchayatFilter("naranga_dakshini")}
                className={`px-3 py-1 rounded font-semibold shrink-0 transition-all ${
                  panchayatFilter === "naranga_dakshini"
                    ? "bg-secondary text-white"
                    : "bg-surface text-secondary hover:bg-surface-container border border-outline-variant/60"
                }`}
              >
                {t.education.panchayatDakshini}
              </button>
              <button
                type="button"
                onClick={() => setPanchayatFilter("bordering_cluster")}
                className={`px-3 py-1 rounded font-semibold shrink-0 transition-all ${
                  panchayatFilter === "bordering_cluster"
                    ? "bg-secondary text-white"
                    : "bg-surface text-secondary hover:bg-surface-container border border-outline-variant/60"
                }`}
              >
                {t.education.panchayatBorder}
              </button>
            </div>
          </div>

          {/* School Cards Grid */}
          {filteredSchools.length === 0 ? (
            <div className="p-8 sm:p-12 rounded-2xl bg-surface border border-outline-variant/60 text-center flex flex-col items-center justify-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-secondary">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="font-headline text-lg font-bold text-primary">{t.education.noResultsTitle}</h3>
              <p className="text-xs text-secondary max-w-md">{t.education.noResultsDesc}</p>
              <button
                type="button"
                onClick={clearAllFilters}
                className="mt-2 px-4 py-2 bg-primary text-on-primary rounded-lg text-xs font-bold hover:bg-primary-container transition-colors shadow-sm"
              >
                {t.education.clearFilters}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSchools.map((school) => {
                const isInactiveWarning = school.operationalStatus === "inactive_check_needed";
                const isDakshini = school.panchayatScope === "naranga_dakshini";

                return (
                  <article
                    key={school.id}
                    className={`bg-surface rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between border ${
                      isInactiveWarning
                        ? "border-2 border-dashed border-error/50 bg-error-container/10"
                        : "border-outline-variant/60"
                    }`}
                  >
                    {/* Top half — School image */}
                    <div className="relative w-full h-44 sm:h-48 bg-surface-container-high overflow-hidden shrink-0">
                      {school.imageUrl ? (
                        <img
                          src={school.imageUrl}
                          alt={isHi ? school.nameHi : school.name}
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center bg-surface-container text-secondary/60 relative p-4 text-center select-none">
                          <div className="w-12 h-12 rounded-xl bg-surface/80 flex items-center justify-center text-primary/70 shadow-sm border border-outline-variant/30 mb-2">
                            <School className="w-6 h-6" />
                          </div>
                          <span className="text-[11px] font-semibold text-secondary/70">
                            {isHi ? "विद्यालय भवन (प्रतीकात्मक / फोटो प्रतीक्षित)" : "School Campus (Photo Pending)"}
                          </span>
                          <span className="text-[10px] text-outline mt-0.5">
                            {isHi ? "स्थानीय सत्यापन अभिलेख" : "Local Archive Record"}
                          </span>
                        </div>
                      )}
                      {/* Gradient overlay for depth */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none" />

                      {/* Top badges placed over image */}
                      <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2 pointer-events-none">
                        <span className="px-2.5 py-1 rounded bg-surface/90 backdrop-blur-md text-primary font-mono text-[11px] font-bold shadow-sm border border-outline-variant/40">
                          UDISE: {school.udiseCode}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded text-[11px] font-bold flex items-center gap-1 shadow-sm backdrop-blur-md ${
                            isInactiveWarning
                              ? "bg-error text-on-error"
                              : "bg-surface/90 text-secondary border border-outline-variant/40"
                          }`}
                        >
                          {isInactiveWarning ? (
                            <>
                              <AlertTriangle className="w-3 h-3" />
                              <span>{isHi ? "जाँच आवश्यक" : "Verify Status"}</span>
                            </>
                          ) : (
                            <>
                              <ShieldCheck className="w-3 h-3 text-tertiary" />
                              <span>{isHi ? "पुष्टि लंबित" : "Cataloged"}</span>
                            </>
                          )}
                        </span>
                      </div>
                    </div>

                    {/* Bottom half — Existing school details */}
                    <div className="p-5 flex flex-col justify-between flex-1 gap-4">
                      <div className="flex flex-col gap-3">
                        {/* Title & Category */}
                        <div>
                          <h3 className="font-headline text-base sm:text-lg text-primary font-bold leading-snug">
                            {isHi ? school.nameHi : school.name}
                          </h3>
                          <p className="text-xs text-secondary mt-0.5 font-medium">
                            {isHi ? school.levelLabelHi : school.levelLabelEn}
                          </p>
                        </div>

                        {/* Detail Tags */}
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          <span className="px-2 py-0.5 rounded bg-surface-container-high text-on-surface text-[11px] font-medium">
                            {isHi ? school.categoryDetailHi : school.categoryDetailEn}
                          </span>
                          <span className="px-2 py-0.5 rounded bg-surface-container-high text-on-surface text-[11px] font-medium">
                            {school.medium}
                          </span>
                          {isDakshini && (
                            <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-900 text-[11px] font-bold">
                              {isHi ? "नारंगा दक्षिणी" : "Naranga Dakshini"}
                            </span>
                          )}
                        </div>

                        {/* Warning notice if inactive */}
                        {isInactiveWarning && school.warningNoteHi && (
                          <div className="p-2.5 rounded bg-error-container/60 text-on-error-container text-[11px] leading-relaxed flex items-start gap-1.5 border border-error/20">
                            <AlertTriangle className="w-3.5 h-3.5 shrink-0 text-error mt-0.5" />
                            <span>{isHi ? school.warningNoteHi : school.warningNoteEn}</span>
                          </div>
                        )}

                        {/* Location text */}
                        <div className="text-xs text-on-surface-variant flex items-center gap-1.5 pt-1">
                          <MapPin className="w-3.5 h-3.5 text-secondary shrink-0" />
                          <span className="truncate">{school.habitation}, {school.village}</span>
                        </div>
                      </div>

                      {/* Card Footer with Details Modal trigger */}
                      <div className="pt-3 border-t border-outline-variant/40 flex items-center justify-between">
                        <span className="text-[11px] text-secondary font-medium">
                          {isHi ? "डायरेक्टरी में सूचीबद्ध" : "Listed in Directory"}
                        </span>
                        <button
                          type="button"
                          onClick={() => setSelectedSchool(school)}
                          className="px-3 py-1.5 rounded bg-surface-container text-primary hover:bg-primary hover:text-on-primary transition-colors text-xs font-bold flex items-center gap-1 border border-outline-variant/40"
                        >
                          <span>{t.education.viewDetails}</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* =========================================================================
          SECTION E: SCHOOL DETAIL DIALOG MODAL (POPUP)
          ========================================================================= */}
      {selectedSchool && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-surface rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-outline-variant/60 flex flex-col gap-6 animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 border-b border-outline-variant/40 pb-4">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="px-2.5 py-0.5 rounded bg-primary text-on-primary font-mono text-xs font-bold">
                    UDISE: {selectedSchool.udiseCode}
                  </span>
                  <span className="px-2.5 py-0.5 rounded bg-surface-container text-secondary text-xs font-semibold">
                    {isHi ? selectedSchool.statusTextHi : selectedSchool.statusTextEn}
                  </span>
                </div>
                <h3 className="font-headline text-xl sm:text-2xl text-primary font-extrabold">
                  {isHi ? selectedSchool.nameHi : selectedSchool.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedSchool(null)}
                className="w-8 h-8 rounded-full bg-surface-container hover:bg-surface-container-high text-secondary flex items-center justify-center transition-colors shrink-0"
                aria-label={t.education.closeDetails}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Content Grid */}
            <div className="flex flex-col gap-4 text-xs sm:text-sm text-on-surface">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 rounded-lg bg-surface-container-low border border-outline-variant/40">
                  <span className="text-[11px] text-secondary block font-semibold">{isHi ? "शिक्षा स्तर:" : "Education Level:"}</span>
                  <span className="font-bold text-primary mt-0.5 block">{isHi ? selectedSchool.levelLabelHi : selectedSchool.levelLabelEn}</span>
                </div>
                <div className="p-3 rounded-lg bg-surface-container-low border border-outline-variant/40">
                  <span className="text-[11px] text-secondary block font-semibold">{isHi ? "प्रबंधन निकाय:" : "Management:"}</span>
                  <span className="font-bold text-on-surface mt-0.5 block">{selectedSchool.managementType}</span>
                </div>
                <div className="p-3 rounded-lg bg-surface-container-low border border-outline-variant/40">
                  <span className="text-[11px] text-secondary block font-semibold">{isHi ? "शिक्षण माध्यम:" : "Medium of Instruction:"}</span>
                  <span className="font-bold text-on-surface mt-0.5 block">{selectedSchool.medium}</span>
                </div>
                <div className="p-3 rounded-lg bg-surface-container-low border border-outline-variant/40">
                  <span className="text-[11px] text-secondary block font-semibold">{isHi ? "प्रशासनिक संकुल:" : "Panchayat Cluster:"}</span>
                  <span className="font-bold text-primary mt-0.5 block">{isHi ? selectedSchool.panchayatLabelHi : selectedSchool.panchayatLabelEn}</span>
                </div>
              </div>

              {/* Habitation & Address */}
              <div className="p-3.5 rounded-lg bg-surface-container-low border border-outline-variant/40">
                <span className="text-[11px] text-secondary block font-semibold">{isHi ? "सटीक पता एवं टोला:" : "Address & Habitation:"}</span>
                <p className="mt-1 font-medium text-on-surface">{selectedSchool.address}</p>
              </div>

              {/* Facilities Note */}
              <div className="p-3.5 rounded-lg bg-surface-container border border-outline-variant/40">
                <span className="text-[11px] text-primary block font-bold">{isHi ? "कल्याण एवं पोषण योजना संदर्भ:" : "Welfare & Nutrition Reference:"}</span>
                <p className="mt-1 text-on-surface-variant leading-relaxed">
                  {isHi ? selectedSchool.facilitiesNoteHi : selectedSchool.facilitiesNoteEn}
                </p>
              </div>

              {/* Warning note if applicable */}
              {selectedSchool.warningNoteHi && (
                <div className="p-3.5 rounded-lg bg-amber-50 border border-amber-300 text-amber-900 text-xs leading-relaxed flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <div>
                    <strong>{isHi ? "महत्वपूर्ण संज्ञान: " : "Important Note: "}</strong>
                    {isHi ? selectedSchool.warningNoteHi : selectedSchool.warningNoteEn}
                  </div>
                </div>
              )}

              {/* Audit Verification details */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 text-[11px] text-secondary">
                <span>
                  <strong>{isHi ? "डेटा स्रोत: " : "Source: "}</strong> {selectedSchool.sourceName}
                </span>
                <span>
                  <strong>{isHi ? "सत्यापन संदर्भ: " : "Audit Date: "}</strong> {selectedSchool.lastVerifiedAt}
                </span>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-outline-variant/40 pt-4">
              <a
                href={selectedSchool.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-4 py-2 rounded-lg bg-surface-container-high hover:bg-surface-container text-primary text-xs font-bold transition-colors inline-flex items-center justify-center gap-1.5 border border-outline-variant/40"
              >
                <span>{isHi ? "UDISE+ राष्ट्रीय पोर्टल पर देखें" : "Verify on UDISE+ Portal"}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <button
                type="button"
                onClick={() => setSelectedSchool(null)}
                className="w-full sm:w-auto px-5 py-2 rounded-lg bg-primary text-on-primary text-xs font-bold hover:bg-primary-container transition-colors"
              >
                {t.education.closeDetails}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          HISTORICAL CENSUS 2011 EDUCATION DATA & AUDIT
          ========================================================================= */}
      <section className="w-full bg-surface py-12 px-4 sm:px-6 lg:px-8 border-b border-outline-variant/60">
        <div className="max-w-7xl mx-auto flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <span className="text-xs uppercase tracking-wider text-tertiary font-bold">
                {isHi ? "ऐतिहासिक अभिलेख" : "Historical Archive"}
              </span>
              <h2 className="font-headline text-2xl sm:text-3xl text-primary font-bold mt-0.5">
                {isHi ? "नारंगा में शिक्षा की उपलब्ध ऐतिहासिक जानकारी" : "Historical Education Records in Naranga"}
              </h2>
            </div>
            <span className="px-3 py-1 rounded bg-surface-container text-secondary text-xs font-mono border border-outline-variant/40">
              {isHi ? "स्रोत: Census of India 2011 (Village Directory)" : "Source: Census of India 2011"}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Visual Metric Ledger */}
            <div className="lg:col-span-8 bg-surface-container-lowest rounded-2xl p-6 sm:p-8 border border-outline-variant/60 shadow-sm flex flex-col justify-between">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-headline text-lg sm:text-xl text-primary font-bold">
                    {isHi ? "जनगणना 2011 ग्राम निर्देशिका रिकॉर्ड" : "Census 2011 Village Directory Records"}
                  </h3>
                  <span className="text-xs text-secondary font-medium">
                    {isHi ? "सरकारी विद्यालय अभिलेख" : "Govt School Enumeration"}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
                  <div className="p-4 rounded-xl bg-surface-container-low flex flex-col items-center text-center border border-outline-variant/40">
                    <span className="font-headline text-2xl sm:text-3xl text-primary font-extrabold">06</span>
                    <span className="text-xs font-bold text-on-surface mt-1">{isHi ? "प्राथमिक विद्यालय" : "Primary"}</span>
                    <span className="text-[11px] text-secondary mt-0.5">Govt. Primary</span>
                  </div>
                  <div className="p-4 rounded-xl bg-surface-container-low flex flex-col items-center text-center border border-outline-variant/40">
                    <span className="font-headline text-2xl sm:text-3xl text-primary font-extrabold">05</span>
                    <span className="text-xs font-bold text-on-surface mt-1">{isHi ? "मध्य विद्यालय" : "Middle"}</span>
                    <span className="text-[11px] text-secondary mt-0.5">Govt. Middle</span>
                  </div>
                  <div className="p-4 rounded-xl bg-surface-container-low flex flex-col items-center text-center border border-outline-variant/40">
                    <span className="font-headline text-2xl sm:text-3xl text-primary font-extrabold">01</span>
                    <span className="text-xs font-bold text-on-surface mt-1">{isHi ? "माध्यमिक विद्यालय" : "Secondary"}</span>
                    <span className="text-[11px] text-secondary mt-0.5">Govt. Secondary</span>
                  </div>
                  <div className="p-4 rounded-xl bg-surface-container-low flex flex-col items-center text-center border border-outline-variant/40">
                    <span className="font-headline text-2xl sm:text-3xl text-primary font-extrabold">01</span>
                    <span className="text-xs font-bold text-on-surface mt-1">{isHi ? "उच्च माध्यमिक" : "Sr. Secondary"}</span>
                    <span className="text-[11px] text-secondary mt-0.5">Sr. Secondary</span>
                  </div>
                </div>

                {/* Ratio Bar */}
                <div className="mt-4 p-4 rounded-xl bg-surface-container flex flex-col gap-2 border border-outline-variant/40">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-primary">
                      {isHi ? "विद्यालय स्तर विभाजन अनुपात (Census 2011)" : "School Ratio Distribution (Census 2011)"}
                    </span>
                    <span className="text-secondary font-mono">
                      {isHi ? "कुल: 13 संस्थागत इकाइयाँ" : "Total: 13 Institutions"}
                    </span>
                  </div>
                  <div className="w-full h-3.5 rounded-full overflow-hidden flex bg-surface shadow-inner">
                    <div className="h-full bg-primary" style={{ width: "46%" }} title="Primary: 46%" />
                    <div className="h-full bg-tertiary-container" style={{ width: "38%" }} title="Middle: 38%" />
                    <div className="h-full bg-tertiary" style={{ width: "8%" }} title="Secondary: 8%" />
                    <div className="h-full bg-secondary" style={{ width: "8%" }} title="Higher Secondary: 8%" />
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-secondary pt-1">
                    <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-primary" /><span>{isHi ? "प्राथमिक (46%)" : "Primary (46%)"}</span></div>
                    <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-tertiary-container" /><span>{isHi ? "मध्य (38%)" : "Middle (38%)"}</span></div>
                    <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-tertiary" /><span>{isHi ? "माध्यमिक (8%)" : "Secondary (8%)"}</span></div>
                    <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-secondary" /><span>{isHi ? "उच्च माध्यमिक (8%)" : "Higher Sec (8%)"}</span></div>
                  </div>
                </div>
              </div>

              {/* Note */}
              <div className="mt-6 p-4 rounded-xl bg-surface-container-high border-l-4 border-primary text-on-surface text-xs leading-relaxed">
                <span className="font-bold text-primary block mb-0.5">
                  {isHi ? "ऐतिहासिक ग्राम निर्देशिका संदर्भ नोट:" : "Historical Directory Reference Note:"}
                </span>
                {isHi
                  ? "वर्तमान स्थिति की पुष्टि आवश्यक है। 2011 के पश्चात बिहार शिक्षा परियोजना एवं समेकित विद्यालय संकुल योजना के तहत कई प्राथमिक विद्यालयों का मध्य अथवा उत्क्रमित उच्च विद्यालयों (Composite Schools) में विलय अथवा उन्नयन हुआ है, जिसके कारण वर्तमान गणना ऐतिहासिक डायरेक्टरी से भिन्न हो सकती है।"
                  : "Ground re-verification is required. Post-2011 school consolidation and upgradations by Bihar Education Project Council may reflect updated institutional structures compared to legacy census counts."}
              </div>
            </div>

            {/* Administrative Framework Card */}
            <div className="lg:col-span-4 bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant/60 shadow-sm flex flex-col justify-between">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2 text-primary">
                  <ShieldCheck className="w-6 h-6 text-primary" />
                  <h3 className="font-headline text-lg font-bold">
                    {isHi ? "प्रशासनिक संकुल विवरण" : "Administrative Framework"}
                  </h3>
                </div>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  {isHi
                    ? "ग्राम पंचायत नारंगा उत्तरी एवं दक्षिणी संकुल के विद्यालय बिहार शिक्षा परियोजना परिषद तथा जिला शिक्षा पदाधिकारी, सीतामढ़ी के प्रशासनिक नियंत्रण में संचालित होते हैं।"
                    : "Schools across Naranga cluster operate under the administrative jurisdiction of District Education Officer (DEO), Sitamarhi and Bihar Education Project Council."}
                </p>
                <div className="flex flex-col gap-2 pt-1 text-xs">
                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-surface-container-low border border-outline-variant/40">
                    <span className="text-secondary font-medium">{isHi ? "प्रखंड संसाधन केंद्र (BRC):" : "BRC Center:"}</span>
                    <span className="text-primary font-bold">{isHi ? "परिहार" : "Parihar"}</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-surface-container-low border border-outline-variant/40">
                    <span className="text-secondary font-medium">{isHi ? "संकुल संसाधन केंद्र (CRC):" : "CRC Cluster:"}</span>
                    <span className="text-primary font-bold">{isHi ? "नारंगा संकुल" : "Naranga Cluster"}</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-surface-container-low border border-outline-variant/40">
                    <span className="text-secondary font-medium">{isHi ? "पोषण योजना निगरानी:" : "Nutrition Oversight:"}</span>
                    <span className="text-primary font-bold">PM POSHAN Bihar</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-surface-container-low border border-outline-variant/40">
                    <span className="text-secondary font-medium">{isHi ? "छात्रवृत्ति डायरेक्टरी:" : "Scholarship Portal:"}</span>
                    <span className="text-primary font-bold">Medhasoft NIC</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-outline-variant/40">
                <a
                  href="https://udiseplus.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-lg bg-surface-container hover:bg-surface-container-high text-primary text-xs font-bold flex items-center justify-center gap-2 transition-colors border border-outline-variant/40"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>{isHi ? "UDISE+ राष्ट्रीय पोर्टल पर जाँचें" : "Verify on UDISE+ Portal"}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION F: SCHOLARSHIPS AND GOVERNMENT SCHEMES
          ========================================================================= */}
      <section className="w-full bg-surface-container-low py-12 px-4 sm:px-6 lg:px-8 border-b border-outline-variant/60" id="scholarships-section">
        <div className="max-w-7xl mx-auto flex flex-col gap-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <span className="text-xs uppercase tracking-wider text-tertiary font-bold">
                {isHi ? "सरकारी छात्र कल्याण कार्यक्रम" : "Government Student Welfare"}
              </span>
              <h2 className="font-headline text-2xl sm:text-3xl text-primary font-bold mt-0.5">
                {t.education.scholarshipsHeading}
              </h2>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-secondary">
              <ShieldCheck className="w-4 h-4 text-primary" />
              <span>{t.education.scholarshipsSubtitle}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SCHOLARSHIP_SCHEMES.map((scheme) => (
              <div
                key={scheme.id}
                className="bg-surface rounded-xl p-6 border border-outline-variant/60 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded bg-primary/10 text-primary font-bold text-xs">
                      {isHi ? scheme.categoryHi : scheme.categoryEn}
                    </span>
                    <ExternalLink className="w-4 h-4 text-secondary" />
                  </div>
                  <h3 className="font-headline text-base sm:text-lg text-primary font-bold leading-snug">
                    {isHi ? scheme.nameHi : scheme.nameEn}
                  </h3>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    {isHi ? scheme.descriptionHi : scheme.descriptionEn}
                  </p>
                  <div className="flex flex-col gap-1.5 text-xs text-secondary pt-2">
                    {(isHi ? scheme.pointsHi : scheme.pointsEn).map((pt, idx) => (
                      <span key={idx} className="flex items-start gap-1.5">
                        <span className="text-primary font-bold">•</span>
                        <span>{pt}</span>
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-outline-variant/40">
                  <a
                    href={scheme.officialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-4 rounded-lg bg-surface-container text-primary hover:bg-primary hover:text-on-primary transition-all text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm border border-outline-variant/40"
                  >
                    <span>{t.education.officialPortalBtn}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION G: STUDENT AND PARENT RESOURCES
          ========================================================================= */}
      <section className="w-full bg-surface py-12 px-4 sm:px-6 lg:px-8 border-b border-outline-variant/60">
        <div className="max-w-7xl mx-auto flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <span className="text-xs uppercase tracking-wider text-tertiary font-bold">
                {isHi ? "शैक्षणिक सहायता एवं पोर्टल" : "Academic Resources & Portals"}
              </span>
              <h2 className="font-headline text-2xl sm:text-3xl text-primary font-bold mt-0.5">
                {t.education.studentResourcesHeading}
              </h2>
            </div>
            <span className="text-xs text-secondary">
              {t.education.studentResourcesSubtitle}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {STUDENT_PARENT_RESOURCES.map((res) => (
              <a
                key={res.id}
                href={res.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-5 rounded-xl bg-surface-container-lowest border border-outline-variant/60 shadow-sm hover:shadow-md hover:border-primary/50 transition-all flex flex-col justify-between group"
              >
                <div>
                  <span className="px-2 py-0.5 rounded bg-surface-container text-secondary text-[11px] font-semibold">
                    {isHi ? res.categoryHi : res.categoryEn}
                  </span>
                  <h3 className="font-headline text-sm sm:text-base font-bold text-primary group-hover:text-primary-container mt-2">
                    {isHi ? res.titleHi : res.titleEn}
                  </h3>
                  <p className="text-xs text-on-surface-variant mt-2 leading-relaxed">
                    {isHi ? res.descHi : res.descEn}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-outline-variant/40 flex items-center justify-between text-xs font-bold text-primary">
                  <span className="truncate text-[11px] text-secondary font-mono">{res.portalText}</span>
                  <ExternalLink className="w-3.5 h-3.5 shrink-0 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION H: EDUCATION NOTICES & NEWS BOARD
          ========================================================================= */}
      <section className="w-full bg-surface-container-low py-12 px-4 sm:px-6 lg:px-8 border-b border-outline-variant/60">
        <div className="max-w-7xl mx-auto flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <span className="text-xs uppercase tracking-wider text-tertiary font-bold">
                {isHi ? "आधिकारिक सूचना पट्ट" : "Official Notice Board"}
              </span>
              <h2 className="font-headline text-2xl sm:text-3xl text-primary font-bold mt-0.5">
                {t.education.noticesHeading}
              </h2>
            </div>
            <span className="text-xs text-secondary">{t.education.noticesSubtitle}</span>
          </div>

          {/* Clean Honest Empty-State Card */}
          <div className="rounded-2xl bg-surface p-8 sm:p-12 border border-outline-variant/60 shadow-sm flex flex-col items-center justify-center text-center max-w-3xl mx-auto w-full gap-4">
            <div className="w-14 h-14 rounded-2xl bg-surface-container flex items-center justify-center text-primary shadow-inner">
              <FileText className="w-7 h-7 text-primary" />
            </div>
            <div className="flex flex-col gap-1.5">
              <h3 className="font-headline text-lg sm:text-xl text-primary font-bold">
                {t.education.noNoticesMessage}
              </h3>
              <p className="text-xs sm:text-sm text-on-surface-variant max-w-md mx-auto leading-relaxed">
                {t.education.noNoticesSub}
              </p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-surface-container-low text-secondary text-xs shadow-sm mt-1 border border-outline-variant/40">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span>{isHi ? "शिक्षा विभाग सीतामढ़ी पोर्टल निगरानी सक्रिय है" : "Sitamarhi Education Department monitoring active"}</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION I: CITIZEN CORRECTION & NEW SCHOOL SUBMISSION FORM
          ========================================================================= */}
      <section className="w-full bg-surface py-12 px-4 sm:px-6 lg:px-8 border-b border-outline-variant/60" id="suggest-correction">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Submission Form */}
          <div className="lg:col-span-7 bg-surface-container-lowest rounded-2xl p-6 sm:p-8 border border-outline-variant/60 shadow-sm flex flex-col gap-6">
            <div>
              <span className="text-xs uppercase tracking-wider text-tertiary font-bold">
                {isHi ? "जन-सहभागिता मंच" : "Community Co-Building"}
              </span>
              <h2 className="font-headline text-xl sm:text-2xl text-primary font-bold mt-1">
                {t.education.formHeading}
              </h2>
              <p className="text-xs sm:text-sm text-secondary mt-1 leading-relaxed">
                {t.education.formSubtitle}
              </p>
            </div>

            <form onSubmit={handleCorrectionSubmit} className="flex flex-col gap-4">
              {formError && (
                <div className="p-3.5 rounded-lg bg-error-container text-on-error-container text-xs flex items-center gap-2 border border-error/30">
                  <AlertTriangle className="w-4 h-4 text-error shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              {formSuccess && (
                <div className="p-3.5 rounded-lg bg-primary/10 text-primary text-xs flex items-center gap-2 border border-primary/30">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                  <span>{t.education.formSuccessMsg}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-on-surface">
                    {t.education.formSchoolName}
                  </label>
                  <input
                    type="text"
                    required
                    value={formSchoolName}
                    onChange={(e) => setFormSchoolName(e.target.value)}
                    placeholder={isHi ? "उदा. राजकीय मध्य विद्यालय..." : "e.g. Govt Middle School..."}
                    className="bg-surface-container-low text-on-surface text-xs px-3.5 py-2.5 rounded-lg border border-outline-variant/60 focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-on-surface">
                    {t.education.formUdise}
                  </label>
                  <input
                    type="text"
                    value={formUdise}
                    onChange={(e) => setFormUdise(e.target.value)}
                    placeholder="उदा. 10041200101"
                    className="bg-surface-container-low text-on-surface font-mono text-xs px-3.5 py-2.5 rounded-lg border border-outline-variant/60 focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-on-surface">
                    {t.education.formLocation}
                  </label>
                  <input
                    type="text"
                    required
                    value={formLocation}
                    onChange={(e) => setFormLocation(e.target.value)}
                    placeholder={isHi ? "उदा. वार्ड 04, नारंगा दक्षिण..." : "e.g. Ward 04, Naranga South..."}
                    className="bg-surface-container-low text-on-surface text-xs px-3.5 py-2.5 rounded-lg border border-outline-variant/60 focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-on-surface">
                    {t.education.formSourceUrl}
                  </label>
                  <input
                    type="url"
                    value={formSourceUrl}
                    onChange={(e) => setFormSourceUrl(e.target.value)}
                    placeholder="https://..."
                    className="bg-surface-container-low text-on-surface text-xs px-3.5 py-2.5 rounded-lg border border-outline-variant/60 focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-on-surface">
                  {t.education.formInfoToCorrect}
                </label>
                <textarea
                  required
                  rows={3}
                  value={formCorrection}
                  onChange={(e) => setFormCorrection(e.target.value)}
                  placeholder={isHi ? "वर्तमान में विद्यालय संचालन स्थिति, भवन स्थिति, या संपर्क विवरण के बारे में स्पष्ट जानकारी लिखें..." : "Describe the update or correction in detail..."}
                  className="bg-surface-container-low text-on-surface text-xs p-3.5 rounded-lg border border-outline-variant/60 focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-on-surface">
                    {t.education.formSubmitterName}
                  </label>
                  <input
                    type="text"
                    value={formSubmitter}
                    onChange={(e) => setFormSubmitter(e.target.value)}
                    placeholder={isHi ? "आपका नाम" : "Your Name"}
                    className="bg-surface-container-low text-on-surface text-xs px-3.5 py-2.5 rounded-lg border border-outline-variant/60 focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-on-surface">
                    {t.education.formContact}
                  </label>
                  <input
                    type="text"
                    value={formContact}
                    onChange={(e) => setFormContact(e.target.value)}
                    placeholder={isHi ? "फ़ोन नंबर या ईमेल" : "Phone or Email"}
                    className="bg-surface-container-low text-on-surface text-xs px-3.5 py-2.5 rounded-lg border border-outline-variant/60 focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                  />
                </div>
              </div>

              {/* Consent checkbox */}
              <div className="flex items-start gap-2 pt-1">
                <input
                  type="checkbox"
                  id="consentCheckbox"
                  checked={formConsent}
                  onChange={(e) => setFormConsent(e.target.checked)}
                  className="mt-0.5 rounded text-primary focus:ring-primary"
                />
                <label htmlFor="consentCheckbox" className="text-xs text-on-surface-variant leading-relaxed cursor-pointer">
                  {t.education.formConsent}
                </label>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-3 border-t border-outline-variant/40">
                <span className="text-[11px] text-secondary">
                  {isHi ? "प्रस्तुत जानकारी सत्यापन उपरांत ही प्रदर्शित की जाएगी।" : "Submitted data is displayed only after administrative verification."}
                </span>
                <button
                  type="submit"
                  disabled={formSubmitting}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-primary text-on-primary text-xs font-bold hover:bg-primary-container transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{formSubmitting ? (isHi ? "भेजा जा रहा है..." : "Submitting...") : t.education.formSubmitBtn}</span>
                </button>
              </div>
            </form>
          </div>

          {/* Section J: Official Sources Ledger */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="bg-surface-container-lowest rounded-2xl p-6 sm:p-8 border border-outline-variant/60 shadow-sm flex flex-col gap-4">
              <div className="flex items-center gap-2 text-primary">
                <ShieldCheck className="w-6 h-6 text-primary" />
                <h3 className="font-headline text-lg font-bold">
                  {t.education.sourcesHeading}
                </h3>
              </div>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                {t.education.sourcesDescription}
              </p>

              <div className="flex flex-col gap-2.5 pt-1">
                <a
                  href="https://udiseplus.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors flex items-center justify-between group border border-outline-variant/40"
                >
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-primary group-hover:text-primary-container">
                      UDISE+ राष्ट्रीय पोर्टल
                    </span>
                    <span className="text-[11px] text-secondary">
                      स्कूल शिक्षा और साक्षरता विभाग, भारत सरकार
                    </span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-secondary group-hover:text-primary transition-colors" />
                </a>

                <a
                  href="https://www.education.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors flex items-center justify-between group border border-outline-variant/40"
                >
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-primary group-hover:text-primary-container">
                      शिक्षा मंत्रालय (Ministry of Education)
                    </span>
                    <span className="text-[11px] text-secondary">
                      भारत सरकार की नीतियाँ एवं समग्र शिक्षा योजना
                    </span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-secondary group-hover:text-primary transition-colors" />
                </a>

                <a
                  href="https://scholarships.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors flex items-center justify-between group border border-outline-variant/40"
                >
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-primary group-hover:text-primary-container">
                      राष्ट्रीय छात्रवृत्ति पोर्टल (NSP)
                    </span>
                    <span className="text-[11px] text-secondary">
                      केन्द्रीय प्री-मैट्रिक एवं पोस्ट-मैट्रिक छात्रवृत्तियाँ
                    </span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-secondary group-hover:text-primary transition-colors" />
                </a>

                <a
                  href="https://sitamarhi.nic.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors flex items-center justify-between group border border-outline-variant/40"
                >
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-primary group-hover:text-primary-container">
                      जिला प्रशासन सीतामढ़ी
                    </span>
                    <span className="text-[11px] text-secondary">
                      जिला शिक्षा पदाधिकारी (DEO) आदेश एवं अधिसूचना
                    </span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-secondary group-hover:text-primary transition-colors" />
                </a>
              </div>
            </div>

            {/* Help Desk Callout */}
            <div className="p-5 rounded-2xl bg-surface-container border border-outline-variant/60 text-on-surface flex items-start gap-3.5 shadow-sm">
              <HelpCircle className="w-6 h-6 text-tertiary shrink-0 mt-0.5" />
              <div className="flex flex-col gap-1">
                <span className="text-xs font-bold text-primary">
                  {isHi ? "सहायता एवं मार्गदर्शन केंद्र" : "Helpdesk & Grievance"}
                </span>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  {isHi
                    ? "छात्रवृत्ति आवेदन, स्कूल स्थानांतरण प्रमाण पत्र (TC), अथवा मध्याह्न भोजन संबंधी किसी भी शिकायत हेतु प्रखंड शिक्षा पदाधिकारी (BEO), परिहार कार्यालय से संपर्क किया जा सकता है।"
                    : "For scholarship application issues, school transfer certificates (TC), or mid-day meal grievances, citizens can consult the Block Education Officer (BEO), Parihar."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
