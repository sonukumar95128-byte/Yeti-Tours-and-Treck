export interface TestimonialData {
  id: string;
  quote: string;
  name: string;
  place: string;
  initials: string;
}

export default function Testimonials({ testimonials }: { testimonials: TestimonialData[] }) {
  if (testimonials.length === 0) return null;

  return (
    <section className="py-24 bg-forest text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-4xl text-gold opacity-60 mb-4 block">&ldquo;</span>
          <h3 className="font-display text-2xl sm:text-3xl font-bold">
            Endorsements from Discerning Seekers
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {testimonials.map((t) => (
            <div key={t.id} className="bg-ink/40 p-8 rounded-2xl border border-white/10">
              <p className="text-sm italic text-gray-200 mb-6 leading-relaxed">&quot;{t.quote}&quot;</p>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-slate-400 flex items-center justify-center font-bold text-xs text-ink">
                  {t.initials}
                </div>
                <div>
                  <h5 className="text-sm font-bold text-white">{t.name}</h5>
                  <span className="text-[11px] text-gold">{t.place}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
