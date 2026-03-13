import Link from "next/link";
import Image from "next/image";

const FEATURES = [
  {
    title: "Gear Inventory",
    description:
      "Catalog every piece of gear with weight, dimensions, condition, and photos. Know exactly what you own.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" />
        <line x1="7" y1="7" x2="7.01" y2="7" />
      </svg>
    ),
    accent: "copper",
    image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=600&h=400&fit=crop&q=80",
    imageAlt: "Road cyclist in competitive race",
  },
  {
    title: "Bike Garage",
    description:
      "Register your bikes, define bag slots, and see exactly how much capacity you have for each setup.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="5.5" cy="17.5" r="3.5" />
        <circle cx="18.5" cy="17.5" r="3.5" />
        <path d="M15 6a1 1 0 100-2 1 1 0 000 2zm-3 11.5V14l-3-3 4-3 2 3h2" />
      </svg>
    ),
    accent: "steel",
    image: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=600&h=400&fit=crop&q=80",
    imageAlt: "Touring bicycle fully loaded for adventure",
  },
  {
    title: "Smart Packing",
    description:
      "AI-powered packing suggestions based on your trip conditions. Never forget essentials or overpack again.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 11l3 3L22 4" />
        <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
      </svg>
    ),
    accent: "summit",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&h=400&fit=crop&q=80",
    imageAlt: "Dramatic mountain peaks at golden hour",
  },
  {
    title: "Collaborate",
    description:
      "Share trips with riding partners. Divvy up shared gear so nobody doubles up on the stove or the pump.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4-4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87" />
        <path d="M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
    accent: "sand",
    image: "https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=600&h=400&fit=crop&q=80",
    imageAlt: "Group of cyclists riding together through countryside",
  },
];

const ACCENT_STYLES: Record<string, { bg: string; text: string; border: string }> = {
  copper: { bg: "bg-copper/10", text: "text-copper", border: "border-copper/20" },
  steel: { bg: "bg-steel/10", text: "text-steel", border: "border-steel/20" },
  summit: { bg: "bg-summit/10", text: "text-summit", border: "border-summit/20" },
  sand: { bg: "bg-sand/10", text: "text-sand", border: "border-sand/20" },
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-surface">
      {/* Nav */}
      <nav className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 py-5 max-w-6xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 backdrop-blur-sm border border-white/10">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C8553D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="5.5" cy="17.5" r="3.5" />
              <circle cx="18.5" cy="17.5" r="3.5" />
              <path d="M15 6a1 1 0 100-2 1 1 0 000 2zm-3 11.5V14l-3-3 4-3 2 3h2" />
            </svg>
          </div>
          <span className="text-xl font-display font-bold text-white tracking-tight">
            VeloSync
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="text-sm font-medium text-white/60 hover:text-white transition-colors"
          >
            Log in
          </Link>
          <Link
            href="/signup"
            className="rounded-lg bg-copper px-4 py-2 text-sm font-medium text-white hover:bg-copper-light transition-colors shadow-lg shadow-copper/20"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero — full-width image with overlay */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1534787238916-9ba6764efd4f?w=1920&h=1080&fit=crop&q=85"
            alt="Cyclist riding through dramatic mountain landscape"
            className="h-full w-full object-cover"
          />
          {/* Dark overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-midnight/90 via-midnight/75 to-midnight/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-midnight via-transparent to-midnight/40" />
          {/* Copper accent glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_15%_50%,rgba(200,85,61,0.08),transparent)]" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 py-32 w-full">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm px-4 py-1.5 mb-8">
              <span className="h-1.5 w-1.5 rounded-full bg-copper animate-pulse" />
              <span className="text-xs font-medium text-white/60 tracking-wide uppercase">AI-powered gear management</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-display font-extrabold text-white tracking-tight leading-[1.05]">
              Pack lighter.
              <br />
              <span className="bg-gradient-to-r from-copper via-copper-light to-sand bg-clip-text text-transparent">
                Ride further.
              </span>
            </h1>
            <p className="mt-7 text-lg md:text-xl text-white/55 max-w-lg leading-relaxed">
              The gear management app for bikepackers. Track every gram, organize
              your bikes, and get AI-powered packing lists tailored to your trip.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-start gap-4">
              <Link
                href="/signup"
                className="group rounded-xl bg-copper px-8 py-3.5 text-base font-semibold text-white hover:bg-copper-light transition-all shadow-lg shadow-copper/20 hover:shadow-copper/30"
              >
                Get Started Free
                <span className="inline-block ml-2 transition-transform group-hover:translate-x-0.5">&rarr;</span>
              </Link>
              <a
                href="#features"
                className="rounded-xl border border-white/15 px-8 py-3.5 text-base font-semibold text-white/80 hover:text-white hover:bg-white/5 hover:border-white/25 transition-all backdrop-blur-sm"
              >
                Learn More
              </a>
            </div>
          </div>

          {/* Weight counter motif — bottom right */}
          <div className="hidden lg:flex absolute bottom-16 right-8 items-center gap-8 text-white/30">
            <div className="text-center">
              <div className="text-2xl font-display font-bold text-white/40">0g</div>
              <div className="text-[10px] uppercase tracking-widest mt-1">wasted</div>
            </div>
            <div className="h-8 w-px bg-white/10" />
            <div className="text-center">
              <div className="text-2xl font-display font-bold text-white/40">&infin;</div>
              <div className="text-[10px] uppercase tracking-widest mt-1">miles</div>
            </div>
            <div className="h-8 w-px bg-white/10" />
            <div className="text-center">
              <div className="text-2xl font-display font-bold text-white/40">1</div>
              <div className="text-[10px] uppercase tracking-widest mt-1">app</div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10">
          <div className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1.5">
            <div className="w-1 h-2 rounded-full bg-white/40 animate-bounce" />
          </div>
        </div>
      </section>

      {/* Cinematic photo strip — mountain riding */}
      <section className="relative -mt-1 overflow-hidden bg-midnight">
        <div className="flex gap-[2px]">
          <div className="flex-1 h-56 md:h-80 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1534787238916-9ba6764efd4f?w=1200&h=600&fit=crop&crop=bottom&q=85"
              alt="Cyclist riding through mountain road with dramatic scenery"
              className="h-full w-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-500"
            />
          </div>
          <div className="flex-1 h-56 md:h-80 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&h=600&fit=crop&q=85"
              alt="Dramatic mountain peaks and valleys"
              className="h-full w-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-500"
            />
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="max-w-6xl mx-auto px-6 py-20 md:py-28">
        <div className="text-center mb-16">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-copper mb-4">Features</p>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-text">
            Everything you need to pack smart
          </h2>
          <p className="mt-4 text-lg text-muted max-w-2xl mx-auto">
            From tracking individual gram weights to planning multi-day trips
            with friends, VeloSync handles it all.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {FEATURES.map((feature) => {
            const style = ACCENT_STYLES[feature.accent];
            return (
              <div
                key={feature.title}
                className="group rounded-2xl border border-surface-warm bg-white overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-midnight/8"
              >
                {/* Feature image */}
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={feature.image}
                    alt={feature.imageAlt}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className={`absolute top-4 left-4 flex h-10 w-10 items-center justify-center rounded-xl ${style.bg} ${style.text} backdrop-blur-sm border ${style.border}`}>
                    {feature.icon}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-display font-semibold text-slate-text">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-surface-warm/50 border-y border-surface-warm">
        <div className="max-w-6xl mx-auto px-6 py-20 md:py-28">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-steel mb-4">How it works</p>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-text">
              Three steps to lighter packing
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {[
              {
                step: "01",
                title: "Add your gear",
                description: "Log every item you own — weight, dimensions, photos. VeloSync builds your complete inventory.",
                color: "text-copper",
              },
              {
                step: "02",
                title: "Set up your bike",
                description: "Configure your bags and capacity. See exactly how much space you have for each ride.",
                color: "text-steel",
              },
              {
                step: "03",
                title: "Pack with AI",
                description: "Tell us where you're going. Our AI suggests the perfect loadout based on conditions and your gear.",
                color: "text-summit",
              },
            ].map((item) => (
              <div key={item.step} className="text-center md:text-left">
                <div className={`text-5xl font-display font-extrabold ${item.color} opacity-30 mb-4`}>
                  {item.step}
                </div>
                <h3 className="text-lg font-display font-semibold text-slate-text mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA — with background image */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1530143584546-02191bc84eb5?w=1920&h=600&fit=crop&q=80"
            alt="Open road through mountain valley"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-midnight/85" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(200,85,61,0.12),transparent)]" />
        </div>
        <div className="relative max-w-4xl mx-auto px-6 py-24 text-center">
          <h2 className="text-2xl md:text-4xl font-display font-bold text-white">
            Ready to sync your setup?
          </h2>
          <p className="mt-4 text-white/50 text-lg max-w-lg mx-auto">
            Join bikepackers who pack smarter, not heavier.
          </p>
          <Link
            href="/signup"
            className="mt-10 inline-block rounded-xl bg-copper px-8 py-3.5 text-base font-semibold text-white hover:bg-copper-light transition-colors shadow-lg shadow-copper/20"
          >
            Create Your Free Account
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-midnight">
        <div className="max-w-6xl mx-auto px-6 py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C8553D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="5.5" cy="17.5" r="3.5" />
                  <circle cx="18.5" cy="17.5" r="3.5" />
                  <path d="M15 6a1 1 0 100-2 1 1 0 000 2zm-3 11.5V14l-3-3 4-3 2 3h2" />
                </svg>
              </div>
              <span className="text-sm font-display font-semibold text-white/80">VeloSync</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-white/40">
              <span>&copy; {new Date().getFullYear()} VeloSync</span>
              <span className="text-xs tracking-wide">velosync.app</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
