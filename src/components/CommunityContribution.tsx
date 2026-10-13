"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { 
  Handshake, 
  FileEdit, 
  Camera, 
  CheckCircle2, 
  Award, 
  X, 
  Send 
} from "lucide-react";

export const CommunityContribution = () => {
  const { t } = useLanguage();
  const [modalType, setModalType] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    category: "",
    details: "",
    consent: false,
  });

  const openModal = (type: string) => {
    setModalType(type);
    setSubmitted(false);
    setFormData({ name: "", contact: "", category: type, details: "", consent: false });
  };

  const closeModal = () => {
    setModalType(null);
    setSubmitted(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.details || !formData.consent) {
      alert("कृपया सभी आवश्यक फ़ील्ड भरें एवं सहमति दें / Please fill all required fields and check consent.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: modalType,
          submitterName: formData.name,
          contact: formData.contact,
          content: formData.details,
          consent: formData.consent,
        }),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        alert("प्रस्तुति सहेजने में त्रुटि। कृपया पुनः प्रयास करें।");
      }
    } catch {
      // Offline fallback: save to localStorage so submission is never lost
      const existing = JSON.parse(localStorage.getItem("naranga_submissions") || "[]");
      existing.push({
        id: Date.now(),
        type: modalType,
        submitterName: formData.name,
        contact: formData.contact,
        content: formData.details,
        date: new Date().toISOString(),
      });
      localStorage.setItem("naranga_submissions", JSON.stringify(existing));
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="w-full bg-surface-container-high py-10 sm:py-14 border-b border-surface-container">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 text-primary text-xs font-bold uppercase tracking-wider mb-2">
            <Handshake className="w-4 h-4 text-primary" />
            <span>{t.community.tag}</span>
          </div>
          <h2 className="font-headline text-2xl sm:text-3xl text-on-surface font-bold">
            {t.community.title}
          </h2>
          <p className="text-xs sm:text-sm text-on-surface-variant mt-2 mb-8 leading-relaxed">
            {t.community.subtitle}
          </p>

          {/* 4 Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
            <button
              onClick={() => openModal("info")}
              className="px-4 py-3 bg-primary text-on-primary rounded-lg text-xs font-semibold hover:bg-primary-container transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <FileEdit className="w-4 h-4" />
              <span>{t.community.btnInfo}</span>
            </button>
            <button
              onClick={() => openModal("photo")}
              className="px-4 py-3 bg-primary text-on-primary rounded-lg text-xs font-semibold hover:bg-primary-container transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <Camera className="w-4 h-4" />
              <span>{t.community.btnPhoto}</span>
            </button>
            <button
              onClick={() => openModal("correction")}
              className="px-4 py-3 bg-surface-container-lowest text-on-surface rounded-lg text-xs font-semibold hover:bg-surface-container transition-colors flex items-center justify-center gap-2 shadow-sm border border-surface-container"
            >
              <CheckCircle2 className="w-4 h-4 text-primary" />
              <span>{t.community.btnCorrect}</span>
            </button>
            <button
              onClick={() => openModal("nomination")}
              className="px-4 py-3 bg-surface-container-lowest text-on-surface rounded-lg text-xs font-semibold hover:bg-surface-container transition-colors flex items-center justify-center gap-2 shadow-sm border border-surface-container"
            >
              <Award className="w-4 h-4 text-primary" />
              <span>{t.community.btnNominate}</span>
            </button>
          </div>

          <p className="text-[11px] text-outline">
            {t.community.disclaimer}
          </p>
        </div>
      </div>

      {/* Submission Modal Dialog */}
      {modalType && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-on-surface/60 backdrop-blur-sm p-4">
          <div className="bg-surface-container-lowest rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-surface-container relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-surface-container text-outline hover:text-on-surface transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {submitted ? (
              <div className="text-center py-8">
                <CheckCircle2 className="w-14 h-14 text-emerald-600 mx-auto mb-3" />
                <h3 className="font-headline text-xl font-bold text-on-surface">
                  प्रविष्टि सफलतापूर्वक प्राप्त हुई!
                </h3>
                <p className="text-xs sm:text-sm text-on-surface-variant mt-2 max-w-sm mx-auto leading-relaxed">
                  आपकी जानकारी सुरक्षित रूप से सहेज ली गई है। संपादकीय सत्यापन एवं समीक्षा के उपरांत इसे पोर्टल पर शामिल किया जाएगा। धन्यवाद!
                </p>
                <button
                  onClick={closeModal}
                  className="mt-6 px-6 py-2 bg-primary text-on-primary rounded text-xs font-bold hover:bg-primary-container transition-colors"
                >
                  {t.common.close}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="border-b border-surface-container pb-3">
                  <h3 className="font-headline text-lg font-bold text-on-surface">
                    {modalType === "info" && "गाँव की जानकारी साझा करें / Submit Village Info"}
                    {modalType === "photo" && "गाँव की तस्वीर अपलोड करें / Upload Authentic Photo"}
                    {modalType === "correction" && "डेटा सुधार का सुझाव दें / Suggest Data Correction"}
                    {modalType === "nomination" && "प्रेरक व्यक्ति नामांकित करें / Nominate an Achiever"}
                  </h3>
                  <p className="text-[11px] text-secondary mt-0.5">
                    कृपया केवल प्रामाणिक एवं दस्तावेजी साक्ष्य समर्थित विवरण ही प्रदान करें।
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-on-surface mb-1">
                    आपका नाम / Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="उदा. रमेश कुमार / Ramesh Kumar"
                    className="w-full px-3 py-2 text-xs rounded border border-outline-variant bg-surface-container-lowest focus:border-primary outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-on-surface mb-1">
                    मोबाइल नंबर / ईमेल (सत्यापन हेतु)
                  </label>
                  <input
                    type="text"
                    value={formData.contact}
                    onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                    placeholder="+91-XXXXX XXXXX"
                    className="w-full px-3 py-2 text-xs rounded border border-outline-variant bg-surface-container-lowest focus:border-primary outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-on-surface mb-1">
                    विस्तृत विवरण / Detailed Description & Source *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.details}
                    onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                    placeholder="स्थान, विद्यालय, उपलब्धि या सुधार का विवरण लिखें..."
                    className="w-full px-3 py-2 text-xs rounded border border-outline-variant bg-surface-container-lowest focus:border-primary outline-none"
                  />
                </div>

                <div className="flex items-start gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="consentCheck"
                    required
                    checked={formData.consent}
                    onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                    className="mt-0.5 rounded text-primary focus:ring-primary w-4 h-4 cursor-pointer"
                  />
                  <label htmlFor="consentCheck" className="text-[11px] text-on-surface-variant leading-tight cursor-pointer">
                    मैं प्रमाणित करता हूँ कि यह जानकारी सत्य है और सार्वजनिक प्रकाशन हेतु मेरी पूर्ण सहमति है।
                  </label>
                </div>

                <div className="pt-2 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-4 py-2 rounded text-xs font-semibold text-on-surface-variant hover:bg-surface-container transition-colors"
                  >
                    {t.common.cancel}
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-5 py-2 bg-primary text-on-primary rounded text-xs font-bold hover:bg-primary-container transition-colors flex items-center gap-1.5 shadow-sm disabled:opacity-50"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{isSubmitting ? "जमा हो रहा है..." : t.common.submit}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
