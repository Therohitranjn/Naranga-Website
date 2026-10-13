"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { IMAGES } from "@/lib/data";
import {
  HEALTH_FACILITIES,
  HEALTH_SCHEMES,
  HEALTH_AWARENESS_TOPICS,
  HealthFacility
} from "@/lib/healthData";
import {
  HeartPulse,
  PhoneCall,
  Phone,
  Stethoscope,
  Building2,
  MapPin,
  Clock,
  ShieldCheck,
  AlertTriangle,
  Search,
  X,
  ChevronRight,
  ExternalLink,
  Send,
  CheckCircle2,
  HelpCircle,
  Activity,
  Droplet,
  Baby,
  Users,
  Shield,
  FileText,
  LifeBuoy,
  PlusCircle,
  Info
} from "lucide-react";

export default function HealthPage() {
  const { locale, t } = useLanguage();
  const isHi = locale === "hi";

  // Directory Search and Filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [facilityFilter, setFacilityFilter] = useState("all");
  const [selectedFacility, setSelectedFacility] = useState<HealthFacility | null>(null);

  // Suggest a correction form state
  const [formFacilityName, setFormFacilityName] = useState("");
  const [formFacilityType, setFormFacilityType] = useState("govt-subcenter");
  const [formLocation, setFormLocation] = useState("");
  const [formCorrection, setFormCorrection] = useState("");
  const [formSourceUrl, setFormSourceUrl] = useState("");
  const [formSubmitter, setFormSubmitter] = useState("");
  const [formContact, setFormContact] = useState("");
  const [formConsent, setFormConsent] = useState(false);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [formError, setFormError] = useState("");

  // Filtering facilities
  const filteredFacilities = useMemo(() => {
    return HEALTH_FACILITIES.filter((facility) => {
      // Type filter
      if (facilityFilter !== "all" && facility.facilityType !== facilityFilter) {
        return false;
      }
      // Query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = facility.name.toLowerCase().includes(q);
        const matchesNameHi = facility.nameHi.toLowerCase().includes(q);
        const matchesAddress = facility.address.toLowerCase().includes(q);
        const matchesVillage = facility.village.toLowerCase().includes(q);
        const matchesServices = facility.servicesHi.some((s) => s.toLowerCase().includes(q)) ||
                                facility.servicesEn.some((s) => s.toLowerCase().includes(q));
        if (!matchesName && !matchesNameHi && !matchesAddress && !matchesVillage && !matchesServices) {
          return false;
        }
      }
      return true;
    });
  }, [searchQuery, facilityFilter]);

  const clearFilters = () => {
    setSearchQuery("");
    setFacilityFilter("all");
  };

  // Correction form submission handler
  const handleCorrectionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    setFormSuccess(false);

    if (!formFacilityName.trim() || !formLocation.trim() || !formCorrection.trim()) {
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
          type: "health_facility_correction",
          submitterName: formSubmitter.trim() || (isHi ? "नागरिक प्रविष्टि (स्वास्थ्य पोर्टल)" : "Citizen Contributor"),
          contact: formContact.trim() || null,
          content: `[स्वास्थ्य सुविधा सुधार]: ${formFacilityName.trim()} | प्रकार: ${formFacilityType} | स्थान: ${formLocation.trim()} | विवरण: ${formCorrection.trim()} | स्रोत लिंक: ${formSourceUrl.trim() || "कोई नहीं"}`,
          consent: true,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || (isHi ? "प्रविष्टि सहेजने में विफल" : "Failed to record submission"));
      }

      setFormSuccess(true);
      setFormFacilityName("");
      setFormFacilityType("govt-subcenter");
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
          SECTION 1: HEALTH HERO
          ========================================================================= */}
      <section className="w-full bg-surface-container-low border-b border-outline-variant/60 py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb & Metadata strip */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-8">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold text-secondary">
              <Link href="/" className="flex items-center gap-1 hover:text-primary transition-colors">
                <span>{t.common.home}</span>
              </Link>
              <span className="text-outline-variant">/</span>
              <span className="text-primary font-bold">{t.common.health}</span>
            </nav>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded bg-surface-container text-primary text-xs font-semibold flex items-center gap-1.5 shadow-sm border border-outline-variant/50">
                <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                <span>{t.health.badgeCluster}</span>
              </span>
              <span className="text-[11px] text-secondary font-mono">
                {isHi ? "प्रखंड: परिहार | जिला: सीतामढ़ी (843324)" : "Block: Parihar | Sitamarhi (843324)"}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 flex flex-col gap-4">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary w-fit border border-primary/20">
                <HeartPulse className="w-4 h-4 text-primary" />
                <span className="text-xs font-bold tracking-wide">{t.health.tag}</span>
              </div>

              <h1 className="font-headline text-3xl sm:text-4xl lg:text-5xl text-primary font-extrabold tracking-tight">
                {t.health.pageHeading}
              </h1>

              <p className="font-headline text-lg sm:text-xl text-tertiary font-semibold">
                {isHi
                  ? "हर नागरिक के लिए सुलभ, पारदर्शी एवं समयबद्ध स्वास्थ्य सेवाएँ"
                  : "Accessible, transparent and timely healthcare for every citizen"}
              </p>

              <p className="text-sm sm:text-base text-on-surface-variant max-w-2xl leading-relaxed">
                {t.health.pageSubtitle}
              </p>

              {/* Geographic badge */}
              <div className="flex flex-wrap items-center gap-2.5 pt-1">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface text-on-surface text-xs font-medium border border-outline-variant/60 shadow-sm">
                  <MapPin className="w-3.5 h-3.5 text-primary" />
                  <span>{t.health.locationParihar}</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface text-on-surface text-xs font-medium border border-outline-variant/60 shadow-sm">
                  <Building2 className="w-3.5 h-3.5 text-secondary" />
                  <span>{t.health.distanceParihar}</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-3">
                <a
                  href="#facilities"
                  className="px-5 py-3 rounded-lg bg-primary text-on-primary text-xs font-bold hover:bg-primary-container transition-all shadow-md flex items-center gap-2"
                >
                  <Building2 className="w-4 h-4" />
                  <span>{t.health.findFacilityBtn}</span>
                </a>
                <a
                  href="#emergency"
                  className="px-5 py-3 rounded-lg bg-tertiary-container text-on-primary text-xs font-bold hover:opacity-90 transition-all shadow-md flex items-center gap-2"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>{t.health.emergencyBtn}</span>
                </a>
              </div>
            </div>

            {/* Hero Image Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden bg-surface-container shadow-xl border border-outline-variant/60">
                <div
                  className="w-full h-80 sm:h-96 bg-cover bg-center"
                  style={{
                    backgroundImage: `url('${IMAGES.stitchHealth}')`,
                  }}
                  role="img"
                  aria-label={isHi ? "प्राथमिक स्वास्थ्य परामर्श केंद्र" : "Rural health clinic consultation in Bihar"}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-on-primary">
                  <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-primary-fixed mb-1">
                    <HeartPulse className="w-4 h-4 text-primary-fixed" />
                    <span>{isHi ? "प्राथमिक परामर्श केंद्र" : "Primary Consultation Centre"}</span>
                  </div>
                  <h3 className="font-headline text-lg sm:text-xl font-bold text-white">
                    {isHi ? "मातृ एवं शिशु स्वास्थ्य, नियमित निगरानी व परामर्श" : "Maternal & Child Health Care & Consultations"}
                  </h3>
                  <p className="text-xs text-primary-fixed-dim mt-1">
                    {isHi
                      ? "सार्वजनिक स्वास्थ्य परामर्श एवं मातृत्व-शिशु देखभाल (दस्तावेजी संदर्भ)"
                      : "Public health consultations & maternal-infant welfare records"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: QUICK-ACCESS HEALTHCARE CARDS
          ========================================================================= */}
      <section className="w-full bg-surface py-10 px-4 sm:px-6 lg:px-8 border-b border-outline-variant/60">
        <div className="max-w-7xl mx-auto flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <span className="text-xs uppercase tracking-wider text-tertiary font-bold">
                {t.health.quickAccessSubtitle}
              </span>
              <h2 className="font-headline text-2xl sm:text-3xl text-primary font-bold mt-0.5">
                {t.health.quickAccessHeading}
              </h2>
            </div>
            <span className="text-xs text-secondary flex items-center gap-1.5">
              <Info className="w-4 h-4 text-tertiary shrink-0" />
              <span>{isHi ? "सीधे अनुभाग लिंक" : "Direct section anchors"}</span>
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Quick Card 1 */}
            <a
              href="#facilities"
              className="group bg-surface-container-lowest rounded-xl p-5 border border-outline-variant/60 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="flex flex-col gap-3">
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <Building2 className="w-6 h-6" />
                </div>
                <h3 className="font-headline text-base font-bold text-on-surface group-hover:text-primary transition-colors">
                  {isHi ? "स्वास्थ्य केंद्र" : "Health Centres"}
                </h3>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  {isHi
                    ? "प्राथमिक स्वास्थ्य केंद्र (PHC), अतिरिक्त स्वास्थ्य केंद्र एवं उप-स्वास्थ्य केंद्र की भौगोलिक जानकारी।"
                    : "Information on PHCs, APHCs, and sub-centres across the block."}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-outline-variant/40 flex items-center gap-1 text-xs font-bold text-primary group-hover:translate-x-1 transition-transform">
                <span>{isHi ? "सूची देखें" : "View Directory"}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </a>

            {/* Quick Card 2 */}
            <a
              href="#doctors"
              className="group bg-surface-container-lowest rounded-xl p-5 border border-outline-variant/60 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="flex flex-col gap-3">
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <Stethoscope className="w-6 h-6" />
                </div>
                <h3 className="font-headline text-base font-bold text-on-surface group-hover:text-primary transition-colors">
                  {isHi ? "अस्पताल एवं डॉक्टर" : "Hospitals & Doctors"}
                </h3>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  {isHi
                    ? "उपलब्ध योग्य चिकित्सकों, विशेषज्ञों, एएनएम एवं परामर्श सेवाओं की सत्यापित स्थिति।"
                    : "Verified status of medical personnel, specialists, ANMs, and public clinics."}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-outline-variant/40 flex items-center gap-1 text-xs font-bold text-primary group-hover:translate-x-1 transition-transform">
                <span>{isHi ? "विवरण देखें" : "View Personnel"}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </a>

            {/* Quick Card 3 */}
            <a
              href="#schemes"
              className="group bg-surface-container-lowest rounded-xl p-5 border border-outline-variant/60 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="flex flex-col gap-3">
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="font-headline text-base font-bold text-on-surface group-hover:text-primary transition-colors">
                  {isHi ? "सरकारी स्वास्थ्य योजनाएँ" : "Govt Health Schemes"}
                </h3>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  {isHi
                    ? "आयुष्मान भारत PM-JAY, जननी सुरक्षा योजना, राष्ट्रीय स्वास्थ्य मिशन एवं निःशुल्क दवा वितरण।"
                    : "Ayushman Bharat PM-JAY, Janani Suraksha, NHM, and free medicine distribution."}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-outline-variant/40 flex items-center gap-1 text-xs font-bold text-primary group-hover:translate-x-1 transition-transform">
                <span>{isHi ? "योजनाएँ देखें" : "View Schemes"}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </a>

            {/* Quick Card 4 */}
            <a
              href="#emergency"
              className="group bg-surface-container-lowest rounded-xl p-5 border border-outline-variant/60 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="flex flex-col gap-3">
                <div className="w-12 h-12 rounded-xl bg-tertiary-container/10 text-tertiary-container flex items-center justify-center">
                  <PhoneCall className="w-6 h-6" />
                </div>
                <h3 className="font-headline text-base font-bold text-on-surface group-hover:text-tertiary-container transition-colors">
                  {isHi ? "आपातकालीन सहायता" : "Emergency Help"}
                </h3>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  {isHi
                    ? "24x7 सरकारी एम्बुलेंस सेवा (102/108), 112 आपातकालीन दल व नजदीकी आकस्मिक चिकित्सा केंद्र।"
                    : "24x7 State Ambulance (102/108), 112 Unified Emergency, and referral hospital care."}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-outline-variant/40 flex items-center gap-1 text-xs font-bold text-tertiary-container group-hover:translate-x-1 transition-transform">
                <span>{isHi ? "आपातकालीन नंबर" : "Emergency Contacts"}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: HIGH-PRIORITY 24x7 EMERGENCY ASSISTANCE (PLACED PROMINENTLY)
          ========================================================================= */}
      <section className="w-full bg-surface-container-low py-12 px-4 sm:px-6 lg:px-8 border-b border-outline-variant/60" id="emergency">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="bg-surface rounded-2xl p-6 sm:p-8 border border-outline-variant/60 shadow-sm flex flex-col gap-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-outline-variant/40 pb-6">
              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-tertiary-container text-on-primary text-xs font-bold">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>{isHi ? "प्राथमिक नागरिक सहायता" : "Priority Citizen Support"}</span>
                </div>
                <h2 className="font-headline text-2xl sm:text-3xl text-primary font-extrabold">
                  {t.health.emergencyHeading}
                </h2>
                <p className="text-xs sm:text-sm text-on-surface-variant max-w-2xl leading-relaxed">
                  {t.health.emergencySubtitle}
                </p>
              </div>
              <div className="shrink-0">
                <span className="text-xs bg-surface-container px-3.5 py-2 rounded-lg text-secondary font-semibold inline-block border border-outline-variant/40">
                  {isHi ? "टोल-फ्री सरकारी सुविधा • 24 घंटे सक्रिय" : "Toll-Free Govt Facility • 24x7 Active"}
                </span>
              </div>
            </div>

            {/* Helpline Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Helpline 1: 112 */}
              <div className="bg-surface-container-lowest rounded-xl p-5 border border-outline-variant/60 shadow-sm flex flex-col justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="w-7 h-7 rounded-full bg-tertiary-container/10 text-tertiary-container flex items-center justify-center font-bold text-xs">
                      1
                    </span>
                    <span className="text-[11px] text-secondary font-semibold">{isHi ? "एकीकृत सेवा" : "Unified"}</span>
                  </div>
                  <h3 className="font-headline text-3xl font-extrabold text-on-surface">112</h3>
                  <p className="text-xs font-bold text-primary">{isHi ? "राष्ट्रीय एकीकृत आपातकालीन सेवा" : "National Unified Emergency"}</p>
                  <p className="text-xs text-secondary leading-relaxed">
                    {isHi
                      ? "पुलिस, अग्निशमन एवं आपातकालीन चिकित्सा सहायता एक ही कॉल पर।"
                      : "Police, Fire, and Emergency Medical assistance on a single toll-free call."}
                  </p>
                </div>
                <a
                  href="tel:112"
                  className="w-full py-2.5 px-4 rounded-lg bg-tertiary-container text-on-primary text-xs font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shadow-sm"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>{isHi ? "डायल करें: 112" : "Call: 112"}</span>
                </a>
              </div>

              {/* Helpline 2: 102 / 108 */}
              <div className="bg-surface-container-lowest rounded-xl p-5 border border-outline-variant/60 shadow-sm flex flex-col justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
                      2
                    </span>
                    <span className="text-[11px] text-secondary font-semibold">{isHi ? "एम्बुलेंस" : "Ambulance"}</span>
                  </div>
                  <h3 className="font-headline text-3xl font-extrabold text-on-surface">102 / 108</h3>
                  <p className="text-xs font-bold text-primary">{isHi ? "बिहार राज्य एम्बुलेंस सेवा" : "Bihar State Ambulance"}</p>
                  <p className="text-xs text-secondary leading-relaxed">
                    {isHi
                      ? "मातृ-शिशु, प्रसव पूर्व-पश्चात एवं गंभीर मरीजों के लिए सरकारी परिवहन।"
                      : "Maternity, expectant mothers, and critical patient transit to government hospitals."}
                  </p>
                </div>
                <a
                  href="tel:102"
                  className="w-full py-2.5 px-4 rounded-lg bg-primary text-on-primary text-xs font-bold flex items-center justify-center gap-2 hover:bg-primary-container transition-colors shadow-sm"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>{isHi ? "डायल करें: 102" : "Call: 102"}</span>
                </a>
              </div>

              {/* Helpline 3: 104 */}
              <div className="bg-surface-container-lowest rounded-xl p-5 border border-outline-variant/60 shadow-sm flex flex-col justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
                      3
                    </span>
                    <span className="text-[11px] text-secondary font-semibold">{isHi ? "टेली-परामर्श" : "Consultation"}</span>
                  </div>
                  <h3 className="font-headline text-3xl font-extrabold text-on-surface">104</h3>
                  <p className="text-xs font-bold text-primary">{isHi ? "राज्य स्वास्थ्य परामर्श हेल्पलाइन" : "State Health Helpline"}</p>
                  <p className="text-xs text-secondary leading-relaxed">
                    {isHi
                      ? "घर बैठे योग्य चिकित्सकों से प्राथमिक टेली-परामर्श एवं दवा मार्गदर्शन।"
                      : "Direct telephone medical advice from qualified medical officers."}
                  </p>
                </div>
                <a
                  href="tel:104"
                  className="w-full py-2.5 px-4 rounded-lg bg-surface-container text-primary text-xs font-bold flex items-center justify-center gap-2 hover:bg-surface-container-high transition-colors border border-outline-variant/40"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>{isHi ? "डायल करें: 104" : "Call: 104"}</span>
                </a>
              </div>

              {/* Helpline 4: CHC Parihar */}
              <div className="bg-surface-container-lowest rounded-xl p-5 border border-outline-variant/60 shadow-sm flex flex-col justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
                      4
                    </span>
                    <span className="text-[11px] text-secondary font-semibold">{isHi ? "रेफरल अस्पताल" : "Referral"}</span>
                  </div>
                  <h3 className="font-headline text-2xl font-extrabold text-on-surface">CHC परिहार</h3>
                  <p className="text-xs font-bold text-primary">{isHi ? "सामुदायिक स्वास्थ्य केंद्र परिहार" : "CHC Parihar Block Hospital"}</p>
                  <p className="text-xs text-secondary leading-relaxed">
                    {isHi
                      ? "प्रखंड मुख्यालय (~8-10 किमी), 24 घंटे आपातकालीन कक्ष व प्रसव वार्ड।"
                      : "Block headquarters (~8-10 km), 24h emergency room and maternity facility."}
                  </p>
                </div>
                <a
                  href="#facilities"
                  className="w-full py-2.5 px-4 rounded-lg bg-surface-container text-on-surface text-xs font-bold flex items-center justify-center gap-2 hover:bg-surface-container-high transition-colors border border-outline-variant/40"
                >
                  <Building2 className="w-3.5 h-3.5" />
                  <span>{isHi ? "केंद्र विवरण देखें" : "View Details"}</span>
                </a>
              </div>
            </div>

            {/* Emergency Disclaimer */}
            <div className="p-4 rounded-xl bg-surface-container text-secondary text-xs flex items-start gap-3 border border-outline-variant/40">
              <Info className="w-4 h-4 text-tertiary shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                <strong className="text-on-surface font-bold">{isHi ? "महत्वपूर्ण नागरिक सूचना: " : "Citizen Notice: "}</strong>
                {isHi
                  ? "स्थानीय स्तर पर किसी भी अप्रमाणित निजी एम्बुलेंस चालक का दावा करने से बचें। प्राथमिक आपात स्थिति में तुरंत 102 अथवा 112 पर कॉल करें।"
                  : "Please avoid unverified private ambulance middlemen. Always connect first to official 102 or 112 government emergency dispatch."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: HEALTH FACILITIES DIRECTORY
          ========================================================================= */}
      <section className="w-full bg-surface py-12 px-4 sm:px-6 lg:px-8 border-b border-outline-variant/60" id="facilities">
        <div className="max-w-7xl mx-auto flex flex-col gap-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <span className="text-xs uppercase tracking-wider text-tertiary font-bold">
                {isHi ? "सुविधा संदर्शिका" : "Directory"}
              </span>
              <h2 className="font-headline text-2xl sm:text-3xl text-primary font-bold mt-0.5">
                {t.health.facilitiesHeading}
              </h2>
              <p className="text-xs sm:text-sm text-secondary mt-1">
                {t.health.facilitiesSubtitle}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-surface-container text-primary text-xs font-bold border border-outline-variant/60 shadow-sm">
                {isHi ? `प्रदर्शित: ${filteredFacilities.length} केंद्र` : `Showing: ${filteredFacilities.length} facilities`}
              </span>
            </div>
          </div>

          {/* Search Bar & Reset */}
          <div className="bg-surface-container-low p-4 rounded-xl border border-outline-variant/60 shadow-sm flex flex-col md:flex-row gap-3 items-center">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-outline absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.health.searchPlaceholder}
                className="w-full bg-surface text-on-surface text-xs sm:text-sm pl-10 pr-4 py-2.5 rounded-lg border border-outline-variant/60 focus:border-primary focus:ring-1 focus:ring-primary outline-none placeholder:text-outline transition-all"
              />
            </div>
            <div className="flex items-center gap-2 w-full md:w-auto shrink-0">
              {(searchQuery || facilityFilter !== "all") && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="px-4 py-2.5 rounded-lg bg-surface text-secondary hover:text-primary text-xs font-bold transition-colors flex items-center gap-1.5 border border-outline-variant/60 shadow-sm"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>{t.health.clearFilters}</span>
                </button>
              )}
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-xs">
            <button
              type="button"
              onClick={() => setFacilityFilter("all")}
              className={`px-3.5 py-1.5 rounded-full font-bold shrink-0 transition-all ${
                facilityFilter === "all"
                  ? "bg-primary text-on-primary shadow-sm"
                  : "bg-surface-container text-on-surface hover:bg-surface-container-high border border-outline-variant/60"
              }`}
            >
              {t.health.allFacilities} ({HEALTH_FACILITIES.length})
            </button>
            <button
              type="button"
              onClick={() => setFacilityFilter("sub_centre")}
              className={`px-3.5 py-1.5 rounded-full font-bold shrink-0 transition-all ${
                facilityFilter === "sub_centre"
                  ? "bg-primary text-on-primary shadow-sm"
                  : "bg-surface-container text-on-surface hover:bg-surface-container-high border border-outline-variant/60"
              }`}
            >
              {t.health.subCentreFilter}
            </button>
            <button
              type="button"
              onClick={() => setFacilityFilter("chc")}
              className={`px-3.5 py-1.5 rounded-full font-bold shrink-0 transition-all ${
                facilityFilter === "chc"
                  ? "bg-primary text-on-primary shadow-sm"
                  : "bg-surface-container text-on-surface hover:bg-surface-container-high border border-outline-variant/60"
              }`}
            >
              {t.health.chcFilter}
            </button>
            <button
              type="button"
              onClick={() => setFacilityFilter("district_hospital")}
              className={`px-3.5 py-1.5 rounded-full font-bold shrink-0 transition-all ${
                facilityFilter === "district_hospital"
                  ? "bg-primary text-on-primary shadow-sm"
                  : "bg-surface-container text-on-surface hover:bg-surface-container-high border border-outline-variant/60"
              }`}
            >
              {t.health.districtHospitalFilter}
            </button>
          </div>

          {/* Facility Cards Grid */}
          {filteredFacilities.length === 0 ? (
            <div className="p-8 sm:p-12 rounded-2xl bg-surface-container-low border border-outline-variant/60 text-center flex flex-col items-center justify-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-surface flex items-center justify-center text-secondary shadow-sm">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="font-headline text-lg font-bold text-primary">{t.health.noResultsTitle}</h3>
              <p className="text-xs text-secondary max-w-md">{t.health.noResultsDesc}</p>
              <button
                type="button"
                onClick={clearFilters}
                className="mt-2 px-4 py-2 bg-primary text-on-primary rounded-lg text-xs font-bold hover:bg-primary-container transition-colors shadow-sm"
              >
                {t.health.clearFilters}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {filteredFacilities.map((facility) => {
                const isPending = facility.verificationStatus === "pending_verification";

                return (
                  <article
                    key={facility.id}
                    className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between border border-outline-variant/60"
                  >
                    {/* Top half — Facility header / visual frame */}
                    <div className="relative w-full h-44 sm:h-48 bg-surface-container-high overflow-hidden shrink-0 flex flex-col items-center justify-center text-secondary/60 p-4 text-center select-none">
                      <div className="w-12 h-12 rounded-xl bg-surface/90 flex items-center justify-center text-primary shadow-sm border border-outline-variant/30 mb-2">
                        <Building2 className="w-6 h-6" />
                      </div>
                      <span className="text-[11px] font-bold text-on-surface">
                        {isHi ? facility.nameHi : facility.name}
                      </span>
                      <span className="text-[10px] text-secondary mt-0.5">
                        {isHi ? facility.distanceFromNarangaHi : facility.distanceFromNarangaEn}
                      </span>

                      {/* Overlay badges */}
                      <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2 pointer-events-none">
                        <span className="px-2.5 py-1 rounded bg-surface/95 backdrop-blur-md text-primary text-[11px] font-bold shadow-sm border border-outline-variant/40">
                          {isHi ? facility.typeLabelHi : facility.typeLabelEn}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded text-[11px] font-bold flex items-center gap-1 shadow-sm backdrop-blur-md ${
                            isPending
                              ? "bg-amber-100 text-amber-900 border border-amber-300"
                              : "bg-surface/95 text-primary border border-primary/30"
                          }`}
                        >
                          <ShieldCheck className="w-3 h-3 text-primary" />
                          <span>{isHi ? facility.statusTextHi : facility.statusTextEn}</span>
                        </span>
                      </div>
                    </div>

                    {/* Bottom half — Details */}
                    <div className="p-5 flex flex-col justify-between flex-1 gap-4">
                      <div className="flex flex-col gap-3">
                        <div>
                          <h3 className="font-headline text-base sm:text-lg text-primary font-bold leading-snug">
                            {isHi ? facility.nameHi : facility.name}
                          </h3>
                          <p className="text-xs text-secondary mt-0.5 flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
                            <span className="truncate">{facility.address}</span>
                          </p>
                        </div>

                        {/* Status Summary */}
                        <div className="bg-surface-container-low p-3 rounded-lg border border-outline-variant/40">
                          <span className="text-[10px] uppercase font-bold text-secondary block">
                            {isHi ? "कार्य संचालन एवं रोस्टर स्थिति" : "Operational Status"}
                          </span>
                          <p className="text-xs text-on-surface-variant mt-0.5 leading-relaxed">
                            {isHi ? facility.statusSummaryHi : facility.statusSummaryEn}
                          </p>
                        </div>

                        {/* Services Pills */}
                        <div className="space-y-1.5">
                          <span className="text-[11px] font-bold text-on-surface block">
                            {isHi ? "मूलभूत सेवाएँ:" : "Services:"}
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {(isHi ? facility.servicesHi : facility.servicesEn).slice(0, 4).map((s, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-0.5 rounded bg-surface-container text-on-surface-variant text-[11px] font-medium"
                              >
                                {s}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Card Footer */}
                      <div className="pt-3 border-t border-outline-variant/40 flex items-center justify-between">
                        <span className="text-[11px] text-primary font-bold flex items-center gap-1">
                          <Activity className="w-3.5 h-3.5" />
                          <span>{isHi ? facility.distanceFromNarangaHi : facility.distanceFromNarangaEn}</span>
                        </span>
                        <button
                          type="button"
                          onClick={() => setSelectedFacility(facility)}
                          className="px-3 py-1.5 rounded bg-surface-container text-primary hover:bg-primary hover:text-on-primary transition-colors text-xs font-bold flex items-center gap-1 border border-outline-variant/40"
                        >
                          <span>{t.health.viewDetails}</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}

          {/* Transparency strip */}
          <div className="bg-surface-container-low p-4 sm:p-5 rounded-xl border border-outline-variant/60 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-on-surface">
                  {isHi ? "निजी क्लीनिक व दवा दुकानों के संबंध में नागरिक नीति" : "Policy on Private Clinics & Pharmacies"}
                </h4>
                <p className="text-xs text-secondary mt-0.5 leading-relaxed">
                  {isHi
                    ? "नारंगा गाँव के किसी भी निजी क्लिनिक या दवा दुकान की जानकारी आधिकारिक राज्य मेडिकल पंजीकरण व स्थानीय सत्यापन के बाद ही यहाँ प्रकाशित की जाएगी।"
                    : "Information on private dispensaries or pharmacies will be displayed only upon verifiable state medical board registration."}
                </p>
              </div>
            </div>
            <a
              href="#correction"
              className="px-4 py-2 rounded-lg bg-surface hover:bg-surface-container text-primary text-xs font-bold shrink-0 transition-colors border border-outline-variant/40 shadow-sm"
            >
              {isHi ? "पंजीकृत क्लिनिक सुझाएँ" : "Suggest Registered Clinic"}
            </a>
          </div>
        </div>
      </section>

      {/* =========================================================================
          FACILITY DETAIL MODAL DIALOG
          ========================================================================= */}
      {selectedFacility && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-surface rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-outline-variant/60 flex flex-col gap-6 animate-in fade-in zoom-in-95 duration-150">
            {/* Header */}
            <div className="flex items-start justify-between gap-4 border-b border-outline-variant/40 pb-4">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="px-2.5 py-0.5 rounded bg-primary text-on-primary text-xs font-bold">
                    {isHi ? selectedFacility.typeLabelHi : selectedFacility.typeLabelEn}
                  </span>
                  <span className="px-2.5 py-0.5 rounded bg-surface-container text-secondary text-xs font-semibold">
                    {isHi ? selectedFacility.statusTextHi : selectedFacility.statusTextEn}
                  </span>
                </div>
                <h3 className="font-headline text-xl sm:text-2xl text-primary font-extrabold">
                  {isHi ? selectedFacility.nameHi : selectedFacility.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedFacility(null)}
                className="w-8 h-8 rounded-full bg-surface-container hover:bg-surface-container-high text-secondary flex items-center justify-center transition-colors shrink-0"
                aria-label={t.health.closeDetails}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content */}
            <div className="flex flex-col gap-4 text-xs sm:text-sm text-on-surface">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 rounded-lg bg-surface-container-low border border-outline-variant/40">
                  <span className="text-[11px] text-secondary block font-semibold">{isHi ? "दूरी / अवस्थिति:" : "Distance / Location:"}</span>
                  <span className="font-bold text-primary mt-0.5 block">{isHi ? selectedFacility.distanceFromNarangaHi : selectedFacility.distanceFromNarangaEn}</span>
                </div>
                <div className="p-3 rounded-lg bg-surface-container-low border border-outline-variant/40">
                  <span className="text-[11px] text-secondary block font-semibold">{isHi ? "आपातकालीन नंबर:" : "Emergency Helpline:"}</span>
                  <span className="font-bold text-on-surface mt-0.5 block font-mono">{selectedFacility.emergencyPhone || "102 / 108"}</span>
                </div>
              </div>

              {/* Address */}
              <div className="p-3.5 rounded-lg bg-surface-container-low border border-outline-variant/40">
                <span className="text-[11px] text-secondary block font-semibold">{isHi ? "सटीक पता एवं प्रखंड:" : "Address & Block:"}</span>
                <p className="mt-1 font-medium text-on-surface">{selectedFacility.address}</p>
              </div>

              {/* Operating Hours */}
              <div className="p-3.5 rounded-lg bg-surface-container-low border border-outline-variant/40">
                <span className="text-[11px] text-secondary block font-semibold">{isHi ? "कार्य संचालन समय:" : "Operating Hours:"}</span>
                <p className="mt-1 font-medium text-on-surface">{isHi ? selectedFacility.operatingHoursHi : selectedFacility.operatingHoursEn}</p>
              </div>

              {/* Services List */}
              <div className="p-3.5 rounded-lg bg-surface-container border border-outline-variant/40">
                <span className="text-[11px] text-primary block font-bold mb-2">{isHi ? "उपलब्ध सेवाएँ एवं जाँच सुविधाएँ:" : "Available Medical Services:"}</span>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs">
                  {(isHi ? selectedFacility.servicesHi : selectedFacility.servicesEn).map((svc, idx) => (
                    <li key={idx} className="flex items-start gap-1.5 text-on-surface-variant">
                      <span className="text-primary font-bold">•</span>
                      <span>{svc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Source attribution */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 text-[11px] text-secondary">
                <span>
                  <strong>{isHi ? "डेटा स्रोत: " : "Source: "}</strong> {selectedFacility.sourceName}
                </span>
                <span>
                  <strong>{isHi ? "सत्यापन तिथि: " : "Audit Date: "}</strong> {selectedFacility.lastVerifiedAt}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-outline-variant/40 pt-4">
              <a
                href={selectedFacility.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-4 py-2 rounded-lg bg-surface-container-high hover:bg-surface-container text-primary text-xs font-bold transition-colors inline-flex items-center justify-center gap-1.5 border border-outline-variant/40"
              >
                <span>{isHi ? "सीतामढ़ी जिला पोर्टल पर देखें" : "Verify on District Portal"}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <button
                type="button"
                onClick={() => setSelectedFacility(null)}
                className="w-full sm:w-auto px-5 py-2 rounded-lg bg-primary text-on-primary text-xs font-bold hover:bg-primary-container transition-colors"
              >
                {t.health.closeDetails}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          SECTION 4: DOCTORS AND MEDICAL SERVICES (TRANSPARENT INFORMATIONAL STATE)
          ========================================================================= */}
      <section className="w-full bg-surface-container-low py-12 px-4 sm:px-6 lg:px-8 border-b border-outline-variant/60" id="doctors">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-col space-y-1">
            <span className="text-xs uppercase tracking-wider text-tertiary font-bold">
              {isHi ? "चिकित्सक संवर्ग" : "Medical Personnel"}
            </span>
            <h2 className="font-headline text-2xl sm:text-3xl text-primary font-bold">
              {t.health.doctorsHeading}
            </h2>
          </div>

          <div className="bg-surface rounded-2xl p-8 sm:p-10 border border-outline-variant/60 shadow-sm text-center max-w-4xl mx-auto space-y-5">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary mx-auto flex items-center justify-center">
              <Stethoscope className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <h3 className="font-headline text-xl sm:text-2xl text-on-surface font-bold">
                {t.health.doctorsPendingTitle}
              </h3>
              <p className="text-xs sm:text-sm text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
                {t.health.doctorsPendingDesc}
              </p>
            </div>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
              <a
                href="#correction"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-on-primary text-xs font-bold hover:bg-primary-container transition-colors shadow-sm"
              >
                <PlusCircle className="w-4 h-4" />
                <span>{isHi ? "चिकित्सक / स्वास्थ्य कर्मी का विवरण सुझाएँ" : "Nominate Medical Personnel"}</span>
              </a>
              <a
                href="tel:104"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-surface text-on-surface text-xs font-bold hover:bg-surface-container transition-colors shadow-sm border border-outline-variant/60"
              >
                <Phone className="w-4 h-4 text-primary" />
                <span>{t.health.doctorsHelplineCall}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 6: GOVERNMENT HEALTH SCHEMES
          ========================================================================= */}
      <section className="w-full bg-surface py-12 px-4 sm:px-6 lg:px-8 border-b border-outline-variant/60" id="schemes">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="space-y-1.5">
            <span className="text-xs uppercase tracking-wider text-tertiary font-bold">
              {isHi ? "कल्याणकारी योजनाएँ" : "Welfare Schemes"}
            </span>
            <h2 className="font-headline text-2xl sm:text-3xl text-primary font-bold">
              {t.health.schemesHeading}
            </h2>
            <p className="text-xs sm:text-sm text-on-surface-variant max-w-3xl leading-relaxed">
              {t.health.schemesSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {HEALTH_SCHEMES.map((scheme) => (
              <div
                key={scheme.id}
                className="bg-surface-container-lowest rounded-xl p-6 border border-outline-variant/60 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-5"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded bg-primary/10 text-primary text-xs font-bold">
                      {isHi ? scheme.categoryHi : scheme.categoryEn}
                    </span>
                    <ShieldCheck className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-headline text-base sm:text-lg text-primary font-bold leading-snug">
                    {isHi ? scheme.nameHi : scheme.nameEn}
                  </h3>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    {isHi ? scheme.descriptionHi : scheme.descriptionEn}
                  </p>
                  <div className="bg-surface-container p-3 rounded-lg space-y-1 border border-outline-variant/40">
                    <span className="text-[11px] font-bold text-on-surface block">
                      {isHi ? "पात्रता एवं लाभ:" : "Eligibility:"}
                    </span>
                    <p className="text-xs text-secondary leading-relaxed">
                      {isHi ? scheme.eligibilityHi : scheme.eligibilityEn}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-outline-variant/40">
                  <a
                    href={scheme.officialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-4 rounded-lg bg-surface-container text-primary hover:bg-primary hover:text-on-primary transition-all text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm border border-outline-variant/40"
                  >
                    <span>{t.health.officialPortalBtn}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 7: HEALTH AWARENESS
          ========================================================================= */}
      <section className="w-full bg-surface-container-low py-12 px-4 sm:px-6 lg:px-8 border-b border-outline-variant/60">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="space-y-1.5">
            <span className="text-xs uppercase tracking-wider text-tertiary font-bold">
              {isHi ? "जन स्वास्थ्य परामर्श" : "Public Health Awareness"}
            </span>
            <h2 className="font-headline text-2xl sm:text-3xl text-primary font-bold">
              {t.health.awarenessHeading}
            </h2>
            <p className="text-xs sm:text-sm text-on-surface-variant max-w-3xl leading-relaxed">
              {t.health.awarenessSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {HEALTH_AWARENESS_TOPICS.map((topic) => (
              <div
                key={topic.id}
                className="bg-surface rounded-xl p-6 border border-outline-variant/60 shadow-sm space-y-3.5 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                    <HeartPulse className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-headline text-base font-bold text-on-surface">
                    {isHi ? topic.titleHi : topic.titleEn}
                  </h3>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    {isHi ? topic.descHi : topic.descEn}
                  </p>
                  <div className="pt-2 border-t border-outline-variant/40 space-y-1.5">
                    {(isHi ? topic.guidelinesHi : topic.guidelinesEn).map((g, idx) => (
                      <div key={idx} className="flex items-start gap-1.5 text-xs text-secondary leading-relaxed">
                        <span className="text-primary font-bold">•</span>
                        <span>{g}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 8: WOMEN, CHILDREN & SENIOR CITIZEN HEALTHCARE
          ========================================================================= */}
      <section className="w-full bg-surface py-12 px-4 sm:px-6 lg:px-8 border-b border-outline-variant/60">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="space-y-1.5">
            <span className="text-xs uppercase tracking-wider text-tertiary font-bold">
              {isHi ? "समर्पित संवर्ग स्वास्थ्य" : "Targeted Group Care"}
            </span>
            <h2 className="font-headline text-2xl sm:text-3xl text-primary font-bold">
              {t.health.specialCareHeading}
            </h2>
            <p className="text-xs sm:text-sm text-on-surface-variant max-w-3xl leading-relaxed">
              {t.health.specialCareSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Group 1: Pregnant Women */}
            <div className="bg-surface-container-lowest rounded-xl p-6 border border-outline-variant/60 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <HeartPulse className="w-6 h-6" />
              </div>
              <h3 className="font-headline text-lg font-bold text-primary">
                {isHi ? "गर्भवती महिलाएँ (Maternal Care)" : "Maternal Care"}
              </h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                {isHi
                  ? "गर्भावस्था के दौरान 4 निःशुल्क एएनसी (ANC) जाँचें, टिटनेस (Td) टीका, आयरन व कैल्शियम की गोलियाँ और सुरक्षित सरकारी प्रसव सुविधा।"
                  : "Free 4-stage ANC health checkups, Td immunizations, iron supplements, and safe delivery support."}
              </p>
              <div className="pt-2 text-xs font-semibold text-secondary">
                {isHi ? "संपर्क: ग्राम आशा कार्यकर्ता अथवा CHC परिहार" : "Contact: Village ASHA worker or CHC Parihar"}
              </div>
            </div>

            {/* Group 2: Newborns & Children */}
            <div className="bg-surface-container-lowest rounded-xl p-6 border border-outline-variant/60 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <Baby className="w-6 h-6" />
              </div>
              <h3 className="font-headline text-lg font-bold text-primary">
                {isHi ? "नवजात शिशु एवं बच्चे (Child Care)" : "Newborn & Child Care"}
              </h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                {isHi
                  ? "जन्म के 1 घंटे के भीतर स्तनपान, 6 माह तक केवल माँ का दूध, संपूर्ण टीकाकरण, रोटावायरस डायरिया सुरक्षा और कुपोषण निगरानी।"
                  : "Exclusive breastfeeding for 6 months, mandatory immunization tracking, and growth monitoring."}
              </p>
              <div className="pt-2 text-xs font-semibold text-secondary">
                {isHi ? "सुविधा: हर माह आँगनबाड़ी केंद्र पर VHSND सत्र" : "Facility: Monthly VHSND sessions at Anganwadi"}
              </div>
            </div>

            {/* Group 3: Senior Citizens */}
            <div className="bg-surface-container-lowest rounded-xl p-6 border border-outline-variant/60 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="font-headline text-lg font-bold text-primary">
                {isHi ? "वरिष्ठ नागरिक (Senior Citizens)" : "Senior Citizen Healthcare"}
              </h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                {isHi
                  ? "70 वर्ष से अधिक आयु के बुजुर्गों हेतु आयुष्मान भारत योजना के तहत ₹5 लाख का कैशलेस स्वास्थ्य कवर, मोतियाबिंद जाँच और उच्च रक्तचाप निगरानी।"
                  : "Dedicated ₹5 Lakh PM-JAY coverage for citizens 70+, cataract screening, and chronic disease management."}
              </p>
              <div className="pt-2 text-xs font-semibold text-secondary">
                {isHi ? "पंजीकरण: आधार कार्ड के माध्यम से आयुष्मान कार्ड" : "Registration: Aadhaar card based Ayushman enrolments"}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 9: HEALTH NOTICES & BULLETINS
          ========================================================================= */}
      <section className="w-full bg-surface-container-low py-12 px-4 sm:px-6 lg:px-8 border-b border-outline-variant/60">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-col space-y-1">
            <span className="text-xs uppercase tracking-wider text-tertiary font-bold">
              {isHi ? "आधिकारिक सूचना पट्ट" : "Health Bulletins"}
            </span>
            <h2 className="font-headline text-2xl sm:text-3xl text-primary font-bold">
              {t.health.noticesHeading}
            </h2>
          </div>

          {/* Clean honest empty state */}
          <div className="rounded-2xl bg-surface p-8 sm:p-12 border border-outline-variant/60 shadow-sm flex flex-col items-center justify-center text-center max-w-3xl mx-auto w-full gap-4">
            <div className="w-14 h-14 rounded-2xl bg-surface-container flex items-center justify-center text-primary shadow-inner">
              <FileText className="w-7 h-7 text-primary" />
            </div>
            <div className="flex flex-col gap-1.5">
              <h3 className="font-headline text-lg sm:text-xl text-primary font-bold">
                {t.health.noNoticesMessage}
              </h3>
              <p className="text-xs sm:text-sm text-on-surface-variant max-w-md mx-auto leading-relaxed">
                {t.health.noNoticesDesc}
              </p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-surface-container-low text-secondary text-xs shadow-sm mt-1 border border-outline-variant/40">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span>{isHi ? "स्वास्थ्य विभाग सीतामढ़ी पोर्टल निगरानी सक्रिय है" : "Sitamarhi Health Department monitoring active"}</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 10: SUGGEST A CORRECTION FORM
          ========================================================================= */}
      <section className="w-full bg-surface py-12 px-4 sm:px-6 lg:px-8 border-b border-outline-variant/60" id="correction">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs uppercase tracking-wider text-tertiary font-bold">
              {isHi ? "सामुदायिक सहभागिता" : "Citizen Contribution"}
            </span>
            <h2 className="font-headline text-2xl sm:text-3xl text-primary font-bold">
              {t.health.formHeading}
            </h2>
            <p className="text-xs sm:text-sm text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
              {t.health.formSubtitle}
            </p>
          </div>

          <form onSubmit={handleCorrectionSubmit} className="bg-surface-container-lowest rounded-2xl p-6 sm:p-8 border border-outline-variant/60 shadow-sm space-y-5">
            {formError && (
              <div className="p-3.5 rounded-lg bg-error-container text-on-error-container text-xs flex items-center gap-2 border border-error/30">
                <AlertTriangle className="w-4 h-4 text-error shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            {formSuccess && (
              <div className="p-3.5 rounded-lg bg-primary/10 text-primary text-xs flex items-center gap-2 border border-primary/30">
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                <span>{t.health.formSuccessMsg}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-on-surface block">
                  {t.health.formFacilityName}
                </label>
                <input
                  type="text"
                  required
                  value={formFacilityName}
                  onChange={(e) => setFormFacilityName(e.target.value)}
                  placeholder={isHi ? "उदा. नारंगा उप-स्वास्थ्य केंद्र..." : "e.g. Naranga Health Sub-Centre..."}
                  className="w-full bg-surface-container-low text-on-surface text-xs px-3.5 py-2.5 rounded-lg border border-outline-variant/60 focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-on-surface block">
                  {t.health.formFacilityType}
                </label>
                <select
                  value={formFacilityType}
                  onChange={(e) => setFormFacilityType(e.target.value)}
                  className="w-full bg-surface-container-low text-on-surface text-xs px-3.5 py-2.5 rounded-lg border border-outline-variant/60 focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                >
                  <option value="govt-subcenter">{isHi ? "सरकारी उप-स्वास्थ्य केंद्र (HSC / APHC)" : "Government Sub-Centre"}</option>
                  <option value="asha-anm">{isHi ? "आशा कार्यकर्ता / एएनएम विवरण" : "ASHA / ANM Personnel"}</option>
                  <option value="private-clinic">{isHi ? "निजी पंजीकृत क्लिनिक" : "Registered Private Clinic"}</option>
                  <option value="pharmacy">{isHi ? "अधिकृत दवा दुकान (फार्मेसी)" : "Authorized Pharmacy"}</option>
                  <option value="other">{isHi ? "अन्य स्वास्थ्य सेवा" : "Other Healthcare Service"}</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-on-surface block">
                  {t.health.formLocation}
                </label>
                <input
                  type="text"
                  required
                  value={formLocation}
                  onChange={(e) => setFormLocation(e.target.value)}
                  placeholder={isHi ? "उदा. वार्ड 04, नारंगा उत्तरी..." : "e.g. Ward 04, Naranga North..."}
                  className="w-full bg-surface-container-low text-on-surface text-xs px-3.5 py-2.5 rounded-lg border border-outline-variant/60 focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-on-surface block">
                  {t.health.formSourceUrl}
                </label>
                <input
                  type="url"
                  value={formSourceUrl}
                  onChange={(e) => setFormSourceUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full bg-surface-container-low text-on-surface text-xs px-3.5 py-2.5 rounded-lg border border-outline-variant/60 focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-on-surface block">
                {t.health.formInfoToCorrect}
              </label>
              <textarea
                required
                rows={3}
                value={formCorrection}
                onChange={(e) => setFormCorrection(e.target.value)}
                placeholder={isHi ? "उपलब्ध सेवाएँ, कार्य समय, डॉक्टर का नाम या आवश्यक सुधार का ब्योरा यहाँ लिखें..." : "Describe services, operating hours, or corrections in detail..."}
                className="w-full bg-surface-container-low text-on-surface text-xs p-3.5 rounded-lg border border-outline-variant/60 focus:border-primary focus:ring-1 focus:ring-primary outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-on-surface block">
                  {t.health.formSubmitterName}
                </label>
                <input
                  type="text"
                  value={formSubmitter}
                  onChange={(e) => setFormSubmitter(e.target.value)}
                  placeholder={isHi ? "आपका नाम" : "Your Name"}
                  className="w-full bg-surface-container-low text-on-surface text-xs px-3.5 py-2.5 rounded-lg border border-outline-variant/60 focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-on-surface block">
                  {t.health.formContact}
                </label>
                <input
                  type="text"
                  value={formContact}
                  onChange={(e) => setFormContact(e.target.value)}
                  placeholder={isHi ? "फ़ोन नंबर या ईमेल" : "Phone or Email"}
                  className="w-full bg-surface-container-low text-on-surface text-xs px-3.5 py-2.5 rounded-lg border border-outline-variant/60 focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                />
              </div>
            </div>

            {/* Consent checkbox */}
            <div className="flex items-start gap-2.5 pt-1">
              <input
                type="checkbox"
                id="healthConsent"
                checked={formConsent}
                onChange={(e) => setFormConsent(e.target.checked)}
                className="mt-0.5 rounded text-primary focus:ring-primary"
              />
              <label htmlFor="healthConsent" className="text-xs text-on-surface-variant leading-relaxed cursor-pointer">
                {t.health.formConsent}
              </label>
            </div>

            <div className="pt-3 border-t border-outline-variant/40 flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                type="submit"
                disabled={formSubmitting}
                className="w-full sm:w-auto px-8 py-2.5 rounded-lg bg-primary text-on-primary text-xs font-bold hover:bg-primary-container transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>{formSubmitting ? (isHi ? "भेजा जा रहा है..." : "Submitting...") : t.health.formSubmitBtn}</span>
              </button>
              <span className="text-[11px] text-secondary">
                {isHi ? "सत्यापन अवधि: 24–48 कार्य घंटे" : "Verification period: 24-48 hours"}
              </span>
            </div>
          </form>
        </div>
      </section>

      {/* =========================================================================
          SECTION 11: HEALTH INFORMATION SOURCES & STRIP
          ========================================================================= */}
      <section className="w-full bg-surface-container py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-secondary text-xs">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-tertiary shrink-0" />
            <span>
              {isHi
                ? "ग्राम पंचायत नारंगा उत्तरी डिजिटल स्वास्थ्य डायरेक्टरी — पूर्णतः स्वतंत्र, पारदर्शी एवं गैर-व्यावसायिक लोक सेवा"
                : "Naranga Uttari Digital Health Directory — Independent, transparent, and non-commercial public utility"}
            </span>
          </div>
          <div className="flex items-center gap-3 font-semibold">
            <a href="https://sitamarhi.nic.in" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
              sitamarhi.nic.in
            </a>
            <span>•</span>
            <a href="https://mohfw.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
              mohfw.gov.in
            </a>
            <span>•</span>
            <a href="https://nha.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
              nha.gov.in
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
