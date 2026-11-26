"use client";

import React, { useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import { siteConfig } from "@/config/site";
import Reveal from "@/components/ui/Reveal";
import { IconCheck } from "@/components/ui/Icons";

const countryCodes = [
  { code: "+20", label: "EG +20" },
  { code: "+966", label: "SA +966" },
  { code: "+971", label: "AE +971" },
  { code: "+965", label: "KW +965" },
  { code: "+974", label: "QA +974" },
  { code: "+973", label: "BH +973" },
  { code: "+968", label: "OM +968" },
  { code: "+", label: "+" },
];

type FormState = {
  fullName: string;
  company: string;
  email: string;
  countryCode: string;
  phone: string;
  country: string;
  industry: string;
  fleetSize: string;
  services: string[];
  consent: boolean;
};

const initialState: FormState = {
  fullName: "",
  company: "",
  email: "",
  countryCode: "+20",
  phone: "",
  country: "",
  industry: "",
  fleetSize: "",
  services: [],
  consent: false,
};

export default function BookDemo() {
  const { t, lang } = useLanguage();
  const [honeypot, setHoneypot] = useState("");
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const validate = (): Record<string, string> => {
    const e: Record<string, string> = {};
    if (!form.fullName.trim()) e.fullName = t.demo.errors.required;
    if (!form.company.trim()) e.company = t.demo.errors.required;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) e.email = t.demo.errors.email;
    const digits = form.phone.replace(/[\s\-()]/g, "");
    if (!/^\d{6,14}$/.test(digits)) e.phone = t.demo.errors.phone;
    if (!form.country) e.country = t.demo.errors.required;
    if (!form.industry) e.industry = t.demo.errors.required;
    if (!form.fleetSize) e.fleetSize = t.demo.errors.required;
    if (form.services.length === 0) e.services = t.demo.errors.services;
    if (!form.consent) e.consent = t.demo.errors.consent;
    return e;
  };

  const toggleService = (service: string) => {
    setForm((prev) => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service],
    }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next.services;
      return next;
    });
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    const v = validate();
    setErrors(v);
    if (Object.keys(v).length > 0) return;

    setStatus("submitting");

    // Never show "success" when the request wasn't actually sent anywhere.
    if (!siteConfig.demoEndpoint) {
      console.error("Demo form: NEXT_PUBLIC_DEMO_ENDPOINT is not set, so the request was not sent.");
      setStatus("error");
      return;
    }

    try {
      // Sent as text/plain (no custom headers) so the browser makes a "simple"
      // request — Google Apps Script web apps don't answer CORS preflights.
      const res = await fetch(siteConfig.demoEndpoint, {
        method: "POST",
        body: JSON.stringify({
          ...form,
          website: honeypot,
          lang,
          page: window.location.href,
        }),
      });
      if (!res.ok) throw new Error("Request failed");
      const data = await res.json().catch(() => null);
      if (data && data.ok === false) throw new Error(data.error || "Request rejected");
    } catch (err) {
      console.error("Demo form submission failed:", err);
      setStatus("error");
      return;
    }
    setStatus("success");
  };

  const setField = (key: keyof FormState, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  return (
    <section id="contact" className="section bg-royal text-white">
      <div className="container grid items-start gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-5 space-y-6">
          <h2 className="text-h2 font-bold text-white">{t.demo.headline}</h2>
          <p className="text-lead text-white/80 max-w-prose">{t.demo.description}</p>

          {/* Direct Contact Info Card */}
          <div className="pt-2">
            <div className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-sm space-y-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-turquoise">
                {t.demo.contactGroup}
              </p>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="group inline-flex items-center gap-3 text-sm sm:text-base font-medium text-white hover:text-turquoise transition-colors"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-turquoise/15 text-turquoise border border-turquoise/30 group-hover:bg-turquoise group-hover:text-navy transition-colors">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.75}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                    aria-hidden="true"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </span>
                <span dir="ltr" className="underline underline-offset-4">
                  {siteConfig.contact.email}
                </span>
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal delay={100} className="lg:col-span-7">
          <div className="rounded-panel bg-white p-6 sm:p-9 text-ink shadow-lift">
            {status === "success" ? (
              <div role="status" className="py-10 text-center space-y-4">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-mint/25 text-navy">
                  <IconCheck className="h-7 w-7" />
                </div>
                <h3 className="text-h3 font-bold text-ink">{t.demo.success.title}</h3>
                <p className="mx-auto max-w-md text-base leading-relaxed text-ink-muted">
                  {t.demo.success.text}
                </p>
                <div className="pt-3">
                  <button
                    type="button"
                    onClick={() => {
                      setForm(initialState);
                      setErrors({});
                      setStatus("idle");
                    }}
                    className="btn-ghost-dark"
                  >
                    {t.demo.success.again}
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-7">
                {/* Spam trap: hidden from people, bots tend to fill it in. */}
                <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
                  <label>
                    Website
                    <input
                      type="text"
                      name="website"
                      tabIndex={-1}
                      autoComplete="off"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                    />
                  </label>
                </div>

                {Object.keys(errors).length > 0 && (
                  <p role="alert" className="rounded-xl bg-danger/10 px-4 py-3 text-sm font-medium text-danger">
                    {t.demo.errors.summary}
                  </p>
                )}

                {status === "error" && (
                  <p role="alert" className="rounded-xl bg-danger/10 px-4 py-3 text-sm font-medium text-danger">
                    {t.demo.errors.network}
                  </p>
                )}

                {/* Contact Information */}
                <fieldset className="space-y-4">
                  <legend className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
                    {t.demo.contactGroup}
                  </legend>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="demo-name" className="mb-1.5 block text-sm font-medium text-ink">
                        {t.demo.fields.fullName}
                      </label>
                      <input
                        id="demo-name"
                        type="text"
                        autoComplete="name"
                        value={form.fullName}
                        onChange={(e) => setField("fullName", e.target.value)}
                        aria-invalid={Boolean(errors.fullName)}
                        className="field"
                      />
                      {errors.fullName && <p className="mt-1 text-xs text-danger">{errors.fullName}</p>}
                    </div>

                    <div>
                      <label htmlFor="demo-company" className="mb-1.5 block text-sm font-medium text-ink">
                        {t.demo.fields.company}
                      </label>
                      <input
                        id="demo-company"
                        type="text"
                        autoComplete="organization"
                        value={form.company}
                        onChange={(e) => setField("company", e.target.value)}
                        aria-invalid={Boolean(errors.company)}
                        className="field"
                      />
                      {errors.company && <p className="mt-1 text-xs text-danger">{errors.company}</p>}
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="demo-email" className="mb-1.5 block text-sm font-medium text-ink">
                        {t.demo.fields.email}
                      </label>
                      <input
                        id="demo-email"
                        type="email"
                        autoComplete="email"
                        dir="ltr"
                        value={form.email}
                        onChange={(e) => setField("email", e.target.value)}
                        aria-invalid={Boolean(errors.email)}
                        className="field"
                      />
                      {errors.email && <p className="mt-1 text-xs text-danger">{errors.email}</p>}
                    </div>

                    <div>
                      <label htmlFor="demo-phone" className="mb-1.5 block text-sm font-medium text-ink">
                        {t.demo.fields.phone}
                      </label>
                      <div className="flex gap-2" dir="ltr">
                        <select
                          aria-label={t.demo.fields.countryCode}
                          value={form.countryCode}
                          onChange={(e) => setField("countryCode", e.target.value)}
                          className="field !w-28 shrink-0 !px-2.5 text-sm"
                        >
                          {countryCodes.map((c) => (
                            <option key={c.code} value={c.code}>
                              {c.label}
                            </option>
                          ))}
                        </select>
                        <input
                          id="demo-phone"
                          type="tel"
                          autoComplete="tel-national"
                          value={form.phone}
                          onChange={(e) => setField("phone", e.target.value)}
                          aria-invalid={Boolean(errors.phone)}
                          className="field"
                        />
                      </div>
                      {errors.phone && <p className="mt-1 text-xs text-danger">{errors.phone}</p>}
                    </div>
                  </div>
                </fieldset>

                {/* Business Information */}
                <fieldset className="space-y-4 border-t border-line pt-6">
                  <legend className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
                    {t.demo.businessGroup}
                  </legend>

                  <div className="grid gap-4 sm:grid-cols-3">
                    <div>
                      <label htmlFor="demo-country" className="mb-1.5 block text-sm font-medium text-ink">
                        {t.demo.fields.country}
                      </label>
                      <select
                        id="demo-country"
                        value={form.country}
                        onChange={(e) => setField("country", e.target.value)}
                        aria-invalid={Boolean(errors.country)}
                        className="field"
                      >
                        <option value="">{t.demo.fields.select}</option>
                        {t.demo.countries.map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                      {errors.country && <p className="mt-1 text-xs text-danger">{errors.country}</p>}
                    </div>

                    <div>
                      <label htmlFor="demo-industry" className="mb-1.5 block text-sm font-medium text-ink">
                        {t.demo.fields.industry}
                      </label>
                      <select
                        id="demo-industry"
                        value={form.industry}
                        onChange={(e) => setField("industry", e.target.value)}
                        aria-invalid={Boolean(errors.industry)}
                        className="field"
                      >
                        <option value="">{t.demo.fields.select}</option>
                        {t.demo.industries.map((ind) => (
                          <option key={ind} value={ind}>{ind}</option>
                        ))}
                      </select>
                      {errors.industry && <p className="mt-1 text-xs text-danger">{errors.industry}</p>}
                    </div>

                    <div>
                      <label htmlFor="demo-size" className="mb-1.5 block text-sm font-medium text-ink">
                        {t.demo.fields.fleetSize}
                      </label>
                      <select
                        id="demo-size"
                        value={form.fleetSize}
                        onChange={(e) => setField("fleetSize", e.target.value)}
                        aria-invalid={Boolean(errors.fleetSize)}
                        className="field"
                      >
                        <option value="">{t.demo.fields.select}</option>
                        {t.demo.fleetSizes.map((sz) => (
                          <option key={sz} value={sz}>{sz}</option>
                        ))}
                      </select>
                      {errors.fleetSize && <p className="mt-1 text-xs text-danger">{errors.fleetSize}</p>}
                    </div>
                  </div>

                  {/* Services of Interest */}
                  <div>
                    <div className="mb-2 flex items-baseline justify-between gap-2">
                      <span className="text-sm font-medium text-ink">{t.demo.fields.services}</span>
                      <span className="text-xs text-ink-muted">{t.demo.fields.servicesHint}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {t.demo.services.map((srv) => {
                        const checked = form.services.includes(srv);
                        return (
                          <button
                            key={srv}
                            type="button"
                            onClick={() => toggleService(srv)}
                            aria-pressed={checked}
                            className={`min-h-[40px] rounded-full border px-4 text-xs font-medium transition-colors ${
                              checked
                                ? "border-ocean bg-ocean-strong text-white"
                                : "border-line bg-offwhite text-ink hover:border-ocean"
                            }`}
                          >
                            {srv}
                          </button>
                        );
                      })}
                    </div>
                    {errors.services && <p className="mt-1.5 text-xs text-danger">{errors.services}</p>}
                  </div>
                </fieldset>

                {/* Consent */}
                <div>
                  <label className="flex items-start gap-3 text-xs leading-relaxed text-ink-muted cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.consent}
                      onChange={(e) => setField("consent", e.target.checked)}
                      className="mt-0.5 h-4 w-4 rounded border-line text-ocean-strong focus:ring-ocean"
                    />
                    <span>{t.demo.fields.consent}</span>
                  </label>
                  {errors.consent && <p className="mt-1 text-xs text-danger">{errors.consent}</p>}
                </div>

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="btn-primary w-full justify-center disabled:opacity-60"
                >
                  {status === "submitting" ? t.demo.sending : t.demo.cta}
                </button>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
