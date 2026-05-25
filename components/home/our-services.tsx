import Link from "next/link";
import {
  Hotel,
  UtensilsCrossed,
  Car,
  Palmtree,
  ChevronRight,
  ArrowUpRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Hotel,
    title: "Hôtels",
    count: "150+ établissements",
    link: "/hotels",
    gradient: "from-orange-500/10 to-red-500/10",
    iconColor: "text-primary",
  },
  {
    icon: UtensilsCrossed,
    title: "Restaurants",
    count: "80+ adresses",
    link: "/restaurants",
    gradient: "from-orange-500/10 to-red-500/10",
    iconColor: "text-primary",
  },
  {
    icon: Car,
    title: "Location",
    count: "50+ véhicules",
    link: "/locations",
    gradient: "from-orange-500/10 to-red-500/10",
    iconColor: "text-primary",
  },
  {
    icon: Palmtree,
    title: "Attractions",
    count: "100+ activités",
    link: "/attractions",
    gradient: "from-orange-500/10 to-red-500/10",
    iconColor: "text-primary",
  },
];

export function OurServices() {
  return (
    <section className="relative py-16 md:py-24 lg:py-28 bg-gradient-to-b from-background via-muted/20 to-background overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-0 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left side - Text content */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-block">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                Nos Services
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-heading leading-[1.1]">
              Tout pour votre
              <span className="block mt-2 bg-gradient-to-r from-primary via-primary-600 to-primary-600 bg-clip-text text-transparent">
                séjour parfait
              </span>
            </h2>

            <p className="text-subtle text-base md:text-lg leading-relaxed max-w-lg">
              Découvrez notre sélection complète de services premium pour
              organiser votre séjour dans le Sud en toute simplicité et
              sérénité.
            </p>

            <div className="flex flex-col sm:flex-row items-start gap-4 pt-2">
              <Button asChild size="lg" variant="outline" className="group">
                <Link href="/contact">
                  Nous contacter
                  <ArrowUpRight className="h-4 w-4 ml-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-border/50">
              <div>
                <div className="text-2xl md:text-3xl font-bold text-heading">
                  380+
                </div>
                <div className="text-sm text-subtle mt-1">
                  Options disponibles
                </div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-bold text-heading">
                  4.9
                </div>
                <div className="text-sm text-subtle mt-1">
                  Note moyenne
                </div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-bold text-heading">
                  24/7
                </div>
                <div className="text-sm text-subtle mt-1">
                  Support client
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Services grid */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-6">
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <Link
                    key={index}
                    href={service.link}
                    className="group relative"
                    style={{
                      animationDelay: `${index * 100}ms`,
                    }}
                  >
                    <div className="card-elevated p-7 h-full overflow-hidden group-hover:-translate-y-1">
                      {/* Gradient background */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                      />

                      {/* Animated border glow */}
                      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/20 via-transparent to-primary/20 blur-xl" />
                      </div>

                      <div className="relative z-10">
                        {/* Icon container */}
                        <div className="mb-5 inline-flex">
                          <div
                            className={`p-3.5 rounded-xl bg-gradient-to-br ${service.gradient} group-hover:scale-110 transition-transform duration-500`}
                          >
                            <Icon className={`h-7 w-7 ${service.iconColor}`} />
                          </div>
                        </div>

                        {/* Content */}
                        <div className="space-y-2">
                          <h3 className="text-xl font-bold text-heading  transition-colors duration-300 flex items-center justify-between">
                            {service.title}
                            <ArrowUpRight className="h-5 w-5 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300" />
                          </h3>
                          <p className="text-sm text-subtle font-medium">
                            {service.count}
                          </p>
                        </div>

                        {/* Hover indicator */}
                        <div className="mt-6 pt-4 border-t border-border/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <span className="text-xs font-medium text-primary flex items-center gap-1">
                            Découvrir
                            <ChevronRight className="h-3 w-3" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
