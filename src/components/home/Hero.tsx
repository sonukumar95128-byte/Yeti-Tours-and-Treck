import Link from "next/link";

const TRUST_AVATARS = [
  { initials: "EA", color: "#0F2D52" },
  { initials: "DK", color: "#D4A017" },
  { initials: "SW", color: "#5B7B8C" },
];

export default function Hero() {
  return (
    <section id="home" className="bg-white pt-4 sm:pt-6 px-3 sm:px-6 lg:px-8">
      <div className="relative min-h-[85vh] flex items-center justify-center bg-black overflow-hidden rounded-2xl sm:rounded-3xl">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-70 scale-105"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1920')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/10" />

        <div className="relative z-20 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 text-white">
          <span className="inline-block border border-white/25 text-white/90 px-4 py-1.5 rounded-full uppercase tracking-widest text-xs font-semibold mb-6 bg-white/10 backdrop-blur-sm">
            Explore the Land of Happiness
          </span>
          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold mb-6 tracking-wide leading-tight">
            Discover the Hidden <br />
            <span className="text-gold">Kingdom of Bhutan</span>
          </h1>
          <p className="text-lg sm:text-xl max-w-2xl mx-auto mb-10 text-gray-200 font-light leading-relaxed">
            Experience the beauty, spirituality, vibrant culture, and pristine mountain adventures of
            Bhutan with tailor-made journeys handcrafted by local destination experts.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link
              href="/tours"
              className="w-full sm:w-auto bg-gold hover:bg-gold-dark text-ink font-bold px-8 py-4 rounded-full text-base shadow-lg transition-all transform hover:-translate-y-0.5"
            >
              Explore Tours →
            </Link>
            <a
              href="#contact"
              className="w-full sm:w-auto border-2 border-white/80 hover:border-gold hover:bg-white/10 text-white font-bold px-8 py-4 rounded-full text-base transition-all"
            >
              Plan Your Journey
            </a>
          </div>
        </div>

        <div className="hidden sm:flex absolute bottom-6 left-6 z-20 items-center gap-3 text-white">
          <div className="flex -space-x-3">
            {TRUST_AVATARS.map((a) => (
              <div
                key={a.initials}
                className="w-9 h-9 rounded-full border-2 border-white/80 flex items-center justify-center text-[11px] font-bold"
                style={{ backgroundColor: a.color }}
              >
                {a.initials}
              </div>
            ))}
          </div>
          <p className="text-xs leading-tight text-white/80 max-w-[9rem]">
            Trusted by travelers from 20+ countries
          </p>
        </div>

        <a
          href="#why-choose-us"
          className="hidden sm:flex absolute bottom-6 right-6 z-20 flex-col items-center gap-2 text-white/80 hover:text-white transition-colors"
        >
          <span className="text-[11px] uppercase tracking-widest">Scroll down</span>
          <span className="w-9 h-9 rounded-full border border-white/40 flex items-center justify-center animate-bounce">
            ↓
          </span>
        </a>
      </div>
    </section>
  );
}
