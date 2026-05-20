import Link from "next/link";
import { Shield, Clock, Award, Users, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

const benefits = [
  {
    icon: Shield,
    title: "Sécurité garantie",
    description:
      "Réservations sécurisées avec protection complète de vos données et paiements cryptés",
  },
  {
    icon: Award,
    title: "Qualité certifiée",
    description:
      "Sélection rigoureuse d'hôtels 3 à 5 étoiles pour garantir votre confort",
  },
  {
    icon: Clock,
    title: "Support 24/7",
    description:
      "Une équipe dédiée disponible à tout moment pour vous accompagner",
  },
  {
    icon: Users,
    title: "Expertise locale",
    description: "Plus de 10 ans d'expérience dans le tourisme du Sud malgache",
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-12 md:py-20 md:pb-20">
      <div className="container px-4">
        <div className="flex flex-col justify-center items-center mb-8 md:mb-12">
          <span className="inline-flex items-center mb-4 gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            Pourquoi nous choisir
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 text-center text-[#1C252E] dark:text-white leading-tight">
            Votre partenaire&nbsp;
            <span className="mt-2 bg-gradient-to-r from-primary via-primary-600 to-primary-500 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
              de confiance
            </span>
          </h2>
          <p className="text-[#637381] max-w-2xl mt-4 text-center text-sm md:text-base px-4">
            Nous mettons tout en œuvre pour rendre votre expérience unique et
            sans souci, de la réservation jusqu'à votre départ.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <Card
                key={index}
                className="border-border/40 bg-[#F4F6F8] dark:bg-[#1F2937] transition-all duration-300"
              >
                <CardHeader>
                  <div className="flex items-start justify-between mb-3">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-[#1C252E] dark:text-white">
                    {benefit.title}
                  </h3>
                </CardHeader>
                <CardContent>
                  <p className="text-[#637381] text-sm leading-relaxed">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
