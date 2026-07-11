import ContactForm from "./ContactForm";

export default function ContactSection() {
  return (
    <section id="contact" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="text-xs uppercase font-bold text-forest tracking-wider block mb-2">
                Tailor-Made Consulting
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink mb-4">
                Start Planning Your Bhutan Journey
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                Connect with our specialized destination architects. Tell us your date frames,
                luxury levels, and specific interest preferences to get your custom design map
                within 24 business hours.
              </p>
            </div>

            <div className="space-y-4 text-sm text-slate-700">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full bg-ink/5 text-ink flex items-center justify-center">
                  📞
                </div>
                <div>
                  <p className="font-semibold">+975 2 334455 / +975 17112233</p>
                  <p className="text-xs text-gray-400">HQ Office Numbers</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full bg-ink/5 text-ink flex items-center justify-center">
                  ✉️
                </div>
                <div>
                  <p className="font-semibold">travel@yetitoursbhutan.com</p>
                  <p className="text-xs text-gray-400">Concierge Desk</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full bg-ink/5 text-ink flex items-center justify-center">
                  📍
                </div>
                <div>
                  <p className="font-semibold">
                    Changlam Plaza, Sector 4, Thimphu, Kingdom of Bhutan
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <a
                href="https://wa.me/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-[#25D366] text-white hover:bg-[#20ba5a] px-6 py-3 rounded-md font-bold text-sm shadow-md transition"
              >
                Chat Live with an Expert on WhatsApp
              </a>
            </div>
          </div>

          <ContactForm />
        </div>
      </div>
    </section>
  );
}
