"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

export default function ContactForm({ locale: _locale }: { locale: string }) {
  const t = useTranslations("contact");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="card-surface p-10 text-center">
        <div className="w-12 h-12 border border-gold rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-gold text-xl">✓</span>
        </div>
        <p className="text-sm text-navy/70">{t("success")}</p>
      </div>
    );
  }

  const inputCls = "w-full bg-white border border-gold/30 text-navy text-sm px-4 py-3 outline-none focus:border-gold/60 transition-colors placeholder:text-navy/30 font-body";
  const labelCls = "block text-[10px] uppercase tracking-widest text-navy/50 mb-2";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className={labelCls}>{t("name")}</label>
          <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Your Name" className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>{t("yourEmail")}</label>
          <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="you@example.com" className={inputCls} />
        </div>
      </div>
      <div>
        <label className={labelCls}>{t("message")}</label>
        <textarea required rows={6} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
          placeholder="Your message…" className={cn(inputCls, "resize-none")} />
      </div>
      {status === "error" && <p className="text-xs text-red-400">Something went wrong. Please try again.</p>}
      <button type="submit" disabled={status === "loading"}
        className="border border-gold text-gold text-[11px] uppercase tracking-widest px-10 py-4 hover:bg-gold hover:text-navy transition-all duration-300 disabled:opacity-50">
        {status === "loading" ? "…" : t("send")}
      </button>
    </form>
  );
}
