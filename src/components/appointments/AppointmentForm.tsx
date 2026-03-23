"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

interface Slot { date: string; maxSlots: number; open: boolean; }

interface Props {
  type: "laity" | "clergy";
  locale: string;
  availableSlots: Slot[];
}

export default function AppointmentForm({ type, availableSlots }: Props) {
  const t = useTranslations("appointments");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [form, setForm] = useState({
    name: "", phone: "", email: "", purpose: "", date: "",
  });

  const openDates = availableSlots
    .filter((s) => s.open)
    .map((s) => s.date);

  const isDateAvailable = (d: string) => openDates.length === 0 || openDates.includes(d);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, type }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      setForm({ name: "", phone: "", email: "", purpose: "", date: "" });
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="text-center py-10">
        <div className="w-12 h-12 border border-gold rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-gold text-xl">✓</span>
        </div>
        <p className="text-sm text-cream/70 leading-relaxed">{t("success")}</p>
      </div>
    );
  }

  const inputCls = "w-full bg-navy border border-gold/15 text-cream text-sm px-4 py-3 rounded-none outline-none focus:border-gold/50 transition-colors placeholder:text-cream/20 font-body";
  const labelCls = "block text-[10px] uppercase tracking-widest text-cream/50 mb-2";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className={labelCls}>{t("name")}</label>
        <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Full Name" className={inputCls} />
      </div>
      <div>
        <label className={labelCls}>{t("phone")}</label>
        <input type="tel" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
          placeholder="+234…" className={inputCls} />
      </div>
      <div>
        <label className={labelCls}>{t("email")}</label>
        <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder="you@example.com" className={inputCls} />
      </div>
      <div>
        <label className={labelCls}>{t("purpose")}</label>
        <textarea required rows={3} value={form.purpose} onChange={(e) => setForm({ ...form, purpose: e.target.value })}
          placeholder="Brief purpose of visit…" className={cn(inputCls, "resize-none")} />
      </div>
      <div>
        <label className={labelCls}>{t("date")}</label>
        <input type="date" required value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })}
          className={inputCls} />
        {openDates.length > 0 && !isDateAvailable(form.date) && form.date && (
          <p className="text-[10px] text-amber-400 mt-1">This date may not be available. Please check.</p>
        )}
      </div>

      {status === "error" && (
        <p className="text-xs text-red-400">{t("error")}</p>
      )}

      <button type="submit" disabled={status === "loading"}
        className="w-full border border-gold text-gold text-[11px] uppercase tracking-widest py-4 hover:bg-gold hover:text-navy transition-all duration-300 disabled:opacity-50">
        {status === "loading" ? "…" : t("submit")}
      </button>
    </form>
  );
}
