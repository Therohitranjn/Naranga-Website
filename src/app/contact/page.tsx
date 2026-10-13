"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
  const { locale } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    type: "inquiry",
    subject: "",
    message: "",
    consent: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.message || !formData.consent) {
      alert("कृपया सभी आवश्यक फ़ील्ड भरें / Please fill all required fields");
      return;
    }
    setSubmitting(true);
    try {
      await fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: formData.type,
          submitterName: formData.name,
          contact: formData.contact,
          content: `${formData.subject ? `[${formData.subject}] ` : ""}${formData.message}`,
          consent: formData.consent,
        }),
      });
      setSubmitted(true);
    } catch {
      // Local fallback
      const existing = JSON.parse(localStorage.getItem("naranga_submissions") || "[]");
      existing.push({
        id: Date.now(),
        type: formData.type,
        submitterName: formData.name,
        contact: formData.contact,
        content: formData.message,
        date: new Date().toISOString(),
      });
      localStorage.setItem("naranga_submissions", JSON.stringify(existing));
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      <div className="mb-10 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-surface-container text-primary text-xs font-bold mb-3 border border-surface-container-high">
          <Mail className="w-3.5 h-3.5" />
          <span>{locale === "hi" ? "नागरिक सहायता एवं संपर्क" : "Citizen Assistance & Contact"}</span>
        </div>
        <h1 className="font-headline text-3xl sm:text-4xl font-extrabold text-on-surface">
          {locale === "hi" ? "संपर्क एवं सूचना प्रेषण" : "Contact & Community Submissions"}
        </h1>
        <p className="text-sm text-on-surface-variant mt-2">
          Grievance Redressal, Village Inquiries & Authentic Community Submissions
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Contact Info Sidebar */}
        <div className="space-y-4 md:col-span-1">
          <div className="p-6 rounded-2xl bg-surface-container-lowest shadow-sm border border-surface-container">
            <h2 className="font-headline text-base font-bold text-on-surface mb-4">
              प्रशासनिक संपर्क सूत्र
            </h2>
            <div className="space-y-4 text-xs text-on-surface-variant">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-on-surface block">पंचायत कार्यालय:</strong>
                  ग्राम पंचायत नारंगा उत्तरी, प्रखंड परिहार, जिला सीतामढ़ी, बिहार (पिन 843324)
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-on-surface block">हेल्पलाइन:</strong>
                  किसान कॉल सेंटर: 1551<br />
                  आपातकालीन चिकित्सा: 108 / 102
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-on-surface block">डिजिटल पोर्टल टीम:</strong>
                  naranga.portal@sitamarhi.gov (नागरिक सहायता)
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Submission Form */}
        <div className="md:col-span-2">
          <div className="p-6 sm:p-8 rounded-2xl bg-surface-container-lowest shadow-sm border border-surface-container">
            {submitted ? (
              <div className="text-center py-12">
                <CheckCircle2 className="w-16 h-16 text-emerald-600 mx-auto mb-4" />
                <h3 className="font-headline text-2xl font-bold text-on-surface">
                  संदेश सफलतापूर्वक प्राप्त हुआ!
                </h3>
                <p className="text-xs sm:text-sm text-on-surface-variant max-w-md mx-auto mt-2 leading-relaxed">
                  आपकी सूचना/शिकायत हमारे प्रशासनिक रिकॉर्ड में दर्ज कर ली गई है। सत्यापन उपरांत त्वरित कार्यवाही सुनिश्चित की जाएगी।
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 px-6 py-2.5 bg-primary text-on-primary rounded text-xs font-bold hover:bg-primary-container transition-colors"
                >
                  दूसरा संदेश भेजें
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="border-b border-surface-container pb-3">
                  <h3 className="font-headline text-lg font-bold text-on-surface">
                    नागरिक संदेश प्रेषण प्रपत्र
                  </h3>
                  <p className="text-xs text-secondary mt-0.5">
                    गाँव से संबंधित शिकायत, सूचना सुधार या नई प्रविष्टि भेजें।
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-on-surface mb-1">
                      आपका नाम / Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="उदा. अमित कुमार"
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
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-on-surface mb-1">
                      श्रेणी / Category
                    </label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded border border-outline-variant bg-surface-container-lowest focus:border-primary outline-none"
                    >
                      <option value="inquiry">सामान्य पूछताछ (General Inquiry)</option>
                      <option value="correction">डेटा सुधार (Data Correction)</option>
                      <option value="business">नया व्यापार सुझाव (Suggest Business)</option>
                      <option value="photo">गाँव की तस्वीर (Photo Submission)</option>
                      <option value="nomination">प्रेरक व्यक्ति नामांकन (Nomination)</option>
                      <option value="grievance">नागरिक शिकायत (Grievance)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-on-surface mb-1">
                      विषय / Subject
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="उदा. वार्ड 5 नल-जल सुधार"
                      className="w-full px-3 py-2 text-xs rounded border border-outline-variant bg-surface-container-lowest focus:border-primary outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-on-surface mb-1">
                    विस्तृत संदेश / Detailed Message *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="कृपया अपनी बात स्पष्ट रूप से लिखें..."
                    className="w-full px-3 py-2 text-xs rounded border border-outline-variant bg-surface-container-lowest focus:border-primary outline-none"
                  />
                </div>

                <div className="flex items-start gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="consent"
                    required
                    checked={formData.consent}
                    onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                    className="mt-0.5 rounded text-primary focus:ring-primary w-4 h-4 cursor-pointer"
                  />
                  <label htmlFor="consent" className="text-[11px] text-on-surface-variant leading-tight cursor-pointer">
                    मैं सहमति देता/देती हूँ कि यह जानकारी सत्य है और प्रशासनिक समीक्षा हेतु उपयुक्त है।
                  </label>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-6 py-2.5 bg-primary text-on-primary rounded text-xs font-bold hover:bg-primary-container transition-colors inline-flex items-center gap-2 shadow-sm disabled:opacity-50"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{submitting ? "भेजा जा रहा है..." : "संदेश भेजें / Submit"}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
