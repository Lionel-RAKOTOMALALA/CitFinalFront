import { Star, Quote, ArrowUpRight } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Marie L.",
    location: "Paris, France",
    text: "Notre séjour a dépassé toutes nos attentes. Le processus de réservation était fluide et la visite vidéo HD nous a donné un aperçu parfait.",
    rating: 5,
    avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100",
    gradient: "from-orange-500/10 to-red-500/10",
  },
  {
    id: 2,
    name: "Carlos R.",
    location: "Madrid, Espagne",
    text: "Les visites vidéo premium nous ont fait gagner énormément de temps. Nous avons pu choisir l'hôtel parfait pour nos vacances en famille.",
    rating: 5,
    avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100",
    gradient: "from-orange-500/10 to-red-500/10",
  },
  {
    id: 3,
    name: "Aisha K.",
    location: "Dubaï, EAU",
    text: "J'ai adoré les informations détaillées sur chaque restaurant. Cela a rendu la planification de notre tour culinaire tellement plus facile.",
    rating: 4,
    avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100",
    gradient: "from-orange-500/10 to-red-500/10",
  }
];

export function TestimonialsSection() {
  return (
    <section className="relative py-12 md:py-16 lg:py-20 bg-gradient-to-b from-background via-muted/20 to-background overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container px-4 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 lg:mb-12 space-y-4">
          <div className="inline-block">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              Témoignages
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1C252E] dark:text-white leading-[1.1]">
            Ce que disent
            <span className=" block mt-1 pb-3 bg-gradient-to-r from-primary via-primary-600 to-primary-600 bg-clip-text text-transparent">
              nos clients
            </span>
          </h2>

          <p className="text-[#637381] dark:text-gray-400 text-base leading-relaxed">
            Découvrez les expériences de voyageurs qui ont fait confiance à nos services premium
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-5">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="group relative"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              <div className="relative bg-background border border-border/40 dark:border-none rounded-2xl p-5 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 h-full dark:bg-[#101826] overflow-hidden group-hover:-translate-y-1">
                {/* Gradient background */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${testimonial.gradient} opacity-0 transition-opacity duration-500`}
                />

                {/* Animated border glow */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/20 via-transparent to-primary/20 blur-xl" />
                </div>

                <div className="relative z-10 space-y-4">
                  {/* Rating & Quote icon */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3.5 w-3.5 ${
                            i < testimonial.rating
                              ? "fill-primary text-primary"
                              : "text-muted-foreground/30"
                          }`}
                        />
                      ))}
                    </div>
                    <Quote className="h-4 w-4 text-primary/40" />
                  </div>

                  {/* Testimonial text */}
                  <p className="text-[#637381] dark:text-gray-400 text-sm leading-relaxed">
                    "{testimonial.text}"
                  </p>

                  {/* Author info */}
                  <div className="pt-3 border-t border-border/30 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-10 h-10 rounded-full object-cover ring-2 ring-primary/10 group-hover:ring-primary/30 transition-all duration-300"
                      />
                      <div>
                        <p className="font-bold text-sm text-[#1C252E] dark:text-white">
                          {testimonial.name}
                        </p>
                        <p className="text-xs text-[#637381] dark:text-gray-400">
                          {testimonial.location}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}