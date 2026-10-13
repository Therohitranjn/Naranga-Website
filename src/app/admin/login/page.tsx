"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck, Lock, User, AlertCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        sessionStorage.setItem("naranga_admin_logged_in", "true");
        router.push("/admin");
      } else {
        setError(data.message || "अमान्य यूज़रनेम या पासवर्ड / Authentication failed");
      }
    } catch {
      // Client-side fallback: strictly only WelcomeNaranga and Welcome@2026
      if (username === "WelcomeNaranga" && password === "Welcome@2026") {
        sessionStorage.setItem("naranga_admin_logged_in", "true");
        router.push("/admin");
      } else {
        setError("अमान्य यूज़रनेम या पासवर्ड। कृपया पुनः प्रयास करें।");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="w-full max-w-sm sm:max-w-md space-y-5">
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-primary font-semibold hover:underline mb-3 py-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>मुख्य पृष्ठ पर वापस जाएँ / Back to Home</span>
          </Link>
          <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-on-primary mb-3 shadow-md">
            <ShieldCheck className="w-6 h-6 text-primary-fixed" />
          </div>
          <h1 className="font-headline text-2xl sm:text-3xl font-extrabold text-on-surface tracking-tight">
            ग्राम प्रशासन पोर्टल लॉगिन
          </h1>
          <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
            ग्राम पंचायत नारंगा उत्तरी • अधिकृत प्रशासनिक पटल
          </p>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-error-container text-on-error-container text-xs flex items-center gap-2 animate-in fade-in">
            <AlertCircle className="w-4 h-4 text-error flex-shrink-0" />
            <span className="font-medium">{error}</span>
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="p-5 sm:p-6 rounded-2xl bg-surface-container-lowest shadow-sm border border-surface-container space-y-4"
        >
          <div>
            <label className="block text-xs font-bold text-on-surface mb-1.5">
              प्रशासक यूज़रनेम / Admin Username
            </label>
            <div className="relative">
              <input
                type="text"
                required
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="यूज़रनेम दर्ज करें / Enter username"
                className="w-full pl-10 pr-3 py-2.5 text-xs rounded-xl border border-outline-variant bg-surface-container-lowest focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-gray-400"
              />
              <User className="w-4 h-4 text-outline absolute left-3.5 top-3" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-on-surface mb-1.5">
              पासवर्ड / Secure Password
            </label>
            <div className="relative">
              <input
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-3 py-2.5 text-xs rounded-xl border border-outline-variant bg-surface-container-lowest focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-gray-400"
              />
              <Lock className="w-4 h-4 text-outline absolute left-3.5 top-3" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-primary text-on-primary rounded-xl text-xs font-bold hover:bg-primary-container transition-colors shadow-sm disabled:opacity-50 min-h-[44px] flex items-center justify-center gap-2 mt-2"
          >
            {loading ? (
              <span>सत्यापन हो रहा है...</span>
            ) : (
              <span>लॉगिन करें / Secure Login</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
