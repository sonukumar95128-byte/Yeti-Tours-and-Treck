import SectionDivider from "@/components/site/SectionDivider";

const items = [
  {
    icon: "🪪",
    title: "Local Bhutan Experts",
    text: "Born and raised in the kingdom, our deep roots allow us access to unique village festivals and remote monastic interactions.",
  },
  {
    icon: "🎛",
    title: "Personalized Itineraries",
    text: "Every traveler is unique. We build flexible private routes meticulously crafted around your pacing and special interests.",
  },
  {
    icon: "🧑‍💼",
    title: "Professional Guides",
    text: "Our government-licensed guides are storytelling champions fluent in history, culture, Buddhism, and ecology.",
  },
  {
    icon: "🚐",
    title: "Comfortable Transportation",
    text: "Navigate winding mountain passes safely in our premium, heavily-maintained 4WD SUVs and luxury coaster coaches.",
  },
  {
    icon: "🎧",
    title: "24/7 Premium Support",
    text: "From the moment you inquire until your boarding gate back home, our operation desk tracks and supports your safety around the clock.",
  },
  {
    icon: "🕉",
    title: "Authentic Experiences",
    text: "Dine with farmers in traditional farmhouses, receive private blessings from senior lamas, and see the true essence of Gross National Happiness.",
  },
];

export default function WhyChooseUs() {
  return (
    <section id="why-choose-us" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink mb-4">
            Why Choose Yeti Tours &amp; Treks
          </h2>
          <SectionDivider />
          <p className="text-gray-600">
            We don&apos;t just organize trips; we weave transformational experiences that honor
            Bhutan&apos;s strict commitment to high-value, low-impact sustainable tourism.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item) => (
            <div
              key={item.title}
              className="p-8 rounded-2xl bg-ink/5 border border-slate-100 hover:border-gold/50 transition-all duration-300 hover:shadow-xl group"
            >
              <div className="w-12 h-12 rounded-xl bg-ink text-gold flex items-center justify-center text-xl mb-6 shadow-md group-hover:bg-forest transition-colors">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-ink mb-3">{item.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
