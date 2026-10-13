"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  ShieldCheck, 
  LogOut, 
  FileText, 
  Check, 
  X, 
  Clock, 
  Database, 
  Users, 
  Landmark, 
  PlusCircle, 
  RefreshCw 
} from "lucide-react";

interface Submission {
  id: string;
  type: string;
  submitterName: string;
  contact?: string | null;
  content: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"submissions" | "notices" | "records">("submissions");
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [newNotice, setNewNotice] = useState({ title: "", content: "", authority: "मुखिया कार्यालय" });
  const [noticePublished, setNoticePublished] = useState(false);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/submissions");
      const data = await res.json();
      if (data.success) {
        setSubmissions(data.data);
      }
    } catch {
      // Local storage fallback
      const saved = JSON.parse(localStorage.getItem("naranga_submissions") || "[]");
      setSubmissions(saved);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: "approved" | "rejected") => {
    try {
      await fetch("/api/submissions", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      fetchSubmissions();
    } catch {
      setSubmissions((prev) =>
        prev.map((s) => (s.id === id ? { ...s, status } : s))
      );
    }
  };

  const handleLogout = async () => {
    await fetch("/api/auth/login", { method: "DELETE" });
    sessionStorage.removeItem("naranga_admin_logged_in");
    router.push("/admin/login");
  };

  const handlePublishNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNotice.title || !newNotice.content) return;
    setNoticePublished(true);
    setTimeout(() => {
      setNoticePublished(false);
      setNewNotice({ title: "", content: "", authority: "मुखिया कार्यालय" });
    }, 3000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Top Admin Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-surface-container gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary text-on-primary flex items-center justify-center shadow-md">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-headline text-xl sm:text-2xl font-bold text-on-surface">
              ग्राम पंचायत प्रशासन डैशबोर्ड
            </h1>
            <p className="text-xs text-on-surface-variant">
              Naranga Uttari Administrative Management & Moderation Queue
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={fetchSubmissions}
            className="px-3 py-1.5 rounded bg-surface-container text-xs font-semibold hover:bg-surface-container-high transition-colors flex items-center gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>रिफ्रेश</span>
          </button>
          <button
            onClick={handleLogout}
            className="px-3.5 py-1.5 rounded bg-error-container text-on-error-container text-xs font-bold hover:bg-error/20 transition-colors flex items-center gap-1.5"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>लॉगआउट</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-surface-container mb-6 overflow-x-auto">
        <button
          onClick={() => setActiveTab("submissions")}
          className={`px-4 py-2 text-xs font-bold border-b-2 transition-all flex items-center gap-2 ${
            activeTab === "submissions"
              ? "border-primary text-primary"
              : "border-transparent text-secondary hover:text-on-surface"
          }`}
        >
          <Users className="w-4 h-4" />
          <span>नागरिक प्रविष्टियां मॉडरेटर कतार ({submissions.length})</span>
        </button>
        <button
          onClick={() => setActiveTab("notices")}
          className={`px-4 py-2 text-xs font-bold border-b-2 transition-all flex items-center gap-2 ${
            activeTab === "notices"
              ? "border-primary text-primary"
              : "border-transparent text-secondary hover:text-on-surface"
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>सूचना प्रकाशन</span>
        </button>
        <button
          onClick={() => setActiveTab("records")}
          className={`px-4 py-2 text-xs font-bold border-b-2 transition-all flex items-center gap-2 ${
            activeTab === "records"
              ? "border-primary text-primary"
              : "border-transparent text-secondary hover:text-on-surface"
          }`}
        >
          <Database className="w-4 h-4" />
          <span>सत्यापित अभिलेख स्थिति</span>
        </button>
      </div>

      {/* TAB 1: SUBMISSIONS MODERATION */}
      {activeTab === "submissions" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-headline text-base font-bold text-on-surface">
              सामुदायिक सुझाव व प्रविष्टियाँ
            </h2>
            <span className="text-xs text-secondary">
              लंबित प्रविष्टियों की समीक्षा करें और स्वीकृत/अस्वीकृत करें
            </span>
          </div>

          {loading ? (
            <div className="p-12 text-center text-xs text-secondary">
              डेटा लोड हो रहा है...
            </div>
          ) : submissions.length === 0 ? (
            <div className="p-12 text-center rounded-2xl bg-surface-container-lowest border border-surface-container text-xs text-secondary">
              कोई नई नागरिक प्रविष्टि उपलब्ध नहीं है।
            </div>
          ) : (
            <div className="space-y-3">
              {submissions.map((sub) => (
                <div
                  key={sub.id}
                  className="p-5 rounded-2xl bg-surface-container-lowest shadow-sm border border-surface-container flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-1 max-w-2xl">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-surface-container text-primary text-[10px] font-bold uppercase">
                        {sub.type}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          sub.status === "approved"
                            ? "bg-emerald-100 text-emerald-800"
                            : sub.status === "rejected"
                            ? "bg-rose-100 text-rose-800"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {sub.status === "approved"
                          ? "स्वीकृत (Approved)"
                          : sub.status === "rejected"
                          ? "अस्वीकृत (Rejected)"
                          : "लंबित (Pending Review)"}
                      </span>
                      <span className="text-[11px] text-outline flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {new Date(sub.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    <h3 className="font-headline text-sm font-bold text-on-surface">
                      प्रस्तोता: {sub.submitterName} {sub.contact && `(${sub.contact})`}
                    </h3>
                    <p className="text-xs text-on-surface-variant leading-relaxed">
                      {sub.content}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() => updateStatus(sub.id, "approved")}
                      className="px-3 py-1.5 rounded bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors flex items-center gap-1 shadow-sm"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>स्वीकार करें</span>
                    </button>
                    <button
                      onClick={() => updateStatus(sub.id, "rejected")}
                      className="px-3 py-1.5 rounded bg-surface-container text-rose-700 hover:bg-rose-100 text-xs font-bold transition-colors flex items-center gap-1"
                    >
                      <X className="w-3.5 h-3.5" />
                      <span>अस्वीकार</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: PUBLISH NOTICE */}
      {activeTab === "notices" && (
        <div className="p-6 rounded-2xl bg-surface-container-lowest shadow-sm border border-surface-container max-w-2xl">
          <h2 className="font-headline text-base font-bold text-on-surface mb-3">
            नया आधिकारिक सूचना पटल जारी करें
          </h2>
          {noticePublished && (
            <div className="p-3 mb-4 rounded-lg bg-emerald-100 text-emerald-800 text-xs font-semibold flex items-center gap-2">
              <Check className="w-4 h-4" />
              <span>सूचना सफलतापूर्वक प्रकाशित कर दी गई!</span>
            </div>
          )}
          <form onSubmit={handlePublishNotice} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-on-surface mb-1">
                विज्ञप्ति शीर्षक / Notice Title *
              </label>
              <input
                type="text"
                required
                value={newNotice.title}
                onChange={(e) => setNewNotice({ ...newNotice, title: e.target.value })}
                placeholder="उदा. ग्राम सभा की विशेष बैठक 25 अक्टूबर 2026"
                className="w-full px-3 py-2 rounded border border-outline-variant bg-surface-container-lowest outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="block font-semibold text-on-surface mb-1">
                जारीकर्ता प्राधिकारी / Issuing Authority
              </label>
              <input
                type="text"
                value={newNotice.authority}
                onChange={(e) => setNewNotice({ ...newNotice, authority: e.target.value })}
                className="w-full px-3 py-2 rounded border border-outline-variant bg-surface-container-lowest outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="block font-semibold text-on-surface mb-1">
                विस्तृत सूचना / Full Announcement Content *
              </label>
              <textarea
                rows={4}
                required
                value={newNotice.content}
                onChange={(e) => setNewNotice({ ...newNotice, content: e.target.value })}
                placeholder="स्थान, समय, एजेंडा एवं आवश्यक दिशा-निर्देश..."
                className="w-full px-3 py-2 rounded border border-outline-variant bg-surface-container-lowest outline-none focus:border-primary"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 bg-primary text-on-primary rounded font-bold hover:bg-primary-container transition-colors inline-flex items-center gap-2 shadow-sm"
            >
              <PlusCircle className="w-4 h-4" />
              <span>सूचना प्रकाशित करें</span>
            </button>
          </form>
        </div>
      )}

      {/* TAB 3: RECORDS STATUS */}
      {activeTab === "records" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-surface-container-lowest border border-surface-container">
              <span className="text-secondary text-xs">जनगणना सांख्यिकी स्थिति</span>
              <div className="font-headline text-lg font-bold text-primary mt-1">Census 2011 Verified</div>
              <p className="text-[11px] text-outline mt-1">जनसंख्या 25,366 | 5,591 परिवार</p>
            </div>
            <div className="p-4 rounded-xl bg-surface-container-lowest border border-surface-container">
              <span className="text-secondary text-xs">पंचायत प्रतिनिधि स्थिति</span>
              <div className="font-headline text-lg font-bold text-amber-700 mt-1">Provisional Listing</div>
              <p className="text-[11px] text-outline mt-1">मुखिया: भारत भूषण (गज़ट पुष्टि प्रतीक्षित)</p>
            </div>
            <div className="p-4 rounded-xl bg-surface-container-lowest border border-surface-container">
              <span className="text-secondary text-xs">कृषि अभिलेख स्थिति</span>
              <div className="font-headline text-lg font-bold text-primary mt-1">1,397 Ha Sown</div>
              <p className="text-[11px] text-outline mt-1">जिला सांख्यिकी हस्तपुस्तिका</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
