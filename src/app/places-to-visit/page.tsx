"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { IMAGES } from "@/lib/data";
import {
  VERIFIED_PLACES,
  THEMATIC_GATEWAYS,
  DISTANCE_ZONES,
  TRANSIT_GUIDE,
  TOURISM_GALLERY,
  PlaceRecord,
} from "@/lib/placesData";
import {
  MapPin,
  Search,
  SlidersHorizontal,
  Navigation,
  Compass,
  Star,
  ChevronRight,
  Info,
  Clock,
  CircleDollarSign,
  Sun,
  Train,
  Bus,
  Car,
  Calendar,
  Sparkles,
  Users,
  CheckCircle2,
  X,
  PhoneCall,
  Send,
  Camera,
  ExternalLink,
  ShieldCheck,
  Building2,
  Landmark,
} from "lucide-react";

export default function PlacesToVisitPage() {
  const { locale, t } = useLanguage();
  const tp = t.placesPage;

  // Filter & Search States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("distance-asc");

  // Modal State
  const [selectedPlace, setSelectedPlace] = useState<PlaceRecord | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    placeName: "",
    location: "",
    category: "mandir",
    distance: "",
    description: "",
    senderName: "",
    photoUrl: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Filtered & Sorted Places
  const filteredPlaces = useMemo(() => {
    let result = [...VERIFIED_PLACES];

    // Category filter
    if (selectedCategory !== "all") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.nameHi.toLowerCase().includes(q) ||
          p.nameEn.toLowerCase().includes(q) ||
          p.categoryLabelHi.toLowerCase().includes(q) ||
          p.categoryLabelEn.toLowerCase().includes(q) ||
          p.locationHi.toLowerCase().includes(q) ||
          p.locationEn.toLowerCase().includes(q) ||
          p.descHi.toLowerCase().includes(q) ||
          p.descEn.toLowerCase().includes(q)
      );
    }

    // Sorting
    if (sortBy === "distance-asc") {
      result.sort((a, b) => a.distanceKm - b.distanceKm);
    } else if (sortBy === "popularity") {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "alphabetical") {
      const nameKey = locale === "hi" ? "nameHi" : "nameEn";
      result.sort((a, b) => a[nameKey].localeCompare(b[nameKey]));
    }

    return result;
  }, [selectedCategory, searchQuery, sortBy, locale]);

  // Handle Form Submission
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "place_contribution",
          data: formData,
          submittedAt: new Date().toISOString(),
        }),
      });
    } catch {
      // Local fallback in case offline or mock mode
    }

    setIsSubmitting(false);
    setSubmitSuccess(true);
    setFormData({
      placeName: "",
      location: "",
      category: "mandir",
      distance: "",
      description: "",
      senderName: "",
      photoUrl: "",
    });
    setTimeout(() => setSubmitSuccess(false), 8000);
  };

  const openPlaceDetails = (place: PlaceRecord) => {
    setSelectedPlace(place);
    setIsModalOpen(true);
  };

  const getTransitIcon = (iconName: string) => {
    switch (iconName) {
      case "Train":
        return <Train className="w-6 h-6" />;
      case "Bus":
        return <Bus className="w-6 h-6" />;
      case "Car":
        return <Car className="w-6 h-6" />;
      case "Calendar":
        return <Calendar className="w-6 h-6" />;
      default:
        return <Compass className="w-6 h-6" />;
    }
  };

  return (
    <div className="w-full bg-background min-h-screen text-on-surface">
      {/* 1. Administrative Breadcrumb & Official Verification Ribbon */}
      <section className="w-full bg-surface-container-low border-b border-surface-container py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-y-2">
          <nav className="flex items-center gap-2 text-xs sm:text-sm text-on-surface-variant font-medium">
            <Link
              href="/"
              className="hover:text-primary transition-colors flex items-center gap-1.5"
            >
              <span>{t.common.home}</span>
            </Link>
            <span className="text-outline">/</span>
            <span className="text-primary font-bold">{tp.breadcrumb}</span>
          </nav>
          <div className="flex items-center gap-2 text-xs bg-surface-container px-3 py-1 rounded-full text-on-surface-variant shadow-sm">
            <span className="inline-flex items-center justify-center w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span>{tp.adminRegion}</span>
          </div>
        </div>
      </section>

      {/* 2. Hero Banner: Panoramic Landscape with Layered Typography */}
      <section className="relative w-full overflow-hidden bg-primary text-on-primary">
        <div
          className="w-full min-h-[460px] md:min-h-[520px] bg-cover bg-center relative flex items-center"
          style={{ backgroundImage: `url('${IMAGES.tourismHeroPunaura}')` }}
        >
          {/* Deep Atmospheric Gradient Scrim */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-primary/40" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12 md:py-16 flex flex-col justify-center">
            <div className="max-w-3xl flex flex-col gap-4">
              <div className="inline-flex items-center gap-2 self-start bg-secondary-fixed/90 text-on-secondary-fixed backdrop-blur-sm px-3.5 py-1 rounded-full text-xs font-semibold tracking-wide shadow-sm">
                <ShieldCheck className="w-4 h-4 text-tertiary-container" />
                <span>{tp.heroBadge}</span>
              </div>
              <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl font-extrabold text-on-primary drop-shadow-sm leading-tight">
                {tp.heroTitle}
              </h1>
              <p className="text-base sm:text-lg text-on-primary-container max-w-2xl leading-relaxed">
                {tp.heroSubtitle}
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href="#places-grid"
                  className="inline-flex items-center gap-2 bg-secondary-container text-on-secondary-fixed font-bold text-sm px-5 py-3 rounded-lg shadow-md hover:bg-surface-container-lowest transition-all"
                >
                  <Compass className="w-5 h-5" />
                  <span>{tp.heroExploreBtn}</span>
                </a>
                <a
                  href="#featured-spot"
                  className="inline-flex items-center gap-2 bg-primary-container/90 hover:bg-primary-container text-on-primary font-bold text-sm px-5 py-3 rounded-lg backdrop-blur-sm transition-all"
                >
                  <Star className="w-5 h-5 text-amber-300" />
                  <span>{tp.heroFeaturedBtn}</span>
                </a>
              </div>
              <div className="mt-2 flex items-center gap-2 text-xs text-primary-fixed-dim">
                <Info className="w-4 h-4 flex-shrink-0" />
                <span>{tp.heroDisclaimer}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Category Grid: 6 Thematic Gateways */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10 w-full mb-12">
        <div className="bg-surface-container-lowest rounded-2xl p-6 md:p-8 shadow-xl border border-surface-container">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 pb-4 border-b border-surface-container">
            <div>
              <span className="text-xs uppercase tracking-wider text-tertiary font-bold">
                {tp.categoriesTag}
              </span>
              <h2 className="font-headline text-2xl sm:text-3xl text-primary font-bold">
                {tp.categoriesTitle}
              </h2>
            </div>
            <p className="text-sm text-on-surface-variant max-w-md mt-1 md:mt-0">
              {tp.categoriesSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {THEMATIC_GATEWAYS.map((gateway) => (
              <button
                key={gateway.id}
                type="button"
                onClick={() => {
                  setSelectedCategory(gateway.category);
                  const el = document.getElementById("places-grid");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="group text-left flex items-start gap-4 p-4 rounded-xl bg-surface-container-low hover:bg-surface-container transition-all shadow-sm border border-surface-container-high/50"
              >
                <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 relative bg-surface-container flex items-center justify-center">
                  {gateway.imageUrl ? (
                    <img
                      src={gateway.imageUrl}
                      alt={locale === "hi" ? gateway.titleHi : gateway.titleEn}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : gateway.icon === "Users" ? (
                    <Users className="w-10 h-10 text-primary" />
                  ) : (
                    <Sparkles className="w-10 h-10 text-primary" />
                  )}
                  {gateway.count && (
                    <span className="absolute bottom-1 right-1 bg-primary text-on-primary text-[10px] px-1.5 py-0.5 rounded font-bold">
                      {gateway.count}
                    </span>
                  )}
                </div>
                <div className="flex flex-col justify-center flex-1">
                  <div className="flex items-center gap-1 text-primary font-headline text-base font-bold">
                    <span>{locale === "hi" ? gateway.titleHi : gateway.titleEn}</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                  <p className="text-xs text-on-surface-variant line-clamp-2 mt-1 leading-relaxed">
                    {locale === "hi" ? gateway.descHi : gateway.descEn}
                  </p>
                  <span className="text-xs text-tertiary font-semibold mt-1">
                    {locale === "hi" ? gateway.subHi : gateway.subEn}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Editorial Spotlight: Punaura Dham Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mb-12" id="featured-spot">
        <div className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-lg border border-surface-container">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Visual Column */}
            <div className="lg:col-span-7 relative min-h-[380px] lg:min-h-full">
              <img
                src={IMAGES.tourismPunauraSpotlight}
                alt="Punaura Dham Janaki Temple & Sita Kund"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                <span className="bg-primary text-on-primary text-xs font-bold px-3 py-1.5 rounded-full shadow-md flex items-center gap-1.5">
                  <Star className="w-3.5 h-3.5 text-amber-300" />
                  <span>{tp.spotlightBadge}</span>
                </span>
                <span className="bg-secondary-fixed text-on-secondary-fixed text-xs px-3 py-1.5 rounded-full font-bold">
                  {tp.spotlightRamayana}
                </span>
              </div>
              <div className="absolute bottom-4 left-4 right-4 bg-primary/85 backdrop-blur-md p-3.5 rounded-xl text-on-primary flex items-center justify-between text-xs">
                <span className="flex items-center gap-2 font-medium">
                  <Camera className="w-4 h-4 text-primary-fixed" />
                  <span>पुनौरा धाम - जानकी जन्मभूमि परिसर व सीता कुण्ड</span>
                </span>
                <span className="text-primary-fixed-dim font-bold">सीतामढ़ी, बिहार</span>
              </div>
            </div>

            {/* Detail Column */}
            <div className="lg:col-span-5 p-6 md:p-8 flex flex-col justify-between bg-surface-container-low">
              <div>
                <div className="flex items-center gap-2 mb-2 text-xs text-tertiary font-bold uppercase tracking-wider">
                  <Landmark className="w-4 h-4" />
                  <span>{tp.spotlightTag}</span>
                </div>
                <h3 className="font-headline text-2xl font-bold text-primary mb-2">
                  {tp.spotlightTitle}
                </h3>
                <p className="text-xs text-on-surface-variant flex items-center gap-1.5 mb-4">
                  <MapPin className="w-4 h-4 text-tertiary-container flex-shrink-0" />
                  <strong className="text-on-surface">दूरी:</strong> {tp.spotlightDistance}
                </p>
                <p className="text-sm text-on-surface leading-relaxed mb-6">
                  {tp.spotlightDescription}
                </p>

                {/* Travel Essentials Grid */}
                <div className="bg-surface-container-lowest rounded-xl p-4 shadow-sm mb-6 space-y-3 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-on-surface-variant flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-primary" />
                      <span>{tp.spotlightTimings}</span>
                    </span>
                    <span className="font-semibold text-on-surface">
                      {tp.spotlightTimingsVal}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-on-surface-variant flex items-center gap-1.5">
                      <CircleDollarSign className="w-4 h-4 text-primary" />
                      <span>{tp.spotlightEntryFee}</span>
                    </span>
                    <span className="font-semibold text-primary">
                      {tp.spotlightEntryFeeVal}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-on-surface-variant flex items-center gap-1.5">
                      <Sun className="w-4 h-4 text-primary" />
                      <span>{tp.spotlightBestTime}</span>
                    </span>
                    <span className="font-semibold text-on-surface">
                      {tp.spotlightBestTimeVal}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-on-surface-variant flex items-center gap-1.5">
                      <Train className="w-4 h-4 text-primary" />
                      <span>{tp.spotlightNearestStation}</span>
                    </span>
                    <span className="font-semibold text-on-surface">
                      {tp.spotlightNearestStationVal}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <a
                  href="https://maps.google.com/?q=Punaura+Dham+Sitamarhi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-container text-on-primary font-bold text-sm py-3 px-4 rounded-xl shadow-sm transition-all"
                >
                  <Navigation className="w-4 h-4" />
                  <span>{tp.spotlightMapsBtn}</span>
                </a>
                <button
                  type="button"
                  onClick={() => openPlaceDetails(VERIFIED_PLACES[0])}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-surface-container hover:bg-surface-container-high text-on-surface font-bold text-sm py-3 px-4 rounded-xl transition-all border border-surface-container-highest"
                >
                  <Info className="w-4 h-4 text-primary" />
                  <span>{tp.spotlightGuideBtn}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Interactive Filter & Search Controls */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mb-8" id="places-grid">
        <div className="bg-surface-container-lowest p-5 sm:p-6 rounded-2xl shadow-md border border-surface-container">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1 max-w-lg">
              <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-outline" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={tp.filterSearchPlaceholder}
                className="w-full pl-11 pr-4 py-2.5 bg-surface-container-low rounded-xl text-sm text-on-surface outline-none focus:ring-2 focus:ring-primary placeholder:text-outline border border-transparent focus:border-primary transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Sort Toggle */}
            <div className="flex items-center gap-2 flex-wrap">
              <label className="text-xs text-on-surface-variant flex items-center gap-1 font-semibold">
                <SlidersHorizontal className="w-4 h-4 text-primary" />
                <span>{tp.sortLabel}</span>
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-surface-container-low text-on-surface text-xs font-semibold px-3 py-2 rounded-xl outline-none cursor-pointer border border-surface-container"
              >
                <option value="distance-asc">{tp.sortDistanceAsc}</option>
                <option value="popularity">{tp.sortPopularity}</option>
                <option value="alphabetical">{tp.sortAlphabetical}</option>
              </select>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pt-4 mt-2 pb-1 border-t border-surface-container/60">
            <button
              type="button"
              onClick={() => setSelectedCategory("all")}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-bold transition-all ${
                selectedCategory === "all"
                  ? "bg-primary text-on-primary shadow-sm"
                  : "bg-surface-container hover:bg-surface-container-high text-on-surface"
              }`}
            >
              {tp.filterAll}
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategory("धार्मिक")}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-bold transition-all ${
                selectedCategory === "धार्मिक"
                  ? "bg-primary text-on-primary shadow-sm"
                  : "bg-surface-container hover:bg-surface-container-high text-on-surface"
              }`}
            >
              {tp.filterReligious}
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategory("ऐतिहासिक")}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-bold transition-all ${
                selectedCategory === "ऐतिहासिक"
                  ? "bg-primary text-on-primary shadow-sm"
                  : "bg-surface-container hover:bg-surface-container-high text-on-surface"
              }`}
            >
              {tp.filterHistorical}
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategory("प्राकृतिक")}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-bold transition-all ${
                selectedCategory === "प्राकृतिक"
                  ? "bg-primary text-on-primary shadow-sm"
                  : "bg-surface-container hover:bg-surface-container-high text-on-surface"
              }`}
            >
              {tp.filterNatural}
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategory("स्थानीय")}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-bold transition-all ${
                selectedCategory === "स्थानीय"
                  ? "bg-primary text-on-primary shadow-sm"
                  : "bg-surface-container hover:bg-surface-container-high text-on-surface"
              }`}
            >
              {tp.filterLocal}
            </button>
          </div>
        </div>
      </section>

      {/* 6. Popular Places Directory: 8+ Rich Verified Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mb-12">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-6 bg-primary rounded-full" />
            <h2 className="font-headline text-2xl font-bold text-primary">
              {locale === "hi" ? "लोकप्रिय दर्शनीय स्थल सूची" : "Popular Destinations Directory"}
            </h2>
          </div>
          <span className="text-xs text-on-surface-variant bg-surface-container px-3 py-1 rounded-full font-semibold">
            {filteredPlaces.length} {tp.placesCountSuffix}
          </span>
        </div>

        {filteredPlaces.length === 0 ? (
          <div className="bg-surface-container-low rounded-2xl p-12 text-center border border-dashed border-outline">
            <Info className="w-10 h-10 text-primary mx-auto mb-3" />
            <h3 className="font-headline text-lg font-bold text-on-surface">
              {locale === "hi" ? "कोई स्थल नहीं मिला" : "No Destinations Found"}
            </h3>
            <p className="text-xs text-on-surface-variant mt-1">
              {locale === "hi"
                ? "कृपया खोज शब्द बदलें या अन्य श्रेणी चुनें।"
                : "Please modify search terms or select a different category."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredPlaces.map((place) => (
              <div
                key={place.id}
                className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all border border-surface-container flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-48 w-full overflow-hidden bg-surface-container">
                    <img
                      src={place.imageUrl}
                      alt={locale === "hi" ? place.nameHi : place.nameEn}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2.5 left-2.5 flex gap-1.5">
                      <span className="bg-primary/90 text-on-primary text-[10px] px-2.5 py-0.5 rounded-full font-bold backdrop-blur-xs">
                        {locale === "hi" ? place.badgeHi : place.badgeEn}
                      </span>
                    </div>
                    <div className="absolute bottom-2.5 right-2.5 bg-surface-container-lowest/90 backdrop-blur-sm text-on-surface px-2.5 py-0.5 rounded-md text-[11px] font-bold shadow-sm">
                      {locale === "hi" ? place.distanceTextHi : place.distanceTextEn}
                    </div>
                  </div>

                  <div className="p-4 sm:p-5">
                    <div className="flex items-center justify-between text-xs text-tertiary font-bold mb-1.5">
                      <span>{locale === "hi" ? place.categoryLabelHi : place.categoryLabelEn}</span>
                      <span className="flex items-center text-amber-600 gap-1 font-semibold">
                        <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                        <span>{place.rating.toFixed(1)}</span>
                      </span>
                    </div>
                    <h3 className="font-headline text-base font-bold text-primary mb-2 line-clamp-1">
                      {locale === "hi" ? place.nameHi : place.nameEn}
                    </h3>
                    <p className="text-xs text-on-surface-variant line-clamp-3 leading-relaxed">
                      {locale === "hi" ? place.descHi : place.descEn}
                    </p>
                  </div>
                </div>

                <div className="p-4 sm:p-5 pt-0">
                  <div className="flex items-center gap-2 pt-3 border-t border-surface-container">
                    <a
                      href={`https://maps.google.com/?q=${place.mapsQuery}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-1.5 bg-surface-container hover:bg-surface-container-high text-on-surface text-xs font-bold py-2.5 rounded-xl transition-colors"
                    >
                      <Navigation className="w-3.5 h-3.5 text-primary" />
                      <span>{tp.routeBtn}</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => openPlaceDetails(place)}
                      className="flex-1 inline-flex items-center justify-center gap-1 bg-primary text-on-primary hover:bg-primary-container text-xs font-bold py-2.5 rounded-xl transition-colors"
                    >
                      <span>{tp.detailsBtn}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 7. Geographic Distance Zoning Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mb-12">
        <div className="bg-surface-container-low rounded-2xl p-6 md:p-8 shadow-sm border border-surface-container">
          <div className="mb-6">
            <span className="text-xs text-tertiary font-bold uppercase tracking-wider">
              {tp.distanceZonesTag}
            </span>
            <h3 className="font-headline text-2xl font-bold text-primary">
              {tp.distanceZonesTitle}
            </h3>
            <p className="text-xs text-on-surface-variant mt-1">
              {tp.distanceZonesSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {DISTANCE_ZONES.map((zone) => (
              <div
                key={zone.id}
                className={`bg-surface-container-lowest p-5 rounded-xl shadow-sm border-l-4 ${zone.borderColor}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-primary">
                    {locale === "hi" ? zone.titleHi : zone.titleEn}
                  </span>
                  <span className="bg-primary-fixed text-primary px-2 py-0.5 rounded-full text-[10px] font-bold">
                    {locale === "hi" ? zone.rangeHi : zone.rangeEn}
                  </span>
                </div>
                <p className="text-xs text-on-surface font-semibold mb-2">
                  {locale === "hi" ? zone.subtitleHi : zone.subtitleEn}
                </p>
                <ul className="text-xs text-on-surface-variant space-y-1.5 list-disc list-inside">
                  {(locale === "hi" ? zone.itemsHi : zone.itemsEn).map((it, idx) => (
                    <li key={idx}>{it}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Travel Logistics & Transit Guide */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mb-12">
        <div className="bg-surface-container-lowest rounded-2xl p-6 md:p-8 shadow-md border border-surface-container">
          <div className="flex items-center gap-2.5 mb-1.5">
            <Train className="w-6 h-6 text-primary" />
            <h3 className="font-headline text-2xl font-bold text-primary">
              {tp.transitTag}
            </h3>
          </div>
          <p className="text-xs text-on-surface-variant mb-6">
            {tp.transitSubtitle}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {TRANSIT_GUIDE.map((guide) => (
              <div
                key={guide.id}
                className="bg-surface-container-low p-5 rounded-xl flex flex-col justify-between border border-surface-container-high/60"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-primary-fixed text-primary flex items-center justify-center mb-3">
                    {getTransitIcon(guide.icon)}
                  </div>
                  <h4 className="font-headline text-base font-bold text-on-surface mb-2">
                    {locale === "hi" ? guide.titleHi : guide.titleEn}
                  </h4>
                  <ul className="text-xs text-on-surface-variant space-y-1.5 leading-relaxed">
                    {(locale === "hi" ? guide.detailsHi : guide.detailsEn).map((line, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-primary mt-0.5">•</span>
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <span className="mt-4 text-[11px] text-primary font-bold bg-surface-container-lowest py-1 px-2.5 rounded-lg border border-surface-container">
                  {locale === "hi" ? guide.badgeHi : guide.badgeEn}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Visual Tourism Gallery (12 Tiles) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6">
          <div>
            <span className="text-xs text-tertiary font-bold uppercase tracking-wider">
              {tp.galleryTag}
            </span>
            <h3 className="font-headline text-2xl font-bold text-primary">
              {tp.galleryTitle}
            </h3>
          </div>
          <p className="text-xs text-on-surface-variant mt-1 md:mt-0 max-w-md">
            {tp.gallerySubtitle}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {TOURISM_GALLERY.map((tile) => (
            <div
              key={tile.id}
              className={`rounded-2xl overflow-hidden relative group cursor-pointer shadow-sm border border-surface-container ${
                tile.isLarge
                  ? "col-span-2 row-span-2 min-h-[280px] sm:min-h-[340px]"
                  : "h-44 sm:h-52"
              }`}
            >
              <img
                src={tile.imageUrl}
                alt={locale === "hi" ? tile.titleHi : tile.titleEn}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div
                className={`absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-transparent transition-opacity duration-300 ${
                  tile.isLarge
                    ? "opacity-90 group-hover:opacity-100"
                    : "opacity-0 group-hover:opacity-100"
                }`}
              />
              <div
                className={`absolute bottom-3 left-3 right-3 text-on-primary transition-all duration-300 ${
                  tile.isLarge
                    ? "opacity-100"
                    : "opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0"
                }`}
              >
                <span className="text-[10px] text-primary-fixed-dim uppercase tracking-wider font-bold block mb-0.5">
                  {locale === "hi" ? tile.tagHi : tile.tagEn}
                </span>
                <p className="text-xs sm:text-sm font-bold leading-snug">
                  {locale === "hi" ? tile.titleHi : tile.titleEn}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 10. Visitor Contribution Form */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mb-12">
        <div className="bg-surface-container-low rounded-2xl p-6 md:p-8 shadow-md border border-surface-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-1.5 bg-primary-fixed text-primary px-3 py-1 rounded-full text-xs font-bold mb-3">
                  <Camera className="w-3.5 h-3.5" />
                  <span>{tp.formTag}</span>
                </div>
                <h3 className="font-headline text-2xl font-bold text-primary mb-3">
                  {tp.formTitle}
                </h3>
                <p className="text-xs text-on-surface-variant leading-relaxed mb-4">
                  {tp.formSubtitle}
                </p>
                <div className="bg-surface-container-lowest p-4 rounded-xl shadow-sm space-y-2 text-xs text-on-surface-variant border border-surface-container">
                  <div className="flex items-center gap-1.5 text-primary font-bold">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{tp.formVerificationTitle}</span>
                  </div>
                  <p>{tp.formVerificationText}</p>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-surface-container text-[11px] text-on-surface-variant">
                {tp.formPrivacyNote}
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-7 bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-surface-container">
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-on-surface mb-1">
                      {tp.formPlaceName}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.placeName}
                      onChange={(e) =>
                        setFormData({ ...formData, placeName: e.target.value })
                      }
                      placeholder={tp.formPlaceNamePlaceholder}
                      className="w-full px-3 py-2 bg-surface-container-low rounded-xl text-xs text-on-surface outline-none focus:ring-2 focus:ring-primary border border-transparent focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-on-surface mb-1">
                      {tp.formLocation}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.location}
                      onChange={(e) =>
                        setFormData({ ...formData, location: e.target.value })
                      }
                      placeholder={tp.formLocationPlaceholder}
                      className="w-full px-3 py-2 bg-surface-container-low rounded-xl text-xs text-on-surface outline-none focus:ring-2 focus:ring-primary border border-transparent focus:border-primary"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-on-surface mb-1">
                      {tp.formCategory}
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value })
                      }
                      className="w-full px-3 py-2 bg-surface-container-low rounded-xl text-xs text-on-surface outline-none focus:ring-2 focus:ring-primary border border-transparent focus:border-primary cursor-pointer"
                    >
                      <option value="mandir">{tp.formCategoryMandir}</option>
                      <option value="heritage">{tp.formCategoryHeritage}</option>
                      <option value="water">{tp.formCategoryWater}</option>
                      <option value="fair">{tp.formCategoryFair}</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-on-surface mb-1">
                      {tp.formDistance}
                    </label>
                    <input
                      type="text"
                      value={formData.distance}
                      onChange={(e) =>
                        setFormData({ ...formData, distance: e.target.value })
                      }
                      placeholder={tp.formDistancePlaceholder}
                      className="w-full px-3 py-2 bg-surface-container-low rounded-xl text-xs text-on-surface outline-none focus:ring-2 focus:ring-primary border border-transparent focus:border-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-on-surface mb-1">
                    {tp.formDesc}
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    placeholder={tp.formDescPlaceholder}
                    className="w-full px-3 py-2 bg-surface-container-low rounded-xl text-xs text-on-surface outline-none focus:ring-2 focus:ring-primary border border-transparent focus:border-primary resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-on-surface mb-1">
                      {tp.formSender}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.senderName}
                      onChange={(e) =>
                        setFormData({ ...formData, senderName: e.target.value })
                      }
                      placeholder={tp.formSenderPlaceholder}
                      className="w-full px-3 py-2 bg-surface-container-low rounded-xl text-xs text-on-surface outline-none focus:ring-2 focus:ring-primary border border-transparent focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-on-surface mb-1">
                      {tp.formPhotoUrl}
                    </label>
                    <input
                      type="url"
                      value={formData.photoUrl}
                      onChange={(e) =>
                        setFormData({ ...formData, photoUrl: e.target.value })
                      }
                      placeholder={tp.formPhotoUrlPlaceholder}
                      className="w-full px-3 py-2 bg-surface-container-low rounded-xl text-xs text-on-surface outline-none focus:ring-2 focus:ring-primary border border-transparent focus:border-primary"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-container text-on-primary font-bold text-xs px-6 py-3 rounded-xl shadow-md transition-all disabled:opacity-60"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? "..." : tp.formSubmitBtn}</span>
                  </button>
                </div>

                {submitSuccess && (
                  <div className="bg-primary-fixed/40 border border-primary/30 p-3 rounded-xl flex items-center gap-2 text-xs font-semibold text-primary animate-in fade-in">
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                    <span>{tp.formSuccessMsg}</span>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* 11. Tourism Helplines & Official Citations Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mb-12">
        <div className="bg-surface-container p-5 sm:p-6 rounded-2xl shadow-sm border border-surface-container-high flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary text-on-primary flex items-center justify-center flex-shrink-0 shadow-sm">
              <PhoneCall className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-headline text-base font-bold text-primary">
                {tp.helplineTitle}
              </h4>
              <p className="text-xs text-on-surface-variant mt-0.5">
                {tp.helplineNational} • {tp.helplineBihar} • {tp.helplinePolice}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-on-surface-variant flex-shrink-0 bg-surface-container-lowest px-3.5 py-1.5 rounded-full border border-surface-container">
            <CheckCircle2 className="w-4 h-4 text-primary" />
            <span>{tp.helplineCitations}</span>
          </div>
        </div>
      </section>

      {/* 12. Interactive Destination Details Modal */}
      {isModalOpen && selectedPlace && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="bg-surface-container-lowest max-w-xl w-full rounded-2xl overflow-hidden shadow-2xl border border-surface-container max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="bg-primary text-on-primary p-4 sm:p-5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Landmark className="w-5 h-5 text-primary-fixed" />
                <h4 className="font-headline text-lg font-bold">
                  {locale === "hi" ? selectedPlace.nameHi : selectedPlace.nameEn}
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-on-primary hover:bg-primary-container p-1 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4 overflow-y-auto flex-1 text-xs">
              <div className="relative h-44 w-full rounded-xl overflow-hidden bg-surface-container">
                <img
                  src={selectedPlace.imageUrl}
                  alt={locale === "hi" ? selectedPlace.nameHi : selectedPlace.nameEn}
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-2.5 right-2.5 bg-surface-container-lowest/90 px-2.5 py-0.5 rounded-md font-bold text-on-surface text-[11px]">
                  {locale === "hi" ? selectedPlace.distanceTextHi : selectedPlace.distanceTextEn}
                </span>
              </div>

              <div>
                <span className="text-tertiary font-bold text-xs">
                  {locale === "hi" ? selectedPlace.categoryLabelHi : selectedPlace.categoryLabelEn} • {locale === "hi" ? selectedPlace.locationHi : selectedPlace.locationEn}
                </span>
                <p className="text-on-surface mt-1.5 leading-relaxed text-xs">
                  {locale === "hi" ? selectedPlace.fullDescHi : selectedPlace.fullDescEn}
                </p>
              </div>

              {/* Timing & Fee Grid */}
              <div className="grid grid-cols-2 gap-2 bg-surface-container-low p-3.5 rounded-xl">
                <div>
                  <span className="text-on-surface-variant block text-[11px]">{tp.spotlightTimings}</span>
                  <strong className="text-on-surface">{locale === "hi" ? selectedPlace.timingHi : selectedPlace.timingEn}</strong>
                </div>
                <div>
                  <span className="text-on-surface-variant block text-[11px]">{tp.spotlightEntryFee}</span>
                  <strong className="text-primary">{locale === "hi" ? selectedPlace.entryFeeHi : selectedPlace.entryFeeEn}</strong>
                </div>
                <div>
                  <span className="text-on-surface-variant block text-[11px]">{tp.spotlightBestTime}</span>
                  <strong className="text-on-surface">{locale === "hi" ? selectedPlace.bestTimeHi : selectedPlace.bestTimeEn}</strong>
                </div>
                <div>
                  <span className="text-on-surface-variant block text-[11px]">{tp.spotlightNearestStation}</span>
                  <strong className="text-on-surface">{locale === "hi" ? selectedPlace.nearestStationHi : selectedPlace.nearestStationEn}</strong>
                </div>
              </div>

              {selectedPlace.nearbySpotsHi && (
                <div className="bg-surface-container-low p-3.5 rounded-xl space-y-1">
                  <p>
                    <strong className="text-primary">{tp.modalNearbyTitle}</strong>{" "}
                    {locale === "hi" ? selectedPlace.nearbySpotsHi : selectedPlace.nearbySpotsEn}
                  </p>
                  {selectedPlace.tipsHi && (
                    <p>
                      <strong className="text-primary">{tp.modalTipsTitle}</strong>{" "}
                      {locale === "hi" ? selectedPlace.tipsHi : selectedPlace.tipsEn}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-surface-container-low border-t border-surface-container flex items-center justify-end gap-2">
              <a
                href={`https://maps.google.com/?q=${selectedPlace.mapsQuery}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-primary text-on-primary text-xs font-bold px-4 py-2.5 rounded-xl shadow-sm"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>{tp.modalNavigate}</span>
              </a>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="bg-surface-container text-on-surface text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-surface-container-high transition-colors"
              >
                {tp.modalClose}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
