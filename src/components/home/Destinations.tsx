import SectionDivider from "@/components/site/SectionDivider";

export interface DestinationData {
  id: string;
  name: string;
  description: string;
  image: string;
}

export default function Destinations({ destinations }: { destinations: DestinationData[] }) {
  if (destinations.length === 0) return null;

  return (
    <section id="destinations" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink mb-4">
            Legendary Bhutanese Destinations
          </h2>
          <SectionDivider />
          <p className="text-gray-600">
            Explore breathtaking mountain valleys wrapped in deep history, architecture, and
            biodiversity.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((d) => (
            <div key={d.id} className="relative group h-80 rounded-2xl overflow-hidden shadow-md">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={d.image}
                className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                alt={d.name}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <h4 className="text-xl font-bold font-display tracking-wider">{d.name}</h4>
                <p className="text-xs text-gray-300 mt-1">{d.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
