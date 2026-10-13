"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { Landmark, Users, User, Scale, Building2, Phone, Camera } from "lucide-react";

export const PanchayatPreview = () => {
  const { t } = useLanguage();

  return (
    <section className="w-full bg-surface-container-low py-10 sm:py-14 border-b border-surface-container">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-wider mb-1">
              <Landmark className="w-4 h-4 text-primary" />
              <span>{t.panchayat.tag}</span>
            </div>
            <h2 className="font-headline text-2xl sm:text-3xl text-on-surface font-bold">
              {t.panchayat.title}
            </h2>
            <p className="text-xs sm:text-sm text-on-surface-variant mt-1">
              {t.panchayat.subtitle}
            </p>
          </div>
          <Link
            href="/panchayat"
            className="px-4 py-2 bg-primary text-on-primary rounded text-xs font-semibold hover:bg-primary-container transition-colors inline-flex items-center gap-1.5 shadow-sm"
          >
            <Users className="w-4 h-4" />
            <span>{t.panchayat.viewAllBtn}</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Mukhiya Card */}
          <div className="bg-surface-container-lowest rounded-xl p-6 shadow-sm flex flex-col justify-between border border-surface-container">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-full bg-surface-container-high flex items-center justify-center text-secondary">
                  <User className="w-8 h-8" />
                </div>
                <div>
                  <span className="px-2 py-0.5 bg-tertiary-fixed text-on-tertiary-fixed rounded text-[11px] font-semibold border border-tertiary/20">
                    {t.panchayat.mukhiyaStatus}
                  </span>
                  <h3 className="font-headline text-lg text-on-surface font-bold mt-1">
                    {t.panchayat.mukhiyaName}
                  </h3>
                  <p className="text-xs text-primary font-medium">
                    {t.panchayat.mukhiyaRole}
                  </p>
                </div>
              </div>

              <div className="space-y-2 py-2">
                <div className="p-2.5 rounded bg-surface-container-low text-xs text-on-surface-variant flex items-center gap-2">
                  <Camera className="w-4 h-4 text-outline" />
                  <span>Official photograph pending verification</span>
                </div>
                <div className="p-2.5 rounded bg-surface-container-low text-xs text-on-surface-variant flex items-center gap-2">
                  <Phone className="w-4 h-4 text-outline" />
                  <span>Contact awaiting official verification</span>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Link
                href="/panchayat"
                className="block text-center w-full py-2 bg-surface-container-high hover:bg-surface-container-highest text-primary text-xs rounded font-semibold transition-colors"
              >
                {t.common.viewDetails}
              </Link>
            </div>
          </div>

          {/* Sarpanch Card */}
          <div className="bg-surface-container-lowest rounded-xl p-6 shadow-sm flex flex-col justify-between border border-surface-container">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-full bg-surface-container-high flex items-center justify-center text-secondary">
                  <Scale className="w-8 h-8" />
                </div>
                <div>
                  <span className="px-2 py-0.5 bg-surface-container-high text-on-surface-variant rounded text-[11px] font-semibold">
                    Gram Kachahari (ग्राम कचहरी)
                  </span>
                  <h3 className="font-headline text-lg text-on-surface font-bold mt-1">
                    {t.panchayat.sarpanchRole}
                  </h3>
                  <p className="text-xs text-secondary font-medium">
                    न्यायिक पद / Independent Judicial Role
                  </p>
                </div>
              </div>

              <div className="p-4 rounded bg-surface-container-low text-xs text-on-surface-variant leading-relaxed">
                <p>{t.panchayat.sarpanchNote}</p>
              </div>
            </div>

            <div className="pt-4">
              <span className="text-[11px] text-outline block text-center">
                Status: Pending Gazette Sync
              </span>
            </div>
          </div>

          {/* Ward Members Summary */}
          <div className="bg-surface-container-lowest rounded-xl p-6 shadow-sm flex flex-col justify-between border border-surface-container">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-full bg-surface-container-high flex items-center justify-center text-secondary">
                  <Building2 className="w-8 h-8" />
                </div>
                <div>
                  <span className="px-2 py-0.5 bg-surface-container-high text-on-surface-variant rounded text-[11px] font-semibold">
                    वार्ड सदस्य व पंचायत सचिव
                  </span>
                  <h3 className="font-headline text-lg text-on-surface font-bold mt-1">
                    14 Ward Members
                  </h3>
                  <p className="text-xs text-secondary font-medium">
                    Ward 1 to Ward 14 Directory
                  </p>
                </div>
              </div>

              <div className="space-y-2 text-xs text-on-surface-variant">
                <div className="p-2.5 rounded bg-surface-container-low">
                  <strong>वार्ड प्रतिनिधि: </strong> 14 Electoral Wards directory awaiting official Gazette upload.
                </div>
                <div className="p-2.5 rounded bg-surface-container-low">
                  <strong>पंचायत सचिव / Sachiv: </strong> Details pending official notification upload.
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Link
                href="/contact"
                className="block text-center w-full py-2 bg-surface-container-high hover:bg-surface-container-highest text-primary text-xs rounded font-semibold transition-colors"
              >
                {t.panchayat.requestCorrection}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
