"use client";

import Link from "next/link";
import { PLANS, type PlanId } from "@/lib/pricing";

const planOrder: PlanId[] = ["free", "pro", "lifetime"];

const checkIcon = (
  <svg className="w-5 h-5 text-summit shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-surface">
      {/* Header */}
      <header className="bg-midnight">
        <div className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 bg-copper/15 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-copper" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <circle cx="7" cy="17" r="4" />
                <circle cx="17" cy="17" r="4" />
                <path d="M7 17L10 5h4l3 12M10 5l-3 12M14 5l3 12M9 3h6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="font-display text-xl font-bold text-white">VeloSync</span>
          </Link>
          <Link href="/login" className="text-sm text-white/60 hover:text-white transition-colors">
            Sign in
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-midnight pb-32 pt-16 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            Simple pricing,{" "}
            <span className="bg-gradient-to-r from-copper to-sand bg-clip-text text-transparent">
              powerful packing
            </span>
          </h1>
          <p className="text-lg text-white/50 max-w-xl mx-auto">
            Start free. Upgrade when you need AI-powered suggestions, weather data, and collaboration.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="-mt-24 pb-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-6">
            {planOrder.map((planId) => {
              const plan = PLANS[planId];
              const isPopular = planId === "pro";

              return (
                <div
                  key={planId}
                  className={`relative bg-white rounded-2xl p-8 ${
                    isPopular
                      ? "ring-2 ring-copper shadow-xl shadow-copper/10 scale-[1.02]"
                      : "border border-surface-warm shadow-lg shadow-midnight/5"
                  }`}
                >
                  {isPopular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                      <span className="bg-copper text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">
                        Most Popular
                      </span>
                    </div>
                  )}

                  <div className="mb-6">
                    <h3 className="font-display text-lg font-bold text-slate-text mb-1">
                      {plan.name}
                    </h3>
                    <p className="text-sm text-muted">{plan.tagline}</p>
                  </div>

                  <div className="mb-8">
                    <span className="font-display text-5xl font-bold text-slate-text">
                      {plan.price}
                    </span>
                    {plan.priceNote && (
                      <span className="text-muted text-sm ml-1">{plan.priceNote}</span>
                    )}
                  </div>

                  <Link
                    href="/signup"
                    className={`block w-full text-center py-3 px-6 rounded-xl font-semibold text-sm transition-all ${
                      isPopular
                        ? "bg-copper text-white hover:bg-copper-light shadow-md shadow-copper/20"
                        : planId === "lifetime"
                        ? "bg-midnight text-white hover:bg-midnight-light"
                        : "bg-surface text-slate-text hover:bg-surface-warm"
                    }`}
                  >
                    {planId === "free" ? "Get Started Free" : planId === "pro" ? "Start Free Trial" : "Buy Once"}
                  </Link>

                  <ul className="mt-8 space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3 text-sm text-slate-text">
                        {checkIcon}
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white border-t border-surface-warm py-20">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-display text-2xl font-bold text-slate-text text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-8">
            {[
              {
                q: "Can I use VeloSync for free?",
                a: "Yes! The Trailhead plan is free forever. You get 1 bike, 20 gear items, and basic packing lists — enough to try everything out.",
              },
              {
                q: "What does the AI actually do?",
                a: "The Velo Assistant analyzes your gear, trip details, weather forecast, and bike setup to suggest what to pack, flag what you might be forgetting, and recommend lighter alternatives.",
              },
              {
                q: "Is the lifetime plan really one payment?",
                a: "Yes. Pay once, use forever. No recurring charges. You get all the same features as Summit monthly, including future updates.",
              },
              {
                q: "Can I switch plans later?",
                a: "Absolutely. Upgrade, downgrade, or switch to lifetime at any time. Your data stays intact.",
              },
            ].map(({ q, a }) => (
              <div key={q}>
                <h3 className="font-display font-semibold text-slate-text mb-2">{q}</h3>
                <p className="text-sm text-muted leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-midnight py-10 text-center">
        <p className="text-white/30 text-sm">
          &copy; {new Date().getFullYear()} VeloSync &middot; velosync.app
        </p>
      </footer>
    </div>
  );
}
