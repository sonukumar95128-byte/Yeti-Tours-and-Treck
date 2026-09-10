import SectionDivider from "@/components/site/SectionDivider";

const services = [
  {
    icon: "🛂",
    title: "Visa, permit and SDF",
    text: "We prepare your Immigration file, coordinate the US$40 visa fee where it applies, and itemise the Sustainable Development Fee on your quote.",
  },
  {
    icon: "🏨",
    title: "Certified stays",
    text: "Nights are booked in Department of Tourism–certified hotels or registered village homestays — not unlicensed private rentals.",
  },
  {
    icon: "🛬",
    title: "Airport & Ground Transfers",
    text: "VIP airport welcoming gates and fully chauffeured safe premium transit logistics across all sectors.",
  },
  {
    icon: "🥾",
    title: "Trekking Support & Insurance",
    text: "Full technical field crews, certified culinary camp chefs, mountain medical tools, and evacuation links.",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24 bg-ink text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-gold font-bold text-xs uppercase tracking-widest block mb-2">
            Seamless Travel Logistics
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
            Our End-to-End Premium Concierge Services
          </h2>
          <SectionDivider tone="dark" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((s) => (
            <div key={s.title} className="border border-white/10 p-6 rounded-xl bg-white/5">
              <span className="text-gold text-2xl mb-4 block">{s.icon}</span>
              <h4 className="text-lg font-bold mb-2">{s.title}</h4>
              <p className="text-gray-300 text-xs leading-relaxed">{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
