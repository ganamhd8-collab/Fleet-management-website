"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";
import { siteConfig, isDashboardConfigured, isPhoneConfigured, activeSocial, legalLinks } from "@/config/site";
import Logo from "@/components/ui/Logo";
import LoginLink from "@/components/ui/LoginLink";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-navy-950 text-white border-t border-white/10">
      <div className="container py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-4 space-y-4">
            <Logo tone="light" className="h-[54px] md:h-[62px] w-auto" />
            <p className="max-w-xs text-sm leading-relaxed text-white/70">{t.footer.tagline}</p>
          </div>

          {/* Company */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white/50">
              {t.footer.columns.company}
            </h3>
            <ul className="space-y-2.5 text-sm text-white/80">
              {t.footer.company.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-turquoise transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white/50">
              {t.footer.columns.solutions}
            </h3>
            <ul className="space-y-2.5 text-sm text-white/80">
              {t.footer.solutions.map((label) => (
                <li key={label}>
                  <Link href="/#solutions" className="hover:text-turquoise transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Get Started & Contact */}
          <div className="lg:col-span-3 space-y-5">
            <div className="space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-white/50">
                {t.footer.columns.start}
              </h3>
              <ul className="space-y-2.5 text-sm text-white/80">
                <li>
                  <Link href="/#contact" className="text-turquoise hover:underline underline-offset-4">
                    {t.footer.start.demo}
                  </Link>
                </li>
                {isDashboardConfigured && (
                  <li>
                    <LoginLink className="hover:text-turquoise transition-colors">
                      {t.footer.start.login}
                    </LoginLink>
                  </li>
                )}
              </ul>
            </div>

            <div className="space-y-2 text-xs text-white/60">
              <p className="font-semibold uppercase tracking-wider text-white/50">
                {t.footer.columns.contact}
              </p>
              <p dir="ltr">
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="text-white/85 hover:text-turquoise transition-colors underline underline-offset-4"
                >
                  {siteConfig.contact.email}
                </a>
              </p>
              {isPhoneConfigured && (
                <p dir="ltr">
                  <a
                    href={`tel:${siteConfig.contact.phone.replace(/[^\d+]/g, "")}`}
                    className="hover:text-turquoise transition-colors"
                  >
                    {siteConfig.contact.phone}
                  </a>
                </p>
              )}
              {activeSocial.length > 0 && (
                <div className="flex flex-wrap gap-3 pt-1">
                  {activeSocial.map((s) => (
                    <a
                      key={s.id}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/60 hover:text-turquoise transition-colors"
                    >
                      {s.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Legal Bar */}
        <div className="mt-14 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10 pt-7 text-xs text-white/50">
          <p>
            © {new Date().getFullYear()} {siteConfig.brandName}. {t.footer.rights}
          </p>
          {(legalLinks.privacy || legalLinks.terms) && (
            <div className="flex items-center gap-6">
              {legalLinks.privacy && (
                <Link href={legalLinks.privacy} className="hover:text-white transition-colors">
                  {t.footer.privacy}
                </Link>
              )}
              {legalLinks.terms && (
                <Link href={legalLinks.terms} className="hover:text-white transition-colors">
                  {t.footer.terms}
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}
