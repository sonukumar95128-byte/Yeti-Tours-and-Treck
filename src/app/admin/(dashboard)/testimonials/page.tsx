import { getPrisma } from "@/lib/prisma";
import TestimonialManager from "@/components/admin/TestimonialManager";

export const dynamic = "force-dynamic";

export default async function AdminTestimonialsPage() {
  const prisma = getPrisma();
  const testimonials = await prisma.testimonial.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-ink mb-2">Testimonials</h1>
      <p className="text-sm text-slate-500 mb-6">
        Shown in the &quot;Endorsements from Discerning Seekers&quot; section on the homepage.
      </p>
      <TestimonialManager testimonials={testimonials} />
    </div>
  );
}
